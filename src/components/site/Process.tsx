import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const STEPS = [
  { n: "01", title: "Entdecken", text: "Workshop, Ziele und Zielgruppe. Wir verstehen Marke und Anforderungen." },
  { n: "02", title: "Gestalten", text: "Konzept, Wireframes und Designsystem — abgestimmt in klaren Iterationen." },
  { n: "03", title: "Entwickeln", text: "Pixelgenaue, performante Umsetzung mit Fokus auf Geschwindigkeit und A11y." },
  { n: "04", title: "Launchen", text: "Test, Go-live und Übergabe — inklusive Dokumentation und Schulung." },
];

export function Process() {
  return (
    <section id="prozess" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading eyebrow="Prozess" title="Klar geführt, von Anfang an." />
      <Reveal stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <div key={s.n} className="bg-card p-8">
            <span className="font-display text-4xl text-accent/40">{s.n}</span>
            <h3 className="mt-4 text-xl text-foreground">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
