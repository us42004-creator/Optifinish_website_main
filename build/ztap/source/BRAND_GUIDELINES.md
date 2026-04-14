# OptiFinish Brand Guidelines

This document is the master brand guide for the OptiFinish website currently implemented in this repository. It is written to support three use cases at once:

- rebuilding the current site with high fidelity
- extending the brand into future pages and product marketing surfaces
- handing off the brand to future designers, developers, or agency partners

This guide uses the live codebase as the primary source of truth and adds a recommended canonical system where the current implementation is visually consistent but not yet fully normalized in code.

Supporting documents:

- [Component System](./docs/brand/component-system.md)
- [Page Blueprint](./docs/brand/page-blueprint.md)
- [Assets, Imagery, and Voice](./docs/brand/assets-voice.md)

## 1. Brand Summary

OptiFinish should feel like a premium industrial automation brand that turns skilled manual coating into repeatable robotic execution. The visual system is not generic SaaS minimalism. It combines:

- industrial precision
- operator-first usability
- premium hardware presentation
- controlled kinetic energy
- technical confidence without engineering clutter

The site should communicate that OptiFinish is advanced, practical, and real-world deployable. It is not positioned as abstract AI software. It is a line-ready system grounded in motion capture, coating fidelity, and manufacturing outcomes.

## 2. Brand Pillars

### 2.1 Precision With Human Intent

The product promise is not simply automation. It is preserving the operator's coating intent and transferring it into robotic repeatability.

### 2.2 Premium Industrial Modernity

The aesthetic should feel closer to a high-end machine interface, performance hardware launch, or advanced fabrication lab than a corporate manufacturing brochure.

### 2.3 Operator-First Simplicity

Messaging and interface structure should reduce robotics complexity. Every page should feel understandable to operations teams, plant leadership, and technically curious buyers.

### 2.4 Kinetic Demonstrability

Motion is part of the brand. Scroll choreography, reveal timing, progress indicators, hover magnetism, and grid sweeps all reinforce the product story of guided motion becoming controlled automation.

## 3. Source Of Truth

Current implementation sources:

- global tokens and utilities: `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/app/globals.css`
- font setup and metadata: `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/app/layout.tsx`
- page composition: `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/app/page.tsx`
- reusable UI primitives: `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/components/ui`
- narrative sections: `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/components/sections`

When this guide and the live UI disagree, use this order:

1. Live UI for immediate visual fidelity
2. This master guide for intent and system rules
3. Supporting docs for implementation detail
4. Recommended future normalization rules for refactors and new work

## 4. Logo And Identity

### 4.1 Brand Name

Primary brand name: `OptiFinish`

Associated product language on the current site:

- `Z-TAP`
- `Zero-Touch Robotic Coating`
- `Mimic-guided coating automation`

Recommended hierarchy going forward:

- corporate/site brand: `OptiFinish`
- flagship workflow or technology label: `Z-TAP`
- descriptive category line: `Zero-Touch Robotic Coating`

### 4.2 Logo Usage

The current site uses the raster logo asset at `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/public/logo.png`.

Rules:

- use the logo as the primary brand mark in navigation, preloader, and footer
- preserve its original proportions
- never stretch, recolor, or place low-contrast overlays on top of it
- prefer generous negative space around the logo
- on dark surfaces, keep strong clarity and avoid crowding with copy
- on light surfaces, retain enough contrast using clean backgrounds or frosted containers

Recommended clear space:

- minimum clear space equal to the height of the capital `O` in the logotype on all sides

Recommended minimum sizes:

- navbar desktop: around `40px` visual height
- navbar compact state: around `34px`
- footer: around `48px`
- mobile menu: around `40px`

Do not:

- rotate the logo
- add shadows directly to the mark unless already present in the source file
- place it over busy photography without a container
- apply gradient fills or outline effects

### 4.3 Sub-Brand Relationship

`Z-TAP` is a featured workflow/technology label, not a replacement for `OptiFinish`. It can be highlighted inside headlines, diagrams, demo sections, or hero messaging, but the site chrome should still anchor to OptiFinish.

## 5. Tone And Messaging

Brand voice should be:

- direct
- technical but legible
- confident
- concise
- grounded in outcomes
- never inflated or futuristic for its own sake

The writing should sound like a team that understands lines, coating quality, deployment friction, and operator behavior.

Voice rules:

- explain advanced capability in operational language
- prefer verbs like `teach`, `store`, `build`, `recognise`, `coat`
- make benefit statements concrete
- avoid empty AI buzzwords
- avoid management-consulting phrasing
- avoid overclaiming autonomy

Headline pattern:

- short
- uppercase-heavy or title-case with strong display rhythm
- one highlighted yellow phrase at most
- usually split over 2 lines

Body copy pattern:

- compact
- high-information
- outcome-oriented
- written for scanning

CTA language pattern:

- action-led
- concrete
- tied to a real next step

Preferred CTA examples:

- `Request Consultation`
- `Request Demo Access`
- `Download Spec Sheet`
- `Visit Our Lab`

## 6. Core Visual Theme

The OptiFinish site uses a dual-world visual system:

- light surfaces for clarity, explanation, and product framing
- dark surfaces for drama, seriousness, technical depth, and conversion emphasis

This is not a flat alternating section pattern. It is a deliberate contrast rhythm:

- hero begins as cinematic light-with-depth and transitions into anchored motion storytelling
- dark sections signal gravity, challenge, and technical focus
- light sections present explanation, UI, evidence, and structure
- final dark conversion section restores urgency and focus

The look should feel:

- premium
- mechanical
- clean
- tactile
- layered
- illuminated rather than colorful

## 7. Color System

### 7.1 Current Brand Tokens

From `globals.css`:

- `--color-yellow: #FECE00`
- `--color-yellow-light: #FFF3A3`
- `--color-yellow-dark: #C9A500`
- `--color-ink: #0A0A0A`
- `--color-ink-muted: #3D3D3D`
- `--color-surface: #DCDCDB`
- `--color-surface-2: #D2D2D1`
- `--color-surface-3: #C8C8C7`
- `--color-void: #080808`

Base page background currently resolves to approximately `#F1EFEA`.

### 7.2 Color Roles

`Brand Yellow`

- primary accent
- CTA fill
- progress state
- highlight word in hero or headings
- active dots, micro-indicators, glowing accents

`Ink / Void`

- primary typography
- dark section backgrounds
- technical surfaces
- premium contrast framing

`Warm Light Surface`

- default page field
- neutral base behind cards and media
- keeps the brand from feeling cold or sterile

`Muted Grays`

- secondary copy
- borders
- specification panels
- glassmorphism support

### 7.3 Usage Ratios

Recommended visual ratio on most pages:

- 65 to 75% neutral light/dark base
- 15 to 25% structured grayscale support
- 8 to 12% yellow emphasis
- less than 5% glow or special effects

Yellow should guide attention, not flood the page.

### 7.4 Color Rules

- use yellow for emphasis, status, progression, and calls to action
- do not use additional saturated brand colors unless a new system is intentionally introduced
- keep dark areas near-black, not charcoal-blue
- keep light areas warm and slightly material, not stark white by default
- use transparency and blur to create depth before introducing new colors

## 8. Typography

### 8.1 Typefaces

Current typography:

- display: `Space Grotesk`
- body: `Inter`
- mono/data: `JetBrains Mono`

### 8.2 Type Roles

`Space Grotesk`

- large headlines
- section titles
- technology labels
- high-emphasis card headings

`Inter`

- paragraphs
- UI labels
- navigation
- form fields
- buttons

`JetBrains Mono`

- counters
- spec-like micro-data
- system-state details
- preloader numerics

### 8.3 Typographic Personality

Typography should feel:

- engineered
- compressed in intent, not literally condensed
- bold and decisive in headings
- legible and stable in body copy

### 8.4 Typography Rules

- headings often use uppercase and tight tracking
- display headings should carry the emotional load of the section
- body copy should remain sentence case and readable
- mono should be used sparingly as a systems accent, not as normal paragraph text
- never mix too many weights in a single block

### 8.5 Future Normalization Recommendation

The design currently relies on repeated utility classes like `font-display`, `font-black`, `uppercase`, and custom heading classnames. Future replication will be easier if type styles are tokenized into named roles:

- `type-display-hero`
- `type-display-section`
- `type-card-title`
- `type-eyebrow`
- `type-body-md`
- `type-body-sm`
- `type-data-label`

## 9. Spacing And Layout

### 9.1 Structural Layout

The site uses a full-width narrative layout with contained content blocks. Common horizontal paddings:

- mobile: `px-6`
- tablet: `md:px-10`
- desktop: `lg:px-12`

Common section vertical spacing:

- mobile: `py-14` to `py-16`
- tablet: `py-20`
- desktop: `py-24`

### 9.2 Layout Philosophy

- sections should feel cinematic, not cramped
- cards can be dense, but the section around them should breathe
- use large-radius containers to create object-like premium modules
- align sections to a consistent outer grid even when internal compositions vary

### 9.3 Recommended Canonical Spacing Scale

Current implementation is visually coherent but partly hand-tuned. For future work, normalize around a scale like:

- `4`
- `8`
- `12`
- `16`
- `20`
- `24`
- `32`
- `40`
- `48`
- `64`
- `80`
- `96`

Use larger increments for sections and panel groups. Use tighter increments only inside cards and form controls.

## 10. Shape Language

The brand uses soft-rounded industrial geometry.

Current core radii:

- `--radius-card: 1.75rem`
- `--radius-pill: 9999px`

Observed shape patterns:

- major section cards: `1.6rem` to `2rem`
- pills and CTAs: fully rounded
- inner panels: `1rem` to `1.5rem`

Rules:

- prefer generous radii over sharp corners
- avoid perfect rectangles unless intentionally utilitarian
- keep rounded forms consistent across cards, controls, and media frames
- corners should feel machined and premium, not playful

## 11. Surface System

The site relies on layered surfaces rather than flat blocks.

Primary surface families:

- `Light Glass Surface`
- `Dark Industrial Surface`
- `Neutral Data Surface`
- `Media Shell Surface`

Utility classes already express this:

- `.section-frame`
- `.panel-shell`
- `.hero-card-surface`

Surface characteristics:

- low-opacity borders
- layered gradients
- selective inner highlights
- deep but soft shadows
- occasional yellow glow
- blur used only where it adds depth or premium tactility

Rules:

- every major module should feel like an object
- use surface layering to separate meaning, not decoration alone
- dark surfaces should not become muddy
- light surfaces should not become plain white cards

## 12. Motion Principles

Motion is a primary brand behavior, not just enhancement.

### 12.1 Motion Personality

Motion should feel:

- smooth
- deliberate
- guided
- weighted
- premium

It should never feel:

- bouncy in a playful way
- hyperactive
- random
- decorative without narrative purpose

### 12.2 Motion Types In Use

Current site patterns:

- preloader reveal and readiness sequence
- pinned hero scroll storytelling
- scroll-triggered line-by-line heading reveals
- card entrance staggers
- parallax grid drift
- button sheen sweep
- hover magnetism
- cursor magnetism
- mobile drag/inertia carousel
- progress fill animations
- grid sweeps and spark pulses

### 12.3 Motion Rules

- reveals should usually originate from small directional offsets, not giant travel
- scroll animations should support content comprehension
- keep durations eased and premium, often `power2` or `power3`
- use blur sparingly during entry and remove it fully on settle
- use yellow flashes as signal moments, not ambient noise

### 12.4 Accessibility Rule

Future refinement should add a `prefers-reduced-motion` layer for all non-essential motion. Replication projects should preserve brand feel while reducing pinned scroll scenes, cursor effects, and oscillating glows when users prefer less motion.

## 13. Interaction Design

The interaction model should feel tactile and high-intent.

Interaction signatures:

- magnetic hover response on premium elements
- cursor enlargement over targets
- drag-enabled mobile cards
- hover glow and sheen on CTAs
- sticky/pinned narrative motion
- scroll as storytelling

Rules:

- every interaction should reinforce perceived precision
- hover states should be noticeable but never noisy
- magnetic behaviors should remain subtle
- primary CTA interactions should feel slightly more alive than secondary actions
- mobile interactions should replace hover elegance with drag, tactile scale, and clear tap affordance

## 14. Accessibility Expectations

Balanced strictness means preserving the brand while improving implementation when practical.

Required rules for future replication:

- maintain strong contrast on yellow-on-dark and dark-on-yellow pairings
- avoid small, low-opacity copy for critical content
- keep tap targets at least comfortable on mobile
- ensure forms have labels, error messaging, and success states
- keep animations skippable or reduced for motion-sensitive users
- preserve keyboard focus visibility even in premium/glass UI

## 15. Photography And Imagery

Imagery should support industrial credibility.

Preferred image categories:

- robotic arms in action
- spray/coating hardware
- line equipment
- interface or control mockups
- close-up technical detail
- real process imagery over generic stock when possible

Image treatment rules:

- crop with intention
- prioritize machinery silhouettes and motion direction
- use imagery to show process fidelity, not just ambiance
- allow warm neutrals, blacks, metallics, and yellow accents to dominate
- avoid bright multi-color factory photos that weaken the brand palette

When using product posters or mockups:

- frame them inside premium shells
- reinforce object quality with shadows, highlights, and edge definition
- add subtle overlays rather than loud UI chrome

## 16. Iconography

Current site uses minimal iconography and favors dots, pills, linework, and UI indicators over broad icon sets.

Rules:

- prefer simple geometric icons
- use icons as support, not decoration
- keep strokes clean and modern
- avoid whimsical or rounded-cartoon icon sets
- use yellow sparingly as the active or highlight state

## 17. Component Families

The current site already clusters into reusable component families even where the codebase could be more normalized.

Primary families:

- site chrome
- section headers
- pills and badges
- CTA buttons
- premium cards and panels
- media frames
- carousels and step indicators
- stats/spec rows
- form controls
- progress and status indicators
- background systems
- motion wrappers

See the dedicated component inventory:

- [Component System](./docs/brand/component-system.md)

## 18. Page Narrative Model

The homepage is a proof-driven narrative sequence:

1. establish intrigue and technology identity
2. show the core workflow visually
3. explain the problem with current methods
4. show how the system works
5. demonstrate the product and line-level fit
6. present capability summary
7. convert with a real-world next step

Future pages should not copy the homepage literally, but they should retain the same brand narrative traits:

- fast orientation
- proof before abstraction
- product confidence
- clear conversion path

See the structural breakdown:

- [Page Blueprint](./docs/brand/page-blueprint.md)

## 19. Conversion Design Rules

OptiFinish CTAs should feel like operational next steps, not generic lead-gen buttons.

Conversion principles:

- ask for a concrete action
- keep forms concise
- anchor trust with specificity
- pair the form with tangible visit/demo value
- maintain high-contrast conversion zones

Form tone:

- straightforward
- business-focused
- low-friction

## 20. What Must Stay Consistent

These are the brand non-negotiables for replication:

- warm industrial neutral palette with controlled yellow emphasis
- Space Grotesk + Inter + JetBrains Mono role split
- large, assertive display headlines
- premium rounded object-like surfaces
- alternating light/dark narrative rhythm
- motion as guided precision
- operator-first tone of voice
- concrete CTA language
- product-story sections built from reusable panels, not generic web blocks

## 21. What Can Flex

These can adapt as long as the overall feel stays intact:

- exact section order on non-home pages
- card count inside a section
- degree of glass effect
- specific imagery crop
- headline wording
- animation choreography details
- layout ratio between text and media

## 22. Recommended Future System Cleanup

To make future replication easier, the next implementation pass should extract and standardize:

- semantic spacing tokens
- semantic shadow tokens
- semantic radius tokens beyond card and pill
- named heading and body text classes
- a unified `Button` component
- a unified `SectionHeader` component
- a unified `Panel` or `SurfaceCard` component
- a unified `SpecList` and `FeatureList` pattern
- a unified `FormField` and `SelectField` system
- a motion token map for durations and easing
- a documented reduced-motion strategy

These recommendations are additive. They should preserve the current visual brand, not flatten it.

## 23. Deliverable Checklist For Future Teams

Any future replication should include:

- token file for colors, type, spacing, radii, shadows, and motion
- logo package with usage rules
- reusable component library aligned with this guide
- page templates for hero, feature, proof, and conversion sections
- asset guidance for imagery and mockups
- content style guide for headlines, body, and CTA copy
- accessibility and reduced-motion pass

## 24. Supporting Documentation

Use these alongside the master guide:

- [Component System](./docs/brand/component-system.md)
- [Page Blueprint](./docs/brand/page-blueprint.md)
- [Assets, Imagery, and Voice](./docs/brand/assets-voice.md)

