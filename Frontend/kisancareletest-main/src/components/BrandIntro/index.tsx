import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/gsap";

const SESSION_KEY = "kisan-care:intro-played";

type Particle = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  r: number;
  a: number;
  delay: number;
  depth: number;
};

function buildPoints(cx: number, cy: number, radius: number) {
  const pts: Array<{ x: number; y: number }> = [];
  const ringCount = 160;
  for (let i = 0; i < ringCount; i++) {
    const t = i / ringCount;
    const angle = -Math.PI / 2 + 0.52 + t * (Math.PI * 2 - 1.04);
    const jitter = (Math.random() - 0.5) * 2.5;
    pts.push({
      x: cx + Math.cos(angle) * (radius + jitter),
      y: cy + Math.sin(angle) * (radius + jitter),
    });
  }
  const stemCount = 28;
  for (let i = 0; i < stemCount; i++) {
    const t = i / stemCount;
    pts.push({
      x: cx + (Math.random() - 0.5) * 1.8,
      y: cy + radius * 0.44 - t * radius * 0.98,
    });
  }
  for (const dir of [-1, 1]) {
    const leafCount = 44;
    for (let i = 0; i < leafCount; i++) {
      const t = i / leafCount;
      const angle = t * Math.PI;
      const w = Math.sin(angle) * radius * 0.42;
      const along = t * radius * 0.72;
      pts.push({
        x: cx + dir * (w * 0.9) + dir * along * 0.33,
        y: cy + radius * 0.08 - along,
      });
    }
  }
  return pts;
}

export function BrandIntro() {
  const [mounted, setMounted] = useState(true);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") setMounted(false);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    initGsap();
    const reduced = prefersReducedMotion();
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const glow = glowRef.current;
    const word = wordRef.current;
    const canvas = canvasRef.current;
    if (!overlay || !logo || !glow) return;

    const finish = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      setMounted(false);
    };

    if (reduced) {
      const tl = gsap.timeline({ onComplete: finish });
      tl.set(logo, { opacity: 1, scale: 1 })
        .set(word, { opacity: 1 })
        .to(overlay, { opacity: 0, duration: 0.3, ease: "none" });
      return () => {
        tl.kill();
      };
    }

    const ctx2d = canvas?.getContext("2d") ?? null;
    let particles: Particle[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const sizeCanvas = () => {
      if (!canvas || !ctx2d) return;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seedParticles = () => {
      if (!canvas) return;
      const rect = logo.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2 - rect.height * 0.1;
      const radius = Math.min(rect.width, rect.height) * 0.38;
      particles = buildPoints(cx, cy, radius).map((p) => {
        const angle = Math.atan2(p.y - cy, p.x - cx) + (Math.random() - 0.5) * 0.85;
        const dist = 80 + Math.random() * 190;
        return {
          ox: p.x,
          oy: p.y,
          x: p.x,
          y: p.y,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 38,
          r: 0.9 + Math.random() * 1.9,
          a: 0.55 + Math.random() * 0.45,
          delay: Math.random() * 0.22,
          depth: 0.6 + Math.random() * 0.9,
        };
      });
    };

    const dissolve = { p: 0 };

    const draw = () => {
      if (!ctx2d) return;
      ctx2d.clearRect(0, 0, w, h);
      const p = dissolve.p;
      for (const particle of particles) {
        const local = Math.min(Math.max((p - particle.delay) / (1 - particle.delay), 0), 1);
        if (local <= 0) {
          ctx2d.globalAlpha = particle.a;
          ctx2d.fillStyle = "#cfe9b6";
          ctx2d.beginPath();
          ctx2d.arc(particle.ox, particle.oy, particle.r, 0, Math.PI * 2);
          ctx2d.fill();
          continue;
        }
        const eased = 1 - Math.pow(1 - local, 2.2);
        particle.x = particle.ox + particle.dx * eased;
        particle.y = particle.oy + particle.dy * eased;
        const fade = 1 - local;
        const scale = 1 + eased * 0.4 * particle.depth;
        ctx2d.globalAlpha = particle.a * fade * 0.95;
        ctx2d.fillStyle = particle.depth > 1 ? "#e8f5d6" : "#b8dd9a";
        ctx2d.beginPath();
        ctx2d.arc(particle.x, particle.y, particle.r * scale, 0, Math.PI * 2);
        ctx2d.fill();
      }
      ctx2d.globalAlpha = 1;
    };

    sizeCanvas();

    const heroImg = document.querySelector<HTMLElement>("[data-hero-bg]");

    const tl = gsap.timeline({ onComplete: finish });

    gsap.set(logo, { transformPerspective: 900, transformOrigin: "50% 50%" });
    if (word) gsap.set(word, { opacity: 0, y: 10 });

    tl.fromTo(logo, { opacity: 0, scale: 0.82, rotateX: 18, rotateY: -10 }, { opacity: 1, scale: 1, rotateX: 0, rotateY: 0, duration: 0.55, ease: "back.out(1.35)" }, 0);
    if (word) tl.to(word, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.25);
    tl.fromTo(glow, { opacity: 0.15, scale: 0.88 }, { opacity: 0.75, scale: 1.18, duration: 0.32, ease: "sine.inOut" }, 0.42).to(glow, { opacity: 0.22, scale: 1.06, duration: 0.32, ease: "sine.inOut" }, 0.74);
    tl.add(() => {
      seedParticles();
      draw();
    }, 0.86);
    tl.to(logo, { opacity: 0, scale: 1.08, rotateX: -8, duration: 0.36, ease: "power2.in" }, 0.9);
    if (word) tl.to(word, { opacity: 0, y: -8, duration: 0.28, ease: "power2.in" }, 0.9);
    tl.to(glow, { opacity: 0, scale: 1.2, duration: 0.42, ease: "power2.out" }, 0.9);
    tl.to(dissolve, { p: 1, duration: 0.78, ease: "none", onUpdate: draw }, 0.92);
    tl.to(overlay, { opacity: 0, duration: 0.58, ease: "power2.inOut" }, 1.62);
    if (heroImg) {
      tl.fromTo(heroImg, { scale: 1.06 }, { scale: 1, duration: 0.9, ease: "power2.out" }, 1.62);
    }

    const onResize = () => {
      sizeCanvas();
      draw();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tl.kill();
      particles = [];
      if (ctx2d) ctx2d.clearRect(0, 0, w, h);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[999] grid place-items-center"
      style={{ backgroundColor: "#0C1E13", willChange: "opacity" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(68% 58% at 50% 42%, oklch(0.45 0.11 152 / 0.52), transparent 72%), radial-gradient(90% 70% at 80% 100%, oklch(0.38 0.08 145 / 0.22), transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "26px 26px" }} />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />

      <div className="relative flex flex-col items-center gap-7">
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "oklch(0.64 0.14 145 / 0.75)", opacity: 0.16 }}
        />
        <div
          ref={logoRef}
          className="relative flex flex-col items-center gap-5"
          style={{ opacity: 0, willChange: "transform, opacity" }}
        >
          <Logo variant="light" size="xl" />
          <div ref={wordRef} className="flex flex-col items-center gap-2">
            <span className="text-[0.72rem] tracking-[0.36em] text-forest-foreground/70 font-medium">SMART FARMING PLATFORM</span>
            <span className="h-px w-12 bg-gold/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
