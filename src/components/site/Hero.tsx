import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ensureGsap, prefersReducedMotion, isMobileViewport } from "@/lib/gsap";

import wallpaper from "@/assets/hero_wallpaper.png.asset.json";
import depthMap from "@/assets/hero_depthmap.png.asset.json";
import mask from "@/assets/hero_mask.png.asset.json";
import cloud from "@/assets/cloud_white.webp.asset.json";

/** Cloud layers — drifting mist that sits between the distant scene and the foreground ridge. */
const CLOUD_LAYERS = [
  { bottom: "2%", scale: 1.5, opacity: 0.7, duration: 64, drift: -1 },
  { bottom: "10%", scale: 1.25, opacity: 0.5, duration: 52, drift: 1 },
  { bottom: "20%", scale: 1.05, opacity: 0.32, duration: 46, drift: -1 },
] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const ridgeRef = useRef<HTMLDivElement>(null);
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

      // ---- Scroll parallax: distant scene drifts slowly, foreground ridge faster ----
      const scrub = {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: mobile ? true : 0.6,
      } as const;

      gsap.to(sceneRef.current, { yPercent: 8, scale: 1.06, ease: "none", scrollTrigger: scrub });
      gsap.to(ridgeRef.current, { yPercent: 22, ease: "none", scrollTrigger: scrub });
      gsap.to(fogRef.current, { yPercent: 30, opacity: 0, ease: "none", scrollTrigger: scrub });
      gsap.to(copyRef.current, {
        yPercent: -16,
        opacity: 0,
        ease: "none",
        scrollTrigger: { ...scrub, end: "70% top" },
      });

      // ---- Cloud drift (continuous) ----
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

      // ---- Pointer parallax (desktop only) — depth-map driven displacement feel ----
      if (!mobile) {
        const onMove = (e: PointerEvent) => {
          const rx = (e.clientX / window.innerWidth - 0.5) * 2;
          const ry = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(sceneRef.current, { x: rx * -10, y: ry * -6, duration: 1.2, ease: "power2.out" });
          gsap.to(ridgeRef.current, { x: rx * -26, y: ry * -12, duration: 1.2, ease: "power2.out" });
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
      {/* Distant scene — the full wallpaper, slightly oversized for parallax headroom */}
      <div ref={sceneRef} aria-hidden="true" className="absolute inset-0 z-[2] will-change-transform">
        <img
          src={wallpaper.url}
          alt="Schroffe Berggipfel im Morgennebel"
          className="h-full w-full select-none object-cover"
          fetchPriority="high"
        />
      </div>

      {/* Depth-map texture — subtle grain that deepens the scene */}
      <div
        ref={fogRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] mix-blend-soft-light"
        style={{
          backgroundImage: `url(${depthMap.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.18,
        }}
      />

      {/* Cloud layers — drifting mist between scene and ridge */}
      {CLOUD_LAYERS.map((layer, i) => (
        <div
          key={i}
          ref={(n) => {
            cloudRefs.current[i] = n;
          }}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 z-[4] w-[160%] -translate-x-1/2 will-change-transform"
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

      {/* Foreground ridge — the same wallpaper masked to the mountains, parallaxing in front */}
      <div ref={ridgeRef} aria-hidden="true" className="absolute inset-0 z-[5] will-change-transform">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url(${wallpaper.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitMaskImage: `url(${mask.url})`,
            maskImage: `url(${mask.url})`,
            WebkitMaskSize: "cover",
            maskSize: "cover",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Soft fade into the next section */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[6] h-32 bg-fade-gradient" />

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
