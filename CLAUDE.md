# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static portfolio website built with vanilla HTML, CSS, and JavaScript. It's designed for a Product Manager who specializes in architecture, strategy, and code prototyping. The site uses a modern & minimal design aesthetic with no frameworks or build tools.

## Local Development

Open `index.html` directly in a browser to view the site:
```bash
open index.html
```

No build process, dependencies, or local server required.

## Architecture

### File Structure
- `index.html` - Single-page layout with all sections (Hero, About, Timeline, Projects, Skills, Contact)
- `styles.css` - All styling with CSS custom properties (variables) defined in `:root`
- `script.js` - Vanilla JavaScript for smooth scrolling, animations, and interactions

### Design System (CSS Variables in styles.css)

All theming is controlled via CSS custom properties in the `:root` selector:

**Colors:**
- `--primary-color` - Main brand color (used for links, buttons, accents)
- `--text-primary` / `--text-secondary` - Text hierarchy
- `--bg-primary` / `--bg-secondary` / `--bg-tertiary` - Background layers

**Spacing:**
- `--spacing-xs` through `--spacing-xl` - Consistent spacing scale

**Layout:**
- `--max-width: 1200px` - Content container max width
- `--navbar-height: 70px` - Fixed navbar height (important for scroll offset calculations)

### Key Interactions (script.js)

1. **Smooth scrolling** - Navigation links scroll to sections accounting for fixed navbar height
2. **Intersection Observer** - Sections fade in on scroll into viewport
3. **Active nav highlighting** - Current section highlighted in navbar based on scroll position
4. **Reduced motion support** - Respects `prefers-reduced-motion` media query

### Responsive Breakpoints

- Desktop: > 768px (default)
- Tablet: ≤ 768px
- Mobile: ≤ 480px

## Content Updates

### Personalizing Content

The site contains personalized content for James Park including:
- Contact information: `james@jpark.it.com`, LinkedIn, GitHub
- Timeline section: Professional journey from 2011-present (Biochemistry/Physics → Social Impact → MSEE → Product Management career)
- Featured projects: Stock Tracker (Next.js), MEAN Stack Application
- Skills: Product Strategy, Architecture & Design, Technical Skills, Tools & Platforms

When adding new content:
- Timeline entries follow the timeline-item pattern with year, title, and description
- Project cards should match existing structure with header, description, tech tags, and links
- Skills are organized in 4 categories

### Adding Sections

New sections should follow this pattern:
```html
<section id="section-id" class="section section-name">
    <div class="container">
        <h2 class="section-title">Section Title</h2>
        <!-- Content -->
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
3. Site auto-deploys to: `https://monpip.github.io/jpark.it.com`

No GitHub Actions or build configuration needed - pure static hosting.

### Custom Domain

To use the custom domain `jpark.it.com`:
1. Add a `CNAME` file in the repository root with content: `jpark.it.com`
2. Configure DNS with your domain provider to point to GitHub Pages
