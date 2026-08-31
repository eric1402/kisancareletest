import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Desktop-only magnetic hover: the element eases a few px toward the cursor
 * while it is within `radius`, springing back on leave. Transform only.
 */
export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>(strength = 0.28, radius = 90) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      if (Math.hypot(dx, dy) > radius + Math.max(r.width, r.height) / 2) return;
      gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.4, ease: "power3.out" });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.45)" });
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength, radius]);

  return ref;
}
