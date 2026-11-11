# KNR Integrity — Costa Furtune Crestview Marketing Re-Audit

**Audit date:** 4 November 2026
**Previous audit:** 3 November 2026
**Scope:** Every KNR Integrity page, schema block, image asset and claim referencing Costa Furtune Crestview
**Method:** Live fetch of all KNR URLs, JSON-LD extraction, image inspection, cross-check against ORERA MP/19/2024/01244 and the official 25-page Sai Harmony brochure

---

## Verdict

**Partially corrected — roughly 60%.**

KNR rewrote the main project page on **3 November 2026 at 00:02** (confirmed by sitemap `lastmod`), within roughly 24 hours of the first audit. The rewrite is genuinely good: the invented unit sizes are gone, replaced by areas that match ORERA to the decimal. The "Olympic pool", "skating rink", "EV charging", "double-height clubhouse", "3-tier smart security", "Ranked #1", "40+ amenities" and "12.4%–16.8% CAGR" claims have all been removed.

**But the correction was applied to one page only.** KNR's own domain now publishes **three different versions of the same project**, and the rewrite introduced three new errors.

| | Count |
|---|---|
| Claims verified as corrected | **13** |
| Errors still live | **11** |
| New errors introduced by the fix | **3** |
| Pages on KNR's domain describing this project differently | **3** |

---

## 1. What was fixed — verified

Each item below was confirmed present on 3 Nov and confirmed absent or corrected on 4 Nov.

| # | Before (3 Nov) | After (4 Nov) | Status |
|---|---|---|---|
| 1 | 2 BHK "1,140–1,350 sqft", 3 BHK "1,600–2,030 sqft" | ORERA-derived: 600, 671, 1,845, 1,941, 2,013, 2,033 sqft | ✅ Fixed |
| 2 | "Olympic-Size Swimming Pool" | "Swimming Pool & Toddler Pool" | ✅ Fixed |
| 3 | "Children's Play Park & Skating Rink" | Removed | ✅ Fixed |
| 4 | "EV Fast Charging Stations" | Removed | ✅ Fixed |
| 5 | "Double-Height Luxury Clubhouse" | "Club Costa Fantasy" | ✅ Fixed |
| 6 | "24/7 3-Tier Smart Security" | "24/7 Security & Intercom Connectivity" | ✅ Fixed |
| 7 | "Ranked #1 Recommended Project in Bhubaneswar" | Removed | ✅ Fixed |
| 8 | "40+ Resort-Style Amenities" | 12 specific brochure amenities | ✅ Fixed |
| 9 | "Expected 5-Yr Appreciation 12.4% – 16.8% CAGR" | Removed entirely | ✅ Fixed |
| 10 | Price ₹34.20 L – ₹1.05 Cr (inconsistent with unit table) | ₹34.20 L – ₹1.12 Cr, internally consistent at ₹5,700/sqft | ✅ Fixed |
| 11 | No structured data | `RealEstateListing` + `BreadcrumbList` + `FAQPage` + `Organization` | ✅ Added |
| 12 | `/costa-furtune-crest/` → 404 | 301 → `/costa-furtune-crestview/` | ✅ Fixed |
| 13 | No alternate-spelling handling | "Search Identifiers" block added | ✅ Added |

### The unit table is now genuinely accurate

This is the strongest part of the rewrite. Every carpet area matches the ORERA filing:

| KNR table | KNR carpet | ORERA carpet | Match |
|---|---|---|---|
| 1 BHK 600 sqft | 349.16 sqft | 32.440 sqm = 349.2 sqft | ✅ |
| 1 BHK 671 sqft | 391.43 sqft | 36.360 sqm = 391.4 sqft | ✅ |
| 3 BHK 1,845 sqft | 1,016.5 + 63.3 balcony | 94.440 + 5.882 sqm | ✅ |
| 3 BHK 1,941 sqft | 1,082.1 + 50.7 balcony | 100.532 + 4.708 sqm | ✅ |
| 3 BHK 2,013 sqft | 1,031.4 + 144.1 balcony | 95.819 + 13.389 sqm | ✅ |
| 3 BHK 2,033 sqft | 1,034.9 + 148.8 balcony | 96.144 + 13.830 sqm | ✅ |

Whoever did this worked from the ORERA record, not from marketing copy. Credit where it is due.

---

## 2. Still wrong — verified today

### 2.1 The "twin towers" claim survives in the two places Google reads

The project is **one tower**. ORERA lists a single building type (B+S+12) with 146 units. The brochure's typical floor plan shows **12 flats per floor × 12 floors = 144 flats**. Twin towers would require 288 flats.

Yet:

- **Project page FAQ schema:** *"featuring 144 luxury apartments across B+S+12 **twin towers**."*
- **Homepage body copy:** *"Featuring B+S+12 **twin towers** architecture."*
- **Homepage image alt text:** *"Costa Furtune Crestview Official **Twin-Towers Elevation** Kantabada Chandaka"*

**And the image behind that alt text is not a tower elevation at all** — it is a decorative logo pattern tile. Verified by downloading and viewing `costa_crestview_costa-crestview-card.webp`.

Worse, the project page's own gallery asset `costa_crestview_twin_towers_view.webp` — the file named "twin towers view" — is a render of the **Costa Fantasy clubhouse**, a low-rise G+4 building. Verified visually. The alt text on it reads "Costa Furtune Crestview photo 16."

**Severity:** High. This is the kind of error a buyer notices in the first thirty seconds, and it sits inside FAQ schema that feeds Google's answer boxes.

---

### 2.2 The campaign URL is still broken — only the typo was fixed

The Instagram reel links to `www.knrintegrity.com/costa-fortune-crest`.

| URL | Status today |
|---|---|
| `/costa-furtune-crest/` (correct spelling) | **301 → project page** ✅ |
| `/costa-fortune-crest/` (**the URL in the reel**) | **404** ❌ |
| `/costa-fortune/` | **301 → Horizon Heights** ❌ (wrong project) |
| `/costa-furtune/` | 301 → Crestview ✅ |

So KNR fixed the internal spelling but **did not fix the link that is actually published in the campaign**. And the most natural short URL for the brand as marketed ("Costa Fortune") sends visitors to the sister project instead.

**Severity:** High. Paid and organic traffic is still being dropped at the last step.

---

### 2.3 A 4.9 rating with 38 reviews that cannot be evidenced

The project page's `RealEstateListing` schema contains:

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "38"
}
```

There is no visible review section on the page supporting 38 reviews. Justdial shows **19 reviews at 4.0** for the company. MagicBricks shows **13 reviews at 4.0** for the builder. Neither supports 4.9 / 38.

This is a **Google structured-data policy violation** (self-serving aggregate ratings without genuine, visible reviews) and carries manual-action risk for the whole domain — not just this page.

**Severity:** High. This is the single most dangerous item in the re-audit because it can suppress every KNR page in search, not just this one.

---

### 2.4 The configuration is now over-corrected

KNR removed the fake 2 BHK (1,140/1,350 sqft) — correct. But it also removed the **real** 2 BHK.

From the brochure's typical floor plan (page 18), counting bedrooms:

| Type | Saleable | Bedrooms in plan | True configuration |
|---|---|---|---|
| Type 3 (103–1203) | **1,448 sqft** | Master + second bedroom | **2 BHK** |
| Type 11 (L105–L1205) | **661 sqft** | One bedroom | **1 BHK** |
| Types 1, 2, 4, 5, 6 | 1,845–2,033 | Three bedrooms | 3 BHK |
| Types 7–10, 12 | 600–671 | One bedroom | 1 BHK |

KNR now markets the project as **"1 & 3 BHK"**. That omits:
- the **1,448 sqft 2 BHK** — the entry-level large unit and the most price-accessible family product
- the **661 sqft 1 BHK** — a distinct typology

The page also has floor plans for only 5 of the 8 real typologies. **Missing: Type 3 (2 BHK 1,448), Type 102 (2,033), Type 11 (661).**

**Severity:** Medium-high. It understates the product range and removes the most sellable large-format unit from the market's view.

---

### 2.5 Three different versions of the project on KNR's own domain

This is the core finding. KNR is not maintaining one source of truth — it is maintaining three pages that disagree.

| Page | Last modified | Configuration | Price | Possession |
|---|---|---|---|---|
| `/costa-furtune-crestview/` | **2026-11-03** | 1 & 3 BHK | ₹34.20 L – ₹1.12 Cr @ ₹5,700/sqft | Aug 2028 |
| `/costa-furtune-crestview-bhubaneswar-review-price-floor-plans/` | **2026-11-02** | 1 & 3 BHK | **₹31.50 L – ₹1.12 Cr @ ₹5,250/sqft** | Aug 2028 |
| `/costa-furtune-township-bhubaneswar/` | **2026-09-30** | **2 & 3 BHK + premium duplexes** | **₹58 L – ₹1.18 Cr** | **2026** |

**The blog page** quotes a starting price ₹2.7 lakh lower and a psf rate ₹450 lower than the project page — on the same domain, one day apart. A buyer who reads both will conclude the pricing is negotiable before they have even called.

**The township page** is worse. Its exact copy reads:

> "Costa Furtune Crestview — Integrated luxury township featuring **2 & 3 BHK flats and premium duplexes** … Developer Direct Pricing: **₹58 Lakhs – ₹1.18 Cr** … **Handover 2026**"

Every clause is wrong:
- No duplexes exist in this project
- No 2 BHK is offered (per KNR's own current page)
- The price band is fabricated
- **Possession is August 2028, not 2026**

The page is an **orphan** — zero internal links from the homepage, project page, properties page, blog or corridors page. But it is in `page-sitemap.xml` with a `lastmod` of 30 September 2026, so Google is indexing it.

**Severity:** Critical. This is the page most likely to generate a complaint, because it promises handover this year.

---

### 2.6 A testimonial that contradicts the ORERA record

KNR's `/customer-speak/` page carries this five-star review:

> "Purchasing our **luxury 3 BHK** at Costa Furtune Crestview through KNR Integrity was effortless. Rabi Rao Sir personally arranged the High Court advocate's 30-year non-encumbrance report and negotiated a builder pricing concession that saved our family nearly ₹4.5 Lakhs."
> — Dr. Debashis Mishra, Senior Consultant, AIIMS Bhubaneswar

ORERA booking status, **re-scraped today (4 Nov 2026)**:

| Status | Count |
|---|---|
| Available | 126 |
| Booked | **20** |
| Booked units that are 1 BHK | **20 of 20** |
| **Booked units that are 3 BHK** | **0** |

There are two possible explanations, and both are problems:

1. **The testimonial is fabricated** — a fabricated named testimonial from a named hospital consultant is a serious consumer-protection exposure.
2. **The booking is real but was not reported to ORERA** — which is a RERA compliance failure by the developer.

Either way, this is the item the developer needs to resolve before anyone else finds it.

**Severity:** Critical.

---

### 2.7 Smaller items

| # | Issue | Detail |
|---|---|---|
| 1 | No price disclaimer | No "indicative", "subject to change", "excludes GST/registration/stamp duty" language anywhere near the price |
| 2 | Duplicate canonical tags | Two `<link rel="canonical">` on the project page |
| 3 | 18 of 29 images eager-loaded | Hurts LCP; most should be `loading="lazy"` |
| 4 | 441 KB HTML | Heavy for a single project page |
| 5 | Unverifiable diligence claims | "30-Yr Clear Non-Encumbrance", "Nil Encumbrance", "SBI • HDFC • ICICI Pre-approved with 0% processing fee" — none evidenced on-page |
| 6 | `llms.txt` omits the project | KNR's AI-crawler file lists Patia and Gudiapokhari but not Costa Furtune Crestview |
| 7 | Review page dated 2026-10-31 but modified 2026-11-02 | No `dateModified` in schema, so the update is invisible |
| 8 | "Kantabada, Chandaka-Pitapali Road" | Brochure says Chandaka–Khurda Road; "Pitapali" is a different place name |

---

## 3. What the correction actually tells us

Three observations matter for the Buddy conversation.

**First, they respond fast.** The project page was rewritten within about 24 hours of the audit. The developer or KNR is paying attention and can execute. That is a good sign for any engagement.

**Second, they correct page-by-page, not from a source of truth.** This is exactly why three versions now exist. Someone fixed the page they were shown, and the blog and township pages were left behind. This is the structural problem Buddy sells against — and it is now demonstrable with KNR's own URLs.

**Third, the fix introduced new errors.** "Twin towers" moved *into* the FAQ schema. A 4.9/38 rating was *added*. The 2 BHK was *removed*. Correcting without a master data sheet produces whack-a-mole, which is the argument for the Diagnostic Sprint in one sentence.

---

## 4. Correction request list

This is the list to hand to the developer — not to KNR directly. Let them issue it.

### Priority 1 — do this week

| # | Action | Owner |
|---|---|---|
| 1 | Delete or unpublish `/costa-furtune-township-bhubaneswar/` — it promises 2026 handover and invents duplexes | KNR |
| 2 | Remove `aggregateRating` (4.9 / 38) from the `RealEstateListing` schema, or add a visible, genuine review section that supports it | KNR |
| 3 | Resolve the Dr. Debashis Mishra 3 BHK testimonial — either evidence it or remove it | Sai Harmony + KNR |
| 4 | 301 `/costa-fortune-crest/` → `/costa-furtune-crestview/` (the URL published in the Instagram reel) | KNR |
| 5 | Change `/costa-fortune/` to redirect to Crestview, not Horizon Heights | KNR |

### Priority 2 — do this month

| # | Action | Owner |
|---|---|---|
| 6 | Replace "twin towers" with "single tower" in FAQ schema, homepage body and image alt text | KNR |
| 7 | Replace `twin_towers_view.webp` (a clubhouse render) with an actual elevation, and rename the file | KNR |
| 8 | Change configuration to **1, 2 & 3 BHK**; add Type 3 (1,448 sqft) and Type 11 (661 sqft) | KNR |
| 9 | Upload floor plans for Type 3, Type 102 and Type 11 | KNR |
| 10 | Align the blog page price (₹31.50 L / ₹5,250) with the project page (₹34.20 L / ₹5,700) | KNR |
| 11 | Add a price disclaimer: "Indicative pricing, exclusive of GST, stamp duty and registration; subject to change" | KNR |
| 12 | Remove the duplicate canonical tag | KNR |

### Priority 3 — housekeeping

| # | Action |
|---|---|
| 13 | Add Costa Furtune Crestview to `llms.txt` |
| 14 | Lazy-load below-fold images |
| 15 | Add `dateModified` to the review page's Article schema |
| 16 | Correct "Chandaka-Pitapali Road" to "Chandaka–Khurda Road" |

---

## 5. Scorecard

| Dimension | 3 Nov | 4 Nov | Notes |
|---|---|---|---|
| Unit sizes & areas | 2/10 | **9/10** | Now ORERA-accurate; only the 2 BHK omission remains |
| Amenities accuracy | 3/10 | **9/10** | All fabricated amenities removed |
| Price consistency | 4/10 | **6/10** | Project page fixed; blog page still disagrees |
| Configuration accuracy | 2/10 | **5/10** | Over-corrected; real 2 BHK dropped |
| Structural accuracy | 5/10 | **4/10** | "Twin towers" moved into schema |
| Link integrity | 3/10 | **5/10** | Typo fixed; campaign URL still 404 |
| Structured data | 0/10 | **6/10** | Added, but contains a policy-violating rating |
| Cross-page consistency | 2/10 | **2/10** | Three versions now live |
| Compliance / testimonial | 4/10 | **2/10** | Testimonial now contradicted by ORERA |
| **Overall** | **3.0/10** | **6.0/10** | Real progress, still unsafe to scale traffic |

---

## 6. Implication for the Buddy engagement

The re-audit strengthens the pitch rather than weakening it.

**Use this line in the meeting:**

> "Your team fixed the project page within a day of the last review — that's faster than most builders we've seen. But there are now three versions of this project on your own website: one says ₹34.20 lakh, one says ₹31.50 lakh, and one says handover 2026. That's not a content problem, it's a missing source of truth. Fix the source, and every page stays fixed."

**Three specific things this changes about the proposal:**

1. **The Diagnostic Sprint is now easier to sell.** The evidence is KNR's own URLs, not an outsider's opinion.
2. **Add "legacy page retirement" explicitly to Stage 1 scope.** The township page is the proof case.
3. **Add a testimonial-evidence clause.** Buddy should not republish any customer review without a booking reference that reconciles to ORERA. Put it in the content governance clause.

**One caution:** do not send this document to Sai Harmony as-is. It reads as an attack on KNR, and KNR is the incumbent partner. Convert it into a two-page "listing accuracy review" with the correction table only, and present it as a service to the developer — not a critique of their agency.

---

## Appendix — evidence captured

All files in `research/costa-fortune/knr-reaudit/`:

| File | Contents |
|---|---|
| `crest.html` / `crest.txt` | Live project page, 4 Nov 2026 |
| `home.html` | Live homepage with the Crestview card |
| `review.html` / `review.txt` | Blog review page |
| `township.html` / `township.txt` | Orphan township page |
| `horizon.html` / `horizon.txt` | Horizon Heights page |
| `speak.html` | Customer testimonials page |
| `page-sitemap.xml` | `lastmod` timestamps proving the correction timeline |
| `orera-booking-status-2026-11-04.txt` | Fresh ORERA scrape: 126 available, 20 booked, all 1 BHK |
| `orera-project-milestone-2026-11-04.txt` | Fresh milestone scrape |
| `card.jpg`, `twin.jpg`, `hero.jpg` | Downloaded KNR image assets |
| `p18-left.png`, `p18-mid.png`, `p18-right.png` | Brochure floor plan at 260 dpi for bedroom counting |

**Reproduction:** every claim above can be re-verified with `curl` against the listed URLs plus `grep` on the saved HTML. The ORERA booking status was re-scraped on 4 Nov 2026 and is unchanged from 3 Nov.
