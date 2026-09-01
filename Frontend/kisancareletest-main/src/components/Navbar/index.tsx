import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { navLinks } from "@/data/landing";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const obs = new IntersectionObserver(([entry]) => setOnLight(!entry.isIntersecting), {
      rootMargin: "-72px 0px 0px 0px",
      threshold: 0,
    });
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isLight = onLight && !open;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav
        aria-label="Main navigation"
        className={cn(
          "pointer-events-auto relative mx-auto flex h-[58px] max-w-[1280px] items-center justify-between gap-4 rounded-[18px] border px-3 sm:h-[64px] sm:px-5 transition-all duration-500 overflow-hidden",
          isLight
            ? "border-black/[0.07] bg-white/85 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[16px]"
            : scrolled
              ? "border-white/15 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-[20px] supports-[backdrop-filter]:bg-white/[0.06]"
              : "border-white/12 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_32px_rgba(0,0,0,0.22)] backdrop-blur-[16px] supports-[backdrop-filter]:bg-white/[0.04]",
        )}
        style={{
          backdropFilter: isLight ? "blur(16px) saturate(160%)" : "blur(20px) saturate(180%)",
          WebkitBackdropFilter: isLight ? "blur(16px) saturate(160%)" : "blur(20px) saturate(180%)",
        }}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[18px] transition-opacity duration-300",
            isLight
              ? "bg-gradient-to-b from-white/60 to-white/20 opacity-100"
              : "bg-gradient-to-b from-white/[0.08] to-transparent opacity-60",
          )}
          aria-hidden
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r transition-opacity",
            isLight
              ? "from-transparent via-black/10 to-transparent"
              : "from-transparent via-white/20 to-transparent",
          )}
          aria-hidden
        />

        <a href="#home" className="relative shrink-0 rounded-xl focus-visible:outline-none">
          <Logo tone={isLight ? "default" : "light"} size="md" />
        </a>

        <div className="relative hidden items-center gap-1 lg:flex">
          {navLinks.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-[14.5px] font-medium tracking-[-0.01em] transition-all duration-300",
                isLight
                  ? idx === 0
                    ? "text-[#0a2114] bg-black/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                    : "text-[#0a2114]/70 hover:text-[#0a2114] hover:bg-black/[0.05]"
                  : idx === 0
                    ? "text-white bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "text-white/80 hover:text-white hover:bg-white/[0.08] hover:backdrop-blur-sm",
              )}
            >
              {link.label}
              {idx === 0 && (
                <span
                  className="absolute inset-x-3 -bottom-1 h-[2px] rounded-full bg-[#2a8a3a] shadow-[0_0_8px_rgba(42,138,58,0.35)]"
                  aria-hidden
                />
              )}
            </a>
          ))}
        </div>

        <div className="relative hidden lg:flex items-center gap-2">
          <Link
            to="/login"
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-full px-5 text-[14px] font-medium backdrop-blur-md transition-all duration-300 active:scale-95",
              isLight
                ? "border border-black/10 bg-black/[0.05] text-[#0a2114] hover:bg-black/[0.08]"
                : "border border-white/15 bg-white/[0.07] text-white hover:bg-white/[0.12] hover:border-white/20",
            )}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[#2a8a3a] px-6 text-[14px] font-semibold text-white shadow-[0_4px_16px_rgba(34,125,50,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#25933a] hover:shadow-[0_8px_24px_rgba(34,125,50,0.35)] active:scale-95 border border-white/10"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            "relative grid h-10 w-10 place-items-center rounded-full border backdrop-blur-[12px] transition-all duration-300 lg:hidden",
            open
              ? "border-white/15 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
              : isLight
                ? "border-black/10 bg-white text-[#0a2114] shadow-sm"
                : "border-white/15 bg-white/[0.08] text-white",
          )}
          style={{ backdropFilter: "blur(12px) saturate(150%)" }}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="pointer-events-auto mx-auto mt-3 max-w-[1280px] overflow-hidden rounded-2xl border border-black/10 bg-white/95 shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur-[20px] lg:hidden"
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        <ul className="flex flex-col gap-1 p-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3.5 text-base font-medium text-[#0a2114] hover:bg-black/[0.05] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-1">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-black/10 px-4 text-base font-medium text-[#0a2114] hover:bg-black/[0.05] transition-colors"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2a8a3a] px-4 text-base font-semibold text-white"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
