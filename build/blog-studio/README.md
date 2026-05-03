# OptiFinish Blog Studio

AI-driven editorial pipeline that turns a category × audience selection into a publishable, image-rich, OptiFinish-branded blog post.

Standalone Vite + React 19 + TS workspace. Will fold into the OptiFinish Next.js site as an internal route once the content shape is locked.

---

## Run it

```bash
cd build/blog-studio
pnpm install
pnpm dev      # http://localhost:5000
```

End-to-end preview without clicking through the UI:

```bash
node scripts/preview.mjs
# writes public/preview.html (open at http://localhost:5000/preview.html)
```

---

## What it does, stage by stage

| Stage | What it does | Powered by |
|---|---|---|
| 1. Category | User picks one of 7 (Product Spotlight / Technical Deep Dive / Case Study / Industry Trends / How-To / Facility / Buyer's Guide) | `src/constants.ts` |
| 2. Audience | User picks one of 6 (Plant Manager / Procurement / OEM Engineer / R&D / C-Level / Existing Customer) | `src/constants.ts` |
| 3. Topic ideation | LLM produces 5 topic candidates anchored to real 2025-26 industry triggers (BEE Jan-2026, CBAM, Mahindra Chakan, Jindal non-chromate, GEMA OptiSpray, etc.) | Llama 3.3 70B via NVIDIA Build → `src/services/topicEngine.ts` |
| 4. Draft | LLM writes the full blog body, snapshot fields (decision friction, dominant anxiety, core insight, structural shape, lever), and 2 image prompts whose subjects map to the section content | Llama 3.3 70B → `src/services/draftEngine.ts` |
| 5. SEO | Meta title, description, slug, focus keyword, schema.org JSON-LD | Currently mocked; `src/services/aiService.ts` |
| 6. Edit | Direct edit + "tell the engine what to change" prompt | Currently mocked |
| 7. Images | 2 inline images at 1024×1024, anchored to specific H2 headings, with auto-retry on transient 5xx | FLUX.1-dev via NVIDIA Build → `src/services/nvidiaImageService.ts` |
| 8. Export | Single self-contained HTML file shaped like the Avacasa "Dossier Calibration" template, with OptiFinish brand swaps (ember-orange + ink-black, Cormorant Garamond + Inter typography) | `src/services/templateBuilder.ts` |

---

## File structure

```
build/blog-studio/
├── src/
│   ├── App.tsx                      # 8-stage pipeline UI shell
│   ├── main.tsx
│   ├── types.ts                     # Stage / Category / Audience / DossierSnapshot / BlogDraft contracts
│   ├── constants.ts                 # 7 categories + 6 audiences + brand strings
│   ├── components/
│   │   ├── StageRail.tsx
│   │   └── PickerCard.tsx
│   └── services/
│       ├── aiService.ts             # Public API used by App.tsx, delegates to engines below
│       ├── topicEngine.ts           # Topic prompt + 18-trigger pool + cliché-substitution patterns
│       ├── draftEngine.ts           # Draft prompt + subject-anchored image rules
│       ├── nvidiaLlmService.ts      # OpenAI-compatible chat client → NVIDIA Build
│       ├── nvidiaImageService.ts    # FLUX.1-dev client + brand-style suffix
│       └── templateBuilder.ts       # Final HTML output template (Avacasa-derived)
├── scripts/
│   └── preview.mjs                  # End-to-end pipeline CLI runner
├── public/
│   └── qr.html                      # LAN QR code page (open on desktop, scan from phone)
├── index.html
├── vite.config.ts                   # Server-side proxy that injects NVIDIA keys
├── package.json
├── tsconfig.json
└── .env.local                       # GITIGNORED — NVIDIA Build keys (LLM + Flux + SD)
```

---

## How API keys stay safe

`.env.local` holds the NVIDIA Build keys. Vite's dev-server proxy injects them as `Authorization: Bearer …` headers when forwarding browser requests:

- Browser hits `/nvidia/llm/chat/completions` → Vite → `https://integrate.api.nvidia.com/v1/chat/completions`
- Browser hits `/nvidia/flux/flux.1-dev` → Vite → `https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-dev`

Keys never appear in the client bundle or browser network tab. See `vite.config.ts`.

---

## Editorial guardrails baked into the prompts

- **No fabricated numbers.** A B2B reader catches a made-up "12% rejection drop" in five seconds — the prompt forbids inventing percentages, INR figures, or ROI claims.
- **Cliché substitution.** "Did you know…", "What if you could…", "In today's competitive market…" are all banned with explicit alternative patterns.
- **Trigger anchoring.** At least 2 of every 5 topics must reference a real 2025-26 trigger from a curated 18-entry pool inside `topicEngine.ts`. Refresh the pool quarterly; that's the freshness lever.
- **Subject-anchored images.** Every image prompt's first phrase must be a concrete physical subject named in the section it anchors to. For abstract topics (regulation, market shift), the model is forced to pick a representative physical scene instead of a fake-looking AI chart.

---

## Known gaps (next-pass work)

- Body length lands at ~500 words; target is 1100–1400. Llama 3.3 70B in JSON mode hard-stops near 500. Fix: switch the *draft* call (only) to `meta/llama-3.1-405b-instruct`. Single-line model swap in `draftEngine.ts`.
- Section H2s drift to "Introduction to…", "Conclusion and Call to Action". Suppress in the prompt with a banned-headings list.
- SEO and Edit stages still call mock functions in `aiService.ts`.
- Image renders are 1024×1024 only on this NVIDIA endpoint — UI displays them cropped via CSS. For true wide ratios, swap in fal.ai's `fal-ai/flux-pro` (single-file change in `nvidiaImageService.ts`).

---

## Integration plan with the main OptiFinish site

This is intentionally a separate workspace until content quality is proven. Once locked, the move is:

1. Lift `src/services/*` into `build/optifinish/lib/blog-studio/` (Next.js API routes call them server-side, so keys move from Vite proxy to Next.js route handlers).
2. Lift the Stage UI into `app/admin/blog-studio/page.tsx` (Next.js App Router, server-component rendered).
3. Lift `templateBuilder.ts` into the Next.js MDX/blog publishing pipeline so exports land directly into the live site instead of as downloaded HTML files.
