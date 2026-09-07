import { useEffect, useRef, type RefObject } from "react";
import { gsap, initGsap, prefersReducedMotion, revealTrigger } from "@/lib/gsap";

type Builder = (ctx: {
  root: HTMLElement;
  gsap: typeof gsap;
  reduced: boolean;
  q: (selector: string) => HTMLElement[];
}) => void;

/**
 * Runs a GSAP animation builder scoped to a container element.
 * Everything created inside is reverted automatically on unmount,
 * including ScrollTrigger instances.
 */
export function useGsapScope<T extends HTMLElement = HTMLDivElement>(
  builder: Builder,
  deps: unknown[] = [],
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    initGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context((self) => {
      const q = (selector: string) => (self.selector?.(selector) ?? []) as HTMLElement[];
      builder({ root, gsap, reduced, q });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

export { revealTrigger };
