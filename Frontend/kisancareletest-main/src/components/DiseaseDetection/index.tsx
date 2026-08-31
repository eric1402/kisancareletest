import { useRef } from "react";
import { CheckCircle2, ImageUp, ScanLine } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useGsapScope, revealTrigger } from "@/hooks/use-gsap";
import { diseaseMock } from "@/data/landing";
import leafDisease from "@/assets/leaf-disease.jpg";

const flow = [
  { emoji: "📸", label: "Upload crop image" },
  { emoji: "🔍", label: "AI analysis" },
  { emoji: "🦠", label: "Possible disease" },
  { emoji: "✅", label: "Recommended action" },
];

export function DiseaseDetection() {
  const countRef = useRef<HTMLSpanElement | null>(null);

  const scope = useGsapScope<HTMLDivElement>(({ root, gsap, reduced, q }) => {
    const scan = q("[data-scan-line]");
    const bar = q("[data-confidence-bar]");
    const img = q("[data-parallax]");
    const target = diseaseMock.confidence;

    if (reduced) {
      gsap.set(bar, { width: `${target}%` });
      if (countRef.current) countRef.current.textContent = String(target);
      return;
    }

    if (scan[0]) {
      gsap.fromTo(
        scan[0],
        { yPercent: -4800, opacity: 0 },
        {
          yPercent: 4800,
          opacity: 1,
          duration: 1.8,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          scrollTrigger: { trigger: root, start: "top 90%", toggleActions: "play none none pause" },
        },
      );
    }

    if (img[0]) {
      gsap.fromTo(
        img[0],
        { yPercent: -3 },
        {
          yPercent: 3,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
    }

    const counter = { v: 0 };
    gsap
      .timeline({ scrollTrigger: { trigger: root, ...revealTrigger } })
      .fromTo(bar, { width: "0%" }, { width: `${target}%`, duration: 1.1, ease: "power2.out" }, 0)
      .to(
        counter,
        {
          v: target,
          duration: 1.1,
          ease: "power2.out",
          onUpdate: () => {
            if (countRef.current) countRef.current.textContent = String(Math.round(counter.v));
          },
        },
        0,
      );
  });

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-primary">
              CROP DISEASE DETECTION
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-3xl leading-tight font-extrabold sm:text-5xl">
              Take a photo. Know what's wrong.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              No lab visit, no waiting. Photograph the affected leaf and get a plain-language answer
              with the exact action to take.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <ol className="mx-auto mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-3">
            {flow.map((item, i) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold sm:text-base">
                  <span aria-hidden="true">{item.emoji}</span>
                  {item.label}
                </span>
                {i < flow.length - 1 && (
                  <span aria-hidden="true" className="hidden h-px w-6 bg-border sm:block" />
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <div ref={scope} className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <div className="h-full rounded-3xl border-2 border-dashed border-primary/35 bg-secondary/40 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <ImageUp className="h-6 w-6 text-primary" aria-hidden="true" />
                <p className="text-base font-semibold">Drop a crop photo here</p>
              </div>
              <div className="relative mt-6 overflow-hidden rounded-2xl">
                <img
                  data-parallax
                  src={leafDisease}
                  alt="Close-up of a wheat leaf with yellowing and small brown rust spots"
                  loading="lazy"
                  width={900}
                  height={900}
                  className="h-64 w-full scale-105 object-cover sm:h-80"
                />
                <div
                  data-scan-line
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gold/80 shadow-[0_0_12px_2px_oklch(0.82_0.14_85/0.5)]"
                />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-card/90 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                  <ScanLine className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  Analysing image…
                </span>
              </div>
              <p className="mt-4 truncate text-sm text-muted-foreground">{diseaseMock.fileName}</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold">
                {diseaseMock.severity}
              </span>
              <h3 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">
                {diseaseMock.disease}
              </h3>

              <div className="mt-6">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-muted-foreground">Confidence</span>
                  <span>
                    <span ref={countRef}>0</span>%
                  </span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-secondary" aria-hidden="true">
                  <div data-confidence-bar className="h-3 w-0 rounded-full bg-primary" />
                </div>
              </div>

              <div className="mt-7 rounded-2xl bg-secondary/70 p-5">
                <p className="flex items-center gap-2 font-display text-lg font-bold">
                  <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
                  What to do now
                </p>
                <p className="mt-3 text-base leading-relaxed">{diseaseMock.action}</p>
              </div>

              <p className="mt-5 text-xs text-muted-foreground">
                Demo preview — sample result shown for illustration.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
