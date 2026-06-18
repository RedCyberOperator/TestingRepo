import { useEffect, useRef } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

type Stat = { label: string; value: string };
type Slide = {
  src: string;
  index: string;
  title: string;
  text: string;
  stats: Stat[];
};

/** Stock photos (Unsplash) — replace with real project imagery later. */
const SLIDES: Slide[] = [
  {
    src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2000&q=80",
    index: "01",
    title: "Strategie",
    text: "Wir schärfen Positionierung, Botschaft und Struktur, bevor eine einzige Pixelentscheidung fällt — Klarheit, die Vertrauen schafft.",
    stats: [
      { label: "Fokus", value: "Marke & Inhalt" },
      { label: "Dauer", value: "1–2 Wochen" },
      { label: "Ergebnis", value: "Roadmap" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80",
    index: "02",
    title: "Design",
    text: "Typografisch starke, ruhige Oberflächen mit viel Weißraum. Jede Komposition dient der Botschaft — nichts lenkt ab.",
    stats: [
      { label: "Stil", value: "Minimal & Luxe" },
      { label: "System", value: "Design-Tokens" },
      { label: "Ergebnis", value: "UI-Kit" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80",
    index: "03",
    title: "Entwicklung",
    text: "Performante, zugängliche Websites mit flüssigen Animationen. Sauberer Code, schnelle Ladezeiten, langfristige Pflege.",
    stats: [
      { label: "Tech", value: "React · GSAP" },
      { label: "Lighthouse", value: "95+" },
      { label: "Ergebnis", value: "Live-Site" },
    ],
  },
];

export function ScrollGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const slides = Array.from(stage.querySelectorAll<HTMLElement>("[data-slide]"));

    const ctx = gsap.context(() => {
      // Stack slides: first fully visible, the rest waiting below the viewport.
      slides.forEach((slide, i) => {
        gsap.set(slide, { yPercent: i === 0 ? 0 : 100, zIndex: i });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${slides.length * 100}%`,
          scrub: 1,
          pin: stage,
          anticipatePin: 1,
        },
      });

      // Each next image slides up from below, partially revealing as it covers the previous.
      for (let i = 1; i < slides.length; i++) {
        tl.to(slides[i], { yPercent: 0, duration: 1 }, i);
      }
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Leistungen im Detail"
      className="relative"
      style={{ height: `${(SLIDES.length + 1) * 100}vh` }}
    >
      <div ref={stageRef} className="relative h-[100svh] w-full overflow-hidden bg-primary">
        {SLIDES.map((slide, i) => (
          <article key={i} data-slide className="absolute inset-0">
            <img
              src={slide.src}
              alt={slide.title}
              loading="lazy"
              className="h-full w-full object-cover will-change-transform"
            />
            <div className="absolute inset-0 bg-primary/40" aria-hidden="true" />

            {/* Overlay layout — matches reference: index + nav top-left, giant title centered,
                description + link bottom-left, stats column right. */}
            <div className="absolute inset-0 mx-auto flex w-full max-w-[1500px] flex-col px-6 py-10 text-primary-foreground sm:px-10 sm:py-14">
              {/* Top-left: section list */}
              <nav aria-hidden="true" className="hidden flex-col gap-1 text-sm sm:flex">
                {SLIDES.map((s, j) => (
                  <span
                    key={j}
                    className={j === i ? "font-semibold text-primary-foreground" : "text-primary-foreground/45"}
                  >
                    {s.title}
                  </span>
                ))}
              </nav>

              {/* Giant title */}
              <div className="pointer-events-none flex flex-1 items-center">
                <h2 className="font-sans text-[clamp(3.5rem,14vw,12rem)] font-bold leading-[0.85] tracking-[-0.04em]">
                  {slide.title}
                </h2>
              </div>

              {/* Bottom row: description + link (left), stats (right) */}
              <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-sm">
                  <span className="eyebrow text-primary-foreground/50">{slide.index}</span>
                  <p className="mt-3 text-base leading-relaxed text-primary-foreground/85">{slide.text}</p>
                  <a
                    href="#kontakt"
                    className="story-link mt-5 inline-block text-sm font-semibold text-primary-foreground"
                  >
                    Mehr erfahren
                  </a>
                </div>

                <dl className="flex flex-col gap-5 sm:items-end sm:text-right">
                  {slide.stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground/55">
                        {stat.label}
                      </dt>
                      <dd className="mt-1 text-lg font-medium text-primary-foreground">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
