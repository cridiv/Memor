package services

import (
	"fmt"
	"os"

	"gopkg.in/gomail.v2"
)

func SendCardEmail(
	to string,
	cardImageURL string,
	cardURL string,
	message string,
) error {

	m := gomail.NewMessage()

	m.SetHeader("From", "Memor ivcrid@gmail.com")
	m.SetHeader("To", to)
	m.SetHeader("Subject", "💌 You’ve received a card")

	htmlBody := fmt.Sprintf(`
		<div style="font-family: Arial, sans-serif; line-height: 1.6; text-align:center;">
			<h2>You’ve received a special card 💖</h2>
			<p>%s</p>

			<a href="%s" style="text-decoration:none;">
				<img src="%s"
					alt="Your card"
					style="max-width:100%%; border-radius:12px; border:1px solid #eee;">
			</a>

			<div style="margin-top:16px;">
				<a href="%s"
					style="
						display:inline-block;
						padding:12px 20px;
						background:#7c3aed;
						color:white;
						text-decoration:none;
						border-radius:8px;
					">
					View your card
				</a>
			</div>

			<p style="font-size:12px;color:#666; margin-top:12px;">
				Sent with love via Memor ✨
			</p>
		</div>
	`, message, cardURL, cardImageURL, cardURL)

	m.SetBody("text/html", htmlBody)

	d := gomail.NewDialer(
		"smtp-relay.brevo.com",
		587,
		os.Getenv("BREVO_SMTP_LOGIN"),
		os.Getenv("BREVO_SMTP_KEY"),
	)

	return d.DialAndSend(m)
}
