import type { Feature } from "@/data/landing";

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="group relative flex h-full flex-col rounded-[20px] border border-[#e6ebe0] bg-white p-6 shadow-[0_2px_10px_rgba(16,40,20,0.04)] isolate will-change-transform backface-hidden transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(16,40,20,0.10)] hover:border-[#d2dfc6]">
      <span
        aria-hidden="true"
        className="grid h-12 w-12 place-items-center rounded-xl bg-[#f0f5e8] text-2xl will-change-transform backface-hidden transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      >
        {feature.emoji}
      </span>
      <h3 className="mt-5 font-display text-[19px] font-bold leading-tight tracking-[-0.015em] text-[#0a2114]">{feature.title}</h3>
      <p className="mt-2 text-[15px] leading-[1.6] text-[#5a6b5e]">{feature.description}</p>
      <div className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(400px circle at 50% 0%, rgba(155,234,60,0.07), transparent 60%)" }} />
    </article>
  );
}
