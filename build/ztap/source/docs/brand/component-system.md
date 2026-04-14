# OptiFinish Component System

This document breaks the current website into reusable component families so future teams can rebuild or extend the experience without reverse-engineering each section from scratch.

## 1. System Overview

The site is built from a small set of visual primitives reused in different combinations:

- section headers
- pills and micro-badges
- premium surfaces
- CTA buttons
- framed media modules
- feature/spec cards
- carousel and step navigation
- forms
- background grid systems
- motion wrappers

The current codebase expresses these patterns in a mix of component files and repeated utility class compositions. For future replication, these should be treated as a canonical design system.

## 2. Core Tokens Used By Components

Primary tokens currently defined in `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/app/globals.css`:

- colors: yellow, yellow-light, yellow-dark, ink, ink-muted, surface, surface-2, surface-3, void
- fonts: sans, display, mono
- radii: card, pill

Recommended missing token categories for future implementation:

- spacing scale
- shadow scale
- border-opacity scale
- motion duration scale
- easing presets
- z-index map

## 3. Site Chrome

### 3.1 Navbar

Source:

- `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/components/ui/Navbar.tsx`

Role:

- top-level site identity
- section navigation
- primary conversion entry point
- adaptive surface that shifts from light frosted chrome to dark compact chrome

Visual rules:

- always fixed at top
- centered pill-shaped shell
- frosted or translucent background
- rounded full-pill silhouette
- compacts after hero threshold
- logo on left, nav center, CTA right

Behavior rules:

- expands on hover when compacted
- transitions between light and dark based on scroll threshold
- mobile opens into a full-screen dark overlay menu

Canonical props for future component:

- `theme: light | dark | adaptive`
- `compact: boolean`
- `links`
- `primaryCta`
- `logo`

### 3.2 Footer

Source:

- `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/components/ui/Footer.tsx`

Role:

- quiet closing brand marker
- operational context and legal ownership

Rules:

- keep dark
- use subdued contrast
- do not over-design
- reinforce identity without competing with conversion sections

## 4. Section Header Pattern

Appears throughout:

- Live Demo
- Zero Touch
- Capabilities
- Waitlist
- other narrative sections

Common anatomy:

- pill/eyebrow
- two-line or three-line display heading
- one highlighted yellow phrase
- compact supporting paragraph
- optional CTA aligned beside or below body copy

Motion:

- pill enters first
- heading lines reveal directionally
- paragraph follows with lighter motion

Canonical future component:

- `SectionHeader`

Suggested API:

- `eyebrow`
- `titleLines`
- `highlightIndices`
- `body`
- `alignment`
- `theme`
- `cta`

## 5. Pill And Badge System

Source:

- `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/components/ui/Pill.tsx`

Current variants:

- `yellow`
- `dark`
- `outline`

Common characteristics:

- full pill radius
- tiny leading indicator dot
- uppercase micro-label
- high tracking
- concise text

Use cases:

- section categorization
- state markers
- technology tags
- content grouping

Rules:

- keep text short
- use as an orienting marker, not as paragraph content
- avoid stacking too many pills in a single viewport

## 6. CTA Button System

Current patterns exist as utility classes rather than a single React component.

Primary utility classes:

- `.panel-button`
- `.dynamic-button`
- `.dynamic-button-dark`
- `.dynamic-button-light`
- `.dynamic-button-yellow`

Button families:

- `Primary Yellow`
- `Dark Premium`
- `Light Glass`
- `Inline Utility`

### 6.1 Primary Yellow Button

Use for:

- top-priority actions
- conversion actions
- demo/spec/lab requests

Traits:

- yellow fill
- dark text
- rounded full-pill shape
- uppercase
- strong tracking
- subtle hover lift

### 6.2 Dark Premium Button

Use for:

- actions placed on light backgrounds when the yellow button would create too much noise

Traits:

- black gradient fill
- inner highlight
- stronger glow on hover

### 6.3 Motion Rules For Buttons

- include slight lift on hover
- optional light sheen sweep
- optional glow accent
- transitions should be smooth and slightly luxurious

Future normalization recommendation:

- create a single `Button` component with `variant`, `size`, `theme`, and `magnetic` props

## 7. Surface Components

### 7.1 Section Frame

Utility:

- `.section-frame`

Traits:

- dark layered gradient
- soft border
- generous radius
- deep external shadow
- faint yellow ambient edge energy

Use for:

- large narrative or technical modules

### 7.2 Panel Shell

Utility:

- `.panel-shell`

Traits:

- semi-translucent inner panel
- soft border
- subtle yellow tint in radial highlight

Use for:

- nested technical panels
- informational submodules

### 7.3 Hero Card Surface

Utility:

- `.hero-card-surface`

Traits:

- light frosted premium card
- stronger white highlight
- softer dark shadow
- suitable for device frames or UI panels

Use for:

- media framing
- proof blocks
- spec summaries

## 8. Media Frame Pattern

Strong example:

- `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/components/sections/LiveDemo.tsx`

Anatomy:

- outer premium shell
- faux window/header strip
- framed image or video
- overlay glow
- play-state or meta-state indicator
- caption block
- contextual tag or label

Rules:

- media must feel presented, not merely placed
- surrounding frame should increase perceived product value
- overlays should be minimal and high-contrast

## 9. Feature And Proof Cards

Examples:

- Zero Touch problem cards
- Capabilities feature list
- Capabilities spec tiles

Patterns:

- compact title + short evidence copy
- large radius
- soft border
- card family theme based on section background
- optional index number or tag

Rules:

- cards should scan quickly
- avoid overlong text blocks
- title should do the heavy lifting
- each card should communicate one idea

## 10. Carousel System

Source:

- `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/components/ui/MobileCarousel.tsx`

Role:

- mobile alternative to desktop multi-column or pinned-story layouts

Characteristics:

- draggable
- inertia-based
- snap-to-card
- animated indicators
- press feedback on touch

Rules:

- use when desktop layouts do not translate well to stacked mobile
- cards should remain large and immersive
- indicators should reflect theme and not overpower content

## 11. Step Indicator And Progress Patterns

Examples:

- hero operating steps and coat progress
- zero-touch workflow dots
- carousel dot expansion
- animated coating flow bars

Rules:

- progress should feel process-oriented
- active state uses yellow
- inactive state stays muted
- widths can expand to show emphasis, but avoid novelty-only animation

## 12. Form System

Primary source:

- `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/components/sections/Waitlist.tsx`

Current features:

- dark conversion card
- rounded inputs
- inline country code selector
- OTP verification flow for India
- submission states
- animated success state

### 12.1 Form Field Style

Current field traits:

- dark translucent background
- soft border
- large radius
- white text
- yellow focus state

Rules:

- forms should feel premium and serious
- keep fields spacious
- avoid tiny placeholder-based-only labeling in future variants
- pair error text with direct guidance

### 12.2 Form Card Pattern

Traits:

- dark shell
- clear conversion hierarchy
- high contrast against background
- paired with supporting benefits on the left

Future normalization recommendation:

- extract `InputField`, `SelectField`, `PhoneField`, `OtpField`, `FormMessage`, and `SuccessPanel`

## 13. Background Systems

### 13.1 Scroll Grid

Source:

- `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/components/ui/ScrollGrid.tsx`

Role:

- establishes the site's technical atmosphere
- gives motion to the environment without overwhelming content

Traits:

- fine white grid
- larger yellow accent grid
- parallax transform on scroll

### 13.2 Section-Specific Grid Treatments

Patterns seen across sections:

- dim industrial grid on dark backgrounds
- multiply-blended warm grid on light backgrounds
- sweep overlays
- pulse overlays
- spark intersections

Rule:

- background effects should support section mood and never reduce readability

## 14. Cursor And Magnetic System

Source:

- `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/components/ui/InteractiveCursor.tsx`

Role:

- reinforces premium tactility on desktop

Traits:

- large translucent ring cursor
- yellow inner ring detail
- yellow dot follower
- hover scaling over interactive or content targets
- magnetic target drift

Rules:

- desktop only
- subtle transform magnitudes
- should feel precise, not gimmicky

## 15. Preloader

Source:

- `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/components/ui/PreloaderC.tsx`

Role:

- establishes technical credibility before first interaction
- frames the product as a system booting into readiness

Key ingredients:

- numeric loading count
- yellow scanline
- soft spotlight
- floating value pills
- logo reveal
- readiness moment

Rules:

- preloaders are optional on future pages; do not use everywhere
- if used, they must align with system readiness, machine boot, or technical calibration metaphors

## 16. Section-Level Component Map

Homepage composition in `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/app/page.tsx`:

- `Navbar`
- `Hero`
- `HmiTabletShowcase`
- `LiveDemo`
- `ZeroTouch`
- `VisionLayer`
- `EndToEnd`
- `LineImpact`
- `Capabilities`
- `Waitlist`
- `Footer`

Future page templates should be assembled from these families rather than creating one-off sections by default.

## 17. Recommended Canonical Component Library

Future design-system library should include:

- `SiteNavbar`
- `SiteFooter`
- `SectionHeader`
- `Pill`
- `Button`
- `SurfaceCard`
- `DarkPanel`
- `MediaFrame`
- `FeatureCard`
- `SpecGrid`
- `StatPill`
- `ProgressSteps`
- `Carousel`
- `FormField`
- `SelectField`
- `LeadCaptureCard`
- `BackgroundGrid`
- `MagneticWrapper`

## 18. Build Rules For Future Teams

- start with a component from this list before inventing a new pattern
- if a new component is needed, define its role, theme, and motion behavior
- keep the component family small and expressive
- avoid drifting into generic SaaS cards and buttons
- preserve the existing premium industrial silhouette language

