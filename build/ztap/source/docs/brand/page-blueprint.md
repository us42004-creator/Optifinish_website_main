# OptiFinish Page Blueprint

This document explains how the current homepage is structured and how future pages should borrow its narrative logic without becoming repetitive.

## 1. Homepage Narrative Sequence

The current homepage in `/Users/utkarshsharma/Desktop/Optifinish_website_main/build/ztap/source/src/app/page.tsx` is a guided story, not a stack of independent marketing blocks.

Sequence:

1. `Hero`
2. `HmiTabletShowcase`
3. `LiveDemo`
4. `ZeroTouch`
5. `VisionLayer`
6. `EndToEnd`
7. `LineImpact`
8. `Capabilities`
9. `Waitlist`

This creates a specific narrative arc:

1. intrigue and category framing
2. interface/product credibility
3. visual proof
4. problem articulation
5. workflow explanation
6. systems fit
7. quantified impact
8. technical confidence
9. conversion

## 2. Section Archetypes

Future pages should be built from these archetypes.

### 2.1 Cinematic Hero

Purpose:

- introduce product identity fast
- communicate the core promise emotionally and visually
- establish the site's motion language

Required ingredients:

- strong display headline
- one highlighted yellow phrase
- product or machine image
- layered background system
- at least one strong CTA
- narrative motion

### 2.2 Interface Or Product Showcase

Purpose:

- show the operating environment
- reduce abstraction

Required ingredients:

- premium media frame
- concise explanatory copy
- restrained annotations or tags

### 2.3 Proof Section

Purpose:

- let users see the product or process as evidence

Formats:

- demo poster/video frame
- before/after structure
- problem/evidence cards
- metrics panel

### 2.4 Problem Framing Section

Purpose:

- articulate the operational gap in current workflows

Rules:

- use concise, specific pain points
- keep tone factual
- avoid fear-based copywriting

### 2.5 Workflow Explanation Section

Purpose:

- make the system understandable quickly

Rules:

- present the process in sequential steps
- keep labels short and verb-led
- support with dots, sliders, or progress movement

### 2.6 Technical Fit Section

Purpose:

- show compatibility, deployment realism, and implementation confidence

Formats:

- spec cards
- architecture strip
- data summary
- supporting feature list

### 2.7 Conversion Section

Purpose:

- turn interest into a real next step

Rules:

- use a serious, high-contrast environment
- pair form with reasons to act
- prefer a concrete action like visit, demo, assessment, or consultation

## 3. Section Rhythm

The homepage succeeds because it alternates emotional and informational intensity.

Recommended rhythm:

- high drama
- focused explanation
- proof
- problem tension
- process clarity
- systems confidence
- conversion urgency

Do not place too many informational blocks in a row without a visual proof or product anchor.

## 4. Background Rhythm

Use background changes to mark meaning shifts:

- light sections for clarity
- dark sections for technical gravity
- mixed hero environments for cinematic identity

Do not alternate colors mechanically. Each background shift should signal a narrative change.

## 5. Grid And Containment

All pages should respect the same outer content frame:

- mobile: `px-6`
- tablet: `md:px-10`
- desktop: `lg:px-12`

Preferred container behavior:

- full-width sections
- contained internal grids
- oversized radiused modules inside the section when content needs hierarchy

## 6. Heading Construction

Most sections should follow this formula:

- eyebrow pill
- 2-line display heading
- one yellow emphasis phrase
- concise body paragraph
- optional CTA

Avoid long essay-like intros. The page should feel navigable through headings alone.

## 7. CTA Placement

Primary CTA placements:

- hero
- proof section
- capability or spec section
- final conversion section

Rules:

- do not put strong CTAs in every section
- reserve the brightest actions for moments of confidence or readiness
- use secondary, quieter actions elsewhere

## 8. Mobile Adaptation Rules

The site does not simply stack desktop layouts. It adapts the interaction model.

Patterns to preserve:

- replace multi-column density with carousel or larger single-card focus
- keep headings bold and compact
- preserve tactile motion through drag, scale, and simplified reveals
- maintain generous tap areas

## 9. Page Templates For Future Use

### 9.1 Product Overview Page

Suggested structure:

1. cinematic hero
2. core workflow
3. operator benefit cards
4. technical fit summary
5. demo proof
6. CTA

### 9.2 Technology Detail Page

Suggested structure:

1. focused hero
2. subsystem explanation
3. architecture/spec section
4. real-world use cases
5. FAQ or implementation notes
6. CTA

### 9.3 Industry Landing Page

Suggested structure:

1. industry-specific hero
2. industry pain points
3. OptiFinish fit for that workflow
4. proof/example imagery
5. capabilities snapshot
6. CTA for consultation or lab visit

## 10. What To Avoid

- generic boxed marketing sections with no motion or hierarchy
- too many equal-weight cards
- heavy text walls
- flat white backgrounds with no surface treatment
- bright multi-color illustrations
- overly software-centric UI language that loses the industrial story

## 11. Recommended Future Normalization

To make page assembly easier, define reusable section templates:

- `HeroSection`
- `MediaStorySection`
- `ProblemCardsSection`
- `WorkflowSection`
- `SpecsAndFeaturesSection`
- `MetricsSection`
- `ConversionSection`

Each template should accept content and theme props while preserving the OptiFinish visual grammar.

