import { Leaf, House, Sprout, Settings, Users, Info, Mail, Phone, MapPin, MessageCircle, Play, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { navLinks } from "@/data/landing";

const quickLinks = [
  { label: "Home", href: "#home", icon: House },
  { label: "Features", href: "#features", icon: Sprout },
  { label: "How It Works", href: "#how-it-works", icon: Settings },
  { label: "For Farmers", href: "#farmers", icon: Users },
  { label: "About", href: "#about", icon: Info },
];

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#032A1B]">
      <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-white/[0.06]" />
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(155,234,60,0.3) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

      <svg aria-hidden className="pointer-events-none absolute bottom-0 left-0 w-[180px] h-[160px] text-[#0f3a22] opacity-[0.45] hidden sm:block" viewBox="0 0 180 160" fill="none">
        <g fill="currentColor" opacity="0.7">
          {Array.from({ length: 18 }).map((_, i) => (
            <ellipse key={i} cx={20 + (i % 4) * 35} cy={30 + Math.floor(i / 4) * 28} rx={8 + (i % 3) * 3} ry={5} transform={`rotate(${-15 + i * 2} ${20 + (i % 4) * 35} ${30 + Math.floor(i / 4) * 28})`} />
          ))}
        </g>
      </svg>
      <svg aria-hidden className="pointer-events-none absolute bottom-0 right-0 w-[200px] h-[170px] text-[#0f3a22] opacity-[0.4] hidden sm:block" viewBox="0 0 200 170" fill="none">
        <g fill="currentColor" opacity="0.6">
          {Array.from({ length: 16 }).map((_, i) => (
            <ellipse key={i} cx={30 + (i % 4) * 38} cy={20 + Math.floor(i / 4) * 30} rx={9} ry={5.5} transform={`rotate(${12 + i * 1.5} ${30 + (i % 4) * 38} ${20 + Math.floor(i / 4) * 30})`} />
          ))}
        </g>
      </svg>

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.7fr_0.9fr] lg:gap-12">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-[330px] text-[14px] leading-[1.65] text-[#C8D6C0]/75">
              Weather, crops, soil, mandi prices and farming guidance — together in one calm platform built for farmers.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { label: "WhatsApp", icon: MessageCircle, href: "#contact" },
                { label: "YouTube", icon: Play, href: "#contact" },
                { label: "X", icon: X, href: "#contact" },
              ].map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full bg-[#0e2e1f] border border-[#1e4a2e] text-[#8BC34A] hover:bg-[#143a28] hover:border-[#2a5a35] hover:text-[#AED581] transition-colors">
                  <s.icon className="h-4 w-4" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer quick links">
            <h2 className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-[#8BC34A]">
              <Leaf className="h-3.5 w-3.5" /> QUICK LINKS <span className="ml-1 h-px w-8 bg-white/10" />
            </h2>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="inline-flex items-center gap-2.5 text-[14px] text-[#E8ECE4]/80 hover:text-[#8BC34A] transition-colors">
                    <link.icon className="h-4 w-4 text-[#8BC34A]/70" strokeWidth={1.8} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-[#8BC34A]">
              <Leaf className="h-3.5 w-3.5" /> CONTACT <span className="ml-1 h-px w-8 bg-white/10" />
            </h2>
            <ul className="mt-5 space-y-3">
              <li className="flex items-center gap-2.5 text-[14px] text-[#E8ECE4]/80">
                <Mail className="h-4 w-4 text-[#8BC34A]/70" strokeWidth={1.8} /> help@kisancare.example
              </li>
              <li className="flex items-center gap-2.5 text-[14px] text-[#E8ECE4]/80">
                <Phone className="h-4 w-4 text-[#8BC34A]/70" strokeWidth={1.8} /> +91 90000 00000
              </li>
              <li className="flex items-center gap-2.5 text-[14px] text-[#E8ECE4]/80">
                <MapPin className="h-4 w-4 text-[#8BC34A]/70" strokeWidth={1.8} /> Nashik, Maharashtra, India
              </li>
            </ul>
            <div className="mt-6 h-px w-full max-w-[280px] bg-white/[0.06]" />
            <div className="mt-5 flex gap-3">
              {[
                { label: "WhatsApp", icon: MessageCircle, href: "#contact" },
                { label: "YouTube", icon: Play, href: "#contact" },
                { label: "X", icon: X, href: "#contact" },
              ].map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full bg-[#0e2e1f] border border-[#1e4a2e] text-[#8BC34A] hover:bg-[#143a28] hover:border-[#2a5a35] hover:text-[#AED581] transition-colors">
                  <s.icon className="h-4 w-4" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-white/[0.06] pt-6 sm:pt-7">
          <p className="inline-flex items-center gap-2 text-[12px] text-[#8a9a8e]/60">
            <Leaf className="h-3 w-3 text-[#6a9a5a]/50" /> © 2025 Kisan Care. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
