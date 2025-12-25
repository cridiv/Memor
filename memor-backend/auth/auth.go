package auth

import (
	"net/http"
	"os"

	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

func InitGoth() {
    // Session store
    store := sessions.NewCookieStore([]byte(os.Getenv("SESSION_SECRET")))
    store.Options.HttpOnly = true
    store.Options.Secure = os.Getenv("ENV") == "production"
    store.Options.SameSite = http.SameSiteLaxMode
    gothic.Store = store

    // Register Google provider
    goth.UseProviders(
        google.New(
            os.Getenv("GOOGLE_CLIENT_ID"),
            os.Getenv("GOOGLE_CLIENT_SECRET"),
            os.Getenv("APP_URL")+"/auth/google/callback", // e.g., http://localhost:8080 or https://yourdomain.com
            "email",
            "profile",
        ),
    )
}