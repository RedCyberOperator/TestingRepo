import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum — F&V Webseiten" },
      { name: "description", content: "Anbieterkennzeichnung und rechtliche Angaben der F&V Webseiten Webdesign-Agentur." },
      { property: "og:title", content: "Impressum — F&V Webseiten" },
      { property: "og:description", content: "Anbieterkennzeichnung und rechtliche Angaben der F&V Webseiten." },
    ],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <LegalLayout
      title="Impressum"
      subtitle="Angaben gemäß § 5 TMG. Bitte ersetzen Sie die Platzhalter durch Ihre echten Unternehmensdaten."
    >
      <LegalSection heading="Anbieter">
        <p>Vinzent & Felix Breitenstein GbR</p>
        <p>Pfarrer-Kölbl-Str.25 </p>
        <p>85221 Dachau </p>
        <p>Deutschland</p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p>Telefon: +49 176 55423335</p>
        <p>E-Mail: info@fv-webseiten.com</p>
      </LegalSection>

      <LegalSection heading="Vertretungsberechtigte Person">
        <p>Vinzent Breitenstein & Felix Breitenstein</p>
      </LegalSection>

      <LegalSection heading="Umsatzsteuer-ID">
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: In Auftrag</p>
      </LegalSection>

      <LegalSection heading="Verantwortlich für den Inhalt">
        <p>Vinzent Breitenstein & Felix Breitenstein</p>
      </LegalSection>

      <LegalSection heading="Haftungsausschluss">
        <p>
          Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
          Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Für Inhalte externer Links sind ausschließlich
          deren Betreiber verantwortlich.
        </p>
      </LegalSection>

      <LegalSection heading="EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://europa.eu/consumers/odr/">europa.eu</a>.
        </p>
      </LegalSection>

      <LegalSection heading="Verbraucherstreitbeilegung/Universalschlichtungsstelle">
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
