import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";

/**
 * Business-location map (SimpleMaps Europe). The vendor scripts live in
 * /public/map and render an SVG into #map. We load the data first, then the
 * library, then trigger a manual load (auto_load only fires on initial
 * DOMContentLoaded, which has already passed in this SPA).
 */
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-map="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.dataset.map = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(s);
  });
}

export function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await loadScript("/map/mapdata.js");
        await loadScript("/map/europemap.js");
        if (cancelled) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sm = (window as any).simplemaps_europemap;
        if (sm && typeof sm.load === "function") {
          sm.load();
        }
      } catch (err) {
        console.error("[LocationMap]", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="standort"
      aria-label="Standort"
      className="relative flex min-h-[100svh] scroll-mt-24 flex-col bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pt-24 md:pt-32">
        <Reveal stagger>
          <p className="eyebrow text-accent">Standort</p>
          <h2 className="mt-4 text-balance text-3xl text-foreground sm:text-4xl md:text-5xl">
            Zuhause im Herzen Europas.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Unser Studio sitzt in Dachau bei München — für Kundinnen und Kunden im gesamten
            DACH-Raum und darüber hinaus.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-10 flex flex-1 items-center justify-center px-6 pb-16">
        <div ref={containerRef} className="w-full max-w-5xl">
          <div id="map" className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}
