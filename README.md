# Keverd Developer Documentation

Interactive documentation site for Keverd fraud detection SDKs, built with Next.js and styled to match the dashboard UI.

## Features

- 📱 **Android SDK Documentation** - Complete Kotlin SDK guide
- 🌐 **JavaScript SDK Documentation** - Vanilla JS SDK for web applications
- ⚛️ **React SDK Documentation** - React hooks and components
- 🔑 **API Keys Guide** - Instructions on obtaining and using API keys
- 🚀 **Getting Started** - Quick start guide for all SDKs
- 🎨 **Dashboard UI Style** - Consistent design matching dashboard.keverd.com

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
developers.keverd.com/
├── app/
│   ├── components/        # Reusable UI components
│   ├── docs/             # SDK documentation pages
│   ├── api-keys/         # API keys instructions
│   ├── getting-started/  # Quick start guide
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Documentation Coverage

### Implemented SDKs

- ✅ **Android SDK** - Full documentation with all methods
- ✅ **Vanilla JavaScript** - Complete API reference
- ✅ **React SDK** - Hooks and components documentation

### Coming Soon

- 🚧 **Vue.js SDK** - Placeholder page (under development)
- 🚧 **Angular SDK** - Placeholder page (under development)

## Styling

The site uses the same design system as the dashboard:
- Keverd brand colors (blue, gold, ink, clay, sand, dusk)
- Manrope for all text (display and body)
- Tailwind CSS for styling

## License

Proprietary - All rights reserved
