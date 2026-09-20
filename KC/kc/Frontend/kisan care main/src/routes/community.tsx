import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MobileTabBar from "@/components/dashboard/MobileTabBar";
import {
  Users,
  MessageSquare,
  Heart,
  Share2,
  Send,
  Plus,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ArrowRight,
  BadgePercent,
  Clock,
  Building2,
  Calendar,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community & Farm Loans — Kisan Care Smart Farming" },
      {
        name: "description",
        content:
          "Connect with progressive farmers, discuss pest management and crop tips, and apply for institutional agriculture bank loans.",
      },
    ],
  }),
  component: CommunityPage,
});

interface Post {
  id: string;
  author: string;
  location: string;
  avatarColor: string;
  timeAgo: string;
  badge?: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
}

const initialPosts: Post[] = [
  {
    id: "p-1",
    author: "Balasaheb Patil",
    location: "Baramati, Pune",
    avatarColor: "bg-emerald-600",
    timeAgo: "25 mins ago",
    badge: "Master Farmer",
    content:
      "Heavy fog in the morning around Pune district. Recommend monitoring tomato and potato leaves for early blight. Spraying Mancozeb 2.5g/L helped preserve my yield last season.",
    likes: 24,
    comments: 7,
    tags: ["Tomato", "Blight Alert", "Pune"],
  },
  {
    id: "p-2",
    author: "Sunita Ghorpade",
    location: "Kharwandi, Latur",
    avatarColor: "bg-amber-600",
    timeAgo: "2 hours ago",
    content:
      "Has anyone applied for the PM-KUSUM solar water pump subsidy through the MahaDBT portal recently? My approval came through in 3 weeks, highly recommend applying before the monsoon quota closes!",
    likes: 41,
    comments: 15,
    tags: ["Solar Pump", "Govt Scheme", "Latur"],
  },
  {
    id: "p-3",
    author: "Ganesh Shinde",
    location: "Niphad, Nashik",
    avatarColor: "bg-blue-600",
    timeAgo: "5 hours ago",
    content:
      "Good news from Lasalgaon mandi today — onion rates touching ₹1,650/Q for export quality. Storing in aerated chawls is proving to be the right decision this season.",
    likes: 56,
    comments: 12,
    tags: ["Onion", "Mandi Rates", "Nashik"],
  },
  {
    id: "p-4",
    author: "Kailash Jagtap",
    location: "Pandharpur, Solapur",
    avatarColor: "bg-teal-600",
    timeAgo: "1 day ago",
    content:
      "What is the best bio-fertilizer schedule for sugarcane at 45 days? Looking to transition from purely chemical DAP to Jeevamrutha and Trichoderma.",
    likes: 19,
    comments: 9,
    tags: ["Sugarcane", "Organic", "Solapur"],
  },
  {
    id: "p-5",
    author: "Prakash More",
    location: "Dindori, Nashik",
    avatarColor: "bg-purple-600",
    timeAgo: "1 day ago",
    content:
      "Completed 1st harvest of drip-irrigated chilli. Got 42 quintals from 1.5 acres. Kisan Care's weekly watering calendar helped save nearly 30% power and water.",
    likes: 78,
    comments: 21,
    tags: ["Chilli", "Success Story", "Drip"],
  },
  {
    id: "p-6",
    author: "Vithal Chavan",
    location: "Bhor, Pune",
    avatarColor: "bg-rose-600",
    timeAgo: "2 days ago",
    content:
      "Sharing my soil report results from the Kisan Care lab assistant visit yesterday. Carbon content is 0.72% (up from 0.5% after green manuring with Sunhemp). Well worth the ₹299 test fee!",
    likes: 33,
    comments: 5,
    tags: ["Soil Test", "Organic Carbon"],
  },
];

interface LoanOffer {
  id: string;
  bank: string;
  loanName: string;
  interestRate: string;
  maxAmount: string;
  tenure: string;
  badge: string;
  features: string[];
}

const loanOffers: LoanOffer[] = [
  {
    id: "l-1",
    bank: "State Bank of India (SBI)",
    loanName: "Kisan Credit Card (KCC)",
    interestRate: "7.0% p.a.",
    maxAmount: "Up to ₹3,00,000",
    tenure: "5 Years Renewal",
    badge: "Govt Subsidized (3% Prompt Repayment)",
    features: ["No processing fee up to ₹1.6 Lakh", "Flexible withdrawal via RuPay card", "Direct crop insurance tie-in"],
  },
  {
    id: "l-2",
    bank: "Bank of Maharashtra",
    loanName: "Maha Krishi Drip & Irrigation Loan",
    interestRate: "8.15% p.a.",
    maxAmount: "Up to ₹5,00,000",
    tenure: "7 Years Repayment",
    badge: "Fast Disbursal",
    features: ["80% equipment cost funded", "Moratorium period of 6 months", "Minimal documentation for smallholders"],
  },
  {
    id: "l-3",
    bank: "HDFC Bank AgTech",
    loanName: "Tractor & Farm Mechanization Loan",
    interestRate: "8.75% p.a.",
    maxAmount: "Up to ₹10,00,000",
    tenure: "Up to 6 Years",
    badge: "Digital Approval",
    features: ["Instant preliminary sanction online", "Doorstep verification", "Discounts on certified tractor brands"],
  },
  {
    id: "l-4",
    bank: "NABARD Partner Co-op",
    loanName: "Warehouse Receipt Post-Harvest Loan",
    interestRate: "7.5% p.a.",
    maxAmount: "Up to ₹2,50,000",
    tenure: "12 Months",
    badge: "Avoid Distress Sale",
    features: ["Store produce in WDRA warehouse", "Get immediate working capital", "Sell when mandi rates peak"],
  },
];

function CommunityPage() {
  const [tab, setTab] = useState<"discussions" | "loans">("discussions");
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [newPostTag, setNewPostTag] = useState("General");

  // Loan application modal state
  const [selectedLoan, setSelectedLoan] = useState<LoanOffer | null>(null);
  const [loanStep, setLoanStep] = useState<1 | 2 | 3>(1);
  const [loanAmount, setLoanAmount] = useState("150000");
  const [farmerName, setFarmerName] = useState("Prathamesh Rao");
  const [landSize, setLandSize] = useState("3.5 Acres");
  const [aadhaar, setAadhaar] = useState("•••• •••• 4912");

  function handleLike(id: string) {
    const isLiked = likedPosts[id];
    setLikedPosts((prev) => ({ ...prev, [id]: !isLiked }));
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, likes: isLiked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  }

  function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newEntry: Post = {
      id: `p-${Date.now()}`,
      author: "Prathamesh Rao",
      location: "Haveli, Pune",
      avatarColor: "bg-kc-green",
      timeAgo: "Just now",
      badge: "Farmer",
      content: newPostText.trim(),
      likes: 0,
      comments: 0,
      tags: [newPostTag],
    };

    setPosts([newEntry, ...posts]);
    setNewPostText("");
    setNewPostOpen(false);
  }

  function handleOpenLoan(loan: LoanOffer) {
    setSelectedLoan(loan);
    setLoanStep(1);
  }

  return (
    <div className="flex min-h-screen bg-kc-bg text-kc-text antialiased">
      <Sidebar />
      <MobileTabBar />

      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <DashboardHeader />

        <main className="flex-1 p-4 sm:p-6 lg:p-7 space-y-5 max-w-[1200px] w-full mx-auto pb-20 lg:pb-7">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-kc-text tracking-tight flex items-center gap-2">
                <span>Kisan Community</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-kc-green-light text-kc-green font-semibold">
                  12k+ Farmers
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-kc-muted mt-0.5">
                Share practical farming knowledge, discuss solutions, and access institutional finance.
              </p>
            </div>

            {/* Segmented Top Tabs */}
            <div className="flex items-center bg-gray-100 p-1 rounded-2xl shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setTab("discussions")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition active:scale-95 ${
                  tab === "discussions"
                    ? "bg-white text-kc-green shadow-xs"
                    : "text-kc-muted hover:text-kc-text"
                }`}
              >
                <Users className="w-4 h-4" /> Discussions
              </button>
              <button
                type="button"
                onClick={() => setTab("loans")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition active:scale-95 ${
                  tab === "loans"
                    ? "bg-white text-kc-green shadow-xs"
                    : "text-kc-muted hover:text-kc-text"
                }`}
              >
                <Landmark className="w-4 h-4" /> Farm Loans
              </button>
            </div>
          </div>

          {/* TAB 1: DISCUSSIONS */}
          {tab === "discussions" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Sticky "Ask the Community" input bar */}
              <div
                onClick={() => setNewPostOpen(true)}
                className="bg-white rounded-2xl border border-kc-border p-3 sm:p-4 shadow-xs flex items-center gap-3 cursor-pointer hover:border-[#bde4c5] active:scale-[0.99] transition-all"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#44a838] to-[#2f9e44] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  P
                </div>
                <div className="flex-1 text-xs sm:text-sm text-kc-muted">
                  Ask a question or share a farming tip with the community...
                </div>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-xl bg-kc-green hover:bg-[#28883a] text-white text-xs font-bold shrink-0 shadow-xs"
                >
                  Post
                </button>
              </div>

              {/* Feed of Posts */}
              <div className="space-y-3.5">
                {posts.map((post) => {
                  const isLiked = likedPosts[post.id];
                  return (
                    <div
                      key={post.id}
                      className="bg-white rounded-2xl border border-kc-border p-4 sm:p-5 shadow-xs space-y-3 hover:border-gray-300 transition-all"
                    >
                      {/* Author Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full ${post.avatarColor} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs`}
                          >
                            {post.author.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-kc-text">
                                {post.author}
                              </span>
                              {post.badge && (
                                <span className="text-[10px] font-semibold text-kc-green bg-kc-green-light px-2 py-0.5 rounded-full">
                                  {post.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-kc-muted flex items-center gap-1.5 mt-0.5">
                              <span>{post.location}</span> · <span>{post.timeAgo}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <p className="text-xs sm:text-sm text-kc-text leading-relaxed">
                        {post.content}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-medium text-kc-muted bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded-lg transition"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Bar */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-kc-muted font-semibold">
                        <button
                          type="button"
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition active:scale-95 ${
                            isLiked ? "text-kc-red bg-red-50" : "hover:bg-gray-50 hover:text-kc-text"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${isLiked ? "fill-kc-red text-kc-red" : ""}`}
                          />
                          <span>{post.likes}</span>
                        </button>

                        <button
                          type="button"
                          className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-gray-50 hover:text-kc-text transition active:scale-95"
                        >
                          <MessageSquare className="w-4 h-4 text-gray-400" />
                          <span>{post.comments} Replies</span>
                        </button>

                        <button
                          type="button"
                          className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-gray-50 hover:text-kc-text transition active:scale-95"
                        >
                          <Share2 className="w-4 h-4 text-gray-400" />
                          <span className="hidden sm:inline">Share</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Roadmap Item: Coming Soon Village Training Card */}
              <div className="bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] rounded-2xl p-4 sm:p-5 text-white shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white/20">
                      Future Scope / Coming Soon
                    </span>
                    <span className="text-xs text-green-200">Govt Agriculture Dept Tie-in</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Village Natural Fertilizer Training Camps
                  </h3>
                  <p className="text-xs text-green-100 max-w-xl">
                    Quarterly hands-on village workshops on Beejamrutha, Subhash Palekar natural farming, and organic soil regeneration.
                  </p>
                </div>
                <button
                  type="button"
                  className="px-3.5 py-2 rounded-xl bg-white text-[#1b4332] text-xs font-bold whitespace-nowrap shadow-xs hover:bg-green-50 active:scale-95 transition"
                >
                  Notify My Village
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: FARM LOANS */}
          {tab === "loans" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Intro Banner */}
              <div className="bg-[#f4fbf5] border border-[#d6efdb] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-kc-green-light flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-kc-green" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-kc-text">
                    Apply for Farming Loans Directly Through Kisan Care
                  </h2>
                  <p className="text-xs text-kc-muted mt-0.5 leading-relaxed">
                    We partner with nationalized and leading agriculture banks to get you pre-screened rates, subsidized interest, and digital approvals.
                  </p>
                </div>
              </div>

              {/* Loan Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loanOffers.map((loan) => (
                  <div
                    key={loan.id}
                    className="bg-white rounded-2xl border border-kc-border p-4 sm:p-5 shadow-xs flex flex-col justify-between hover:border-kc-green transition-all group"
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-xs font-semibold text-kc-muted">
                            {loan.bank}
                          </span>
                          <h3 className="text-base font-bold text-kc-text group-hover:text-kc-green transition-colors mt-0.5">
                            {loan.loanName}
                          </h3>
                        </div>
                        <span className="text-[10px] font-bold text-kc-green bg-kc-green-light px-2.5 py-1 rounded-full shrink-0">
                          {loan.badge}
                        </span>
                      </div>

                      {/* Key stats */}
                      <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-xl my-3 text-xs">
                        <div>
                          <div className="text-kc-muted text-[11px]">Interest Rate</div>
                          <div className="font-bold text-sm text-kc-text text-kc-green mt-0.5">
                            {loan.interestRate}
                          </div>
                        </div>
                        <div>
                          <div className="text-kc-muted text-[11px]">Max Sanction</div>
                          <div className="font-bold text-sm text-kc-text mt-0.5">
                            {loan.maxAmount}
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <ul className="space-y-1.5 text-xs text-kc-muted mb-4">
                        {loan.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-kc-green shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenLoan(loan)}
                      className="w-full py-2.5 rounded-xl bg-kc-green hover:bg-[#28883a] text-white text-xs sm:text-sm font-bold transition active:scale-[0.98] shadow-xs flex items-center justify-center gap-1.5"
                    >
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* New Post Sheet */}
      <Sheet open={newPostOpen} onOpenChange={setNewPostOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 sm:p-6 bg-white border-t border-kc-border shadow-2xl">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 shrink-0" />
          <SheetHeader className="text-left pb-2 border-b border-gray-100">
            <SheetTitle className="text-lg font-bold text-kc-text">
              Create Community Post
            </SheetTitle>
            <p className="text-xs text-kc-muted">
              Share updates, pest observations, or questions with fellow farmers.
            </p>
          </SheetHeader>

          <form onSubmit={handleCreatePost} className="space-y-4 pt-3">
            <div>
              <label className="block text-xs font-semibold text-kc-muted mb-1">
                Category / Topic
              </label>
              <select
                value={newPostTag}
                onChange={(e) => setNewPostTag(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-kc-border text-xs sm:text-sm font-semibold text-kc-text focus:outline-none focus:border-kc-green"
              >
                <option value="Pest Control">Pest Control & Disease</option>
                <option value="Sowing Guidance">Sowing Guidance</option>
                <option value="Govt Schemes">Government Schemes & Subsidy</option>
                <option value="Mandi Rates">Mandi Rates & Storage</option>
                <option value="Success Story">Success Story</option>
                <option value="General">General Question</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-kc-muted mb-1">
                Your Question or Tip
              </label>
              <textarea
                rows={4}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="What's happening in your farm? Ask or share details..."
                className="w-full p-3 rounded-xl border border-kc-border text-xs sm:text-sm text-kc-text focus:outline-none focus:border-kc-green"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-kc-green hover:bg-[#28883a] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98] transition"
            >
              Publish Post
            </button>
          </form>
        </SheetContent>
      </Sheet>

      {/* Mock Multi-step Loan Application Sheet */}
      <Sheet open={!!selectedLoan} onOpenChange={(open) => !open && setSelectedLoan(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 sm:p-6 bg-white border-t border-kc-border shadow-2xl">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 shrink-0" />

          {selectedLoan && (
            <div className="space-y-4">
              <SheetHeader className="text-left pb-2 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-lg font-bold text-kc-text">
                    {selectedLoan.loanName}
                  </SheetTitle>
                  <span className="text-xs font-bold text-kc-green bg-kc-green-light px-2.5 py-1 rounded-full">
                    Step {loanStep} of 3
                  </span>
                </div>
                <p className="text-xs text-kc-muted">
                  Partner Bank: {selectedLoan.bank} · Rate: {selectedLoan.interestRate}
                </p>
              </SheetHeader>

              {/* Step 1: Amount & Purpose */}
              {loanStep === 1 && (
                <div className="space-y-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-kc-muted mb-1">
                      Required Loan Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-kc-border text-base font-bold text-kc-text focus:outline-none focus:border-kc-green"
                    />
                    <span className="text-[11px] text-kc-muted mt-1 block">
                      Max permissible for this scheme: {selectedLoan.maxAmount}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-kc-muted mb-1">
                      Primary Purpose
                    </label>
                    <select className="w-full h-11 px-3 rounded-xl border border-kc-border text-xs sm:text-sm font-semibold text-kc-text focus:outline-none focus:border-kc-green">
                      <option>Crop Inputs (Seeds, Fertilizers, Pesticides)</option>
                      <option>Drip / Sprinkler Irrigation Installation</option>
                      <option>Farm Machinery / Tractor Purchase</option>
                      <option>Post-harvest Storage & Working Capital</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLoanStep(2)}
                    className="w-full py-3 rounded-xl bg-kc-green hover:bg-[#28883a] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98] transition mt-2"
                  >
                    Continue to Farmer Details →
                  </button>
                </div>
              )}

              {/* Step 2: Farmer Details */}
              {loanStep === 2 && (
                <div className="space-y-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-kc-muted mb-1">
                      Farmer Full Name
                    </label>
                    <input
                      type="text"
                      value={farmerName}
                      onChange={(e) => setFarmerName(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-kc-border text-sm font-semibold text-kc-text focus:outline-none focus:border-kc-green"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-kc-muted mb-1">
                        Cultivable Land Size
                      </label>
                      <input
                        type="text"
                        value={landSize}
                        onChange={(e) => setLandSize(e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-kc-border text-sm font-semibold text-kc-text focus:outline-none focus:border-kc-green"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-kc-muted mb-1">
                        Aadhaar Number
                      </label>
                      <input
                        type="text"
                        value={aadhaar}
                        onChange={(e) => setAadhaar(e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-kc-border text-sm font-semibold text-kc-text focus:outline-none focus:border-kc-green"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs text-kc-muted flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-kc-green shrink-0 mt-0.5" />
                    <span>Your 7/12 land records and Aadhaar are protected with 256-bit bank-grade encryption.</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setLoanStep(1)}
                      className="w-1/3 py-3 rounded-xl border border-kc-border text-kc-muted font-bold text-xs hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoanStep(3)}
                      className="w-2/3 py-3 rounded-xl bg-kc-green hover:bg-[#28883a] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98] transition"
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {loanStep === 3 && (
                <div className="text-center py-4 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-kc-green-light text-kc-green flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-kc-text">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-xs text-kc-muted max-w-sm mx-auto leading-relaxed">
                    Your preliminary request for <strong>₹{Number(loanAmount).toLocaleString()}</strong> has been dispatched to {selectedLoan.bank}. A field verification officer will contact you within <strong>3-5 working days</strong>.
                  </p>
                  <div className="p-3 bg-gray-50 rounded-xl text-xs font-mono text-kc-muted max-w-xs mx-auto">
                    Application Ref: KC-LN-{Math.floor(100000 + Math.random() * 900000)}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedLoan(null)}
                    className="w-full py-3 rounded-xl bg-kc-green hover:bg-[#28883a] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98] transition mt-2"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
