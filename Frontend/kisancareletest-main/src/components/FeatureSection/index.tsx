import { ArrowUpRight, Bot, ScanSearch, CalendarDays, Landmark, Store, Users, BookOpen } from "lucide-react";
import { useGsapScope, revealTrigger } from "@/hooks/use-gsap";
import { supportingFeatures } from "@/data/landing";
import featAi from "@/assets/feat-ai-kisan.jpg";
import featDisease from "@/assets/feat-disease.jpg";
import featCalendar from "@/assets/feat-calendar.jpg";
import featGovt from "@/assets/feat-govt.jpg";
import featStore from "@/assets/feat-store.jpg";
import featCommunity from "@/assets/feat-community.jpg";
import featGuide from "@/assets/feat-guide.jpg";

/*
 * 7 PURPOSE-BUILT GENERATED ASSETS FOR FEATURES SECTION
 * Each card has its OWN distinct cinematic image — NO reuse of hero/other cards
 * 1. feat-ai-kisan.jpg      → AI Kisan Assistant : farmer + smartphone in lush field, subtle AI glow, subject right
 * 2. feat-disease.jpg       → Crop Disease Detector : close-up diseased leaf + scanning frame, leaf on right
 * 3. feat-calendar.jpg      → Crop Calendar : golden-hour field + physical planner right side
 * 4. feat-govt.jpg          → Government Schemes : institutional building + agricultural fields, sunrise light
 * 5. feat-store.jpg         → Kisan Store : rural agri supply shop, products/fertilizer, store right
 * 6. feat-community.jpg     → Farmer Community : group of Indian farmers discussing, warm light, group right
 * 7. feat-guide.jpg         → Farming Guide : large open book on wood with seedling, book occupies right 54%
 * All images: premium cinematic Indian agriculture, ultra-realistic, left side dark for white text, no reuse
 */

type CardDef = {
  id: string;
  icon: typeof Bot;
  image: string;
  alt: string;
};

const cardDefs: CardDef[] = [
  { id: "ai", icon: Bot, image: featAi, alt: "Indian farmer in lush crop field holding smartphone, subtle AI assistant glow, farmer on right" },
  { id: "disease", icon: ScanSearch, image: featDisease, alt: "Close-up diseased crop leaf being scanned by smartphone camera with green frame, leaf on right" },
  { id: "calendar", icon: CalendarDays, image: featCalendar, alt: "Golden-hour agricultural field with physical crop calendar planner on right" },
  { id: "schemes", icon: Landmark, image: featGovt, alt: "Indian government institutional building surrounded by agricultural fields at sunrise" },
  { id: "store", icon: Store, image: featStore, alt: "Realistic rural Indian Kisan agricultural supply store with seeds and fertilizer on right" },
  { id: "community", icon: Users, image: featCommunity, alt: "Small group of Indian farmers sitting together discussing in field, warm light, group on right" },
];

const guideDef: CardDef = {
  id: "guide",
  icon: BookOpen,
  image: featGuide,
  alt: "Large open premium farming guide book on wooden surface with crop imagery, seedling beside book, book on right half",
};

function DarkImageCard({ title, description, Icon, image, alt }: { title: string; description: string; Icon: typeof Bot; image: string; alt: string }) {
  const isDisease = alt.toLowerCase().includes("diseased");
  return (
    <article className="group relative flex h-[285px] flex-col overflow-hidden rounded-[22px] border border-white/[0.06] bg-[#0a1f14] shadow-[0_12px_32px_rgba(16,30,18,0.18),0_2px_8px_rgba(0,0,0,0.12)] isolate contain-paint transition-[box-shadow,border-color] duration-300 ease-out hover:shadow-[0_16px_36px_rgba(16,30,18,0.22)] hover:border-white/10">
      <img
        src={image}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[68%_center] transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] will-change-transform [transform:translateZ(0)]"
        style={{ willChange: "transform" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#081a11] via-[#0a2414]/88 via-[44%] to-[#0a2414]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#081a11]/55 via-transparent to-transparent" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100" style={{ background: "radial-gradient(520px circle at 70% 50%, rgba(155,234,60,0.07), transparent 65%)" }} />

      <div className="relative flex h-full flex-col p-[22px] sm:p-[24px]">
        <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[#1d6b2f] text-white shadow-[0_2px_10px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.14)] ring-1 ring-white/10 transition-colors duration-300">
          <Icon className="h-5 w-5" strokeWidth={2.1} />
        </span>
        <h3 className="mt-4 font-display text-[17px] font-bold leading-tight tracking-[-0.01em] text-white sm:text-[18.5px]">{title}</h3>
        <p className="mt-1.5 max-w-[86%] text-[13.5px] leading-[1.5] text-white/72">{description}</p>
        <span className="mt-auto grid h-8 w-8 place-items-center rounded-full border border-[#9BEA3C]/30 bg-[#0a1f14]/40 text-[#9BEA3C] backdrop-blur-sm transition-colors duration-300 group-hover:bg-[#9BEA3C] group-hover:text-[#0a1f14] group-hover:border-[#9BEA3C]">
          <ArrowUpRight className="h-4 w-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
        </span>
      </div>

      {isDisease ? (
        <div className="pointer-events-none absolute right-[16%] top-1/2 h-[56%] w-[40%] -translate-y-1/2">
          <span className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-[#9BEA3C] rounded-tl-[10px] opacity-90 shadow-[0_0_12px_rgba(155,234,60,0.6)]" />
          <span className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-[#9BEA3C] rounded-tr-[10px] opacity-90 shadow-[0_0_12px_rgba(155,234,60,0.6)]" />
          <span className="absolute left-0 bottom-0 h-5 w-5 border-l-2 border-b-2 border-[#9BEA3C] rounded-bl-[10px] opacity-90" />
          <span className="absolute right-0 bottom-0 h-5 w-5 border-r-2 border-b-2 border-[#9BEA3C] rounded-br-[10px] opacity-90" />
          <span className="absolute inset-0 rounded-[12px] border border-[#9BEA3C]/0 group-hover:border-[#9BEA3C]/40 transition-colors duration-500" />
        </div>
      ) : null}
    </article>
  );
}

export function FeatureSection() {
  const scope = useGsapScope<HTMLDivElement>(({ root, gsap, reduced, q }) => {
    const cards = q("[data-feat]");
    if (reduced) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      cards,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: root, ...revealTrigger },
      }
    );
  });

  const six = supportingFeatures.slice(0, 6);
  const guide = supportingFeatures.find((f) => f.id === "guide")!;

  return (
    <section id="features" className="bg-[#F4F0E5] py-8 sm:py-10" style={{ touchAction: "pan-y" }}>
      <div ref={scope} className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {six.map((feature, idx) => {
            const def = cardDefs[idx];
            return (
              <div key={feature.id} data-feat className="opacity-0">
                <DarkImageCard
                  title={feature.title}
                  description={feature.description}
                  Icon={def.icon}
                  image={def.image}
                  alt={def.alt}
                />
              </div>
            );
          })}
        </div>

        <div data-feat className="mt-6 opacity-0">
          <article className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-[22px] border border-white/[0.06] bg-[#0a1f14] shadow-[0_12px_32px_rgba(16,30,18,0.20),0_2px_8px_rgba(0,0,0,0.12)] isolate contain-paint transition-[box-shadow,border-color] duration-300 ease-out hover:shadow-[0_16px_36px_rgba(16,30,18,0.24)] hover:border-white/10 sm:flex-row sm:h-[220px]">
            <div className="absolute inset-0 hidden sm:block overflow-hidden">
              <img
                src={featGuide}
                alt={guideDef.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[28%_center] transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] will-change-transform [transform:translateZ(0)]"
                style={{ willChange: "transform" }}
              />
            </div>
            <img
              src={featGuide}
              alt={guideDef.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center sm:hidden"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#081a11] via-[#081a11]/88 via-[38%] to-transparent to-[62%] sm:via-[42%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent sm:hidden" />

            <div className="absolute right-0 top-0 hidden h-full w-[56%] overflow-hidden rounded-r-[22px] sm:block">
              <img
                src={featGuide}
                alt="Open farming book detail"
                className="h-full w-full object-cover object-[70%_center] scale-[1.02] opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-y-0 left-0 w-[80px] bg-gradient-to-r from-[#081a11] to-transparent" />
            </div>

            <div className="relative flex flex-1 flex-col p-6 sm:w-[44%] sm:p-7">
              <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[#1d6b2f] text-white shadow-[0_2px_10px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.14)] ring-1 ring-white/10">
                <BookOpen className="h-5 w-5" strokeWidth={2.1} />
              </span>
              <h3 className="mt-4 font-display text-[22px] font-bold leading-none tracking-[-0.01em] text-white sm:text-[26px]">{guide.title}</h3>
              <p className="mt-2 max-w-[92%] text-[13.5px] leading-[1.5] text-white/72">{guide.description}</p>
              <span className="mt-4 grid h-8 w-8 place-items-center rounded-full border border-[#9BEA3C]/30 bg-[#0a1f14]/40 text-[#9BEA3C] backdrop-blur-sm transition-all duration-300 group-hover:bg-[#9BEA3C] group-hover:text-[#0a1f14] sm:mt-auto">
                <ArrowUpRight className="h-4 w-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </span>
            </div>
            <div className="relative hidden w-[56%] sm:block" aria-hidden />
          </article>
        </div>
      </div>
    </section>
  );
}
