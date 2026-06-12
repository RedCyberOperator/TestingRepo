import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

type ScrollTextProps = {
  text: string;
  className?: string;
};

/**
 * Scroll-linked opacity reveal: each word brightens from faint to full as the
 * block scrolls through the viewport (scrubbed to scroll position).
 */
export function ScrollText({ text, className }: ScrollTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const spans = el.querySelectorAll<HTMLElement>("[data-word]");

    const ctx = gsap.context(() => {
      gsap.set(spans, { opacity: 0.12 });
      gsap.to(spans, {
        opacity: 1,
        ease: "none",
        stagger: 0.4,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 55%",
          scrub: true,
        },
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [text]);

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} data-word className="mr-[0.25em] inline-block">
          {word}
        </span>
      ))}
    </p>
  );
}
