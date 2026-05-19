# OptiFinish Website — Go-Live Plan
*Generated: May 2026*

---

## 1. Domain Strategy

### Primary Domain
| Domain | Use | Status |
|---|---|---|
| `optifinish.in` | Primary public website | ✅ Already owned |
| `www.optifinish.in` | Redirect → `optifinish.in` (naked domain preferred) | Configure DNS |
| `optifinish.com` | Buy and redirect → `optifinish.in` | Recommended to protect brand |

### Subdomain Plan
| Subdomain | Use | Priority |
|---|---|---|
| `staging.optifinish.in` | Pre-production preview / Akshay's testing branch | Before launch |
| `mail.optifinish.in` / `zoho.optifinish.in` | Zoho Mail MX records | Already active if email works |
| `admin.optifinish.in` | Future: blog studio / CMS route (deferred) | Post-launch |

### DNS Checklist
- [ ] Point `optifinish.in` A/CNAME → Vercel (or chosen host)
- [ ] Add `www` CNAME → same host, with 301 redirect to naked domain
- [ ] Verify Zoho Mail MX records are not disturbed during DNS migration
- [ ] Add SPF, DKIM, DMARC records for email deliverability
- [ ] SSL/TLS auto-provisioned via Vercel (confirm cert issues as green before launch)
- [ ] If buying `optifinish.com`, point it with a 301 → `optifinish.in`

### Recommended Hosting
- **Vercel** (already using Next.js — native fit, zero-config deployment, edge CDN)
- Connect GitHub repo → Vercel project → auto-deploys on push to `main`
- Create a `staging` environment linked to a `staging` branch for preview

---

## 2. Pre-Launch Checklist

### 🔴 CRITICAL BLOCKERS — Must fix before going live

#### CRM / Lead Capture
- [ ] `/api/enquire/route.ts` — replace `console.log` stub with actual **Zoho CRM Web-to-Lead** API call
- [ ] Test form submission end-to-end: Contact page → API → Zoho CRM lead created
- [ ] Add email notification on new enquiry (Zoho workflow trigger or transactional email)
- [ ] Set up Zoho Campaigns list for newsletter signups (if capture form exists)

#### Legal Pages
- [ ] Create `/privacy-policy` page (required by Indian IT Act + Google/Meta ad policies)
- [ ] Create `/terms` page
- [ ] Add footer links to both pages
- [ ] Add Cookie consent banner (lightweight — no GDPR needed for India-only, but good practice)

#### SEO Fundamentals
- [ ] Add `public/robots.txt` — allow all crawlers, point to sitemap
- [ ] Add `src/app/sitemap.ts` — dynamic Next.js sitemap generator covering all product routes
- [ ] Verify all page `<title>` and `<description>` metadata are unique and filled
- [ ] Add Open Graph images (`og:image`) — minimum: homepage + 5 category hubs
- [ ] Register `optifinish.in` on **Google Search Console** and submit sitemap
- [ ] Register on **Bing Webmaster Tools**
- [ ] Add **Google Analytics 4** or Plausible (privacy-first alternative)

---

### 🟠 HIGH PRIORITY — Fix before or within first week of launch

#### Missing Pages (routes referenced but not built)
- [ ] `/our-work` — Installations, case studies, client logos, testimonials page
  - Currently linked from homepage OurWorkPreview section → will 404
- [ ] `/resources/newsroom` — Launches, exhibitions, press milestones
- [ ] `/resources/videos` — Product demo and facility videos
- [ ] `/resources/downloads` — Brochures, spec sheets, CAD files
- [ ] `/resources/troubleshooting` — Common issues and fixes (can start as a simple FAQ)
- [ ] `/products/gema/spare-parts` — Referenced in GEMA IA but page not built

#### Placeholder Content on Homepage
- [ ] **WhatWeOffer — OptiFinish Manufactured card**: replace "Manufactured equipment · image" placeholder with real photo carousel (similar to GEMA/DÜRR/Vinayak cards below)
- [ ] **WhatWeOffer — Automation card**: replace "Automation products · image" placeholder with real carousel
- [ ] **ProprietaryAutomation section**: Z-TAP and ZA01 product hero images missing
- [ ] **OurWorkPreview section**: all 3 installation cards show "Installation photo" — need real site photos

#### Product Page Images (pending from ops/facility)
- [ ] **Powder Coating Plant** — confirm plant2.jpeg, plant1.jpeg, plant3.jpeg are final/approved
- [ ] **Curing Oven** — confirm oven images are final
- [ ] **Cyclone & Dust Collector** — confirm cyclone images are final
- [ ] **PT Line** — NO images currently in product page (`imageSrcs` absent) — add photos
- [ ] **Wood Finish Oven** — confirm img-1 through img5 are final shots
- [ ] **Z-TAP** — hero and section images (check Z-TAP submodule for approved assets)
- [ ] **ZA01** — confirm hero image assets are loaded

#### About / Team Section
- [ ] Harish Sharma portrait — currently set, confirm final approval
- [ ] Lalit Tayal portrait — confirm final approval
- [ ] Team bios in `OurTeam.tsx` — "Bio placeholder" text still showing for both founders → replace with actual bios

---

### 🟡 MEDIUM PRIORITY — Target within first month

#### References / Case Studies (all 29 product pages empty)
These sections are currently hidden if empty, but should be populated progressively.
- [ ] Identify 3–5 flagship installations (client name, brief description, outcome)
- [ ] Add references to top-traffic product pages first:
  - Powder Coating Plant, Curing Oven, Z-TAP, GEMA Manual Gun, GEMA Automatic Gun
- [ ] Add client logo strip to Our Work page as social proof

#### Content Gaps
- [ ] **Facility page** — Confirm images and copy are final
- [ ] **Blog** — Publish at least 2–3 posts before launch so the blog grid isn't empty
- [ ] **Navbar links** — Confirm all top-level nav items resolve to built pages (no 404s)
- [ ] **Footer links** — Audit all footer links; add Privacy Policy and Terms

#### Performance
- [ ] Run **Lighthouse** audit — target: Performance ≥ 85, Accessibility ≥ 90
- [ ] Ensure all `<Image>` tags have `width`, `height`, or `fill` + `sizes` correctly set
- [ ] Large images (curing oven PNGs are 4–5MB) — compress to WebP before launch
- [ ] Confirm no layout shift (CLS) issues from font loading (Space Grotesk, Inter)

#### Mobile / Cross-browser
- [ ] Full QA pass on iPhone Safari (most common Indian mobile browser)
- [ ] Test on Android Chrome
- [ ] Test on Windows Chrome + Edge
- [ ] Check Navbar hamburger menu on mobile for all pages
- [ ] Check product page carousels on touch devices

---

### 🟢 POST-LAUNCH (within first quarter)

- [ ] Set up **Zoho Campaigns** newsletter with first issue
- [ ] Integrate **blog studio** into the main site at `/admin/blog-studio` (currently separate Vite app)
- [ ] Add **Google Tag Manager** for future marketing pixel management
- [ ] Set up **Vercel Analytics** for real user monitoring
- [ ] Submit to relevant **B2B directories** (IndiaMART, TradeIndia, Justdial Business)
- [ ] Add **WhatsApp chat widget** (high engagement in Indian industrial B2B)
- [ ] Set up **exhibition lead capture** flow in Zoho CRM before next trade show
- [ ] `/resources/downloads` — Upload product brochures and spec PDFs
- [ ] `/resources/videos` — Embed YouTube/Vimeo plant installation and demo videos

---

## 3. Image & Asset To-Do (Consolidated)

| Asset | Status | Action |
|---|---|---|
| WhatWeOffer — Manufactured carousel images | ❌ Missing | Photograph or source plant/oven shots |
| WhatWeOffer — Automation carousel images | ❌ Missing | Source from Z-TAP submodule assets |
| OurWorkPreview — 3 installation photos | ❌ Missing | Pull from site visit photography |
| Z-TAP hero / section images | ⚠️ Check submodule | Confirm approved assets in ztap/source |
| ZA01 hero image | ⚠️ Needs confirmation | Source from facility |
| PT Line product images | ❌ None added | Photograph pretreatment lines |
| Founder bios (OurTeam.tsx) | ❌ Placeholder text | Write 2-sentence bios for Harish + Lalit |
| OG image (social sharing preview) | ❌ Missing | Design 1200×630px branded OG card |
| Favicon / apple-touch-icon | ⚠️ Check | Confirm in `public/` directory |
| Logo variants (SVG) | ⚠️ Check | Confirm SVG version exists for sharp rendering |

---

## 4. Quick Pre-Launch Sequence

```
Week 1 — Fix blockers
  → Zoho CRM integration in /api/enquire
  → Privacy Policy + Terms pages
  → robots.txt + sitemap.ts
  → Fix /our-work 404 (stub page minimum)
  → Replace OurWorkPreview placeholders

Week 2 — Content & Images
  → Real images for WhatWeOffer manufactured + automation cards
  → Founder bios text
  → Blog: publish 2 posts
  → Compress large PNGs to WebP

Week 3 — QA & DNS
  → Full mobile QA pass
  → Lighthouse audit + fixes
  → Google Search Console setup
  → Point optifinish.in DNS → Vercel
  → Smoke test all routes in production

Week 4 — Launch
  → Announce on LinkedIn
  → Submit sitemap to Google + Bing
  → Monitor Search Console for crawl errors
  → Set up Vercel Analytics
```

---

*This document should be updated as items are completed. Last updated: May 2026.*
