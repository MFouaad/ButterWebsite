# Handoff: Butter Films company website (state as of 2 Nov 2026)

Owner: Mohamed Fouad (Finance Manager, Butter Films). Talk to him in short Egyptian Arabic; keep English technical/accounting terms. The website itself is **English only** (his decision).

## What this is
A single-file static website for Butter Films (advertising/production house, Cairo) plus a "Team login" page that links to internal apps. Built in this chat, nothing else exists yet (no hosting, no repo).

## Where things are
- **The site (deliverable):** `D:\Work\Fun Drama\BUTTER FILMS\07 - Apps\Website\index.html` (~497 KB, single file, no build step).
- Logos (17 brands) and artist photos (9) are embedded as base64 inside `BRAND_LOGOS` and `ARTIST_PHOTOS` JS arrays; the Butter logo is the `LOGO` constant. Those lines are huge, so don't print them. Edit around them.
- A private preview was published as a claude.ai artifact: https://claude.ai/artifact/PYirVWBngW9SxxE2cBHrMj (v4). The local index.html is the source of truth now.
- **Content source:** `06 - Projects\ABE\05 Documents\Sent to client\BUTTER - COMPANY OVERVIEW Redesign.pdf` (company deck; also an older `BUTTER - COMPANY OVERVIEW.pdf`). Logos/photos were extracted from pages 21 (brands) and 22 (artists) with `pdfimages`. Brand logos in the deck are unlabeled images; the order matches the brand list on the deck.
- Other branding: `00 - Admin & Access\Branding\` and `07 - Apps\Mizan\logos\butter-logo.png` (the logo used).

## How the page is built
- Sections: hero (yellow slab + running timecode), About, Services (Spread / Carry / Melt / Enrich), Signature work (3 Vimeo links), Clients + collaborators (brand logos, artist photos), Team (4 people), Core values, Contact (email, 2 phones, Instagram, Vimeo, address, brief form), footer.
- `#team` hash toggles a Team-only view listing internal apps (Fund Requests -> requests.butterfilms.co, Quotations "soon", Finance desk "office PC", company mail, shared drive). **Not password-protected**; each app has its own login.
- All copy lives in the `CONTENT` object (contact, works, brands, artists, crew, apps) and the `T.en` object (texts). Render functions: `render()`, `route()`.
- Design: black `#111010` + butter yellow `#FFD800`, Rubik (display/body) + IBM Plex Mono (labels), Google Fonts only, single dark look, responsive, `prefers-reduced-motion` respected.
- Leftovers from the removed Arabic version: some `[dir=rtl]` CSS and `ar ? ... : ...` branches in `render()`. Harmless, can be cleaned.

## Facts used (from the deck)
- Founders: Omar Hamdy, Mahmoud Derbala. Crew: Shereen Moussa (Producer), Omar Pasha (Line Producer). Emails like omar@, derbala@, shereen@, pasha@butterfilms.co.
- Contact: info@butterfilms.co, +20 100 199 2777, +20 100 351 1018, instagram.com/butter__films, vimeo.com/wearebutter. Address: 5 Shagret El Dor St., 5th Floor, Apt. 21, Zamalek, Cairo. Footer says "Brother Butter Production" (legal entity).
- Works: Doritos (vimeo.com/1023237958), Amir Eid music video (vimeo.com/986685190), Ministry of Sports KSA "The Perfect Formula is Just Do It" (vimeo.com/1041413740).

## Open items
1. **Hosting not decided/done.** Suggested: Cloudflare Pages (free), same Cloudflare account as the Fund Requests Worker (`butter-requests.mfouad-cc3.workers.dev`, D1 + KV, planned at requests.butterfilms.co).
2. **Domain `butterfilms.co`:** WHOIS (whois.com, 2 Nov): registered 2023-10-23, **expires 2027-10-23**, registrar Key-Systems GmbH, nameservers Google (`ns-cloud-a1..a4.googledomains.com`), transfer/delete locked. Mohamed is **Google Workspace admin** and the domain shows as Primary + Verified in admin.google.com > Domains > Manage domains. Next: open View details > Advanced DNS settings and check Auto-renew/billing. Admin console also shows an "improve email delivery" banner = SPF/DKIM/DMARC incomplete (needed before the Fund Requests app sends mail; planned sender via Resend).
   - Assumption to verify: a custom domain on Cloudflare Pages for the apex needs either moving DNS to Cloudflare (nameserver change; keep the Google MX records) or using `www.`/a subdomain via CNAME. Check what Google's DNS UI allows before choosing.
3. **Work cards have no thumbnails** (client name over a pattern). Need an image per film (Vimeo thumbs can't be fetched from the cloud sandbox; Mohamed or Claude Code on his PC can download them).
4. **Brief form is not connected** (shows "please email us"). Options: Cloudflare Worker + Resend, after the domain's email DNS is fixed.
5. **Client names** are shown as logos only; brand names are in `alt`/`title`.
6. Arabic version was requested then dropped; don't re-add unless asked.
7. Team page has no real auth; if it must be private, put it behind Cloudflare Access or move it into the Fund Requests app.
8. Confirm with Mohamed: public mailbox info@butterfilms.co exists, and that publishing the 9 artist photos and the team emails is approved.

## Related Butter Films apps (context only)
Fund Requests (Cloudflare Worker, requests.butterfilms.co), ETA Invoices, Mizan, Sakk (cheques), treasury program; all under `07 - Apps` or in the Butter Films Claude Project docs. Available skills for those: app-mastermind (Payment Request), app-invoices.
