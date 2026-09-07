import { cn } from "@/lib/utils";

type Blob = { className: string; color: string };

/**
 * Decorative gradient-mesh backdrop: large, blurred, low-opacity colour blobs.
 * Transform-animated only (no per-frame filter recalculation).
 */
export function Mesh({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const blobs: Blob[] =
    tone === "dark"
      ? [
          { className: "-top-24 -left-20 h-[26rem] w-[26rem]", color: "oklch(0.62 0.13 146 / 0.28)" },
          { className: "top-1/3 -right-24 h-[30rem] w-[30rem] drift-slow", color: "oklch(0.775 0.105 82 / 0.18)" },
          { className: "-bottom-32 left-1/3 h-[24rem] w-[24rem]", color: "oklch(0.455 0.095 152 / 0.35)" },
        ]
      : [
          { className: "-top-32 -left-24 h-[28rem] w-[28rem]", color: "oklch(0.62 0.13 146 / 0.12)" },
          { className: "top-1/4 -right-28 h-[32rem] w-[32rem] drift-slow", color: "oklch(0.775 0.105 82 / 0.16)" },
          { className: "-bottom-40 left-1/4 h-[26rem] w-[26rem]", color: "oklch(0.66 0.085 52 / 0.1)" },
        ];

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {blobs.map((b, i) => (
        <div key={i} className={cn("mesh-blob", b.className)} style={{ background: b.color }} />
      ))}
    </div>
  );
}
