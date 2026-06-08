import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const QUOTES = [
  { quote: "Ruhig, präzise und schnell. Unsere neue Website wirkt endlich so hochwertig wie unsere Arbeit.", name: "Lena M.", role: "Gründerin, Bergquell Spa" },
  { quote: "Die Zusammenarbeit war strukturiert und entspannt. Ladezeiten und Sichtbarkeit haben sich spürbar verbessert.", name: "Tobias R.", role: "Marketing, Lumen Capital" },
  { quote: "Das Leasing-Modell war ideal für uns — alles aus einer Hand, ohne hohe Anfangskosten.", name: "Sandra K.", role: "Inhaberin, Nord Atelier" },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading eyebrow="Stimmen" title="Vertrauen, das trägt." />
      <Reveal stagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {QUOTES.map((q) => (
          <figure key={q.name} className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-soft">
            <blockquote className="flex-1 font-display text-lg leading-relaxed text-foreground">
              &ldquo;{q.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 border-t border-border pt-5">
              <p className="font-semibold text-foreground">{q.name}</p>
              <p className="text-sm text-muted-foreground">{q.role}</p>
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  );
}
