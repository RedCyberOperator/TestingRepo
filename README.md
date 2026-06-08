# Altura — Webdesign-Agentur (One-Page)

Minimalistische, performante One-Page-Website mit mehrschichtigem
Berg-/Wolken-Hero, GSAP-Parallax und ruhiger, luxuriöser Gestaltung.

> Hinweis zum Stack: Dieses Projekt läuft auf **TanStack Start** (React 19 +
> TypeScript, SSR, Vite) — dem modernen React-Full-Stack-Äquivalent zu Next.js
> auf dieser Plattform. Animationen mit **GSAP + ScrollTrigger**. Deploybar auf
> Vercel/Cloudflare.

## Setup

```bash
bun install
bun run dev      # Entwicklung
bun run build    # Produktionsbuild
```

## Struktur

```
src/
  routes/
    __root.tsx          # Shell, Fonts, globale Meta/OG
    index.tsx           # One-Page-Komposition + JSON-LD (Organization)
    sitemap[.]xml.ts    # dynamische sitemap.xml
  components/site/       # Navbar, Hero, Services, Portfolio, Process,
                         # Pricing, Testimonials, Contact, Footer, CookieBanner
  lib/gsap.ts           # GSAP-Setup, reduce-motion & Mobile-Erkennung
  assets/*.asset.json   # CDN-Pointer (Berge, Wolken, Logo, Depth Map)
  styles.css            # Design-System (oklch-Tokens)
public/robots.txt
```

## Hero-Ebenen (von hinten nach vorn)

1. Sky-Gradient (Hintergrund)
2. Fog-Textur (`mix-blend-soft-light`, Opacity 0.12) — *Drop-in-Slot für WebM/MP4*
3. 5 Cloud-Layer (Drift 38–64 s, vertikale Oszillation)
4. Berge: `back` ×0.25 · `mid` ×0.6 · `front` ×1.0 (Depth-Map-Multiplikatoren)
5. Pointer-Parallax (nur Desktop) + Scroll-Parallax via ScrollTrigger
6. Headline/CTA mit `expo.out`-Entrance

**Depth Map** (`peaks_depth.jpg`, Weiß = nah, Schwarz = fern) liegt als Asset bei
und steuert die Layer-Multiplikatoren. Für echtes Per-Pixel-Displacement kann ein
Three.js-Shader ergänzt werden (bewusst weggelassen für das Performance-Budget).

### Fog als echtes Video
`src/components/site/Hero.tsx` enthält den Fog-Layer als Textur. Für einen WebM-Loop
das `<div ref={fogRef}>` durch ein `<video autoplay muted loop playsinline>` mit
`<source ... type="video/webm">` + MP4-Fallback ersetzen (Opacity 0.08–0.25, lazy).

## Fallbacks & Zugänglichkeit
- `prefers-reduced-motion` wird respektiert (keine JS-Animationen, statisches Hero).
- Mobile: leichtere Parallax-Variante, kein Pointer-Tracking.
- Semantisches HTML, ein `<main>`, ARIA-Labels, Fokus-Ringe, Kontrast ≥ WCAG AA.

## DSGVO
- Kontaktformular sendet im Demo-Zustand keine Daten an Dritte (Opt-in-Checkbox).
- Cookie-Banner als Platzhalter — an die eigene Datenschutzerklärung anpassen.

## Deployment (Vercel)
1. Repo mit GitHub verbinden.
2. Auf Vercel importieren — Framework wird automatisch erkannt (Build: `bun run build`).
3. `BASE_URL` in `src/routes/sitemap[.]xml.ts` auf die finale Domain setzen.

## Domain-Übergabe: Transfer vs. DNS
- **Transfer:** Domain wird zum Agentur-/Hosting-Account umgezogen (Auth-Code nötig).
- **DNS:** Domain bleibt beim Kunden; nur A/CNAME-Records zeigen auf das Hosting.

## Kauf vs. Leasing
- **Kauf:** Einmalpreis inkl. Quellcode-Übergabe; Wartung optional.
- **Leasing:** Monatliche Rate inkl. Hosting, Wartung & Pflege (Laufzeit 12 Monate).

## Assets & Lizenz
Berg- und Logo-Assets vom Kunden bereitgestellt. Wolken-/Fog-Texturen generiert
und frei im Projekt nutzbar. Liste aller Assets: `src/assets/*.asset.json`.
