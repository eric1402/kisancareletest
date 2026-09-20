import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { PageLoader } from "@/components/PageLoader";
import {
  Calendar,
  ChevronRight,
  ChevronLeft,
  Search,
  Download,
  ChevronDown,
  Leaf,
  Plus,
  Droplet,
  Sprout,
  Check,
  Clock,
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MobileTabBar from "@/components/dashboard/MobileTabBar";
import farmBanner from "@/assets/farm-landscape-banner.jpg";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Crop Calendar — KisanCare Smart Farming" },
      {
        name: "description",
        content:
          "Plan your farming activities with the right timing. Get crop-wise guidance for sowing, growing and harvesting.",
      },
    ],
  }),
  component: CropCalendarPage,
});

/* ─────────── CROP DATA ─────────── */
const CROPS = [
  { id: "rice",      name: "Rice",      emoji: "🌾" },
  { id: "wheat",     name: "Wheat",     emoji: "🌾" },
  { id: "maize",     name: "Maize",     emoji: "🌽" },
  { id: "soybean",   name: "Soybean",   emoji: "🌱" },
  { id: "cotton",    name: "Cotton",    emoji: "🌸" },
  { id: "sugarcane", name: "Sugarcane", emoji: "🌿" },
  { id: "tomato",    name: "Tomato",    emoji: "🍅" },
  { id: "onion",     name: "Onion",     emoji: "🧅" },
  { id: "potato",    name: "Potato",    emoji: "🥔" },
  { id: "chilli",    name: "Chilli",    emoji: "🌶️" },
  { id: "groundnut", name: "Groundnut", emoji: "🥜" },
  { id: "mustard",   name: "Mustard",   emoji: "🌼" },
];

const MORE_CROPS = [
  { id: "bajra",    name: "Bajra",    emoji: "🌾" },
  { id: "jowar",    name: "Jowar",    emoji: "🌾" },
  { id: "turmeric", name: "Turmeric", emoji: "🟡" },
  { id: "ginger",   name: "Ginger",   emoji: "🫚" },
];

/* ─────────── CROP INFO ─────────── */
type TaskBar = {
  label:      string;
  startMonth: number;
  endMonth:   number;
  color:      string;
  barText:    string;
  icon:       string;
};
type UpcomingTask = { day: string; month: string; title: string };
type CropData = {
  season: string; duration: string; temperature: string;
  water: string; soil: string; yield_: string;
  tags: string[];
  calendarLabel: string; calendarRange: string;
  months: string[];
  tasks: TaskBar[];
  upcoming: UpcomingTask[];
};

const RICE: CropData = {
  season: "Kharif (Jun – Oct)", duration: "120 – 150 days",
  temperature: "20°C – 35°C",  water: "High",
  soil: "Clayey, Loamy",       yield_: "4 – 6 tons/acre",
  tags: ["High Demand", "Good Return", "Suitable for Maharashtra"],
  calendarLabel: "Farming Calendar - Rice",
  calendarRange: "Jun 2024 – Oct 2024",
  months: ["Jun 2024","Jul 2024","Aug 2024","Sep 2024","Oct 2024"],
  tasks: [
    { label:"Land Preparation",      startMonth:0, endMonth:0, color:"#86efac", barText:"1 Jun – 15 Jun", icon:"🚜" },
    { label:"Sowing / Transplanting",startMonth:0, endMonth:1, color:"#6ee7b7", barText:"16 Jun – 10 Jul", icon:"🌱" },
    { label:"Fertilizer Application",startMonth:1, endMonth:1, color:"#93c5fd", barText:"11 Jul – 31 Jul", icon:"🧪" },
    { label:"Irrigation",            startMonth:0, endMonth:3, color:"#7dd3fc", barText:"Jun – Sep", icon:"💧" },
    { label:"Pest & Disease Control",startMonth:2, endMonth:3, color:"#fca5a5", barText:"Aug – Sep", icon:"🐛" },
    { label:"Growth Monitoring",     startMonth:1, endMonth:3, color:"#c4b5fd", barText:"Jul – Sep", icon:"📊" },
    { label:"Harvesting",            startMonth:4, endMonth:4, color:"#fde68a", barText:"1 Oct – 31 Oct", icon:"🌾" },
  ],
  upcoming: [
    { day:"15", month:"Jun", title:"Complete land preparation" },
    { day:"22", month:"Jun", title:"Start sowing/transplanting" },
    { day:"10", month:"Jul", title:"First fertilizer application" },
    { day:"5",  month:"Aug", title:"Check for pests and diseases" },
    { day:"1",  month:"Oct", title:"Start harvesting" },
  ],
};

const WHEAT: CropData = {
  season:"Rabi (Nov – Mar)", duration:"110 – 150 days",
  temperature:"10°C – 25°C", water:"Medium",
  soil:"Loamy, Clay loam",   yield_:"3 – 5 tons/acre",
  tags:["Staple Crop","Good Return","Pan India"],
  calendarLabel:"Farming Calendar - Wheat",
  calendarRange:"Nov 2024 – Mar 2025",
  months:["Nov 2024","Dec 2024","Jan 2025","Feb 2025","Mar 2025"],
  tasks:[
    { label:"Land Preparation",      startMonth:0, endMonth:0, color:"#86efac", barText:"1 Nov – 20 Nov", icon:"🚜" },
    { label:"Sowing / Transplanting",startMonth:0, endMonth:1, color:"#6ee7b7", barText:"21 Nov – 15 Dec", icon:"🌱" },
    { label:"Fertilizer Application",startMonth:1, endMonth:2, color:"#93c5fd", barText:"Dec – Jan", icon:"🧪" },
    { label:"Irrigation",            startMonth:1, endMonth:3, color:"#7dd3fc", barText:"Dec – Feb", icon:"💧" },
    { label:"Pest & Disease Control",startMonth:2, endMonth:3, color:"#fca5a5", barText:"Jan – Feb", icon:"🐛" },
    { label:"Growth Monitoring",     startMonth:1, endMonth:3, color:"#c4b5fd", barText:"Dec – Feb", icon:"📊" },
    { label:"Harvesting",            startMonth:4, endMonth:4, color:"#fde68a", barText:"1 Mar – 31 Mar", icon:"🌾" },
  ],
  upcoming:[
    { day:"20", month:"Nov", title:"Complete land preparation" },
    { day:"28", month:"Nov", title:"Start sowing" },
    { day:"15", month:"Dec", title:"First irrigation" },
    { day:"10", month:"Jan", title:"Fertilizer application" },
    { day:"1",  month:"Mar", title:"Start harvesting" },
  ],
};

function makeGeneric(name: string): CropData {
  return {
    season:"Kharif (Jun – Oct)", duration:"90 – 120 days",
    temperature:"18°C – 32°C",  water:"Medium",
    soil:"Loamy, Sandy loam",   yield_:"2 – 4 tons/acre",
    tags:["Common Crop","Good Return"],
    calendarLabel:`Farming Calendar - ${name}`,
    calendarRange:"Jun 2024 – Oct 2024",
    months:["Jun 2024","Jul 2024","Aug 2024","Sep 2024","Oct 2024"],
    tasks:[
      { label:"Land Preparation",      startMonth:0, endMonth:0, color:"#86efac", barText:"1 Jun – 20 Jun", icon:"🚜" },
      { label:"Sowing / Transplanting",startMonth:0, endMonth:1, color:"#6ee7b7", barText:"Jun – Jul", icon:"🌱" },
      { label:"Fertilizer Application",startMonth:1, endMonth:2, color:"#93c5fd", barText:"Jul – Aug", icon:"🧪" },
      { label:"Irrigation",            startMonth:0, endMonth:3, color:"#7dd3fc", barText:"Jun – Sep", icon:"💧" },
      { label:"Pest & Disease Control",startMonth:2, endMonth:3, color:"#fca5a5", barText:"Aug – Sep", icon:"🐛" },
      { label:"Growth Monitoring",     startMonth:1, endMonth:3, color:"#c4b5fd", barText:"Jul – Sep", icon:"📊" },
      { label:"Harvesting",            startMonth:3, endMonth:4, color:"#fde68a", barText:"Sep – Oct", icon:"🌾" },
    ],
    upcoming:[
      { day:"15", month:"Jun", title:"Complete land preparation" },
      { day:"22", month:"Jun", title:"Start sowing" },
      { day:"10", month:"Jul", title:"First fertilizer application" },
      { day:"5",  month:"Aug", title:"Check for pests" },
      { day:"1",  month:"Oct", title:"Start harvesting" },
    ],
  };
}

function getCropData(id: string, name: string): CropData {
  if (id === "rice")  return RICE;
  if (id === "wheat") return WHEAT;
  return makeGeneric(name);
}

/* ─────────── BADGE ─────────── */
const BADGE_COLORS: Record<string, string> = {
  "High Demand": "bg-green-100 text-green-700",
  "Good Return": "bg-blue-100 text-blue-700",
  "Suitable for Maharashtra": "bg-orange-100 text-orange-700",
  "Staple Crop": "bg-purple-100 text-purple-700",
  "Pan India": "bg-teal-100 text-teal-700",
  "Common Crop": "bg-gray-100 text-gray-600",
};

function Badge({ text }: { text: string }) {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${BADGE_COLORS[text] ?? "bg-gray-100 text-gray-600"}`}>
      {text}
    </span>
  );
}

/* ─────────── BAR STYLE ─────────── */
function barStyle(start: number, end: number): React.CSSProperties {
  const w = 100 / 5;
  return { left: `${start * w}%`, width: `${(end - start + 1) * w}%` };
}

/* ═══════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════ */
function CropCalendarPage() {
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [search,         setSearch]         = useState("");
  const [activeCrop,     setActiveCrop]     = useState("rice");
  const [showMore,       setShowMore]       = useState(false);
  const [seasonOpen,     setSeasonOpen]     = useState(false);
  const [season,         setSeason]         = useState("🌿 Kharif 2024");
  const [isLoading,      setIsLoading]      = useState(true);

  // Add Reminder / Tasks State for Mobile Polish
  const [addReminderOpen, setAddReminderOpen] = useState(false);
  const [reminders, setReminders] = useState([
    { id: "r1", title: "Water tomato crop", crop: "Tomato", type: "Watering", time: "Today, 08:00 AM", done: false },
    { id: "r2", title: "Apply 2nd Urea split", crop: "Wheat", type: "Fertilizer", time: "Tomorrow, 10:00 AM", done: false },
    { id: "r3", title: "Pesticide spray for blight", crop: "Potato", type: "Pesticide", time: "18 Jun, 07:30 AM", done: true },
    { id: "r4", title: "Inspect rice nursery moisture", crop: "Rice", type: "Watering", time: "20 Jun, 08:00 AM", done: false },
  ]);
  const [newCropName, setNewCropName] = useState("Tomato");
  const [newReminderType, setNewReminderType] = useState("Watering");
  const [newDate, setNewDate] = useState("Today, 09:00 AM");
  const [newRepeat, setNewRepeat] = useState("Weekly");

  const toggleTask = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, done: !r.done } : r));
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    setReminders(prev => [
      {
        id: `r-${Date.now()}`,
        title: `${newReminderType} for ${newCropName}`,
        crop: newCropName,
        type: newReminderType,
        time: newDate,
        done: false,
      },
      ...prev,
    ]);
    setAddReminderOpen(false);
  };

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const allCrops = [...CROPS, ...MORE_CROPS];
  const cropObj  = allCrops.find(c => c.id === activeCrop) ?? CROPS[0];
  const data     = getCropData(activeCrop, cropObj.name);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const base = CROPS.filter(c => c.name.toLowerCase().includes(q));
    if (!showMore) return base;
    return [...base, ...MORE_CROPS.filter(c => c.name.toLowerCase().includes(q))];
  }, [search, showMore]);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] text-kc-text antialiased">
      {/* ── Sidebar ── */}
      <Sidebar />
      {/* ── Mobile Tab Bar ── */}
      <MobileTabBar />

      {/* ── Right shell ── */}
      <div className="flex flex-1 flex-col min-w-0 overflow-x-hidden">
        <DashboardHeader />

        {/* ── Scrollable body ── */}
        <main className="flex-1 min-h-0 overflow-y-auto flex flex-col p-3.5 sm:p-5 lg:p-6 pb-24 lg:pb-6 space-y-4 max-w-[1600px] w-full mx-auto">
          {isLoading ? (
            <PageLoader message="Loading crop calendar..." />
          ) : (
            <>
          {/* ── PAGE HEADER ── */}
          <div className="flex items-start justify-between mb-1 gap-4 shrink-0 animate-dash-1">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center">
                  <Calendar className="w-[15px] h-[15px] text-kc-green" />
                </div>
                <h1 className="text-xl sm:text-[22px] font-bold text-gray-900 tracking-tight leading-none">
                  Crop Calendar
                </h1>
              </div>
              <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed ml-0.5">
                Plan your farming activities with the right timing. Get crop-wise guidance for sowing, growing and harvesting.
              </p>
            </div>

            {/* Season dropdown */}
            <div className="relative shrink-0 mt-0.5">
              <button onClick={() => setSeasonOpen(p => !p)}
                className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-700 hover:border-kc-green hover:bg-green-50 transition shadow-xs whitespace-nowrap">
                {season} <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
              {seasonOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl border border-gray-100 shadow-xl z-50 py-1 overflow-hidden">
                  {["🌿 Kharif 2024","❄️ Rabi 2024-25","🌸 Zaid 2024","🌿 Kharif 2025"].map(s => (
                    <button key={s} onClick={() => { setSeason(s); setSeasonOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors ${season===s ? "bg-green-50 text-kc-green" : "text-gray-700 hover:bg-gray-50"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── HERO BANNER ── */}
          <div className="w-full rounded-2xl overflow-hidden mb-2.5 relative flex items-center shrink-0 animate-dash-2"
            style={{ background:"linear-gradient(120deg,#e8f5e9 0%,#f1faf2 55%,#c8e6ca 100%)", height: 88 }}>
            <div className="flex-1 px-6 py-4 z-10">
              <p className="text-[16px] font-bold text-gray-900 leading-snug mb-1">
                Right crop at the right time, for a better tomorrow!
              </p>
              <p className="text-[12px] text-gray-500 leading-relaxed max-w-sm">
                Follow seasonal guidance, track important dates, and never miss a farming activity.
              </p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-[44%] pointer-events-none">
              <img src={farmBanner} alt="Farm landscape"
                className="w-full h-full object-cover object-left"
                style={{ maskImage:"linear-gradient(to right,transparent 0%,rgba(255,255,255,.55) 22%,white 55%)",
                         WebkitMaskImage:"linear-gradient(to right,transparent 0%,rgba(255,255,255,.55) 22%,white 55%)" }} />
            </div>
          </div>

          {/* Mobile Horizontal Crop Selector Strip */}
          <div className="flex overflow-x-auto gap-2 -mx-3.5 px-3.5 pb-2 scrollbar-none lg:hidden shrink-0">
            {allCrops.map((crop) => {
              const active = activeCrop === crop.id;
              return (
                <button
                  key={crop.id}
                  onClick={() => setActiveCrop(crop.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all active:scale-95 ${
                    active
                      ? "bg-kc-green text-white shadow-xs"
                      : "bg-white border border-kc-border text-kc-text hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm">{crop.emoji}</span>
                  <span>{crop.name}</span>
                </button>
              );
            })}
          </div>

          {/* ── RESPONSIVE 3-COLUMN GRID ── */}
          <div className="flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-[210px_1fr_260px] gap-3.5 animate-dash-3">

            {/* ════════ LEFT: Select Crop (Desktop) ════════ */}
            <div className="hidden lg:flex bg-white rounded-2xl border border-gray-100 shadow-xs p-3.5 flex-col gap-2 h-full overflow-hidden">
              <p className="text-[13px] font-bold text-gray-900 shrink-0">Select Crop</p>

              {/* Search */}
              <div className="relative shrink-0">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                <input type="text" placeholder="Search crops..."
                  value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-[12px] border border-gray-200 rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:border-kc-green focus:ring-1 focus:ring-kc-green/20 transition" />
              </div>

              {/* List — internal scroll */}
              <ul className="flex-1 min-h-0 overflow-y-auto custom-scrollbar flex flex-col gap-0.5 pr-0.5">
                {filtered.map(crop => {
                  const active = activeCrop === crop.id;
                  return (
                    <li key={crop.id}>
                      <button onClick={() => setActiveCrop(crop.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-[6px] rounded-xl text-[12.5px] font-medium transition-all text-left
                          ${active ? "bg-green-50 text-kc-green font-semibold border border-green-100"
                                   : "text-gray-700 hover:bg-gray-50 border border-transparent"}`}>
                        <span className="text-[14px] leading-none">{crop.emoji}</span>
                        {crop.name}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* More Crops */}
              <button onClick={() => setShowMore(p => !p)}
                className="shrink-0 flex items-center justify-between w-full px-3 py-1.5 text-[11.5px] font-semibold text-gray-500 hover:text-kc-green hover:bg-green-50 rounded-xl border border-dashed border-gray-200 hover:border-green-200 transition-all">
                <span>⣿ {showMore ? "Show Less" : "More Crops"}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showMore ? "rotate-90" : ""}`} />
              </button>
            </div>

            {/* ════════ CENTER ════════ */}
            <div className="flex flex-col gap-2.5 min-w-0 h-full overflow-y-auto custom-scrollbar pr-0.5">

              {/* Crop header card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-4 shrink-0">
                <div className="flex items-center gap-3.5">
                  <div className="w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 border border-green-100 flex items-center justify-center shrink-0">
                    <span className="text-[30px] leading-none">{cropObj.emoji}</span>
                  </div>
                  <div>
                    <h2 className="text-[17px] font-bold text-gray-900 mb-0.5">{cropObj.name}</h2>
                    <p className="text-[12px] text-gray-500 mb-2">{data.season}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {data.tags.map(t => <Badge key={t} text={t} />)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Farming Calendar (Gantt) */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-4 shrink-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] font-bold text-gray-900">{data.calendarLabel}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-500 font-medium">{data.calendarRange}</span>
                    <button className="w-[22px] h-[22px] rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400">
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                    <button className="w-[22px] h-[22px] rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400">
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Horizontally scrollable Gantt track on mobile */}
                <div className="overflow-x-auto scrollbar-none -mx-1 px-1">
                  <div className="min-w-[440px] sm:min-w-0">
                    {/* Month columns */}
                    <div className="grid mb-1.5" style={{ gridTemplateColumns:"135px 1fr" }}>
                      <div />
                      <div className="grid" style={{ gridTemplateColumns:"repeat(5,1fr)" }}>
                        {data.months.map(m => (
                          <div key={m} className="text-[9.5px] font-bold text-gray-400 text-center tracking-wide uppercase">{m}</div>
                        ))}
                      </div>
                    </div>

                    <div className="w-full h-px bg-gray-100 mb-1" />

                    {/* Grid lines behind bars */}
                    <div className="flex flex-col gap-[1px]">
                      {data.tasks.map(task => (
                        <div key={task.label} className="grid items-center" style={{ gridTemplateColumns:"135px 1fr" }}>
                          {/* Label */}
                          <div className="flex items-center gap-1.5 pr-2 py-0.5">
                            <div className="w-[20px] h-[20px] rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-[10px]">
                              {task.icon}
                            </div>
                            <span className="text-[10.5px] text-gray-600 font-medium leading-tight truncate">{task.label}</span>
                          </div>

                          {/* Bar track */}
                          <div className="relative h-[26px]">
                            {[1,2,3,4].map(i => (
                              <div key={i} className="absolute top-0 bottom-0 w-px bg-gray-100"
                                style={{ left:`${i*20}%` }} />
                            ))}
                            <div className="absolute top-[3px] bottom-[3px] rounded-md flex items-center px-2"
                              style={{ ...barStyle(task.startMonth, task.endMonth), backgroundColor: task.color }}>
                              <span className="text-[9px] font-bold text-gray-700 whitespace-nowrap leading-none">{task.barText}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Field Tasks & Reminders (Mobile-friendly row cards) */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-4 shrink-0 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-kc-green" />
                    <span className="font-bold text-sm text-gray-900">Crop Tasks & Watering Schedule</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAddReminderOpen(true)}
                    className="text-xs font-bold text-kc-green hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Task
                  </button>
                </div>

                <div className="space-y-2">
                  {reminders.map((rem) => {
                    const isDone = rem.done;
                    const Icon = rem.type === "Watering" ? Droplet : rem.type === "Fertilizer" ? Sprout : Leaf;
                    return (
                      <div
                        key={rem.id}
                        className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition-all min-h-[48px] ${
                          isDone ? "bg-gray-50/80 border-gray-100 opacity-60" : "bg-white border-gray-200/80 hover:border-[#bde4c5]"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-kc-green-light flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-kc-green" />
                          </div>
                          <div className="min-w-0">
                            <div className={`text-xs sm:text-sm font-bold truncate ${isDone ? "line-through text-kc-muted" : "text-kc-text"}`}>
                              {rem.title}
                            </div>
                            <div className="text-[11px] text-kc-muted flex items-center gap-1.5 mt-0.5">
                              <span className="font-medium text-kc-green">{rem.crop}</span> · <span>{rem.time}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleTask(rem.id)}
                          aria-label={`Mark ${rem.title} as ${isDone ? 'incomplete' : 'done'}`}
                          className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition active:scale-90 ${
                            isDone ? "text-kc-green bg-kc-green-light" : "text-gray-400 hover:text-kc-green hover:bg-gray-50 border border-gray-200"
                          }`}
                        >
                          <Check className={`w-4 h-4 ${isDone ? "stroke-[3]" : ""}`} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Seasonal Tips */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-3.5 shrink-0">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-[13px] font-bold text-gray-900">💡 Seasonal Tips</p>
                  <button className="text-[11.5px] font-semibold text-kc-green hover:underline">View All</button>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { icon:"🌱", t1:"Use certified seeds",  t2:"for better yield" },
                    { icon:"💧", t1:"Maintain proper",      t2:"water level" },
                    { icon:"🐛", t1:"Monitor for stem",     t2:"borer regularly" },
                  ].map(tip => (
                    <div key={tip.t1} className="flex flex-col items-center text-center px-2 py-2.5 rounded-xl bg-green-50/70 border border-green-100 hover:bg-green-50 transition cursor-default">
                      <span className="text-xl mb-1">{tip.icon}</span>
                      <p className="text-[10.5px] font-semibold text-gray-700 leading-snug">{tip.t1}</p>
                      <p className="text-[10.5px] text-gray-500 leading-snug">{tip.t2}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Resources */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-3.5 shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] font-bold text-gray-900">📋 Related Resources</p>
                  <button className="text-[11.5px] font-semibold text-kc-green hover:underline">View All</button>
                </div>
                <div className="flex flex-col gap-1.5">
                  {[
                    { dot:"bg-red-400",    name:"Rice Cultivation Guide (PDF)" },
                    { dot:"bg-orange-400", name:"Pest Management in Rice" },
                    { dot:"bg-purple-400", name:"Fertilizer Schedule for Rice" },
                  ].map(r => (
                    <div key={r.name} className="flex items-center justify-between px-2.5 py-2 rounded-xl border border-gray-100 hover:border-green-100 hover:bg-green-50/40 transition group">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-lg ${r.dot} bg-opacity-20 border flex items-center justify-center text-[11px]`}
                          style={{ borderColor:"rgba(0,0,0,0.06)" }}>📄</div>
                        <span className="text-[11.5px] font-medium text-gray-700">{r.name}</span>
                      </div>
                      <button className="flex items-center gap-1 text-[10.5px] font-bold text-blue-500 hover:text-blue-600 transition">
                        <Download className="w-3 h-3" /> Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ════════ RIGHT ════════ */}
            <div className="flex flex-col gap-2.5 h-full overflow-y-auto custom-scrollbar pr-0.5">

              {/* Key Information */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-3.5 shrink-0">
                <p className="text-[13px] font-bold text-gray-900 mb-2">Key Information</p>
                <div className="flex flex-col gap-1.5">
                  {([
                    { icon:"🌿", bg:"bg-green-100",  label:"Season",              val:data.season },
                    { icon:"⏱️", bg:"bg-blue-100",   label:"Duration",            val:data.duration },
                    { icon:"🌡️", bg:"bg-orange-100", label:"Ideal Temperature",   val:data.temperature },
                    { icon:"💧", bg:"bg-cyan-100",   label:"Water Requirement",   val:data.water },
                    { icon:"🪨", bg:"bg-yellow-100", label:"Soil Type",           val:data.soil },
                    { icon:"📊", bg:"bg-purple-100", label:"Expected Yield",      val:data.yield_ },
                  ] as const).map(row => (
                    <div key={row.label} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className={`w-[24px] h-[24px] rounded-full ${row.bg} flex items-center justify-center shrink-0 text-[11px]`}>
                          {row.icon}
                        </div>
                        <span className="text-[11px] text-gray-500 truncate">{row.label}</span>
                      </div>
                      <span className="text-[11px] font-bold text-gray-700 text-right max-w-[105px] leading-tight">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-3.5 shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] font-bold text-gray-900">Upcoming Tasks</p>
                  <button className="text-[11.5px] font-semibold text-kc-green hover:underline">View All</button>
                </div>
                <div className="flex flex-col gap-0.5">
                  {data.upcoming.map(t => (
                    <button key={t.day+t.month+t.title}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group w-full text-left">
                      {/* Date box */}
                      <div className="flex flex-col items-center justify-center w-[34px] h-[34px] rounded-xl bg-green-50 border border-green-100 shrink-0">
                        <span className="text-[12px] font-extrabold text-kc-green leading-none">{t.day}</span>
                        <span className="text-[8.5px] font-bold text-kc-green leading-none mt-[1px]">{t.month}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-gray-800 truncate">{t.title}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                          <span className="text-[9.5px] text-green-600 font-medium">Upcoming</span>
                        </div>
                      </div>
                      <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-gray-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Promo card */}
              <div className="rounded-2xl overflow-hidden relative shrink-0"
                style={{ background:"linear-gradient(140deg,#1a5c29 0%,#2d8a3e 65%,#3ba849 100%)", minHeight:100 }}>
                <div className="absolute -right-5 -top-5 w-24 h-24 rounded-full bg-white/[0.06]" />
                <div className="absolute -right-2 -bottom-3 w-18 h-18 rounded-full bg-white/[0.06]" />
                <div className="relative z-10 p-3.5">
                  <p className="text-[14px] font-extrabold text-white leading-tight mb-1">
                    Healthy Crops<br />Brighter Tomorrows
                  </p>
                  <p className="text-[11px] text-green-200">Plan, Grow, Prosper</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Leaf className="w-3 h-3 text-green-300" />
                    <span className="text-[10.5px] font-bold text-green-200">with KisanCare</span>
                  </div>
                </div>
                <div className="absolute right-3 bottom-1 text-[40px] select-none leading-none">🌱</div>
              </div>

            </div>{/* end right */}
          </div>{/* end 3-col grid */}

          {/* Floating "+" button for Mobile */}
          <button
            type="button"
            onClick={() => setAddReminderOpen(true)}
            className="fixed bottom-20 right-4 lg:hidden z-30 w-13 h-13 rounded-full bg-kc-green text-white shadow-xl flex items-center justify-center hover:bg-[#28883a] active:scale-90 transition-transform"
            aria-label="Add new reminder"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Add Reminder Sheet */}
          <Sheet open={addReminderOpen} onOpenChange={setAddReminderOpen}>
            <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 sm:p-6 bg-white border-t border-kc-border shadow-2xl">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 shrink-0" />
              <SheetHeader className="text-left pb-2 border-b border-gray-100">
                <SheetTitle className="text-lg font-bold text-kc-text">
                  Add Crop Reminder
                </SheetTitle>
                <p className="text-xs text-kc-muted">
                  Set a watering, fertilizer, or harvest reminder for your field.
                </p>
              </SheetHeader>

              <form onSubmit={handleAddReminder} className="space-y-4 pt-3">
                <div>
                  <label className="block text-xs font-semibold text-kc-muted mb-1">
                    Select Crop
                  </label>
                  <select
                    value={newCropName}
                    onChange={(e) => setNewCropName(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-kc-border text-sm font-semibold text-kc-text focus:outline-none focus:border-kc-green"
                  >
                    {allCrops.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.emoji} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-kc-muted mb-1">
                    Reminder Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Watering", "Fertilizer", "Pesticide", "Harvest"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setNewReminderType(t)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition active:scale-95 ${
                          newReminderType === t
                            ? "bg-kc-green text-white border-kc-green shadow-xs"
                            : "bg-gray-50 border-gray-200 text-kc-text hover:bg-gray-100"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-kc-muted mb-1">
                    Date & Time
                  </label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-kc-border text-sm font-medium text-kc-text focus:outline-none focus:border-kc-green"
                    placeholder="e.g. Tomorrow, 07:00 AM"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-kc-muted mb-1">
                    Repeat Frequency
                  </label>
                  <select
                    value={newRepeat}
                    onChange={(e) => setNewRepeat(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-kc-border text-sm font-semibold text-kc-text focus:outline-none focus:border-kc-green"
                  >
                    <option value="One-time">One-time</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-kc-green hover:bg-[#28883a] text-white text-sm font-bold shadow-xs active:scale-[0.98] transition mt-2"
                >
                  Save Reminder
                </button>
              </form>
            </SheetContent>
          </Sheet>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
