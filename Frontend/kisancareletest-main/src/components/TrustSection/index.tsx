import { Reveal } from "@/components/Reveal";
import { trustChips } from "@/data/landing";
import trustCard from "@/assets/trust-card.jpg";

export function TrustSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#fcfdf8] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f3f7ed] to-white" />
        <div className="absolute left-1/2 top-[22%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#9BEA3C]/[0.06] blur-[80px]" />
        <div className="absolute right-[8%] top-[40%] h-[320px] w-[320px] rounded-full bg-[#D9A441]/[0.06] blur-[60px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.18em] text-[#6b7a6f]">
          <span className="h-px w-8 bg-[#d1d8c9]" /> TRUSTED APPROACH <span className="h-px w-8 bg-[#d1d8c9]" />
        </div>

        <div className="mx-auto max-w-3xl text-center mt-5">
          <Reveal>
            <h2 className="font-display text-[32px] leading-[0.95] font-extrabold tracking-[-0.03em] text-[#0a2114] sm:text-5xl">
              Everything a farmer needs.
              <br />
              <span className="bg-gradient-to-r from-[#238B45] to-[#1a6b32] bg-clip-text text-transparent">In one place.</span>
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-relaxed text-[#5a6b5e]">
              Ten apps, phone calls, paper reports and neighbour advice — replaced by one calm platform that speaks your language.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {trustChips.map((chip, i) => (
            <Reveal key={chip.label} delay={i * 60}>
              <span className="group inline-flex items-center gap-2 rounded-full border border-[#e0e7d6] bg-white px-4 py-2.5 text-sm font-semibold text-[#1a2e1f] shadow-[0_2px_8px_rgba(16,40,20,0.06)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#c8d8b8] hover:shadow-[0_8px_20px_rgba(16,40,20,0.08)] hover:-translate-y-[1px] will-change-transform">
                <span aria-hidden="true" className="text-base leading-none transition-transform duration-300 group-hover:scale-110">{chip.emoji}</span>
                {chip.label}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={180}>
          <div className="relative mx-auto mt-14 max-w-[640px]">
            <div aria-hidden="true" className="mx-auto h-[48px] w-px bg-gradient-to-b from-transparent via-[#238B45]/40 to-[#238B45]/0" />

            <div className="group relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#1a4d2a] via-[#12361e] to-[#0a1f14] p-[1.5px] shadow-[0_20px_60px_rgba(8,32,18,0.25),0_1px_0_rgba(255,255,255,0.06)_inset] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_30px_80px_rgba(8,32,18,0.38)] hover:-translate-y-1 will-change-transform">
              <div className="relative overflow-hidden rounded-[28px] px-8 py-10 text-center sm:px-10 sm:py-11">
                <img
                  src={trustCard}
                  alt="Lush green Indian farmland at golden hour"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#071a11]/58 via-[#0a2e16]/42 to-[#0a1f14]/32" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/22 via-black/8 to-white/[0.03]" />
                <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-[320px] -translate-x-1/2 rounded-full bg-white/[0.06] blur-[24px]" />

                <div className="relative">
                  <span aria-hidden="true" className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-white/12 text-[26px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-white/15 backdrop-blur-md">
                    🌾
                  </span>
                  <p className="mt-3 font-display text-[26px] font-extrabold tracking-[-0.02em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-[27px]">Kisan Care</p>
                  <p className="mx-auto mt-2 max-w-[420px] text-[14.5px] leading-relaxed font-medium text-white/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
                    One platform. Every answer your farm needs, in simple words.
                  </p>
                  <div className="mx-auto mt-6 h-px w-12 bg-white/20" />
                  <p className="mt-3 text-[11px] font-semibold tracking-[0.14em] text-white/60">BUILT FOR BHARAT • SINCE 2024</p>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-6 left-1/2 h-6 w-[70%] -translate-x-1/2 rounded-full bg-[#0a1f14]/15 blur-[18px]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
