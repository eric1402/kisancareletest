import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AIWelcomeHeader from "@/components/ai-assistant/AIWelcomeHeader";
import AIChatThread, { type ChatMessage } from "@/components/ai-assistant/AIChatThread";
import AIChatInput from "@/components/ai-assistant/AIChatInput";
import RecentConversationsCard from "@/components/ai-assistant/RecentConversationsCard";
import AIUsageCard from "@/components/ai-assistant/AIUsageCard";
import QuickActionsCard from "@/components/ai-assistant/QuickActionsCard";


export const Route = createFileRoute("/ai-assistant")({
  head: () => ({
    meta: [
      { title: "AI Kisan Assistant — Kisan Care Smart Farming" },
      {
        name: "description",
        content:
          "Your smart farming companion. Ask anything about crops, weather, soil, diseases and more.",
      },
    ],
  }),
  component: AIAssistantPage,
});

const initialMessages: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "user",
    text: "What is the best fertilizer for wheat crop at tillering stage?",
    time: "10:30 AM",
  },
  {
    id: "msg-2",
    sender: "assistant",
    text: "At the tillering stage, apply 2nd dose of nitrogen for better growth.",
    time: "10:30 AM",
    recommendations: [
      "Urea – 55 kg/acre",
      "Zinc Sulphate – 10 kg/acre (if deficiency)",
      "Keep soil moist for better absorption.",
    ],
    whyThisWorks: "Nitrogen promotes tiller formation and overall plant growth.",
  },
];

function AIAssistantPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isThinking, setIsThinking] = useState(false);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const generateAIResponse = (query: string): Omit<ChatMessage, "id" | "time"> => {
    const lower = query.toLowerCase();

    if (lower.includes("rust") || lower.includes("disease") || lower.includes("diagnose")) {
      return {
        sender: "assistant",
        text: "Yellow rust (Puccinia striiformis) spreads rapidly in cool, humid weather. Immediate foliar control is advised.",
        recommendations: [
          "Propiconazole 25% EC (Tilt) @ 1 ml per litre of water (200 ml/acre)",
          "Spray during clear morning hours covering both upper and lower leaf surfaces",
          "Inspect nearby wheat plots to prevent fungal spore dispersal",
        ],
        whyThisWorks: "Systemic triazole active ingredient halts fungal ergosterol synthesis and protects emerging flag leaves.",
      };
    }

    if (lower.includes("weather") || lower.includes("rain") || lower.includes("temperature")) {
      return {
        sender: "assistant",
        text: "Upcoming 7-day outlook for Pune region shows stable weather with mild morning humidity.",
        recommendations: [
          "Temperature range: 21°C (Min) to 33°C (Max)",
          "Light drizzle expected on Day 4 (15% probability)",
          "Ideal window for fertilizer top-dressing and irrigation over the next 48 hours",
        ],
        whyThisWorks: "Moderate soil warmth and absence of heavy downpours prevent nutrient leaching and optimize root uptake.",
      };
    }

    if (lower.includes("tomato") || lower.includes("mandi") || lower.includes("market") || lower.includes("price") || lower.includes("onion")) {
      return {
        sender: "assistant",
        text: "Wholesale APMC terminal markets report steady demand with firm modal prices.",
        recommendations: [
          "Pune APMC: ₹2,600 – ₹2,850 per quintal (Up ₹120)",
          "Nashik APMC: ₹2,400 – ₹2,700 per quintal",
          "Harvest firm, breaker-stage produce early morning to minimize transit losses",
        ],
        whyThisWorks: "Arrival volumes remain moderate against consistent retail demand in urban trading hubs.",
      };
    }

    if (lower.includes("soil") || lower.includes("fertility") || lower.includes("carbon")) {
      return {
        sender: "assistant",
        text: "To build long-term biological fertility and improve soil water retention:",
        recommendations: [
          "Apply well-decomposed Farm Yard Manure (FYM) @ 4 tonnes/acre",
          "Introduce biofertilizers (Azotobacter & PSB) during irrigation",
          "Maintain regular mulching to preserve topsoil rhizosphere biology",
        ],
        whyThisWorks: "Active microbial inoculation accelerates organic matter breakdown and unlocks bound soil phosphorus.",
      };
    }

    if (lower.includes("sugarcane") || lower.includes("irrigation") || lower.includes("water")) {
      return {
        sender: "assistant",
        text: "Sugarcane during tillering and formative stage requires systematic moisture management.",
        recommendations: [
          "Maintain 8–10 day irrigation intervals in medium soils (6–8 days in light soils)",
          "Use drip fertigation to achieve 35% water savings and uniform cane growth",
          "Ensure no water-logging near root zone to avoid shoot borer infestation",
        ],
        whyThisWorks: "Consistent capillary moisture prevents moisture stress during critical internode elongation.",
      };
    }

    // Default smart farming response
    return {
      sender: "assistant",
      text: `Here is the customized Kisan Care recommendation for your query: "${query}"`,
      recommendations: [
        "Monitor crop stages closely and verify local soil moisture levels",
        "Apply balanced nutrient doses based on your latest Soil Health Card",
        "Consult local Krishi Vigyan Kendra (KVK) for regional advisories",
      ],
      whyThisWorks: "Targeted precision farming inputs minimize operational costs while maximizing harvest quality.",
    };
  };

  const handleSendMessage = (userText: string) => {
    if (!userText.trim()) return;

    const newMsgId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: newMsgId,
      sender: "user",
      text: userText,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    setTimeout(() => {
      const responseData = generateAIResponse(userText);
      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        ...responseData,
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsThinking(false);
    }, 850);
  };

  const handleReaction = (messageId: string, type: "like" | "dislike") => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== messageId) return msg;
        if (type === "like") {
          return { ...msg, liked: !msg.liked, disliked: false };
        } else {
          return { ...msg, disliked: !msg.disliked, liked: false };
        }
      })
    );
  };

  const handleSelectRecent = (title: string) => {
    handleSendMessage(title);
  };

  const handleSelectQuickAction = (_label: string, query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="flex h-screen max-h-screen w-full overflow-hidden bg-kc-bg text-kc-text antialiased">
      {/* Existing Global Sidebar - UNTOUCHED */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area - Locked to viewport height */}
      <div className="flex-1 flex flex-col min-w-0 h-screen max-h-screen overflow-hidden">
        {/* Existing Top Header - UNTOUCHED & Fixed */}
        <div className="shrink-0">
          <DashboardHeader
            onToggleMobileSidebar={() => setMobileMenuOpen((prev) => !prev)}
          />
        </div>

        {/* Viewport content area */}
        <main className="flex-1 min-h-0 overflow-hidden p-4 sm:p-5 lg:p-6 max-w-[1600px] w-full mx-auto flex flex-col">
          {/* Main Page Header - Fixed */}
          <div className="shrink-0 mb-3 sm:mb-4 flex flex-col gap-0.5">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center text-[#2f9e44]">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#2f9e44] fill-[#2f9e44]/20" strokeWidth={2.2} />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                AI Kisan Assistant
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Your smart farming companion. Ask anything about crops, weather, soil, diseases and more.
            </p>
          </div>

          {/* Two-Column Layout — Chat is wider now (9 cols), right sidebar narrower (3 cols) */}
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-5 items-stretch">
            {/* Left Column: AI Chat — wider for more conversation space */}
            <div className="lg:col-span-9 flex flex-col h-full min-h-0">
              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-4 sm:p-5 flex flex-col h-full min-h-0">
                {/* Top Section: Greeting and 4 Suggestion Cards (Fixed) */}
                <div className="shrink-0 pb-3">
                  <AIWelcomeHeader onSelectSuggestion={handleSendMessage} />
                </div>

                {/* Conversation Area - THE INTERNAL SCROLLABLE REGION */}
                {/* data-lenis-prevent stops the Lenis smooth-scroll library from
                    hijacking wheel events so the div scrolls naturally on its own */}
                <div
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  className="flex-1 min-h-0 overflow-y-auto custom-scrollbar border-t border-gray-100 py-3 sm:py-4 pr-1 sm:pr-2 overscroll-contain"
                >
                  <AIChatThread
                    messages={messages}
                    isThinking={isThinking}
                    onReaction={handleReaction}
                  />
                </div>

                {/* Bottom Section: Input Area (Fixed at bottom) */}
                <div className="shrink-0 pt-3 border-t border-gray-100">
                  <AIChatInput
                    onSendMessage={handleSendMessage}
                    disabled={isThinking}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Quick Actions → Recent Conversations → AI Usage */}
            <div className="lg:col-span-3 flex flex-col h-full min-h-0 gap-2 overflow-hidden">
              {/* 1. Quick Actions — top */}
              <div className="shrink-0">
                <QuickActionsCard onSelectAction={handleSelectQuickAction} />
              </div>

              {/* 2. Recent Conversations — middle */}
              <div className="shrink-0">
                <RecentConversationsCard onSelectConversation={handleSelectRecent} />
              </div>

              {/* 3. AI Usage — bottom, kept exactly as-is */}
              <div className="shrink-0">
                <AIUsageCard />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
