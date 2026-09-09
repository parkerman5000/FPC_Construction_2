# Contact-form delivery regression

From the repository root, with Node.js 22+:

```sh
npm ci --prefix tools/contact-form
npm exec --prefix tools/contact-form -- playwright install chromium
npm test --prefix tools/contact-form
npm run build --prefix tools/contact-form
npm run check:asset --prefix tools/contact-form
```

The build uses pinned Terser 5.44.0 to regenerate `assets/js/main.min.js` from
`assets/js/main.js` with compression, mangling, and no comments. Commit both files.
The site serves the minified file directly; it has no deployment-time build step.
`check:asset` checks byte-for-byte regeneration.

The browser suite loads the actual `index.html` and assets with both JS variants.
Every network request is intercepted: synthetic lead responses are returned locally
and other external requests are blocked. It sends no leads or emails to production.
Tests cover acceptance receipts, HTTP/JSON/network errors, missing configuration,
timeout, validation, retry, and ten concurrent submit events. Browser time advances
locally for the timeout check rather than waiting fifteen seconds.

The existing GitHub workflow only generates example SLSA release artifacts, and
`deno.json` excludes site assets from its checks. These commands are the focused
checks for this form; they do not prove live CRM capture or owner email delivery.
