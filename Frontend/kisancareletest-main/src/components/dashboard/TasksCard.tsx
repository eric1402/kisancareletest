import { Droplet, Sprout, SprayCan, Leaf } from "lucide-react";
import { Link } from "@tanstack/react-router";

// SVG for fertilizer sack icon
function FertilizerSackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-kc-green" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8 L18 8 L16 20 L8 20 Z" />
      <path d="M8 8 C 8 5, 10 4, 12 4 C 14 4, 16 5, 16 8" />
      <circle cx="12" cy="14" r="2" />
    </svg>
  );
}

// SVG for pesticide bottle icon
function PesticideBottleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-kc-green" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="9" width="10" height="11" rx="2" />
      <path d="M10 5 L14 5 L14 9 L10 9 Z" />
      <line x1="9" y1="5" x2="15" y2="5" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  );
}

const tasks = [
  {
    icon: Droplet,
    customIcon: null,
    title: "Irrigation for Wheat",
    time: "Today, 8:00 AM",
    priority: "High",
    badgeColor: "bg-[#EAF7EC] text-[#2F9E44]",
  },
  {
    icon: Sprout,
    customIcon: FertilizerSackIcon,
    title: "Fertilizer for Sugarcane",
    time: "Tomorrow, 10:00 AM",
    priority: "Medium",
    badgeColor: "bg-[#FEF3C7] text-[#D97706]",
  },
  {
    icon: SprayCan,
    customIcon: PesticideBottleIcon,
    title: "Pesticide Spray",
    time: "18 May 2024",
    priority: "Medium",
    badgeColor: "bg-[#FEF3C7] text-[#D97706]",
  },
  {
    icon: Leaf,
    customIcon: null,
    title: "Weeding in Onion",
    time: "20 May 2024",
    priority: "Low",
    badgeColor: "bg-[#EAF7EC] text-[#2F9E44]",
  },
];

export default function TasksCard() {
  return (
    <div className="bg-white rounded-2xl border border-kc-border p-5 shadow-xs flex flex-col justify-between card-3d-hover">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-sm text-kc-text">Upcoming Tasks</span>
        <Link
          to={"/calendar" as any}
          className="text-xs font-semibold text-kc-green hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Task items list */}
      <div className="space-y-3.5 flex-1 flex flex-col justify-center">
        {tasks.map((task) => {
          const Icon = task.icon;
          const CustomIcon = task.customIcon;

          return (
            <div
              key={task.title}
              className="flex items-center justify-between gap-3 group"
            >
              {/* Left icon and title */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-kc-green-light flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {CustomIcon ? (
                    <CustomIcon />
                  ) : (
                    <Icon className="w-4 h-4 text-kc-green" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-kc-text truncate leading-tight">
                    {task.title}
                  </div>
                  <div className="text-[11px] text-kc-muted mt-0.5 font-medium">
                    {task.time}
                  </div>
                </div>
              </div>

              {/* Priority badge */}
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${task.badgeColor}`}
              >
                {task.priority}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
