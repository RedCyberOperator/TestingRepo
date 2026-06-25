import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Entdecken",
    text: "Workshop, Ziele und Zielgruppe. Wir verstehen Marke, Angebot und Anforderungen.",
    result: "Klares Briefing",
  },
  {
    n: "02",
    title: "Gestalten",
    text: "Konzept, Wireframes und Designsystem entstehen in ruhigen, transparenten Iterationen.",
    result: "Freigegebenes Design",
  },
  {
    n: "03",
    title: "Entwickeln",
    text: "Pixelgenaue Umsetzung mit Fokus auf Geschwindigkeit, Struktur und barrierearme Nutzung.",
    result: "Stabile Website",
  },
  {
    n: "04",
    title: "Launchen",
    text: "Test, Go-live und Übergabe inklusive Dokumentation, Schulung und optionaler Betreuung.",
    result: "Sauberer Start",
  },
];

export function Process() {
  return (
    <section id="prozess" className="scroll-mt-24 bg-secondary/45 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Prozess"
          title="Klar geführt, von Anfang an."
          intro="Ein übersichtlicher Ablauf mit festen Entscheidungen, damit Design und Entwicklung ruhig vorankommen."
        />

        <Reveal className="mt-14 rounded-2xl border border-border bg-background p-5 shadow-soft md:p-8">
          <div className="grid gap-4 lg:grid-cols-4 lg:gap-0">
            {STEPS.map((s, index) => (
              <article key={s.n} className="relative rounded-xl p-5 transition-colors duration-300 hover:bg-secondary">
                {index < STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-[2.15rem] top-14 h-[calc(100%+1rem)] w-px bg-border lg:left-auto lg:right-0 lg:top-10 lg:h-px lg:w-full"
                  />
                )}

                <div className="relative z-10 flex items-start gap-4 lg:block">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-sm font-semibold text-accent">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-xl text-foreground lg:mt-6">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                    <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                      {s.result}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
