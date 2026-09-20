import { Crown, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export default function AITipBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#f4fbf5] rounded-2xl p-3.5 sm:p-5 border border-[#d6f0db] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 transition-all animate-in fade-in duration-200 card-3d-hover relative">
      {/* Dismiss button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-kc-text p-1 rounded-lg hover:bg-black/5 transition sm:order-last"
        aria-label="Dismiss tip"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Left side: Icon + Content */}
      <div className="flex items-start sm:items-center gap-3 min-w-0 pr-6 sm:pr-0">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#d6efdb] shadow-2xs flex items-center justify-center shrink-0">
          <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-kc-green" />
        </div>

        <div className="min-w-0">
          <div className="font-bold text-kc-text text-xs sm:text-sm leading-snug">
            AI Tip for You
          </div>
          <p className="text-xs text-kc-muted mt-0.5 leading-relaxed">
            Due to expected light rain in 3 days, prepare proper drainage in your field.
          </p>
        </div>
      </div>

      {/* Action link */}
      <div className="flex items-center justify-end sm:shrink-0 pt-0.5 sm:pt-0">
        <Link
          to={"/ai-assistant" as any}
          className="text-xs font-bold text-kc-green flex items-center gap-1 hover:underline whitespace-nowrap"
        >
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
