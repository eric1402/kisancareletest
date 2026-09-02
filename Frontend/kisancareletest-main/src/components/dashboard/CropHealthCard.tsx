import { MoreVertical } from "lucide-react";
import { Link } from "@tanstack/react-router";
import wheatImg from "@/assets/dashboard/crops/wheat.jpg";
import sugarcaneImg from "@/assets/dashboard/crops/sugarcane.jpg";
import onionImg from "@/assets/dashboard/crops/onion.jpg";
import tomatoImg from "@/assets/dashboard/crops/tomato.jpg";

const crops = [
  {
    name: "Wheat",
    image: wheatImg,
    status: "Healthy",
    pct: 80,
    statusColor: "text-kc-green",
    barColor: "bg-kc-green",
  },
  {
    name: "Sugarcane",
    image: sugarcaneImg,
    status: "Healthy",
    pct: 72,
    statusColor: "text-kc-green",
    barColor: "bg-kc-green",
  },
  {
    name: "Onion",
    image: onionImg,
    status: "Moderate",
    pct: 60,
    statusColor: "text-[#E67E22]",
    barColor: "bg-[#E67E22]",
  },
  {
    name: "Tomato",
    image: tomatoImg,
    status: "Healthy",
    pct: 85,
    statusColor: "text-kc-green",
    barColor: "bg-kc-green",
  },
];

export default function CropHealthCard() {
  return (
    <div className="bg-white rounded-2xl border border-kc-border p-5 shadow-xs h-full flex flex-col justify-between card-3d-hover">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-sm text-kc-text">Crop Health Overview</span>
        <Link
          to={"/crops" as any}
          className="text-xs font-semibold text-kc-green hover:underline"
        >
          View All
        </Link>
      </div>

      {/* 4 Crop Items */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
        {crops.map((crop) => (
          <div
            key={crop.name}
            className="flex flex-col rounded-xl p-1 group hover:bg-gray-50/70 transition-all"
          >
            {/* Image */}
            <div className="rounded-xl overflow-hidden h-28 sm:h-30 w-full mb-2.5 bg-gray-100 shadow-2xs">
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Name + Menu */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-kc-text leading-tight">
                {crop.name}
              </span>
              <button
                type="button"
                className="text-gray-400 hover:text-kc-text p-0.5 rounded"
                aria-label={`Options for ${crop.name}`}
              >
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Status */}
            <div className={`text-xs font-bold mt-0.5 mb-2 ${crop.statusColor}`}>
              {crop.status}
            </div>

            {/* Progress Bar + Percentage Row */}
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-[11px] font-bold text-kc-text shrink-0">
                {crop.pct}%
              </span>
              <div className="h-1.5 flex-1 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${crop.barColor} transition-all duration-700`}
                  style={{ width: `${crop.pct}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
