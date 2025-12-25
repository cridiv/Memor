package initializers

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnvVariables() {
	// Only load .env if ENV=development
	if os.Getenv("ENV") == "development" {
		err := godotenv.Load()
		if err != nil {
			fmt.Println("⚠️ No .env file found, using system environment variables")
		} else {
			fmt.Println("✅ Loaded .env file")
		}
	} else {
		fmt.Println("⚡ Production mode: using system environment variables")
	}
}
