import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

type ZoomRevealProps = {
  text: string;
  className?: string;
};

/**
 * Zoom-illusion reveal: the block is pinned while the user scrolls and the text
 * scales up from small to fill the entire screen, scrubbed to scroll position.
 */
export function ZoomReveal({ text, className }: ZoomRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = ensureGsap();

    const ctx = gsap.context(() => {
      gsap.set(textEl, { scale: 0.32, opacity: 0.25, transformOrigin: "center center" });
      gsap.to(textEl, {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [text]);

  return (
    <div ref={sectionRef} className="relative flex h-screen w-full items-center justify-center overflow-hidden px-6">
      <p
        ref={textRef}
        className={cn("mx-auto max-w-5xl text-center will-change-transform", className)}
      >
        {text}
      </p>
    </div>
  );
}
