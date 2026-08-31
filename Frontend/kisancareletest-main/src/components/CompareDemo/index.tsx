import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";

const scattered = [
  { emoji: "🌦️", label: "Weather app", x: "8%", y: "16%" },
  { emoji: "📞", label: "Mandi phone call", x: "42%", y: "8%" },
  { emoji: "📄", label: "Paper soil report", x: "12%", y: "52%" },
  { emoji: "💬", label: "WhatsApp forward", x: "46%", y: "44%" },
  { emoji: "🏛️", label: "Scheme office visit", x: "6%", y: "78%" },
  { emoji: "🗒️", label: "Diary notes", x: "44%", y: "74%" },
];

const unified = [
  { emoji: "🌦️", label: "Rain in 36h", value: "18 mm" },
  { emoji: "🌱", label: "Wheat · Tillering", value: "Day 42" },
  { emoji: "🧪", label: "Soil moisture", value: "62%" },
  { emoji: "💰", label: "Wheat mandi", value: "₹2,340/q" },
];

export function CompareDemo() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(52);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(94, Math.max(6, next)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      update(e.clientX);
    };
    const stop = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [update]);

  return (
    <section aria-label="Before and after Kisan Care" className="py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-primary">TRY IT — DRAG</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-3xl leading-tight font-extrabold sm:text-4xl">
              Ten scattered sources, or one calm screen
            </h2>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div
            ref={frameRef}
            className="relative mt-12 h-[26rem] w-full overflow-hidden rounded-3xl border border-border bg-secondary/60 shadow-lift select-none sm:h-[24rem]"
            onPointerDown={(e) => {
              dragging.current = true;
              update(e.clientX);
            }}
          >
            {/* Left: scattered */}
            <div className="absolute inset-0 p-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">
                TODAY · EVERYWHERE
              </p>
              <div className="absolute inset-0">
                {scattered.map((chip, i) => (
                  <span
                    key={chip.label}
                    className="drift absolute inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium whitespace-nowrap shadow-soft"
                    style={{ left: chip.x, top: chip.y, animationDelay: `${i * 0.7}s` }}
                  >
                    <span aria-hidden="true">{chip.emoji}</span>
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: unified, clipped */}
            <div
              className="absolute inset-0 bg-forest"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            >
              <div className="flex h-full flex-col justify-center p-6 sm:p-10">
                <div style={{ marginLeft: `${pos}%` }} className="pl-6">
                  <Logo tone="light" size="sm" />
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {unified.map((row) => (
                      <div
                        key={row.label}
                        className="rounded-xl border border-forest-foreground/15 bg-forest-foreground/10 px-4 py-3 backdrop-blur-md"
                      >
                        <p className="text-xs text-forest-foreground/70">
                          <span aria-hidden="true" className="mr-1.5">
                            {row.emoji}
                          </span>
                          {row.label}
                        </p>
                        <p className="mt-1 font-display text-lg font-bold text-forest-foreground">
                          {row.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Handle */}
            <div
              className="absolute inset-y-0 z-10 w-px bg-gold"
              style={{ left: `${pos}%` }}
              aria-hidden="true"
            />
            <button
              type="button"
              role="slider"
              aria-label="Drag to compare scattered sources with Kisan Care"
              aria-valuemin={6}
              aria-valuemax={94}
              aria-valuenow={Math.round(pos)}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") setPos((p) => Math.max(6, p - 4));
                if (e.key === "ArrowRight") setPos((p) => Math.min(94, p + 4));
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                dragging.current = true;
              }}
              className="absolute top-1/2 z-20 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-gold text-gold-foreground shadow-lift transition-transform duration-200 hover:scale-110 active:scale-95"
              style={{ left: `${pos}%` }}
            >
              <MoveHorizontal className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
