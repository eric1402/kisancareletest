import React from "react";
import { BarChart3, Crown } from "lucide-react";

export default function AIUsageCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
      {/* Header with Icon and Title */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-xl bg-[#eaf7ec] flex items-center justify-center shrink-0">
          <BarChart3 className="w-4 h-4 text-[#2f9e44]" strokeWidth={2.2} />
        </div>
        <h3 className="font-bold text-[15px] sm:text-base text-gray-900 tracking-tight">
          AI Usage
        </h3>
      </div>

      {/* Query count */}
      <p className="text-xs text-gray-600 font-medium">
        You&apos;ve used <span className="font-bold text-gray-900">12 of 50</span> queries this month.
      </p>

      {/* Progress Bar with 24% label */}
      <div className="flex items-center gap-3 mt-2.5">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2f9e44] rounded-full transition-all duration-500"
            style={{ width: "24%" }}
          />
        </div>
        <span className="text-xs font-bold text-gray-700 shrink-0 select-none">
          24%
        </span>
      </div>

      {/* Upgrade Callout */}
      <p className="text-xs text-gray-500 font-medium mt-3.5 leading-relaxed">
        Upgrade to Premium for unlimited access.
      </p>

      {/* Go Premium CTA */}
      <button
        type="button"
        className="w-full mt-3 flex items-center justify-center gap-2 bg-[#2f9e44] hover:bg-[#288a3b] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-xl shadow-xs transition cursor-pointer"
      >
        <Crown className="w-4 h-4" />
        <span>Go Premium</span>
      </button>
    </div>
  );
}
