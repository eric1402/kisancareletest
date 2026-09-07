import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Registers GSAP plugins once, on the client only. */
export function initGsap() {
  if (typeof window === "undefined") return gsap;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return gsap;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Shared ScrollTrigger defaults: fire once, when the element is 85% up the viewport. */
export const revealTrigger = {
  start: "top 85%",
  toggleActions: "play none none none",
  once: true,
} as const;

export { gsap, ScrollTrigger };
