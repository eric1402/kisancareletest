import { useRef } from "react";
import { useGsapScope, revealTrigger } from "@/hooks/use-gsap";

type Stat = {
  value: number | null;
  display?: string;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { value: 11, label: "Farming tools in one platform" },
  { value: null, display: "24/7", label: "AI Kisan Assistant availability" },
  { value: 2, label: "Languages supported, expandable" },
  { value: 92, suffix: "%", label: "Sample disease-detection confidence" },
];

export function StatsBand() {
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const scope = useGsapScope<HTMLDivElement>(({ root, gsap, reduced, q }) => {
    const items = q("[data-stat]");

    if (reduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      numberRefs.current.forEach((el, i) => {
        const stat = stats[i];
        if (el && stat?.value != null) el.textContent = `${stat.value}${stat.suffix ?? ""}`;
      });
      return;
    }

    const tl = gsap.timeline({ scrollTrigger: { trigger: root, ...revealTrigger } });
    tl.fromTo(
      items,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.15 },
    );

    numberRefs.current.forEach((el, i) => {
      const stat = stats[i];
      if (!el || !stat || stat.value == null) return;
      const counter = { n: 0 };
      tl.to(
        counter,
        {
          n: stat.value,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(counter.n)}${stat.suffix ?? ""}`;
          },
        },
        i * 0.15,
      );
    });
  });

  return (
    <section aria-label="Kisan Care at a glance" className="border-y border-border bg-card py-20">
      <div ref={scope} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} data-stat className="text-center opacity-0 lg:text-left">
              <p className="font-display text-5xl leading-none font-extrabold text-primary sm:text-6xl">
                {stat.value == null ? (
                  stat.display
                ) : (
                  <span
                    ref={(el) => {
                      numberRefs.current[i] = el;
                    }}
                  >
                    0{stat.suffix ?? ""}
                  </span>
                )}
              </p>
              <p className="mx-auto mt-4 max-w-[15rem] text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase lg:mx-0">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground lg:text-left">
          Figures shown are illustrative placeholders for this preview.
        </p>
      </div>
    </section>
  );
}
