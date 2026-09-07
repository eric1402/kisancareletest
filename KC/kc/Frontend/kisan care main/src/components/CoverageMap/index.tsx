import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useGsapScope, revealTrigger } from "@/hooks/use-gsap";

const INDIA_PATH =
  "M150 30 L185 20 L200 50 L240 60 L250 45 L300 80 L322 70 L345 95 L330 120 L360 140 L340 162 L300 150 L280 175 L300 210 L280 255 L250 320 L215 400 L200 455 L185 415 L160 340 L130 285 L105 240 L80 205 L70 170 L95 150 L90 120 L120 105 L120 70 Z";

const pins = [
  { id: "ludhiana", name: "Ludhiana", note: "Wheat & paddy belt", x: 135, y: 95 },
  { id: "indore", name: "Indore", note: "Soybean & gram", x: 152, y: 215 },
  { id: "nagpur", name: "Nagpur", note: "Cotton & orange", x: 188, y: 238 },
  { id: "nashik", name: "Nashik", note: "Grapes & onion", x: 120, y: 272 },
  { id: "pune", name: "Pune", note: "Sugarcane & vegetables", x: 118, y: 298 },
];

export function CoverageMap() {
  const [active, setActive] = useState<string | null>(null);

  const scope = useGsapScope<HTMLDivElement>(({ root, gsap, reduced, q }) => {
    const outline = q("[data-map-outline]");
    const dots = q("[data-map-pin]");

    if (reduced) {
      gsap.set([...outline, ...dots], { opacity: 1, scale: 1 });
      return;
    }

    const tl = gsap.timeline({ scrollTrigger: { trigger: root, ...revealTrigger } });
    tl.fromTo(outline, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    tl.fromTo(
      dots,
      { opacity: 0, scale: 0.3, transformOrigin: "center" },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2.4)", stagger: 0.14 },
      0.35,
    );
  });

  return (
    <section aria-label="Sample coverage" className="bg-secondary/45 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="text-sm font-semibold tracking-[0.2em] text-primary">
                SAMPLE COVERAGE
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 font-display text-3xl leading-tight font-extrabold sm:text-5xl">
                Built for Indian fields, region by region
              </h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Kisan Care is designed around the crops, seasons and mandis of real farming
                districts. The regions marked here are illustrative examples of where the platform
                is positioned to help first.
              </p>
            </Reveal>
            <Reveal delay={230}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {pins.map((pin) => (
                  <li
                    key={pin.id}
                    onMouseEnter={() => setActive(pin.id)}
                    onMouseLeave={() => setActive(null)}
                    className="rounded-xl border border-border bg-card px-4 py-3 shadow-soft"
                  >
                    <p className="font-display text-base font-bold">{pin.name}</p>
                    <p className="text-sm text-muted-foreground">{pin.note}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div ref={scope} className="relative mx-auto w-full max-w-md">
            <svg
              viewBox="0 0 400 480"
              role="img"
              aria-label="Stylised outline map of India with sample coverage regions"
              className="w-full"
            >
              <path
                data-map-outline
                d={INDIA_PATH}
                className="opacity-0"
                fill="var(--color-primary)"
                fillOpacity="0.1"
                stroke="var(--color-primary)"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {pins.map((pin) => (
                <g
                  key={pin.id}
                  data-map-pin
                  className="cursor-pointer opacity-0"
                  onMouseEnter={() => setActive(pin.id)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive((a) => (a === pin.id ? null : pin.id))}
                >
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r="14"
                    fill="var(--color-primary)"
                    className="pulse-soft"
                    style={{ transformOrigin: `${pin.x}px ${pin.y}px`, opacity: 0.28 }}
                  />
                  <circle cx={pin.x} cy={pin.y} r="6" fill="var(--color-primary)" />
                  {active === pin.id && (
                    <g>
                      <rect
                        x={pin.x + 12}
                        y={pin.y - 34}
                        width="170"
                        height="46"
                        rx="10"
                        fill="var(--color-card)"
                        stroke="var(--color-border)"
                      />
                      <text
                        x={pin.x + 24}
                        y={pin.y - 15}
                        fontSize="15"
                        fontWeight="700"
                        fill="var(--color-foreground)"
                      >
                        {pin.name}
                      </text>
                      <text
                        x={pin.x + 24}
                        y={pin.y + 2}
                        fontSize="12"
                        fill="var(--color-muted-foreground)"
                      >
                        {pin.note}
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Illustrative sample regions — not a live coverage claim.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
