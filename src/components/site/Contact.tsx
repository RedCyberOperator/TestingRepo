import { useState, type FormEvent } from "react";
import { Mail, MapPin } from "lucide-react";
import { Reveal } from "./Reveal";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;

    setError(null);
    setSent(false);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mzdlpyjk", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        setSent(true);
        form.reset();
      } else {
        const data = await response.json().catch(() => null);
        setError(data?.error || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
      }
    } catch {
      setError("Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="kontakt" className="scroll-mt-24 bg-primary py-24 text-primary-foreground md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 lg:grid-cols-2">
        <Reveal stagger>
          <p className="eyebrow text-accent-foreground/70">Kontakt</p>
          <h2 className="mt-4 text-balance font-display text-3xl sm:text-4xl md:text-5xl">
            Lassen Sie uns über Ihr Projekt sprechen.
          </h2>
          <p className="mt-5 max-w-md text-primary-foreground/70">
            Erzählen Sie kurz von Ihrem Vorhaben. Wir melden uns innerhalb von zwei Werktagen.
          </p>
          <div className="mt-8 space-y-3 text-sm">
            <a href="mailto:info@fv-webseiten.com" className="flex items-center gap-3 text-primary-foreground/80 transition-colors hover:text-primary-foreground">
              <Mail className="h-4 w-4" aria-hidden="true" /> info@fv-webseiten.com
            </a>
            <p className="flex items-center gap-3 text-primary-foreground/80">
              <MapPin className="h-4 w-4" aria-hidden="true" /> Deutschland · Remote im DACH-Raum
            </p>
          </div>
        </Reveal>

        <Reveal>
          <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">Name</label>
                <input id="name" name="name" type="text" required className="w-full rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Ihr Name" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">E-Mail</label>
                <input id="email" name="email" type="email" required className="w-full rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent" placeholder="name@firma.de" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">Nachricht</label>
              <textarea id="message" name="message" rows={4} required className="w-full rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Worum geht es?" />
            </div>
            <label className="flex items-start gap-3 text-xs text-primary-foreground/70">
              <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-primary-foreground/30 accent-accent" />
              <span>Ich willige ein, dass meine Angaben zur Bearbeitung der Anfrage verarbeitet werden. Hinweise in der Datenschutzerklärung.</span>
            </label>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            {sent ? (
              <p className="text-sm text-accent-foreground/90">
                Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.
              </p>
            ) : null}
            <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Senden…" : "Anfrage senden"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
