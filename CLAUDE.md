# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tone & Communication

Maintain a professional, clear tone. Avoid casual language, slang, and humor. Be direct and concise. Write as a colleague would in a professional setting.

## Project Overview

This is a static portfolio website built with vanilla HTML, CSS, and JavaScript. It's designed for a Product Manager who specializes in architecture, strategy, and code prototyping. The site uses a dark cinematic design aesthetic with no frameworks or build tools.

## Local Development

Open `index.html` directly in a browser to view the site:
```bash
open index.html
```

No build process, dependencies, or local server required.

## Architecture

### File Structure
- `index.html` - Single-page layout with all sections (Hero, About, Experience, Projects, Tools & Tech, Contact)
- `styles.css` - All styling with CSS custom properties (dark theme), Inter font via Google Fonts
- `script.js` - Vanilla JavaScript for canvas hero animation, cursor glow, scroll reveals, stat counters, card tilt, smooth scrolling
- `classic.html` - Light-mode fallback version of the portfolio (independent, uses its own styles)

### Design System (CSS Variables in styles.css)

All theming is controlled via CSS custom properties in the `:root` selector:

**Colors (dark cinematic):**
- `--bg-primary: #09090b` - Near-black base
- `--bg-surface: #111113` - Card/elevated surfaces
- `--bg-surface-2: #1a1a1e` - Hover states, active surfaces
- `--border` / `--border-hover` - Semi-transparent white borders
- `--text-primary: #f0f0f2` - Headings, primary text
- `--text-secondary: #8b8b8d` - Body text, descriptions
- `--text-muted: #555557` - Labels, dates
- `--accent: #3b82f6` - Blue accent (links, CTAs)
- `--gradient` - Blue-to-purple gradient for accent elements

**Typography:**
- Font: Inter via Google Fonts
- Hero h1: `clamp(3rem, 8vw, 6rem)`, weight 700
- Section titles: `clamp(1.75rem, 4vw, 2.5rem)`, weight 600

**Layout:**
- `--max-width: 1000px` - Text content container
- `--max-width-wide: 1200px` - Card grid container
- `--navbar-height: 64px` - Sticky navbar height

### Key Interactions (script.js)

1. **Canvas hero background** - Animated gradient blobs that respond to mouse position
2. **Cursor glow** - Soft radial gradient follows mouse across the page
3. **Scroll reveals** - IntersectionObserver triggers staggered fade-in animations
4. **Stat counters** - Numbers ($9M+, 332%, 4.25x) count up with eased animation when visible
5. **Project card 3D tilt** - Cards tilt based on mouse position with glowing border effect
6. **Smooth scrolling** - Navigation links scroll to sections
7. **Active nav highlighting** - Current section highlighted in navbar
8. **Reduced motion support** - All animations disabled when `prefers-reduced-motion` is set

### Responsive Breakpoints

- Desktop: > 768px (default)
- Tablet: <= 768px
- Mobile: <= 480px

## Content Updates

### Personalizing Content

The site contains personalized content for James Park including:
- Contact information: `james@jpark.app`, LinkedIn, GitHub
- Experience section: Professional roles (Craneware, Talogy, innate.ly) with summaries, stat callouts, and accomplishments, plus an "Earlier" timeline for education and pre-PM career
- Featured projects: Granite Security, Stock Tracker, MEAN Stack Application
- Tools & Tech: Compact tag-based strip grouped by category (Languages, Frameworks, Identity & Auth, Data, DevOps, Product, AI)

When adding new content:
- Experience entries use `.experience-entry` with header, optional `.stat-row` with `.stat-callout` elements, summary, and accomplishment list
- Stat callouts use data attributes: `data-target`, `data-prefix`, `data-suffix`, `data-decimals`
- Project cards use `.project-card` with `data-tilt` attribute for 3D hover effect
- Tools are organized as tag groups in `.tools-strip`
- New elements that should animate on scroll need the `reveal` class

**Style note:** Do not use em dashes in site content. Use commas, periods, or restructure sentences instead.

### Adding Sections

New sections should follow this pattern:
```html
<section id="section-id" class="section">
    <div class="container">
        <h2 class="section-title reveal">Section Title</h2>
        <!-- Content with reveal classes -->
    </div>
</section>
```

Add corresponding navigation link in `.nav-menu` for smooth scrolling to work.

## Deployment

### GitHub Pages

The site is configured for GitHub Pages deployment from the `main` branch root folder.

Deploy workflow:
1. Make changes locally
2. Commit and push to `main` branch
3. Site auto-deploys to: `https://monpip.github.io/jpark`

No GitHub Actions or build configuration needed - pure static hosting.

### Custom Domain

To use the custom domain `jpark.app`:
1. Add a `CNAME` file in the repository root with content: `jpark.app`
2. Configure DNS with your domain provider to point to GitHub Pages
