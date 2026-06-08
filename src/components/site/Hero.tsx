import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ensureGsap, prefersReducedMotion, isMobileViewport } from "@/lib/gsap";

import frontPeak from "@/assets/peaks_front.png.asset.json";
import midPeak from "@/assets/peaks_middle.png.asset.json";
import backPeak from "@/assets/peaks_back.png.asset.json";
import cloud1 from "@/assets/cloud_1.png.asset.json";
import cloud2 from "@/assets/cloud_2.png.asset.json";

/** Cloud layers — speeds derived from the brief (relative to viewport width). */
const CLOUD_LAYERS = [
  { src: cloud1.url, top: "8%", scale: 1.15, opacity: 0.5, duration: 38, drift: -1, depth: 0.2 },
  { src: cloud2.url, top: "20%", scale: 0.9, opacity: 0.38, duration: 46, drift: 1, depth: 0.12 },
  { src: cloud1.url, top: "32%", scale: 1.4, opacity: 0.3, duration: 52, drift: -1, depth: 0.08 },
  { src: cloud2.url, top: "46%", scale: 1.1, opacity: 0.24, duration: 58, drift: 1, depth: 0.05 },
  { src: cloud1.url, top: "60%", scale: 1.6, opacity: 0.18, duration: 64, drift: -1, depth: 0.03 },
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
      // ---- Entrance ----
      if (copyRef.current) {
        const lines = copyRef.current.querySelectorAll("[data-hero-line]");
        gsap.set(lines, { opacity: 0, y: 40 });
        gsap.to(lines, {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.14,
          delay: 0.15,
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
        yPercent: -28,
        opacity: 0,
        ease: "none",
        scrollTrigger: { ...scrub, end: "60% top" },
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
      className="relative flex min-h-[640px] h-[100svh] w-full items-center justify-center overflow-hidden bg-sky-gradient"
    >
      {/* Fog texture (drop-in slot for a WebM loop — see README) */}
      <div
        ref={fogRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light"
        style={{
          backgroundImage: `url(${cloud1.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          opacity: 0.12,
        }}
      />

      {/* Cloud layers */}
      {CLOUD_LAYERS.map((layer, i) => (
        <div
          key={i}
          ref={(n) => {
            cloudRefs.current[i] = n;
          }}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 z-[2] w-[140%] -translate-x-1/2 will-change-transform"
          style={{ top: layer.top }}
        >
          <img
            src={layer.src}
            alt=""
            width={1536}
            height={640}
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

      {/* Copy */}
      <div
        ref={copyRef}
        className="relative z-[7] mx-auto w-full max-w-4xl px-6 pb-24 text-center will-change-transform"
      >
        <p data-hero-line className="eyebrow mb-6 text-accent">
          Webdesign-Studio · Alpenraum
        </p>
        <h1
          data-hero-line
          className="text-balance text-5xl leading-[1.02] text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Websites mit Höhe<br className="hidden sm:block" /> und Ruhe.
        </h1>
        <p
          data-hero-line
          className="mx-auto mt-7 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg"
        >
          Wir gestalten minimalistische, schnelle Markenauftritte — klar im Design,
          fundiert in der Technik. Strategie, Gestaltung und Entwicklung aus einer Hand.
        </p>
        <div data-hero-line className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#kontakt"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Projekt anfragen
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors duration-300 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Arbeiten ansehen
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#leistungen"
        aria-label="Nach unten scrollen"
        className="absolute bottom-6 left-1/2 z-[7] -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
