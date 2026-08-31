import { Sprout } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { aiMock } from "@/data/landing";

export function AISection() {
  return (
    <section className="relative overflow-hidden bg-forest py-14 text-forest-foreground sm:py-20" style={{ contain: "paint" }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(70% 55% at 15% 10%, oklch(0.42 0.09 152 / 0.35), transparent 65%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
        <div>
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold">AI KISAN ASSISTANT</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 font-display text-[26px] leading-tight font-extrabold sm:text-[36px]">
              An assistant that already knows your farm
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-[15px] leading-relaxed text-forest-foreground/85">
              Ask in Hindi, English or the way you actually speak. The assistant reads your soil report, crop stage and local weather before it answers — so the advice fits your field, not a generic internet article.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <ul className="mt-6 space-y-2.5 text-[14px] text-forest-foreground/85">
              {["Answers in plain, everyday language", "Uses your soil, crop and weather data as context", "Always ends with one clear next step"].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Sprout className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="rounded-[20px] border border-forest-foreground/10 bg-forest-muted/30 p-3 shadow-lift sm:p-4">
            <div className="rounded-2xl bg-card p-4 text-card-foreground sm:p-5">
              <div className="flex items-start gap-2.5">
                <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-sm">
                  🧑‍🌾
                </span>
                <p className="rounded-2xl rounded-tl-sm bg-secondary px-3.5 py-2.5 text-[14px] leading-relaxed font-medium">{aiMock.question}</p>
              </div>

              <div className="mt-4 flex items-center gap-2.5">
                <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/12 text-sm">
                  🌿
                </span>
                <p className="text-xs font-semibold text-muted-foreground">Reading your farm data…</p>
              </div>

              <ul className="mt-3 flex flex-wrap gap-1.5">
                {aiMock.contextChips.map((chip) => (
                  <li
                    key={chip.label}
                    className={chip.tone === "warn" ? "rounded-full bg-gold/25 px-2.5 py-1 text-[11px] font-semibold text-gold-foreground" : "rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground"}
                  >
                    {chip.label}
                  </li>
                ))}
              </ul>

              <div className="mt-4 rounded-xl border border-border p-4">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground">Possible causes</p>
                <ul className="mt-2.5 space-y-2">
                  {aiMock.causes.map((cause) => (
                    <li key={cause} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 rounded-xl bg-primary p-4 text-primary-foreground">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display text-[15px] font-bold">{aiMock.recommendation.title}</p>
                  <span className="rounded-full bg-primary-foreground/15 px-2.5 py-1 text-[11px] font-semibold">{aiMock.recommendation.tag}</span>
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed">{aiMock.recommendation.body}</p>
              </div>
            </div>
            <p className="px-2 pt-3 text-[11px] text-forest-foreground/60">Demo preview — sample conversation shown for illustration.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
