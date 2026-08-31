import { ArrowRight, Leaf, Sprout, TrendingUp, Globe } from "lucide-react";
import heroField from "@/assets/hero-field.jpg";
import { useGsapScope } from "@/hooks/use-gsap";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";

export function Hero() {
  const reduced = usePrefersReducedMotion();

  const ref = useGsapScope<HTMLDivElement>((ctx) => {
    if (ctx.reduced) return;
    const { gsap } = ctx;

    gsap.fromTo(
      "[data-hero-bg]",
      { scale: 1.08 },
      { scale: 1, duration: 1.8, ease: "power3.out" }
    );

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from("[data-reveal]", { y: 22, opacity: 0, duration: 0.7, stagger: 0.09, clearProps: "transform" }, 0.15)
      .from("[data-card]", { y: 18, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power2.out" }, 0.55)
      .from("[data-soil]", { y: 14, opacity: 0, duration: 0.6 }, 0.85);

    gsap.to("[data-float]", {
      y: -8,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <section
      ref={ref as any}
      data-hero-root
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#031B12] pt-24 pb-8 sm:pt-28 lg:pb-10"
    >
      <div data-parallax className="absolute inset-0">
          <img
            data-hero-bg
            src={heroField}
            alt="A farmer standing in a green wheat field at sunrise"
            width={1600}
            height={1104}
            className="h-full w-full object-cover object-[48%_center]"
          />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(3,14,10,0.92) 0%, rgba(5,28,16,0.78) 28%, rgba(12,38,20,0.42) 52%, rgba(12,38,20,0.10) 68%, transparent 82%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 75% at 78% 32%, rgba(217,164,65,0.22) 0%, rgba(217,164,65,0.10) 22%, transparent 52%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(95% 55% at 50% 115%, rgba(3,27,18,0.96) 0%, transparent 62%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-4 sm:px-6 lg:grid lg:grid-cols-[1.06fr_485px] lg:items-center lg:gap-6 lg:px-6 xl:px-2">
        <div className="max-w-[640px] pt-2 sm:pt-6 lg:pt-8">
          <p
            data-reveal
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#35A853]/25 bg-[#0a2a16]/60 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-[#9BEA3C] backdrop-blur-md will-change-transform sm:px-4 sm:py-2 sm:text-xs"
          >
            <Leaf className="h-3.5 w-3.5 text-[#9BEA3C]" aria-hidden />
            SMART FARMING PLATFORM • BUILT FOR BHARAT
          </p>

          <h1
            data-reveal
            className="font-display text-[34px] leading-[0.96] font-extrabold tracking-[-0.035em] will-change-transform sm:text-[48px] lg:text-[58px] xl:text-[64px]"
          >
            <span className="block text-white">Smarter Farming.</span>
            <span className="block text-white">Better Decisions.</span>
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #9BEA3C 0%, #7cc737 55%, #5faa22 100%)",
              }}
            >
              A Better Future.
            </span>
          </h1>

          <p
            data-reveal
            className="mt-5 max-w-[52ch] text-[15px] leading-[1.65] text-white/85 will-change-transform sm:text-[16.5px]"
          >
            Weather, crops, soil insights, mandi prices, government schemes
            <br className="hidden sm:block" />
            and AI assistance — unified in one beautiful platform your
            <br className="hidden sm:block" />
            whole village can use.
          </p>

          <div
            data-reveal
            className="mt-7 flex flex-col gap-3 will-change-transform sm:flex-row sm:items-center"
          >
            <a
              href="#cta"
              className="group inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-[#248a3d] px-7 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(18,90,35,0.35),0_0_0_1px_rgba(155,234,60,0.15)_inset] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#2a9a45] hover:shadow-[0_12px_32px_rgba(18,90,35,0.45)] hover:scale-[1.02] active:scale-[0.98] will-change-transform sm:h-[50px] sm:px-8 sm:text-[16px]"
            >
              Get Started Free <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a
              href="#features"
              className="inline-flex h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-7 text-[15px] font-medium text-white backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/[0.12] hover:border-white/20 hover:scale-[1.01] active:scale-[0.99] will-change-transform sm:h-[50px] sm:px-8"
            >
              <Sprout className="h-4 w-4 text-[#D9A441]" aria-hidden /> Explore Platform
            </a>
          </div>

          <div
            data-reveal
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] font-medium text-white/70 will-change-transform sm:text-[13px]"
          >
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9BEA3C] opacity-30" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#9BEA3C]" />
              </span>
              Live Data
            </span>
            <span className="h-3 w-px bg-white/15" />
            <span>No Credit Card Required</span>
            <span className="h-3 w-px bg-white/15" />
            <span className="inline-flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-[#9BEA3C]/80" /> Hindi • Marathi • English
            </span>
          </div>
        </div>

        <div
          data-card
          className="relative w-full will-change-transform lg:pt-8"
        >
          <div
            data-float
            className="relative mx-auto w-full max-w-[485px] rounded-[22px] border border-white/[0.09] bg-[rgba(10,32,18,0.52)] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-[18px] will-change-transform sm:rounded-[26px] sm:p-3.5"
          >
            <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#D9A441]/20 blur-[32px]" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-[#9BEA3C]/10 blur-[28px]" />

            <div className="relative flex items-center justify-between px-1 pb-3 pt-1">
              <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-white/85">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#9BEA3C]/15">
                  <Leaf className="h-3 w-3 text-[#9BEA3C]" />
                </span>
                LIVE FIELD OVERVIEW • PLOT 2
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.7)]" /> Live
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              <div data-metric className="rounded-[16px] border border-white/[0.07] bg-white/[0.06] p-3 backdrop-blur-md will-change-transform">
                <p className="flex items-center gap-1 text-[11px] font-medium text-white/60">
                  <span className="text-[11px]">⛅</span> Weather
                </p>
                <p className="mt-2 text-[20px] font-bold leading-none tracking-[-0.02em] text-white">28°C</p>
                <p className="mt-1.5 text-[11px] font-medium leading-none text-white/65">Sunny • 62% RH</p>
              </div>

              <div data-metric className="rounded-[16px] border border-white/[0.06] bg-[rgba(255,255,255,0.07)] p-3 backdrop-blur-md will-change-transform">
                <p className="flex items-center gap-1 text-[11px] font-medium text-white/60">
                  <Sprout className="h-3 w-3 text-[#9BEA3C]" /> Crop Health
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-[18px] font-bold leading-none text-white">
                  Good <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                </p>
                <p className="mt-1.5 text-[11px] font-medium leading-none text-white/65">Wheat • Tillering</p>
              </div>

              <div data-metric className="rounded-[16px] border border-white/[0.07] bg-white/[0.06] p-3 backdrop-blur-md will-change-transform">
                <p className="flex items-center gap-1 text-[11px] font-medium text-white/60">
                  <TrendingUp className="h-3 w-3 text-[#9BEA3C]" /> Mandi Price
                </p>
                <p className="mt-2 text-[18px] font-bold leading-none tracking-[-0.02em] text-white">₹2,340</p>
                <p className="mt-1.5 text-[11px] font-medium leading-none text-white/65">per quintal</p>
              </div>
            </div>

            <div data-soil className="mt-3 flex items-center justify-between rounded-[16px] border border-white/[0.07] bg-[rgba(0,0,0,0.28)] px-3.5 py-3.5 backdrop-blur-md will-change-transform sm:px-4">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium tracking-[0.04em] text-white/55">Soil Moisture • NPK</p>
                <p className="mt-1 text-[13.5px] font-semibold text-white sm:text-[14px]">62% • N Low • P Medium</p>
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{ width: "62%", background: "linear-gradient(90deg, #9BEA3C 0%, #35A853 100%)" }}
                  />
                </div>
              </div>
              <a
                href="#features"
                className="ml-4 inline-flex h-8 shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.08] px-3.5 text-xs font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white/[0.14] hover:scale-[1.02]"
              >
                AI Insight <ArrowRight className="h-3 w-3" />
              </a>
            </div>

            <div className="flex items-center justify-between px-1 pt-3 text-[11px] font-medium text-white/55">
              <span>Updated 2 min ago</span>
            </div>

            <div className="absolute -bottom-4 -right-2 flex items-center gap-2.5 rounded-full border border-white/10 bg-[rgba(10,32,18,0.85)] px-3.5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl will-change-transform sm:-right-3 sm:px-4 sm:py-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-blue-500 text-[14px] shadow-sm">💧</span>
              <span className="whitespace-nowrap text-[13px] font-semibold text-white">Irrigation due in 2 days</span>
            </div>
          </div>

          <div className="h-6 sm:h-4" />
        </div>
      </div>
    </section>
  );
}
