import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { LayoutGrid, Bot, LineChart, ShoppingCart, Menu } from "lucide-react";
import MoreSheet from "./MoreSheet";

export default function MobileTabBar() {
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutGrid,
      to: "/dashboard",
      isActive: currentPath === "/dashboard" || currentPath === "/",
    },
    {
      id: "ai-assistant",
      label: "AI Kisan",
      icon: Bot,
      to: "/ai-assistant",
      isActive: currentPath === "/ai-assistant",
    },
    {
      id: "mandi",
      label: "Mandi",
      icon: LineChart,
      to: "/mandi",
      isActive: currentPath === "/mandi",
    },
    {
      id: "store",
      label: "Store",
      icon: ShoppingCart,
      to: "/store",
      isActive: currentPath === "/store",
    },
  ];

  return (
    <>
      <nav
        aria-label="Mobile navigation bar"
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-kc-border shadow-[0_-2px_12px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="grid grid-cols-5 items-stretch h-[60px]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.id}
                to={tab.to as any}
                className="flex flex-col items-center justify-center min-h-[56px] py-1 text-center relative group active:scale-95 transition-transform select-none"
              >
                {/* Active indicator dot above icon */}
                {tab.isActive && (
                  <span className="absolute top-1.5 w-1.5 h-1.5 rounded-full bg-kc-green animate-in fade-in zoom-in-50 duration-200" />
                )}
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    tab.isActive ? "text-kc-green mt-1" : "text-kc-muted group-hover:text-kc-text"
                  }`}
                />
                <span
                  className={`text-[10px] font-medium leading-tight mt-1 truncate max-w-full px-1 ${
                    tab.isActive ? "text-kc-green font-semibold" : "text-kc-muted"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}

          {/* 5th Tab: More Button */}
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            className="flex flex-col items-center justify-center min-h-[56px] py-1 text-center relative group active:scale-95 transition-transform select-none"
            aria-label="Open more navigation options"
          >
            {moreOpen && (
              <span className="absolute top-1.5 w-1.5 h-1.5 rounded-full bg-kc-green animate-in fade-in zoom-in-50 duration-200" />
            )}
            <Menu
              className={`w-5 h-5 transition-colors ${
                moreOpen ? "text-kc-green mt-1" : "text-kc-muted group-hover:text-kc-text"
              }`}
            />
            <span
              className={`text-[10px] font-medium leading-tight mt-1 truncate max-w-full px-1 ${
                moreOpen ? "text-kc-green font-semibold" : "text-kc-muted"
              }`}
            >
              More
            </span>
          </button>
        </div>
      </nav>

      {/* Slide up More Sheet */}
      <MoreSheet open={moreOpen} onOpenChange={setMoreOpen} />
    </>
  );
}
