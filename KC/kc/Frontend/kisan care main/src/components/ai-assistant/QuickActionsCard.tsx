import React from "react";
import {
  Sprout,
  ShieldPlus,
  FlaskConical,
  SunMedium,
  BarChart3,
  TestTube2,
} from "lucide-react";

interface QuickActionsCardProps {
  onSelectAction?: (actionTitle: string, queryPrompt: string) => void;
}

const quickActions = [
  {
    id: "crop-advice",
    label: "Crop Advice",
    icon: Sprout,
    query: "Provide optimal crop management and sowing advice for current season.",
  },
  {
    id: "disease-diagnosis",
    label: "Disease Diagnosis",
    icon: ShieldPlus,
    query: "How to identify and diagnose common fungal and pest diseases in crops?",
  },
  {
    id: "fertilizer-guide",
    label: "Fertilizer Guide",
    icon: FlaskConical,
    query: "What is the recommended NPK and micronutrient dosage for my crops?",
  },
  {
    id: "weather-update",
    label: "Weather Update",
    icon: SunMedium,
    query: "What is the local weather forecast and rainfall expectation for this week?",
  },
  {
    id: "market-prices",
    label: "Market Prices",
    icon: BarChart3,
    query: "What are the latest APMC mandi rates and price trends in Maharashtra?",
  },
  {
    id: "soil-health",
    label: "Soil Health",
    icon: TestTube2,
    query: "How can I improve soil organic carbon, pH balance and water retention?",
  },
];

export default function QuickActionsCard({ onSelectAction }: QuickActionsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[15px] sm:text-base text-gray-900 tracking-tight">
          Quick Actions
        </h3>
        <button
          type="button"
          className="text-xs font-semibold text-[#2f9e44] hover:text-[#258237] transition cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 min-[420px]:grid-cols-3 gap-2.5 sm:gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onSelectAction?.(action.label, action.query)}
              className="group flex flex-col items-center justify-center p-3 rounded-xl sm:rounded-2xl border border-gray-200/80 bg-white hover:border-[#2f9e44]/50 hover:bg-[#f6fbf7] hover:shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
            >
              <div className="mb-2 transition-transform duration-200 group-hover:scale-110">
                <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#2f9e44]" strokeWidth={1.8} />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-gray-800 text-center leading-tight break-words">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
