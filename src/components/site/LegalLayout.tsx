import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";
import logoDark from "@/assets/logo_dark.png.asset.json";

type LegalLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

/**
 * Shared layout for legal pages (Impressum, Datenschutz, AGB) with a smooth
 * curtain-reveal entrance transition inspired by editorial agency sites.
 */
export function LegalLayout({ title, subtitle, children }: LegalLayoutProps) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap } = ensureGsap();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(curtainRef.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, 0);

      if (headRef.current) {
        const lines = headRef.current.querySelectorAll("[data-line]");
        gsap.set(lines, { opacity: 0, y: 28 });
        tl.to(lines, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.45);
      }
      if (bodyRef.current) {
        const blocks = bodyRef.current.querySelectorAll("[data-block]");
        gsap.set(blocks, { opacity: 0, y: 24 });
        tl.to(blocks, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.7);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Entrance curtain */}
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[100] bg-primary"
      />

      <header className="border-b border-border">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logoDark.url} alt="" width={28} height={28} className="h-7 w-7" />
            <span className="font-display text-lg tracking-tight text-foreground">Altura</span>
          </Link>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Zurück
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <div ref={headRef}>
          <p data-line className="eyebrow text-muted-foreground">
            Rechtliches
          </p>
          <h1 data-line className="mt-5 font-sans text-5xl font-bold tracking-[-0.03em] text-foreground sm:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p data-line className="mt-5 max-w-2xl text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        <div ref={bodyRef} className="mt-16 space-y-12">
          {children}
        </div>
      </main>
    </div>
  );
}

/** A titled content block within a legal page. */
export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section data-block className="border-t border-border pt-8">
      <h2 className="font-sans text-xl font-semibold tracking-[-0.01em] text-foreground">{heading}</h2>
      <div className="mt-4 space-y-3 text-pretty leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
