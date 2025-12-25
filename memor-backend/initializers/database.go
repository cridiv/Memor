package initializers

import (
	"fmt"
	"log"
	"os"
	"time"

	model "memor-backend/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func ConnectDB() {
	// Use DATABASE_URL environment variable (Render sets this manually)
	dsn := os.Getenv("DB_URL")
	if dsn == "" {
		log.Fatal("DB_URL environment variable is not set")
	}

	// Configure logger: verbose only in local development
	var gormLogger logger.Interface
	if os.Getenv("ENV") == "development" && os.Getenv("DEBUG_DB") == "true" {
		gormLogger = logger.New(
			log.New(os.Stdout, "\r\n", log.LstdFlags),
			logger.Config{
				SlowThreshold:             200 * time.Millisecond,
				LogLevel:                  logger.Info,
				IgnoreRecordNotFoundError: true,
				Colorful:                  true,
			},
		)
	} else {
		gormLogger = logger.New(
			log.New(os.Stdout, "\r\n", log.LstdFlags),
			logger.Config{
				SlowThreshold:             1 * time.Second,
				LogLevel:                  logger.Warn,
				IgnoreRecordNotFoundError: true,
				Colorful:                  false,
			},
		)
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: gormLogger,
	})
	if err != nil {
		log.Fatal("Failed to connect to database!", err)
	}

	// Connection pool
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("Failed to get DB instance", err)
	}
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)
	sqlDB.SetConnMaxIdleTime(5 * time.Minute)

	fmt.Println("✅ Connected to database")

	DB = db

	// Auto-migrate only in development
	if os.Getenv("ENV") == "development" {
		err = DB.AutoMigrate(&model.User{}, &model.Card{})
		if err != nil {
			log.Fatal("Failed to auto-migrate models!", err)
		}
		fmt.Println("✅ Database auto-migration completed")
	} else {
		fmt.Println("Skipping auto-migration in production")
	}
}
