import { useState } from "react";
import { Reveal } from "./Reveal";
import person1 from "@/assets/team_person_1.jpg";
import person2 from "@/assets/team_person_2.jpg";

type Member = {
  name: string;
  role: string;
  image: string;
  linkedin: string;
};

const MEMBERS: Member[] = [
  {
    name: "Vasil Peres",
    role: "Analista DDO",
    image: person1,
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Marta Nogueira",
    role: "Head of Design",
    image: person2,
    linkedin: "https://www.linkedin.com/",
  },
];

export function Team() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="team" className="scroll-mt-24 bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal stagger>
          <p className="eyebrow text-accent">Team</p>
          <h2 className="mt-4 text-balance text-3xl text-foreground sm:text-4xl md:text-5xl">
            Die Menschen hinter Altura.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {MEMBERS.map((m, i) => {
            const active = hovered === i;
            return (
              <a
                key={m.name}
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                aria-label={`${m.name} – ${m.role} – LinkedIn-Profil öffnen`}
                className="group relative block bg-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              >
                {/* Name / role panel — revealed on hover */}
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-10 text-center transition-all duration-500 ease-out sm:pt-14 ${
                    active ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                  }`}
                >
                  <p className="text-sm tracking-wide text-muted-foreground sm:text-base">
                    {m.role}
                  </p>
                  <p className="mt-1 font-display text-2xl text-foreground sm:text-3xl md:text-4xl">
                    {m.name}
                  </p>
                </div>

                {/* Background tint that lightens on hover */}
                <div
                  className={`absolute inset-0 z-0 bg-background transition-opacity duration-500 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />

                {/* Portrait */}
                <div className="relative z-[5] flex aspect-[3/4] items-end justify-center overflow-hidden">
                  <img
                    src={m.image}
                    alt={`${m.name}, ${m.role}`}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className={`h-full w-full object-cover object-top grayscale transition-all duration-700 ease-out ${
                      active ? "scale-[1.03] grayscale-0" : "scale-100"
                    }`}
                  />
                </div>

                {/* LinkedIn tag */}
                <span
                  className={`absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded bg-foreground px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-background transition-all duration-300 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                >
                  LinkedIn
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
