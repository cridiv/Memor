package services

import "fmt"

func BuildCardPrompt(occasion, theme, message string) string {
    // More specific visual instructions for the image model
    return fmt.Sprintf(
        "A high-quality digital greeting card designed for a %s. "+
            "Target recipient: adult, warm and friendly tone. "+
            "Visual style: %s; color palette: soft pastels and complementary accents based on the theme. "+
            "Composition: portrait orientation, centered typographic focal point with ample white space and balanced margins. "+
            "The card features the message \"%s\" clearly in the center in a large, legible modern serif or elegant sans-serif type, "+
            "with subtle decorative elements (soft florals or geometric accents) that do not obscure the text. "+
            "Lighting: soft, natural; texture: subtle paper grain; resolution: 4k, ultra-detailed. "+
            "Strict: no watermark, no additional logos, no extra text, clean minimal layout.",
        occasion, theme, message,
    )
}