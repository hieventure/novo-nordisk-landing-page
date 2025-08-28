### High-level plan to convert the Figma to a production-ready site

Reference: [Figma file](https://www.figma.com/design/dc4yE7MaMRNYGcZMW1iKVS/Untitled?node-id=107-4&t=gmll5bsojaoatxwE-0)

- **Scope**

  - Single-page event landing for Ozempic “The Power of Less” with countdown, date/time, venue + map, two CTAs, disclaimer, and QR code.

- **Tech/architecture**

  - React 18 + Vite + TypeScript (existing).
  - Tailwind CSS for styling; tokens pulled from Figma via MCP.
  - Asset pipeline via MCP to download all icons/illustrations/QR/map images into `src/assets/`.
  - Alias `@` → `src` for clean imports.

- **Files to add**

  - `src/pages/Landing.tsx` (main page)
  - `src/components/Countdown.tsx`
  - `src/components/GradientRing.tsx` (hero O-ring)
  - `src/components/FeaturePills.tsx` (3 control icons)
  - `src/components/MapCard.tsx`
  - `src/components/CTAGroup.tsx`
  - `src/lib/ics.ts` (generate .ics without deps)
  - `src/content/event.ts` (all event copy, times, map link, QR asset path, locale)
  - Tailwind config + fonts loaded per Figma

- **Design token ingestion (MCP)**

  - Pull colors, radius, shadows, spacing, fonts from the specific node.
  - Map to Tailwind theme extensions (colors, fontFamily, boxShadow, borderRadius).
  - Export assets: logos, hero rings/gradients, feature icons, map image, QR.

- **Implementation phases**

  1. Setup
     - Install Tailwind, PostCSS, Autoprefixer; configure `content` globs and `@` alias.
     - Add Tailwind base/components/utilities to `src/index.css`.
  2. Tokens & assets
     - Extend `tailwind.config` from Figma tokens.
     - Import web fonts per Figma and preload primary weights.
     - Download/export all image/SVG assets via MCP into `src/assets/`.
  3. Layout structure
     - Build responsive container with background waves/gradients per design.
     - Header: Novo Nordisk + Ozempic logos.
     - Hero: title “THE POWER OF LESS” and decorative gradient ring with mini icons.
     - FeaturePills: three benefits with captions.
  4. Interactivity
     - Countdown to event date using `Asia/Ho_Chi_Minh` timezone; graceful “Started” state.
     - CTA “SAVE THE DATE” triggers download of `.ics`; “XÁC NHẬN THAM DỰ” links to RSVP URL.
     - MapCard shows Figma map image with “Open in Google Maps” link.
  5. Content blocks
     - Time + weekday + date line styled per Figma.
     - Venue block with icon and address.
     - Disclaimer paragraph.
     - QR code image with caption.
  6. Responsiveness & accessibility
     - Mobile-first; scale typography and spacing per breakpoints.
     - Semantic roles, focus states, keyboard support; alt text on images; buttons labeled in Vietnamese.
  7. QA/perf
     - Lighthouse pass (>= 90s), CLS-safe fonts, lazy-load heavy images, preconnect for fonts.
     - Basic unit tests for `Countdown` and `.ics` generator.
  8. Delivery
     - Build scripts, README usage notes, and deploy preview (Netlify/Vercel ready).

- **Component inventory (from the design)**

  - `HeaderLogos`, `HeroTitle`, `GradientRing`, `FeaturePills`, `Countdown`, `EventMetaRow`, `VenueBlock`, `MapCard`, `CTAGroup`, `Disclaimer`, `QrSection`, `FooterNote` (if needed).

- **Data model (`src/content/event.ts`)**

  - `title`, `startDateTime` (ISO), `endDateTime` (ISO), `timezone`, `locationName`, `address`, `googleMapsUrl`, `rsvpUrl`, `qrImage`, `brandAssets`, i18n strings.

- **Open questions to confirm before implementation**
  - RSVP target for “XÁC NHẬN THAM DỰ” (URL or mailto?).
  - Exact timezone (assume Asia/Ho_Chi_Minh) and whether 07:30 AM should be locked to that TZ regardless of viewer location.
  - Static map image vs interactive embed.
  - QR code target (same RSVP URL or different?).
  - Any analytics or consent requirements.
