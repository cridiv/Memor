package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"

	"memor-backend/initializers"
	model "memor-backend/models"
	"memor-backend/services"

	"github.com/gin-gonic/gin"
)

type StringID string

func (s *StringID) UnmarshalJSON(b []byte) error {
	if len(b) == 0 {
		return errors.New("empty user_id")
	}
	// If quoted, treat as string
	if b[0] == '"' {
		var str string
		if err := json.Unmarshal(b, &str); err != nil {
			return err
		}
		*s = StringID(str)
		return nil
	}
	// Otherwise, treat as number and stringify
	var num json.Number
	if err := json.Unmarshal(b, &num); err != nil {
		return err
	}
	*s = StringID(num.String())
	return nil
}

func CreateCard(c *gin.Context) {
    fmt.Println("=== CreateCard function called ===")
     
     var body struct {
		 UserID         StringID `json:"user_id"`
         Occasion       string `json:"occasion"`
         Message        string `json:"message"`
         Theme          string `json:"theme"`
         RecipientEmail string `json:"recipient_email"`
     }

	if err := c.BindJSON(&body); err != nil {
		fmt.Println("ERROR: Failed to bind JSON:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Print what was received
	fmt.Println("Card Created (JSON):")
	bodyJSON, _ := json.MarshalIndent(body, "", "  ")
	fmt.Println(string(bodyJSON))

	// Build prompt for image generation
	fmt.Println("Building prompt...")
	prompt := services.BuildCardPrompt(
		body.Occasion,
		body.Theme,
		body.Message,
	)
	fmt.Println("Prompt:", prompt)

	// Generate the image
	fmt.Println("Generating card image...")
	imageBase64, err := services.GenerateCardImage(prompt)
	
	if err != nil {
		fmt.Printf("Image generation failed: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to generate card",
			"details": err.Error(),
		})
		return
	}

	fmt.Printf("Image generated successfully! Base64 length: %d\n", len(imageBase64))

	// Create card with generated image
     card := model.Card{
  		 UserID:         string(body.UserID),
         Occasion:       body.Occasion,
         Theme:          body.Theme,
         Message:        body.Message,
         RecipientEmail: body.RecipientEmail,
         URL:            imageBase64,
     }

	fmt.Println("Saving card to database...")
	
	// Save to database
	result := initializers.DB.Create(&card)
	if result.Error != nil {
		fmt.Printf("Database error: %v\n", result.Error)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to save card to database",
			"details": result.Error.Error(),
		})
		return
	}

	fmt.Printf("Card saved successfully with ID: %d\n", card.ID)

	if body.RecipientEmail != "" {
        cardURL := fmt.Sprintf("%s/cards/%d", os.Getenv("APP_BASE_URL"), card.ID)
        cardImageURL := card.URL

        if err := services.SendCardEmail(
            body.RecipientEmail,
            cardImageURL,
            cardURL,
            card.Message,
        ); err != nil {
            fmt.Println("Email send failed:", err)
        }
    }

	// Return the response
	c.JSON(http.StatusCreated, gin.H{
		"message": "Card created successfully",
		"card":    card,
	})
}

func GetCard(c *gin.Context) {
	cardID := c.Param("id")
	
	var card model.Card
	result := initializers.DB.First(&card, cardID)
	
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Card not found",
		})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		"card": card,
	})
}

func GetAllCards(c *gin.Context) {
    ID := c.Query("id")
    if ID == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Missing id parameter"})
        return
    }

    var cards []model.Card
    result := initializers.DB.
        Where("user_id = ?", ID).
        Order("created_at DESC").
        Find(&cards)

    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error":   "Failed to retrieve cards",
            "details": result.Error.Error(),
        })
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "cards": cards,
        "count": len(cards),
    })
}