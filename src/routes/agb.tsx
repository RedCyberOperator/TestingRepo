import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { LegalLayout } from "@/components/site/LegalLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/agb")({
  head: () => ({
    meta: [
      { title: "AGB — F&V Webseiten" },
      { name: "description", content: "Die vollständigen Allgemeinen Geschäftsbedingungen von F&V Webseiten als Download." },
      { property: "og:title", content: "AGB — F&V Webseiten" },
      { property: "og:description", content: "Die vollständigen Allgemeinen Geschäftsbedingungen von F&V Webseiten als Download." },
    ],
  }),
  component: AgbPage,
});

function AgbPage() {
  return (
    <LegalLayout
      title="AGB"
      subtitle="Für eine übersichtliche Darstellung sind die vollständigen Allgemeinen Geschäftsbedingungen als Download verfügbar."
    >
      <section data-block className="rounded-[2rem] border border-border bg-card/80 p-8 shadow-soft">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-4">
            <p className="eyebrow text-muted-foreground">Download</p>
            <h2 className="font-sans text-2xl font-semibold tracking-[-0.02em] text-foreground">
              Vollständige AGB als PDF herunterladen
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Die AGB liegen in einer kompakten PDF-Datei vor. Der Download ist direkt verfügbar und passt sich an das
              Erscheinungsbild der Website an.
            </p>
          </div>

          <Button asChild size="lg" className="w-full md:w-auto">
            <a href="/agb-fv-webseiten.pdf" download="agb-fv-webseiten.pdf">
              <Download className="h-4 w-4" />
              AGB herunterladen
            </a>
          </Button>
        </div>
      </section>

      <section data-block className="rounded-2xl border border-border/70 bg-background/80 p-6">
        <h2 className="font-sans text-xl font-semibold tracking-[-0.01em] text-foreground">Hinweis</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Die AGB gelten für die Zusammenarbeit mit F&V Webseiten. Für individuelle Vereinbarungen oder projektspezifische
          Anpassungen lassen wir die jeweilige Fassung rechtlich prüfen.
        </p>
      </section>
    </LegalLayout>
  );
}
