# 🌾 KISAN CARE — AI-Powered Digital Farming Platform

> **One-line definition:** Kisan Care is an AI-powered digital farming companion that integrates farmer profiles, crop management, soil health, weather, market prices, government schemes, crop disease detection, voice assistance, agricultural resources, and community knowledge to provide personalized and actionable farming support.

Live app (Lovable): https://kisancareletest.lovable.app

---

## 1. What is Kisan Care?
Kisan Care is an AI-powered digital farming platform designed as a complete digital companion for farmers. It unifies farming information, tools, AI assistance, crop management, soil analysis, weather, market prices, government schemes, agricultural stores, community support, and educational resources into one web application.

**Goal:** Help farmers make smarter, faster, more informed decisions using technology and AI.

```
Farmer Data + Agricultural Data + Real-Time Data + AI + Personalized Recommendations = Farmer-friendly ecosystem
```

## 2. The Problem
Information is scattered:
Weather → Weather App | Mandi Price → Market Website | Crop Disease → Expert | Soil → Soil Report | Schemes → Govt Website

**Kisan Care brings it together:**
```
🌾 FARMER → KISAN CARE → AI / FARM DATA / LIVE DATA → SMART INSIGHTS → FARMER-FRIENDLY ACTION
```

## 3. Core Philosophy
Move from **Information → Understanding → Recommendation**
- `Temperature: 31°C, Humidity 78%` → *"Rain expected. Review irrigation plan."*
- `Nitrogen: Low` → *"Low N may affect vegetative growth. Consider nutrient management per soil report."*

## 4. AI is the Core (Intelligence Layer)
AI connects every module: Farmer Data + Crop Data + Soil Data + Weather + Mandi + Crop Images → **AI Analysis Engine → Personalized Insight**

## 5. AI Kisan Assistant
- Ask naturally: "Mere wheat ke leaves yellow ho rahe hain?" / "Kal barish hogi?"
- Answers in Hindi / Marathi / English, simple language, one clear next step.

## 6. AI Intent Understanding
`Farmer Question → Intent Detection → Relevant Module → Required Data → AI Response`

## 7-15. AI Integrations
- **+ Farmer Profile** (Ramesh, MH, 3 acres, Wheat+Tomato)
- **+ My Crops** (Planting date, stage → stage-specific advice)
- **+ Soil Health** (N,P,K,pH,OC → interpretation + recommendation)
- **+ Weather** (Rain forecast → irrigation decision)
- **+ Mandi Prices** (current price, trends, nearby markets — no speculative predictions)
- **+ Govt Schemes** (profile + location → relevant schemes)
- **+ Vision** (📷 Crop Image → Possible Disease / Confidence / Action, with disclaimer)
- **+ Voice** (Speech→STT→AI→TTS, Hindi/Marathi/English)
- **+ Personalized** (Farmer + Crop + Stage + Soil + Location + Weather + Question → Personalized Response)

## 16-27. Core Modules
- **My Crops:** name, variety, planting date, area, stage, health
- **Soil Health:** N,P,K,pH,OC raw + interpretation + status + AI insight
- **Weather:** temp, humidity, wind, rain probability, forecast, alerts (location-based)
- **Mandi Prices:** crop, market, price/q, date, search/filter
- **Crop Calendar:** land prep → sowing → germination → ... → harvest (personalized by crop+date)
- **Reminders:** irrigation, fertilizer, pesticide, harvest, scheme deadlines
- **Kisan Store:** nearby govt/private/seed/fertilizer/equipment stores + maps
- **Farmer Community:** posts, Q&A, comments
- **Farming Guide:** cultivation, soil, irrigation, pest/disease, storage (simple + practical)
- **Govt Schemes:** name, benefits, eligibility, docs, process, official source
- **Dashboard:** crops 3, soil healthy, 28°C, AI insight, mandi, upcoming (daily control center)
- **User Profile:** name, photo, location, lang, farm area, crops
- **Auth:** SignUp → Profile → Login → Dashboard (Supabase Auth, UI-only for now)

## 28-30. Supabase Backend (Future)
- React Frontend → Supabase (Auth + PostgreSQL + Storage + RLS)
- Tables: `profiles → crops, soil_tests, reminders, community_posts, notifications, ai_reports` + `market_prices, weather_data, government_schemes`

## 31. Architecture Diagram
```
Kisan Care (React+Vite) → Farmer / AI (Text/Voice/Vision) / Dashboard → Supabase → External (Weather/Mandi/Maps) → Personalized Experience
```

## 32. User Journey
Open → Cinematic Logo Intro → Landing → Get Started → Create Account/Profile → Add Farm/Crops/Soil → Dashboard daily → Weather/Crop/AI/Mandi

## 33. Vision
AI-powered decision-support system, not a website with many pages.

## 34. Responsive
Desktop, Laptop, Tablet, Mobile — mobile first, large buttons, readable text, touch-friendly.

## 35. UI/UX Philosophy
🌾 Agricultural + 🤖 Intelligent + ❤️ Human + 💎 Premium + ⚡ Fast — "Premium does not mean complicated."

## 36. Cinematic Landing
Logo glow → particle dissolve → hero reveal — smooth, short (1.8s), lightweight, GPU-friendly (transform/opacity only).

## 37. Tech Stack
- **Frontend:** React 19, Vite 8, Tailwind 4, TanStack Router/Start, GSAP 3.15, shadcn/ui, Lucide
- **Backend (future):** Supabase, PostgreSQL, RLS, Storage
- **AI (future):** Text/Voice/Vision, Recommendation Engine
- **External:** Weather API, Mandi, Maps, Govt sources

## 38. Project Structure
```
KISAN-CARE/
├── frontend/src/
│   ├── components/BrandIntro, Navbar, Hero, TrustSection, FeatureSection, AISection, DiseaseDetection, HowItWorks, CTA, Footer, Logo
│   ├── pages / routes
│   ├── data/landing.ts
│   ├── hooks/use-gsap, use-reveal
│   ├── lib/gsap, utils
│   └── assets/
└── backend/ (future)
```

## 39. Development Phases
1. UI/UX (Landing, Design System, Navbar) — ✅ done
2. App Frontend (Login, Dashboard, 11 modules) — next
3. Supabase (Auth, DB, Storage, RLS)
4. Real Data (Weather, Mandi, Maps)
5. AI (Chatbot, Soil/Crop Intelligence, Voice, Vision)
6. Advanced (Notifications, Personalization, Analytics, i18n)

## 40. Final Vision
Farmer → Personalized Dashboard (Weather/Crops/Soil/Mandi/Calendar) → Kisan AI (Chat/Voice/Vision) → Smart Recommendations → Better Decision

---

## Frontend Landing — Current Build

### Premium Fixes (This Commit)
- **Logo:** Fixed zoomed-out `h-11 p-[6%]` → `h-11 object-cover rounded-[22%]` using local `kisan-mark.jpg` (73.58 kB), crisp shadow, hover scale
- **Navbar:** Full-width bar → floating island `top-3 rounded-2xl backdrop-blur-xl` with glass effect, auto tone switch on scroll, lock body scroll on mobile
- **BrandIntro:** 2.4s → 1.8s cinematic 3D perspective (`rotateX/Y`), depth-aware particles (`depth` + scale), dot grid + gold divider, reduced-motion fallback
- **Hero:** Single column → `lg:grid 1.05/0.9` with floating dashboard preview (Live readout, Weather/Health/Mandi cards, NPK bar), gold gradient headline, pill CTAs
- **TrustSection:** `py-32` → `py-16/24` + gradient bg + tighter chips

### Stack
React 19 + Vite 8 + Tailwind 4 + TanStack Start + GSAP + shadcn — frontend-only, no backend in this build.

### Development
```sh
git clone <repo-url>
cd kisancareletest-main
npm i
npm run dev      # vite dev
npm run build    # vite build (SSR via Nitro)
npm run lint
npm run format
```

### Project Context (Lovable Prompt Preserved)
Original Lovable landing spec (11 features, cinematic intro requirements, farmer-first principles, animation performance rules, responsive 360-1920, a11y, component architecture) is fully implemented as frontend-only with mock data.

This code is yours. Push to `main` and Lovable syncs back.

Built with [Lovable](https://lovable.dev)
