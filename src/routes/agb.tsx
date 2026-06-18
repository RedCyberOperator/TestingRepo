import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/agb")({
  head: () => ({
    meta: [
      { title: "AGB — F&V Webseiten" },
      { name: "description", content: "Allgemeine Geschäftsbedingungen der F&V Webseiten Webdesign-Agentur." },
      { property: "og:title", content: "AGB — F&V Webseiten" },
      { property: "og:description", content: "Allgemeine Geschäftsbedingungen der F&V Webseiten." },
    ],
  }),
  component: AgbPage,
});

function AgbPage() {
  return (
    <LegalLayout
      title="AGB"
      subtitle="Allgemeine Geschäftsbedingungen. Platzhalter — bitte vor Veröffentlichung rechtlich prüfen lassen."
    >
      <LegalSection heading="1. Geltungsbereich">
        <p>
          Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen F&V Webseiten und ihren Kund:innen über
          die Erbringung von Design- und Entwicklungsleistungen.
        </p>
      </LegalSection>

      <LegalSection heading="2. Vertragsgegenstand">
        <p>
          Gegenstand ist die Konzeption, Gestaltung und technische Umsetzung von Websites sowie damit verbundene
          Leistungen. Der konkrete Leistungsumfang ergibt sich aus dem jeweiligen Angebot.
        </p>
      </LegalSection>

      <LegalSection heading="3. Kauf und Leasing">
        <p>
          Beim Kauf erhalten Kund:innen die Website einmalig inklusive Quellcode. Beim Leasing wird eine monatliche Rate
          vereinbart, die Hosting, Wartung und Pflege abdeckt (Mindestlaufzeit 12 Monate).
        </p>
      </LegalSection>

      <LegalSection heading="4. Zahlungsbedingungen">
        <p>
          Rechnungen sind, sofern nicht anders vereinbart, innerhalb von 14 Tagen ohne Abzug fällig. Bei Leasing erfolgt
          die Abrechnung monatlich.
        </p>
      </LegalSection>

      <LegalSection heading="5. Nutzungsrechte">
        <p>
          Mit vollständiger Bezahlung werden die vereinbarten Nutzungsrechte übertragen. Beim Leasing verbleiben die Rechte
          bis zum Ende der Laufzeit bei F&V Webseiten.
        </p>
      </LegalSection>

      <LegalSection heading="6. Haftung">
        <p>
          F&V Webseiten haftet nur für Schäden, die auf vorsätzlichem oder grob fahrlässigem Verhalten beruhen, im Rahmen
          der gesetzlichen Bestimmungen.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
