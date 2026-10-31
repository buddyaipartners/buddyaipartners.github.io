# Buddy — Digital Office (Chrome side panel)

A Manifest V3 side panel that runs **BUDDY AI PARTNERS** from any web page. It
talks only to your local Buddy runtime (`http://127.0.0.1:8787`) — no cloud
round-trip, no tokens shipped to a server.

## Load it

1. Start the runtime: `buddy api --host 127.0.0.1 --port 8787`
2. Open `chrome://extensions`
3. Enable **Developer mode**
4. **Load unpacked** → select this `extension/` folder
5. Click the Buddy icon in the toolbar → the side panel opens

## What it can do

- **Multi-Tenant Workspace Switcher**: Select between `KNR Integrity Real Estate`, `Rahul Kumar Dhal (Personal Brand)`, and `BUDDY AI PARTNERS (Agency)` or any new client registered in Buddy.
- **🎬 AI Video Studio (Zero API Cost)**:
  - Generate high-growth organic lead generation video blueprints for **InVideo AI**, **Canva**, **CapCut Web**, or **Clipchamp**.
  - Injects real verified project assets (**Costa Fortune Crestview**, **The Harmonious Haven**), public CDN image URLs, and 30-year non-encumbrance title clearance guarantees.
  - Automatically copies cinematic prompts & media URLs to the clipboard, opens the AI video tool in a new tab, and focuses the prompt input box.
- **📱 Organic Social Studio (1-Click Web Composer)**:
  - Bypass expensive or expiring third-party social API subscriptions.
  - 1-Click to copy high-converting captions with WhatsApp CTA & open composers on **Instagram Web**, **Facebook Business Suite**, **LinkedIn**, **YouTube Shorts Studio**, and **X**.
- Capture the active page (title, URL, selection, visible text)
- **Morning brief** for a client workspace (`client.profile`)
- **Summarise page** / **Draft reply** grounded in that page
- **Queue a social post** with `social.compose` (draft only; nothing published)
- **Today's plan** for the selected client
- Chat with the full Buddy runtime, including CRM, video, and research tools

## Safety defaults

- **Drafts only** is on by default: prompts tell Buddy to queue drafts and list
  approvals instead of publishing or sending.
- Publishing needs an approved queue entry plus `META_ACCESS_TOKEN` configured
  in `.env`, then `social.publish` with `dry_run=false` and `confirm=true`.
- The JEV gate records every non-read tool decision in
  `data/logs/jev_receipts.jsonl` (advise mode by default; flip
  `JEV_GATE_MODE=enforce` to block external/destructive calls).

## Settings

API URL and an optional admin token are stored in `chrome.storage.local`.
Loopback requests are already admin on this machine; the token matters only
when the API is reached through the Cloudflare tunnel.

## Notes

- Chrome 114+ is required for `chrome.sidePanel`.
- The extension never stores page content; captures stay in memory until the
  panel closes, except the current capture used for the next prompt.
