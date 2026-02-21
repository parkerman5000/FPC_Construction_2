# FPC Construction Site Fixes — Changelog

**Date:** 2026-02-20
**Branch:** fix/site-fixes-elevenlabs-embed
**Site:** fpcconstructions.com (static HTML, GitHub Pages)

---

## Files Modified

### `assets/css/styles.css`

| Change | Why |
|--------|-----|
| Added `image-orientation: from-image` on `img` elements | Fixes EXIF rotation for mobile-uploaded photos — browsers now auto-rotate |
| Added `.img-broken` CSS class with `#1a1a2e` branded fallback | Shows "Photo coming soon" instead of broken image icon |
| Added mobile form fixes (`@media max-width: 767px`) | 16px font-size prevents iOS zoom, 44px+ min-height for touch targets |
| Reduced `.hero__overlay` alpha from 0.9/0.95 to 0.4/0.45 | Background photo now clearly visible through overlay |
| Reduced `.cta-banner__overlay` alpha from 0.9/0.95 to 0.4/0.45 | Same fix for CTA banner section |
| Added `text-shadow` to hero + CTA banner text | Maintains WCAG AA contrast with reduced overlay |
| Added `.cta-banner__subtext` style | Styles the "Available in English & Spanish" subtext |

### `assets/js/main.js`

| Change | Why |
|--------|-----|
| Added `initBrokenImageFallback()` function | Listens for `error` event on all `<img>` elements and adds `.img-broken` class |
| Called `initBrokenImageFallback()` in DOMContentLoaded | Activates fallback on page load |

### `index.html`

| Change | Why |
|--------|-----|
| Added `autocomplete="name"` to name input | Enables mobile autofill |
| Added `autocomplete="email"` to email input | Enables mobile autofill |
| Added `autocomplete="tel"` to phone input | Enables mobile autofill |
| Updated ElevenLabs script from unpkg to official SDK URL | `elevenlabs.io/convai-widget/index.js` is the official embed |
| Updated ElevenLabs comment to include "Fil Voice Agent" | Clarity for future maintainers |
| Replaced "Get Free Estimate" CTA with "Talk to Fil" CTA | Links to ElevenLabs agent with microphone icon |
| Added bilingual subtext under CTA buttons | "Available in English & Spanish - No hold times" |

---

## Notes

- This is a **static HTML site on GitHub Pages**, not WordPress. The original spec assumed WordPress — all tasks were adapted for static HTML/CSS/JS.
- EXIF fix uses CSS `image-orientation: from-image` (supported in all modern browsers) instead of server-side PHP rotation.
- No SQL patches needed — there's no database. All URLs are relative paths or correct absolute URLs to fpcconstructions.com.
- The contact form has client-side validation only (no backend). The `action="#"` TODO remains — needs Formspree, GHL webhook, or similar.
