package initializers

import (
	"fmt"

	"github.com/joho/godotenv"
)

func LoadEnvVariables() {
	err := godotenv.Load();

	if err != nil {
        fmt.Println("No .env file found, using system environment variables")
    }
}