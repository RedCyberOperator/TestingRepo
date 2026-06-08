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
 * Scroll-triggered entrance using GSAP (ease: expo.out).
 * Falls back to instant visibility when reduced motion is requested.
 */
export function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  as,
  y = 28,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      return;
    }

    const { gsap, ScrollTrigger } = ensureGsap();
    const targets = stagger ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        delay,
        ease: "expo.out",
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
    <Tag ref={ref} className={cn(className)} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
