import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useGsapScope, revealTrigger } from "@/hooks/use-gsap";
import { benefits } from "@/data/landing";

export function CTA() {
  const benefitScope = useGsapScope<HTMLDivElement>(({ root, gsap, reduced, q }) => {
    const cards = q("[data-benefit-card]");
    if (reduced) {
      gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
      return;
    }
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, ...revealTrigger },
      },
    );
  });

  return (
    <>
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight font-extrabold sm:text-5xl">
                Built for every farmer, from every field
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Half an acre or fifty. First smartphone or tenth. Kisan Care is designed so anyone
                can open it and immediately know what to do next.
              </p>
            </Reveal>
          </div>

          <div ref={benefitScope} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                data-benefit-card
                className="h-full opacity-0 will-change-transform"
              >
                <div className="group relative flex h-full flex-col rounded-[20px] border border-[#e6ebe0] bg-white p-6 shadow-[0_2px_10px_rgba(16,40,20,0.04)] isolate will-change-transform backface-hidden transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(16,40,20,0.10)] hover:border-[#d2dfc6]">
                  <span
                    aria-hidden="true"
                    className="inline-grid h-11 w-11 place-items-center rounded-xl bg-[#f0f5e8] text-[26px] will-change-transform backface-hidden transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  >
                    {benefit.emoji}
                  </span>
                  <h3 className="mt-4 font-display text-[17px] font-bold leading-tight text-[#0a2114]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-[#5a6b5e]">
                    {benefit.description}
                  </p>
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(380px circle at 50% 0%, rgba(155,234,60,0.06), transparent 60%)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="cta"
        className="relative overflow-hidden bg-[#032A1B] flex items-center justify-center"
        style={{ minHeight: "460px" }}
      >
        <div aria-hidden className="absolute inset-0 bg-[#032A1B]" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0px, transparent 48px, rgba(139,195,74,0.06) 48px, rgba(139,195,74,0.06) 49px)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 85% at 92% 50%, rgba(229,184,92,0.22) 0%, rgba(200,150,40,0.12) 22%, transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(3,42,27,0) 55%, rgba(3,42,27,0.9) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute bottom-0 inset-x-0 h-[42%] opacity-40"
          style={{
            background:
              "linear-gradient(to top, rgba(5,47,30,0.9), transparent), repeating-linear-gradient(90deg, transparent 0, transparent 36px, rgba(255,255,255,0.03) 36px, rgba(255,255,255,0.03) 37px)",
          }}
        />

        <svg
          aria-hidden
          className="pointer-events-none absolute -top-2 -left-8 w-[280px] h-[220px] sm:w-[340px] sm:h-[260px] text-[#1b4a2a] opacity-[0.55]"
          viewBox="0 0 340 260"
          fill="none"
        >
          <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <path d="M10 80 Q80 60 140 90 Q180 105 210 85" />
            <ellipse cx="70" cy="70" rx="22" ry="12" fill="currentColor" opacity="0.85" />
            <ellipse cx="105" cy="85" rx="18" ry="10" fill="currentColor" opacity="0.8" />
            <ellipse cx="145" cy="62" rx="20" ry="11" fill="currentColor" opacity="0.9" />
            <ellipse cx="175" cy="95" rx="16" ry="9" fill="currentColor" opacity="0.75" />
            <ellipse cx="45" cy="110" rx="14" ry="8" fill="currentColor" opacity="0.7" />
            <ellipse cx="85" cy="125" rx="20" ry="11" fill="currentColor" opacity="0.82" />
            <ellipse cx="125" cy="115" rx="17" ry="9" fill="currentColor" opacity="0.78" />
            <ellipse cx="35" cy="55" rx="12" ry="7" fill="currentColor" opacity="0.6" />
            <ellipse cx="190" cy="70" rx="13" ry="7" fill="currentColor" opacity="0.65" />
          </g>
        </svg>

        <svg
          aria-hidden
          className="pointer-events-none absolute -bottom-2 -right-6 w-[300px] h-[240px] sm:w-[360px] sm:h-[280px] text-[#1e4f2b] opacity-[0.55]"
          viewBox="0 0 360 280"
          fill="none"
        >
          <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <path d="M340 200 Q280 220 220 190 Q180 175 160 200" />
            <ellipse cx="300" cy="190" rx="24" ry="13" fill="currentColor" opacity="0.9" />
            <ellipse cx="265" cy="205" rx="19" ry="11" fill="currentColor" opacity="0.85" />
            <ellipse cx="230" cy="180" rx="21" ry="12" fill="currentColor" opacity="0.88" />
            <ellipse cx="200" cy="210" rx="17" ry="10" fill="currentColor" opacity="0.78" />
            <ellipse cx="320" cy="155" rx="15" ry="9" fill="currentColor" opacity="0.7" />
            <ellipse cx="285" cy="150" rx="18" ry="10" fill="currentColor" opacity="0.75" />
            <ellipse cx="250" cy="145" rx="14" ry="8" fill="currentColor" opacity="0.68" />
          </g>
        </svg>

        <span
          aria-hidden
          className="absolute left-[4%] bottom-[18%] h-1 w-1 rounded-full bg-[#9BEA3C]/50 blur-[0.5px] opacity-60"
        />
        <span
          aria-hidden
          className="absolute left-[8%] bottom-[28%] h-[3px] w-[3px] rounded-full bg-[#E5B85C]/40 blur-[0.3px]"
        />
        <span
          aria-hidden
          className="absolute left-[18%] bottom-[12%] h-1.5 w-1.5 rounded-full bg-[#9BEA3C]/30"
        />
        <span
          aria-hidden
          className="absolute right-[22%] bottom-[22%] h-1 w-1 rounded-full bg-white/20"
        />
        <span
          aria-hidden
          className="absolute left-[28%] top-[42%] h-[2px] w-[2px] rounded-full bg-[#9BEA3C]/30"
        />
        <span
          aria-hidden
          className="absolute right-[8%] top-[32%] h-[2px] w-[2px] rounded-full bg-white/15"
        />

        <div className="relative z-10 mx-auto max-w-[760px] px-4 py-14 text-center sm:px-6 sm:py-20">
          <Reveal>
            <h2 className="font-display text-[34px] leading-[1.05] font-extrabold tracking-[-0.02em] text-[#F4F5ED] sm:text-[54px]">
              Start farming with
              <br />
              <span className="bg-gradient-to-r from-[#9BEA3C] via-[#a8d94a] to-[#7bc22e] bg-clip-text text-transparent">
                better information
              </span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-5 max-w-[650px] text-[16px] leading-[1.6] text-[#D6E2D0]/80 sm:text-[18px]">
              Create your farm profile and see everything about your land in one place — free to
              begin.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <Link
              to="/register"
              className="mt-8 inline-flex h-[56px] w-[190px] items-center justify-center gap-2 rounded-full bg-[#E5B85C] text-[16px] font-semibold text-[#1a2a0a] shadow-[0_8px_24px_rgba(229,184,92,0.32),0_1px_0_rgba(255,255,255,0.2)_inset] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(229,184,92,0.4)] active:translate-y-0 active:scale-[0.99]"
            >
              Get Started <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
