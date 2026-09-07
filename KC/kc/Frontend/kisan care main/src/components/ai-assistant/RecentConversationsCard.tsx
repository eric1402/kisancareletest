import React from "react";
import {
  Sprout,
  Leaf,
  TrendingUp,
  FlaskConical,
  Droplets,
  ChevronRight,
} from "lucide-react";

interface RecentConversationsCardProps {
  onSelectConversation?: (title: string) => void;
}

const recentConversations = [
  {
    id: "1",
    title: "Best fertilizer for wheat",
    date: "10:30 AM",
    icon: Sprout,
    iconColor: "text-[#2f9e44]",
    iconBg: "bg-[#eaf7ec]",
    dotColor: "bg-[#2f9e44]",
  },
  {
    id: "2",
    title: "Tomato leaf curl disease",
    date: "Yesterday",
    icon: Leaf,
    iconColor: "text-[#2f9e44]",
    iconBg: "bg-[#eaf7ec]",
    dotColor: "bg-[#2f9e44]",
  },
  {
    id: "3",
    title: "Market price of onion",
    date: "22 May",
    icon: TrendingUp,
    iconColor: "text-[#2f9e44]",
    iconBg: "bg-[#eaf7ec]",
    dotColor: "bg-[#2f9e44]",
  },
  {
    id: "4",
    title: "How to increase soil fertility?",
    date: "20 May",
    icon: FlaskConical,
    iconColor: "text-[#2f9e44]",
    iconBg: "bg-[#eaf7ec]",
    dotColor: "bg-[#2f9e44]",
  },
  {
    id: "5",
    title: "Irrigation schedule for sugarcane",
    date: "18 May",
    icon: Droplets,
    iconColor: "text-[#3b82f6]",
    iconBg: "bg-[#eef5fd]",
    dotColor: "bg-[#3b82f6]",
  },
];

export default function RecentConversationsCard({
  onSelectConversation,
}: RecentConversationsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-[15px] text-gray-900 tracking-tight">
          Recent Conversations
        </h3>
        <button
          type="button"
          className="text-[11px] font-semibold text-[#2f9e44] hover:text-[#258237] transition-colors cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Conversations List */}
      <ul className="flex flex-col">
        {recentConversations.map((item, idx) => {
          const Icon = item.icon;
          const isLast = idx === recentConversations.length - 1;
          return (
            <li key={item.id} className={!isLast ? "border-b border-gray-100/80" : ""}>
              <button
                type="button"
                onClick={() => onSelectConversation?.(item.title)}
                className="w-full flex items-center justify-between py-2.5 px-2 -mx-2 rounded-xl group hover:bg-[#f7fcf8] transition-all duration-150 cursor-pointer text-left"
              >
                {/* Left: icon + title */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
                  <div
                    className={`w-7 h-7 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-xs`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 ${item.iconColor}`}
                      strokeWidth={2}
                    />
                  </div>
                  <span className="text-[12.5px] font-medium text-gray-700 truncate group-hover:text-gray-900 transition-colors leading-tight">
                    {item.title}
                  </span>
                </div>

                {/* Right: date + chevron */}
                <div className="flex items-center gap-0.5 shrink-0">
                  <span className="text-[11px] font-medium text-gray-400 group-hover:text-gray-500 transition-colors">
                    {item.date}
                  </span>
                  <ChevronRight
                    className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#2f9e44] group-hover:translate-x-0.5 transition-all duration-150"
                    strokeWidth={2.2}
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
