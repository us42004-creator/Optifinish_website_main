# OptiFinish — Products Category Hub Pages
## Design, Copy & Implementation Plan

Value Added Coating Solutions Pvt. Ltd. (VACSPL)  
OptiFinish Website Revamp  
May 2026 — For Team Review & Approval

---

## 1. Overview

This document covers the complete plan for all five product category hub pages on the new OptiFinish website. These are the pages a visitor lands on when clicking any product category — either from the homepage "What We Offer" section or from the main Products navigation.

All five pages currently return a 404. This plan defines their structure, visual design, copy, and technical implementation from scratch.

### Pages Being Built

| URL | Category | Theme |
|---|---|---|
| `/products/optifinish-manufactured` | OptiFinish Manufactured | Dark / Yellow |
| `/products/automation` | OptiFinish Automation | Dark / Yellow |
| `/products/gema` | GEMA | Light / Ink |
| `/products/durr` | Dürr | Light / Ink |
| `/products/vinayak` | Vinayak Agencies | Light / Ink |

These are **category hub pages** — one level above individual product detail pages. Their job is to orient the visitor, show what's in the range, and route them to either an enquiry or a product detail page (detail pages are a future layer; not in scope here).

---

## 2. What These Pages Are Not

These pages are **not** product detail pages. They do not need:
- Technical datasheets
- In-depth spec tables
- CAD drawings or downloads

Those belong on individual product pages (`/products/gema/manual-gun` etc.) which will be built in a future phase.

What these pages do need:
- Clear category identity and positioning
- A scannable product roster with enough context to recognise what each product is
- An easy path to enquire or learn more
- A way to navigate across categories without going back to the homepage

---

## 3. Site Architecture Context

```
/products                          ← future products index (not in scope)
├── /optifinish-manufactured       ← THIS PLAN
├── /automation                    ← THIS PLAN
├── /gema                          ← THIS PLAN
├── /durr                          ← THIS PLAN
└── /vinayak                       ← THIS PLAN
    └── (individual detail pages — future phase)
```

The homepage `WhatWeOffer` section already has five cards linking to these five URLs. Those links are live but currently 404.

---

## 4. Visual Design System

### 4.1 Two Themes

The website uses a deliberate visual split between OptiFinish's own products and partner/sister-concern products. This reinforces the brand ownership distinction — visitors should feel the difference between what OptiFinish makes and what it supplies.

---

#### Theme A — Dark / Yellow
**Applies to:** `/products/optifinish-manufactured` and `/products/automation`

This is the OptiFinish brand voice in full — confident, dark, premium industrial.

| Element | Value |
|---|---|
| Page background | `#070809` (void black) |
| Hero background | `#070809` |
| Primary accent | `#FECE00` (yellow) |
| Body text | `white/70` |
| Muted text | `white/35` |
| Tag pill | Yellow fill, black text |
| Product card bg | `bg-yellow/[0.03]` |
| Product card border | `border-yellow/10` |
| Card hover border | `border-yellow/20` |
| Section dividers | `border-white/[0.06]` |
| Grid overlay | Subtle yellow grid at `opacity-[0.028]` |

---

#### Theme B — Light / Ink
**Applies to:** `/products/gema`, `/products/durr`, `/products/vinayak`

Partners and the sister concern use the light editorial tone — clean, professional, trust-building.

| Element | Value |
|---|---|
| Page background | `#f1efea` (surface) |
| Hero background | `#f1efea` |
| Primary accent | `#0A0A0A` (ink) |
| Body text | `black/60` |
| Muted text | `black/40` |
| Tag pill | White border, transparent fill, ink text |
| Product card bg | `#faf8f4` |
| Product card border | `border-black/[0.08]` |
| Card hover border | `border-black/[0.15]` |
| Partner logo | Displayed in hero section |

---

### 4.2 Typography

| Use | Font | Size | Weight |
|---|---|---|---|
| Hero headline | Instrument Serif | `clamp(3.5rem, 7vw, 7rem)` | Semibold |
| Section heading | Instrument Serif | `2.5rem–4rem` | Semibold |
| Product card name | Instrument Serif | `1.4rem` | Semibold |
| Eyebrow / label | Inter | `0.56rem`, tracking `0.22em` | Black (900) |
| Body / description | Inter | `0.85rem` | Regular |
| Spec bullets | Inter | `0.75rem` | Medium |
| CTA text | Inter | `0.62rem`, tracking `0.18em` | Black (900) |

---

### 4.3 Spacing & Layout

- Max content width: `max-w-7xl` with `px-5 md:px-8`
- Section padding: `py-20 md:py-28`
- Card grid gap: `gap-5`
- Card corner radius: `rounded-2xl`
- Card padding: `p-5` or `p-6`

---

## 5. Shared Page Template

Every category page follows the same four-section structure. Individual pages deviate only in content and theme — never in structure.

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  SECTION 1 — CATEGORY HERO                                       │
│  Full-width. Dark for A-theme, light for B-theme.               │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  [breadcrumb]  Products  /  Category Name                │   │
│  │                                                          │   │
│  │  [tag pill]   e.g. "In-house Manufactured"               │   │
│  │                                                          │   │
│  │  Category Headline                      [Partner logo]   │   │
│  │  in large serif type.                   (if applicable)  │   │
│  │                                                          │   │
│  │  One-line description of what this category is.          │   │
│  │                                                          │   │
│  │  [stat badge]  [stat badge]  [stat badge]                │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  SECTION 2 — PRODUCT GRID                                        │
│  Same bg as hero. Grid of product cards.                        │
│                                                                  │
│  [eyebrow]  Product Range                                        │
│  [heading]  What's in this range                                 │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ [image/tile] │  │ [image/tile] │  │ [image/tile] │          │
│  │              │  │              │  │              │          │
│  │ Product Name │  │ Product Name │  │ Product Name │          │
│  │ Subtitle     │  │ Subtitle     │  │ Subtitle     │          │
│  │              │  │              │  │              │          │
│  │ Description  │  │ Description  │  │ Description  │          │
│  │ in 2 lines.  │  │ in 2 lines.  │  │ in 2 lines.  │          │
│  │              │  │              │  │              │          │
│  │ ● Spec 1     │  │ ● Spec 1     │  │ ● Spec 1     │          │
│  │ ● Spec 2     │  │ ● Spec 2     │  │ ● Spec 2     │          │
│  │ ● Spec 3     │  │ ● Spec 3     │  │ ● Spec 3     │          │
│  │              │  │              │  │              │          │
│  │ [Learn more] │  │ [Learn more] │  │ [Learn more] │          │
│  │ [Enquire →]  │  │ [Enquire →]  │  │ [Enquire →]  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  SECTION 3 — CROSS-CATEGORY NAV                                  │
│  Light bg break. Shows the other 4 product ranges.              │
│                                                                  │
│  Explore other product ranges →                                  │
│                                                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│  │ OptiFinish  │ │ Automation  │ │    GEMA     │ │  Vinayak  │ │
│  │    Mfg      │ │             │ │             │ │ Agencies  │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘ │
│  (current page omitted from the strip)                          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  SECTION 4 — BOTTOM CTA                                          │
│  Dark. Same as homepage HomeCTA section.                        │
│                                                                  │
│  Ready to spec your line?                                        │
│  Talk to OptiFinish.                                             │
│                                                                  │
│  [  Get in Touch  →  ]                                           │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 6. ProductCard Component

Every product in every category uses the same card component. The card adapts visually to the page theme (dark or light) but the structure is identical.

### Card Wireframe

```
┌───────────────────────────────────────────┐
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │                                     │  │
│  │         IMAGE / PLACEHOLDER         │  │  ← 16:9 aspect ratio
│  │                                     │  │    Sand tile if no image
│  │  [category chip — top left]         │  │    Yellow top bar accent
│  │                                     │  │    on placeholder
│  └─────────────────────────────────────┘  │
│                                           │
│  Product Name                             │  ← Serif, 1.4rem, semibold
│  Subtitle / Series Name                   │  ← Inter, 0.75rem, muted
│                                           │
│  Short description of what this           │  ← 2 lines max, Inter 0.82rem
│  product does and who it's for.           │
│                                           │
│  ──────────────────────────────────────   │  ← thin border separator
│                                           │
│  ● Spec bullet one                        │  ← Inter 0.72rem
│  ● Spec bullet two                        │
│  ● Spec bullet three                      │
│  ● Spec bullet four (if applicable)       │
│                                           │
│  ──────────────────────────────────────   │
│                                           │
│  [  Learn more →  ]  [  Enquire  ]        │  ← ghost + yellow buttons
│                                           │
└───────────────────────────────────────────┘
```

### Card Props

| Prop | Type | Description |
|---|---|---|
| `name` | string | Product name |
| `subtitle` | string | Series/model name |
| `description` | string | 1–2 sentence description |
| `specs` | string[] | 3–4 bullet points |
| `image` | string? | Path to product image (optional) |
| `enquireSlug` | string | Pre-fills `/contact?product=[slug]` |
| `learnMoreHref` | string | Links to detail page (greyed out until built) |
| `externalHref` | string? | External site link (Z-TAP only) |
| `theme` | 'dark' \| 'light' | Inherits from page theme |
| `wide` | boolean? | col-span-2, for Z-TAP hero card |

### Card CTAs

Each card has two buttons:
- **"Learn more →"** — ghost/outline button, links to `/products/[category]/[slug]`. Shows as muted until that detail page is built.
- **"Enquire"** — solid yellow (Theme A) or solid ink (Theme B) button, links to `/contact?product=[enquireSlug]`

Z-TAP card only: third link — external icon, opens Z-TAP dedicated site in a new tab.

---

## 7. File Structure

```
build/optifinish/src/
├── app/
│   └── products/
│       ├── layout.tsx                        ← breadcrumb shell, shared nav
│       ├── optifinish-manufactured/
│       │   └── page.tsx
│       ├── automation/
│       │   └── page.tsx
│       ├── gema/
│       │   └── page.tsx
│       ├── durr/
│       │   └── page.tsx
│       └── vinayak/
│           └── page.tsx
│
└── components/
    └── products/
        ├── ProductCard.tsx                   ← shared card component
        ├── CategoryHero.tsx                  ← shared hero section
        └── CrossCategoryNav.tsx              ← shared nav strip
```

---

---

## 8. Category Pages — Full Detail

---

### 8.1 OptiFinish Manufactured

**URL:** `/products/optifinish-manufactured`  
**Theme:** A — Dark / Yellow  
**Tag pill:** In-house Manufactured  
**Card grid:** 3-col desktop, 2-col tablet, 1-col mobile  
**Total products:** 9

---

#### Hero Wireframe

```
┌──────────────────────────────────────────────────────────────────┐
│  bg: #070809                                                     │
│  [subtle yellow grid overlay at opacity 0.028]                  │
│                                                                  │
│  Products  /  OptiFinish Manufactured                            │  ← breadcrumb
│                                                                  │
│  ┌──────────────────────┐                                        │
│  │  In-house Manufactured │  ← yellow pill                      │
│  └──────────────────────┘                                        │
│                                                                  │
│  Industrial finishing systems.              [no partner logo]    │
│  Designed and built by us.                                       │
│                                                                  │
│  Every powder coating plant, oven, booth, and pretreatment       │
│  line we build comes from our own manufacturing and R&D          │
│  facility in Greater Noida — engineered to your line             │
│  requirements and commissioned by our team.                      │
│                                                                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                 │
│  │    700+    │  │    75+     │  │  14+ Years │                 │
│  │  Manual    │  │ Conveyor   │  │    In      │                 │
│  │  Plants    │  │  Lines     │  │ Production │                 │
│  └────────────┘  └────────────┘  └────────────┘                 │
└──────────────────────────────────────────────────────────────────┘
```

---

#### Product Cards

**Card 1 — Powder Coating Plant**
- **Name:** Powder Coating Plant
- **Subtitle:** Conveyorised Line — Manual & Automatic
- **Description:** A complete turnkey powder coating line built, assembled, and commissioned by OptiFinish — integrating pretreatment, powder booth, curing oven, and conveyor systems for continuous production.
- **Specs:**
  - Manual and conveyorised configurations; batch or continuous production
  - Full line design: PT stages → booth → oven → conveyor → electrical control panel
  - Custom-engineered to part size, throughput, and substrate requirements
  - 700+ manual plants and 75+ conveyor lines installed across India
- **Enquire slug:** `powder-coating-plant`

---

**Card 2 — Curing Oven**
- **Name:** Curing Oven
- **Subtitle:** Gas-Fired & Electric — Batch and Conveyorised
- **Description:** Manufactured in-house to each installation's throughput and part-size requirements — OptiFinish curing ovens deliver consistent temperature uniformity for complete powder cure across steel, aluminium, and fabricated components.
- **Specs:**
  - Operating range: 180–200°C; adjustable to process requirements
  - Ecoflame gas burner; 5HP drive; 200mm Rockwool insulation on all panels
  - Internal dimensions matched to booth and conveyor layout
  - Available as standalone batch ovens or inline with conveyor lines
- **Enquire slug:** `curing-oven`

---

**Card 3 — Powder Spray Booth**
- **Name:** Powder Spray Booth
- **Subtitle:** MS / SS-304 — Manual & Automatic
- **Description:** A powder spray enclosure designed for 98% powder recovery with an integrated cyclone and bag filter — manufactured in MS or full SS-304 construction to suit production environment and product requirements.
- **Specs:**
  - Standard internal dimensions: 5000 × 1200 × 3050 mm (custom available)
  - SS-304 Venturi powder recovery system; 98% recovery rate
  - 20HP suction motor; Siemens-class electrical panel
  - Compatible with all major guns including GEMA OptiFlex and OptiGun series
- **Enquire slug:** `powder-spray-booth`

---

**Card 4 — Liquid Spray Booth**
- **Name:** Liquid Spray Booth
- **Subtitle:** MS Construction — Wet Paint Applications
- **Description:** A downdraft liquid spray booth for solvent-based and water-based paint application — with high-velocity air extraction, water wash or dry filter options, and compliant exhaust for CPCB norms.
- **Specs:**
  - Internal dimensions: 2450 × 1500 × 1800 mm (custom available)
  - 7000 CMH airflow; 5HP suction; MS sheet construction
  - Water wash or dry filter for paint mist capture
  - Suitable for Dürr liquid coating guns and general spray applications
- **Enquire slug:** `liquid-spray-booth`

---

**Card 5 — SS Booth System**
- **Name:** SS Booth System
- **Subtitle:** Pollution-Free — Full SS-304 Build
- **Description:** A fully stainless-steel powder coating booth designed for clean environments, food-adjacent industries, and operations requiring easy washdown — zero-rust construction with full powder recovery.
- **Specs:**
  - Full SS-304 construction: panels, duct, Venturi, hopper, and frame
  - Pollution-free operation: 98% powder recovery, clean exhausts
  - Suitable for pharmaceutical, food equipment, medical, and precision engineering
  - Quick colour change capability with dedicated recovery separation
- **Enquire slug:** `ss-booth-system`

---

**Card 6 — Plastic / PP Booth**
- **Name:** Plastic / PP Booth
- **Subtitle:** Quick Colour Change — Small Batch
- **Description:** A polypropylene (PP) constructed spray booth for operations requiring rapid colour changes — lightweight, corrosion-resistant, and easy to clean, ideal for custom coating shops and small-batch production.
- **Specs:**
  - Full PP construction — no rust, no contamination risk
  - Fast clean-out for colour changes without cross-contamination
  - Compact footprint for smaller production floors
  - Integrated suction and recovery; compatible with standard manual guns
- **Enquire slug:** `plastic-booth`

---

**Card 7 — Cyclone & Dust Collector**
- **Name:** Cyclone & Dust Collector
- **Subtitle:** 98% Recovery — 3,000 to 32,000 CMH
- **Description:** A modular powder recovery and filtration system — deployed as a standalone unit or integrated within an OptiFinish booth — delivering 98% powder reclaim across a wide airflow range.
- **Specs:**
  - Airflow range: 3,000–32,000 CMH (sized to booth and production load)
  - 98% cyclone powder recovery; secondary bag filter for clean exhaust
  - Compatible with all powder types including metallic, textured, and fine-particle grades
  - Modular design for easy maintenance and filter replacement
- **Enquire slug:** `cyclone-dust-collector`

---

**Card 8 — Pretreatment Line (PT Line)**
- **Name:** Pretreatment Line (PT Line)
- **Subtitle:** Iron Phosphating & Multi-Stage Systems
- **Description:** A multi-stage pretreatment system designed to prepare steel, aluminium, and galvanised substrates for maximum powder adhesion — from simple 3-stage iron phosphating to full 7-stage zinc phosphate systems.
- **Specs:**
  - 3-stage to 7-stage configurations: degreasing, phosphating, passivation, DI rinse
  - Spray tunnel or dip tank design depending on part geometry and throughput
  - Electric or steam heating; full MS/SS tank options
  - Integrated with conveyor or standalone batch line
- **Enquire slug:** `pt-line`

---

**Card 9 — Wood Finish Oven (Sublimation)**
- **Name:** Wood Finish Oven
- **Subtitle:** Sublimation Transfer — Aluminium Profiles
- **Description:** A specialist curing oven designed for thermal sublimation transfer of wood-grain, stone, and custom patterns onto powder-coated aluminium extrusions — delivering a durable, photo-realistic decorative finish.
- **Specs:**
  - Optimised temperature uniformity for sublimation transfer film bonding
  - Suitable for aluminium doors, windows, profiles, and architectural extrusions
  - Custom chamber sizing for profile lengths and batch volumes
  - Can be combined with standard powder coating line as a finishing stage
- **Enquire slug:** `wood-finish-oven`

---

---

### 8.2 OptiFinish Automation

**URL:** `/products/automation`  
**Theme:** A — Dark / Yellow  
**Tag pill:** Proprietary Technology  
**Card grid:** 2-col desktop (wider cards — fewer products), 1-col mobile  
**Total products:** 4  
**Note:** Z-TAP card spans both columns (wide/hero variant)

---

#### Hero Wireframe

```
┌──────────────────────────────────────────────────────────────────┐
│  bg: #070809                                                     │
│  [subtle yellow grid overlay at opacity 0.028]                  │
│                                                                  │
│  Products  /  OptiFinish Automation                              │
│                                                                  │
│  ┌───────────────────────┐                                       │
│  │  Proprietary Technology │  ← yellow pill                     │
│  └───────────────────────┘                                       │
│                                                                  │
│  Automation that thinks                     [no partner logo]    │
│  like a coater.                                                  │
│                                                                  │
│  Every automation product from OptiFinish is developed entirely  │
│  in-house — from the Z-TAP robot to the ZA01 reciprocator and   │
│  the Vibratory Sieve Machine. No licensing. No rebadging. Ours.  │
│                                                                  │
│  ┌────────────┐  ┌────────────┐  ┌──────────────┐               │
│  │   99.4%    │  │    3×      │  │    100%      │               │
│  │   Coat     │  │ Throughput │  │  Proprietary │               │
│  │  Accuracy  │  │  Increase  │  │ Development  │               │
│  └────────────┘  └────────────┘  └──────────────┘               │
└──────────────────────────────────────────────────────────────────┘
```

---

#### Product Grid Wireframe

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │   Z-TAP ROBOT SYSTEM           ← col-span-2, wide card    │  │
│  │                                                            │  │
│  │   [image / dark visual placeholder — 21:9 aspect]         │  │
│  │                                                            │  │
│  │   Mimic Once. Perfect Every Time.                          │  │
│  │   Subtitle: 6-Axis Powder Coating Robot                    │  │
│  │                                                            │  │
│  │   Z-TAP is OptiFinish's flagship powder coating robot...   │  │
│  │                                                            │  │
│  │   ● 99.4% coat accuracy; ±0.5mm path repeatability        │  │
│  │   ● 3× throughput increase over manual operation           │  │
│  │   ● ↓80% setup time — program build in under 2 minutes    │  │
│  │   ● <2% defect rate; tag recognition latency <50ms        │  │
│  │   ● 6-axis Fairino robot base with IMU motion capture     │  │
│  │   ● Fully proprietary — developed at Greater Noida R&D    │  │
│  │                                                            │  │
│  │   [Learn more →]  [Enquire]  [Z-TAP site ↗]              │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────┐  ┌──────────────────────────┐      │
│  │  OPTI RECIP ZA01         │  │  PS VIBRATORY SIEVE       │      │
│  │  [image placeholder]     │  │  [image placeholder]      │      │
│  │  Vertical Reciprocator   │  │  Vibratory Sieving Unit   │      │
│  │  ...                     │  │  ...                      │      │
│  │  [Learn more] [Enquire]  │  │  [Learn more] [Enquire]   │      │
│  └──────────────────────────┘  └──────────────────────────┘      │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  AUTO SPRAY OPTIMISATION                                  │    │
│  │  [image placeholder]                                      │    │
│  │  Reciprocator + Gun Control — Integrated                  │    │
│  │  ...                                                      │    │
│  │  [Learn more] [Enquire]                                   │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

#### Product Cards

**Card 1 — Z-TAP Robot System** *(wide hero card)*
- **Name:** Z-TAP Robot System
- **Subtitle:** Mimic Once. Perfect Every Time.
- **Description:** Z-TAP is OptiFinish's flagship powder coating robot — a 6-axis system that captures a human operator's spray motion once using IMU sensors and LightRoom capture, then replicates it with mechanical precision across every part. No programming. No code. Ready in under 2 minutes.
- **Specs:**
  - 99.4% coat accuracy; ±0.5mm path repeatability
  - 3× throughput increase over manual operation
  - ↓80% setup time — program build in under 2 minutes
  - <2% defect rate; tag recognition latency <50ms
  - 6-axis Fairino robot base with IMU-based motion capture
  - Fully proprietary software and capture system — developed at Greater Noida R&D facility
- **CTAs (3):**
  - Enquire → `/contact?product=z-tap`
  - Learn more → `/products/automation/z-tap`
  - Z-TAP site ↗ (external, new tab)

---

**Card 2 — Opti Recip ZA01**
- **Name:** Opti Recip ZA01
- **Subtitle:** Vertical Reciprocator — Proprietary Build
- **Description:** A slim-column vertical reciprocator built entirely in-house by OptiFinish — designed as the right-sized entry into automated gun traversal for batch and conveyorised lines. Accommodates multiple automatic guns, handles both short and long stroke operations, and keeps maintenance to a minimum.
- **Specs:**
  - Slim column design — space-efficient mounting of up to 6 automatic guns
  - Short and long stroke operation; horizontal or vertical gun arrangement
  - Advanced synchronized motor for smooth, consistent continuous traversal
  - Minimal maintenance design — quick service procedures, no specialist tooling
  - Compatible with GEMA OptiGun and other standard automatic gun mounts
  - Designed and manufactured at OptiFinish's Greater Noida R&D facility
- **Enquire slug:** `za01`

---

**Card 3 — PS Vibratory Sieve Machine**
- **Name:** PS Vibratory Sieve Machine
- **Subtitle:** Recovered Powder — Vibratory Sieving Unit
- **Description:** A vibratory sieve unit developed in-house for seamless integration into any powder coating system — delivering reliable recovered-powder processing with minimal disruption during colour changes and everyday maintenance.
- **Specs:**
  - Vibratory sieving mechanism for continuous, gentle powder separation
  - Designed for easy integration into existing booth and cyclone setups
  - Colour-change ready — fast cleaning between powder batches
  - Removes lumps, agglomerates, and foreign particles before powder re-enters hopper
  - Low maintenance design; accessible internal components for quick service
- **Enquire slug:** `sieve-machine`

---

**Card 4 — Auto Spray Optimisation**
- **Name:** Auto Spray Optimisation
- **Subtitle:** Reciprocator + Gun Control — Integrated
- **Description:** An integrated control system combining reciprocator movement, gun triggering, and conveyor speed synchronisation — ensuring powder is only sprayed when a part is in the booth, reducing waste and improving line efficiency.
- **Specs:**
  - Part-presence detection for trigger-on-demand powder application
  - Synchronised with conveyor speed for consistent film build per part
  - Reduces powder waste by eliminating spray during gaps between parts
  - Retrofittable onto existing OptiFinish or third-party booth installations
- **Enquire slug:** `auto-spray-optimisation`

---

---

### 8.3 GEMA

**URL:** `/products/gema`  
**Theme:** B — Light / Ink  
**Tag pill:** Authorised Partner  
**Card grid:** 2-col desktop, 1-col mobile  
**Total products:** 4  
**Note:** GEMA wordmark logo displayed in hero

---

#### Hero Wireframe

```
┌──────────────────────────────────────────────────────────────────┐
│  bg: #f1efea                                                     │
│                                                                  │
│  Products  /  GEMA                                               │
│                                                                  │
│  ┌──────────────────────────┐                                    │
│  │  Authorised Partner       │  ← white border pill             │
│  └──────────────────────────┘                                    │
│                                                                  │
│  World-standard powder coating        ┌─────────────────────┐   │
│  equipment for Indian industry.       │   GEMA  [wordmark]  │   │
│                                       └─────────────────────┘   │
│  OptiFinish is an authorised GEMA partner in India —             │
│  supplying and supporting the full range of GEMA guns,           │
│  reciprocators, and powder management systems.                   │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────────────────┐    │
│  │  60+ Years  │  │   110 kV    │  │   4 Product Lines     │    │
│  │   Swiss     │  │  Charging   │  │  via OptiFinish India  │    │
│  │ Engineering │  │  Capacity   │  │                       │    │
│  └─────────────┘  └─────────────┘  └───────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

---

#### Product Cards

**Card 1 — Manual Powder Coating Gun**
- **Name:** Manual Powder Coating Gun
- **Subtitle:** OptiFlex Pro Series
- **Description:** GEMA's manual gun range covers everything from quick colour changes to difficult powders — engineered for reliable performance across batch and production environments.
- **Specs:**
  - Colour change in as fast as 35 seconds (Pro Q model)
  - Up to 600 g/min powder output (Pro F Spray)
  - Box-fed, hopper-fed, and wall-mount configurations available
- **Enquire slug:** `gema-manual-gun`

---

**Card 2 — Automatic Powder Coating Gun**
- **Name:** Automatic Powder Coating Gun
- **Subtitle:** OptiGun with PowerBoost®
- **Description:** GEMA's flagship automatic gun delivers the highest powder charging capacity in the industry — engineered for consistent finish quality and minimal rework on demanding production lines.
- **Specs:**
  - 110 kV PowerBoost® — highest charging capacity available
  - PCC Technology & SuperCorona for penetration and reduced orange peel
  - DVC Technology for precise, reproducible powder output control
- **Enquire slug:** `gema-automatic-gun`

---

**Card 3 — Reciprocators & Automation Axes**
- **Name:** Reciprocators & Automation Axes
- **Subtitle:** ZA Series + Axis Systems
- **Description:** GEMA's reciprocator range automates gun movement across vertical and horizontal axes — reducing manpower, improving coating consistency, and enabling programming-free operation via Dynamic Contour Detection.
- **Specs:**
  - ZA07 / ZA08 / ZA15 / ZA16 / ZA17 vertical reciprocator models
  - Horizontal axis systems (XT, UA, YT series) for position adjustment and colour-change cleaning
  - Dynamic Contour Detection — no programming required
- **Enquire slug:** `gema-reciprocators`

---

**Card 4 — OptiCentre Powder Management** *(visually differentiated — flagship)*
- **Name:** OptiCentre Powder Management
- **Subtitle:** OC08 — Fully Automatic Powder Center
- **Description:** A closed-circuit powder management centre that automates hopper filling, sieving, and cleaning — delivering real-time batch tracking and clean working conditions at lower operating cost.
- **Specs:**
  - Fully automatic cleaning of hopper and powder-carrying components
  - Integrated precision load cell with per-batch fresh powder tracking
  - MagicControl 4.0 integration with GemaConnect dashboard
- **Enquire slug:** `gema-opticentre`

---

---

### 8.4 Dürr

**URL:** `/products/durr`  
**Theme:** B — Light / Ink  
**Tag pill:** Authorised Distributor  
**Card grid:** 3-col desktop, 2-col tablet, 1-col mobile  
**Total products:** 9  
**Note:** Dürr wordmark logo displayed in hero

---

#### Hero Wireframe

```
┌──────────────────────────────────────────────────────────────────┐
│  bg: #f1efea                                                     │
│                                                                  │
│  Products  /  Dürr                                               │
│                                                                  │
│  ┌──────────────────────────┐                                    │
│  │  Authorised Distributor   │  ← white border pill             │
│  └──────────────────────────┘                                    │
│                                                                  │
│  High-precision liquid coating              ┌─────────────────┐  │
│  technology for industrial finishing.       │  DÜRR [wordmark]│  │
│                                             └─────────────────┘  │
│  OptiFinish supplies Dürr liquid coating equipment in India —    │
│  spray guns, pump systems, and electronic dosing for demanding   │
│  paint applications.                                             │
│                                                                  │
│  ┌──────────────┐  ┌─────────────┐  ┌───────────────────────┐   │
│  │ Equipment    │  │  9 Product  │  │     2K & 3K           │   │
│  │    Only      │  │   Lines     │  │  Dosing Capability    │   │
│  └──────────────┘  └─────────────┘  └───────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

*Note on "Equipment Only" stat badge: OptiFinish supplies Dürr hardware — not full plant integration or service for Dürr systems. This should be stated clearly so buyers have correct expectations.*

---

#### Product Cards

**Card 1 — Cup Gun**
- **Name:** Cup Gun
- **Subtitle:** EcoGun 116 / EcoGun 910 — Gravity Feed
- **Description:** A manual gravity-feed air spray gun suited for smaller coating areas, touch-up work, and furniture lacquering — compact, easy to handle, and reliable across solvent and water-based paints.
- **Specs:**
  - EcoGun 116: gravity feed, up to 6 bar, 1–4mm nozzle range
  - EcoGun 910: gravity feed, up to 8 bar, optimised for fine finish applications
  - Compatible with solvent and water-based coatings; variants for enamels and glazes
- **Enquire slug:** `durr-cup-gun`

---

**Card 2 — HVLP Spray Gun**
- **Name:** HVLP Spray Gun
- **Subtitle:** EcoGun AS MAN — High Volume Low Pressure variant
- **Description:** A high-transfer-efficiency variant of the EcoGun AS MAN line, operating at low atomisation pressure — ideal for applications where overspray reduction and material savings are the priority.
- **Specs:**
  - Low-pressure atomisation for reduced overspray and better transfer efficiency
  - Suitable for topcoats, clear coats, and fine-finish applications
  - Compatible with solvent and water-based paints
- **Enquire slug:** `durr-hvlp-gun`

---

**Card 3 — Airless Spray Gun**
- **Name:** Airless Spray Gun
- **Subtitle:** EcoGun 246 / EcoGun 249 — High-Pressure Application
- **Description:** A high-pressure airless spray gun built for anti-corrosion work on steel structures and heavy-duty wood coating — with modular, reversible nozzles for different output requirements.
- **Specs:**
  - EcoGun 246 / 249: high-pressure hydraulic atomisation — no carrier air needed
  - Modular reversible nozzles in multiple tip sizes for different spray patterns
  - Designed for anti-corrosion coatings on structural steel and industrial substrates
- **Enquire slug:** `durr-airless-gun`

---

**Card 4 — Air Assist Spray Gun**
- **Name:** Air Assist Spray Gun
- **Subtitle:** EcoGun AA — High-Viscosity Application
- **Description:** Designed for high-viscosity materials under demanding surface quality requirements — the preferred choice for solid wood furniture finishing and applications requiring a fine, controlled finish.
- **Specs:**
  - Handles high-viscosity paints, lacquers, and adhesives
  - Separate air regulation for round and flat spray patterns
  - Fed by EcoPump VP packages; stainless steel material path (auto variant)
- **Enquire slug:** `durr-air-assist-gun`

---

**Card 5 — Electrostatic Spray Gun**
- **Name:** Electrostatic Spray Gun
- **Subtitle:** EcoGun AS — DC & EC Variants
- **Description:** An electrostatic manual spray gun that charges paint particles for superior wrap-around coverage and reduced overspray — available in Direct Charge (DC) and External Charge (EC) variants for solvent and water-based paints.
- **Specs:**
  - DC variant (EcoGun AS MAN DC): direct charge electrode for overspray reduction
  - EC variant (EcoGun AS MAN EC): external charge — compatible with water-based paints
  - Significant material savings through electrostatic attraction
- **Enquire slug:** `durr-electrostatic-gun`

---

**Card 6 — Bell Atomiser**
- **Name:** Bell Atomiser
- **Subtitle:** Rotary Electrostatic — Automatic
- **Description:** A high-speed rotary atomiser delivering ultra-fine, uniform droplet distribution for premium finish quality on automotive and industrial panels — fully automatic, electrostatically charged. Confirmed as supplied by OptiFinish.
- **Specs:**
  - Rotary atomisation for finest droplet size and film uniformity
  - High transfer efficiency — significantly reduces paint consumption
  - Designed for automated lines with consistent high-volume output
- **Enquire slug:** `durr-bell-atomiser`

---

**Card 7 — EcoPump Systems**
- **Name:** EcoPump Systems
- **Subtitle:** Fluid Handling for Paint Shops
- **Description:** A family of air-operated and electric piston, diaphragm, and shovel plate pumps built for paint circulation, delivery, and transfer — covering water-based and solvent paints, mastics, adhesives, and high-viscosity fluids.
- **Specs:**
  - HP Series: 400 / 800 / 1,600 cc/stroke horizontal piston; VP Series: up to 360 bar vertical piston
  - EcoPump HP 400 (4.2 kg), HP 800 (5.8 kg), HP 1600 (8 kg) — flow 8–32 L/min
  - AD diaphragm variant for low-shear applications; HPE electric model (DIN EN 12162 certified)
  - Pre-assembled EcoPump Package modules for quick deployment
- **Enquire slug:** `durr-ecopump`

---

**Card 8 — 2K Dosing System**
- **Name:** 2K Dosing System
- **Subtitle:** EcoDose 2K — Two-Component Electronic Dosing
- **Description:** An electronic dosing system for two-component (2K) paint processes — delivering consistently precise mixing ratios across viscosities, with automatic colour changes and independent flushing circuits.
- **Specs:**
  - Flow rate range: 40–4,000 cc/min; Coriolis or gear flowmeter for volume-controlled dosing
  - Pot life and catalyst ratio monitoring with real-time process alerts
  - Independent flushing circuits for each component — no premixing chamber required
  - Supports water-based and solvent-based 2K formulations
- **Enquire slug:** `durr-ecodose-2k`

---

**Card 9 — 3K Dosing System**
- **Name:** 3K Dosing System
- **Subtitle:** EcoDose 3K — Three-Component Electronic Dosing
- **Description:** An electronic dosing system for three-component (3K) coating formulations — enabling complex paint recipes with precise per-component tracking, automatic colour changes, and real-time pot life monitoring.
- **Specs:**
  - Flow rate range: 40–4,000 cc/min across all three components simultaneously
  - Full per-component volume tracking; mixing ratio accuracy across all three streams
  - Independent flushing circuits — no premixing chamber required
  - Handles water-based, solvent-based, and complex 3K formulations
- **Enquire slug:** `durr-ecodose-3k`

---

---

### 8.5 Vinayak Agencies

**URL:** `/products/vinayak`  
**Theme:** B — Light / Ink  
**Tag pill:** Sister Concern — Vinayak Agencies  
**Card grid:** 3-col desktop, 2-col tablet, 1-col mobile  
**Total products:** 5  
**Special section:** Warehouse credibility strip (between grid and cross-category nav)

**Brand context:**
Vinayak Agencies is a sister concern of OptiFinish (both under VACSPL). It is one of India's largest authorised Kansai Nerolac industrial dealers, with a 2,400 sq. ft. in-house warehouse in Greater Noida.

Authorised for:
- Kansai Nerolac (powder + liquid + touchup + PU/enamel + adhesives)
- Prominent (powder coatings)
- Paramount / Tansy brand (liquid coatings)

---

#### Hero Wireframe

```
┌──────────────────────────────────────────────────────────────────┐
│  bg: #f1efea                                                     │
│                                                                  │
│  Products  /  Vinayak Agencies                                   │
│                                                                  │
│  ┌────────────────────────────────────┐                          │
│  │  Sister Concern — Vinayak Agencies  │  ← white border pill   │
│  └────────────────────────────────────┘                          │
│                                                                  │
│  Industrial paints and coatings.                                 │
│  One stop, always in stock.                                      │
│                                                                  │
│  Vinayak Agencies is one of India's largest authorised Kansai    │
│  Nerolac industrial dealers — with a 2,400 sq. ft. in-house      │
│  warehouse ensuring round-the-clock supply across powder         │
│  coatings, liquid paints, and adhesives.                         │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │ 2,400 sq.ft. │  │     24/7     │  │       3 Brands        │  │
│  │  In-house    │  │    Supply    │  │ Nerolac · Prominent · │  │
│  │  Warehouse   │  │ Availability │  │      Paramount        │  │
│  └──────────────┘  └──────────────┘  └───────────────────────┘  │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │  [Nerolac    │  │  [Prominent  │  │  [Paramount  │           │
│  │   wordmark]  │  │   wordmark]  │  │     logo]    │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│  (brand logo strip — from /images/logos/)                        │
└──────────────────────────────────────────────────────────────────┘
```

**Logo image paths (to be added before implementation):**
- `/images/logos/nerolac.png`
- `/images/logos/prominent.png`
- `/images/logos/paramount.png`

---

#### Product Cards

**Card 1 — Powder Coating Paints**
- **Name:** Powder Coating Paints
- **Subtitle:** Nerolac · Prominent · Paramount
- **Description:** A comprehensive range of thermosetting powder coatings — epoxy, epoxy-polyester, pure polyester, super durable polyester, and polyurethane formulations — stocked in-house and available for immediate dispatch.
- **Specs:**
  - Nerolac: Epoxy (6000), Epoxy-Polyester (6100), Pure Polyester (6200) series
  - Prominent & Paramount: broad colour and finish range for industrial applications
  - ISO 9001 certified supply; REACH & RoHS compliant options available
  - 40+ years of Nerolac powder coating expertise
- **Brand logos on card:** Nerolac + Prominent + Paramount
- **Enquire slug:** `vinayak-powder-paints`

---

**Card 2 — Liquid Industrial Paint**
- **Name:** Liquid Industrial Paint
- **Subtitle:** Kansai Nerolac · Paramount (Tansy brand)
- **Description:** Industrial-grade liquid coating systems from Kansai Nerolac and Paramount's Tansy brand — covering automotive, infrastructure, and heavy engineering applications with proven corrosion resistance and finish quality.
- **Specs:**
  - Kansai Nerolac liquid industrial range — for automotive, infrastructure, and general industry
  - Paramount Tansy brand — liquid coatings for metal and industrial surfaces
  - Available in solvent-based and water-based formulations
  - Stocked at 2,400 sq. ft. Vinayak warehouse for immediate supply
- **Brand logos on card:** Nerolac + Paramount
- **Enquire slug:** `vinayak-liquid-paint`

---

**Card 3 — Touch-up Paints**
- **Name:** Touch-up Paints
- **Subtitle:** Nerolac — Tansy & Paramount
- **Description:** Quick-dry touch-up paint solutions for field repairs and finish correction — Nerolac's Tansy and Paramount range for metal and industrial surfaces, available in aerosol and brush-on formats.
- **Specs:**
  - Nerolac Tansy and Paramount touch-up range for on-site repairs
  - Suitable for powder-coated and liquid-painted metal surfaces
  - Fast dry, colour-matched finish for seamless repairs
- **Brand logos on card:** Nerolac + Paramount
- **Enquire slug:** `vinayak-touchup-paints`

---

**Card 4 — PU & Enamel Paints**
- **Name:** PU & Enamel Paints
- **Subtitle:** Kansai Nerolac — Wood & Metal
- **Description:** High-performance polyurethane and enamel paints from Kansai Nerolac for wood and metal surfaces — delivering rich gloss, anti-yellowing protection, and durability across interior and exterior applications.
- **Specs:**
  - Nerolac PU Enamel 10-in-1: PU-modified alkyd, 3-year warranty, anti-yellowing
  - Nerolac Hi-Gloss Synthetic Enamel: high gloss, smooth finish, stain-resistant
  - Nerolac Satin Enamel: excellent flow and brushability, good washability
  - Suitable for wood, metal, and masonry substrates
- **Brand logos on card:** Nerolac
- **Enquire slug:** `vinayak-pu-enamel`

---

**Card 5 — Adhesives & Tapes**
- **Name:** Adhesives & Tapes
- **Subtitle:** Nerolac — Synthetic & White Glue
- **Description:** Industrial-grade adhesives from Nerolac — synthetic glue and white glue — for bonding and sealing applications in manufacturing and finishing environments.
- **Specs:**
  - Synthetic glue for general-purpose industrial bonding
  - White glue (PVA-based) for wood, paper, and porous materials
  - Part of the Nerolac industrial accessories range
- **Brand logos on card:** Nerolac
- **Enquire slug:** `vinayak-adhesives`

---

#### Warehouse Credibility Section

This section sits **between the product grid and the cross-category nav**, as a dark break unique to the Vinayak page. It establishes supply reliability — a key purchase decision factor for paints and consumables.

```
┌──────────────────────────────────────────────────────────────────┐
│  bg: #0A0A0A (dark break)                                        │
│                                                                  │
│  [eyebrow]  In-house Infrastructure                              │
│                                                                  │
│  2,400 sq. ft. warehouse.                                        │
│  Always stocked. Always ready.                                   │
│                                                                  │
│  Round-the-clock supply for powder coatings, liquid paints,      │
│  and adhesives — from our own warehouse in Greater Noida.        │
│                                                                  │
│  ── 2,400 sq. ft.  ·  24/7 Supply  ·  3 Brands In-stock ──      │
│                                                                  │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ │
│  │                  │ │                  │ │                  │ │
│  │  Warehouse img 1 │ │  Warehouse img 2 │ │  Warehouse img 3 │ │
│  │  aspect-[4/3]    │ │  aspect-[4/3]    │ │  aspect-[4/3]    │ │
│  │                  │ │                  │ │                  │ │
│  │  [placeholder    │ │  [placeholder    │ │  [placeholder    │ │
│  │   sand tile +    │ │   sand tile +    │ │   sand tile +    │ │
│  │   label]         │ │   label]         │ │   label]         │ │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘ │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Image slots:**
- 3 images in a row on desktop; stacked on mobile
- Each: `aspect-[4/3]`, `object-cover`, `rounded-2xl`
- Placeholder: `#e8e5dd` background with grid texture + yellow top bar accent + label "Warehouse · image coming soon"
- Image paths when ready: `/images/vinayak/warehouse-01.jpg`, `warehouse-02.jpg`, `warehouse-03.jpg`
- Optional: 4th wide image (`aspect-[21/9]`, full-width) can be added above the grid if a wide-angle shot is available

---

---

## 9. Cross-Category Navigation Strip

Every category page ends with a compact navigation strip showing the other four product ranges. This prevents dead-ends and helps visitors who landed on the wrong category find the right one.

```
┌──────────────────────────────────────────────────────────────────┐
│  bg: #f1efea (light, regardless of page theme)                  │
│                                                                  │
│  [eyebrow]  Also from OptiFinish                                 │
│  Explore other product ranges →                                  │
│                                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────┐  │
│  │  OptiFinish  │ │  Automation  │ │     GEMA     │ │ Dürr   │  │
│  │     Mfg      │ │              │ │              │ │        │  │
│  │  In-house    │ │  Proprietary │ │  Authorised  │ │ Auth.  │  │
│  │ Manufactured │ │  Technology  │ │   Partner    │ │ Dist.  │  │
│  └──────────────┘ └──────────────┘ └──────────────┘ └────────┘  │
│                                                                  │
│  (current page's category is removed from this strip)           │
└──────────────────────────────────────────────────────────────────┘
```

**Implementation:** Pass the current page slug as a prop. The component filters it out from the full list of 5 categories before rendering.

---

## 10. Bottom CTA Section

Same component as the homepage `HomeCTA` — reused as-is. Dark background, large serif headline, single yellow CTA button.

```
┌──────────────────────────────────────────────────────────────────┐
│  bg: #070809                                                     │
│                                                                  │
│  Ready to spec your line?                                        │
│  Talk to OptiFinish.                                             │
│                                                                  │
│  [  Get in Touch  →  ]                                           │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 11. Images & Placeholders

No product images exist yet. All cards will render a placeholder tile until images are provided.

**Placeholder design (Theme A — dark):**
- Background: `#FECE00/[0.05]` with subtle yellow grid texture
- Yellow top bar accent (2px, `w-12`)
- Label: product name in tiny uppercase tracking text at `yellow/20`

**Placeholder design (Theme B — light):**
- Background: `#e9e6de` with subtle dark grid texture at `opacity-[0.22]`
- Yellow top bar accent (2px, `w-12`)
- Label: category name in tiny uppercase tracking text at `black/28`

**When images are ready, drop into:**
```
build/optifinish/public/images/products/
├── manufactured/
│   ├── powder-coating-plant.jpg
│   ├── curing-oven.jpg
│   └── ...
├── automation/
│   ├── z-tap.jpg
│   ├── za01.jpg
│   └── ...
├── gema/
├── durr/
└── vinayak/
    ├── powder-paints.jpg
    ├── warehouse-01.jpg
    └── ...
```

---

## 12. Enquiry Link Strategy

Every product card's primary CTA links to `/contact?product=[slug]`. The contact page (to be built) will read this query param and pre-fill the enquiry subject.

**All enquiry slugs:**

| Category | Product | Slug |
|---|---|---|
| Manufactured | Powder Coating Plant | `powder-coating-plant` |
| Manufactured | Curing Oven | `curing-oven` |
| Manufactured | Powder Spray Booth | `powder-spray-booth` |
| Manufactured | Liquid Spray Booth | `liquid-spray-booth` |
| Manufactured | SS Booth System | `ss-booth-system` |
| Manufactured | Plastic Booth | `plastic-booth` |
| Manufactured | Cyclone & Dust Collector | `cyclone-dust-collector` |
| Manufactured | PT Line | `pt-line` |
| Manufactured | Wood Finish Oven | `wood-finish-oven` |
| Automation | Z-TAP | `z-tap` |
| Automation | ZA01 | `za01` |
| Automation | Sieve Machine | `sieve-machine` |
| Automation | Auto Spray Optimisation | `auto-spray-optimisation` |
| GEMA | Manual Gun | `gema-manual-gun` |
| GEMA | Automatic Gun | `gema-automatic-gun` |
| GEMA | Reciprocators | `gema-reciprocators` |
| GEMA | OptiCentre | `gema-opticentre` |
| Dürr | Cup Gun | `durr-cup-gun` |
| Dürr | HVLP Gun | `durr-hvlp-gun` |
| Dürr | Airless Gun | `durr-airless-gun` |
| Dürr | Air Assist Gun | `durr-air-assist-gun` |
| Dürr | Electrostatic Gun | `durr-electrostatic-gun` |
| Dürr | Bell Atomiser | `durr-bell-atomiser` |
| Dürr | EcoPump | `durr-ecopump` |
| Dürr | 2K Dosing | `durr-ecodose-2k` |
| Dürr | 3K Dosing | `durr-ecodose-3k` |
| Vinayak | Powder Paints | `vinayak-powder-paints` |
| Vinayak | Liquid Paint | `vinayak-liquid-paint` |
| Vinayak | Touch-up Paints | `vinayak-touchup-paints` |
| Vinayak | PU & Enamel | `vinayak-pu-enamel` |
| Vinayak | Adhesives | `vinayak-adhesives` |

---

## 13. What Is Out of Scope (This Phase)

The following are **not** being built as part of this plan and should not be expected:

- Individual product detail pages (`/products/gema/manual-gun` etc.)
- PDF datasheets or download sections
- A `/products` index page (the 5 category hub pages will be accessible directly from the homepage and navbar)
- Contact form backend / Zoho CRM wiring (placeholder form is fine for launch)
- Any page for services (`/services/*`)

---

## 14. Technical Notes for Developers

- **Framework:** Next.js 16 App Router, React 19, TypeScript
- **Styling:** Tailwind CSS v4 — use utility classes, no custom CSS unless unavoidable
- **Package manager:** pnpm only — do not use npm or yarn
- **Fonts:** Instrument Serif (display/serif) + Inter (body) — already configured globally
- **Brand tokens already in globals.css:**
  - `--color-yellow: #FECE00`
  - `--color-ink: #0A0A0A`
  - `--color-surface: #f1efea`
  - `--color-void: #070809`
- **Animations:** Keep minimal on product pages — scroll-triggered fade-in only. No heavy GSAP sequences (those are for homepage hero sections).
- **No `"use client"` on page files** unless interactive state is needed. Product cards are static — render server-side by default.
- **`WhatWeOffer.tsx` hrefs** already point to the correct 5 URLs — no changes needed there.

---

## 15. Pending Assets (Blocking or Non-Blocking)

| Asset | Status | Blocking? |
|---|---|---|
| Product images for all 30 products | Not yet provided | No — placeholders will be used |
| Vinayak warehouse photos (3 images) | User will send | No — placeholder slots built |
| Nerolac logo (`/images/logos/nerolac.png`) | To be sourced | No — text fallback if absent |
| Prominent logo (`/images/logos/prominent.png`) | To be sourced | No — text fallback if absent |
| Paramount logo (`/images/logos/paramount.png`) | To be sourced | No — text fallback if absent |
| GEMA wordmark | To be sourced | No — text fallback if absent |
| Dürr wordmark | To be sourced | No — text fallback if absent |
| Contact page (for enquiry links to work) | Not yet built | No — links will be live, form TBD |

---

## 16. Approval Checklist

Before implementation begins, confirm the following:

- [ ] All 5 hero headlines approved
- [ ] All 30 product names and subtitles approved
- [ ] Dürr "Equipment Only" hero badge wording approved (sets correct buyer expectations)
- [ ] Vinayak warehouse section approved (design + copy)
- [ ] Cross-category nav labels approved
- [ ] Enquiry slug naming convention approved
- [ ] Confirmed: Z-TAP card should link to the external Z-TAP dedicated site
- [ ] Confirmed: individual product detail page links show as muted/disabled until built
