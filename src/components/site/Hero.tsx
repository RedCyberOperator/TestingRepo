import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";
import { DepthParallax } from "./DepthParallax";

import newbg from "@/assets/newbg.png";
import depthMap from "@/assets/newbg_depthmap.png";
import cloud from "@/assets/cloud_white.png";

/**
 * Cloud puffs drifting endlessly left -> right across the base of the mountains.
 * Each cloud starts fully off-screen left and ends fully off-screen right, so the
 * infinite loop reset is never visible. `start` spreads the loop progress so the
 * sky always has coverage without all clouds clumping together.
 */
const CLOUD_LAYERS = [
  { bottom: "-8%", widthVw: 60, opacity: 0.95, duration: 64, scale: 1.4, start: 0.0 },
  { bottom: "-3%", widthVw: 48, opacity: 0.85, duration: 78, scale: 1.2, start: 0.45 },
  { bottom: "1%", widthVw: 52, opacity: 0.78, duration: 70, scale: 1.3, start: 0.18 },
  { bottom: "5%", widthVw: 40, opacity: 0.6, duration: 92, scale: 1.0, start: 0.7 },
  { bottom: "9%", widthVw: 36, opacity: 0.5, duration: 104, scale: 0.9, start: 0.3 },
  { bottom: "-5%", widthVw: 44, opacity: 0.7, duration: 86, scale: 1.1, start: 0.6 },
  { bottom: "3%", widthVw: 34, opacity: 0.55, duration: 110, scale: 0.85, start: 0.88 },
] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cloudRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = ensureGsap();

    const ctx = gsap.context(() => {
      if (copyRef.current) {
        const lines = copyRef.current.querySelectorAll("[data-hero-line]");
        gsap.set(lines, { opacity: 0, y: 24 });
        gsap.to(lines, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.1,
        });
      }

      gsap.to(copyRef.current, {
        yPercent: -16,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "70% top", scrub: 0.6 },
      });

      cloudRefs.current.forEach((node, i) => {
        if (!node) return;
        const layer = CLOUD_LAYERS[i];
        const tween = gsap.fromTo(
          node,
          { x: `-${layer.widthVw + 12}vw` },
          {
            x: "112vw",
            duration: layer.duration,
            ease: "none",
            repeat: -1,
          },
        );
        tween.progress(layer.start);
      });
    }, section);

    const onPageShow = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("pageshow", onPageShow);
    ScrollTrigger.refresh();
    return () => {
      window.removeEventListener("pageshow", onPageShow);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Einleitung"
      className="relative flex min-h-[640px] h-[100svh] w-full overflow-hidden bg-sky-gradient"
    >
      <DepthParallax image={newbg} depth={depthMap} amount={0.022} className="absolute inset-0 z-[1]" />

      {CLOUD_LAYERS.map((layer, i) => (
        <div
          key={i}
          ref={(n) => {
            cloudRefs.current[i] = n;
          }}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 z-[4] will-change-transform"
          style={{ bottom: layer.bottom, width: `${layer.widthVw}vw` }}
        >
          <img
            src={cloud}
            alt=""
            width={1096}
            height={418}
            className="w-full select-none"
            style={{ opacity: layer.opacity, transform: `scale(${layer.scale})` }}
          />
        </div>
      ))}

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[6] h-72 bg-fade-gradient" />

      <div
        ref={copyRef}
        className="relative z-[7] mx-auto flex w-full max-w-[1500px] flex-col px-6 pb-10 pt-28 will-change-transform sm:px-10 md:pt-32"
      >
        <p
          data-hero-line
          className="eyebrow mb-6 text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]"
        >
          Webdesign-Studio
        </p>
        <h1
          data-hero-line
          className="max-w-[14ch] font-sans font-bold leading-[0.92] tracking-[-0.03em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] text-[clamp(3rem,11vw,9.5rem)]"
        >
          We Create
          <br />
          Experiences
        </h1>

        <div className="mt-auto flex flex-col gap-10 pt-16 sm:flex-row sm:items-end sm:justify-end">
          <div data-hero-line className="max-w-sm sm:text-right">
            <p className="text-pretty text-base text-slate-950 sm:text-lg">
              Minimalistische, schnelle Markenauftritte — klar im Design, fundiert in der
              Technik. Strategie, Gestaltung und Entwicklung aus einer Hand.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:justify-end">
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Projekt anfragen
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
