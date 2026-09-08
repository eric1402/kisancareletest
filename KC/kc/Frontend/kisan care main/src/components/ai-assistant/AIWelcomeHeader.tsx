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
      {/* Greeting — ultra-compact so conversation gets max height */}
      <div className="flex items-center gap-2.5">
        <KisanAIAvatar size="sm" showSproutAnimation />
        <div className="min-w-0">
          <h2 className="text-[14px] sm:text-[15px] font-bold text-gray-900 tracking-tight flex items-center gap-1 truncate">
            Hello Prathamesh! <span className="inline-block animate-wave origin-bottom-right">👋</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-500 font-medium leading-none mt-0.5 truncate">
            How can I help you with your farming today?
          </p>
        </div>
      </div>

      {/* 4 Suggestion Cards — ultra-compact */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 mt-2.5">
        {suggestions.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSuggestion?.(item.question)}
              className="group flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl bg-white border border-gray-200/80 hover:border-[#2f9e44]/60 hover:bg-[#fbfdfb] hover:shadow-xs transition-all duration-200 text-center cursor-pointer active:scale-[0.98]"
            >
              <div className="mb-1 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                <IconComponent className={`w-4 h-4 sm:w-[18px] sm:h-[18px] ${item.iconColor}`} strokeWidth={1.9} />
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-gray-700 leading-tight whitespace-pre-line group-hover:text-gray-900">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
