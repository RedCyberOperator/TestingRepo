import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";
import { DepthParallax } from "./DepthParallax";

import newbg from "@/assets/newbg.png.asset.json";
import depthMap from "@/assets/newbg_depth.png.asset.json";
import cloud from "@/assets/cloud_white.webp.asset.json";

/** Cloud puffs drifting left → right across the base of the mountains for a soft section hand-off. */
const CLOUD_LAYERS = [
  { bottom: "-6%", width: "70%", left: "-25%", opacity: 0.95, duration: 70, scale: 1.4 },
  { bottom: "-2%", width: "55%", left: "20%", opacity: 0.8, duration: 58, scale: 1.2 },
  { bottom: "2%", width: "60%", left: "55%", opacity: 0.7, duration: 64, scale: 1.3 },
  { bottom: "6%", width: "45%", left: "5%", opacity: 0.5, duration: 80, scale: 1.0 },
  { bottom: "10%", width: "40%", left: "60%", opacity: 0.4, duration: 88, scale: 0.9 },
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
      // ---- Entrance: fade-in + translateY, stagger, power2.out ----
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

      // ---- Copy fades out on scroll ----
      gsap.to(copyRef.current, {
        yPercent: -16,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "70% top", scrub: 0.6 },
      });

      // ---- Cloud drift: continuous left → right ----
      cloudRefs.current.forEach((node, i) => {
        if (!node) return;
        const layer = CLOUD_LAYERS[i];
        gsap.fromTo(
          node,
          { xPercent: -120 },
          { xPercent: 120, duration: layer.duration, ease: "none", repeat: -1 },
        );
      });
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Einleitung"
      className="relative flex min-h-[640px] h-[100svh] w-full overflow-hidden bg-sky-gradient"
    >
      {/* Depth-map driven, mouse-parallax mountain scene. */}
      <DepthParallax image={newbg.url} depth={depthMap.url} className="absolute inset-0 z-[1]" />

      {/* Cloud layers — drifting mist sweeping left → right at the base of the mountains */}
      {CLOUD_LAYERS.map((layer, i) => (
        <div
          key={i}
          ref={(n) => {
            cloudRefs.current[i] = n;
          }}
          aria-hidden="true"
          className="pointer-events-none absolute z-[4] will-change-transform"
          style={{ bottom: layer.bottom, left: layer.left, width: layer.width }}
        >
          <img
            src={cloud.url}
            alt=""
            width={1096}
            height={418}
            className="w-full select-none"
            style={{ opacity: layer.opacity, transform: `scale(${layer.scale})` }}
          />
        </div>
      ))}

      {/* Soft fade into the next section */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[6] h-40 bg-fade-gradient" />

      {/* Copy — headline top-left, meta bottom row */}
      <div
        ref={copyRef}
        className="relative z-[7] mx-auto flex w-full max-w-[1500px] flex-col px-6 pb-10 pt-28 will-change-transform sm:px-10 md:pt-32"
      >
        <p data-hero-line className="eyebrow mb-6 text-foreground/60">
          Webdesign-Studio · Alpenraum
        </p>
        <h1
          data-hero-line
          className="max-w-[14ch] font-sans font-bold leading-[0.92] tracking-[-0.03em] text-foreground text-[clamp(3rem,11vw,9.5rem)]"
        >
          Höhe und Ruhe
        </h1>

        {/* Bottom row */}
        <div className="mt-auto flex flex-col gap-10 pt-16 sm:flex-row sm:items-end sm:justify-between">
          <p data-hero-line className="eyebrow text-foreground/50">
            Scroll
          </p>

          <div data-hero-line className="max-w-sm sm:text-right">
            <p className="text-pretty text-base text-foreground/70 sm:text-lg">
              Minimalistische, schnelle Markenauftritte — klar im Design, fundiert in der
              Technik. Strategie, Gestaltung und Entwicklung aus einer Hand.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:justify-end">
              <a
                href="#kontakt"
                className="group inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-sm font-semibold text-foreground transition-colors hover:border-foreground"
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
