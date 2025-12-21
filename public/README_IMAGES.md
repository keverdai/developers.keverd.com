# Image Assets for SEO and Social Sharing

This directory contains all image assets used for SEO, social media sharing, and favicons.

## Directory Structure

```
public/
├── site.webmanifest     # Web manifest for PWA
└── images/
    └── logo.png         # Main Keverd logo (used for all SEO purposes)
```

## Image Specifications

### Logo Image (`/images/logo.png`)
This single image is used for:
- **Open Graph images** (social media sharing on Facebook, WhatsApp, LinkedIn, Twitter)
- **Favicon** (browser tab icon)
- **Apple Touch Icon** (iOS home screen icon)
- **Structured data logo** (Google search results)

**Recommended Specifications:**
- **Dimensions**: Square format recommended (e.g., 1200x1200, 512x512, or 256x256 pixels)
- **Format**: PNG
- **File size**: Optimized, ideally under 500KB
- **Content**: Should include:
  - Keverd logo/branding
  - Clear, recognizable design
  - Works well at small sizes (for favicon)
  - Works well at large sizes (for social sharing)
  - Brand colors (Keverd blue, gold, clay)

**Note**: While square images work well, if you have a rectangular logo, that's fine too. The system will use it for all purposes.

## Image Optimization

Before using:
1. **Compress the image** using tools like:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
2. **Test the image** on social media preview tools:
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Current Status

✅ **Configuration Complete**: The SEO system is configured to use `/images/logo.png` for all purposes.

📝 **Next Step**: Add your logo image to `/public/images/logo.png` and the system will automatically use it for:
- Social media sharing previews
- Browser favicon
- iOS home screen icon
- Google search results (structured data)

Once the image is added, all SEO features will work automatically!

