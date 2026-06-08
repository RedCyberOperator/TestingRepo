import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const PROJECTS = [
  { name: "Bergquell Spa", tag: "Branding · Web", year: "2025", from: "oklch(0.62 0.06 250)", to: "oklch(0.42 0.05 256)" },
  { name: "Nord Atelier", tag: "Webdesign", year: "2025", from: "oklch(0.7 0.04 230)", to: "oklch(0.5 0.05 250)" },
  { name: "Lumen Capital", tag: "Web · SEO", year: "2024", from: "oklch(0.58 0.07 252)", to: "oklch(0.34 0.03 256)" },
  { name: "Hügel & Tal", tag: "E-Commerce", year: "2024", from: "oklch(0.66 0.05 200)", to: "oklch(0.46 0.06 240)" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-24 bg-secondary/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Portfolio"
          title="Ausgewählte Arbeiten."
          intro="Eine Auswahl an Projekten — Platzhalter zur Illustration der Bandbreite."
        />
        <Reveal stagger className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <a
              key={p.name}
              href="#kontakt"
              className="group relative block overflow-hidden rounded-2xl border border-border shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div
                className="aspect-[4/3] w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                style={{ backgroundImage: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
                aria-hidden="true"
              />
              <div className="flex items-center justify-between gap-4 bg-card p-6">
                <div>
                  <h3 className="text-lg text-foreground">{p.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{p.tag} · {p.year}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
