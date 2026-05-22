# OptiFinish — Mobile Wireframe
## iOS & Android · Full Site · Every Page · Every Section

**Branch:** `feat/mobile`  
**Reference build:** `build/optifinish` (main)  
**Date:** May 2026  
**Author:** Claude Code · Akshay / Utkarsh review

---

## HOW TO READ THIS DOCUMENT

- **[D→M]** = Desktop layout → Mobile adaptation
- **iOS ∆** = iOS-specific behaviour (safe areas, back gesture, bounce scroll)
- **Android ∆** = Android-specific behaviour (back button, no rubber-band scroll)
- **⚠ Not Done** = exists on desktop, not yet mobile-optimised in `feat/mobile`
- **✅ Done** = already implemented in `feat/mobile`
- Touch targets: minimum **44×44px** (iOS HIG) / **48×48dp** (Material)
- Base font: 16px minimum for body, 14px floor for labels
- Viewport: 390px wide (iPhone 15 base) and 360px (Android mid-range)

---

## DEVICE SPECS — DESIGN TARGETS

| Device | Viewport | Safe Area Top | Safe Area Bottom |
|---|---|---|---|
| iPhone 15 / 15 Pro | 390×844 | 59px (Dynamic Island) | 34px (home bar) |
| iPhone SE 3rd gen | 375×667 | 20px (status bar) | 0px |
| Samsung Galaxy S24 | 360×780 | 24px (status bar) | ~20px (gesture bar) |
| Pixel 8 | 393×851 | 24px | ~20px |
| Mid-range Android | 360×800 | 24px | 16px |

**Design at 390px. Test at 360px. Safe area: top 60px iOS / 24px Android, bottom 34px iOS / 20px Android.**

---

---

# PART 1 — GLOBAL CHROME

---

## 1.1 NAVBAR

### Desktop
Floating pill `max-w-[1100px]`, logo + 5 nav links + CTA button, mega-dropdown menus, transparent → frosted glass on scroll.

### Mobile Layout

```
┌─────────────────────────────────────────┐  ← safe-area-inset-top
│  [OptiFinish logo]          [☰ Hamburger] │  h=56px, bg=#080a0c/85 backdrop-blur
└─────────────────────────────────────────┘
```

- **Height:** 56px + safe area top
- **Background:** `bg-[#080a0c]/85 backdrop-blur-md` always (not pill — full-width bar)
- **Logo:** Left-aligned, `h-[28px]`
- **Hamburger:** Right-aligned, `h-11 w-11` touch target, 3-line icon → X on open
- **CTA button:** Hidden in navbar — lives only inside mobile menu
- **No mega-dropdowns** on mobile

**iOS ∆:** `padding-top: env(safe-area-inset-top)` so content doesn't clip under Dynamic Island  
**Android ∆:** No safe area padding needed beyond standard status bar; use `padding-top: 24px` fallback

### Mobile Menu (Full-screen overlay)

```
┌─────────────────────────────────────────┐
│  [Logo]                            [✕]  │  ← 56px header row
├─────────────────────────────────────────┤
│                                         │
│           Products          ›           │  ← 64px tap row, text-[1.6rem] font-black
│           Services          ›           │
│           Facility                      │
│           Resources                     │
│           About                         │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │       Get in Touch  →           │    │  ← yellow full-width button
│  └─────────────────────────────────┘    │
│                                         │
│  📞 +91-96434-03374  ✉ info@optifinish │  ← contact strip
└─────────────────────────────────────────┘
  ← safe-area-inset-bottom padding
```

- **Background:** `#080808` full-screen, `z-[60]`
- **Animation in:** slide-down from top, `0.22s cubic-bezier(0.22,1,0.36,1)`
- **Nav rows:** Each `h-16`, flex row, `border-b border-white/[0.06]`
- **Rows with sub-items (Products, Services):** show `›` chevron, tap opens sub-menu
- **Sub-menus:** Push pattern (slide left into sub-menu, back arrow top-left)
- **CTA button:** `rounded-full bg-[#FECE00] text-ink font-black py-4` full-width `mx-6`

**Products sub-menu:**
```
┌─────────────────────────────────────────┐
│  ←  Products                            │
├─────────────────────────────────────────┤
│  OptiFinish Manufactured        ›       │
│  Automation                     ›       │
│  GEMA                           ›       │
│  Dürr                           ›       │
│  Vinayak Agencies               ›       │
└─────────────────────────────────────────┘
```
Each taps through to that hub page (not a further sub-menu — keep it 2 levels max).

**Services sub-menu:** Same pattern — list all 7 services, each links directly to service page.

**iOS ∆:** `overscroll-behavior: contain` on menu scroll to prevent page behind from moving  
**Android ∆:** Hardware back button closes sub-menu first, then full menu, then dismisses

**✅ Already implemented** — review: ensure sub-menu push pattern exists, safe area padding correct

---

## 1.2 FOOTER

### Desktop
4-column grid: Brand | Products | Solutions | Company

### Mobile Layout

```
┌─────────────────────────────────────────┐
│  [Logo]  OptiFinish                     │  ← brand row
│  Value Added Coating Solutions Pvt. Ltd │
│  📍 Greater Noida, UP, India            │
│  📞 +91-96434-03374                     │
│  ✉ info@optifinish.in                  │
│                                         │
│  [LinkedIn] [YouTube] [Instagram] [WA]  │  ← social icons row, 44×44 each
├─────────────────────────────────────────┤
│  Products                          [+]  │  ← accordion toggle
│  Solutions                         [+]  │
│  Company                           [+]  │
├─────────────────────────────────────────┤
│  © 2025 VACSPL  ·  Made in India 🇮🇳   │
│  Privacy · Terms                        │
└─────────────────────────────────────────┘
  ← safe-area-inset-bottom
```

- **Brand block:** Always visible, `pb-8`
- **Link sections:** Accordion pattern on mobile — tap section title to expand links
- **Accordion:** Smooth `max-height` transition, `0.3s ease`
- **Social icons:** `h-11 w-11` touch targets with icon centered inside
- **Bottom strip:** `text-[10px]`, flex-col on smallest screens, flex-row on 390px+

**⚠ Not Done** — footer currently uses `grid-cols-1` which stacks all links. Needs accordion.

---

---

# PART 2 — HOMEPAGE

**Page file:** `src/app/page.tsx`  
**Section order:** HeroDark → ProprietaryAutomation → WhatWeOffer → FacilityTeaserFilmstrip → GlobalNarrative → HomeServices → OurWorkPreview → ClientsTestimonials → OurTeam → HomeCTA

---

## 2.1 HERODARK ✅ (partially done)

### Desktop
Full-viewport centered text, authority stripe at bottom with stats + partner logos, yellow glow FX.

### Mobile Layout

```
┌─────────────────────────────────────────┐
│                                         │  ← min-h: 100svh (use svh not vh)
│  ● Powder Coating · Liquid Coating      │  ← kicker, PulseBullet, text-[0.6rem]
│                                         │
│  Surface finishing                      │  ← headline, text-[2.4rem] font-black
│  systems built in                       │     line-height: 1.0
│  India.                                 │
│  Proprietary automation                 │  ← yellow accent
│  included.                              │
│                                         │
│  [Explore Products]                     │  ← CTA, full-width, h-12, rounded-full
│                                         │
│  🇮🇳 India · 🇨🇭 Switzerland · 🇩🇪 Germany│  ← flags strip, text-[0.58rem]
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 14+ Yrs │ 500+ Install │[GEMA][Dürr]│ │  ← authority stripe, 2×2 grid → scroll
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

- **`min-h: 100svh`** — use `svh` (small viewport height) so iOS address bar doesn't cause jump
- **Headline:** `clamp(2rem, 8vw, 4.6rem)` — on 390px ≈ `2.4rem`, 5 lines max
- **CTA button:** Full-width `w-full` on mobile (not centered inline)
- **Authority stripe:** On mobile — `grid-cols-2` for stats, partner logos as small horizontal strip
- **Yellow glow FX:** Keep but reduce blur radius on mobile for performance (`blur-[80px]` → `blur-[40px]`)
- **Grid background:** Keep — but `background-size: 48px 48px` (smaller on mobile)

**iOS ∆:** `min-h: 100svh` critical — `100vh` on iOS Safari shows content behind address bar  
**Android ∆:** Same `svh` issue on Chrome; `100svh` handles both

**⚠ Remaining:** CTA button width, `svh` unit, authority stripe grid

---

## 2.2 PROPRIETARY AUTOMATION ✅ (partially done)

### Desktop
`h-[300vh]` sticky scroll — 300vh tall parent, child viewport sticks to top, scroll progress drives active tab + content fade. Right column: large image + 2 small cards.

### Mobile Layout

**NO sticky scroll on mobile** — too expensive, confusing on touch.

```
┌─────────────────────────────────────────┐
│  Proprietary  ← eyebrow                 │
│  Built by us.                           │  ← headline, 2 lines
│  Owned by us.                           │
│  [body text 2 lines max]                │
│                                         │
│  [Z-TAP] [ZA-01] [Sieve Machine]        │  ← tab pills, scrollable horizontal
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │  [Product image]  aspect-[4/3]      │ │  ← image first on mobile
│ └─────────────────────────────────────┘ │
│                                         │
│  AUTOMATION                             │  ← yellow tag
│  Z-TAP                                  │  ← product name, text-[1.8rem]
│  Tagline here                           │
│  Description text...                    │
│                                         │
│  · Spec 1                               │  ← specs list
│  · Spec 2                               │
│  · Spec 3                               │
│                                         │
│  [Learn More]  [View All Automation]    │  ← 2 buttons, full-width stacked
└─────────────────────────────────────────┘
```

- **Height:** `h-auto` (no `300vh`)
- **Sticky:** None on mobile
- **Tabs:** Horizontal scroll pills `overflow-x-auto`, no wrap, `snap-x snap-mandatory`
- **Tab switching:** Tap → immediate content swap (no scroll progress)
- **Image:** Above text on mobile (`flex-col-reverse` → image first)
- **2 small cards:** Hidden on mobile (only large image shown)
- **Buttons:** Stack vertically, both `w-full`

**✅ Done** — image col visible, sticky removed on mobile  
**⚠ Remaining:** Tab pills horizontal scroll, button stacking

---

## 2.3 WHATWEOFFER ⚠ Not Done

### Desktop
Dark section. Header + body. Top row: 2-col grid (OptiFinish + Automation cards with carousel). Bottom row: 3-col grid (GEMA, Dürr, Vinayak cards).

### Mobile Layout

```
┌─────────────────────────────────────────┐
│  What we offer  ← eyebrow              │
│  What we offer,                         │  ← headline
│  clearly.                               │
│  [body text]                            │
│                                         │
│ ┌─────────────────────────────────────┐ │  ← OptiFinish Manufactured card
│ │ [Image carousel]  aspect-[4/3]      │ │     full-width
│ │ ● ● ● ●          carousel dots      │ │
│ ├─────────────────────────────────────┤ │
│ │ 🏭 OPTIFINISH MANUFACTURED          │ │
│ │ Powder Coating Plants & Systems     │ │
│ │ · Powder Coating Plant              │ │
│ │ · Curing Oven                       │ │
│ │ [Explore Range →]                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │  ← Automation card (same pattern)
│ └─────────────────────────────────────┘ │
│                                         │
│  ← swipe for more →  [GEMA][Dürr][VA]  │  ← 3 bottom cards: horizontal snap scroll
└─────────────────────────────────────────┘
```

- **Top 2 cards:** Stack vertically, full-width each
- **Bottom 3 cards (GEMA, Dürr, Vinayak):** Horizontal snap scroll `overflow-x-auto snap-x`
  - Card width: `w-[80vw]` so user sees edge of next card
  - Each: `snap-start flex-shrink-0`
- **Carousels inside cards:** Keep auto-advance, reduce interval to 4s on mobile
- **Touch on carousel:** Swipe gesture to advance (not just dots)

**⚠ Not Done**

---

## 2.4 FACILITYTEASER FILMSTRIP ✅ (partially done)

### Desktop
Light section. Left: text + feature list + CTA. Right: 2×2 photo grid. Below: auto-scrolling filmstrip.

### Mobile Layout

```
┌─────────────────────────────────────────┐
│  Our Facility  ← eyebrow               │
│  Where it's                             │  ← headline
│  built.                                 │
│  [body text]                            │
│                                         │
│  ✓ 25,000 sq. ft. manufacturing        │  ← feature list, stacked
│  ✓ R&D and coating trials              │
│  ✓ Manufactured in Greater Noida       │
│  ✓ VACSPL certified facility           │
│                                         │
│ ┌─────────┬─────────┐                   │  ← 2×2 photo grid
│ │ Photo 1 │ Photo 2 │                   │     each: aspect-square
│ ├─────────┼─────────┤                   │
│ │ Photo 3 │ Photo 4 │                   │
│ └─────────┴─────────┘                   │
│                                         │
│  [See the Facility →]  ← full-width btn │
│                                         │
│  ──── Filmstrip (auto-scroll) ────      │  ← keep, reduce height h-24
└─────────────────────────────────────────┘
```

- **2×2 grid:** `grid-cols-2`, each cell `aspect-square`
- **CTA button:** Full-width, below photo grid
- **Filmstrip:** Keep — `h-24` on mobile, drag support already done ✅
- **Text+grid:** Stack vertically (text first, then grid) — no side-by-side on mobile

**✅ Done:** Filmstrip rAF scroll + drag  
**⚠ Remaining:** CTA button width, text/grid stacking order

---

## 2.5 GLOBALNARRATIVE ✅ (partially done)

### Desktop
Dark slim section. Header row (left text + right subline). 3-col pillar cards below.

### Mobile Layout

```
┌─────────────────────────────────────────┐
│  Technology from India.                 │  ← eyebrow
│  Engineered in                          │  ← headline, India = gradient text
│  India.                                 │  ← yellow on new line ✅ done
│  Precision from                         │
│  Switzerland & Germany.                 │
│                                         │
│  [subline text, 2 lines max]            │  ← right-aligned on desktop → left on mobile
│                                         │
│ ┌─────────────────────────────────────┐ │  ← pillar cards: stack vertically
│ │ 🇮🇳  India                          │ │     OR: horizontal snap scroll
│ │  Manufacturing excellence...        │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ 🇨🇭  Switzerland · 🇩🇪  Germany     │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

- **Header:** subline below headline (not right-aligned) on mobile
- **3 pillars:** Stack vertically OR horizontal snap-scroll `w-[85vw]` per card
  - Recommendation: **Stack vertically** — content is short enough, scrolling is fine
- **py:** `py-10` (compact — this is a slim section)

**✅ Done:** Yellow line break  
**⚠ Remaining:** Subline alignment, pillar stacking

---

## 2.6 HOMESERVICES ⚠ Not Done

### Desktop
Light section. Header (left headline + right CTA). 3-col service card grid.

### Mobile Layout

```
┌─────────────────────────────────────────┐
│  Services  ← eyebrow                   │
│  Keep your line                         │  ← headline
│  running.                               │
│                                         │
│ ┌─────────────────────────────────────┐ │  ← service cards
│ │ [🔧] Plant AMC          SERVICES    │ │     full-width, stacked
│ │  Scheduled maintenance...           │ │     OR: 2-col on 390px+
│ │  [Learn more →]                     │ │
│ └─────────────────────────────────────┘ │
│  (repeat × 6)                           │
│                                         │
│  [View All Services →]   ← full-width   │
└─────────────────────────────────────────┘
```

- **Grid:** `grid-cols-1` on <375px, `grid-cols-2` on ≥375px
- **Card:** Icon (40×40) + tag + title + description + arrow CTA
- **"View all" CTA:** Move below grid on mobile (desktop puts it top-right)
- **Arrow CTA on card:** `h-11` min touch target

**⚠ Not Done**

---

## 2.7 OURWORKPREVIEW ✅

### Desktop
Dark. Header + 3 work cards in grid.

### Mobile Layout ✅ (already implemented)

```
┌─────────────────────────────────────────┐
│  Our Work  ← eyebrow                   │
│  250+ lines installed                   │
│  across India.          [View all →]   │
│                                         │
│  ← [Card 76vw] [Card 76vw] [Card →]   │  ← horizontal snap-scroll ✅
└─────────────────────────────────────────┘
```

- Cards `w-[76vw]`, `snap-start`, `overflow-x-auto`
- Mask gradients on left/right edges ✅

**✅ Done**

---

## 2.8 CLIENTSTESTIMONIALS ✅

### Desktop
Light. Stats bar + client logo grid + testimonials carousel (3 visible).

### Mobile Layout ✅ (already implemented)

```
┌─────────────────────────────────────────┐
│  Trusted by India's                     │
│  leading manufacturers.                 │
│                                         │
│  [500+] │ [200+] │ [14+]               │  ← 3-col stat grid ✅
│                                         │
│  ← [Logo marquee auto-scroll] →        │  ← rAF marquee ✅
│                                         │
│  [Testimonial card full-width]          │  ← swipe carousel ✅
│  ← ○ ○ ○ ○ →                           │  ← dots + arrows
└─────────────────────────────────────────┘
```

**✅ Done**

---

## 2.9 OURTEAM ✅ (partially done)

### Desktop
Dark. Two founder rows, alternating text/photo, large names.

### Mobile Layout ✅ (partially done)

```
┌─────────────────────────────────────────┐
│  Leadership  ← eyebrow                 │
│  ────────────────────────               │  ← animated rule ✅
│                                         │
│  FOUNDER                                │  ← role tag
│  Harish            [Photo]             │  ← Harish = yellow ✅
│  Sharma                                 │     portrait: h-28 w-20 ✅
│  [bio text, 2 lines]                    │
│  ────────────────────────               │
│  FOUNDER                                │
│  Lalit              [Photo]             │
│  Tayal                                  │
│  [bio text, 2 lines]                    │
└─────────────────────────────────────────┘
```

- Name font: `clamp(1.4rem, 7vw, 3.8rem)` → on 390px ≈ `2rem`
- Portrait: `h-28 w-20` ✅ already done
- Bio: clamp to 3 lines on mobile, expandable on tap (optional)

**✅ Done**

---

## 2.10 HOMECTA ⚠ Not Done

### Desktop
Light section. Dark rounded box centered, headline + body + CTA button.

### Mobile Layout

```
┌─────────────────────────────────────────┐  bg-[#f1efea]
│                                         │
│ ┌─────────────────────────────────────┐ │  ← dark box, rounded-[1.4rem], mx-4
│ │                                     │ │
│ │  Ready to talk?  ← eyebrow         │ │
│ │  Let's find the right              │ │  ← headline, 2 lines
│ │  coating solution                   │ │
│ │  for your line.                     │ │
│ │                                     │ │
│ │  [body text, 2 lines]               │ │
│ │                                     │ │
│ │  [   Get in Touch  →   ]            │ │  ← full-width yellow button
│ │                                     │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

- Dark box: `mx-4 rounded-[1.4rem]` (not full-bleed — keep the rounded card feel)
- CTA button: Full-width inside the card `w-full`
- Yellow glow: Keep but reduce `blur-[60px]`

**⚠ Not Done**

---

## 2.11 PARTNERSBAR ⚠ Not Done

### Desktop
Light. 2-col card grid (GEMA + Dürr partner cards).

### Mobile Layout

```
┌─────────────────────────────────────────┐
│  Partner Brands  ← eyebrow             │
│  Authorised for the                     │
│  brands that set                        │
│  the standard.                          │
│                                         │
│ ┌─────────────────────────────────────┐ │  ← GEMA card, full-width
│ │ [GEMA logo]  Authorised Partner     │ │
│ │ GEMA                                │ │
│ │ [description 2 lines]               │ │
│ │ Explore GEMA range →                │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │  ← Dürr card
│ │ [Dürr logo]  Authorised Partner     │ │
│ │ Dürr                                │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

- Cards: Stack vertically, full-width
- Logo: `h-[14px]` in white pill box — keep

**⚠ Not Done**

---

## 2.12 AUTOMATIONHIGHLIGHT ⚠ Not Done

### Desktop
Dark. Header + 3-col product card grid.

### Mobile Layout

```
┌─────────────────────────────────────────┐
│  Automation  ← eyebrow                 │
│  Proprietary tools                      │
│  for every line.                        │
│                                         │
│  ← [Z-TAP 85vw] [ZA-01 85vw] [→]      │  ← horizontal snap-scroll cards
└─────────────────────────────────────────┘
```

- Cards: Horizontal snap-scroll, `w-[85vw]`, `snap-start`
- Or: Stack vertically (simpler) — recommend snap-scroll to feel premium

**⚠ Not Done**

---

---

# PART 3 — PRODUCT HUB PAGES

**Applies to:** `/products/optifinish-manufactured`, `/products/gema`, `/products/durr`, `/products/automation`, `/products/vinayak`

**Components:** `CategoryHero` + `ProductCard` grid + `CrossCategoryNav`

---

## 3.1 CATEGORYHERO ⚠ Not Done

### Desktop
Optional image on right `lg:grid-cols-[1fr_1fr]`. Left: breadcrumb + tag + eyebrow + headline + subline + stats.

### Mobile Layout

```
┌─────────────────────────────────────────┐
│  Products › Vinayak Agencies            │  ← breadcrumb, text-[0.55rem]
│                                         │
│  SISTER CONCERN                         │  ← tag pill
│  Industrial paints                      │  ← headline, clamp(1.8rem, 6vw, 3rem)
│  and coatings.                          │
│  One stop, always                       │
│  in stock.                              │  ← headlineAccent
│                                         │
│  [subline, 3 lines max]                 │
│                                         │
│  [2,400 sq.ft] [24/7] [3 Brands]       │  ← stats, flex-wrap or 3-col grid
│                                         │
│ ┌─────────────────────────────────────┐ │  ← image if present
│ │ [Hero image] aspect-[16/9]         │ │     below text on mobile
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

- **Image:** On mobile, full-width below the text block (not side-by-side)
- **Breadcrumb:** Truncate to last 2 items on mobile — `Products › Vinayak`
- **Stats:** `flex flex-wrap gap-2` — each stat pill auto-width

**⚠ Not Done**

---

## 3.2 PRODUCTCARD GRID ⚠ Not Done

### Desktop
`sm:grid-cols-2 lg:grid-cols-3` — cards with image + carousel + specs + CTAs.

### Mobile Layout

```
┌─────────────────────────────────────────┐
│ Product Range  ← section heading        │
│                                         │
│ ┌─────────────────────────────────────┐ │  ← Card 1, full-width
│ │ [Image/Carousel]  aspect-[4/3]      │ │
│ │ ● ○ ○  carousel dots                │ │
│ ├─────────────────────────────────────┤ │
│ │ Powder Coating Plant                │ │  ← name, text-[1rem]
│ │ OPTIFINISH MANUFACTURED             │ │  ← subtitle tag
│ │                                     │ │
│ │ [Conveyorised] [Batch] [Custom]     │ │  ← variant tags, flex-wrap
│ │                                     │ │
│ │ Description text 2 lines...         │ │
│ │ · Spec 1  · Spec 2  · Spec 3        │ │  ← specs (show 3 max, truncate)
│ │                                     │ │
│ │ [Enquire →]     [Learn more]        │ │  ← CTAs row
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │  ← Card 2
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

- **Grid:** `grid-cols-1` on mobile — single column, full-width cards
- **Card image:** Swipe-able carousel on touch, or tap dots
- **Specs:** Show max 3 on mobile; rest hidden (no expand needed — detail on product page)
- **CTA buttons:** `Enquire` primary + `Learn more` secondary, both `rounded-full`
- **Touch target:** Both buttons min `h-11`

**iOS ∆:** Carousel swipe should use `touch-action: pan-y` so vertical scroll isn't blocked  
**Android ∆:** Same — `touch-action: pan-y` on carousel container

**⚠ Not Done**

---

## 3.3 CROSSCATEGORYNAV ⚠ Not Done

### Desktop
Dark. "Explore other ranges" + 4-col card grid.

### Mobile Layout

```
┌─────────────────────────────────────────┐
│  Explore other ranges                   │
│                                         │
│  ← [Card 44vw] [Card 44vw] [→]        │  ← 2 cards visible, snap-scroll
└─────────────────────────────────────────┘
```

- **Grid → horizontal scroll:** `overflow-x-auto snap-x`, cards `w-[44vw] flex-shrink-0`
- Users see 2 full cards + edge of 3rd = clear scroll signal

**⚠ Not Done**

---

---

# PART 4 — INDIVIDUAL PRODUCT PAGES (ProductPageTemplate)

**Applies to:** All ~35 product pages using `ProductPageTemplate.tsx`

---

## 4.1 S1 — HERO ⚠ Not Done

### Desktop
Dark. 2-col grid: left (breadcrumb + badge + eyebrow + headline + subline + stats + enquire button) + right (hero image).

### Mobile Layout

```
┌─────────────────────────────────────────┐  bg dark
│  Products › GEMA › Manual Gun           │  ← breadcrumb
│                                         │
│  GEMA · POWDER GUN                      │  ← badge pill
│  Powder coating.  ← headline            │
│  Gun performance. ← headlineAccent (yellow)
│                                         │
│  [subline 3 lines max]                  │
│                                         │
│ ┌─────────────────────────────────────┐ │  ← hero image, aspect-[4/3]
│ │ [Product hero image]                │ │     above stats + CTA on mobile
│ └─────────────────────────────────────┘ │
│                                         │
│  [val1]  [val2]  [val3]                │  ← heroStats, flex-wrap pills
│                                         │
│  [   Enquire about this product →   ]   │  ← full-width yellow button
│  [← Back to GEMA]                       │  ← back link
└─────────────────────────────────────────┘
```

- **Image:** Full-width `aspect-[4/3]` between subline and stats
- **Stats:** `flex flex-wrap gap-2` pills
- **Enquire button:** Full-width, `h-12`
- **Back link:** Below enquire button, `text-[0.72rem]`

**⚠ Not Done**

---

## 4.2 S2 — PROBLEM / WHY ⚠ Not Done

### Desktop
Alternating bg. 2-col: left (headline + body) + right (benefits list).

### Mobile Layout

```
┌─────────────────────────────────────────┐
│  The Problem  ← eyebrow                │
│  Standard enamel                        │  ← problemHeadline
│  doesn't always meet                   │  ← problemAccent (yellow/ink)
│  the finish brief.                      │
│                                         │
│  [problemBody 4 lines]                  │
│                                         │
│  ✓ Benefit 1                            │  ← benefits list, stacked
│  ✓ Benefit 2                            │
│  ✓ Benefit 3                            │
│  (show all — no truncation)             │
└─────────────────────────────────────────┘
```

- **Layout:** Single column, stacked
- **Benefits:** Full list, `gap-3` between items, bullet dot `h-2 w-2 rounded-full`
- **Text:** `text-[0.85rem] leading-relaxed`

**⚠ Not Done**

---

## 4.3 S3 — VARIANTS (Tabs) ⚠ Not Done

### Desktop
Dark. Left: tab buttons (stacked vertical) + product content. Right: image.

### Mobile Layout

```
┌─────────────────────────────────────────┐
│  Select variant  ← section title        │
│                                         │
│  [Tab 1] [Tab 2] [Tab 3]               │  ← horizontal scroll tabs
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [Variant image]  aspect-[4/3]       │ │  ← image first on mobile
│ └─────────────────────────────────────┘ │
│                                         │
│  CONTACT ADHESIVE — LAMINATES           │  ← variant tag
│  Contact adhesive                       │  ← variant headline
│  for laminates.                         │
│                                         │
│  [variant body text]                    │
│                                         │
│  Type         Contact adhesive          │  ← specs table
│  Best for     Laminates, veneers        │
│  Bond method  Both surfaces, press      │
│  Application  Brush/spreader            │
└─────────────────────────────────────────┘
```

- **Tabs:** `overflow-x-auto snap-x flex gap-2 pb-2` — horizontal scrollable
- **Tab button:** `h-10 px-4 rounded-full text-[0.72rem] flex-shrink-0`
- **Image:** Full-width `aspect-[4/3]`, above text
- **Specs:** 2-col table `grid-cols-[auto_1fr]`, `text-[0.75rem]`

**⚠ Not Done**

---

## 4.4 S4 — HOW IT WORKS (Steps) ⚠ Not Done

### Desktop
Dark/light. 4 step cards in `lg:grid-cols-4` with connector lines between.

### Mobile Layout

```
┌─────────────────────────────────────────┐
│  How it works  ← section title          │
│                                         │
│  ┌──────────────────────────────────┐   │
│  │ 01                               │   │  ← step card full-width
│  │ Pretreatment                     │   │
│  │ [step image if present]          │   │
│  │ [step body text]                 │   │
│  └──────────────────────────────────┘   │
│              ↓  (vertical connector)    │
│  ┌──────────────────────────────────┐   │
│  │ 02  ...                          │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

- **Layout:** Vertical stack (not 4-col)
- **Connector:** Vertical line between cards `h-8 w-px bg-yellow/25 mx-auto`
- **Step number:** `text-[2.5rem] font-black` yellow

**⚠ Not Done**

---

## 4.5 S5 — SPECIFICATIONS ⚠ Not Done

### Desktop
2-col: spec table left + image right.

### Mobile Layout

```
┌─────────────────────────────────────────┐
│  Specifications  ← section title        │
│                                         │
│  Synthetic glue   Contact adhesive...   │  ← spec rows, 2-col table
│  White PVA glue   PVA water-based...    │     key: text-[0.7rem] white/40
│  Brand            Nerolac               │     val: text-[0.75rem] white/85
│  ...                                    │
└─────────────────────────────────────────┘
```

- **Image from desktop:** Hidden on mobile (product already shown in S1 hero)
- **Spec table:** Full-width, `grid-cols-[auto_1fr] gap-x-4 gap-y-3`
- Key column: `min-w-[110px]` to align cleanly

**⚠ Not Done**

---

## 4.6 S6 — APPLICATIONS (Carousel) ⚠ Not Done

### Desktop
1 image + list of use cases side-by-side.

### Mobile Layout

```
┌─────────────────────────────────────────┐
│  Where it's used  ← eyebrow            │
│  Applications &                         │
│  use cases                              │
│                                         │
│  · Furniture manufacturing...           │  ← applications list (all items)
│  · Joinery workshops...                 │
│  · Interior fit-out...                  │
│  · Kitchen cabinet...                   │
│                                         │
│ ┌─────────────────────────────────────┐ │  ← image carousel (if applicationImages[])
│ │ [Application image]  aspect-[4/3]   │ │
│ │ ← [●○○○] →                          │ │  ← arrows + dots at bottom
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

- **List above image:** On mobile, text first then visual
- **Carousel:** Full-width, `aspect-[4/3]`, arrows visible, dot indicators
- **Touch:** Swipe left/right to advance

**⚠ Not Done** (carousel built in template but layout not mobile-adjusted)

---

## 4.7 S7 — COMPATIBILITY TAGS ⚠ Not Done

### Desktop
Tag pills in `flex flex-wrap`.

### Mobile Layout — Same pattern, already responsive-ish but needs padding check:

```
┌─────────────────────────────────────────┐
│  Works with  ← eyebrow                 │
│  Compatibility &                        │
│  integration                            │
│                                         │
│  [Tag pill] [Tag pill]                  │  ← flex-wrap, gap-2
│  [Tag pill] [Tag pill] [Tag pill]       │     text-[0.65rem] each
└─────────────────────────────────────────┘
```

**⚠ Minor — verify padding/tag size on 360px**

---

## 4.8 S8 — RELATED PRODUCTS ⚠ Not Done

### Desktop
3-col grid of related product cards with image + name + category + enquire hover.

### Mobile Layout

```
┌─────────────────────────────────────────┐
│  Related products  ← eyebrow           │
│                                         │
│  ← [Card 72vw] [Card 72vw] [→]        │  ← horizontal snap-scroll
└─────────────────────────────────────────┘
```

- Cards: `w-[72vw] flex-shrink-0 snap-start`
- Horizontal scroll with mask gradients on edges
- Card: image `aspect-[16/9]` + name + category + "Enquire →" button

**⚠ Not Done**

---

---

# PART 5 — SERVICE PAGES (ServicePageTemplate)

**Applies to:** 7 service pages

---

## 5.1 SERVICE HERO ⚠ Not Done

Same wireframe as Product Hero (4.1) — breadcrumb + tag + headline + subline + stats + CTA. No image on service hero.

```
┌─────────────────────────────────────────┐
│  Services › Plant AMC                   │
│  MAINTENANCE                            │
│  Scheduled care                         │
│  that prevents                          │
│  failures.                              │
│  [subline]                              │
│  [500+ Lines] [14+ Years] [PAN India]  │  ← stats pills
│  [   Get in Touch  →   ]               │  ← full-width
└─────────────────────────────────────────┘
```

---

## 5.2 SERVICE SCOPE (Checklist) ⚠ Not Done

### Desktop: `sm:grid-cols-2` checklist cards + dark highlight panel

### Mobile:

```
┌─────────────────────────────────────────┐
│  What's included                        │
│                                         │
│  ✓ [Scope item 1]                       │  ← full-width cards, stacked
│  ✓ [Scope item 2]                       │
│  ✓ [Scope item 3]                       │
│  ✓ [Scope item 4]                       │
│                                         │
│ ┌─────────────────────────────────────┐ │  ← dark highlight panel
│ │  ▐ The OptiFinish guarantee         │ │
│ │  [highlight text]                   │ │
│ │  [Get in Touch →]                   │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 5.3 HOW IT WORKS — 4 STEPS ⚠ Not Done

Same as product steps (4.4) — vertical stack with connector lines between.

---

## 5.4 WHY OPTIFINISH + RELATED SERVICES ⚠ Not Done

### Mobile:

- **Trust points:** 2-col grid `grid-cols-2`, smaller cards
- **Related services:** Horizontal snap-scroll `w-[80vw]` cards

---

---

# PART 6 — FACILITY PAGE

**File:** `src/app/facility/page.tsx`

---

## 6.1 FACILITY HERO ⚠ Not Done

### Desktop
Full-viewport background image, text bottom-aligned, stats bar at very bottom.

### Mobile Layout

```
┌─────────────────────────────────────────┐  min-h: 100svh
│ [Full background image, object-cover]   │
│                                         │
│                                         │
│                                         │
│                                         │
│  📍 Greater Noida, UP                   │  ← location pill, at bottom
│  Where your coating                     │  ← headline
│  line is                                │
│  built.                                 │
│  [subline 2 lines]                      │
│                                         │
│  [Plan a visit] [Book coating trial]    │  ← 2 CTAs, stacked vertically
│                                         │
│ ┌─────────┬─────────┬──────────┐        │  ← stats bar, scroll-x on mobile
│ │25,000   │ 14+     │ 500+     │        │     if 4 stats don't fit
│ │sq.ft    │ years   │ lines    │        │
└─┴─────────┴─────────┴──────────┘────────┘
  ← safe-area-inset-bottom
```

- **CTAs:** Stack vertically on mobile, full-width each
- **Stats bar:** `overflow-x-auto` if 4 stats too wide for 390px; else `grid-cols-2` × 2 rows
- Use `min-h: 100svh`

---

## 6.2 MANUFACTURING CAPABILITIES ⚠ Not Done

### Desktop: 2-col — left text + 2×2 capability cards, right 2×2 photo grid

### Mobile:

```
┌─────────────────────────────────────────┐
│  What happens here  ← eyebrow          │
│  [headline]                             │
│  [body text]                            │
│                                         │
│ ┌──────────┬──────────┐                 │  ← 2×2 capability cards
│ │ Cap. 1   │ Cap. 2   │                 │
│ ├──────────┼──────────┤                 │
│ │ Cap. 3   │ Cap. 4   │                 │
│ └──────────┴──────────┘                 │
│                                         │
│ ┌──────────┬──────────┐                 │  ← 2×2 photo grid below
│ │ Photo 1  │ Photo 2  │                 │
│ ├──────────┼──────────┤                 │
│ │ Photo 3  │ Photo 4  │                 │
│ └──────────┴──────────┘                 │
└─────────────────────────────────────────┘
```

---

## 6.3 MANUFACTURING FLOOR (Image Grid) ⚠ Not Done

### Desktop: Asymmetric 2/3 + 1/3 large images + 4-col tiles row

### Mobile:

```
┌─────────────────────────────────────────┐
│ [Large image]  aspect-[16/9] full-width │
│ [Medium image] aspect-[16/9] full-width │
│ ← [Tile] [Tile] [Tile] [Tile] →        │  ← 4 tiles, horizontal snap-scroll
└─────────────────────────────────────────┘
```

---

## 6.4 R&D TRIALS + OFFICE FILMSTRIP ⚠ Not Done

```
┌─────────────────────────────────────────┐
│ [Photo]  aspect-[4/3] full-width        │  ← photo first on mobile
│                                         │
│  [headline]  [body]  [list]  [CTAs]     │  ← text below
│                                         │
│  ──── Office filmstrip ────             │  ← h-24, auto-scroll
└─────────────────────────────────────────┘
```

---

## 6.5 FULL GALLERY ⚠ Not Done

### Desktop: `columns-3` masonry

### Mobile:

```
columns-2  (CSS columns, not grid)
Each photo: break-inside-avoid, mb-2, rounded-lg
```

- `columns-2` on mobile, `columns-3` on desktop — same code, different breakpoint value
- Lazy load: `loading="lazy"` on all facility images

---

## 6.6 VISIT SECTION ⚠ Not Done

```
┌─────────────────────────────────────────┐
│  [headline]                             │
│  [body text]                            │
│  [Plan a visit]  full-width             │
│  [Book trial]    full-width             │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │  📍 Address card                    │ │
│ │  B-3 Sector 63, Noida...            │ │
│ │  [Directions →]                     │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

---

# PART 7 — OUR WORK PAGE

**File:** `src/app/our-work/page.tsx`

---

## 7.1 HERO + PORTFOLIO ⚠ Not Done

```
┌─────────────────────────────────────────┐
│  Our Work  ← eyebrow                   │
│  250+ lines installed                   │
│  across India.                          │
│  [subline]                              │
│  [Request a Reference] full-width btn   │
│  [Browse Products]     full-width btn   │
│                                         │
│  ─── Portfolio (coming soon) ───        │
│  [2 CTA buttons, stacked]               │
└─────────────────────────────────────────┘
```

---

---

# PART 8 — ABOUT PAGE

**File:** `src/app/about/AboutPageContent.tsx`

---

## 8.1 TIMELINE ⚠ Not Done

### Desktop: Alternating left-right cards with center spine, 12 entries

### Mobile:

```
┌─────────────────────────────────────────┐
│  25 years in                            │
│  the making.                            │
│                                         │
│  ●─────────────────────────             │  ← left-aligned spine
│  │                                      │
│  │  1998                                │  ← year
│  │  [Event title]                       │
│  │  [Event description]                 │
│  │  [Logo if applicable]                │
│  │                                      │
│  ●                                      │
│  │  2004                                │
│  │  [Event]                             │
│  ...                                    │
└─────────────────────────────────────────┘
```

- **Layout:** Left-aligned vertical timeline (not alternating — no room on mobile)
- **Spine:** `w-px bg-white/[0.12] absolute left-4`
- **Dots:** `h-3 w-3 rounded-full bg-[#FECE00] absolute left-[13px]`
- **Cards:** `ml-10` to clear the spine

---

## 8.2 COMPANY STORY ⚠ Not Done

```
┌─────────────────────────────────────────┐
│  [headline]                             │
│  [body text stacked, single column]     │
│                                         │
│  [Value pill 1]                         │  ← stacked vertically on mobile
│  [Value pill 2]                         │
│  [Value pill 3]                         │
└─────────────────────────────────────────┘
```

---

## 8.3 FOUNDERS ⚠ Not Done (reuse OurTeam wireframe from 2.9)

---

## 8.4 VINAYAK AGENCIES + CTA ⚠ Not Done

```
┌─────────────────────────────────────────┐
│  Sister Concern                         │
│  Vinayak Agencies.                      │
│  [description]                          │
│  [Explore Vinayak →]  full-width btn    │
└─────────────────────────────────────────┘
```

---

---

# PART 9 — CONTACT PAGE

**File:** `src/app/contact/page.tsx`

---

## 9.1 CONTACT FORM ⚠ Not Done

### Desktop: `lg:grid-cols-[1.4fr_1fr]` — form left, contacts right

### Mobile Layout

```
┌─────────────────────────────────────────┐
│  Talk to our team  ← headline          │
│  [subline]                              │
│                                         │
│  ─── Direct Contacts ───               │  ← contacts FIRST on mobile
│                                         │
│  📞 [+91-96434-03374]                   │  ← contact cards
│  💬 [WhatsApp]                          │
│  ✉  [info@optifinish.in]               │
│  📍 [Greater Noida, UP]                 │
│                                         │
│  ─── Or fill the form ───              │  ← form second
│                                         │
│  [Product selector dropdown]            │  ← full-width
│  [Name field]  [Company field]          │  ← 2-col on 390px, 1-col on 360px
│  [Phone]  [Email]                       │
│  [Details textarea]                     │
│                                         │
│  [   Send Enquiry  →   ]                │  ← full-width, h-14
│                                         │
│  ⚡ Usually responds within 4 hours     │
└─────────────────────────────────────────┘
```

- **Contacts first** on mobile — most users want to call/WhatsApp directly
- **Form second** — for those who prefer async
- **Name+Company, Phone+Email:** `grid-cols-2` on ≥375px, `grid-cols-1` on 360px
- **Submit button:** `h-14` large — prominent final action
- **Product picker:** Stays as native `<select>` on mobile (best UX, OS keyboard)

**iOS ∆:** `font-size: 16px` on all inputs — prevents auto-zoom on iOS Safari  
**Android ∆:** Same — `font-size: 16px` minimum

---

---

# PART 10 — RESOURCES / BLOG

**Files:** `src/app/resources/page.tsx`, `src/app/resources/blog/page.tsx`, `src/app/resources/blog/[slug]/page.tsx`

---

## 10.1 BLOG INDEX ⚠ Not Done

```
┌─────────────────────────────────────────┐
│  Resources  ← eyebrow                  │
│  The OptiFinish                         │
│  knowledge base.                        │
│                                         │
│ ┌─────────────────────────────────────┐ │  ← Featured post card
│ │ [Feature image]  aspect-[16/9]      │ │
│ ├─────────────────────────────────────┤ │
│ │ COATING TIPS  · 5 min read          │ │
│ │ [Post title, 2 lines]               │ │
│ │ [Post excerpt, 2 lines]             │ │
│ │ [Read more →]                       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│  Recent posts                           │
│ ┌─────────────────────────────────────┐ │  ← Grid: 1-col mobile
│ │ [Thumb] [Title] [Date]              │ │     (2-col on tablet)
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 10.2 BLOG POST ⚠ Not Done

```
┌─────────────────────────────────────────┐
│  Resources › Blog › [Post title]        │  ← breadcrumb
│                                         │
│  CATEGORY · DATE · READ TIME           │
│  [Post headline, large]                 │
│                                         │
│ [Hero image, aspect-[16/9], full-width] │
│                                         │
│  [Body text, single column]             │  ← max-w full, text-[1rem]
│  [Sub-headings]                         │     line-height: 1.75
│  [Images full-width]                    │
│  [Code blocks scroll-x]                 │
│                                         │
│  ─── Related posts ───                 │
│  ← [Card 80vw] [Card] →               │  ← horizontal snap-scroll
└─────────────────────────────────────────┘
```

**iOS ∆:** `overflow-x: auto` on code blocks so they scroll horizontally  
**Android ∆:** Same

---

---

# PART 11 — SERVICES HUB PAGE

**File:** `src/app/services/page.tsx`

---

## 11.1 SERVICES HERO + GRID ⚠ Not Done

```
┌─────────────────────────────────────────┐
│  Services  ← eyebrow                   │
│  Services that keep                     │
│  your line running.                     │
│  [500+ Lines] [14+ Years] [PAN India]  │
│                                         │
│  ─── All Services ───                  │
│                                         │
│ ┌─────────────────────────────────────┐ │  ← service cards: 1-col on mobile
│ │ [🔧] PLANT AMC                     │ │     (2-col on sm:)
│ │ Scheduled maintenance...            │ │
│ │ · Quarterly inspection              │ │
│ │ [Learn more →]                      │ │
│ └─────────────────────────────────────┘ │
│  (×6 service cards)                     │
│                                         │
│  ─── Why OptiFinish ───                │
│ ┌──────────┬──────────┐                 │  ← 2-col benefit cards
│ │ Benefit1 │ Benefit2 │                 │
│ ├──────────┼──────────┤                 │
│ │ Benefit3 │ Benefit4 │                 │
│ └──────────┴──────────┘                 │
└─────────────────────────────────────────┘
```

---

---

# PART 12 — PRIVACY, TERMS, LEGAL

Simple single-column text pages. Already responsive by default — just ensure:
- `max-w-prose mx-auto px-5`
- `text-[1rem] leading-relaxed`
- Headings: `text-[1.3rem]`

---

---

# PART 13 — PLATFORM-SPECIFIC DETAILS

---

## iOS Specifics

| Issue | Fix |
|---|---|
| `100vh` bug (address bar) | Use `100svh` everywhere |
| Input auto-zoom | `font-size: 16px` on all `<input>` and `<textarea>` |
| Rubber-band overscroll on menus | `overscroll-behavior: contain` on overlay menus |
| Safe area (Dynamic Island) | `padding-top: env(safe-area-inset-top)` on navbar |
| Safe area (home bar) | `padding-bottom: env(safe-area-inset-bottom)` on footer + fixed bars |
| Tap highlight | `-webkit-tap-highlight-color: transparent` on interactive elements |
| Momentum scroll | `-webkit-overflow-scrolling: touch` on carousels (or just `overflow: auto`) |
| Fixed positioned elements | Test on real device — `position: fixed` inside transforms breaks on iOS |
| Cursor custom | Remove `InteractiveCursor` on touch devices — `@media (hover: none)` |

---

## Android Specifics

| Issue | Fix |
|---|---|
| Hardware back button | Close menus/overlays on `popstate` event |
| No rubber-band | Don't design interactions that rely on overscroll bounce |
| Status bar | `padding-top: 24px` fallback if `env()` not supported |
| `100svh` | Supported Chrome 108+ (most Android 2022+); add `100vh` fallback |
| Address bar | Same `100svh` fix |
| Font rendering | Android renders fonts thinner — may need `font-weight: +100` adjustment |
| Custom cursor | Same — hide on `(hover: none)` |

---

## Touch Interaction Rules (Both)

| Pattern | Rule |
|---|---|
| All tap targets | Min `44×44px` (iOS) / `48×48dp` (Android) |
| Carousel swipe | `touch-action: pan-y` on carousel so vertical scroll still works |
| Long press | No long-press interactions (not discoverable on mobile) |
| Hover effects | All `:hover` states need `:active` fallback for touch |
| Double-tap zoom | `touch-action: manipulation` on buttons to prevent double-tap zoom |
| Scroll containers | `scroll-snap-type: x mandatory` + `overflow-x: auto` |
| Drag (filmstrip) | Already implemented with `pointerdown/pointermove/pointerup` events |

---

---

# PART 14 — IMPLEMENTATION PRIORITY ORDER

## P0 — Blocking (do first — affects every page)
1. Navbar safe area + font-size 16px on inputs
2. `100svh` → replace all `100vh` in hero sections
3. `touch-action: pan-y` on all carousels
4. Remove `InteractiveCursor` on touch devices
5. Footer accordion on mobile

## P1 — High Impact (homepage — most visited)
6. HomeCTA button width
7. WhatWeOffer — bottom 3 cards horizontal snap-scroll
8. ProprietaryAutomation — tab pills horizontal scroll + button stacking
9. HomeServices — `grid-cols-2` + "View all" CTA repositioned
10. GlobalNarrative — pillar card stacking
11. AutomationHighlight — snap-scroll cards
12. PartnersBar — vertical stack

## P2 — Product Pages (second most visited)
13. ProductPageTemplate S1 hero — image between subline and stats
14. ProductPageTemplate S3 variants — horizontal tab pills + image first
15. ProductPageTemplate S6 applications carousel — swipe support
16. ProductPageTemplate S8 related — horizontal snap-scroll
17. CategoryHero — image below text
18. ProductCard grid — `grid-cols-1`
19. CrossCategoryNav — snap-scroll

## P3 — Secondary Pages
20. Facility page — `100svh`, CTA stacking, filmstrip height, gallery `columns-2`
21. Contact page — contacts first, inputs `font-size: 16px`, submit btn `h-14`
22. About page — timeline left-aligned, company story single column
23. Services hub + 7 service pages
24. Our Work page
25. Blog index + post page

---

---

# APPENDIX — CSS UTILITY CLASSES NEEDED

Add to `globals.css` or as Tailwind utilities:

```css
/* Safe area support */
.safe-top    { padding-top: env(safe-area-inset-top); }
.safe-bottom { padding-bottom: env(safe-area-inset-bottom); }

/* Prevent iOS input zoom */
input, textarea, select {
  font-size: max(16px, 1rem);
}

/* Remove custom cursor on touch */
@media (hover: none) {
  [data-cursor], .interactive-cursor { display: none !important; }
}

/* Touch-action for carousels */
.carousel-track {
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
}

/* Double-tap prevention on buttons */
button, a {
  touch-action: manipulation;
}

/* Full-height hero (iOS-safe) */
.h-svh { height: 100svh; }
.min-h-svh { min-height: 100svh; }
```

---

*End of wireframe. Total pages covered: 55+. Total sections mapped: 80+.*  
*Next step: implement P0 globally, then P1 homepage, then P2 product pages.*
