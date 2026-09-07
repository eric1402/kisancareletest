# Kisan Care — Premium AgriTech Landing Page

A single, presentation-ready landing page with a cinematic brand intro, built as modular components so future modules (Dashboard, Weather, Mandi, etc.) can be added later without rework. Frontend only: no backend, no auth, no external APIs — all content is realistic static/mock data.

## Design system

- Palette (semantic tokens, oklch): deep natural green (primary), rich dark green (dark sections/footer), warm cream off-white (background), tan / clay / muted gold accents, warm grey neutrals for text. Green used as accent and brand signature, not wall-to-wall.
- Typography: Plus Jakarta Sans (headlines) + Inter (body), loaded via a font `<link>` in the root document head. Large confident headlines, generous line-height, no thin low-contrast text.
- Tokens live in `src/styles.css` (Tailwind v4 `@theme inline`), including brand gradients and soft elevation shadows. No hardcoded color utilities in components.

## Page sections (in scroll order)

1. **Brand intro** — logo mark + wordmark on a dark organic background, subtle glow, dissolving into a lightweight canvas particle drift that fades into the hero. ~2.5s, plays once per session, GPU-friendly (transform/opacity/canvas only), fully skipped with a plain fade under `prefers-reduced-motion`, unmounts cleanly.
2. **Navbar** — sticky, compact, transparent over hero then blurred/solid after scroll. Logo left, links (Home, Features, How It Works, About, Contact), Get Started button. Elegant slide-in mobile menu, keyboard accessible, visible focus rings.
3. **Hero** — eyebrow `SMART FARMING PLATFORM`, multi-line headline, supporting copy, primary + ghost CTA, cinematic crop-field visual with soft tech overlays (data readout, scan line, crop-health indicator), gentle parallax / scale-in.
4. **Trust section** — "Everything a farmer needs. In one place." with staggered icon chips (Weather, Crops, Soil, Mandi, Schemes, Guidance) converging on a Kisan Care focal card.
5. **Core features** — 11 features in a mixed layout: 4 flagship blocks (Weather, My Crops, Soil Health, Mandi Prices) with visual + mock mini-widget/chart, and the remaining 7 in a tighter supporting card grid with hover lift.
6. **AI Kisan Assistant** — flagship mocked chat card: farmer question in mixed Hindi-English, on-brand pulsing analyzing indicator, context chips (soil, crop stage, weather), causes panel and recommendation card.
7. **Crop disease detection** — drag-and-drop styled upload zone with a leaf image already "uploaded", analyzing state, result card with mock disease, confidence bar, plain-language action.
8. **How it works** — 4 steps with connecting line, icons, short copy.
9. **Farmer benefits + final CTA** — trust closing, then a dark rich-green CTA band.
10. **Footer** — dark green, logo, tagline, quick links, placeholder contact/social, copyright.

## Imagery

Generated assets under `src/assets/`: hero crop field with subtle tech overlay, flagship feature visuals (weather, crops, soil, mandi), and a diseased crop leaf close-up. Imported as ES modules with meaningful alt text.

## Animation

Intersection-observer fade-up reveals, transform-only parallax, image scale-in, headline text reveal, hover micro-interactions, smooth navbar transition, sparse floating leaf accents. Reduced-motion disables intro, parallax, and heavy transitions. Nothing animates layout properties.

## Technical notes

- Stack is TanStack Start (React 19 + Vite + Tailwind v4). The landing page replaces the placeholder `src/routes/index.tsx`; the route file stays thin and composes section components. Route-level `head()` gets a Kisan Care title, description, og/twitter tags.
- Components under `src/components/<Name>/index.tsx`: BrandIntro, Navbar, Hero, TrustSection, FeatureSection, FeatureCard, AISection, DiseaseDetection, HowItWorks, CTA, Footer. Prop-driven; feature/step/mock content lives in `src/data/landing.ts` so it can later be swapped for real data sources.
- Shared reveal hook (`useReveal`) and `usePrefersReducedMotion` in `src/hooks/`.
- Session flag in `sessionStorage` gates the intro; reads happen after hydration to avoid SSR mismatch.
- Responsive and verified at 1920 / 1440 / 1024 / 768 / 480 / 390 / 360 with no horizontal scroll; semantic landmarks and heading order throughout.
