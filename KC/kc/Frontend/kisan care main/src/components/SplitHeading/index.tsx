import { useEffect, useRef, type ElementType } from "react";
import { gsap, initGsap, prefersReducedMotion, revealTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  /** Each entry becomes its own animated line. */
  lines: Array<React.ReactNode>;
  className?: string;
  as?: ElementType;
  /** Animate on mount instead of on scroll (used in the hero). */
  immediate?: boolean;
  delay?: number;
};

/**
 * Line-by-line headline reveal (y rise + fade, 0.08s stagger).
 * Falls back to a plain fade under prefers-reduced-motion.
 */
export function SplitHeading({
  lines,
  className,
  as: Tag = "h2",
  immediate = false,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    initGsap();
    const targets = Array.from(el.querySelectorAll<HTMLElement>(".split-line > span"));
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
          delay,
          ...(immediate ? {} : { scrollTrigger: { trigger: el, ...revealTrigger } }),
        },
      );
    }, el);

    return () => ctx.revert();
  }, [immediate, delay]);

  return (
    <Tag ref={ref} className={cn(className)}>
      {lines.map((line, i) => (
        <span className="split-line" key={i}>
          <span style={{ opacity: 0 }}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
