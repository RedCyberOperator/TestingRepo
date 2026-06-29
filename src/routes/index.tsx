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
import shareImage from "@/assets/F_V.png";

import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";


const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "F&V Webseiten",
  description:
    "Webdesign-Agentur für minimalistische, performante Websites. Strategie, Design und Entwicklung — Kauf oder Leasing.",
  email: "info@fv-webseiten.com",
  areaServed: "DACH",
  knowsAbout: ["Webdesign", "Webentwicklung", "Branding", "SEO"],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "F&V Webseiten — Webdesign-Agentur für KMUs" },
      {
        name: "description",
        content:
          "Webdesign für KMUs: klare Websites, starke Marken und schnelle Performance.",
      },
      { property: "og:title", content: "F&V Webseiten — Webdesign-Agentur für KMUs" },
      {
        property: "og:description",
        content: "Webdesign für KMUs: klare Websites, starke Marken und schnelle Performance.",
      },
      { property: "og:image", content: shareImage },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:alt", content: "F&V Webseiten - Webdesign für KMUs" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "F&V Webseiten — Webdesign-Agentur für KMUs" },
      { name: "twitter:description", content: "Webdesign für KMUs: klare Websites, starke Marken und schnelle Performance." },
      { name: "twitter:image", content: shareImage },
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
        <section className="mx-auto flex min-h-[80vh] max-w-5xl items-center px-6 py-32 sm:px-10">
          <ScrollText
            text="Wir sind ein Team aus erfahrenen Gestaltern und Entwicklern mit langjähriger Erfahrung in digitalen Markenauftritten und performanten Websites."
            className="justify-center text-center font-sans text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl"
          />
        </section>

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
