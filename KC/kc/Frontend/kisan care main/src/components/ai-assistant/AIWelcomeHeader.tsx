import React from "react";
import { Sprout, ShieldAlert, CloudSun, BarChart3 } from "lucide-react";
import KisanAIAvatar from "./KisanAIAvatar";

interface AIWelcomeHeaderProps {
  onSelectSuggestion?: (question: string) => void;
}

const suggestions = [
  {
    id: "fertilizer",
    title: "Best fertilizer\nfor wheat",
    question: "What is the best fertilizer for wheat crop at tillering stage?",
    icon: Sprout,
    iconColor: "text-[#2f9e44]",
    iconBg: "bg-transparent",
  },
  {
    id: "yellow-rust",
    title: "How to control\nyellow rust?",
    question: "How to prevent and control yellow rust disease in wheat crop?",
    icon: ShieldAlert,
    iconColor: "text-[#2f9e44]",
    iconBg: "bg-transparent",
  },
  {
    id: "weather",
    title: "Upcoming weather\nfor next 7 days",
    question: "What is the upcoming weather forecast for the next 7 days in Pune, Maharashtra?",
    icon: CloudSun,
    iconColor: "text-[#3b82f6]",
    iconBg: "bg-transparent",
  },
  {
    id: "market-price",
    title: "Market price of\ntomato",
    question: "What is the current mandi market price and trend for tomato?",
    icon: BarChart3,
    iconColor: "text-[#2f9e44]",
    iconBg: "bg-transparent",
  },
];

export default function AIWelcomeHeader({ onSelectSuggestion }: AIWelcomeHeaderProps) {
  return (
    <div className="w-full">
      {/* Greeting and Robot Avatar */}
      <div className="flex items-center gap-4">
        <KisanAIAvatar size="lg" showSproutAnimation />
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Hello Prathamesh! <span className="inline-block animate-wave origin-bottom-right">👋</span>
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-0.5">
            How can I help you with your farming today?
          </p>
        </div>
      </div>

      {/* 4 Horizontal Suggestion Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
        {suggestions.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSuggestion?.(item.question)}
              className="group flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-gray-200/80 hover:border-[#2f9e44]/60 hover:bg-[#fbfdfb] hover:shadow-xs transition-all duration-200 text-center cursor-pointer active:scale-[0.98]"
            >
              <div className="mb-2.5 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${item.iconColor}`} strokeWidth={1.9} />
              </div>
              <span className="text-xs sm:text-[13px] font-medium text-gray-700 leading-snug whitespace-pre-line group-hover:text-gray-900">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
