import { useRef } from "react";
import { useGsapScope } from "@/hooks/use-gsap";
import storyBg from "@/assets/feature-crops.jpg";

const beats = [
  {
    eyebrow: "THE REALITY",
    title: "The information a farmer needs is scattered everywhere.",
    body: "Weather in one app. Mandi rates over a phone call. Soil results on a paper slip. Disease advice from a neighbour. Schemes at a government office.",
  },
  {
    eyebrow: "THE COST",
    title: "And every scattered answer costs a season.",
    body: "A spray done two days late. A harvest sold a week too early. Guesswork is expensive when the field only gives you one chance a year.",
  },
  {
    eyebrow: "THE SHIFT",
    title: "Kisan Care brings it into one place.",
    body: "Weather, crops, soil, mandi, schemes and guidance — together, in plain language, on the phone already in your pocket.",
  },
];

export function StorySection() {
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scope = useGsapScope<HTMLElement>(({ root, gsap, reduced, q }) => {
    const items = q("[data-beat]");
    const bg = q("[data-story-bg]")[0];
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    if (reduced || !isDesktop) {
      gsap.set(items, { opacity: 1, y: 0, position: "relative" });
      return;
    }

    gsap.set(items, { opacity: 0, y: 40 });
    if (items[0]) gsap.set(items[0], { opacity: 1, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        pin: true,
        start: "top top",
        end: "+=2600",
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    items.forEach((item, i) => {
      const prev = items[i - 1];
      if (i === 0 || !prev) return;
      tl.to(prev, { opacity: 0, y: -40, duration: 0.6, ease: "power2.inOut" }, i - 0.3);
      tl.fromTo(
        item,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        i - 0.05,
      );
    });
    tl.to({}, { duration: 0.6 });

    void bg;
  });

  return (
    <section
      ref={scope}
      aria-label="Why Kisan Care exists"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-forest py-24"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <img
          data-story-bg
          src={storyBg}
          alt=""
          loading="lazy"
          className="kenburns h-full w-full scale-105 object-cover opacity-45"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, oklch(0.2 0.04 155 / 0.94) 0%, oklch(0.2 0.04 155 / 0.82) 55%, oklch(0.2 0.04 155 / 0.6) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative md:min-h-[22rem]">
          {beats.map((beat, i) => (
            <div
              key={beat.eyebrow}
              data-beat
              ref={(el) => {
                beatRefs.current[i] = el;
              }}
              className="mb-16 max-w-3xl last:mb-0 md:absolute md:inset-x-0 md:top-0 md:mb-0"
              style={{ willChange: "transform, opacity" }}
            >
              <p className="text-xs font-semibold tracking-[0.28em] text-gold sm:text-sm">
                {beat.eyebrow}
              </p>
              <h2 className="mt-5 font-display text-3xl leading-[1.12] font-extrabold text-forest-foreground sm:text-5xl lg:text-6xl">
                {beat.title}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-forest-foreground/80 sm:text-xl">
                {beat.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
