# FPC Construction LLC Website

A professional, responsive single-page website for FPC Construction LLC, a construction company based in North Augusta, SC.

## Overview

This is a clean, standalone HTML/CSS/JS website built without WordPress dependencies. It features:

- Modern, responsive design (mobile-first)
- Smooth scroll navigation
- Animated counters on scroll
- Testimonials carousel
- Project portfolio with filtering
- FAQ accordion
- Contact form with validation
- SEO-optimized meta tags

## Quick Start

### Option 1: Local Development

Simply open `index.html` in your web browser:

```bash
# On Mac
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

### Option 2: Local Server

For a better development experience with live reload:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Project Structure

```
fpc-construction/
├── README.md                 # This file - deployment & customization guide
├── index.html                # Main site (single-page)
├── assets/
│   ├── css/
│   │   └── styles.css        # All styles with CSS custom properties
│   ├── js/
│   │   └── main.js           # Interactions, counters, form handling
│   └── images/
│       ├── logo.png          # FPC logo
│       ├── favicon.png       # Browser favicon
│       └── placeholder/      # Placeholder images with attribution
├── TEMPLATE.md               # Instructions for mpowerio template use
└── HANDOFF.md                # Digitwitch deployment documentation
```

## Features

### Sections
1. **Header/Navigation** - Fixed header with mobile hamburger menu
2. **Hero** - Full-height hero with stats counters
3. **About** - Company information with feature checklist
4. **Services** - 6 service cards with icons
5. **Stats** - Animated counter section
6. **Projects** - Portfolio gallery with category filters
7. **Testimonials** - Carousel with 4 reviews
8. **CTA Banner** - Call-to-action section
9. **Contact** - Form with validation + contact info
10. **FAQ** - 6-question accordion
11. **Footer** - Links, contact info, copyright

### Technical Features
- CSS Custom Properties for easy theming
- Vanilla JavaScript (no jQuery)
- Intersection Observer for scroll animations
- Touch support for carousels
- Form validation with phone formatting
- Print stylesheet
- Accessibility features (skip link, ARIA labels)

## Customization

### Changing Colors

Edit the CSS custom properties in `assets/css/styles.css`:

```css
:root {
    --color-primary: #1a2744;        /* Dark navy blue */
    --color-accent: #d4a937;         /* Gold/yellow accent */
    /* ... more variables */
}
```

### Updating Content

All content is in `index.html`. Search for these sections:
- Business info: Look for phone, email, address
- Services: Find `.service-card` elements
- Testimonials: Find `.testimonial-card` elements
- FAQ: Find `.faq__item` elements

### Adding Images

Replace placeholder files in `assets/images/placeholder/`:
- `hero-bg.jpg` - Hero section background
- `about-team.jpg` - About section image
- `project-1.jpg` through `project-6.jpg` - Portfolio images

See `assets/images/placeholder/ATTRIBUTION.md` for image guidelines.

## Contact Form Setup

The contact form currently shows a success message without actually sending data. To enable email delivery:

### Option 1: Formspree (Recommended)

1. Sign up at https://formspree.io
2. Create a new form
3. Update the form action in `index.html`:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Netlify Forms

If hosting on Netlify, add this attribute to the form:

```html
<form name="contact" data-netlify="true" method="POST">
```

### Option 3: Custom Backend

Send form data to your own endpoint using JavaScript.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Performance

The site is optimized for performance:
- No external CSS frameworks (no Tailwind CDN)
- Minimal JavaScript
- Lazy loading for images
- CSS custom properties (no build step required)

For production, consider:
- Optimizing/compressing images
- Converting images to WebP format
- Minifying CSS and JavaScript
- Adding caching headers on the server

## License

This website was built for FPC Construction LLC. All rights reserved.

---

**Built by mpowerio.ai**
