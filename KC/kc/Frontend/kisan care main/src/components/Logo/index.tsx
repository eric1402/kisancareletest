import kisanMark from "@/assets/kisan-mark.jpg";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  tone?: "default" | "light";
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg" | "xl";
  markOnly?: boolean;
};

const sizes = {
  sm: { badge: "h-9 w-9", text: "text-sm", gap: "gap-2.5", track: "tracking-[0.02em]", tag: "text-[0.55rem]" },
  md: { badge: "h-11 w-11", text: "text-lg", gap: "gap-3", track: "tracking-[0.01em]", tag: "text-[0.6rem]" },
  lg: { badge: "h-14 w-14", text: "text-2xl", gap: "gap-3.5", track: "tracking-[0]", tag: "text-[0.65rem]" },
  xl: { badge: "h-28 w-28", text: "text-4xl sm:text-5xl", gap: "gap-5", track: "tracking-[-0.02em]", tag: "text-xs" },
} as const;

export function LogoMark({ className }: { size?: number; className?: string }) {
  return (
    <img
      src={kisanMark}
      alt="Kisan Care"
      width={512}
      height={512}
      draggable={false}
      className={cn("h-full w-full object-cover object-center select-none", className)}
    />
  );
}

export function Logo({ className, tone, variant, size = "md", markOnly = false }: LogoProps) {
  const light = (variant ?? tone) === "light";
  const s = sizes[size];

  return (
    <span className={cn("group/logo inline-flex items-center", s.gap, className)}>
      <span
        className={cn(
          "relative grid shrink-0 place-items-center overflow-hidden rounded-[22%] shadow-[0_2px_10px_oklch(0.2_0.04_155/0.18),0_0_0_1px_oklch(1_0_0/0.08)] transition-transform duration-300 ease-out group-hover/logo:scale-[1.04] group-hover/logo:shadow-[0_8px_24px_oklch(0.2_0.04_155/0.22)]",
          s.badge,
        )}
      >
        <LogoMark className="rounded-[22%]" />
      </span>

      {!markOnly && (
        <span className="flex min-w-0 flex-col leading-none">
          <span
            className={cn(
              "font-display whitespace-nowrap",
              s.text,
              s.track,
              light ? "text-forest-foreground" : "text-foreground",
            )}
          >
            <span className="font-extrabold">Kisan</span>{" "}
            <span className={cn("font-light", light ? "text-gold" : "text-clay")}>Care</span>
          </span>
          <span
            className={cn(
              "mt-1 font-medium tracking-[0.24em] uppercase",
              s.tag,
              light ? "text-forest-foreground/55" : "text-muted-foreground",
            )}
          >
            Farm Better, Live Better
          </span>
        </span>
      )}
    </span>
  );
}
