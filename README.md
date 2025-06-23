# Flowscape

A modern, responsive website built with React, TypeScript, and Tailwind CSS. Features smooth animations, interactive components, and a beautiful UI design.

## 🚀 Features

- **Modern UI/UX**: Beautiful design with glass morphism effects and smooth animations
- **Responsive Design**: Optimized for all device sizes
- **Interactive Components**: Engaging user interface with Framer Motion animations
- **Fast Performance**: Built with Vite for optimal loading speeds
- **TypeScript**: Full type safety and better developer experience

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Deployment**: Cloudflare Pages with Wrangler
- **Authentication**: Supabase (optional)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Aeronxt/Flowscape.git
cd Flowscape
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🚀 Deployment

This project is configured for deployment with Cloudflare Pages using Wrangler.

### Prerequisites

1. Install Wrangler CLI (if not already installed):
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

### Deploy to Cloudflare Pages

1. Build the project:
```bash
npm run build
```

2. Deploy to Cloudflare Pages:
```bash
npm run deploy
```

Or use the combined command:
```bash
npm run build:deploy
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to Cloudflare Pages
- `npm run deploy:preview` - Deploy preview to Cloudflare Pages
- `npm run wrangler:dev` - Run Wrangler dev server
- `npm run build:deploy` - Build and deploy in one command

### Configuration

The deployment configuration is stored in:
- `wrangler.toml` - Wrangler configuration
- `_routes.json` - Cloudflare Pages routing configuration
- `public/_redirects` - SPA routing fallback

## 🔧 Environment Variables

If using Supabase authentication, create a `.env.local` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Features Overview

- **Hero Section**: Animated landing with call-to-action
- **About Section**: Company information with interactive elements
- **Services Section**: Animated service cards with API integration demos
- **Pricing Section**: Flexible pricing plans with comparison
- **FAQ Section**: Interactive accordion with common questions
- **Contact Section**: Contact form with smooth animations
- **Footer**: Links and subscription form

## 🎨 Customization

The design system uses Tailwind CSS with custom configurations. Key files:
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles and CSS variables
- `src/components/` - Reusable UI components

## 📄 License

© 2025 Aeron X Technologies. All rights reserved.

## 🤝 Contributing

This is a private project. For any questions or contributions, please contact the development team.

---

Built with ❤️ using modern web technologies. 