import { Crown, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export default function AITipBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#f4fbf5] rounded-2xl p-4 sm:p-5 border border-[#d6f0db] shadow-2xs flex items-center justify-between gap-4 transition-all animate-in fade-in duration-200 card-3d-hover">
      {/* Left side: Icon + Content */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-10 h-10 rounded-full bg-white border border-[#d6efdb] shadow-2xs flex items-center justify-center shrink-0">
          <Crown className="w-5 h-5 text-kc-green" />
        </div>

        <div className="min-w-0">
          <div className="font-bold text-kc-text text-sm leading-snug">
            AI Tip for You
          </div>
          <p className="text-xs text-kc-muted mt-0.5 leading-relaxed truncate sm:text-clip">
            Due to expected light rain in the next 3 days, make sure to provide proper drainage in your field.
          </p>
        </div>
      </div>

      {/* Right side: View Details link & dismiss button */}
      <div className="flex items-center gap-4 shrink-0">
        <Link
          to={"/ai-assistant" as any}
          className="text-xs font-bold text-kc-green flex items-center gap-1 hover:underline whitespace-nowrap"
        >
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={() => setVisible(false)}
          className="text-gray-400 hover:text-kc-text p-1 rounded-lg hover:bg-black/5 transition"
          aria-label="Dismiss tip"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
