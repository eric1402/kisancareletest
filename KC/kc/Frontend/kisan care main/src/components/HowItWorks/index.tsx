import { Reveal } from "@/components/Reveal";
import { useGsapScope, revealTrigger } from "@/hooks/use-gsap";
import { steps } from "@/data/landing";

export function HowItWorks() {
  const scope = useGsapScope<HTMLDivElement>(({ root, gsap, reduced, q }) => {
    const cards = q("[data-step-card]");
    const line = q("[data-step-line]");
    if (reduced) {
      gsap.set([...cards, ...line], { opacity: 1, y: 0, scaleX: 1 });
      return;
    }
    const tl = gsap.timeline({ scrollTrigger: { trigger: root, ...revealTrigger } });
    tl.fromTo(
      line,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 1.1, ease: "power2.inOut" },
      0,
    ).fromTo(
      cards,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12 },
      0.15,
    );
  });

  return (
    <section id="how-it-works" className="bg-secondary/45 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-primary">HOW IT WORKS</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-3xl leading-tight font-extrabold sm:text-5xl">
              Four simple steps. Nothing complicated.
            </h2>
          </Reveal>
        </div>

        <div ref={scope} className="relative mt-16">
          <div
            data-step-line
            aria-hidden="true"
            className="absolute top-[3.25rem] right-8 left-8 hidden h-px bg-border lg:block"
          />
          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.step} data-step-card className="h-full opacity-0 will-change-transform">
                <div className="group relative flex h-full flex-col rounded-[20px] border border-[#e6ebe0] bg-white p-6 shadow-[0_2px_10px_rgba(16,40,20,0.04)] isolate will-change-transform backface-hidden transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(16,40,20,0.10)] hover:border-[#d2dfc6]">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#f0f5e8] text-[22px] will-change-transform transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    >
                      {step.emoji}
                    </span>
                    <span className="font-display text-sm font-bold tracking-[0.2em] text-[#238B45]">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[18px] font-bold leading-tight text-[#0a2114]">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#5a6b5e]">
                    {step.description}
                  </p>
                  <div className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(380px circle at 50% 0%, rgba(155,234,60,0.06), transparent 60%)" }} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
