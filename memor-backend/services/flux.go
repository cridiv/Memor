package services

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

func GenerateCardImage(prompt string) (string, error) {
    // Step 1: Generate image from Pollinations
    baseURL := "https://image.pollinations.ai/prompt/"
    encodedPrompt := url.QueryEscape(prompt)
    imageURL := fmt.Sprintf("%s%s?width=1024&height=1024&nologo=true&enhance=true&safe=true", baseURL, encodedPrompt)

    fmt.Println("Generating image from Pollinations:", imageURL)

    // HTTP client with extended TLS handshake timeout and overall timeout
    transport := &http.Transport{
        TLSHandshakeTimeout: 20 * time.Second,
    }
    client := &http.Client{
        Transport: transport,
        Timeout:   90 * time.Second,
    }

    // Retry logic with exponential backoff for Pollinations requests
    var resp *http.Response
    var lastErr error
    maxRetries := 3
    backoff := 2 * time.Second
    for attempt := 1; attempt <= maxRetries; attempt++ {
        resp, lastErr = client.Get(imageURL)
        if lastErr == nil {
            if resp.StatusCode == http.StatusOK {
                break
            }
            // capture body for diagnostics and close
            bodyBytes, _ := io.ReadAll(resp.Body)
            resp.Body.Close()
            lastErr = fmt.Errorf("pollinations API error %d: %s", resp.StatusCode, strings.TrimSpace(string(bodyBytes)))
        }
        if attempt < maxRetries {
            time.Sleep(backoff)
            backoff *= 2
        }
    }
    if lastErr != nil {
        return "", fmt.Errorf("pollinations request failed: %w", lastErr)
    }
    defer resp.Body.Close()

    imageData, err := io.ReadAll(resp.Body)
    if err != nil {
        return "", fmt.Errorf("failed to read image: %w", err)
    }
    if len(imageData) == 0 {
        return "", fmt.Errorf("empty image from pollinations")
    }
    fmt.Printf("Pollinations generated %d bytes\n", len(imageData))

    // Step 2: Initialize Cloudinary properly
    // Guard against .env values that include the key (e.g. "CLOUDINARY_URL=cloudinary://...")
    ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
    defer cancel()

    cldURL := os.Getenv("CLOUDINARY_URL")
    if cldURL == "" {
        return "", fmt.Errorf("CLOUDINARY_URL environment variable is not set")
    }
    cldURL = strings.TrimSpace(cldURL)
    if strings.HasPrefix(cldURL, "CLOUDINARY_URL=") {
        parts := strings.SplitN(cldURL, "=", 2)
        if len(parts) == 2 {
            cldURL = strings.Trim(parts[1], `"' `)
        }
    }

    cld, err := cloudinary.NewFromURL(cldURL)
    if err != nil {
        return "", fmt.Errorf("failed to initialize Cloudinary: %w", err)
    }

    // Upload to Cloudinary
    uploadParams := uploader.UploadParams{
        Folder:       "memor",
        PublicID:     fmt.Sprintf("card-%d", time.Now().UnixNano()),
        Overwrite:    api.Bool(true),
        ResourceType: "image",
        // UploadPreset: "memor_unsigned", // ← Use only if you created an unsigned preset
        // If you use signed upload (recommended), remove the line above
    }

    uploadResult, err := cld.Upload.Upload(ctx, bytes.NewReader(imageData), uploadParams)
    if err != nil {
        return "", fmt.Errorf("cloudinary upload failed: %w", err)
    }

    imageURL = uploadResult.SecureURL
    fmt.Printf("Uploaded to Cloudinary: %s\n", imageURL)
    return imageURL, nil
}
