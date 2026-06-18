import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutz — F&V Webseiten" },
      { name: "description", content: "Datenschutzerklärung der F&V Webseiten Webdesign-Agentur gemäß DSGVO." },
      { property: "og:title", content: "Datenschutz — F&V Webseiten" },
      { property: "og:description", content: "Datenschutzerklärung der F&V Webseiten gemäß DSGVO." },
    ],
  }),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  return (
    <LegalLayout
      title="Datenschutz"
      subtitle="Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO. Platzhalter — bitte rechtlich prüfen lassen."
    >
      <LegalSection heading="Verantwortliche Stelle">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist F&V Webseiten, Musterstraße 1, 0000 Musterstadt,
          E-Mail: hallo@altura.studio.
        </p>
      </LegalSection>

      <LegalSection heading="Erhebung und Speicherung">
        <p>
          Beim Besuch dieser Website werden durch den Hosting-Provider automatisch Informationen (Server-Logfiles) erfasst,
          etwa Browsertyp, Betriebssystem, Referrer-URL und Uhrzeit des Zugriffs. Diese Daten sind technisch erforderlich
          und werden nicht mit anderen Datenquellen zusammengeführt.
        </p>
      </LegalSection>

      <LegalSection heading="Kontaktaufnahme">
        <p>
          Wenn Sie uns per Formular oder E-Mail kontaktieren, werden Ihre Angaben zur Bearbeitung der Anfrage gespeichert.
          Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies & Tracking">
        <p>
          Tracking erfolgt ausschließlich nach Ihrer ausdrücklichen Einwilligung (Opt-in). Sie können erteilte
          Einwilligungen jederzeit mit Wirkung für die Zukunft widerrufen.
        </p>
      </LegalSection>

      <LegalSection heading="Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit
          sowie Widerspruch. Zudem besteht ein Beschwerderecht bei der zuständigen Aufsichtsbehörde.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
