import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  FlaskConical,
  Calendar,
  Users,
  ShoppingCart,
  Landmark,
  Cloud,
  Stethoscope,
  Sprout,
  BookOpen,
  MessageSquareQuote,
  Bell,
  Settings,
} from "lucide-react";

interface MoreSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const moreNavItems = [
  { label: "Soil Health", icon: FlaskConical, to: "/soil", badge: "Smart" },
  { label: "Crop Calendar", icon: Calendar, to: "/calendar" },
  { label: "Community", icon: Users, to: "/community", badge: "Loans" },
  { label: "Kisan Store", icon: ShoppingCart, to: "/store" },
  { label: "Government Schemes", icon: Landmark, to: "/schemes" },
  { label: "Weather", icon: Cloud, to: "/weather" },
  { label: "Crop Doctor", icon: Stethoscope, to: "/crop-doctor", badge: "New" },
  { label: "My Crops", icon: Sprout, to: "/crops" },
  { label: "Farming Guides", icon: BookOpen, to: "/guides" },
  { label: "Testimonials", icon: MessageSquareQuote, to: "/testimonials" },
  { label: "Notifications", icon: Bell, to: "/notifications", badge: "3" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

export default function MoreSheet({ open, onOpenChange }: MoreSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pt-3 pb-8 bg-white border-t border-kc-border shadow-2xl"
      >
        {/* Drag handle bar at top */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 shrink-0" />

        <SheetHeader className="text-left mb-4">
          <SheetTitle className="text-lg font-bold text-kc-text">
            More Features & Tools
          </SheetTitle>
          <p className="text-xs text-kc-muted">
            Explore all agricultural services and resources
          </p>
        </SheetHeader>

        {/* 2-column grid of rounded-2xl cards */}
        <div className="grid grid-cols-2 gap-3">
          {moreNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.to as any}
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-3 p-3.5 rounded-2xl border border-kc-border bg-white hover:bg-kc-green-light/40 active:scale-95 transition-all shadow-xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-kc-green-light flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 text-kc-green" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-kc-text truncate leading-tight group-hover:text-kc-green transition-colors">
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className="inline-block text-[10px] font-semibold text-kc-green bg-kc-green-light px-1.5 py-0.5 rounded-md mt-1">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
