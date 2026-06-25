import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoDark from "@/assets/Logo.png";

const LINKS = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#prozess", label: "Prozess" },
  { href: "#preise", label: "Preise" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/14 bg-[color:oklch(0.17_0.012_256_/_0.78)] shadow-[0_12px_40px_-24px_rgba(0,0,0,0.65)] backdrop-blur-xl"
          : "bg-[linear-gradient(to_bottom,rgba(10,12,18,0.42),rgba(10,12,18,0.14),transparent)] backdrop-blur-sm",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-full px-2 py-1 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <img
            src={logoDark}
            alt=""
            width={28}
            height={28}
            className="h-7 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
          />
          <span className="font-display text-lg tracking-tight text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
            F&V Webseiten
          </span>
        </a>

        <ul className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/10 px-2 py-2 backdrop-blur-md md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/78 transition-all duration-300 hover:bg-white/12 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#kontakt"
          className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_12px_24px_-16px_rgba(255,255,255,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/95 md:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Anfragen
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white backdrop-blur-md md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[color:oklch(0.14_0.01_256_/_0.92)] backdrop-blur-xl md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-3 py-3 text-base font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#kontakt"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 transition-colors hover:bg-white/95"
              >
                Anfragen
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
