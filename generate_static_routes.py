#!/usr/bin/env python3
"""
Generate clean, crawlable static sub-pages for GitHub Pages
so Googlebot, Bingbot, and users get HTTP 200 on deep URLs
instead of 404 or single-page anchor tags.
"""

from pathlib import Path
import re

REPO_DIR = Path('/Users/knrintegrity/Buddy-ai-partners-repo')
INDEX_FILE = REPO_DIR / 'index.html'

if not INDEX_FILE.exists():
    print("Error: index.html not found")
    exit(1)

raw_html = INDEX_FILE.read_text(encoding='utf-8')

PAGES = {
    "services": {
        "title": "Autonomous AI Software Engineering & CRM Services in Bhubaneswar | BUDDY AI PARTNERS",
        "desc": "Discover enterprise AI software engineering, custom CRM architecture, WhatsApp conversational bots, and autonomous lead generation by Buddy AI Partners in Bhubaneswar, Odisha.",
        "target_page_id": "page-services",
        "canonical": "https://buddyaipartners.github.io/services/"
    },
    "pricing": {
        "title": "Transparent Pricing & Rapid Modernization Packages | BUDDY AI PARTNERS",
        "desc": "Explore transparent pricing for AI automation, Next.js web modernizations (₹14,999 - ₹24,999), custom enterprise CRMs, and autonomous lead engines with zero hidden fees.",
        "target_page_id": "page-contact",
        "canonical": "https://buddyaipartners.github.io/pricing/"
    },
    "digital-office": {
        "title": "Live Autonomous Digital Office & AI Swarm Telemetry | BUDDY AI PARTNERS",
        "desc": "Live operations control center for Buddy AI Partners. Real-time telemetry, active LLM cascades, WhatsApp socket status, and autonomous agent queue monitoring.",
        "target_page_id": "page-digital-office",
        "canonical": "https://buddyaipartners.github.io/digital-office/"
    },
    "portfolio": {
        "title": "Enterprise Portfolio & Production AI Case Studies | BUDDY AI PARTNERS",
        "desc": "Inspect proven production deployments: KNR Integrity CRM with 18,678 leads, autonomous AI calling swarms, WhatsApp bot pipelines, and clinic booking engines in Odisha.",
        "target_page_id": "page-portfolio",
        "canonical": "https://buddyaipartners.github.io/portfolio/"
    },
    "blog": {
        "title": "Tech & AI Intelligence Blog | BUDDY AI PARTNERS Bhubaneswar",
        "desc": "Engineering deep dives on autonomous AI agents, WhatsApp Baileys socket scaling, enterprise CRM telemetry, and Next.js modernizations in Bhubaneswar, Odisha.",
        "target_page_id": "page-blog",
        "canonical": "https://buddyaipartners.github.io/blog/"
    },
    "about": {
        "title": "About Rahul Kumar Dhal & BUDDY AI PARTNERS | AI Engineering Bhubaneswar",
        "desc": "Meet Founder & Managing Director Rahul Kumar Dhal. Google Cloud Certified Generative AI Architect and full-stack software engineer based in Bhubaneswar, Odisha.",
        "target_page_id": "page-about",
        "canonical": "https://buddyaipartners.github.io/about/"
    },
    "contact": {
        "title": "Contact Founder Rahul Kumar Dhal | BUDDY AI PARTNERS Bhubaneswar",
        "desc": "Start your AI modernization or book a 10-minute strategy call with Founder Rahul Kumar Dhal. WhatsApp: +91 73280 89908. Email: buddyaipartnersindia@gmail.com.",
        "target_page_id": "page-contact",
        "canonical": "https://buddyaipartners.github.io/contact/"
    }
}

for route, meta in PAGES.items():
    out_dir = REPO_DIR / route
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / 'index.html'

    page_html = raw_html

    # 1. Inject <base href="https://buddyaipartners.github.io/"> right after <head>
    if '<head>' in page_html and '<base ' not in page_html:
        page_html = page_html.replace('<head>', '<head>\n  <base href="https://buddyaipartners.github.io/">')

    # 2. Update title
    page_html = re.sub(r'<title>.*?</title>', f'<title>{meta["title"]}</title>', page_html)

    # 3. Update meta description
    page_html = re.sub(r'<meta name="description" content=".*?" />', f'<meta name="description" content="{meta["desc"]}" />', page_html)

    # 4. Update canonical URL
    page_html = re.sub(r'<link rel="canonical" href=".*?" />', f'<link rel="canonical" href="{meta["canonical"]}" />', page_html)

    # 5. Update OpenGraph URL and title
    page_html = re.sub(r'<meta property="og:url" content=".*?" />', f'<meta property="og:url" content="{meta["canonical"]}" />', page_html)
    page_html = re.sub(r'<meta property="og:title" content=".*?" />', f'<meta property="og:title" content="{meta["title"]}" />', page_html)

    # 6. Deactivate page-home and activate target page
    target_id = meta["target_page_id"]
    page_html = re.sub(r'id="page-home" class="page-view active"', 'id="page-home" class="page-view"', page_html)
    page_html = re.sub(f'id="{target_id}" class="page-view"', f'id="{target_id}" class="page-view active"', page_html)

    out_file.write_text(page_html, encoding='utf-8')
    print(f"Generated {out_file} ({len(page_html)} bytes)")

print("\nAll sub-page routes generated successfully!")
