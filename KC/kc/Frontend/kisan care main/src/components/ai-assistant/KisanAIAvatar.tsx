import React from "react";

interface KisanAIAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showSproutAnimation?: boolean;
}

export default function KisanAIAvatar({
  size = "md",
  className = "",
  showSproutAnimation = false,
}: KisanAIAvatarProps) {
  const sizeMap = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-16 h-16 sm:w-[68px] sm:h-[68px]",
    xl: "w-20 h-20",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#f2fbf4] to-[#e4f6e8] border-2 border-[#2f9e44]/35 shadow-xs shrink-0 select-none overflow-hidden ${sizeMap[size]} ${className}`}
      style={{ aspectRatio: "1/1" }}
      aria-label="AI Kisan Assistant Avatar"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[88%] h-[88%] transform translate-y-0.5"
      >
        <defs>
          {/* Subtle drop shadow */}
          <filter id="robot-shadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
          </filter>

          {/* Screen glow */}
          <linearGradient id="screen-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a3325" />
            <stop offset="100%" stopColor="#0d1f16" />
          </linearGradient>

          {/* Sprout leaf gradient */}
          <linearGradient id="sprout-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#44cf5d" />
            <stop offset="100%" stopColor="#259a3c" />
          </linearGradient>

          {/* Eye glow gradient */}
          <linearGradient id="eye-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#68e57d" />
            <stop offset="100%" stopColor="#2ec24d" />
          </linearGradient>

          {/* Neck / Body gradient */}
          <linearGradient id="body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d8ebe0" />
            <stop offset="100%" stopColor="#b5d6c2" />
          </linearGradient>
        </defs>

        {/* Shoulders / Torso base */}
        <path
          d="M26 86 C26 76, 38 72, 50 72 C62 72, 74 76, 74 86 Z"
          fill="url(#body-grad)"
        />
        <path
          d="M42 72 L42 76 C42 78, 58 78, 58 76 L58 72 Z"
          fill="#94bfa5"
        />

        {/* Ears / Side antennas */}
        <rect x="15" y="44" width="7" height="12" rx="3.5" fill="#a4ceb5" />
        <circle cx="18.5" cy="50" r="2" fill="#2f9e44" />
        <rect x="78" y="44" width="7" height="12" rx="3.5" fill="#a4ceb5" />
        <circle cx="81.5" cy="50" r="2" fill="#2f9e44" />

        {/* Robot Head Outer Shell */}
        <rect
          x="20"
          y="26"
          width="60"
          height="46"
          rx="18"
          fill="#ffffff"
          stroke="#9fc9b1"
          strokeWidth="2.5"
          filter="url(#robot-shadow)"
        />

        {/* Inner Screen Face */}
        <rect
          x="24"
          y="30"
          width="52"
          height="38"
          rx="13"
          fill="url(#screen-grad)"
        />

        {/* Eye Left */}
        <ellipse cx="39" cy="46" rx="5" ry="6" fill="url(#eye-grad)" />
        {/* Eye Right */}
        <ellipse cx="61" cy="46" rx="5" ry="6" fill="url(#eye-grad)" />

        {/* Eye highlights */}
        <circle cx="37.5" cy="44" r="1.5" fill="#ffffff" opacity="0.9" />
        <circle cx="59.5" cy="44" r="1.5" fill="#ffffff" opacity="0.9" />

        {/* Friendly smile */}
        <path
          d="M43 55 Q50 60 57 55"
          stroke="#41d85c"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Top Antenna Stem & Farming Sprout Leaf */}
        <g className={showSproutAnimation ? "animate-float-3d" : ""}>
          {/* Stem */}
          <path
            d="M50 26 L50 17"
            stroke="#2f9e44"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Left Leaf of Sprout */}
          <path
            d="M50 18 C46 14, 38 12, 34 16 C34 23, 44 22, 50 18 Z"
            fill="url(#sprout-grad)"
            stroke="#218134"
            strokeWidth="1"
          />
          {/* Left Leaf vein */}
          <path
            d="M48 18 C43 16, 38 15, 36 16"
            stroke="#e0f5e5"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Leaf of Sprout */}
          <path
            d="M50 18 C54 13, 62 11, 66 15 C66 22, 56 21, 50 18 Z"
            fill="url(#sprout-grad)"
            stroke="#218134"
            strokeWidth="1"
          />
          {/* Right Leaf vein */}
          <path
            d="M52 18 C57 15, 62 14, 64 15"
            stroke="#e0f5e5"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Tiny center bud */}
          <circle cx="50" cy="17" r="1.8" fill="#5fe375" />
        </g>
      </svg>
    </div>
  );
}
