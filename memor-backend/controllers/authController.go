package controllers

import (
    "encoding/json"
    "memor-backend/initializers"
    model "memor-backend/models"
    "net/http"
    "strings"

    "github.com/markbates/goth/gothic"
)

func GoogleLoginHandler(w http.ResponseWriter, r *http.Request) {
    q := r.URL.Query()
    q.Set("provider", "google")
    r.URL.RawQuery = q.Encode()

    gothic.BeginAuthHandler(w, r)
}

func GoogleCallbackHandler(w http.ResponseWriter, r *http.Request) {
    q := r.URL.Query()
    q.Set("provider", "google")
    r.URL.RawQuery = q.Encode()

    gUser, err := gothic.CompleteUserAuth(w, r)
    if err != nil {
        http.Error(w, "Authentication failed", http.StatusUnauthorized)
        return
    }

    firstName := gUser.FirstName
    lastName := gUser.LastName
    if firstName == "" || lastName == "" {
        parts := strings.Fields(gUser.Name)
        if firstName == "" && len(parts) > 0 {
            firstName = parts[0]
        }
        if lastName == "" && len(parts) > 1 {
            lastName = strings.Join(parts[1:], " ")
        }
        if lastName == "" {
            lastName = " "
        }
    }

    var appUser model.User
    if err := initializers.DB.
        Where("id = ?", gUser.UserID).
        Assign(model.User{
            ID:        gUser.UserID,
            FirstName: firstName,
            LastName:  lastName,
            Name:      gUser.Name,
            Email:     gUser.Email,
            Picture:   gUser.AvatarURL,
        }).
        FirstOrCreate(&appUser).Error; err != nil {
        http.Error(w, "Could not save user", http.StatusInternalServerError)
        return
    }

    // Redirect with Google ID as query parameter
    redirectURL := "http://localhost:3000/dashboard?id=" + gUser.UserID
    http.Redirect(w, r, redirectURL, http.StatusSeeOther)
}

func DisplayUser(w http.ResponseWriter, r *http.Request) {
    ID := r.URL.Query().Get("id")
    if ID == "" {
        http.Error(w, "Missing id parameter", http.StatusBadRequest)
        return
    }

    var user model.User
    if err := initializers.DB.Where("id = ?", ID).First(&user).Error; err != nil {
        http.Error(w, "User not found", http.StatusNotFound)
        return
    }

    response := map[string]interface{}{
        "id":        user.ID,
        "firstName": user.FirstName,
        "lastName":  user.LastName,
        "name":      user.Name,
        "email":     user.Email,
        "picture":   user.Picture,
        "createdAt": user.CreatedAt,
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(response)
}