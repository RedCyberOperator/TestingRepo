import { useEffect, useRef } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

/** Stock photos (Unsplash) — replace with real project imagery later. */
const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2000&q=80",
    title: "Klarheit",
    text: "Reduktion auf das Wesentliche.",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80",
    title: "Tiefe",
    text: "Atmosphäre, die Vertrauen schafft.",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80",
    title: "Ruhe",
    text: "Bewegung, dezent und flüssig.",
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
    const imgs = slides.map((s) => s.querySelector<HTMLElement>("img"));

    const ctx = gsap.context(() => {
      gsap.set(slides, { opacity: 0 });
      gsap.set(slides[0], { opacity: 1 });
      gsap.set(imgs, { scale: 1.15 });

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

      // Gentle continuous zoom-in on each visible image + crossfades.
      tl.to(imgs[0], { scale: 1, duration: 1 }, 0);
      for (let i = 1; i < slides.length; i++) {
        const at = i;
        tl.to(slides[i - 1], { opacity: 0, duration: 0.5 }, at - 0.5);
        tl.to(slides[i], { opacity: 1, duration: 0.5 }, at - 0.5);
        tl.fromTo(imgs[i], { scale: 1.15 }, { scale: 1, duration: 1 }, at - 0.5);
      }
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Eindrücke"
      className="relative"
      style={{ height: `${(IMAGES.length + 1) * 100}vh` }}
    >
      <div ref={stageRef} className="relative h-[100svh] w-full overflow-hidden bg-primary">
        {IMAGES.map((img, i) => (
          <div key={i} data-slide className="absolute inset-0">
            <img
              src={img.src}
              alt={img.title}
              loading="lazy"
              className="h-full w-full object-cover will-change-transform"
            />
            <div className="absolute inset-0 bg-primary/30" aria-hidden="true" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-primary-foreground">
              <h2 className="font-sans text-5xl font-bold tracking-[-0.03em] sm:text-7xl md:text-8xl">
                {img.title}
              </h2>
              <p className="mt-4 max-w-md text-base text-primary-foreground/80 sm:text-lg">
                {img.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
