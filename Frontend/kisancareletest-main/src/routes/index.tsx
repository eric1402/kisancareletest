import { createFileRoute } from "@tanstack/react-router";
import { BrandIntro } from "@/components/BrandIntro";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustSection } from "@/components/TrustSection";
import { FeatureSection } from "@/components/FeatureSection";
import { AISection } from "@/components/AISection";
import { DiseaseDetection } from "@/components/DiseaseDetection";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const title = "Kisan Care — Smart Farming Platform for Indian Farmers";
const description =
  "Weather, crop tracking, soil health, mandi prices, government schemes and an AI farming assistant — all in one simple platform built for farmers.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <BrandIntro />
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <FeatureSection />
        <AISection />
        <DiseaseDetection />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
