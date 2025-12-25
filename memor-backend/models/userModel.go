package model

import "time"

type User struct {
	ID        string  `gorm:"primaryKey"`
    FirstName string `gorm:"not null"`
	LastName  string `gorm:"not null"`
    Name      string `gorm:"not null"`
    Email     string `gorm:"uniqueIndex;not null"`
    Picture   string
	CreatedAt time.Time
	UpdatedAt time.Time

}