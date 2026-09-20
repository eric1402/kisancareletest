import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MobileTabBar from "@/components/dashboard/MobileTabBar";
import { mockMandiPrices, type MandiPriceItem } from "@/data/mandiPrices";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Clock,
  MapPin,
  Sparkles,
  ChevronDown,
  ArrowUpDown,
  Filter,
  Check,
  ChevronRight,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/mandi")({
  head: () => ({
    meta: [
      { title: "Mandi Bhav — Kisan Care Smart Farming" },
      {
        name: "description",
        content:
          "Live market prices from APMC mandis across Maharashtra. Compare crop rates, track 7-day price trends, and find best selling markets.",
      },
    ],
  }),
  component: MandiPage,
});

const categories = ["All", "Vegetables", "Grains", "Pulses", "Cash Crops"] as const;

function Sparkline({ data, isPositive }: { data: number[]; isPositive: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 120;
  const height = 36;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(" ");

  const color = isPositive ? "#2F9E44" : "#EF4444";

  return (
    <svg width={width} height={height} className="overflow-visible select-none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

function MandiPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All Mandis");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"price-desc" | "price-asc" | "change-desc">("price-desc");
  const [selectedCrop, setSelectedCrop] = useState<MandiPriceItem | null>(null);

  const districts = ["All Mandis", "Pune", "Nashik", "Latur", "Solapur", "Kolhapur"];

  const filteredItems = useMemo(() => {
    return mockMandiPrices
      .filter((item) => {
        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;
        const matchesDistrict =
          selectedDistrict === "All Mandis" ||
          item.market.toLowerCase().includes(selectedDistrict.toLowerCase());
        const matchesSearch =
          item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.market.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesDistrict && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-desc") return b.pricePerQuintal - a.pricePerQuintal;
        if (sortBy === "price-asc") return a.pricePerQuintal - b.pricePerQuintal;
        if (sortBy === "change-desc") return b.change - a.change;
        return 0;
      });
  }, [selectedCategory, selectedDistrict, searchQuery, sortBy]);

  return (
    <div className="flex min-h-screen bg-kc-bg text-kc-text antialiased">
      <Sidebar />
      <MobileTabBar />

      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <DashboardHeader />

        <main className="flex-1 p-4 sm:p-6 lg:p-7 space-y-5 max-w-[1400px] w-full mx-auto pb-20 lg:pb-7">
          {/* 1. Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-kc-text tracking-tight">
                  Mandi Bhav
                </h1>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-kc-green bg-kc-green-light px-2.5 py-0.5 rounded-full">
                  <Clock className="w-3 h-3" /> Updated 10 min ago
                </span>
              </div>
              <p className="text-xs sm:text-sm text-kc-muted mt-0.5">
                Live prices from mandis near you across Maharashtra
              </p>
            </div>

            {/* Location Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <MapPin className="w-4 h-4 text-kc-green shrink-0" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-white border border-kc-border rounded-xl px-3 py-1.5 text-xs font-semibold text-kc-text focus:outline-none focus:border-kc-green"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. Sticky Category Filter Row */}
          <div className="flex overflow-x-auto gap-2 -mx-4 px-4 pb-1 scrollbar-none sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 active:scale-95 ${
                    active
                      ? "bg-kc-green text-white shadow-xs"
                      : "bg-white border border-kc-border text-kc-muted hover:text-kc-text hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* 3. Search & Sort Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crops or mandis (e.g. Onion, Latur)..."
                className="w-full h-11 pl-10 pr-4 bg-white border border-kc-border rounded-xl text-xs sm:text-sm text-kc-text placeholder:text-gray-400 focus:outline-none focus:border-kc-green"
              />
            </div>

            <div className="shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-11 px-3 bg-white border border-kc-border rounded-xl text-xs font-semibold text-kc-text focus:outline-none focus:border-kc-green"
              >
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="change-desc">% Change: Highest</option>
              </select>
            </div>
          </div>

          {/* 4. Price List (Cards) */}
          <div className="space-y-2.5">
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-2xl border border-kc-border p-8 text-center text-kc-muted text-sm">
                No mandi prices matching "{searchQuery}". Try selecting another category or mandi.
              </div>
            ) : (
              filteredItems.map((item) => {
                const isPositive = item.change >= 0;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedCrop(item)}
                    className="bg-white rounded-2xl border border-kc-border p-3.5 sm:p-4 shadow-xs flex items-center justify-between gap-3 hover:border-[#bde4c5] active:scale-[0.99] transition-all cursor-pointer min-h-[64px] group"
                  >
                    {/* Left: Crop + Market */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm sm:text-base text-kc-text truncate group-hover:text-kc-green transition-colors">
                          {item.crop}
                        </span>
                        <span className="text-[10px] font-semibold text-kc-muted bg-gray-100 px-2 py-0.5 rounded-full hidden min-[480px]:inline">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs text-kc-muted flex items-center gap-1.5 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-kc-green shrink-0" />
                        <span className="truncate">{item.market}</span>
                      </div>
                    </div>

                    {/* Right: Price + % Change */}
                    <div className="text-right shrink-0">
                      <div className="font-bold text-sm sm:text-base text-kc-text">
                        ₹{item.pricePerQuintal.toLocaleString()}
                        <span className="text-[11px] font-normal text-kc-muted">/Q</span>
                      </div>
                      <div
                        className={`text-xs font-bold flex items-center justify-end gap-1 mt-0.5 ${
                          isPositive ? "text-kc-green" : "text-kc-red"
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-3.5 h-3.5" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {isPositive ? "+" : ""}
                          {item.change}%
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-kc-green group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>

      {/* Detail Slide-up Sheet for selected crop */}
      <Sheet open={!!selectedCrop} onOpenChange={(open) => !open && setSelectedCrop(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[80vh] overflow-y-auto p-5 sm:p-6 bg-white border-t border-kc-border shadow-2xl">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 shrink-0" />

          {selectedCrop && (
            <div className="space-y-4">
              <SheetHeader className="text-left pb-2 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-lg font-bold text-kc-text">
                    {selectedCrop.crop}
                  </SheetTitle>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-kc-green-light text-kc-green">
                    {selectedCrop.category}
                  </span>
                </div>
                <p className="text-xs text-kc-muted">
                  Current rate at {selectedCrop.market}
                </p>
              </SheetHeader>

              {/* Price Banner */}
              <div className="bg-[#f4fbf5] border border-[#d6efdb] rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-kc-muted font-medium">Latest APMC Price</div>
                  <div className="text-2xl font-bold text-kc-text mt-0.5">
                    ₹{selectedCrop.pricePerQuintal.toLocaleString()}{" "}
                    <span className="text-xs font-normal text-kc-muted">/ Quintal</span>
                  </div>
                </div>
                <div
                  className={`text-sm font-bold flex items-center gap-1 px-3 py-1.5 rounded-xl ${
                    selectedCrop.change >= 0
                      ? "bg-kc-green-light text-kc-green"
                      : "bg-red-50 text-kc-red"
                  }`}
                >
                  {selectedCrop.change >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>
                    {selectedCrop.change >= 0 ? "+" : ""}
                    {selectedCrop.change}% today
                  </span>
                </div>
              </div>

              {/* 7-Day Trend Chart */}
              <div className="bg-white rounded-2xl border border-kc-border p-4 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-kc-text">7-Day Price Trend</span>
                  <span className="text-[11px] text-kc-muted">
                    Min: ₹{Math.min(...selectedCrop.history7Days)} · Max: ₹{Math.max(...selectedCrop.history7Days)}
                  </span>
                </div>

                <div className="h-14 flex items-center justify-center bg-gray-50/70 rounded-xl p-2">
                  <Sparkline
                    data={selectedCrop.history7Days}
                    isPositive={selectedCrop.change >= 0}
                  />
                </div>
              </div>

              {/* Recommendation Card */}
              <div className="bg-gradient-to-r from-[#2f9e44] to-[#258539] rounded-2xl p-4 text-white shadow-xs flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <div className="font-bold text-sm mb-0.5">Best Mandi Recommendation</div>
                  Sell at <strong>{selectedCrop.bestMandi}</strong> for maximum return (currently fetching{" "}
                  <strong>₹{selectedCrop.bestPrice.toLocaleString()}/Q</strong>, ~₹
                  {Math.abs(selectedCrop.bestPrice - selectedCrop.pricePerQuintal)} higher).
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
