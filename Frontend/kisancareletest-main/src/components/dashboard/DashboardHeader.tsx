import { useState } from "react";
import { MapPin, Plus, Bell, ChevronDown, Menu, Search } from "lucide-react";

interface DashboardHeaderProps {
  onToggleMobileSidebar?: () => void;
}

export default function DashboardHeader({ onToggleMobileSidebar }: DashboardHeaderProps) {
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      console.log("[KisanCare] Search:", query.trim());
    }
  }

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 px-6 lg:px-8 py-3.5 bg-white border-b border-kc-border shadow-xs">
      {/* Left: Mobile hamburger */}
      <div className="flex items-center shrink-0">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-kc-muted hover:bg-gray-100 hover:text-kc-text transition"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Centre: Search bar */}
      <form
        onSubmit={handleSearch}
        className="flex-1 flex items-center min-w-0 max-w-[450px]"
      >
        <div className="relative w-full">
          {/* Search icon */}
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

          <input
            id="dashboard-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search crops, tasks, weather, market prices..."
            className="w-full h-[44px] pl-10 pr-20 bg-white border border-gray-200 rounded-[11px] text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-kc-green focus:ring-2 focus:ring-kc-green/15"
          />

          {/* Keyboard shortcut hint */}
          <span className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 pointer-events-none select-none">
            <kbd className="text-[10px] font-semibold text-gray-400 bg-gray-100 border border-gray-200 rounded px-1 py-0.5 leading-none">Ctrl</kbd>
            <kbd className="text-[10px] font-semibold text-gray-400 bg-gray-100 border border-gray-200 rounded px-1 py-0.5 leading-none">/</kbd>
          </span>
        </div>
      </form>

      {/* Right: Location, Actions, Profile — UNCHANGED */}
      <div className="flex items-center gap-4 sm:gap-6 shrink-0 ml-auto">
        {/* Location */}
        <div className="hidden sm:flex items-center gap-1.5 text-kc-muted text-sm font-medium">
          <MapPin className="w-4 h-4 text-kc-green shrink-0" />
          <span>Pune, Maharashtra</span>
        </div>

        {/* Plus Action Button */}
        <button
          type="button"
          aria-label="Add new action"
          className="w-9 h-9 rounded-full bg-gradient-to-r from-[#44a838] to-[#2f9e44] text-white flex items-center justify-center hover:brightness-105 active:scale-95 transition shadow-xs"
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
        </button>

        {/* Notifications Bell */}
        <button
          type="button"
          aria-label="View notifications"
          className="relative w-9 h-9 rounded-full flex items-center justify-center text-kc-muted hover:bg-gray-100 hover:text-kc-text transition"
        >
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-kc-red text-white text-[10px] flex items-center justify-center font-bold ring-2 ring-white">
            3
          </span>
        </button>

        {/* User Profile */}
        <button
          type="button"
          className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-full hover:bg-gray-50 transition border border-transparent hover:border-gray-100"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#44a838] to-[#2f9e44] flex items-center justify-center ring-1 ring-black/5 shrink-0">
            <span className="text-white text-sm font-bold leading-none select-none">P</span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-sm font-bold text-kc-text leading-snug">Prathamesh</div>
            <div className="text-xs text-kc-green font-medium leading-none">Premium Farmer</div>
          </div>
          <ChevronDown className="w-4 h-4 text-kc-muted shrink-0" />
        </button>
      </div>
    </header>
  );
}

