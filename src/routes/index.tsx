import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { ScrollGallery } from "@/components/site/ScrollGallery";
import { Portfolio } from "@/components/site/Portfolio";
import { Process } from "@/components/site/Process";
import { Pricing } from "@/components/site/Pricing";
import { Testimonials } from "@/components/site/Testimonials";
import { LocationMap } from "@/components/site/LocationMap";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";
import { CustomCursor } from "@/components/site/CustomCursor";


const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Altura Studio",
  description:
    "Webdesign-Agentur für minimalistische, performante Websites. Strategie, Design und Entwicklung — Kauf oder Leasing.",
  email: "hallo@altura.studio",
  areaServed: "DACH",
  knowsAbout: ["Webdesign", "Webentwicklung", "Branding", "SEO"],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Altura — Webdesign-Agentur für ruhige, hochwertige Websites" },
      {
        name: "description",
        content:
          "Altura gestaltet minimalistische, schnelle Websites mit Charakter. Strategie, Design und Entwicklung aus einer Hand — als Kauf oder Leasing.",
      },
      { property: "og:title", content: "Altura — Webdesign-Agentur" },
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
        <Services />
        <Portfolio />
        <Process />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
