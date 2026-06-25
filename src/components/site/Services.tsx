import { ArrowUpRight, Code2, Compass, Gauge, LifeBuoy, PenTool, Sparkles } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const SERVICES = [
  {
    icon: Compass,
    title: "Strategie & Konzept",
    text: "Positionierung, Seitenstruktur und Inhalte, die Vertrauen aufbauen, bevor das Design beginnt.",
    detail: "Workshop",
  },
  {
    icon: PenTool,
    title: "Webdesign",
    text: "Ruhige, typografisch starke Interfaces mit klarer Markenwirkung und sauberer Nutzerführung.",
    detail: "Designsystem",
  },
  {
    icon: Code2,
    title: "Entwicklung",
    text: "Performante Umsetzung mit modernem Stack, sauberer Wartbarkeit und barrierearmen Grundlagen.",
    detail: "Frontend",
  },
  {
    icon: Gauge,
    title: "Performance & SEO",
    text: "Schnelle Ladezeiten, Core Web Vitals und strukturierte Daten für bessere Auffindbarkeit.",
    detail: "Optimierung",
  },
  {
    icon: Sparkles,
    title: "Branding",
    text: "Farbwelt, Bildsprache und kleine Details, die einer Website Wiedererkennung geben.",
    detail: "Identität",
  },
  {
    icon: LifeBuoy,
    title: "Betreuung & Hosting",
    text: "Wartung, Updates und Hosting als laufendes Setup, damit die Website stabil bleibt.",
    detail: "Betrieb",
  },
];

export function Services() {
  return (
    <section id="leistungen" className="scroll-mt-24 py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Leistungen"
          title="Alles für einen Auftritt, der bleibt."
          intro="Von der ersten Idee bis zum Betrieb begleiten wir den gesamten Weg."
        />

        <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-[0.9fr_1.6fr] lg:items-start lg:gap-10">
          <Reveal className="relative overflow-hidden rounded-2xl border border-border bg-[linear-gradient(160deg,oklch(1_0_0),oklch(0.965_0.004_250))] p-5 shadow-soft sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,oklch(0.56_0.072_252_/_0.45),transparent)]" />
            <p className="eyebrow text-muted-foreground">Full-Service</p>
            <h3 className="mt-5 max-w-sm text-2xl leading-tight text-foreground sm:mt-6 sm:text-3xl">
              Strategie, Design und Technik greifen sichtbar ineinander.
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Statt einzelne Bausteine lose aneinanderzureihen, planen wir Website, Marke und Betrieb als
              zusammenhängendes System. Das macht den Auftritt klarer, schneller und leichter weiterzuentwickeln.
            </p>
            <a
              href="#kontakt"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:mt-8 sm:w-auto"
            >
              Projekt besprechen
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal stagger className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {SERVICES.map((s) => (
              <article
                key={s.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-secondary sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-accent transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent/10">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="max-w-[9.5rem] truncate rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground sm:max-w-none">
                    {s.detail}
                  </span>
                </div>
                <h3 className="mt-5 text-lg text-foreground sm:mt-6 sm:text-xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
