import { Bot, Sprout, BarChart3, FlaskConical, CloudSun, ShoppingCart } from "lucide-react";
import { Link } from "@tanstack/react-router";

const actions = [
  { icon: Bot, label: "AI Assistant", to: "/ai-assistant" },
  { icon: Sprout, label: "Crop Doctor", to: "/crop-doctor" },
  { icon: BarChart3, label: "Market Prices", to: "/mandi" },
  { icon: FlaskConical, label: "Soil Health", to: "/soil" },
  { icon: CloudSun, label: "Weather", to: "/weather" },
  { icon: ShoppingCart, label: "Kisan Store", to: "/store" },
];

export default function QuickActionsCard() {
  return (
    <div className="bg-white rounded-2xl border border-kc-border p-5 shadow-xs flex flex-col justify-between card-3d-hover">
      {/* Header */}
      <span className="font-bold text-sm text-kc-text block mb-3">
        Quick Actions
      </span>

      {/* 3x2 Grid of Actions */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3 flex-1">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              to={action.to as any}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border border-kc-border/90 bg-white hover:bg-[#f3faf4] hover:border-[#a8e0b4] hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-center group active:scale-[0.96]"
            >
              <div className="w-8 h-8 rounded-full bg-kc-green-light flex items-center justify-center group-hover:scale-115 group-hover:bg-[#d8f4df] transition-all duration-200">
                <Icon className="w-4 h-4 text-kc-green" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-kc-text leading-tight group-hover:text-kc-green transition-colors">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
