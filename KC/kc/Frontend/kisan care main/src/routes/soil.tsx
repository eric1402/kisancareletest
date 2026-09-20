import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MobileTabBar from "@/components/dashboard/MobileTabBar";
import {
  FlaskConical,
  Users,
  UploadCloud,
  CheckCircle2,
  Star,
  Clock,
  Sparkles,
  ChevronRight,
  FileText,
  BadgePercent,
  MapPin,
  CalendarDays,
} from "lucide-react";

export const Route = createFileRoute("/soil")({
  head: () => ({
    meta: [
      { title: "Soil Health — Kisan Care Smart Farming" },
      {
        name: "description",
        content:
          "Analyze your farm soil, book certified soil lab assistants, and get smart crop recommendations.",
      },
    ],
  }),
  component: SoilHealthPage,
});

interface LabAssistant {
  id: string;
  name: string;
  role: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  fee: string;
  availableTime: string;
}

const mockAssistants: LabAssistant[] = [
  {
    id: "as-1",
    name: "Dr. Ramesh Shinde",
    role: "Senior Soil Agrologist",
    experience: "8+ yrs exp",
    rating: 4.9,
    reviewsCount: 142,
    distance: "3.8 km away",
    fee: "₹299 visit fee",
    availableTime: "Today, 3:00 PM",
  },
  {
    id: "as-2",
    name: "Pooja Deshmukh",
    role: "Govt Certified Soil Tester",
    experience: "5 yrs exp",
    rating: 4.8,
    reviewsCount: 96,
    distance: "5.2 km away",
    fee: "₹249 visit fee",
    availableTime: "Tomorrow, 10:00 AM",
  },
  {
    id: "as-3",
    name: "Anil Kulkarni",
    role: "Krishi Vigyan Field Officer",
    experience: "6 yrs exp",
    rating: 4.7,
    reviewsCount: 88,
    distance: "6.5 km away",
    fee: "₹299 visit fee",
    availableTime: "Tomorrow, 2:00 PM",
  },
];

const pastReports = [
  {
    id: "rep-1",
    date: "12 Oct 2025",
    crop: "Wheat Field (Plot A)",
    status: "Good Health",
    ph: "6.8 (Optimal)",
    n: "Medium (280 kg/ha)",
    p: "High (24 kg/ha)",
    k: "Adequate (190 kg/ha)",
    verdict: "Suitable for Rabi sowing. Nitrogen top-dressing recommended at 30 days.",
  },
  {
    id: "rep-2",
    date: "18 Jun 2025",
    crop: "Soybean Plot (Plot B)",
    status: "Mild Acidity",
    ph: "5.9 (Slightly Acidic)",
    n: "Low (160 kg/ha)",
    p: "Optimal (20 kg/ha)",
    k: "High (210 kg/ha)",
    verdict: "Apply agricultural lime 200 kg/acre before monsoon sowing.",
  },
  {
    id: "rep-3",
    date: "04 Jan 2025",
    crop: "Sugarcane Block",
    status: "Excellent",
    ph: "7.1 (Neutral)",
    n: "High (310 kg/ha)",
    p: "High (28 kg/ha)",
    k: "Optimal (220 kg/ha)",
    verdict: "High fertility index. Normal micronutrient spray recommended.",
  },
];

function SoilHealthPage() {
  const [activeTab, setActiveTab] = useState<"upload" | "assistant">("assistant");
  const [ph, setPh] = useState("6.5");
  const [nitrogen, setNitrogen] = useState("240");
  const [phosphorus, setPhosphorus] = useState("22");
  const [potassium, setPotassium] = useState("180");
  const [moisture, setMoisture] = useState("42");
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [bookedAssistant, setBookedAssistant] = useState<string | null>(null);
  const [bookingToast, setBookingToast] = useState<string | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    setShowRecommendation(true);
  }

  function handleBook(name: string) {
    setBookedAssistant(name);
    setBookingToast(
      `Booking request sent to ${name}! A lab assistant will contact you within 24 hours.`
    );
  }

  return (
    <div className="flex min-h-screen bg-kc-bg text-kc-text antialiased">
      <Sidebar />
      <MobileTabBar />

      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <DashboardHeader />

        <main className="flex-1 p-4 sm:p-6 lg:p-7 space-y-6 max-w-[1400px] w-full mx-auto pb-20 lg:pb-7">
          {/* 1. Header */}
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-kc-text tracking-tight flex items-center gap-2">
              <span>Soil Health</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-kc-green-light text-kc-green font-semibold">
                AI Powered
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-kc-muted mt-1">
              Know your soil, grow smarter. Test reports, lab experts, and nutrient recommendations.
            </p>
          </div>

          {/* Booking Confirmation Toast */}
          {bookingToast && (
            <div className="bg-kc-green-light border border-[#bde4c5] p-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-5 h-5 text-kc-green shrink-0 mt-0.5" />
              <div className="flex-1 text-xs sm:text-sm text-kc-text leading-relaxed">
                <span className="font-bold block text-kc-green mb-0.5">Booking Confirmed!</span>
                {bookingToast}
              </div>
              <button
                onClick={() => setBookingToast(null)}
                className="text-xs font-semibold text-kc-muted hover:text-kc-text"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* 2. Two Large Choice Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Card A: Self Upload */}
            <button
              type="button"
              onClick={() => setActiveTab("upload")}
              className={`text-left rounded-2xl p-5 border transition-all duration-200 card-3d-hover relative flex flex-col justify-between ${
                activeTab === "upload"
                  ? "bg-white border-kc-green ring-2 ring-kc-green/20 shadow-sm"
                  : "bg-white border-kc-border hover:border-gray-300"
              }`}
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-kc-green-light flex items-center justify-center mb-3">
                  <FlaskConical className="w-6 h-6 text-kc-green" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-kc-text">
                  Upload Soil Report
                </h3>
                <p className="text-xs sm:text-sm text-kc-muted mt-1.5 leading-relaxed">
                  Already tested your soil? Upload your report or enter values manually to get instant AI recommendations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                <span className={activeTab === "upload" ? "text-kc-green" : "text-kc-muted"}>
                  {activeTab === "upload" ? "Active Flow" : "Tap to Enter Values"}
                </span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>

            {/* Card B: Assign a Lab Assistant (Recommended / Commission Flow) */}
            <button
              type="button"
              onClick={() => setActiveTab("assistant")}
              className={`text-left rounded-2xl p-5 border transition-all duration-200 card-3d-hover relative flex flex-col justify-between overflow-hidden ${
                activeTab === "assistant"
                  ? "bg-gradient-to-br from-[#2f9e44] to-[#258539] text-white border-[#237c35] shadow-md ring-2 ring-kc-green/30"
                  : "bg-white border-kc-border hover:border-kc-green"
              }`}
            >
              {/* Recommended Ribbon */}
              <div
                className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                  activeTab === "assistant"
                    ? "bg-amber-400 text-gray-900 shadow-xs"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                <Sparkles className="w-3 h-3" />
                Recommended
              </div>

              <div>
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3 ${
                    activeTab === "assistant" ? "bg-white/20" : "bg-kc-green-light"
                  }`}
                >
                  <Users
                    className={`w-6 h-6 ${
                      activeTab === "assistant" ? "text-white" : "text-kc-green"
                    }`}
                  />
                </div>
                <h3
                  className={`text-base sm:text-lg font-bold ${
                    activeTab === "assistant" ? "text-white" : "text-kc-text"
                  }`}
                >
                  Assign a Lab Assistant
                </h3>
                <p
                  className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
                    activeTab === "assistant" ? "text-white/90" : "text-kc-muted"
                  }`}
                >
                  Don't have testing equipment? Book a certified lab assistant to visit your farm and test your soil professionally.
                </p>
              </div>

              <div
                className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                  activeTab === "assistant"
                    ? "border-white/20 text-white"
                    : "border-gray-100 text-kc-green"
                }`}
              >
                <span>Book Farm Visit (₹249 onwards)</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* ACTIVE FLOW CONTENT */}
          {activeTab === "upload" && (
            <div className="bg-white rounded-2xl border border-kc-border p-4 sm:p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="text-base sm:text-lg font-bold text-kc-text">
                  Upload Report or Enter Test Values
                </h2>
                <p className="text-xs text-kc-muted mt-0.5">
                  Our agronomy engine maps NPK levels to your upcoming crop requirements.
                </p>
              </div>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-gray-200 hover:border-kc-green rounded-2xl p-6 text-center cursor-pointer transition-colors bg-gray-50/50 group">
                <div className="w-12 h-12 rounded-full bg-kc-green-light text-kc-green flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-kc-text">
                  Tap to upload photo or PDF of soil report
                </div>
                <p className="text-[11px] text-kc-muted mt-1">
                  Supported formats: PDF, JPG, PNG (up to 10MB)
                </p>
              </div>

              {/* Manual Entry Form */}
              <form onSubmit={handleCalculate} className="space-y-4">
                <div className="text-xs font-bold text-kc-text uppercase tracking-wider text-kc-muted">
                  Or enter soil test values manually:
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-kc-muted mb-1">
                      pH Level
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={ph}
                      onChange={(e) => setPh(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-kc-border text-sm font-bold text-kc-text focus:border-kc-green focus:outline-none"
                      placeholder="e.g. 6.5"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-kc-muted mb-1">
                      Nitrogen (N) kg/ha
                    </label>
                    <input
                      type="number"
                      value={nitrogen}
                      onChange={(e) => setNitrogen(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-kc-border text-sm font-bold text-kc-text focus:border-kc-green focus:outline-none"
                      placeholder="e.g. 240"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-kc-muted mb-1">
                      Phosphorus (P) kg/ha
                    </label>
                    <input
                      type="number"
                      value={phosphorus}
                      onChange={(e) => setPhosphorus(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-kc-border text-sm font-bold text-kc-text focus:border-kc-green focus:outline-none"
                      placeholder="e.g. 22"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-kc-muted mb-1">
                      Potassium (K) kg/ha
                    </label>
                    <input
                      type="number"
                      value={potassium}
                      onChange={(e) => setPotassium(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-kc-border text-sm font-bold text-kc-text focus:border-kc-green focus:outline-none"
                      placeholder="e.g. 180"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-kc-muted mb-1">
                      Moisture %
                    </label>
                    <input
                      type="number"
                      value={moisture}
                      onChange={(e) => setMoisture(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-kc-border text-sm font-bold text-kc-text focus:border-kc-green focus:outline-none"
                      placeholder="e.g. 42"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-kc-green hover:bg-[#28883a] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98] transition"
                >
                  Get AI Recommendation
                </button>
              </form>

              {/* Mock AI Recommendation Output Card */}
              {showRecommendation && (
                <div className="bg-[#f3faf4] border border-[#bde4c5] p-4 sm:p-5 rounded-2xl space-y-3 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-kc-green shrink-0" />
                    <span className="font-bold text-sm text-kc-text">
                      AI Soil Analysis & Action Plan
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-kc-text leading-relaxed">
                    Your soil is <strong>slightly acidic (pH {ph})</strong> with moderate Nitrogen ({nitrogen} kg/ha) and optimum Phosphorus ({phosphorus} kg/ha).
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-[#d6efdb]">
                      <div className="font-bold text-kc-green mb-1">Recommendation 1:</div>
                      Apply agricultural lime (150 kg/acre) before sowing to balance acidity and improve phosphorus uptake.
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-[#d6efdb]">
                      <div className="font-bold text-kc-green mb-1">Recommendation 2:</div>
                      Use 2 splits of Urea (45 kg/acre each) at basal and crown-root initiation stages for wheat/onion crops.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "assistant" && (
            <div className="bg-white rounded-2xl border border-kc-border p-4 sm:p-6 shadow-xs space-y-4 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-kc-text">
                    Available Certified Soil Assistants
                  </h2>
                  <p className="text-xs text-kc-muted mt-0.5">
                    Certified specialists near Pune who visit your farm with digital test kits.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-kc-green font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> 100% Verified
                </div>
              </div>

              {/* 3 Lab Assistant Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockAssistants.map((assistant) => {
                  const isBooked = bookedAssistant === assistant.name;
                  return (
                    <div
                      key={assistant.id}
                      className="border border-kc-border rounded-2xl p-4 flex flex-col justify-between hover:border-kc-green transition-all shadow-2xs group"
                    >
                      <div>
                        {/* Header: Name + Rating */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="font-bold text-sm text-kc-text group-hover:text-kc-green transition-colors">
                              {assistant.name}
                            </div>
                            <div className="text-xs text-kc-muted">
                              {assistant.role}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-xs font-bold shrink-0">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {assistant.rating}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-1.5 text-xs text-kc-muted my-3 pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-kc-green shrink-0" />
                            <span>{assistant.distance}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-kc-green shrink-0" />
                            <span>Slot: {assistant.availableTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BadgePercent className="w-3.5 h-3.5 text-kc-green shrink-0" />
                            <span>{assistant.experience} · {assistant.reviewsCount} tests done</span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing and Action */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-2">
                        <div className="font-bold text-sm text-kc-text">
                          {assistant.fee}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleBook(assistant.name)}
                          disabled={isBooked}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs active:scale-95 ${
                            isBooked
                              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                              : "bg-kc-green hover:bg-[#28883a] text-white"
                          }`}
                        >
                          {isBooked ? "Requested" : "Book Visit"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Past Soil Reports */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-kc-text">
                Past Soil Reports
              </h2>
              <span className="text-xs text-kc-muted">
                {pastReports.length} reports archived
              </span>
            </div>

            <div className="flex overflow-x-auto gap-4 -mx-4 px-4 pb-2 sm:mx-0 sm:px-0 scrollbar-none">
              {pastReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-2xl border border-kc-border p-4 shadow-xs shrink-0 w-[80vw] sm:w-[320px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-kc-green flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" />
                        {report.status}
                      </span>
                      <span className="text-[11px] text-kc-muted flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {report.date}
                      </span>
                    </div>

                    <div className="font-bold text-sm text-kc-text mb-2">
                      {report.crop}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-gray-50 p-2.5 rounded-xl text-kc-muted mb-2.5">
                      <div>pH: <span className="font-semibold text-kc-text">{report.ph}</span></div>
                      <div>N: <span className="font-semibold text-kc-text">{report.n}</span></div>
                      <div>P: <span className="font-semibold text-kc-text">{report.p}</span></div>
                      <div>K: <span className="font-semibold text-kc-text">{report.k}</span></div>
                    </div>

                    <p className="text-xs text-kc-muted leading-relaxed">
                      {report.verdict}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-kc-green font-semibold cursor-pointer hover:underline">
                      Download PDF
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
