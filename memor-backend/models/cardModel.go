package model

import "gorm.io/gorm"

type Card struct {
    gorm.Model
    UserID         string `json:"user_id" gorm:"type:varchar(64);not null;index"`
    Occasion       string `json:"occasion" gorm:"not null"`
    Message        string `json:"message" gorm:"not null"`
    Theme          string `json:"theme" gorm:"not null"`
    RecipientEmail string `json:"recipient_email" gorm:"not null"`
    URL            string `json:"url" gorm:"not null"`
}