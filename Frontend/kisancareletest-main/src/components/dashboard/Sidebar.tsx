import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutGrid,
  Bot,
  Calendar,
  Stethoscope,
  Cloud,
  LineChart,
  Landmark,
  ShoppingCart,
  FlaskConical,
  Sprout,
  Users,
  BookOpen,
  Bell,
  Settings,
  Crown,
  X,
} from "lucide-react";
import kisanMark from "@/assets/kisan-mark.jpg";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const navItems = [
  { label: "Dashboard", icon: LayoutGrid, to: "/dashboard" },
  { label: "AI Kisan Assistant", icon: Bot, to: "/ai-assistant" },
  { label: "Crop Calendar", icon: Calendar, to: "/calendar" },
  { label: "Crop Doctor", icon: Stethoscope, to: "/crop-doctor", badge: "New" },
  { label: "Weather", icon: Cloud, to: "/weather" },
  { label: "Market Prices", icon: LineChart, to: "/mandi" },
  { label: "Government Schemes", icon: Landmark, to: "/schemes" },
  { label: "Kisan Store", icon: ShoppingCart, to: "/store" },
  { label: "Soil Health", icon: FlaskConical, to: "/soil" },
  { label: "My Crops", icon: Sprout, to: "/crops" },
  { label: "Community", icon: Users, to: "/community" },
  { label: "Farming Guides", icon: BookOpen, to: "/guides" },
  { label: "Notifications", icon: Bell, to: "/notifications", badge: "3" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

export default function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarContent = (
    <div
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      className="flex flex-col h-full bg-white border-r border-kc-border overscroll-contain select-none"
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-kc-border shrink-0">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm shrink-0 border border-black/5 bg-[#0b1b14] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1">
            <img
              src={kisanMark}
              alt="Kisan Care"
              className="w-full h-full object-cover select-none"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-[18px] text-kc-text leading-tight tracking-tight">
              Kisan<span className="text-kc-green font-bold">Care</span>
            </div>
            <div className="text-[9px] font-semibold tracking-[0.18em] text-kc-muted uppercase mt-0.5">
              FARM BETTER, LIVE BETTER
            </div>
          </div>
        </Link>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-kc-muted hover:bg-gray-100 hover:text-kc-text"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav List with isolated scrolling */}
      <nav
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar overscroll-contain"
      >
        {navItems.map((item) => {
          const isActive = currentPath === item.to || (item.to === "/dashboard" && currentPath === "/dashboard");
          const IconComponent = item.icon;

          return (
            <Link
              key={item.label}
              to={item.to as any}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-kc-green-light text-kc-green font-semibold shadow-xs translate-x-0.5"
                  : "text-kc-muted hover:text-kc-text hover:bg-gray-50/90 hover:translate-x-1"
              }`}
            >
              <span className="flex items-center gap-3">
                <IconComponent
                  className={`w-[19px] h-[19px] shrink-0 transition-all duration-200 group-hover:scale-110 ${
                    isActive ? "text-kc-green" : "text-gray-400 group-hover:text-kc-text"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </span>

              {item.badge && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-kc-green-light text-kc-green shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Card */}
      <div className="p-4 border-t border-kc-border/60 shrink-0">
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#f5fbf6] to-[#ebf7ee] border border-[#d6efdb] shadow-2xs">
          <div className="font-bold text-kc-text text-sm mb-1">Upgrade to Premium</div>
          <p className="text-xs text-kc-muted mb-3 leading-relaxed">
            Unlock advanced tools, expert support and exclusive benefits.
          </p>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#44a838] to-[#2f9e44] hover:from-[#3ea032] hover:to-[#298d3c] text-white text-xs font-semibold py-2.5 px-3 rounded-xl shadow-xs transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <Crown className="w-4 h-4 animate-bounce duration-1000" />
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className="hidden lg:flex w-64 shrink-0 h-screen sticky top-0 z-30 overscroll-contain"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200 overscroll-contain"
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
