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
    <section id="prozess" className="scroll-mt-24 bg-secondary/45 py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Prozess"
          title="Klar geführt, von Anfang an."
          intro="Ein übersichtlicher Ablauf mit festen Entscheidungen, damit Design und Entwicklung ruhig vorankommen."
        />

        <Reveal className="mt-10 rounded-2xl border border-border bg-background p-3 shadow-soft sm:mt-14 sm:p-5 md:p-8">
          <div className="grid gap-2 lg:grid-cols-4 lg:gap-0">
            {STEPS.map((s, index) => (
              <article key={s.n} className="relative rounded-xl p-4 transition-colors duration-300 hover:bg-secondary sm:p-5">
                {index < STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-[1.95rem] top-12 h-[calc(100%+0.5rem)] w-px bg-border sm:left-[2.15rem] sm:top-14 sm:h-[calc(100%+1rem)] lg:left-auto lg:right-0 lg:top-10 lg:h-px lg:w-full"
                  />
                )}

                <div className="relative z-10 flex items-start gap-3 sm:gap-4 lg:block">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-xs font-semibold text-accent sm:h-9 sm:w-9 sm:text-sm">
                    {s.n}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg text-foreground sm:text-xl lg:mt-6">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                    <p className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground sm:mt-5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                      <span className="truncate">{s.result}</span>
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
