# Kisan Care — AI-Powered Digital Farming Platform

Kisan Care is a web-based farming companion that brings together crop management, soil health tracking, weather updates, market prices, government schemes, disease detection, and AI assistance — all in one place for Indian farmers.

## Problem We Solve

Farmers currently juggle multiple apps and websites for weather, mandi prices, soil reports, and expert advice. Kisan Care unifies everything into a single personalized platform.

## Features

- **Crop Management** — Track planting dates, growth stages, and crop health
- **Soil Health** — Log NPK values, pH, organic carbon with AI-powered interpretations
- **Weather** — Location-based forecasts, rain probability, and irrigation alerts
- **Mandi Prices** — Real-time crop prices from nearby markets with trend analysis
- **AI Assistant** — Ask farming questions in Hindi/Marathi/English and get personalized advice
- **Crop Disease Detection** — Upload a leaf photo to identify diseases with confidence scores
- **Government Schemes** — Eligibility-based scheme recommendations with application guidance
- **Crop Calendar** — Stage-wise farming schedule from land prep to harvest
- **Farmer Community** — Share knowledge, ask questions, and connect with fellow farmers
- **Kisan Store** — Find nearby stores for seeds, fertilizers, and equipment

## Tech Stack

- React 19 + Vite 8
- Tailwind CSS 4
- TanStack Router/Start
- GSAP for animations
- shadcn/ui components
- Supabase (planned for backend)

## Getting Started

```bash
git clone https://github.com/eric1402/kisancareletest.git
cd kisancareletest/Frontend/kisancareletest-main
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

## Project Structure

```
src/
├── components/       # UI components (Hero, Navbar, Features, etc.)
│   ├── ui/          # shadcn/ui base components
│   └── ...          # Section components
├── data/            # Mock data and content
├── hooks/           # Custom React hooks
├── lib/             # Utilities and helpers
├── routes/          # TanStack Router pages
└── assets/          # Images and static files
```

## Development Status

- [x] Landing page with cinematic intro
- [x] Responsive design (360px - 1920px)
- [x] GSAP scroll animations
- [x] All section components
- [ ] Dashboard and app modules
- [ ] Supabase integration
- [ ] Real-time API connections
- [ ] AI chatbot and vision

## License

Private — Final Year Project
