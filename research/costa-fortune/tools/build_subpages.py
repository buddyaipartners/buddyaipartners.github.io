#!/usr/bin/env python3
"""Rebuild the Costa Furtune sub-pages against the current light design system."""
import pathlib

SITE = pathlib.Path(__file__).resolve().parent.parent / "site"

BROCHURE = ("https://www.saiharmony.com/_files/ugd/"
            "06bd43_413c9c71aa79400c8ca91a2597b8d41e.pdf")

# ─────────────────────────────  shared shell  ─────────────────────────────
HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>__TITLE__</title>
  <meta name="description" content="__DESC__" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body class="is-ready">

<header class="nav" id="nav">
  <a class="nav__brand" href="index.html" aria-label="Costa Furtune Crestview">
    <img src="assets/logos/costa-furtune-wordmark-light.svg" alt="Costa Furtune Crestview" width="360" height="64" />
  </a>

  <nav class="nav__links" aria-label="Sections">
    <a href="index.html#developer">Developer</a>
    <a href="index.html#township">3 Phases</a>
    <a href="index.html#residences">3 BHK Focus</a>
    <a href="index.html#amenities">Clubhouse</a>
    <a href="index.html#progress">Progress</a>
    <a href="index.html#verification">Verification</a>
  </nav>

  <a class="btn btn--primary nav__cta" href="#enquire">Book Site Visit</a>
  <button class="nav__toggle" id="navToggle" aria-expanded="false" aria-controls="navMenu" aria-label="Open navigation menu">
    <span></span><span></span><span></span><em>Menu</em>
  </button>
</header>

<div class="navmenu" id="navMenu" aria-hidden="true">
  <nav aria-label="Mobile sections">
    <a href="index.html#developer"><span>00</span>Master Developer (Sai Harmony)</a>
    <a href="index.html#township"><span>01</span>Complete Township (All 3 Phases)</a>
    <a href="triplex.html" class="navmenu__sub"><span>&rarr;</span>Costa Fortune Triplex &mdash; Phase 1 (Sold Out)</a>
    <a href="crestview.html" class="navmenu__sub"><span>&rarr;</span>Costa Furtune Crestview &mdash; Phase 2 (3 BHK Focus)</a>
    <a href="horizon-heights.html" class="navmenu__sub"><span>&rarr;</span>Horizon Heights &mdash; Phase 3 (Twin Towers)</a>
    <a href="clubhouse.html" class="navmenu__sub"><span>&rarr;</span>Club Costa Fantasy (Construction Ready)</a>
    <a href="index.html#residences"><span>02</span>Exclusive 3 BHK Collection</a>
    <a href="index.html#amenities"><span>03</span>Club Costa Fantasy</a>
    <a href="index.html#progress"><span>04</span>Construction Progress</a>
    <a href="index.html#leadership"><span>05</span>Leadership &amp; MD Desk</a>
    <a href="index.html#verification"><span>06</span>ORERA Verification</a>
    <a href="#enquire"><span>07</span>Private VIP Viewing</a>
  </nav>
  <div class="navmenu__foot">
    <a href="tel:+917735536906">+91 77355 36906</a>
    <a href="mailto:saiharmony2021@gmail.com">saiharmony2021@gmail.com</a>
  </div>
</div>

<main id="top">
"""

FOOT = """</main>

<footer class="footer">
  <div class="footer__top">
    <div class="footer__mark">
      <img src="assets/logos/costa-furtune-crest.svg" alt="Costa Furtune Crestview" width="340" height="70" />
      <p>
        Sai Harmony Pvt. Ltd. &middot; Plot No. 83, Ground Floor, Prachi Enclave, Chandrasekharpur, Bhubaneswar &ndash; 751016.
      </p>
      <a class="footer__brochure" href="__BROCHURE__" target="_blank" rel="noopener">
        Download the official brochure
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 2v8m0 0l3.2-3.2M8 10L4.8 6.8M2.5 12.5h11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        <small>PDF &middot; 25 pages</small>
      </a>
    </div>
    <div class="footer__cols">
      <div>
        <h4>Township Portfolio</h4>
        <a href="triplex.html">Costa Fortune Triplex (Phase 1 &middot; Sold Out)</a>
        <a href="crestview.html">Costa Furtune Crestview (Phase 2 &middot; 3 BHK)</a>
        <a href="horizon-heights.html">Horizon Heights (Phase 3 &middot; Twin Towers)</a>
        <a href="clubhouse.html">Club Costa Fantasy (Construction Ready)</a>
      </div>
      <div>
        <h4>3 BHK Residences</h4>
        <a href="crestview.html#units">Type 1 (1,845 sq ft)</a>
        <a href="crestview.html#units">Type 5 (1,941 sq ft)</a>
        <a href="crestview.html#units">Types 4 &amp; 6 (2,013 sq ft)</a>
        <a href="crestview.html#units">Type 2 (2,033 sq ft)</a>
      </div>
      <div>
        <h4>Corporate Governance</h4>
        <a href="index.html#leadership">Managing Director Desk</a>
        <a href="https://rera.odisha.gov.in/search-result?search=MP/19/2024/01244" target="_blank" rel="noopener">ORERA MP/19/2024/01244</a>
        <a href="https://rera.odisha.gov.in" target="_blank" rel="noopener">ORERA RP/19/2026/01487</a>
        <a href="index.html#verification">BDA Sanction Plan</a>
      </div>
    </div>
  </div>

  <div class="footer__legal">
    <p>
      Costa Furtune Crestview &amp; Master Township is promoted by Sai Harmony Pvt. Ltd. (CIN: U45203OR2021PTC038077).
      Managing Director: Ashok Kumar Pattnaik. Directors: Manoj Kumar Dash, Sarada Prasad Mohanty.
      All dimensions, carpet areas, and balcony areas comply strictly with ORERA declarations. Indicative pricing subject to applicable taxes, stamp duties, and regulatory levies.
      Renderings and walkthroughs are architectural representations; on-site construction photographs reflect verified live execution status.
    </p>
    <p class="footer__copy">&copy; 2026 Sai Harmony Pvt. Ltd. All rights reserved.</p>
  </div>
</footer>

<div class="toast" id="toast" role="status" aria-live="polite"></div>

<script src="js/chrome.js" defer></script>
</body>
</html>
"""


def hero(eyebrow, lines, sub, meta, actions, img_landscape, img_portrait,
         w, h, alt):
    line_html = "\n".join(lines)
    meta_html = "\n      ".join(meta)
    act = "\n      ".join(actions)
    return f"""
<section class="section section--hero">
  <div class="hero__media">
    <picture>
      <source media="(max-width:900px), (orientation:portrait)" srcset="{img_portrait}">
      <img src="{img_landscape}" alt="{alt}" loading="eager" decoding="async" width="{w}" height="{h}" />
    </picture>
    <div class="hero__media__veil"></div>
  </div>

  <div class="hero__content">
    <p class="eyebrow" data-reveal><span class="eyebrow__rule"></span>{eyebrow}</p>
    <h1 class="hero__title" data-reveal data-reveal-delay="80">
      {line_html}
    </h1>
    <p class="hero__sub" data-reveal data-reveal-delay="180">{sub}</p>
    <div class="hero__meta" data-reveal data-reveal-delay="240">
      {meta_html}
    </div>
    <div class="hero__actions" data-reveal data-reveal-delay="300">
      {act}
    </div>
  </div>

  <div class="hero__foot">
    <div class="hero__scroll">
      <span class="hero__scroll-line"></span>
      <span>Scroll to explore</span>
    </div>
  </div>
</section>
"""


def split(num, kicker, title, lede, body, stats, img, figcap, alt, w, h,
          reverse=False, extra=""):
    stats_html = ""
    if stats:
        cells = "\n        ".join(
            f'<div class="stat"><dt>{a}</dt><dd>{b}</dd></div>' for a, b in stats)
        stats_html = f'\n      <dl class="stats">\n        {cells}\n      </dl>'
    panel_cls = "panel panel--left" if not reverse else "panel panel--right"
    media = f"""<figure class="split__media" data-reveal data-reveal-delay="120">
      <img src="{img}" alt="{alt}" loading="lazy" decoding="async" width="{w}" height="{h}" />
      <figcaption><span>{figcap[0]}</span>{figcap[1]}</figcaption>
    </figure>"""
    left = f"""<div class="{panel_cls}" data-reveal>
      <p class="label"><span>{num}</span> {kicker}</p>
      <h2 class="display">{title}</h2>
      <p class="lede">{lede}</p>
      <p class="body">{body}</p>{stats_html}
      {extra}
    </div>"""
    inner = (media + "\n    " + left) if reverse else (left + "\n\n    " + media)
    return f"""
<section class="section section--split">
  <div class="split">
    {inner}
  </div>
</section>
"""


def wide_head(num, kicker, title, lede, extra_class="section--wide"):
    return f"""
<section class="section {extra_class}">
  <div class="wide__head" data-reveal>
    <p class="label"><span>{num}</span> {kicker}</p>
    <h2 class="display">{title}</h2>
    <p class="lede lede--center">{lede}</p>
  </div>
"""


def unit_card(badge, typ, name, area, rows, price, selected=False):
    dl = "\n          ".join(f"<div><dt>{a}</dt><dd>{b}</dd></div>" for a, b in rows)
    cls = "unit--3bhk is-selected" if selected else "unit--3bhk"
    return f"""      <article class="{cls}">
        <span class="unit__badge">{badge}</span>
        <header><span class="unit__type">{typ}</span><h3>{name}</h3></header>
        <div class="unit__area"><b>{area}</b><span>sq ft SBA</span></div>
        <dl>
          {dl}
        </dl>
        <div class="unit__price">
          <span>Indicative Base</span>
          <b>{price}</b>
        </div>
      </article>"""


def gallery(items, delay=0, six=False):
    out = []
    for cls, src, alt, w, h, num, cap in items:
        klass = "gallery__item" + (f" gallery__item--{cls}" if cls else "")
        out.append(f"""    <figure class="{klass}">
      <img src="{src}" alt="{alt}" loading="lazy" decoding="async" width="{w}" height="{h}" />
      <figcaption><span>{num}</span>{cap}</figcaption>
    </figure>""")
    variant = " gallery gallery--six" if six else "gallery"
    return f"""
  <div class="{variant}" data-reveal data-reveal-delay="{delay}">
{chr(10).join(out)}
  </div>
"""


def timeline(items):
    out = []
    for state, when, title, text in items:
        cls = f' class="{state}"' if state else ""
        out.append(f"""    <li{cls}>
      <span class="timeline__dot"></span>
      <div class="timeline__body">
        <span class="timeline__when">{when}</span>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </li>""")
    return f"""
  <ol class="timeline" data-reveal data-reveal-delay="120">
{chr(10).join(out)}
  </ol>
"""


def verify(rows):
    items = "\n        ".join(
        f'<li><span class="verify__k">{k}</span><span class="verify__v">{v}</span></li>'
        for k, v in rows)
    return f"""<ul class="verify">
        {items}
      </ul>"""


def enquire(num, heading, lede, options, img, alt, w, h, figcap, facts):
    opts = "\n          ".join(f"<option>{o}</option>" for o in options)
    fact_html = "\n        ".join(f"<li><b>{a}</b><span>{b}</span></li>" for a, b in facts)
    return f"""
<section class="section section--enquire" id="enquire">
  <div class="enquire" data-reveal>
    <aside class="enquire__aside">
      <figure class="enquire__media">
        <img src="{img}" alt="{alt}" loading="lazy" decoding="async" width="{w}" height="{h}" />
        <figcaption><span>{figcap[0]}</span>{figcap[1]}</figcaption>
      </figure>
      <ul class="enquire__facts">
        {fact_html}
      </ul>
      <blockquote class="enquire__quote">
        &ldquo;Every number on this page is traceable to an ORERA filing.&rdquo;
        <cite>&mdash; Sai Harmony Pvt. Ltd.</cite>
      </blockquote>
    </aside>

    <div class="enquire__panel">
      <p class="label"><span>{num}</span> VIP Consultation</p>
      <h2 class="display">{heading}</h2>
      <p class="lede">{lede}</p>

      <form class="form" id="enquiryForm" novalidate>
        <div class="field">
          <label for="name">Full Name</label>
          <input id="name" name="name" type="text" autocomplete="name" required placeholder="e.g. Dr. Ashok Kumar Mohapatra" />
        </div>
        <div class="field">
          <label for="phone">WhatsApp / Mobile</label>
          <input id="phone" name="phone" type="tel" autocomplete="tel" required placeholder="+91 98765 43210" />
        </div>
        <div class="field">
          <label for="interest">Requirement</label>
          <select id="interest" name="interest">
          {opts}
          </select>
        </div>
        <div class="field">
          <label for="when">Preferred Visit Timing</label>
          <select id="when" name="when">
            <option>This Weekend (Saturday/Sunday)</option>
            <option>Weekday Morning (10 AM - 1 PM)</option>
            <option>Weekday Afternoon (2 PM - 5 PM)</option>
            <option>Direct Call / Video Walkthrough</option>
          </select>
        </div>

        <button class="btn btn--gold btn--full" type="submit">
          Confirm VIP Site Visit &amp; Request Cost Sheet
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.3"/></svg>
        </button>
        <p class="form__note">Direct promoter response. Zero brokerage. Strict privacy policy.</p>
      </form>

      <div class="enquire__contact">
        <a href="tel:+917735536906">+91 77355 36906</a>
        <a href="tel:+919937715505">+91 99377 15505 (MD Office)</a>
        <a href="mailto:saiharmony2021@gmail.com">saiharmony2021@gmail.com</a>
      </div>
    </div>
  </div>
</section>
"""


def page(title, desc, body):
    html = HEAD.replace("__TITLE__", title).replace("__DESC__", desc)
    return html + body + FOOT.replace("__BROCHURE__", BROCHURE)


# ─────────────────────────────  CRESTVIEW  ─────────────────────────────
crest_body = hero(
    "Phase 2 &middot; Crestview &middot; ORERA MP/19/2024/01244",
    ['<span class="hero__line">Costa</span>',
     '<span class="hero__line hero__line--accent">Furtune</span>',
     '<span class="hero__line hero__line--small">Crestview</span>'],
    "A single B+S+12 tower of <strong>144 residences</strong> set against the Chandaka green belt. "
    "The 3 BHK Royal &amp; Imperial collection from <strong>1,845 sq ft at an indicative &yen;5,700/sq ft</strong>.",
    ["<span>Kantabada &middot; Chandaka Corridor</span>", '<span class="dot"></span>',
     "<span>B + Stilt + 12</span>", '<span class="dot"></span>',
     "<span>Possession 19 August 2028</span>"],
    ['<a class="btn btn--gold" href="#units">Check 3 BHK Availability</a>',
     '<a class="btn btn--ghost" href="index.html">Back to Master Township</a>'],
    "assets/brochure/tower-landscape.webp", "assets/brochure/tower-portrait.webp",
    2200, 1664,
    "Costa Furtune Crestview tower rising above landscaped grounds")

crest_body += split(
    "01", "The Architecture", "One tower.<br /><em>Twelve floors of resolve.</em>",
    "Crestview is the only high-rise phase of the Costa Furtune master township &mdash; a single, "
    "uninterrupted B+S+12 residential tower holding 144 flats and two ground-floor shops.",
    "Structural design is by <strong>SR Engineering</strong> to Seismic Zone III RCC frame specification; "
    "architecture is by <strong>Vogue Architect</strong>. Six passenger lifts &mdash; KONE, ECE or OTIS, "
    "6-person capacity with automatic rescue device &mdash; serve the tower, with a dedicated 15.25 m external road "
    "and 2,078.55 sqm of site development.",
    [("146", "Units &mdash; 144 flats + 2 shops"), ("6", "Passenger lifts with ARD"),
     ("384 sqm", "Plantation area"), ("Aug 2028", "ORERA possession date")],
    "assets/brochure/tower-morning.webp",
    ("Phase 2 &middot; Crestview", "B + Stilt + 12 residential floors"),
    "Costa Furtune Crestview tower at morning light", 1640, 1800)

units = [
    unit_card("Optimal Family Layout", "Type 1 &middot; Flats 101&ndash;1201", "Grand Three", "1,845",
              [("RERA Carpet", "1,016.5 sq ft (94.44 sqm)"),
               ("RERA Balcony", "63.3 sq ft (5.88 sqm)"),
               ("Built-up Area", "1,208 sq ft (112.22 sqm)"),
               ("Parking", "1 Covered Stilt Space")], "&yen;1.05 Cr*", selected=True),
    unit_card("Maximum Carpet Area", "Type 5 &middot; Flats 105&ndash;1205", "Luxury Three", "1,941",
              [("RERA Carpet", "1,082.1 sq ft (100.53 sqm)"),
               ("RERA Balcony", "50.7 sq ft (4.71 sqm)"),
               ("Built-up Area", "1,289 sq ft (119.75 sqm)"),
               ("Parking", "1 Covered Stilt Space")], "&yen;1.14 Cr*"),
    unit_card("Dual Forest Balconies", "Types 4 &amp; 6 &middot; Flats 104&ndash;1206", "Royal Three", "2,013",
              [("RERA Carpet", "1,031.4 sq ft (95.82 sqm)"),
               ("RERA Balcony", "144.1 sq ft (13.39 sqm)"),
               ("Built-up Area", "1,301 sq ft (120.91 sqm)"),
               ("Parking", "1 Covered Stilt Space")], "&yen;1.14 Cr*"),
    unit_card("Panoramic Corner Residence", "Type 2 &middot; Flats 102&ndash;1202", "Imperial Three", "2,033",
              [("RERA Carpet", "1,034.9 sq ft (96.14 sqm)"),
               ("RERA Balcony", "148.8 sq ft (13.83 sqm)"),
               ("Built-up Area", "1,300 sq ft (120.78 sqm)"),
               ("Parking", "2 Dedicated Parking Spaces")], "&yen;1.15 Cr*"),
]

crest_body += wide_head(
    "02", "The 3 BHK Collection", "Four ways to hold<br /><em>the same skyline.</em>",
    "Every residence is a corner or dual-aspect 3 BHK with a full-width forest balcony. Areas below are as declared to ORERA.")
crest_body += f"""
  <div class="unit-grid--4col" id="units" data-reveal data-reveal-delay="120">
{chr(10).join(units)}
  </div>
</section>
"""

crest_body += wide_head(
    "03", "The Township Around It", "What the tower looks onto.<br /><em>And what it opens into.</em>",
    "Crestview shares the master township with Club Costa Fantasy &mdash; a G+4 lifestyle anchor with an infinity pool, banquet terrace and wellness floor.")
crest_body += gallery([
    ("tall", "assets/brochure/pool-deck.webp", "Infinity pool deck with palms and cabanas at Club Costa Fantasy", 2000, 890, "01", "The Pool Deck &amp; Cabanas"),
    ("wide", "assets/brochure/pool-dusk.webp", "Club pool at dusk with palm trees and loungers", 1475, 915, "02", "Club Costa Fantasy &middot; G+4 Clubhouse"),
    ("", "assets/brochure/banquet-hall.webp", "Banquet hall with forest mural and chandeliers", 2200, 832, "03", "Open Terrace Banquet"),
    ("", "assets/brochure/entrance-evening.webp", "Costa Furtune entrance archway at evening", 2400, 1200, "04", "The Arrival Court"),
])
crest_body += "</section>\n"

crest_body += wide_head(
    "04", "Construction Telemetry", "Documented on site.<br /><em>Verified on the record.</em>",
    "Each milestone below corresponds with the certified filings submitted to the Odisha Real Estate Regulatory Authority.")
crest_body += timeline([
    ("is-done", "Certified Complete &middot; Oct 2025", "Sub-structure &amp; Raft Foundation",
     "Heavy RCC pile foundation and plinth engineering to Seismic Zone III specifications."),
    ("is-active", "Active Milestone &middot; 2026", "Tower Superstructure (Stilt to 5th Slab)",
     "Stilt parking columns, commercial shop framework, and first five residential slabs underway."),
    ("", "Scheduled &middot; 2026&ndash;2027", "Floors 6 to 12 &amp; Block Masonry",
     "Upper residential slabs followed by acoustic thermal masonry and internal plastering."),
    ("", "Scheduled &middot; 2027&ndash;2028", "Finishes, MEP, Elevators &amp; Club Costa Fantasy",
     "High-speed lift installation, vitrified flooring, electrical transformers, and clubhouse completion."),
    ("is-end", "19 August 2028", "Statutory Handover &amp; Possession",
     "Possession as registered and committed with ORERA."),
])
crest_body += "</section>\n"

crest_verify = verify([
    ("Phase 2 ORERA Reg.", "MP/19/2024/01244 (Crestview Tower)"),
    ("Sanctioning Authority", "Bhubaneswar Development Authority (BDA)"),
    ("Tower Structure", "Basement + Stilt + 12 Floors"),
    ("Unit Count", "146 units &mdash; 144 flats + 2 shops"),
    ("Community Hall", "146.07 sqm"),
    ("Site Development", "2,078.55 sqm &middot; plantation 384 sqm"),
    ("External Road", "15.25 m wide approach"),
    ("Master Promoter", "Sai Harmony Pvt. Ltd. (CIN U45203OR2021PTC038077)"),
    ("Corporate GSTIN", "21ABHCS2378C1ZM"),
    ("Structural Consultants", "SR Engineering (Zone III Seismic Compliant)"),
    ("Architectural Design", "Vogue Architect &mdash; Shivangi Pradhan"),
    ("Promoter Head Office", "Plot No. 83, Prachi Enclave, Chandrasekharpur, Bhubaneswar &ndash; 751016"),
])

crest_body += f"""
<section class="section section--split">
  <div class="split">
    <div class="panel panel--left" data-reveal>
      <p class="label"><span>05</span> ORERA Verification</p>
      <h2 class="display">On the record.<br /><em>Not on the brochure.</em></h2>
      <p class="lede">
        Crestview is registered with the Odisha Real Estate Regulatory Authority under
        <strong>MP/19/2024/01244</strong>. Every figure on this page &mdash; carpet area, balcony area,
        possession date, unit count &mdash; is drawn from that filing.
      </p>
      {crest_verify}
    </div>

    <figure class="split__media" data-reveal data-reveal-delay="120">
      <img src="assets/site-tower.webp" alt="Crestview RCC tower under construction, stilt to fifth floor" loading="lazy" decoding="async" width="1000" height="1457" />
      <figcaption><span>On Site &middot; Verified</span>RCC columns and slab casting, stilt to level five</figcaption>
    </figure>
  </div>
</section>
"""

crest_body += enquire(
    "06", "Schedule a<br /><em>Private Tower Viewing.</em>",
    "Chauffeured site visits seven days a week. Ask for the floor plan set for your preferred typology and a written payment schedule.",
    ["Type 1 &middot; 3 BHK &middot; 1,845 sq ft &middot; &yen;1.05 Cr*",
     "Type 5 &middot; 3 BHK &middot; 1,941 sq ft &middot; &yen;1.14 Cr*",
     "Types 4 &amp; 6 &middot; 3 BHK &middot; 2,013 sq ft &middot; &yen;1.14 Cr*",
     "Type 2 &middot; 3 BHK &middot; 2,033 sq ft &middot; &yen;1.15 Cr*",
     "Phase 1 Triplex Villa Consultation"],
    "assets/brochure/tower-morning.webp", "Costa Furtune Crestview tower elevation", 1640, 1800,
    ("Phase 2 &middot; Crestview", "B+S+12 &middot; 144 residences"),
    [("ORERA", "MP/19/2024/01244"), ("Possession", "19 August 2028"),
     ("Promoter", "Sai Harmony Pvt. Ltd.")])

# ─────────────────────────────  TRIPLEX  ─────────────────────────────
triplex_body = hero(
    "Phase 1 &middot; Delivered &middot; ORERA RP/19/2023/00854",
    ['<span class="hero__line">Costa</span>',
     '<span class="hero__line hero__line--accent">Fortune</span>',
     '<span class="hero__line hero__line--small">Triplex Villas</span>'],
    "The delivered G+2 villa enclave &mdash; <strong>100% sold out and handed over</strong>. "
    "Owner resale and waitlist enquiries are handled directly by the promoter desk.",
    ["<span>Phase 1 &middot; Handed Over</span>", '<span class="dot"></span>',
     "<span>G + 2 Villas</span>", '<span class="dot"></span>',
     "<span>ORERA RP/19/2023/00854</span>"],
    ['<a class="btn btn--gold" href="#resale">Resale &amp; Waitlist Desk</a>',
     '<a class="btn btn--ghost" href="index.html#township">See All 3 Phases</a>'],
    "assets/phases/costa-triplex-row.webp", "assets/phases/costa-triplex-isometric.webp",
    1323, 929,
    "Costa Fortune Triplex villa row, Phase 1 of the master township")

triplex_body += split(
    "01", "Delivered Architecture", "Built. Handed over.<br /><em>Still the benchmark.</em>",
    "Phase 1 set the standard for the township: a row of G+2 triplex villas with private terraces, "
    "individual entries and a shared landscaped spine.",
    "Because the enclave is complete, everything about it can be inspected in person rather than imagined &mdash; "
    "the plaster, the joinery, the drainage, the finish. That is the advantage of buying into a delivered phase.",
    [("G+2", "Villa configuration"), ("100%", "Sold out &amp; handed over"),
     ("RERA", "RP/19/2023/00854"), ("Phase 1", "Of three")],
    "assets/phases/costa-triplex-elevation-day.webp",
    ("Phase 1 &middot; Delivered", "G + 2 triplex villas, day elevation"),
    "Costa Fortune Triplex villa elevation in daylight", 1323, 929)

triplex_body += wide_head(
    "02", "Villa Architecture", "The plans, as built.<br /><em>Not as rendered.</em>",
    "Drawings and isometrics of the delivered villa typology, taken from the Phase 1 documentation.")
triplex_body += gallery([
    ("wide", "assets/phases/costa-triplex-isometric.webp", "Costa Fortune Triplex isometric view of villa cluster", 1323, 929, "01", "Villa Cluster &middot; Isometric"),
    ("", "assets/phases/costa-triplex-row.webp", "Costa Fortune Triplex villa row elevation", 1323, 929, "02", "The Villa Row"),
    ("", "assets/phases/costa-triplex-floorplan-2530.webp", "Costa Fortune Triplex villa floor plan", 1323, 929, "03", "Villa Floor Plate"),
    ("", "assets/phases/phase2-triplex-villas.webp", "Triplex villas within the master township", 1323, 929, "04", "Within the Master Plan"),
])
triplex_body += "</section>\n"

triplex_body += split(
    "03", "The Resale Desk", "Sold out once.<br /><em>Occasionally available again.</em>",
    "The developer holds no primary inventory in Phase 1. What moves is owner resale, and it moves quietly.",
    "We register interest and call in order. There is no brokerage on a promoter-handled resale, and every "
    "transaction is checked against the original ORERA allotment before it is offered.",
    [("0", "Primary units left"), ("Direct", "Promoter-handled resale"),
     ("No fee", "Zero brokerage"), ("Verified", "Against ORERA allotment")],
    "assets/phases/phase2-triplex-villas.webp",
    ("Phase 1 &middot; Delivered", "Triplex enclave within the master township"),
    "Triplex villas seen within the wider master township", 1323, 929,
    reverse=True)

triplex_body += enquire(
    "04", "Join the<br /><em>Resale Register.</em>",
    "Tell us the configuration and budget you are tracking. We call in registration order when an owner release is verified.",
    ["Phase 1 Triplex &mdash; resale register",
     "Phase 1 Triplex &mdash; rental enquiry",
     "Phase 2 Crestview &mdash; 3 BHK",
     "Phase 3 Horizon Heights &mdash; EOI"],
    "assets/phases/costa-triplex-elevation-day.webp", "Costa Fortune Triplex villa elevation", 1323, 929,
    ("Phase 1 &middot; Delivered", "G+2 &middot; 100% sold out"),
    [("ORERA", "RP/19/2023/00854"), ("Status", "Delivered &amp; handed over"),
     ("Promoter", "Sai Harmony Pvt. Ltd.")])

# ─────────────────────────────  HORIZON HEIGHTS  ─────────────────────────────
horizon_body = hero(
    "Phase 3 &middot; Horizon Heights &middot; ORERA RP/19/2026/01487",
    ['<span class="hero__line">Costa</span>',
     '<span class="hero__line hero__line--accent">Furtune</span>',
     '<span class="hero__line hero__line--small">Horizon Heights</span>'],
    "Twin towers, <strong>B+S+11</strong>, registered under ORERA RP/19/2026/01487. "
    "Expression of interest is open ahead of the formal launch.",
    ["<span>Phase 3 &middot; EOI Open</span>", '<span class="dot"></span>',
     "<span>Twin Towers &middot; B+S+11</span>", '<span class="dot"></span>',
     "<span>Indicative &yen;6,000/sq ft</span>"],
    ['<a class="btn btn--gold" href="#enquire">Register EOI</a>',
     '<a class="btn btn--ghost" href="index.html#township">See All 3 Phases</a>'],
    "assets/phases/phase3-horizon-heights.webp", "assets/phases/horizon-heights-layout.webp",
    2700, 1950,
    "Horizon Heights twin tower master layout, Phase 3")

horizon_body += split(
    "01", "Twin Tower Architecture", "Two towers.<br /><em>One horizon line.</em>",
    "Horizon Heights is the final phase of the master township: a matched pair of B+S+11 residential towers "
    "with ground-floor commercial frontage along the approach road.",
    "The phase is registered and the layout sanctioned. Construction begins after Crestview's superstructure "
    "clears, which keeps the site logistics clean and protects the delivered phases from disruption.",
    [("B+S+11", "Twin tower configuration"), ("RP/19/2026/01487", "ORERA registration"),
     ("2", "Matched towers"), ("EOI", "Open now")],
    "assets/phases/phase3-horizon-heights.webp",
    ("Phase 3 &middot; Horizon Heights", "Twin tower master layout"),
    "Horizon Heights twin tower master layout rendering", 2700, 1950)

horizon_body += wide_head(
    "02", "Typologies &amp; Layout", "The drawings<br /><em>behind the launch.</em>",
    "Sanctioned layout and specification sheets for the twin tower phase.")
horizon_body += gallery([
    ("wide", "assets/phases/horizon-heights-layout.webp", "Horizon Heights sanctioned layout drawing", 2700, 1950, "01", "Sanctioned Layout"),
    ("", "assets/phases/horizon-heights-specifications.webp", "Horizon Heights specification sheet", 2700, 1950, "02", "Specification Sheet"),
    ("", "assets/phases/phase3-horizon-heights.webp", "Horizon Heights tower composition", 2700, 1950, "03", "Tower Composition"),
    ("", "assets/phases/township-landscape-view.webp", "Master township landscape view", 1800, 1300, "04", "Master Township Context"),
])
horizon_body += "</section>\n"

horizon_body += split(
    "03", "Commercial Arcade", "Frontage that<br /><em>pays for itself.</em>",
    "The ground plane of Horizon Heights is planned as a commercial arcade facing the 15.25 m external road &mdash; "
    "the same approach that serves Crestview.",
    "For residents this is convenience at the gate. For investors it is the part of the phase with the shortest "
    "gestation: frontage on a growing arterial tends to re-rate before the towers top out.",
    [("Ground", "Commercial frontage"), ("15.25 m", "External road width"),
     ("Phase 3", "Position in township"), ("EOI", "Priority allotment")],
    "assets/phases/township-landscape-view.webp",
    ("Master Township", "Landscape view across all three phases"),
    "Landscape view across the Costa Furtune master township", 1800, 1300,
    reverse=True)

horizon_body += enquire(
    "04", "Register<br /><em>Expression of Interest.</em>",
    "EOI holders are called before public launch and receive the sanctioned layout pack with pricing before it is published.",
    ["Horizon Heights &mdash; 2 BHK EOI", "Horizon Heights &mdash; 3 BHK EOI",
     "Horizon Heights &mdash; commercial arcade",
     "Phase 2 Crestview &mdash; 3 BHK",
     "Phase 1 Triplex &mdash; resale register"],
    "assets/phases/phase3-horizon-heights.webp", "Horizon Heights twin towers", 2700, 1950,
    ("Phase 3 &middot; Horizon Heights", "Twin towers &middot; B+S+11"),
    [("ORERA", "RP/19/2026/01487"), ("Status", "EOI open"),
     ("Promoter", "Sai Harmony Pvt. Ltd.")])


def band(img, alt, w, h, kicker, title):
    return f"""
<section class="band">
  <img src="{img}" alt="{alt}" loading="lazy" decoding="async" width="{w}" height="{h}" />
  <div class="band__veil"></div>
  <figcaption class="band__caption">
    <span>{kicker}</span>
    <b>{title}</b>
  </figcaption>
</section>
"""


# ─────────────────────────────  CLUBHOUSE  ─────────────────────────────
club_body = hero(
    "Amenity Anchor &middot; Club Costa Fantasy",
    ['<span class="hero__line">Club</span>',
     '<span class="hero__line hero__line--accent">Costa</span>',
     '<span class="hero__line hero__line--small">Fantasy</span>'],
    "A <strong>G+4 vertical clubhouse</strong> shared across all three phases &mdash; the social centre of the "
    "Costa Furtune township, with an infinity pool deck, a rooftop banquet terrace and a wellness floor.",
    ["<span>Shared Across 3 Phases</span>", '<span class="dot"></span>',
     "<span>G + 4 Clubhouse</span>", '<span class="dot"></span>',
     "<span>Construction Ready</span>"],
    ['<a class="btn btn--gold" href="#enquire">Request Club Walkthrough</a>',
     f'<a class="btn btn--ghost" href="{BROCHURE}" target="_blank" rel="noopener">Download Official Brochure</a>',
     '<a class="btn btn--ghost" href="index.html#amenities">Amenities at a Glance</a>'],
    "assets/phases/club-costa-fantasy.webp", "assets/phases/club-costa-fantasy-pool.webp",
    1440, 900,
    "Club Costa Fantasy clubhouse exterior at the Costa Furtune township")

club_body += split(
    "01", "The Vertical Club", "Four floors.<br /><em>One social life.</em>",
    "Club Costa Fantasy is deliberately vertical. Instead of spreading amenities across the site, the club stacks "
    "them into a single G+4 volume so that everything is a short walk from everything else.",
    "It serves Crestview, the Triplex villas and Horizon Heights together &mdash; which means the club stays busy "
    "through every phase of the township's life, not just the one that happens to be selling. That is also why it "
    "is the part of the master plan least exposed to how any single phase performs.",
    [("G+4", "Clubhouse floors"), ("3", "Phases served"),
     ("Infinity", "Pool &amp; deck"), ("Shared", "Not phase-locked")],
    "assets/brochure/club-exterior.webp",
    ("Club Costa Fantasy", "G+4 amenity anchor &middot; township centre"),
    "Club Costa Fantasy clubhouse exterior render", 2200, 1200)

club_body += band(
    "assets/brochure/pool-deck.webp",
    "Infinity pool deck with palms, cabanas and sun loungers at Club Costa Fantasy",
    2000, 890,
    "Club Costa Fantasy",
    "The pool deck &amp; cabanas")

club_body += wide_head(
    "02", "The Amenity Programme", "The rooms you will<br /><em>actually use.</em>",
    "Renders of the amenity programme &mdash; the pool deck at dusk, the infinity edge, the banquet terrace, "
    "the wellness floor, the games room and the arrival court that ties them together.")
club_body += gallery([
    ("", "assets/brochure/pool-dusk.webp", "Infinity pool at dusk with palm trees and loungers", 1475, 915, "01", "The Pool at Dusk"),
    ("", "assets/brochure/pool-detail.webp", "Infinity pool detail with butterfly wall art", 1475, 860, "02", "Butterfly Wall &middot; Infinity Edge"),
    ("", "assets/brochure/banquet-hall.webp", "Banquet hall with forest mural and chandeliers", 2200, 832, "03", "Open Terrace Banquet"),
    ("", "assets/render-gym.webp", "Equipped multi-gym at Club Costa Fantasy", 1400, 659, "04", "The Multi-Gym"),
    ("", "assets/render-billiards.webp", "Billiards and snooker room at Club Costa Fantasy", 1400, 612, "05", "Billiards &amp; Snooker"),
    ("", "assets/brochure/entrance-evening.webp", "Costa Furtune entrance archway and arrival court at evening", 2400, 1200, "06", "The Arrival Court"),
], six=True)
club_body += "</section>\n"

club_body += split(
    "03", "Occasions, Handled", "The room that carries<br /><em>the whole family.</em>",
    "A rooftop banquet terrace is the amenity that gets used hardest and longest &mdash; birthdays, thread ceremonies, "
    "annaprashan, reunion dinners, the annual society meeting.",
    "In most projects it is the first thing value-engineered out and the first thing residents ask for afterwards. "
    "Here it is drawn into the club from the outset, with the forest treeline as the backdrop.",
    [("Rooftop", "Banquet terrace"), ("Forest", "Treeline backdrop"),
     ("Indoor", "Billiards &amp; games"), ("Wellness", "Multi-gym floor")],
    "assets/phases/club-costa-fantasy-official.webp",
    ("Club Costa Fantasy", "G+4 &middot; drawn into the master plan"),
    "Club Costa Fantasy clubhouse official render", 1323, 929,
    reverse=True)

club_body += split(
    "04", "The Programme", "Sixteen spaces.<br /><em>One membership.</em>",
    "The amenity list is short enough to be delivered and long enough to matter. Everything below sits inside the "
    "club or on the landscaped grounds immediately around it.",
    "Because the club is shared across all three phases rather than duplicated per tower, the township funds one "
    "very good amenity building instead of three thin ones.",
    [],
    "assets/phases/township-aerial-3phases.webp",
    ("Master Township", "All three phases around one club"),
    "Aerial of all three Costa Furtune phases around the shared clubhouse", 1323, 929,
    extra="""<ul class="amenities">
        <li>Infinity Swimming Pool</li><li>Toddlers Splash Deck</li><li>Equipped Multi-Gym</li>
        <li>Billiards &amp; Snooker</li><li>Indoor Badminton Court</li><li>Kids Indoor Creche</li>
        <li>Rooftop Banquet Terrace</li><li>Private Tea &amp; Coffee Lounge</li><li>Fine Dining Cafe</li>
        <li>Unisex Grooming Salon</li><li>24/7 Wellness Pharmacy</li><li>On-site Bank ATM</li>
        <li>Daily Convenience Mart</li><li>Landscaped Pet Park</li><li>Jogging Circuit</li>
        <li>Landscaped Green Spine</li>
      </ul>""")

club_body += enquire(
    "05", "Walk the<br /><em>Club First.</em>",
    "Amenities are the easiest thing to fake in a render and the hardest thing to retrofit. Come and see the volume, "
    "the ceiling heights and the pool deck in person before you commit to a unit.",
    ["Club Costa Fantasy &mdash; membership &amp; walkthrough",
     "Phase 2 Crestview &mdash; 3 BHK",
     "Phase 3 Horizon Heights &mdash; EOI",
     "Phase 1 Triplex &mdash; resale register"],
    "assets/brochure/club-exterior.webp", "Club Costa Fantasy clubhouse exterior", 2200, 1200,
    ("Club Costa Fantasy", "G+4 &middot; shared across three phases"),
    [("Club", "Costa Fantasy &middot; G+4"), ("Serves", "All three phases"),
     ("Promoter", "Sai Harmony Pvt. Ltd.")])

# ─────────────────────────────  BLOG  ─────────────────────────────
blog_body = hero(
    "Market Intelligence &middot; Bhubaneswar North",
    ['<span class="hero__line">Township</span>',
     '<span class="hero__line hero__line--accent">Intelligence</span>',
     '<span class="hero__line hero__line--small">Notes on the Chandaka corridor</span>'],
    "What the filings actually say about Bhubaneswar's northern growth corridor &mdash; and how to read a "
    "pre-launch brochure without being misled by it.",
    ["<span>3 phases compared</span>", '<span class="dot"></span>',
     "<span>ORERA-verified</span>", '<span class="dot"></span>',
     "<span>No broker spin</span>"],
    ['<a class="btn btn--gold" href="#enquire">Talk to the Promoter</a>',
     '<a class="btn btn--ghost" href="index.html#verification">See Verification</a>'],
    "assets/brochure/aerial-full.webp", "assets/brochure/tower-portrait.webp",
    2200, 1424,
    "Aerial view of the Costa Furtune master township")

blog_body += split(
    "01", "Phase Comparison", "Three phases.<br /><em>Three different bets.</em>",
    "Crestview, the Triplex villas and Horizon Heights are not interchangeable. Each one is a different "
    "risk profile, and the price per square foot tells you which is which.",
    "<strong>Phase 1 (Triplex)</strong> is delivered and sold out &mdash; what trades is owner resale, priced on "
    "what exists. <strong>Phase 2 (Crestview)</strong> is under construction at an indicative &yen;5,700/sq ft with "
    "possession registered for 19 August 2028. <strong>Phase 3 (Horizon Heights)</strong> is twin towers at an "
    "indicative &yen;6,000/sq ft, sold on expression of interest before launch.",
    [("Phase 1", "Delivered &middot; sold out"), ("Phase 2", "Under construction"),
     ("Phase 3", "EOI open"), ("2028", "Crestview handover")],
    "assets/phases/township-aerial-3phases.webp",
    ("Master Township", "All three phases in one frame"),
    "Aerial showing all three phases of the Costa Furtune township", 1323, 929)

blog_body += wide_head(
    "02", "How to Read a Pre-Launch", "Four questions<br /><em>that settle most arguments.</em>",
    "Ask these before you visit any site in the corridor &mdash; including this one.")
blog_body += """
  <div class="split">
    <div class="panel panel--left" data-reveal>
      <p class="label"><span>i</span> The Registration</p>
      <h3 class="display" style="font-size:clamp(20px,2.2vw,28px);">Is the phase registered,<br /><em>or only announced?</em></h3>
      <p class="body">
        An ORERA number is a filing with declared carpet areas, balcony areas, unit counts and a possession date.
        A brochure without one is a rendering with a phone number on it. Crestview is
        <strong>MP/19/2024/01244</strong>; the Triplex villas are <strong>RP/19/2023/00854</strong>;
        Horizon Heights is <strong>RP/19/2026/01487</strong>.
      </p>
      <p class="label" style="margin-top:22px;"><span>ii</span> The Area Basis</p>
      <h3 class="display" style="font-size:clamp(20px,2.2vw,28px);">Carpet, built-up,<br /><em>or super built-up?</em></h3>
      <p class="body">
        The three can differ by 30% on the same flat. A 1,845 sq ft saleable area on Crestview is
        <strong>1,016.5 sq ft of RERA carpet</strong>. Compare like with like or the price per square foot is fiction.
      </p>
    </div>

    <div class="panel panel--right" data-reveal data-reveal-delay="120">
      <p class="label"><span>iii</span> The Possession</p>
      <h3 class="display" style="font-size:clamp(20px,2.2vw,28px);">A date, or<br /><em>a quarter?</em></h3>
      <p class="body">
        &ldquo;2028&rdquo; is not a commitment. Crestview's registered date is <strong>19 August 2028</strong>,
        which is a specific day the promoter can be held to. Ask every project in the corridor for the exact date
        on the registration.
      </p>
      <p class="label" style="margin-top:22px;"><span>iv</span> The Delivery Record</p>
      <h3 class="display" style="font-size:clamp(20px,2.2vw,28px);">Has this developer<br /><em>finished anything?</em></h3>
      <p class="body">
        Phase 1 is the answer here: a delivered, occupied villa enclave you can walk through before you buy into
        Phase 2. A completed phase is the only track record that cannot be rendered.
      </p>
    </div>
  </div>
</section>
"""

blog_body += enquire(
    "03", "Ask the<br /><em>Promoter Directly.</em>",
    "No channel partner, no call centre. Questions about filings, areas or possession dates go to the promoter desk.",
    ["General enquiry", "Phase 2 Crestview &mdash; 3 BHK",
     "Phase 3 Horizon Heights &mdash; EOI",
     "Phase 1 Triplex &mdash; resale register"],
    "assets/brochure/aerial-full.webp", "Aerial view of the Costa Furtune master township", 2200, 1424,
    ("Master Township", "Kantabada &middot; Chandaka corridor"),
    [("ORERA", "MP/19/2024/01244"), ("Possession", "19 August 2028"),
     ("Promoter", "Sai Harmony Pvt. Ltd.")])

# ─────────────────────────────  write  ─────────────────────────────
PAGES = {
    "crestview.html": (
        "Costa Furtune Crestview &middot; Phase 2 &middot; B+S+12 &middot; Sai Harmony Pvt. Ltd.",
        "Costa Furtune Crestview by Sai Harmony Pvt. Ltd. Phase 2 of the Kantabada master township: "
        "B+S+12 tower, 144 residences, 3 BHK from 1,845 sq ft at an indicative Rs 5,700/sq ft. "
        "ORERA MP/19/2024/01244. Possession 19 August 2028.",
        crest_body),
    "triplex.html": (
        "Costa Fortune Triplex &middot; Phase 1 &middot; Delivered Villas &middot; Sai Harmony Pvt. Ltd.",
        "Costa Fortune Triplex: Phase 1 of the Costa Furtune master township at Kantabada, Bhubaneswar. "
        "Delivered G+2 luxury villas, 100% sold out and handed over. ORERA RP/19/2023/00854. Promoter-handled resale register.",
        triplex_body),
    "horizon-heights.html": (
        "Horizon Heights &middot; Phase 3 &middot; Twin Towers &middot; Sai Harmony Pvt. Ltd.",
        "Horizon Heights: Phase 3 of the Costa Furtune master township. Twin B+S+11 towers with ground-floor "
        "commercial frontage. ORERA RP/19/2026/01487. Expression of interest open.",
        horizon_body),
    "clubhouse.html": (
        "Club Costa Fantasy &middot; G+4 Township Clubhouse &middot; Sai Harmony Pvt. Ltd.",
        "Club Costa Fantasy, the G+4 vertical clubhouse shared across all three phases of the Costa Furtune "
        "master township: infinity pool deck, banquet terrace and wellness floor. Construction ready.",
        club_body),
    "blog.html": (
        "Bhubaneswar Township Intelligence &middot; Costa Furtune &middot; Sai Harmony",
        "An ORERA-grounded comparison of the three Costa Furtune phases and four questions to ask before buying "
        "into any pre-launch project on the Chandaka corridor.",
        blog_body),
}

for name, (title, desc, body) in PAGES.items():
    (SITE / name).write_text(page(title, desc, body), encoding="utf-8")
    print("wrote", name, len(body), "bytes of body")
