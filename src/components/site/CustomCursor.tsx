import { useEffect, useRef } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Custom cursor: a circle replacing the native pointer.
 *  - Lag/Follow: trails the mouse with easing.
 *  - Magnetic Hover: grows over interactive elements.
 *  - Blend Mode: mix-blend-mode: difference inverts the background beneath it.
 * Disabled for touch devices and when reduced motion is preferred.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dotRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    // Skip on touch / coarse pointers.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const { gsap } = ensureGsap();

    document.body.classList.add("has-custom-cursor");
    // force3D keeps the element on its own GPU layer for crisp scaling.
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0, scale: 1, force3D: true });

    const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

    let visible = false;
    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to(el, { opacity: 1, duration: 0.3 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const interactive = "a, button, [role='button'], input, textarea, select, label, [data-cursor]";
    const onOver = (e: Event) => {
      if ((e.target as Element)?.closest?.(interactive)) {
        gsap.to(el, { scale: 2.0, duration: 0.3, ease: "power3.out" });
      }
    };
    const onOut = (e: Event) => {
      if ((e.target as Element)?.closest?.(interactive)) {
        gsap.to(el, { scale: 1, duration: 0.3, ease: "power3.out" });
      }
    };
    const onLeave = () => {
      visible = false;
      gsap.to(el, { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full bg-white opacity-0 mix-blend-difference"
      style={{ willChange: "transform" }}
    />
  );
}
