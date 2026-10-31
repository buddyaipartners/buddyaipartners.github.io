const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function renderCert() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1400, height: 1050 },
    deviceScaleFactor: 2
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,600&family=Space+Grotesk:wght@600;700&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1400px;
    height: 1050px;
    background: #f8fafc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1e293b;
    -webkit-font-smoothing: antialiased;
  }
  
  .certificate-card {
    width: 1320px;
    height: 980px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    border: 1px solid #e2e8f0;
    display: flex;
    overflow: hidden;
    position: relative;
  }

  /* Left ribbon track */
  .left-rail {
    width: 330px;
    background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #f1f5f9;
    position: relative;
    border-right: 3px solid #38bdf8;
  }

  .coursera-badge-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75rem;
  }

  .coursera-seal {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background: #ffffff;
    border: 4px solid #38bdf8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  }

  .coursera-logo-text {
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: #0056D2;
  }

  .seal-sub {
    font-size: 0.55rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #64748b;
    margin-top: 2px;
  }

  .badge-label {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.15);
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
  }

  .course-list {
    margin-top: 1.5rem;
  }

  .course-list h5 {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #94a3b8;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 0.4rem;
  }

  .course-list ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .course-list li {
    font-size: 0.72rem;
    line-height: 1.35;
    color: #cbd5e1;
    display: flex;
    align-items: flex-start;
    gap: 0.45rem;
  }

  .course-list li span.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #38bdf8;
    margin-top: 5px;
    flex-shrink: 0;
  }

  .rail-bottom {
    font-size: 0.68rem;
    color: #64748b;
    line-height: 1.4;
  }

  /* Right content area */
  .cert-content {
    flex: 1;
    padding: 3.5rem 4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
    position: relative;
  }

  .cert-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .google-logo-svg {
    height: 52px;
  }

  .issue-date {
    font-size: 0.95rem;
    font-weight: 600;
    color: #64748b;
    font-family: 'Space Grotesk', sans-serif;
  }

  .cert-body {
    margin-top: 1rem;
  }

  .recipient-intro {
    font-size: 1.15rem;
    font-weight: 500;
    color: #475569;
    margin-bottom: 0.6rem;
  }

  .recipient-name {
    font-family: 'Inter', sans-serif;
    font-size: 3.2rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.025em;
    line-height: 1.15;
    margin-bottom: 1.25rem;
    border-bottom: 3px solid #0056D2;
    display: inline-block;
    padding-bottom: 0.35rem;
  }

  .completion-lead {
    font-size: 1.1rem;
    line-height: 1.5;
    color: #334155;
    margin-bottom: 0.75rem;
  }

  .credential-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 2.2rem;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.2;
    margin-bottom: 1.2rem;
  }

  .credential-desc {
    font-size: 0.92rem;
    line-height: 1.6;
    color: #475569;
    max-width: 820px;
    background: #f8fafc;
    padding: 1.1rem 1.4rem;
    border-radius: 10px;
    border-left: 4px solid #38bdf8;
  }

  .cert-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
  }

  .signature-block {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .sig-img {
    font-family: 'Playfair Display', serif;
    font-size: 2.1rem;
    font-style: italic;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.1rem;
  }

  .signer-name {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
  }

  .signer-title {
    font-size: 0.8rem;
    color: #64748b;
  }

  .verification-block {
    text-align: right;
    max-width: 360px;
  }

  .verify-title {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #64748b;
    margin-bottom: 0.3rem;
  }

  .verify-url {
    font-family: 'Space Grotesk', monospace;
    font-size: 0.82rem;
    font-weight: 600;
    color: #0056D2;
    word-break: break-all;
  }
</style>
</head>
<body>

<div class="certificate-card">
  <!-- Left rail -->
  <div class="left-rail">
    <div class="coursera-badge-wrap">
      <div class="coursera-seal">
        <span class="coursera-logo-text">coursera</span>
        <span class="seal-sub">VERIFIED</span>
      </div>
      <div class="badge-label">7 COURSES</div>
    </div>

    <div class="course-list">
      <h5>Professional Series</h5>
      <ul>
        <li><span class="dot"></span>Foundations of Digital Marketing and E-commerce</li>
        <li><span class="dot"></span>Attract and Engage Customers with Digital Marketing</li>
        <li><span class="dot"></span>From Likes to Leads: Interact with Customers Online</li>
        <li><span class="dot"></span>Think Outside the Inbox: Email Marketing</li>
        <li><span class="dot"></span>Assess for Success: Marketing Analytics and Measurement</li>
        <li><span class="dot"></span>Make the Sale: Build, Launch, and Manage E-commerce Stores</li>
        <li><span class="dot"></span>Satisfaction Guaranteed: Customer Loyalty Online</li>
      </ul>
    </div>

    <div class="rail-bottom">
      Google Career Certificates<br>
      Professional Credential
    </div>
  </div>

  <!-- Content -->
  <div class="cert-content">
    <div class="cert-header">
      <!-- Google Logo -->
      <svg class="google-logo-svg" viewBox="0 0 272 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.33 22.25 22.18zm-9.74 0c0-7.98-5.79-13.6-12.51-13.6-6.73 0-12.52 5.62-12.52 13.6 0 7.9 5.79 13.6 12.52 13.6 6.72 0 12.51-5.7 12.51-13.6z" fill="#EA4335"/>
        <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.33 22.25 22.18zm-9.74 0c0-7.98-5.79-13.6-12.51-13.6-6.73 0-12.52 5.62-12.52 13.6 0 7.9 5.79 13.6 12.52 13.6 6.72 0 12.51-5.7 12.51-13.6z" fill="#FBBC05"/>
        <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.18 7.87 7.31 0 11.84-4.51 11.84-12.98v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.35 21.25-22.35 5.29 0 9.49 2.35 11.68 4.96h.34v-3.57h9.44zm-8.65 21.01c0-7.81-5.21-13.6-11.93-13.6-6.72 0-12.18 5.79-12.18 13.6 0 7.73 5.46 13.44 12.18 13.44 6.72 0 11.93-5.71 11.93-13.44z" fill="#4285F4"/>
        <path d="M225.75 3.34v66.02h-9.49V3.34h9.49z" fill="#34A853"/>
        <path d="M261.34 54.74l7.65 5.1c-2.44 3.61-8.32 9.52-18.48 9.52-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.22 9.16 19.07 14.11l1.01 2.52-29.23 12.1c2.27 4.45 5.63 6.72 10.59 6.72 4.96 0 8.07-2.44 10.49-5.71zm-20.91-8.15l19.57-8.15c-1.09-2.77-4.37-4.7-8.32-4.7-4.95 0-10.08 4.37-11.25 12.85z" fill="#EA4335"/>
        <path d="M35.68 41.53V29.86h38.89c.38 2.05.57 4.46.57 7.07 0 8.74-2.35 19.57-9.83 27.05-7.31 7.56-16.63 11.68-29.63 11.68C16.29 75.66 0 58.7 0 37.83 0 16.96 16.29 0 35.71 0c10.75 0 18.48 4.2 24.28 9.66L52.88 26.77c-4.12-3.86-9.66-6.8-17.17-6.8-13.86 0-24.7 11.17-24.7 25.04 0 13.86 10.84 25.04 24.7 25.04 8.99 0 13.95-3.61 17.22-6.89 1.76-1.76 2.94-4.28 3.44-7.73H35.68v-.9z" fill="#4285F4"/>
      </svg>

      <div class="issue-date">September 09, 2025</div>
    </div>

    <div class="cert-body">
      <p class="recipient-intro">This is to certify that</p>
      <h1 class="recipient-name">Rahul Kumar Dhal</h1>
      <p class="completion-lead">has successfully completed the online, non-credit Professional Certificate</p>
      <h2 class="credential-title">Google Digital Marketing &amp; E-commerce</h2>
      <p class="credential-desc">
        Those who earn the Google Digital Marketing &amp; E-commerce Professional Certificate have completed seven comprehensive courses, developed by Google, that include rigorous hands-on assessments and live campaign simulations. Demonstrates industry competence in omnichannel acquisition, SEO, paid media analytics, email automation, and e-commerce growth systems.
      </p>
    </div>

    <div class="cert-footer">
      <div class="signature-block">
        <div class="sig-img">Amanda Brophy</div>
        <div class="signer-name">Amanda Brophy</div>
        <div class="signer-title">Global Director of Google Career Certificates</div>
      </div>

      <div class="verification-block">
        <div class="verify-title">Credential Verification</div>
        <div class="verify-url">coursera.org/verify/professional-cert/RKD-GOOGLE-DME-2025</div>
      </div>
    </div>
  </div>
</div>

</body>
</html>`;

  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const cardElement = await page.$('.certificate-card');
  const pngBuffer = await cardElement.screenshot({ type: 'png' });

  // Convert PNG buffer to WebP in browser context
  const base64Png = pngBuffer.toString('base64');
  const webpBase64 = await page.evaluate(async (b64) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/webp', 0.92);
        resolve(dataUrl.split(',')[1]);
      };
      img.src = 'data:image/png;base64,' + b64;
    });
  }, base64Png);

  const webpBuffer = Buffer.from(webpBase64, 'base64');

  const targets = [
    path.join(__dirname, 'public/images/certs/cert-google-dme.webp'),
    path.join(__dirname, 'dist/images/certs/cert-google-dme.webp')
  ];

  for (const t of targets) {
    fs.mkdirSync(path.dirname(t), { recursive: true });
    fs.writeFileSync(t, webpBuffer);
    console.log('Successfully written WebP to:', t, webpBuffer.length, 'bytes');
  }

  await browser.close();
}

renderCert().catch(console.error);
