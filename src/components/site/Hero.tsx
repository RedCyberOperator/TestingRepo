import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ensureGsap, prefersReducedMotion, isMobileViewport } from "@/lib/gsap";

import frontPeak from "@/assets/peaks_front.png.asset.json";
import midPeak from "@/assets/peaks_middle.png.asset.json";
import backPeak from "@/assets/peaks_back.png.asset.json";
import cloud from "@/assets/cloud_white.webp.asset.json";

/** Cloud layers — anchored to the foot of the mountains as drifting mist. */
const CLOUD_LAYERS = [
  { bottom: "-2%", scale: 1.6, opacity: 0.85, duration: 64, drift: -1 },
  { bottom: "4%", scale: 1.3, opacity: 0.7, duration: 52, drift: 1 },
  { bottom: "10%", scale: 1.15, opacity: 0.55, duration: 46, drift: -1 },
  { bottom: "16%", scale: 0.95, opacity: 0.4, duration: 58, drift: 1 },
  { bottom: "22%", scale: 1.1, opacity: 0.28, duration: 38, drift: -1 },
] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cloudRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const mobile = isMobileViewport();

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

      // ---- Scroll parallax (depth-map multipliers: front 1.0 / mid 0.6 / back 0.25) ----
      const scrub = {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: mobile ? true : 0.6,
      } as const;

      gsap.to(backRef.current, { yPercent: 6, ease: "none", scrollTrigger: scrub });
      gsap.to(midRef.current, { yPercent: 14, ease: "none", scrollTrigger: scrub });
      gsap.to(frontRef.current, { yPercent: 24, ease: "none", scrollTrigger: scrub });
      gsap.to(fogRef.current, { yPercent: 30, opacity: 0, ease: "none", scrollTrigger: scrub });
      gsap.to(copyRef.current, {
        yPercent: -16,
        opacity: 0,
        ease: "none",
        scrollTrigger: { ...scrub, end: "70% top" },
      });

      // ---- Cloud drift (continuous, GSAP timelines) ----
      cloudRefs.current.forEach((node, i) => {
        if (!node) return;
        const layer = CLOUD_LAYERS[i];
        gsap.fromTo(
          node,
          { xPercent: layer.drift < 0 ? 18 : -18 },
          {
            xPercent: layer.drift < 0 ? -18 : 18,
            duration: layer.duration,
            ease: "none",
            repeat: -1,
            yoyo: true,
          },
        );
        gsap.to(node, {
          yPercent: 4,
          duration: layer.duration / 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      // ---- Pointer parallax (desktop only) ----
      if (!mobile) {
        const onMove = (e: PointerEvent) => {
          const rx = (e.clientX / window.innerWidth - 0.5) * 2;
          const ry = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(backRef.current, { x: rx * -8, y: ry * -4, duration: 1.2, ease: "power2.out" });
          gsap.to(midRef.current, { x: rx * -16, y: ry * -8, duration: 1.2, ease: "power2.out" });
          gsap.to(frontRef.current, { x: rx * -28, y: ry * -12, duration: 1.2, ease: "power2.out" });
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      }
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
      {/* Fog texture */}
      <div
        ref={fogRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light"
        style={{
          backgroundImage: `url(${cloud.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          opacity: 0.1,
        }}
      />

      {/* Cloud layers — drifting mist at the foot of the mountains */}
      {CLOUD_LAYERS.map((layer, i) => (
        <div
          key={i}
          ref={(n) => {
            cloudRefs.current[i] = n;
          }}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 z-[6] w-[160%] -translate-x-1/2 will-change-transform"
          style={{ bottom: layer.bottom }}
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

      {/* Mountain layers (bottom-anchored) */}
      <div ref={backRef} aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[3] will-change-transform">
        <img src={backPeak.url} alt="" width={1920} height={769} className="w-full select-none" />
      </div>
      <div ref={midRef} aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[4] will-change-transform">
        <img src={midPeak.url} alt="" width={1920} height={769} className="w-full select-none" />
      </div>
      <div ref={frontRef} aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[5] will-change-transform">
        <img
          src={frontPeak.url}
          alt="Schroffe Berggipfel im Morgennebel"
          width={1920}
          height={769}
          fetchPriority="high"
          className="w-full select-none"
        />
      </div>

      {/* Soft fade into the next section */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[6] h-32 bg-fade-gradient" />

      {/* Copy — positioned like the reference: headline top-left, meta bottom row */}
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
