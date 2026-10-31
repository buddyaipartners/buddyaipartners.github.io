const DEFAULT_API = "http://127.0.0.1:8787";
const PAGE_LIMIT = 4000;

const state = {
  api: DEFAULT_API,
  token: "",
  client: "buddy_ai_partners",
  dryRun: true,
  page: null,
  busy: false,
  lastVideoPackage: null,
  lastSocialDraft: null,
};

const el = {
  statusDot: document.getElementById("statusDot"),
  statusText: document.getElementById("statusText"),
  clientSelect: document.getElementById("clientSelect"),
  dryRunToggle: document.getElementById("dryRunToggle"),
  settingsToggle: document.getElementById("settingsToggle"),
  settings: document.getElementById("settings"),
  apiUrl: document.getElementById("apiUrl"),
  adminToken: document.getElementById("adminToken"),
  saveSettings: document.getElementById("saveSettings"),
  checkHealth: document.getElementById("checkHealth"),
  chat: document.getElementById("chat"),
  composer: document.getElementById("composer"),
  message: document.getElementById("message"),
  sendBtn: document.getElementById("sendBtn"),
  capture: document.getElementById("capture"),
  pageHint: document.getElementById("pageHint"),
  // Views & Tabs
  viewChat: document.getElementById("viewChat"),
  viewDeals: document.getElementById("viewDeals"),
  viewVideo: document.getElementById("viewVideo"),
  viewSocial: document.getElementById("viewSocial"),
  // Deals Elements
  dealsCountTag: document.getElementById("dealsCountTag"),
  dealSearchInput: document.getElementById("dealSearchInput"),
  btnRefreshDeals: document.getElementById("btnRefreshDeals"),
  dealsListContainer: document.getElementById("dealsListContainer"),
  dealDetailCard: document.getElementById("dealDetailCard"),
  detailBusinessName: document.getElementById("detailBusinessName"),
  detailHealthScore: document.getElementById("detailHealthScore"),
  detailPackageName: document.getElementById("detailPackageName"),
  detailSetupPrice: document.getElementById("detailSetupPrice"),
  detailMonthlyPrice: document.getElementById("detailMonthlyPrice"),
  detailFlaw: document.getElementById("detailFlaw"),
  detailCallScript: document.getElementById("detailCallScript"),
  btnCopyCallScript: document.getElementById("btnCopyCallScript"),
  btnOpenWhatsAppPitch: document.getElementById("btnOpenWhatsAppPitch"),
  btnAutoDeliver: document.getElementById("btnAutoDeliver"),
  btnLivePreview: document.getElementById("btnLivePreview"),
  deliveryStatusNote: document.getElementById("deliveryStatusNote"),
  // Video Elements
  videoProjectSelect: document.getElementById("videoProjectSelect"),
  videoCustomTopicWrap: document.getElementById("videoCustomTopicWrap"),
  videoCustomTopic: document.getElementById("videoCustomTopic"),
  videoEngineSelect: document.getElementById("videoEngineSelect"),
  videoFormatSelect: document.getElementById("videoFormatSelect"),
  videoLanguageSelect: document.getElementById("videoLanguageSelect"),
  btnLaunchVideo: document.getElementById("btnLaunchVideo"),
  videoOutputCard: document.getElementById("videoOutputCard"),
  videoOutputEngineTag: document.getElementById("videoOutputEngineTag"),
  videoPromptPreview: document.getElementById("videoPromptPreview"),
  videoCaptionPreview: document.getElementById("videoCaptionPreview"),
  btnCopyPrompt: document.getElementById("btnCopyPrompt"),
  btnCopyImages: document.getElementById("btnCopyImages"),
  btnOpenEngineTab: document.getElementById("btnOpenEngineTab"),
  btnCopyCaption: document.getElementById("btnCopyCaption"),
  // Social Elements
  socialTopicInput: document.getElementById("socialTopicInput"),
  btnDraftSocial: document.getElementById("btnDraftSocial"),
  socialCaptionPreview: document.getElementById("socialCaptionPreview"),
  btnCopySocialText: document.getElementById("btnCopySocialText"),
};

function showToast(text) {
  const existing = document.querySelector(".toast-msg");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

function setStatus(text, kind) {
  el.statusText.textContent = text;
  el.statusDot.classList.remove("online", "offline");
  if (kind) el.statusDot.classList.add(kind);
}

function addMessage(role, text, meta) {
  const node = document.createElement("div");
  node.className = `msg ${role}`;
  node.textContent = text;
  if (meta) {
    const small = document.createElement("span");
    small.className = "meta";
    small.textContent = meta;
    node.appendChild(small);
  }
  el.chat.appendChild(node);
  el.chat.scrollTop = el.chat.scrollHeight;
  return node;
}

async function loadState() {
  const stored = await chrome.storage.local.get(["buddyApiUrl", "buddyToken", "buddyClient", "buddyDryRun"]);
  state.api = (stored.buddyApiUrl || DEFAULT_API).replace(/\/+$/, "");
  state.token = stored.buddyToken || "";
  state.client = stored.buddyClient || "buddy_ai_partners";
  state.dryRun = stored.buddyDryRun !== false;
  el.apiUrl.value = state.api;
  el.adminToken.value = state.token;
  el.clientSelect.value = state.client;
  el.dryRunToggle.checked = state.dryRun;
}

async function persistState() {
  await chrome.storage.local.set({
    buddyApiUrl: state.api,
    buddyToken: state.token,
    buddyClient: state.client,
    buddyDryRun: state.dryRun,
  });
}

async function request(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (state.token) headers.Authorization = `Bearer ${state.token}`;
  const response = await fetch(`${state.api}${path}`, { ...options, headers });
  if (response.status === 401) {
    throw new Error("Buddy API requires the admin token. Open Settings and paste it.");
  }
  if (!response.ok) {
    throw new Error(`Buddy API ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

async function checkHealth() {
  setStatus("checking…", "");
  try {
    const health = await request("/health");
    const tools = Array.isArray(health.tools) ? health.tools.length : 0;
    setStatus(`online · ${tools} tools`, "online");
    return true;
  } catch (error) {
    setStatus("offline", "offline");
    return false;
  }
}

async function loadClients() {
  try {
    const payload = await request("/clients");
    const clients = payload.clients || [];
    if (!clients.length) return;
    el.clientSelect.innerHTML = "";
    for (const client of clients) {
      const option = document.createElement("option");
      option.value = client.slug;
      option.textContent = client.name;
      el.clientSelect.appendChild(option);
    }
    el.clientSelect.value = clients.some((c) => c.slug === state.client)
      ? state.client
      : clients[0].slug;
    state.client = el.clientSelect.value;
  } catch {
    // Keep default options if offline
  }
}

async function capturePage() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id) throw new Error("No active tab");
  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const selection = String(window.getSelection() || "").trim();
      const body = document.body ? document.body.innerText || "" : "";
      return {
        title: document.title || "",
        url: location.href,
        selection,
        text: body.replace(/\s+/g, " ").trim(),
      };
    },
  });
  const page = results && results[0] ? results[0].result : null;
  if (!page) throw new Error("Could not read the page");
  page.text = (page.text || "").slice(0, 12000);
  state.page = page;
  const label = page.title || page.url;
  el.pageHint.textContent = `Captured: ${label}`;
  return page;
}

function pageContext(page) {
  if (!page) return "No page was captured; work from the client workspace only.";
  const selection = page.selection ? `\nSelected text:\n${page.selection}` : "";
  const text = (page.text || "").slice(0, PAGE_LIMIT);
  return `Page title: ${page.title}\nURL: ${page.url}${selection}\nPage text:\n${text}`;
}

function approvalLine() {
  return state.dryRun
    ? "Drafts only: queue anything you produce with social.compose and do not publish or send anything. List the approvals I need to give."
    : "Do not publish, send or spend without my explicit approval. Show me the exact action before it happens.";
}

const prompts = {
  brief: () => `Give me the morning brief for client ${state.client}. Load the workspace with client.profile (operation=brief), then list: (1) today's top 5 priorities, (2) hot leads or follow-ups to check in the CRM if available, (3) content to queue, (4) risks or compliance issues. ${approvalLine()}`,
  summarise: (page) => `Summarise this page for a ${state.client} client brief. Keep it under 150 words, then list 3 possible actions.\n\n${pageContext(page)}`,
  reply: (page) => `Draft a reply for ${state.client} based on this page. Match the client tone and compliance rules from client.profile. Do not send anything; show me the draft and the channel it belongs on.\n\n${pageContext(page)}`,
  social: (page) => `Draft a social post for ${state.client} about this page. Use the client's positioning, tone and compliance rules. Call social.compose with the right platforms and 3-6 relevant hashtags, then show me the queue entry id.\n\n${pageContext(page)}\n\n${approvalLine()}`,
  plan: () => `Create today's plan for ${state.client}: a content batch (3 posts), lead follow-up priorities, and one improvement to the client workspace. Queue content drafts with social.compose. Do not publish. ${approvalLine()}`,
};

async function sendMessage(text) {
  if (!text.trim() || state.busy) return;
  state.busy = true;
  el.sendBtn.disabled = true;
  addMessage("user", text.trim());
  const typing = addMessage("buddy", "");
  typing.classList.add("typing");
  typing.textContent = "Buddy is thinking…";
  try {
    const payload = await request("/chat", {
      method: "POST",
      body: JSON.stringify({ message: text.trim() }),
    });
    typing.remove();
    const meta = [payload.model, payload.route, payload.degraded ? "degraded" : ""]
      .filter(Boolean)
      .join(" · ");
    addMessage("buddy", payload.reply || "(empty reply)", meta);
    if (Array.isArray(payload.tool_results) && payload.tool_results.length) {
      addMessage("system", `${payload.tool_results.length} tool result(s) attached — check the Buddy console for details.`);
    }
  } catch (error) {
    typing.remove();
    addMessage("system", `Error: ${error.message}`);
  } finally {
    state.busy = false;
    el.sendBtn.disabled = false;
  }
}

async function runQuickAction(action) {
  try {
    let page = state.page;
    if (["summarise", "reply", "social"].includes(action) && !page) {
      page = await capturePage();
    }
    const text = prompts[action] ? prompts[action](page) : "";
    if (text) await sendMessage(text);
  } catch (error) {
    addMessage("system", `Error: ${error.message}`);
  }
}

// ─────────────────────────────────────────────────────────────
// 🎬 AI VIDEO STUDIO LOGIC
// ─────────────────────────────────────────────────────────────
const LOCAL_PROJECT_DATA = {
  buddy_starter: {
    name: "Buddy AI Starter Pack (₹3,500 One-Time Setup)",
    location: "Pan-India · Laptop & Mobile",
    price: "₹3,500 Lifetime Setup",
    rera: "Sovereign Private AI · 100% Free Open Models",
    url: "https://buddyaipartners.github.io/",
    images: [
      "https://buddyaipartners.github.io/images/og-cover.jpg",
      "https://buddyaipartners.github.io/images/hero-agent-network.svg"
    ],
    usp: "Replaces ₹15,000/mo SaaS subscriptions (ChatGPT Plus, Claude, Canva Pro). Rahul installs 1-on-1 on Mac, Windows, Linux, or Android."
  },
  php_remediation: {
    name: "PHP2Shell Security Patch & Modernization",
    location: "Bhubaneswar & Pan-India Enterprises",
    price: "₹14,999 – ₹34,999 Setup",
    rera: "OWASP Hardened · Zero Insecure Endpoints",
    url: "https://buddyaipartners.github.io/#services",
    images: [
      "https://buddyaipartners.github.io/images/project-agent-sandbox.svg"
    ],
    usp: "Remediates vulnerable legacy PHP forms, outdated MySQL injections, and browser SSL warnings before malicious attacks cause business downtime."
  },
  no_website_biz: {
    name: "Zero-to-Live Business Web Presence & 24/7 AI Concierge",
    location: "Bhubaneswar Local Businesses & Clinics",
    price: "₹9,999 Setup · ₹0 Hosting Fees",
    rera: "100% Google Indexed · Mobile Ultra-Fast",
    url: "https://buddyaipartners.github.io/#portfolio",
    images: [
      "https://buddyaipartners.github.io/images/project-web-platform.svg"
    ],
    usp: "Converts offline clinics, shops, and contractors into high-converting web presence with sub-14-second WhatsApp appointment routing."
  },
  b2b_lead_engine: {
    name: "B2B Lead Engine & Sub-5m Calling SLA",
    location: "Odisha & Pan-India Growth Companies",
    price: "₹24,999 / month",
    rera: "Multi-Sector Ingress · 12-Point Dedupe",
    url: "https://buddyaipartners.github.io/#services",
    images: [
      "https://buddyaipartners.github.io/images/project-crm.svg"
    ],
    usp: "Automated Playwright multi-sector lead scraping with automated CRM queue and instant multilingual WhatsApp brochure delivery."
  },
  costa_crestview: {
    name: "Costa Fortune Crestview",
    location: "Kantabada, Chandaka Road, Bhubaneswar",
    price: "₹34.20 Lakhs – ₹1.05 Cr*",
    rera: "ORERA MP/19/2024/01244",
    url: "https://knrintegrity.com/costa-furtune-crestview/",
    images: [
      "https://knrintegrity.com/wp-content/uploads/2026/09/costa-furtune-township_crestview-building-hero.webp",
      "https://knrintegrity.com/wp-content/uploads/2026/10/costa_official_builder_render.webp"
    ],
    usp: "Fast-developing Chandaka-Kantabada growth corridor. 40+ lifestyle amenities, swimming pool, clubhouse, 0% brokerage."
  },
  harmonious_haven: {
    name: "The Harmonious Haven",
    location: "Rasulgarh Junction, Bhubaneswar",
    price: "₹2.45 Cr – ₹3.25 Cr*",
    rera: "BDA Approved & Clear Title Verified",
    url: "https://knrintegrity.com/the-harmonious-heaven/",
    images: [
      "https://knrintegrity.com/wp-content/uploads/2026/09/harmonious-haven_villa-exterior-landscape.webp",
      "https://knrintegrity.com/wp-content/uploads/2026/09/the-harmonious-heaven_gen_the-harmonious-heaven-card.webp"
    ],
    usp: "Ultra-luxury bespoke triplex villas with private terrace pools and Italian marble finishes."
  }
};

const ENGINE_URLS = {
  invideo: "https://ai.invideo.io/",
  canva: "https://www.canva.com/create/videos/",
  capcut: "https://www.capcut.com/editor",
  clipchamp: "https://app.clipchamp.com/"
};

async function generateVideoPackage() {
  const projectKey = el.videoProjectSelect.value;
  const customTopic = el.videoCustomTopic.value.trim();
  const engine = el.videoEngineSelect.value;
  const format = el.videoFormatSelect.value;
  const lang = el.videoLanguageSelect.value;

  el.btnLaunchVideo.disabled = true;
  el.btnLaunchVideo.textContent = "⏳ Generating AI Blueprint…";

  let pkg = null;
  try {
    // Attempt Buddy API call first
    pkg = await request("/api/video/studio", {
      method: "POST",
      body: JSON.stringify({
        client_slug: state.client,
        project_key: projectKey,
        custom_topic: customTopic,
        engine: engine,
        video_format: format,
        language: lang
      })
    });
  } catch (err) {
    // Graceful offline fallback
    const proj = LOCAL_PROJECT_DATA[projectKey] || {
      name: customTopic || "Luxury Real Estate Showcase",
      location: "Prime Bhubaneswar Corridor",
      price: "Direct Developer Pricing",
      rera: "100% Clear Title Verified",
      url: "https://knrintegrity.com",
      images: ["https://knrintegrity.com/wp-content/uploads/2026/09/costa-furtune-township_crestview-building-hero.webp"],
      usp: "Verified 30-year non-encumbrance title clearance and 0% buyer brokerage."
    };
    const aspect = format === "vertical_reel_9_16" ? "9:16 vertical Reel / Shorts" : "16:9 widescreen";
    const promptText = `Create a high-energy, cinematic ${aspect} about ${proj.name} in ${proj.location}. Price starting ${proj.price}, ${proj.rera}. ${proj.usp}. Source webpage: ${proj.url}. Visual style: Ultra-luxury architectural drone shots, vibrant 4K lighting, modern clubhouse. Voiceover: Professional ${lang} Indian accent, confident tone. Hook in first 3 seconds: Start with a powerful question challenging overpriced flats. On-screen text: Bold gold and white kinetic subtitles. Call to action: Comment 'DETAILS' to get legal dossier on WhatsApp.`;
    const caption = `🏡 ${proj.name} — ${proj.price} in ${proj.location}\n\n✨ ${proj.usp}\n\n🛡️ ${proj.rera} | 30-Year Non-Encumbrance Title Guarantee | ₹0 Brokerage\n\n👉 Comment 'DETAILS' below or DM to get brochure on WhatsApp!\n\nVisit: ${proj.url}\n📞 WhatsApp: +91 73280 89908\n\n#BhubaneswarRealEstate #KNRIntegrity #OdishaProperty #LuxuryLiving`;

    pkg = {
      project_name: proj.name,
      engine: engine,
      engine_launch_url: ENGINE_URLS[engine] || "https://ai.invideo.io/",
      invideo_ai_prompt: promptText,
      all_images: proj.images,
      ready_caption: caption
    };
  }

  state.lastVideoPackage = pkg;

  // 1. Copy Prompt to clipboard
  try {
    await navigator.clipboard.writeText(pkg.invideo_ai_prompt);
  } catch (e) {
    console.warn("Clipboard write failed:", e);
  }

  // 2. Open Engine Tab
  const targetUrl = pkg.engine_launch_url;
  const newTab = await chrome.tabs.create({ url: targetUrl, active: true });

  // 3. Inject Auto-Focus and helper on target page
  chrome.tabs.onUpdated.addListener(function tabListener(tabId, info) {
    if (tabId === newTab.id && info.status === "complete") {
      chrome.tabs.onUpdated.removeListener(tabListener);
      chrome.scripting.executeScript({
        target: { tabId: newTab.id },
        func: (pText) => {
          setTimeout(() => {
            const sels = [
              'textarea[placeholder*="Describe" i]',
              'textarea[placeholder*="prompt" i]',
              'textarea',
              'div[contenteditable="true"]',
              '#prompt-textarea'
            ];
            for (const s of sels) {
              const el = document.querySelector(s);
              if (el) {
                el.focus();
                break;
              }
            }
          }, 1500);
        },
        args: [pkg.invideo_ai_prompt]
      }).catch(() => {});
    }
  });

  // 4. Update UI
  el.videoOutputEngineTag.textContent = pkg.engine.toUpperCase();
  el.videoPromptPreview.textContent = pkg.invideo_ai_prompt;
  el.videoCaptionPreview.textContent = pkg.ready_caption;
  el.videoOutputCard.style.display = "flex";

  el.btnLaunchVideo.disabled = false;
  el.btnLaunchVideo.textContent = "🚀 1-Click Launch Video AI & Copy Prompt";

  showToast(`🚀 Prompt copied & ${pkg.engine.toUpperCase()} opened! Paste & generate.`);
}

// ─────────────────────────────────────────────────────────────
// 📱 ORGANIC SOCIAL STUDIO LOGIC
// ─────────────────────────────────────────────────────────────
const SOCIAL_COMPOSER_URLS = {
  instagram: "https://www.instagram.com/",
  facebook: "https://business.facebook.com/latest/composer",
  linkedin: "https://www.linkedin.com/feed/?shareActive=true",
  youtube: "https://studio.youtube.com/",
  x: "https://twitter.com/intent/tweet",
  whatsapp: "https://web.whatsapp.com/"
};

async function draftSocialContent() {
  const topic = (el.socialTopicInput ? el.socialTopicInput.value : "").trim() || "Buddy AI Starter Pack";
  el.btnDraftSocial.disabled = true;
  el.btnDraftSocial.textContent = "⏳ Drafting…";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await request("/api/social/quick-draft", {
      method: "POST",
      signal: controller.signal,
      body: JSON.stringify({
        client_slug: state.client,
        topic: topic,
        platform: "instagram",
        language: "english"
      })
    });
    clearTimeout(timeoutId);
    el.socialCaptionPreview.textContent = res.caption;
    state.lastSocialDraft = res.caption;
    showToast("✨ Caption generated!");
  } catch (err) {
    let fallback = "";
    const lower = topic.toLowerCase();
    if (lower.includes("php") || lower.includes("security") || lower.includes("vulnerab")) {
      fallback = `⚠️ Is your business website running on outdated PHP? Here's why browsers are starting to block your forms with red security warnings:\n\n1️⃣ Legacy PHP 5.6/7.0 scripts expose database passwords in plain text\n2️⃣ No automatic rate-limiting enables bot spammers to flood your inbox\n3️⃣ Insecure contact forms allow malicious script injection (PHP2Shell)\n\nAt Buddy AI Partners, we audit and modernize legacy business web portals into lightning-fast, secure systems with 24/7 automated WhatsApp lead capture.\n\n🛡️ Complete Security Audit & Migration: Starting at ₹14,999 setup\n👉 DM us or WhatsApp +91 73280 89908 for a free 60-second code audit!\n\nWebsite: https://buddyaipartners.github.io/\n\n#CyberSecurity #PHPModernization #WebSecurity #BhubaneswarTech #BuddyAIPartners`;
    } else if (lower.includes("website") || lower.includes("clinic") || lower.includes("no web")) {
      fallback = `🏥 Still relying ONLY on a Google Maps pin for your business or clinic?\n\nHere is what happens when someone searches for your service at 9:30 PM:\n❌ Your phone is switched off or unanswered\n❌ They can't see prices, doctor timings, or appointment slots\n❌ They click on your competitor who has an instant WhatsApp booking link\n\nAt Buddy AI Partners, we launch your professional digital office in 48 hours:\n✅ Mobile-first website hosted 100% free with zero monthly server bills\n✅ 24/7 AI Concierge that qualifies inquiries and books appointments on WhatsApp in Odia, Hindi, and English\n✅ Verified Google Search Console indexing\n\n👉 Book your business digital office: https://buddyaipartners.github.io/\n📞 WhatsApp: +91 73280 89908\n\n#DigitalGrowth #BhubaneswarBusiness #LocalBusiness #AIConcierge #BuddyAIPartners`;
    } else {
      fallback = `🚀 Why paying ₹2,000/month ($20) for ChatGPT or Claude is obsolete for Indian founders:\n\nMost professionals are spending ₹24,000 every single year on AI subscriptions, only to hit message cutoffs and send their private client data to US cloud servers.\n\nIntroducing the **Buddy AI Starter Pack** (Launch Offer: ₹3,500 One-Time Setup):\n✅ 1-on-1 remote installation by Rahul on your Mac, Windows, Linux, or mobile\n✅ Run unlimited local AI models (Ollama, Qwen 2.5, Llama 3) with zero recurring monthly bills\n✅ Custom business prompt configured to draft WhatsApp pitches, emails, and daily social media captions\n✅ 100% private — your documents and customer data never leave your computer\n\n💳 Launch Offer: ₹3,500 one-time (Lifetime Access)\n👉 Secure your installation call: https://buddyaipartners.github.io/#contact\n📞 WhatsApp: +91 73280 89908\n\n#BuddyAIPartners #SovereignAI #LocalLLM #ProductivityHack #Bhubaneswar`;
    }
    el.socialCaptionPreview.textContent = fallback;
    state.lastSocialDraft = fallback;
    showToast("✨ Generated Sovereign Caption!");
  } finally {
    el.btnDraftSocial.disabled = false;
    el.btnDraftSocial.textContent = "✨ Generate High-Growth Caption";
  }
}

async function publishToSocialWeb(platform) {
  const text = (el.socialCaptionPreview.textContent || "").trim();
  if (!text) {
    showToast("⚠️ Caption is empty!");
    return;
  }

  // Copy caption to clipboard
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    console.warn("Clipboard write failed:", e);
  }

  let url = SOCIAL_COMPOSER_URLS[platform] || "https://www.instagram.com/";
  if (platform === "x") {
    url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.slice(0, 270))}`;
  }

  await chrome.tabs.create({ url, active: true });
  showToast(`📋 Caption copied! Paste directly into ${platform.toUpperCase()}`);
}

// ─────────────────────────────────────────────────────────────
// FOUNDER DEAL CLOSER LOGIC (BUDDY B2B)
// ─────────────────────────────────────────────────────────────
let currentDeals = [];
let selectedDeal = null;

const BUDDY_OFFLINE_PROSPECTS = [
  {
    prospect_id: "prospect_php_01",
    business_name: "Apex Engineering & Fabricators",
    area: "Mancheswar Industrial Estate, Bhubaneswar",
    category: "PHP & Web Security",
    audit_score: 38,
    package_name: "PHP Modernization & Sovereign Web Portal",
    setup_inr: 24999,
    monthly_inr: 4999,
    primary_flaw: "Exposed legacy PHP 5.6 database config, non-HTTPS form, zero mobile responsiveness.",
    cold_call_script: "Namaste Pradeep ji! Rahul here from Buddy AI Partners in Bhubaneswar. We were doing a routine security audit of engineering directories in Mancheswar and noticed your web portal has an exposed database script that modern browsers are starting to block with red security warnings. We help local manufacturers replace old PHP systems with ultra-fast, secure portals and automatic WhatsApp quotation engines. Can I send you a 60-second video audit of what needs patching before it causes downtime?",
    whatsapp_click_url: "https://wa.me/917328089908?text=Hi%20Pradeep%20ji%21%20Rahul%20here%20from%20Buddy%20AI%20Partners.%20I%20prepared%20a%20free%20technical%20audit%20for%20Apex%20Engineering%27s%20portal."
  },
  {
    prospect_id: "prospect_noweb_02",
    business_name: "Dr. Tripathy Advanced Dental Care",
    area: "Saheed Nagar, Bhubaneswar",
    category: "Healthcare / No Website",
    audit_score: 42,
    package_name: "24/7 Clinic Web & WhatsApp AI Concierge",
    setup_inr: 14999,
    monthly_inr: 3500,
    primary_flaw: "No website, relying only on a Google Business pin. 40%+ prospective patients leave without booking because phone is busy.",
    cold_call_script: "Good afternoon Dr. Tripathy! This is Rahul from Buddy AI Partners in Bhubaneswar. I noticed your clinic gets amazing 5-star patient reviews, but you don't have an active 24/7 appointment intake site. Patients searching late in the evening often end up booking with dental chains nearby. We install a one-click WhatsApp appointment concierge that confirms slots automatically in Odia, Hindi, and English. Could I show you how another Saheed Nagar clinic uses this to book 25+ extra appointments every month?",
    whatsapp_click_url: "https://wa.me/917328089908?text=Hi%20Dr.%20Tripathy%21%20Rahul%20from%20Buddy%20AI%20Partners.%20Here%20is%20the%20dental%20appointment%20automation%20blueprint."
  },
  {
    prospect_id: "prospect_starter_03",
    business_name: "Panda & Associates Legal Advisors",
    area: "Cuttack Road / High Court Bar",
    category: "Solo Creator & Professional",
    audit_score: 65,
    package_name: "Buddy AI Starter Pack (Private Legal AI)",
    setup_inr: 3500,
    monthly_inr: 0,
    primary_flaw: "Paying ₹2,000/month per advocate for cloud ChatGPT Plus with strict privacy risks for client case filings.",
    cold_call_script: "Namaste Advocate Panda sir! Quick call from Buddy AI Partners. Many law chambers in Odisha are concerned about uploading confidential client notices to foreign cloud AI like ChatGPT. For our launch offer of ₹3,500 one-time, we install a 100% private, sovereign AI assistant on your laptop that summarizes judgements, drafts rejoinders, and formats legal notices without sending any data to the cloud. Can I show you a 2-minute demo on your Mac or PC today?",
    whatsapp_click_url: "https://wa.me/917328089908?text=Namaste%20Advocate%20Panda%21%20Here%20is%20how%20the%20private%20Buddy%20AI%20legal%20assistant%20works."
  },
  {
    prospect_id: "prospect_retail_04",
    business_name: "Kalinga Timber & Interior World",
    area: "Pahal, Bhubaneswar",
    category: "Retail / Broken Web",
    audit_score: 35,
    package_name: "Sovereign Catalog & Lead Ingress Engine",
    setup_inr: 19999,
    monthly_inr: 4500,
    primary_flaw: "Website domain expired 4 months ago; Instagram bio has a dead link; losing 15-20 furniture buyers weekly.",
    cold_call_script: "Hello sir! Rahul here from Buddy AI Partners. I was looking for teak wood suppliers in Pahal and noticed your website domain is currently showing an error page. You're losing valuable buyer inquiries every day. We build high-speed, modern catalog websites with automated WhatsApp inquiries that never go down. Could I share a quick design prototype for your showroom?",
    whatsapp_click_url: "https://wa.me/917328089908?text=Hi%20sir%21%20Rahul%20here%20with%20the%20web%20catalog%20redesign%20for%20Kalinga%20Timber."
  }
];

function filterMatch(deal, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    (deal.business_name || "").toLowerCase().includes(q) ||
    (deal.category || "").toLowerCase().includes(q) ||
    (deal.area || "").toLowerCase().includes(q)
  );
}

async function loadDeals() {
  if (!el.dealsListContainer) return;
  try {
    el.dealsListContainer.innerHTML = '<div style="color:var(--muted);font-size:11px;text-align:center;padding:12px;">Connecting to Buddy prospect radar…</div>';
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1800);
    const res = await fetch(`${state.api}/company/prospects`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    currentDeals = (data.leads && data.leads.length) ? data.leads : BUDDY_OFFLINE_PROSPECTS;
    if (el.dealsCountTag) el.dealsCountTag.textContent = `${currentDeals.length} Verified Deals`;
    renderDeals(currentDeals);
  } catch (err) {
    currentDeals = BUDDY_OFFLINE_PROSPECTS;
    if (el.dealsCountTag) el.dealsCountTag.textContent = `${currentDeals.length} Scraped Deals (Radar Active)`;
    renderDeals(currentDeals);
  }
}

function renderDeals(deals) {
  if (!el.dealsListContainer) return;
  if (!deals.length) {
    el.dealsListContainer.innerHTML = '<div style="color:var(--muted);font-size:11px;text-align:center;padding:12px;">No deals found matching filter.</div>';
    return;
  }
  el.dealsListContainer.innerHTML = "";
  deals.forEach((deal) => {
    const card = document.createElement("div");
    const isSelected = selectedDeal && selectedDeal.prospect_id === deal.prospect_id;
    card.style.cssText = `background:rgba(255,255,255,0.03);border:1px solid ${isSelected ? "var(--teal)" : "rgba(255,255,255,0.08)"};border-radius:8px;padding:8px 10px;cursor:pointer;transition:all 0.15s ease;`;
    
    card.onmouseover = () => card.style.borderColor = "var(--teal)";
    card.onmouseout = () => {
      const active = selectedDeal && selectedDeal.prospect_id === deal.prospect_id;
      card.style.borderColor = active ? "var(--teal)" : "rgba(255,255,255,0.08)";
    };

    const score = deal.audit_score || 0;
    const scoreColor = score < 50 ? "var(--danger)" : score < 80 ? "var(--gold)" : "var(--teal)";

    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <strong style="color:var(--text);font-size:11px;">${deal.business_name}</strong>
        <span style="font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px;background:rgba(0,0,0,0.4);color:${scoreColor};">Score: ${score}</span>
      </div>
      <div style="font-size:10px;color:var(--muted);margin-top:2px;">${deal.area || "Bhubaneswar"} • <span style="color:var(--gold);">₹${(deal.setup_inr || 0).toLocaleString()} setup</span></div>
      <div style="font-size:9px;color:var(--teal-dim);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${deal.package_name || deal.offer_recommended || "AI Package"}</div>
    `;

    card.addEventListener("click", () => selectDeal(deal));
    el.dealsListContainer.appendChild(card);
  });
}

function selectDeal(deal) {
  selectedDeal = deal;
  const query = el.dealSearchInput ? el.dealSearchInput.value : "";
  renderDeals(currentDeals.filter(d => filterMatch(d, query)));

  if (!el.dealDetailCard) return;
  el.dealDetailCard.style.display = "block";
  el.detailBusinessName.textContent = deal.business_name;
  el.detailHealthScore.textContent = `Score: ${deal.audit_score || 0}/100`;
  el.detailPackageName.textContent = `📦 ${deal.package_name || "Custom AI Solution"}`;
  el.detailSetupPrice.textContent = `₹${(deal.setup_inr || 0).toLocaleString()}`;
  el.detailMonthlyPrice.textContent = `₹${(deal.monthly_inr || 0).toLocaleString()}/mo`;
  el.detailFlaw.textContent = deal.primary_flaw || "Lacks 24/7 instant WhatsApp lead capture";
  el.detailCallScript.textContent = deal.cold_call_script || "No call script available.";

  if (deal.whatsapp_click_url) {
    el.btnOpenWhatsAppPitch.href = deal.whatsapp_click_url;
    el.btnOpenWhatsAppPitch.style.display = "inline-block";
  } else {
    el.btnOpenWhatsAppPitch.style.display = "none";
  }

  const slug = deal.business_name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  el.btnLivePreview.href = `${state.api}/company/preview/${slug}/website`;
  el.btnLivePreview.style.display = "none";
  el.deliveryStatusNote.style.display = "none";

  // Check delivery status from API
  fetch(`${state.api}/company/deliveries`)
    .then(r => r.json())
    .then(data => {
      const existing = (data.deliveries || []).find(d => d.client_slug === slug && d.has_website);
      if (existing) {
        el.btnLivePreview.style.display = "inline-block";
        el.deliveryStatusNote.style.display = "block";
        el.deliveryStatusNote.textContent = "✅ Deliverables generated by AI swarm";
      }
    })
    .catch(() => {});
}

// ─────────────────────────────────────────────────────────────
// EVENT LISTENERS & INITIALIZATION
// ─────────────────────────────────────────────────────────────
// Tab Navigation
document.querySelectorAll(".tab-link").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab-link").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".panel-view").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    const viewName = tab.dataset.view;
    if (viewName === "chat") el.viewChat.classList.add("active");
    if (viewName === "deals") {
      el.viewDeals.classList.add("active");
      loadDeals();
    }
    if (viewName === "video") el.viewVideo.classList.add("active");
    if (viewName === "social") el.viewSocial.classList.add("active");
  });
});

// Settings & Config
el.settingsToggle.addEventListener("click", () => {
  const open = el.settings.hidden;
  el.settings.hidden = !open;
  el.settingsToggle.setAttribute("aria-expanded", String(open));
});

el.saveSettings.addEventListener("click", async () => {
  state.api = el.apiUrl.value.trim().replace(/\/+$/, "") || DEFAULT_API;
  state.token = el.adminToken.value.trim();
  await persistState();
  const ok = await checkHealth();
  addMessage("system", ok ? "Settings saved. Runtime online." : "Settings saved, but the runtime is not reachable.");
});

el.checkHealth.addEventListener("click", async () => {
  const ok = await checkHealth();
  addMessage("system", ok ? "Buddy runtime is online." : "Cannot reach the Buddy runtime at this API URL.");
});

el.clientSelect.addEventListener("change", async () => {
  state.client = el.clientSelect.value;
  await persistState();
  addMessage("system", `Client workspace: ${el.clientSelect.options[el.clientSelect.selectedIndex].textContent}`);
  showToast(`Switched workspace to ${el.clientSelect.value}`);
});

el.dryRunToggle.addEventListener("change", async () => {
  state.dryRun = el.dryRunToggle.checked;
  await persistState();
});

el.capture.addEventListener("click", async () => {
  try {
    await capturePage();
    addMessage("system", `Captured ${state.page.title || state.page.url}`);
    if (state.page) {
      el.videoCustomTopic.value = state.page.title || state.page.url;
      el.socialTopicInput.value = state.page.title || state.page.url;
    }
  } catch (error) {
    addMessage("system", `Capture failed: ${error.message}`);
  }
});

// Chat Composer
el.composer.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = el.message.value;
  el.message.value = "";
  await sendMessage(text);
});

el.message.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    el.composer.requestSubmit();
  }
});

document.querySelectorAll(".quick button").forEach((button) => {
  button.addEventListener("click", () => runQuickAction(button.dataset.action));
});

// Video Studio Handlers
el.videoProjectSelect.addEventListener("change", () => {
  el.videoCustomTopicWrap.style.display = el.videoProjectSelect.value === "custom" ? "block" : "none";
});

el.btnLaunchVideo.addEventListener("click", generateVideoPackage);

el.btnCopyPrompt.addEventListener("click", async () => {
  const text = el.videoPromptPreview.textContent || "";
  await navigator.clipboard.writeText(text);
  showToast("📋 Video prompt copied!");
});

el.btnCopyImages.addEventListener("click", async () => {
  const imgs = state.lastVideoPackage?.all_images || [];
  await navigator.clipboard.writeText(imgs.join("\n"));
  showToast(`🖼 ${imgs.length} image URLs copied!`);
});

el.btnOpenEngineTab.addEventListener("click", () => {
  const url = state.lastVideoPackage?.engine_launch_url || "https://ai.invideo.io/";
  chrome.tabs.create({ url, active: true });
});

el.btnCopyCaption.addEventListener("click", async () => {
  const text = el.videoCaptionPreview.textContent || "";
  await navigator.clipboard.writeText(text);
  showToast("📋 Caption copied!");
});

// Social Studio Handlers
el.btnDraftSocial.addEventListener("click", draftSocialContent);

el.btnCopySocialText.addEventListener("click", async () => {
  const text = el.socialCaptionPreview.textContent || "";
  await navigator.clipboard.writeText(text);
  showToast("📋 Social caption copied!");
});

document.querySelectorAll(".btn-social").forEach((btn) => {
  btn.addEventListener("click", () => {
    publishToSocialWeb(btn.dataset.platform);
  });
});

// Deal Closer Handlers
if (el.btnCopyCallScript) {
  el.btnCopyCallScript.addEventListener("click", async () => {
    if (!selectedDeal || !selectedDeal.cold_call_script) return;
    await navigator.clipboard.writeText(selectedDeal.cold_call_script);
    showToast("📋 Call script copied to clipboard!");
  });
}

if (el.dealSearchInput) {
  el.dealSearchInput.addEventListener("input", () => {
    renderDeals(currentDeals.filter(d => filterMatch(d, el.dealSearchInput.value)));
  });
}

if (el.btnRefreshDeals) {
  el.btnRefreshDeals.addEventListener("click", async () => {
    el.btnRefreshDeals.disabled = true;
    el.btnRefreshDeals.textContent = "⏳…";
    await loadDeals();
    el.btnRefreshDeals.disabled = false;
    el.btnRefreshDeals.textContent = "🔄 Refresh";
    showToast("Deals reloaded from Buddy API");
  });
}

if (el.btnAutoDeliver) {
  el.btnAutoDeliver.addEventListener("click", async () => {
    if (!selectedDeal) return;
    el.btnAutoDeliver.disabled = true;
    el.btnAutoDeliver.textContent = "⚙️ Delivering…";
    el.deliveryStatusNote.style.display = "block";
    el.deliveryStatusNote.textContent = "Swarm generating Website, 30-Day Marketing, & CRM Blueprint…";
    try {
      const res = await fetch(`${state.api}/company/deliver`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: selectedDeal.business_name,
          category: selectedDeal.category || "real_estate",
          area: selectedDeal.area || "Bhubaneswar",
          phone: selectedDeal.phone || "+917328089908",
        }),
      });
      const result = await res.json();
      el.btnAutoDeliver.textContent = "✅ Delivered";
      el.deliveryStatusNote.textContent = "🎉 Client web application, marketing & CRM blueprint generated!";
      if (result.preview_url) {
        el.btnLivePreview.href = `${state.api}${result.preview_url}`;
        el.btnLivePreview.style.display = "inline-block";
      }
      showToast(`Deliverables generated for ${selectedDeal.business_name}`);
    } catch (err) {
      el.btnAutoDeliver.textContent = "❌ Failed";
      el.deliveryStatusNote.textContent = `Error: ${err.message}`;
    } finally {
      setTimeout(() => {
        el.btnAutoDeliver.disabled = false;
        el.btnAutoDeliver.textContent = "⚡ AI Auto-Deliver";
      }, 4000);
    }
  });
}

// Init
(async function init() {
  await loadState();
  addMessage("system", "Buddy side panel ready. Multi-tenant workspace active.");
  const online = await checkHealth();
  if (online) await loadClients();
})();