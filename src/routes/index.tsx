import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { ScrollGallery } from "@/components/site/ScrollGallery";
import { Portfolio } from "@/components/site/Portfolio";
import { Process } from "@/components/site/Process";
import { Pricing } from "@/components/site/Pricing";
import { Testimonials } from "@/components/site/Testimonials";
import { Team } from "@/components/site/Team";
import { ScrollText } from "@/components/site/ScrollText";


import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";


const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "F&V Webseiten",
  description:
    "Webdesign-Agentur für minimalistische, performante Websites. Strategie, Design und Entwicklung — Kauf oder Leasing.",
  email: "hallo@altura.studio",
  areaServed: "DACH",
  knowsAbout: ["Webdesign", "Webentwicklung", "Branding", "SEO"],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "F&V Webseiten — Webdesign-Agentur für ruhige, hochwertige Websites" },
      {
        name: "description",
        content:
          "F&V Webseiten gestaltet minimalistische, schnelle Websites mit Charakter. Strategie, Design und Entwicklung aus einer Hand — als Kauf oder Leasing.",
      },
      { property: "og:title", content: "F&V Webseiten — Webdesign-Agentur" },
      {
        property: "og:description",
        content: "Minimalistische, performante Markenauftritte. Kauf oder Leasing.",
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(orgJsonLd) }],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top">
      <Navbar />
      <main>
        <Hero />
        <ZoomReveal
          text="Wir sind ein Team aus erfahrenen Gestaltern und Entwicklern mit langjähriger Erfahrung in digitalen Markenauftritten und performanten Websites."
          className="font-sans text-2xl font-bold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-3xl md:text-4xl"
        />
        <Services />
        <ScrollGallery />
        <Portfolio />
        <Process />
        <Pricing />
        <Testimonials />
        <Team />
        
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
