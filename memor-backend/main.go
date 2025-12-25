package main

import (
	"memor-backend/auth"
	"memor-backend/controllers"
	"memor-backend/initializers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
    initializers.LoadEnvVariables()
    initializers.ConnectDB()
}

func main() {
    auth.InitGoth() 
	
    r := gin.Default()

    // Configure CORS explicitly
    r.Use(cors.New(cors.Config{
        AllowOrigins: []string{
            "http://localhost:3000",
        },
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
        AllowCredentials: true,
    }))

    r.POST("/api/generate-card", controllers.CreateCard)
    r.GET("/api/cards", controllers.GetAllCards)
    r.GET("/api/cards/:id", controllers.GetCard)

    r.GET("/auth/google", gin.WrapF(controllers.GoogleLoginHandler))
    r.GET("/auth/google/callback", gin.WrapF(controllers.GoogleCallbackHandler))
    r.GET("/auth/me", gin.WrapF(controllers.DisplayUser))


    r.Run()
}