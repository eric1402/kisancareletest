import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import GreetingBanner from "@/components/dashboard/GreetingBanner";
import StatCardsRow from "@/components/dashboard/StatCardsRow";
import WeatherCard from "@/components/dashboard/WeatherCard";
import TasksCard from "@/components/dashboard/TasksCard";
import QuickActionsCard from "@/components/dashboard/QuickActionsCard";
import CropHealthCard from "@/components/dashboard/CropHealthCard";
import MarketPricesCard from "@/components/dashboard/MarketPricesCard";
import AITipBanner from "@/components/dashboard/AITipBanner";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Kisan Care Smart Farming" },
      {
        name: "description",
        content:
          "Manage crops, check weather, soil health, tasks, mandi market prices and farming guidance on Kisan Care.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-kc-bg text-kc-text antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <DashboardHeader
          onToggleMobileSidebar={() => setMobileMenuOpen((prev) => !prev)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-7 space-y-5 sm:space-y-6 max-w-[1600px] w-full mx-auto">
          {/* Greeting Banner */}
          <div className="animate-dash-1">
            <GreetingBanner />
          </div>

          {/* 4 Stat Cards Row */}
          <div className="animate-dash-2">
            <StatCardsRow />
          </div>

          {/* 3-Column Middle Section: Weather, Tasks, Quick Actions */}
          <div className="animate-dash-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <WeatherCard />
            <TasksCard />
            <div className="md:col-span-2 lg:col-span-1">
              <QuickActionsCard />
            </div>
          </div>

          {/* Bottom Grid: Crop Health (2 cols) & Market Prices (1 col) */}
          <div className="animate-dash-4 grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            <div className="lg:col-span-2">
              <CropHealthCard />
            </div>
            <div className="lg:col-span-1">
              <MarketPricesCard />
            </div>
          </div>

          {/* AI Tip Banner */}
          <div className="animate-dash-5">
            <AITipBanner />
          </div>
        </main>
      </div>
    </div>
  );
}
