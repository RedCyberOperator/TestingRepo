import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PROJECTS = [
  {
    name: "Callagain Systems",
    tag: "Web",
    year: "2025",
    href: "https://callagainsystems.com",
    image: "/portfolio-callagain.png",
  },
  {
    name: "EMCON ETA",
    tag: "Web",
    year: "2025",
    href: "https://emcon-eta.vercel.app",
    image: "/portfolio-emcon.png",
  },
  {
    name: "TablePay Connect",
    tag: "Web",
    year: "2025",
    href: "https://tablepayconnect.vercel.app",
    image: "/portfolio-tablepay.png",
  },
  {
    name: "Friseur am Ammersee",
    tag: "Web",
    year: "2025",
    href: "https://friseur-ammersee.vercel.app",
    image: "/portfolio-friseur.png",
  },
] as const;

export function Portfolio() {
  const [activeProject, setActiveProject] = useState<(typeof PROJECTS)[number] | null>(null);

  return (
    <>
      <section id="portfolio" className="scroll-mt-24 bg-secondary/50 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Portfolio"
            title="Ausgewählte Arbeiten."
            intro="Unsere Projekte."
          />
          <Reveal stagger className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PROJECTS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setActiveProject(p)}
                className="group relative block overflow-hidden rounded-2xl border border-border text-left shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={`${p.name} Vorschau`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" aria-hidden="true" />
                </div>
                <div className="flex items-center justify-between gap-4 bg-card p-6">
                  <div>
                    <h3 className="text-lg text-foreground">{p.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                      {p.tag} · {p.year}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      <AlertDialog open={Boolean(activeProject)} onOpenChange={(open) => !open && setActiveProject(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Externe Seite öffnen?</AlertDialogTitle>
            <AlertDialogDescription>
              Du verlässt diese Seite und wirst zu {activeProject?.name} weitergeleitet.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setActiveProject(null)}>Abbrechen</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!activeProject) return;
                window.location.href = activeProject.href;
              }}
            >
              Weiter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
