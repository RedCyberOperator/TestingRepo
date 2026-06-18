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
        <p>F&V Webseiten</p>
        <p>Musterstraße 1</p>
        <p>0000 Musterstadt</p>
        <p>Österreich / Deutschland / Schweiz</p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p>Telefon: +00 000 000 00 00</p>
        <p>E-Mail: hallo@altura.studio</p>
      </LegalSection>

      <LegalSection heading="Vertretungsberechtigte Person">
        <p>Vor- und Nachname (Inhaber:in / Geschäftsführer:in)</p>
      </LegalSection>

      <LegalSection heading="Umsatzsteuer-ID">
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: ATU00000000 (Platzhalter)</p>
      </LegalSection>

      <LegalSection heading="Verantwortlich für den Inhalt">
        <p>Vor- und Nachname, Anschrift wie oben.</p>
      </LegalSection>

      <LegalSection heading="Haftungsausschluss">
        <p>
          Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
          Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Für Inhalte externer Links sind ausschließlich
          deren Betreiber verantwortlich.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
