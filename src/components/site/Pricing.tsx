import { Check } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const PLANS = [
  {
    name: "Kauf",
    price: "ab 6.900 €",
    note: "einmalig",
    desc: "Die Website gehört vollständig Ihnen. Einmalige Investition, volle Kontrolle.",
    features: [
      "Individuelles Design & Entwicklung",
      "Quellcode-Übergabe",
      "Einmalzahlung",
      "Optionale Wartung separat",
      "Fördercheck für Digitalbonus Bayern",
    ],
    highlight: false,
    noteLine:
      "Für KMU in Bayern kann der Digitalbonus Bayern bei förderfähigen Digitalprojekten infrage kommen, oft bis zu 50 % der zuwendungsfähigen Ausgaben.",
  },
  {
    name: "Leasing",
    price: "ab 290 €",
    note: "pro Monat",
    desc: "Geringe Anfangskosten. Design, Hosting, Updates und Support in einer Rate.",
    features: ["Kein hoher Startbetrag", "Hosting & Wartung inklusive", "Laufende Optimierung", "Mindestlaufzeit 12 Monate"],
    highlight: true,
  },
] as const;

export function Pricing() {
  return (
    <section id="preise" className="scroll-mt-24 bg-secondary/50 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Modelle"
          title="Kauf oder Leasing."
          intro="Zwei Wege zur eigenen Website, passend zu Budget und Bedarf."
          align="center"
        />
        <Reveal stagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border p-8 ${p.highlight ? "border-accent bg-card shadow-elegant" : "border-border bg-card shadow-soft"}`}
            >
              {p.highlight && (
                <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  Beliebt
                </span>
              )}
              <h3 className="text-2xl text-foreground">{p.name}</h3>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-4xl text-foreground">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.note}</span>
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{p.desc}</p>
              {"noteLine" in p ? (
                <p className="mt-4 rounded-lg border border-border/60 bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
                  {p.noteLine}
                </p>
              ) : null}
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#kontakt"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${p.highlight ? "bg-primary text-primary-foreground" : "border border-border bg-background text-foreground"}`}
              >
                {p.name} anfragen
              </a>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
