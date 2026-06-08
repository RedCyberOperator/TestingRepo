import { useEffect, useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("altura-consent")) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function decide(value: "accepted" | "declined") {
    try {
      localStorage.setItem("altura-consent", value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-Hinweis"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl rounded-2xl border border-border bg-card p-5 shadow-elegant sm:inset-x-auto sm:right-4"
    >
      <p className="text-sm text-muted-foreground">
        Wir verwenden nur technisch notwendige Cookies. Optionale Statistik-Dienste werden erst nach Ihrer Zustimmung geladen.
        (Platzhalter — bitte an Ihre Datenschutzerklärung anpassen.)
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => decide("accepted")}
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          Akzeptieren
        </button>
        <button
          onClick={() => decide("declined")}
          className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          Nur notwendige
        </button>
      </div>
    </div>
  );
}
