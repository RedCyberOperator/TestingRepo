import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
      stagger
    >
      <p className={cn("eyebrow text-accent", align === "center" && "mx-auto")}>{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-pretty text-base text-muted-foreground sm:text-lg">{intro}</p>
      )}
    </Reveal>
  );
}
