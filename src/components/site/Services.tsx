import { Compass, PenTool, Code2, Gauge, Sparkles, LifeBuoy } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const SERVICES = [
  { icon: Compass, title: "Strategie & Konzept", text: "Positionierung, Informationsarchitektur und Inhalte, die Vertrauen schaffen." },
  { icon: PenTool, title: "Webdesign", text: "Ruhige, typografisch starke Layouts mit Charakter — bis ins Detail." },
  { icon: Code2, title: "Entwicklung", text: "Schnelle, barrierearme Websites auf modernem Stack. Sauber und wartbar." },
  { icon: Gauge, title: "Performance & SEO", text: "Server-Rendering, Core Web Vitals und strukturierte Daten für Sichtbarkeit." },
  { icon: Sparkles, title: "Branding", text: "Visuelle Identität, Farbwelt und Bildsprache mit Wiedererkennung." },
  { icon: LifeBuoy, title: "Betreuung & Hosting", text: "Wartung, Updates und Hosting — auf Wunsch als Rundum-sorglos-Paket." },
];

export function Services() {
  return (
    <section id="leistungen" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="Leistungen"
        title="Alles für einen Auftritt, der bleibt."
        intro="Von der ersten Idee bis zum Betrieb — wir begleiten den gesamten Weg."
      />
      <Reveal stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <div key={s.title} className="group bg-card p-8 transition-colors duration-300 hover:bg-secondary">
            <s.icon className="h-7 w-7 text-accent" aria-hidden="true" />
            <h3 className="mt-5 text-xl text-foreground">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
