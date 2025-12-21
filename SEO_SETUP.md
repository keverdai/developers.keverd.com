# SEO Setup Guide for Keverd Developer Documentation

## ✅ What's Been Implemented

### 1. **Comprehensive SEO Metadata**
- ✅ Open Graph tags for Facebook, LinkedIn, WhatsApp sharing
- ✅ Twitter Card tags for Twitter sharing
- ✅ Meta descriptions optimized for search engines
- ✅ Keywords for better discoverability
- ✅ Canonical URLs to prevent duplicate content
- ✅ Page-specific metadata for each SDK and documentation page

### 2. **Structured Data (JSON-LD)**
- ✅ Schema.org structured data for better Google search results
- ✅ TechArticle schema for documentation pages
- ✅ WebPage schema for homepage
- ✅ Organization schema with logo

### 3. **Sitemap & Robots.txt**
- ✅ Dynamic sitemap generation (`/sitemap.xml`)
- ✅ Robots.txt file for search engine crawlers
- ✅ All pages included with proper priorities

### 4. **Favicon Support**
- ✅ Favicon configuration in root layout
- ✅ Multiple favicon formats (ICO, SVG, Apple Touch Icon)
- ✅ Web manifest for PWA support

## 📁 Image Assets Required

All images should be placed in the `/public` directory:

```
public/
├── favicon.ico              # Multi-size ICO (16x16, 32x32, 48x48)
├── favicon.svg              # SVG favicon (scalable)
├── apple-touch-icon.png     # 180x180 PNG for iOS
├── site.webmanifest         # ✅ Already created
└── images/
    ├── logo.png             # Keverd logo (min 112x112, transparent background)
    ├── og-default.png       # Default OG image (1200x630)
    ├── og-android.png       # Android SDK OG image (1200x630)
    ├── og-javascript.png    # JavaScript SDK OG image (1200x630)
    ├── og-react.png         # React SDK OG image (1200x630)
    ├── og-vue.png           # Vue.js SDK OG image (1200x630)
    ├── og-angular.png       # Angular SDK OG image (1200x630)
    ├── og-api.png           # API Reference OG image (1200x630)
    ├── og-getting-started.png # Getting Started OG image (1200x630)
    └── og-api-keys.png      # API Keys OG image (1200x630)
```

## 🎨 Image Specifications

### Open Graph Images (Social Sharing)
- **Dimensions**: 1200x630 pixels (1.91:1 aspect ratio)
- **Format**: PNG or JPG
- **File Size**: Optimized, ideally under 1MB
- **Content Should Include**:
  - Keverd logo/branding
  - Page title or SDK name
  - Relevant visual elements (code snippets, icons, etc.)
  - Brand colors (Keverd blue: #2563eb, gold: #f59e0b, clay: #d97706)

### Favicon
- **favicon.ico**: Multi-size ICO file (16x16, 32x32, 48x48)
- **favicon.svg**: SVG format for modern browsers
- **apple-touch-icon.png**: 180x180 pixels PNG

### Logo
- **logo.png**: At least 112x112 pixels
- **Format**: PNG with transparent background preferred
- Used in structured data for organization schema

## 🔍 SEO Features

### Page-Specific Metadata
Each page now has:
- Unique title and description
- Relevant keywords
- Open Graph image
- Structured data (JSON-LD)
- Canonical URL

### Search Engine Optimization
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy (H1, H2, H3)
- ✅ Alt text ready for images (add when images are created)
- ✅ Internal linking structure
- ✅ Mobile-responsive design
- ✅ Fast page load times

### Social Media Sharing
When shared on:
- **Facebook/WhatsApp**: Shows OG image, title, description
- **Twitter**: Shows Twitter Card with image
- **LinkedIn**: Shows OG image and metadata
- **Other platforms**: Falls back to OG tags

## 🚀 Next Steps

1. **Create Images**:
   - Design OG images for each page (1200x630)
   - Create favicon files
   - Create logo image

2. **Add Images to `/public` directory**:
   - Place all images in the specified locations
   - Ensure proper file names match the metadata

3. **Test SEO**:
   - Use [Google Search Console](https://search.google.com/search-console) to submit sitemap
   - Test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - Test with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - Test with [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

4. **Verify Structured Data**:
   - Use [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Use [Schema.org Validator](https://validator.schema.org/)

5. **Monitor Performance**:
   - Set up Google Analytics
   - Monitor search rankings
   - Track social media shares

## 📝 Environment Variables

Add to `.env.local` or production environment:
```env
NEXT_PUBLIC_SITE_URL=https://developers.keverd.com
```

This ensures all URLs in metadata are absolute and correct.

## 🔗 Current Page URLs

All pages are configured with proper metadata:
- `/` - Homepage
- `/getting-started` - Getting Started guide
- `/api-keys` - API Keys documentation
- `/docs` - Documentation hub
- `/docs/api` - API Reference
- `/docs/android` - Android SDK
- `/docs/javascript` - JavaScript SDK
- `/docs/react` - React SDK
- `/docs/vue` - Vue.js SDK
- `/docs/angular` - Angular SDK

## 🎯 Google Search Optimization

The site is optimized for searches like:
- "Keverd Android SDK"
- "Keverd React SDK"
- "Keverd fraud detection"
- "Keverd API documentation"
- "Keverd JavaScript SDK"
- etc.

Each page has unique, descriptive titles and meta descriptions that include relevant keywords.

