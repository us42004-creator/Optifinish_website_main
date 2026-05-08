# Homepage Wireframe — OptiFinish
**Last updated:** April 2026
**Status:** Awaiting approval — do not move to workflow until approved.

---

## Section Structure (8 sections, finalised)

```
┌─────────────────────────────────────────────────────────────────┐
│  NAVBAR (fixed, floating pill — dark on homepage)               │
│  Logo · OptiFinish  |  Products Services Facility...  |  CTA   │
└─────────────────────────────────────────────────────────────────┘


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  S1 — HERO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Background: dark #080a0c, yellow grid (opacity 0.055),
              diagonal sweep animation looping every 3.5s,
              radial yellow glow behind copy.

  ┌──────────────────────────────────────────────────────────┐
  │  ● VALUE ADDED COATING SOLUTIONS PVT. LTD.               │
  │                                                          │
  │  Manufactured systems.                                   │
  │  Proprietary automation.          ← full line yellow     │
  │  Expert coating solutions.        ← "coating" yellow     │
  │                                                          │
  │  OptiFinish designs and manufactures complete powder     │
  │  coating lines, develops proprietary automation          │
  │  products, and is an authorised partner for GEMA and     │
  │  DURR — backed by 14+ years of industrial experience.    │
  │                                                          │
  │  [ EXPLORE PRODUCTS ]    [ GET IN TOUCH ]                │
  │                                                          │
  │  ┌─────────────────────────────────────────────────┐    │
  │  │ 14+ Yrs │ 500+ Installs │ GEMA │ DÜRR │ Est.    │    │
  │  └─────────────────────────────────────────────────┘    │
  └──────────────────────────────────────────────────────────┘

  Status: ✅ Built (Version B / HeroDark — live at /)
  Notes:  Authority bar floats at bottom of viewport.
          Navbar starts dark, turns glass-dark on scroll.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  S2 — PROPRIETARY AUTOMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Purpose: Capture limelight for OptiFinish's in-house built
           products immediately after hero. Establish "we are
           a developer, not just a distributor" before showing
           the wider portfolio.

  Design language: inherit Z-TAP dark card aesthetic directly.

  ┌──────────────────────────────────────────────────────────┐ ← dark card
  │                                                          │
  │  ● DEVELOPED IN-HOUSE · GREATER NOIDA                    │
  │                                                          │
  │  "Automation that                                        │
  │   belongs to OptiFinish."                                │
  │                                                          │
  │  We don't just install automation — we design and        │
  │  build it. Every product in this range is developed,     │
  │  manufactured, and owned by OptiFinish.                  │
  │                                                          │
  │  ┌──────────────┬──────────────┬──────────────┐         │
  │  │   Z-TAP ★   │     ZA01     │ Sieve Machine│         │  ← tabs
  │  └──────────────┴──────────────┴──────────────┘         │
  │                                                          │
  │  ┌────────────────────────┬──────────────────────┐      │
  │  │  [Product visual /     │  Product name        │      │
  │  │   animation / image]   │                      │      │
  │  │                        │  One-line tagline    │      │
  │  │                        │                      │      │
  │  │                        │  2–3 line desc       │      │
  │  │                        │                      │      │
  │  │                        │  Key spec chips      │      │
  │  │                        │                      │      │
  │  │                        │  [View Product →]    │      │
  │  └────────────────────────┴──────────────────────┘      │
  │                                                          │
  │  [Explore All Automation →]                              │
  │                                                          │
  └──────────────────────────────────────────────────────────┘

  Tab behaviour:
  - Z-TAP is default active (strongest visual, most built-out)
  - ZA01 and Sieve Machine switch the right panel content
  - Smooth crossfade on tab switch (Framer Motion AnimatePresence)

  Status: Not built
  Assets needed: Z-TAP visual (available from Z-TAP site),
                 ZA01 photo/render, Sieve Machine photo


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  S3 — WHAT WE OFFER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Purpose: Full portfolio routing hub. All 5 groups in one
           section. OptiFinish-manufactured gets visual
           prominence. Partner brands shown as secondary.
           Each card links to its product group page.

  Layout: 2-row grid
  - Row 1 (prominent): OptiFinish Manufactured | OptiFinish Automation
  - Row 2 (secondary): GEMA | DÜRR | Vinayak Agencies

  ┌─────────────────────────────────────────────────────────┐
  │  ● FULL PORTFOLIO                                        │
  │                                                          │
  │  "Everything OptiFinish                                  │
  │   makes, represents, and supplies."                      │
  │                                                          │
  │  ┌──────────────────────┐  ┌──────────────────────┐     │ ← row 1
  │  │ OPTIFINISH           │  │ OPTIFINISH           │     │
  │  │ MANUFACTURED         │  │ AUTOMATION           │     │
  │  │                      │  │                      │     │
  │  │ Tag: "Built by us"   │  │ Tag: "Developed by us│     │
  │  │                      │  │                      │     │
  │  │ Powder Coating Plants│  │ Z-TAP                │     │
  │  │ Curing Ovens         │  │ ZA01                 │     │
  │  │ Booths               │  │ Sieve Machine        │     │
  │  │                      │  │                      │     │
  │  │ [View Products →]    │  │ [View Products →]    │     │
  │  └──────────────────────┘  └──────────────────────┘     │
  │                                                          │
  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │ ← row 2
  │  │   GEMA       │  │    DÜRR      │  │   VINAYAK    │  │
  │  │ [logo]       │  │ [logo]       │  │  AGENCIES    │  │
  │  │ Authorised   │  │ Authorised   │  │              │  │
  │  │ Partner      │  │ Distributor  │  │ Sister       │  │
  │  │              │  │              │  │ Concern      │  │
  │  │ [View →]     │  │ [View →]     │  │ [View →]     │  │
  │  └──────────────┘  └──────────────┘  └──────────────┘  │
  └─────────────────────────────────────────────────────────┘

  Status: Not built
  Notes:  Row 1 cards are larger (60% height) vs row 2 (40%).
          Ownership label on each card removes ambiguity.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  S4 — FACILITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Purpose: Manufacturing + R&D credibility anchor.
           "Where it's made" — establishes physical
           legitimacy for industrial buyers.

  Layout: Full-width image with overlay OR 60/40 split

  ┌──────────────────────────────────────────────────────────┐
  │                                                          │
  │  [Full-width facility photo — manufacturing floor]       │
  │                                                          │
  │  ┌─────────────────────────────────┐                    │
  │  │  ● GREATER NOIDA, UTTAR PRADESH │                    │
  │  │                                 │                    │
  │  │  "Manufactured and developed    │                    │
  │  │   in-house."                    │                    │
  │  │                                 │                    │
  │  │  Manufacturing floor, R&D lab,  │                    │
  │  │  testing bay — all under one    │                    │
  │  │  roof in Greater Noida.         │                    │
  │  │                                 │                    │
  │  │  ┌──────┐ ┌──────┐ ┌──────┐   │                    │
  │  │  │ Area │ │ Est. │ │ Caps │   │  ← stat chips      │
  │  │  └──────┘ └──────┘ └──────┘   │                    │
  │  │                                 │                    │
  │  │  [See the Facility →]           │                    │
  │  └─────────────────────────────────┘                    │
  └──────────────────────────────────────────────────────────┘

  Status: Not built
  Assets needed: Facility photos (manufacturing floor, R&D lab)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  S5 — OUR TEAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Purpose: Human trust signal for high-value B2B decisions.
           Industrial buyers want to know who they're
           dealing with before spending lakhs on a line.

  Layout: Section header + 3–4 person cards in a row

  ┌──────────────────────────────────────────────────────────┐
  │  ● THE TEAM                                              │
  │                                                          │
  │  "14 years of experience,                                │
  │   built by people."                                      │
  │                                                          │
  │  ┌───────────┐  ┌───────────┐  ┌───────────┐            │
  │  │ [Photo]   │  │ [Photo]   │  │ [Photo]   │            │
  │  │           │  │           │  │           │            │
  │  │ Name      │  │ Name      │  │ Name      │            │
  │  │ Role      │  │ Role      │  │ Role      │            │
  │  │ 1-line bio│  │ 1-line bio│  │ 1-line bio│            │
  │  └───────────┘  └───────────┘  └───────────┘            │
  │                                                          │
  │  [Meet the Full Team →]                                  │
  └──────────────────────────────────────────────────────────┘

  Status: Not built
  Assets needed: Headshots, names, roles, short bios


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  S6 — CLIENTS & TESTIMONIALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Purpose: Social proof — who else has bought and what
           they said. Distinct from Our Work (which shows
           the physical output). This section is about
           trust through names and words.

  Layout: Top stat bar + client logo strip + testimonial cards

  ┌──────────────────────────────────────────────────────────┐
  │  ● TRUSTED BY INDUSTRY                                   │
  │                                                          │
  │  ┌──────────────────────────────────────────────────┐   │
  │  │  500+ Installations · 14+ Years · Pan-India      │   │
  │  └──────────────────────────────────────────────────┘   │
  │                                                          │
  │  Client logo strip (auto-scroll or static):             │
  │  [Logo] [Logo] [Logo] [Logo] [Logo] [Logo]              │
  │                                                          │
  │  ┌───────────────────┐  ┌───────────────────┐           │
  │  │ "Quote from       │  │ "Quote from       │           │
  │  │  client about     │  │  client about     │           │
  │  │  the install."    │  │  the install."    │           │
  │  │                   │  │                   │           │
  │  │  — Name, Company  │  │  — Name, Company  │           │
  │  └───────────────────┘  └───────────────────┘           │
  └──────────────────────────────────────────────────────────┘

  Status: Not built
  Assets needed: Client logos, testimonial quotes + attribution


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  S7 — OUR WORK PREVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Purpose: Show actual installations — the physical output.
           Proof through images, not words. Links to the
           full /our-work section.

  Layout: 3-card horizontal grid

  ┌──────────────────────────────────────────────────────────┐
  │  ● OUR WORK                                              │
  │                                                          │
  │  "500+ lines installed                                   │
  │   across India."                                         │
  │                                                          │
  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │
  │  │ [Photo]    │  │ [Photo]    │  │ [Photo]    │         │
  │  │            │  │            │  │            │         │
  │  │ Industry   │  │ Industry   │  │ Industry   │         │
  │  │ City       │  │ City       │  │ City       │         │
  │  │ Brief desc │  │ Brief desc │  │ Brief desc │         │
  │  └────────────┘  └────────────┘  └────────────┘         │
  │                                                          │
  │  [View All Installations →]                              │
  └──────────────────────────────────────────────────────────┘

  Status: Not built
  Assets needed: Installation photos, location + industry data


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  S8 — CONTACT CTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Purpose: Final conversion block. Warm, confident close.

  Layout: Dark card, centered copy, two CTAs

  ┌──────────────────────────────────────────────────────────┐ ← dark card
  │                                                          │
  │  "Ready to build                                         │
  │   your coating line?"                                    │
  │                                                          │
  │  Speak to our team — we design, manufacture,             │
  │  and commission end-to-end.                              │
  │                                                          │
  │  [ GET IN TOUCH ]    [ DOWNLOAD BROCHURE ]               │
  │                                                          │
  │  OptiFinish · Est. 2011 · Greater Noida                  │
  │                                                          │
  └──────────────────────────────────────────────────────────┘

  Status: Not built
  Notes:  No assets needed. Quick build.
```

---

## Narrative flow (why this order)

```
Hero              → Who we are, what we do
Automation        → We BUILD things — highest differentiation first
What We Offer     → Full portfolio, now that credibility is set
Facility          → Where it's made — physical legitimacy
Our Team          → Who's behind it — human trust
Clients           → Who else trusts us — social proof
Our Work          → Show the actual output — visual proof
Contact CTA       → Talk to us
```

---

## Build priority

| Priority | Section | Blocker |
|---|---|---|
| ✅ Done | S1 Hero | — |
| 1 | S2 Proprietary Automation | Z-TAP visual available; ZA01 + Sieve photos needed |
| 2 | S3 What We Offer | No assets needed — pure frontend |
| 3 | S8 Contact CTA | No assets needed — quick build |
| 4 | S6 Clients & Testimonials | Client logos + quotes needed |
| 5 | S7 Our Work Preview | Installation photos needed |
| 6 | S4 Facility | Facility photos needed |
| 7 | S5 Our Team | Headshots + bios needed |

---

## Design rules (all sections)

- **Section spacing:** `py-24 md:py-32`
- **Max width:** `max-w-[1440px] mx-auto px-5 md:px-10 lg:px-12`
- **Dark cards:** `bg-[#0a0a0a] rounded-[1.75rem]` with yellow hairline top
- **Section kickers:** small-caps, yellow pulse bullet (same as hero)
- **Motion:** Framer Motion entry animations, `ease = [0.22, 1, 0.36, 1]`
- **Yellow accent:** `#FECE00` on key words, CTAs, dividers, stats
- **Type:** Space Grotesk display / Inter body

---

## Open decisions (pending approval)

- [ ] Approve this section structure
- [ ] Confirm team members to include in S5
- [ ] Confirm client logos available for S6
- [ ] Confirm installation photos available for S7
- [ ] Confirm facility photos available for S4
- [ ] ZA01 + Sieve Machine visuals for S2
