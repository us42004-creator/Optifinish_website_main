# OptiFinish Website — Go-Live Plan
*Generated: May 2026 | Last updated: May 20, 2026*

---

## Status: LIVE — May 20, 2026

The OptiFinish website launched on **May 20, 2026** at **https://optifinish.in**.

**Infrastructure summary:**
- Hosted on Vercel — auto-deploys on push to `main`
- DNS on GoDaddy: A record `@` → 216.198.79.1, CNAME `www` → Vercel
- SSL auto-provisioned by Vercel for both `optifinish.in` and `ztap.optifinish.in`
- Z-TAP live at **https://ztap.optifinish.in** (separate Vercel project)
- Old WordPress site archived at `old.optifinish.in`

**Completed at launch:**
- 93 pages live and indexed — Google Search Console verified (TXT method), sitemap submitted
- Zoho CRM fully wired via OAuth2 — contact form pushes leads directly to Zoho CRM Leads module
- All critical SEO infrastructure in place: robots.ts, sitemap.ts, manifest.ts, og-default.jpg, schema
- 23 blog posts live with full SEO (FAQ, Article, BreadcrumbList schema)
- Footer with 24+ links, social icons, Privacy Policy and Terms linked
- 146 unused images deleted (~41.7 MB), all product carousels cross-linked

**Still pending post-launch:**
- `/resources/newsroom`, `/resources/videos`, `/resources/downloads`, `/resources/troubleshooting` — not yet built
- Real case studies on `/our-work` (stub only)
- Blog cover images for 13 posts
- Facility exterior photos (8 placeholder slots)

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
- ✅ Point `optifinish.in` A record → 216.198.79.1 (Vercel) — done on GoDaddy
- ✅ Add `www` CNAME → Vercel — configured
- ✅ CNAME `ztap` → optifinish-web.vercel.app — Z-TAP subdomain live
- [ ] Verify Zoho Mail MX records are not disturbed during DNS migration
- [ ] Add SPF, DKIM, DMARC records for email deliverability
- ✅ SSL/TLS auto-provisioned via Vercel for optifinish.in and ztap.optifinish.in
- [ ] If buying `optifinish.com`, point it with a 301 → `optifinish.in`

### Recommended Hosting
- **Vercel** (already using Next.js — native fit, zero-config deployment, edge CDN)
- Connect GitHub repo → Vercel project → auto-deploys on push to `main`
- Create a `staging` environment linked to a `staging` branch for preview

---

## 2. Pre-Launch Checklist

### 🔴 CRITICAL BLOCKERS — Must fix before going live

#### CRM / Lead Capture
- ✅ `/api/enquire/route.ts` — Zoho CRM OAuth2 integration complete; leads push directly to Zoho CRM Leads module
- ✅ Form fields: Name, Company, Phone, Email, Product (dropdown), Details
- ✅ Refresh token stored in `.env.local` (gitignored) and Vercel environment variables
- ✅ Contact numbers configured: Phone +91 89294 08691, WhatsApp wa.me/918929408691
- [ ] Add email notification on new enquiry (Zoho workflow trigger or transactional email)
- [ ] Set up Zoho Campaigns list for newsletter signups (if capture form exists)

#### Legal Pages
- ✅ `/privacy-policy` page created and live
- ✅ `/terms` page created and live
- ✅ Footer links to both pages added
- [ ] Add Cookie consent banner (lightweight — no GDPR needed for India-only, but good practice)

#### SEO Fundamentals
- ✅ `robots.ts` created — allows all crawlers including GPTBot, CCBot, Google-Extended, Meta-ExternalAgent, anthropic-ai, PerplexityBot
- ✅ `sitemap.ts` created — dynamic, covers all 93 URLs including blog posts (auto-reads from index.json + HTML posts)
- ✅ All page `<title>` and `<description>` metadata unique and filled
- ✅ `og-default.jpg` created (1200×630px); OG image set for all pages
- ✅ `optifinish.in` registered on **Google Search Console** — TXT record verified, sitemap submitted, 93 pages discovered
- [ ] Register on **Bing Webmaster Tools**
- [ ] Add **Google Analytics 4** or Plausible (privacy-first alternative)

---

### 🟠 HIGH PRIORITY — Fix before or within first week of launch

#### Missing Pages (routes referenced but not built)
- ✅ `/our-work` — built as stub ("Portfolio Coming Soon")
- ❌ `/resources/newsroom` — not yet built
- ❌ `/resources/videos` — not yet built
- ❌ `/resources/downloads` — not yet built
- ❌ `/resources/troubleshooting` — not yet built
- ⚠️ `/products/gema/spare-parts` — referenced in GEMA IA; confirm if page exists or if GEMA spare parts is handled through the Services section

#### Placeholder Content on Homepage
- ✅ **WhatWeOffer — all cards**: all 5 product group cards built and functional
- ✅ **ProprietaryAutomation section**: Z-TAP, ZA01, and Automatic Sieve Machine sections built
- [ ] **OurWorkPreview section**: installation cards may still use placeholder photos — source real site photos

#### Product Page Images (pending from ops/facility)
- ✅ All product pages across 5 groups built (29 product pages + 5 hubs)
- ⚠️ Facility exterior photos — 8 placeholder slots remain in `FacilityTeaserFilmstrip.tsx`; replacement photos needed from client
- [ ] Blog cover images — 13 posts still use minimal placeholder tile

#### About / Team Section
- ✅ Harish Sharma portrait — live (harish_new.jpg / harish_sharma.JPG)
- ✅ Lalit Tayal portrait — live (Lalit_Tayal.JPG)
- [ ] Founder bios in `OurTeam.tsx` — confirm "Bio placeholder" text has been replaced with actual bios

---

### 🟡 MEDIUM PRIORITY — Target within first month post-launch

#### References / Case Studies (all 29 product pages empty)
These sections are currently hidden if empty, but should be populated progressively.
- [ ] Identify 3–5 flagship installations (client name, brief description, outcome)
- [ ] Add references to top-traffic product pages first:
  - Powder Coating Plant, Curing Oven, Z-TAP, GEMA Manual Gun, GEMA Automatic Gun
- [ ] Add client logo strip to Our Work page as social proof
- [ ] Replace stub content on `/our-work` with real case studies and installation gallery

#### Content Gaps
- ✅ **Facility page** — built and live (awaiting real exterior photos)
- ✅ **Blog** — 23 posts live at launch; blog grid fully functional with category filters and search
- ✅ **Navbar links** — all 8 top-level sections resolve to built pages
- ✅ **Footer links** — 3-column grid with 24+ links; Privacy Policy and Terms linked
- [ ] Write `.mdx` body content for blog posts currently showing "Post content coming soon"
- [ ] Source or create blog cover images for 13 remaining posts

#### Performance
- ✅ **Viewport fixed** — removed `userScalable: false`
- [ ] Run **Lighthouse** audit — target: Performance ≥ 85, Accessibility ≥ 90
- [ ] Ensure all `<Image>` tags have `width`, `height`, or `fill` + `sizes` correctly set
- [ ] Large images (curing oven PNGs) — compress to WebP if not already done
- [ ] Confirm no layout shift (CLS) issues from font loading

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
- [ ] Register on **Bing Webmaster Tools**
- [ ] Add **Google Analytics 4** or Plausible
- [ ] Submit to relevant **B2B directories** (IndiaMART, TradeIndia, Justdial Business)
- [ ] Add **WhatsApp chat widget** (high engagement in Indian industrial B2B)
- [ ] Set up **exhibition lead capture** flow in Zoho CRM before next trade show
- [ ] Build `/resources/newsroom` — launches, exhibitions, press milestones
- [ ] Build `/resources/downloads` — upload product brochures and spec PDFs
- [ ] Build `/resources/videos` — embed YouTube/Vimeo plant installation and demo videos
- [ ] Build `/resources/troubleshooting` — common issues and fixes (start as a simple FAQ)

---

## 3. Image & Asset To-Do (Consolidated)

| Asset | Status | Action |
|---|---|---|
| WhatWeOffer — Manufactured carousel images | ✅ Built | Product pages have images |
| WhatWeOffer — Automation carousel images | ✅ Built | Z-TAP / ZA01 / Sieve Machine sections built |
| OurWorkPreview — installation photos | ⚠️ Placeholder | Source real site installation photos |
| Facility exterior photos | ⚠️ 8 placeholders | Photograph Greater Noida facility exterior |
| Blog cover images | ⚠️ 13 missing | Source or create for remaining posts |
| Founder portraits | ✅ Live | harish_new.jpg and Lalit_Tayal.JPG uploaded |
| Founder bios (OurTeam.tsx) | ⚠️ Confirm | Verify "Bio placeholder" has been replaced |
| OG image (social sharing preview) | ✅ Done | og-default.jpg created at 1200×630px |
| Favicon / apple-touch-icon | ✅ Assumed live | Confirm in `public/` directory |
| Logo variants (SVG) | ⚠️ Check | Confirm SVG version exists for sharp rendering |
| DÜRR logo | ✅ Added | duerr-logo-RGB.png uploaded |

---

## 4. Pre-Launch Sequence — Completed vs Pending

```
Week 1 — Fix blockers [ALL DONE ✅]
  ✅ Zoho CRM OAuth2 integration in /api/enquire
  ✅ Privacy Policy + Terms pages
  ✅ robots.ts + sitemap.ts (dynamic, 93 URLs)
  ✅ /our-work stub page (no 404)
  ✅ All product group cards built

Week 2 — Content & Images [MOSTLY DONE]
  ✅ All 29 product pages built across 5 groups
  ✅ All 7 service pages built
  ✅ Founder portraits uploaded and live
  ✅ Blog: 23 posts live
  ⚠️ Blog cover images: 13 posts still using placeholder tile
  ⚠️ Large PNG compression — verify WebP conversion complete

Week 3 — QA & DNS [DONE ✅]
  ✅ DNS pointed: optifinish.in A → 216.198.79.1
  ✅ SSL auto-provisioned by Vercel
  ✅ Google Search Console verified + sitemap submitted
  ✅ 93 pages discovered by Google
  ✅ Z-TAP live at ztap.optifinish.in
  [ ] Full mobile QA pass still pending
  [ ] Lighthouse audit still pending

Week 4 — Launch [DONE ✅ — May 20, 2026]
  ✅ Site live at optifinish.in
  [ ] Announce on LinkedIn
  [ ] Submit sitemap to Bing Webmaster Tools
  [ ] Monitor Search Console for crawl errors
  [ ] Set up Vercel Analytics
```

---

*This document should be updated as items are completed. Last updated: May 20, 2026 — site is LIVE.*
