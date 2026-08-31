import { useEffect, useRef } from "react";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Soft organic wave divider that settles into place as it scrolls into view.
 * `fill` should be the colour of the section that follows.
 */
export function Divider({
  fill = "var(--color-background)",
  flip = false,
  className,
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    initGsap();
    const path = el.querySelector("path");
    if (!path) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        path,
        { yPercent: 22, scaleY: 1.25, transformOrigin: "50% 100%" },
        {
          yPercent: 0,
          scaleY: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none relative -mt-px w-full leading-[0]", className)}
      style={{ transform: flip ? "rotate(180deg)" : undefined }}
    >
      <svg viewBox="0 0 1440 96" preserveAspectRatio="none" className="block h-12 w-full sm:h-20">
        <path
          d="M0,40 C180,88 360,90 560,60 C760,30 900,4 1120,22 C1268,34 1360,58 1440,52 L1440,96 L0,96 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
