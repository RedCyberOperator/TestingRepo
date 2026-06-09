import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger child elements instead of the wrapper itself. */
  stagger?: boolean;
  delay?: number;
  as?: ElementType;
  y?: number;
};

/**
 * Scroll-triggered text reveal:
 * Fade-In (0 -> 1), TranslateY (20px -> 0), Stagger, ease power2.out,
 * triggered as soon as the element scrolls into the viewport.
 *
 * The wrapper is rendered visible by default so content is ALWAYS shown,
 * even if JS/GSAP fails. The hidden start state is applied at runtime only.
 */
export function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  as,
  y = 20,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const targets = stagger ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power2.out",
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [stagger, delay, y]);

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
