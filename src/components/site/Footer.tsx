import { Link } from "@tanstack/react-router";
import logoLight from "@/assets/Logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
                <img src={logoLight} alt="" width={18} height={18} className="h-[18px] w-auto max-w-none" />
              </span>
              <span className="font-display text-lg text-foreground">F&V Webseiten</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Webdesign-Studio für ruhige, hochwertige und schnelle Markenauftritte.
            </p>
          </div>

          <div className="text-sm text-muted-foreground md:col-span-3">
            <h2 className="mb-3 font-semibold text-foreground">Hinweise &amp; Modelle</h2>
            <p className="leading-relaxed">
              <strong className="font-medium text-foreground">Kauf vs. Leasing:</strong> Beim Kauf erhalten Sie die Website einmalig
              inklusive Quellcode. Beim Leasing zahlen Sie eine monatliche Rate, die Hosting, Wartung und laufende Pflege abdeckt
              (Mindestlaufzeit 12 Monate).
            </p>
            <p className="mt-3 leading-relaxed">
              <strong className="font-medium text-foreground">Hosting &amp; Domain:</strong> Domains können per Transfer zu uns
              umgezogen oder bei Ihnen belassen werden — in dem Fall verbinden wir die Website nur per DNS. Details in der README
              und im Übergabe-Paket.
            </p>
            <p className="mt-3 leading-relaxed">
              <strong className="font-medium text-foreground">Datenschutz:</strong> Es werden keine personenbezogenen Daten ohne
              Einwilligung an Dritte übermittelt. Video- und Bild-Assets werden lokal ausgeliefert; Tracking erfolgt nur nach Opt-in.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} F&V Webseiten. Alle Rechte vorbehalten.</p>
          <nav className="flex flex-wrap gap-6" aria-label="Rechtliches">
            <Link to="/impressum" className="story-link transition-colors hover:text-foreground">Impressum</Link>
            <Link to="/datenschutz" className="story-link transition-colors hover:text-foreground">Datenschutz</Link>
            <Link to="/agb" className="story-link transition-colors hover:text-foreground">AGB</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
