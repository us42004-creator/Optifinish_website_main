# OptiFinish Website — Claude Code Context

This file is read automatically by Claude Code on every device. Keep it up to date.

---

## What This Project Is

Umbrella planning and build workspace for the OptiFinish website revamp.
Company: Value Added Coating Solutions Pvt. Ltd. (VACSPL)
Primary brand: OptiFinish
Sister concern: Vinayak Agencies
April 2026 onwards.

---

## Workspace Structure

```
Optifinish_website_main/
├── CLAUDE.md                  ← you are here, read by Claude on every session
├── build/
│   └── ztap/
│       └── source/            ← Z-TAP Next.js source (git submodule)
├── documentation/             ← master reports and strategy docs
├── ia/                        ← full IA mirrored as folder structure
│   ├── home/ products/ services/ facility/ our-work/ resources/ about/ contact/
│   └── each folder has overview.md files
├── references/                ← audit reports, current site snapshots
└── scripts/
```

---

## The Z-TAP Submodule

- Lives at `build/ztap/source/`
- Separate git repo: `https://github.com/us42004-creator/optifinish-web.git`
- Currently on branch: `mobile-dev`
- Package manager: **pnpm** (migrated from npm, April 2026)
- Dev server: `pnpm dev` (runs on port 4000)
- Tech stack: Next.js, React 19, TypeScript, Tailwind v4, Framer Motion, GSAP, Three.js

### Cloning on a new device (run once):
```bash
git clone --recurse-submodules https://github.com/us42004-creator/Optifinish_website_main.git
cd Optifinish_website_main/build/ztap/source
pnpm install
```

### Pushing submodule changes requires two commits:
```bash
# 1. inside build/ztap/source — push to ztap repo
git add . && git commit -m "message" && git push origin main

# 2. back in umbrella root — update the submodule pointer
cd ../../..
git add build/ztap/source
git commit -m "update ztap submodule reference"
git push origin main
```

---

## Package Manager

**pnpm** is used everywhere. Do not use npm or yarn.

- pnpm store location: `~/Library/pnpm/store/v10`
- Run `pnpm install` inside `build/ztap/source/` to install deps
- `node_modules/` and `.next/` are gitignored — regenerate with `pnpm install` and `pnpm build`

---

## Finalized Site Architecture (8 top-level sections)

| Section | Purpose |
|---|---|
| Home | Brand intro and routing hub |
| Products | Full portfolio map grouped by ownership |
| Services | After-sales, AMC, commissioning, support |
| Facility | Greater Noida manufacturing/R&D credibility |
| Our Work | Installations, case studies, proof, testimonials |
| Resources | Blog, Newsroom, Troubleshooting, Videos, Downloads |
| About | Company, VACSPL, Vinayak Agencies, leadership |
| Contact | Lead capture and CRM endpoint |

### Product Groups (under /products)
1. **OptiFinish Manufactured** — Powder Coating Plants, Curing Ovens, Booths
2. **OptiFinish Automation** — Z-TAP, ZA01, Automatic Sieve Machine (proprietary)
3. **GEMA** — Guns, OptiCenter, Booths, Reciprocators, Spare Parts (authorised partner)
4. **DURR** — Liquid coating systems (authorised partner)
5. **Vinayak Agencies** — Powders, Touch-up Paints, Adhesives (sister concern)

---

## Z-TAP's Role in the Project

Z-TAP is not just one product page. It is the reference standard for the entire site:
- **Branding reference** — visual and motion language
- **Design reference** — section depth model, interaction patterns
- **Technical reference** — Next.js implementation baseline

The broader OptiFinish site should inherit from Z-TAP: visual language, motion, section logic, product storytelling standard, CTA behaviour, premium industrial tone.

---

## Key Strategic Decisions (locked, do not revisit without reason)

- Website goal: premium industrial portfolio hub, not a generic corporate site
- `Products` and `Services` are clearly separated — Products = what we offer, Services = post-sale support
- `Newsroom` is preserved as distinct from Blog (launches, exhibitions, milestones)
- `Facility` is a standalone top-level section, not buried in About
- CRM: Zoho CRM for all enquiry and exhibition leads
- Email: Zoho Campaigns for newsletters and blog distribution
- Backend (employee login, content publishing, AI blog workflow) is deferred — does not block public build

---

## Collaboration

- Two collaborators: **Utkarsh** (supervisor) and **Akshay** (primary developer)
- Same Claude Code account, different devices
- Git remote: `https://github.com/us42004-creator/Optifinish_website_main.git`

### Branch Rules

| Person | Pushes to |
|---|---|
| Akshay | `main` directly |
| Utkarsh | `feat/section-name` → Akshay merges to main |

### Claude Code Push Behaviour
Claude will ask "Utkarsh or Akshay?" before every push and push to the correct branch automatically.

### Akshay's Daily Flow
```bash
git pull
# work with Claude Code
git add .
git commit -m "what was done"
git push
```

### Utkarsh's Flow
```bash
git checkout -b feat/whatever
# work with Claude Code
git add .
git commit -m "what was done"
git push origin feat/whatever
# tell Akshay to merge
```

### Branch Naming
- `feat/` — new page or section
- `fix/` — bug or correction
- `content/` — copy/text updates only
- `design/` — visual/UI changes only

- Do not work simultaneously — coordinate over text
- One person works → pushes → tells the other → they pull → they work → push

---

## Full Documentation

All detailed strategy, IA decisions, and planning rationale lives in:
- `documentation/optifinish-website-master-report.md` — primary planning document
- `documentation/optifinish-ia-strategy-report-updated.md` — updated IA strategy
- `ia/` — IA mirrored as folder structure with overview.md per page
