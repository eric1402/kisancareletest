import { Leaf, ClipboardCheck, FlaskConical, Wallet, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

// SVG 3D Sprout in soil illustration
function SproutIllustration() {
  return (
    <svg
      viewBox="0 0 80 80"
      className="w-16 h-16 sm:w-18 sm:h-18 drop-shadow-sm select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soil mound */}
      <ellipse cx="40" cy="66" rx="28" ry="8" fill="#3D2817" opacity="0.15" />
      <ellipse cx="40" cy="64" rx="24" ry="7" fill="#543820" />
      <path
        d="M20 64 C 24 58, 56 58, 60 64 C 54 68, 26 68, 20 64 Z"
        fill="#6E4A2B"
      />
      {/* Soil lumps */}
      <circle cx="30" cy="62" r="3" fill="#422B18" />
      <circle cx="50" cy="63" r="2.5" fill="#422B18" />
      <circle cx="42" cy="65" r="2" fill="#7C5532" />
      <circle cx="36" cy="63" r="1.5" fill="#8D623B" />

      {/* Main Stem */}
      <path
        d="M40 62 C 40 45, 38 35, 39 26"
        stroke="#48A834"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Left Leaf */}
      <path
        d="M39 42 C 24 40, 16 28, 20 18 C 30 20, 37 32, 39 42 Z"
        fill="url(#leftLeafGrad)"
      />
      {/* Right Leaf */}
      <path
        d="M39 36 C 54 34, 62 22, 58 12 C 48 14, 41 26, 39 36 Z"
        fill="url(#rightLeafGrad)"
      />
      {/* Top tiny bud */}
      <path
        d="M39 26 C 35 20, 37 14, 39 12 C 41 14, 43 20, 39 26 Z"
        fill="#6DD343"
      />

      <defs>
        <linearGradient id="leftLeafGrad" x1="18" y1="18" x2="39" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#63CE38" />
          <stop offset="1" stopColor="#358B24" />
        </linearGradient>
        <linearGradient id="rightLeafGrad" x1="58" y1="12" x2="39" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#75DF48" />
          <stop offset="1" stopColor="#3C982A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// SVG 3D Clipboard with checks
function ClipboardIllustration() {
  return (
    <svg
      viewBox="0 0 80 80"
      className="w-16 h-16 sm:w-18 sm:h-18 drop-shadow-sm select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <rect x="22" y="16" width="38" height="52" rx="6" fill="#000000" opacity="0.08" />

      {/* Board */}
      <rect x="20" y="14" width="38" height="52" rx="6" fill="#E8EDF2" stroke="#CBD5E1" strokeWidth="1.5" />

      {/* Paper */}
      <rect x="24" y="20" width="30" height="42" rx="3" fill="#FFFFFF" />

      {/* Metal clip */}
      <rect x="31" y="10" width="16" height="8" rx="2" fill="#94A3B8" />
      <circle cx="39" cy="14" r="2" fill="#475569" />

      {/* Item 1 Check & Line */}
      <path d="M28 29 L31 32 L36 26" stroke="#2F9E44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="39" y1="29" x2="49" y2="29" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />

      {/* Item 2 Check & Line */}
      <path d="M28 39 L31 42 L36 36" stroke="#2F9E44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="39" y1="39" x2="49" y2="39" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />

      {/* Item 3 Check & Line */}
      <path d="M28 49 L31 52 L36 46" stroke="#2F9E44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="39" y1="49" x2="49" y2="49" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Circular progress ring (82%)
function CircularProgressScore({ score = 82 }: { score?: number }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center select-none">
      <svg className="w-16 h-16 sm:w-18 sm:h-18 transform -rotate-90">
        {/* Background track */}
        <circle
          cx="36"
          cy="36"
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="6"
          fill="transparent"
        />
        {/* Progress arc */}
        <circle
          cx="36"
          cy="36"
          r={radius}
          stroke="#2F9E44"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
    </div>
  );
}

// SVG 3D Green Wallet illustration
function WalletIllustration() {
  return (
    <svg
      viewBox="0 0 80 80"
      className="w-16 h-16 sm:w-18 sm:h-18 drop-shadow-sm select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="42" cy="62" rx="26" ry="6" fill="#000000" opacity="0.12" />

      {/* Paper bill peek */}
      <rect x="25" y="23" width="28" height="14" rx="2" fill="#A7F3D0" transform="rotate(-6 25 23)" />
      <rect x="26" y="24" width="26" height="12" rx="1" fill="#D1FAE5" transform="rotate(-6 25 23)" />

      {/* Back wallet layer */}
      <rect x="18" y="28" width="46" height="32" rx="6" fill="#246F33" />

      {/* Main Front Body */}
      <rect x="18" y="32" width="46" height="28" rx="6" fill="url(#walletGrad)" />

      {/* Leather stitch border detail */}
      <rect
        x="20"
        y="34"
        width="42"
        height="24"
        rx="4"
        fill="none"
        stroke="#4EAF3B"
        strokeWidth="1"
        strokeDasharray="2 2"
      />

      {/* Clasp flap */}
      <path
        d="M50 40 L62 40 C 65 40, 66 42, 66 46 C 66 50, 65 52, 62 52 L50 52 Z"
        fill="#1E5C2A"
      />
      {/* Silver button */}
      <circle cx="58" cy="46" r="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
      <circle cx="58" cy="46" r="1" fill="#64748B" />

      <defs>
        <linearGradient id="walletGrad" x1="18" y1="32" x2="64" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#43A838" />
          <stop offset="1" stopColor="#2E7E27" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function StatCardsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
      {/* Card 1: Active Crops */}
      <div className="bg-white rounded-2xl border border-kc-border p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-[#bde4c5] card-3d-hover">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-kc-green-light flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Leaf className="w-3.5 h-3.5 text-kc-green" />
            </div>
            <span className="text-sm font-medium text-kc-muted">Active Crops</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-3xl sm:text-[34px] font-bold text-kc-text leading-tight group-hover:text-kc-green transition-colors">
              4
            </div>
            <div className="absolute right-3 top-4 sm:top-3 animate-float-3d">
              <SproutIllustration />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-2">
          <Link
            to={"/crops" as any}
            className="text-xs font-semibold text-kc-green flex items-center gap-1.5 hover:underline group-hover:gap-2 transition-all w-fit"
          >
            View My Crops <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Card 2: Upcoming Tasks */}
      <div className="bg-white rounded-2xl border border-kc-border p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-[#bde4c5] card-3d-hover">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-kc-green-light flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ClipboardCheck className="w-3.5 h-3.5 text-kc-green" />
            </div>
            <span className="text-sm font-medium text-kc-muted">Upcoming Tasks</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-3xl sm:text-[34px] font-bold text-kc-text leading-tight group-hover:text-kc-green transition-colors">
              7
            </div>
            <div className="absolute right-3 top-4 sm:top-3 animate-float-3d-rev">
              <ClipboardIllustration />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-2">
          <Link
            to={"/calendar" as any}
            className="text-xs font-semibold text-kc-green flex items-center gap-1.5 hover:underline group-hover:gap-2 transition-all w-fit"
          >
            View Tasks <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Card 3: Soil Health Score */}
      <div className="bg-white rounded-2xl border border-kc-border p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-[#bde4c5] card-3d-hover">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-kc-green-light flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <FlaskConical className="w-3.5 h-3.5 text-kc-green" />
            </div>
            <span className="text-sm font-medium text-kc-muted">Soil Health Score</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-[34px] font-bold text-kc-text leading-tight group-hover:text-kc-green transition-colors">
                  82
                </span>
                <span className="text-sm font-normal text-kc-muted">/100</span>
              </div>
              <div className="text-sm font-bold text-kc-green mt-1">Good</div>
            </div>

            <div className="absolute right-3 top-4 sm:top-3 group-hover:scale-105 transition-transform">
              <CircularProgressScore score={82} />
            </div>
          </div>
        </div>

        {/* Empty bottom spacer for height balance matching reference */}
        <div className="h-4" />
      </div>

      {/* Card 4: Expense This Month */}
      <div className="bg-white rounded-2xl border border-kc-border p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-[#bde4c5] card-3d-hover">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-kc-green-light flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Wallet className="w-3.5 h-3.5 text-kc-green" />
            </div>
            <span className="text-sm font-medium text-kc-muted">Expense This Month</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-3xl sm:text-[34px] font-bold text-kc-text leading-tight group-hover:text-kc-green transition-colors">
              ₹12,450
            </div>
            <div className="absolute right-3 top-4 sm:top-3 animate-float-3d">
              <WalletIllustration />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-2">
          <Link
            to={"/store" as any}
            className="text-xs font-semibold text-kc-green flex items-center gap-1.5 hover:underline group-hover:gap-2 transition-all w-fit"
          >
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
