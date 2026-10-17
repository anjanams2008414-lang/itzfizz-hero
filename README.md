# ITZFIZZ — Drive the difference

**Live demo:** [https://paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)

A responsive, scroll-driven hero where the car, road, headline, and customer-impact stats move together through a pinned GSAP sequence.

## Stack

- Next.js App Router with static export
- React and TypeScript
- Tailwind CSS
- GSAP and ScrollTrigger
- GitHub Pages deployment with GitHub Actions

## Getting started

```bash
npm install
npm run dev
```

The site is configured for the `/car-scroll-animation` GitHub Pages project path. To build the static site locally:

```bash
npm run build
```

The exported site is written to `out/`. The repository's GitHub Pages source should be set to **GitHub Actions**.

## Structure

```text
app/
  globals.css           Global styles and responsive hero layout
  layout.tsx            App Router root layout and metadata
  page.tsx              Home page
components/
  CarScrollHero.tsx     Hero markup, entrance timeline, and scroll sequence
public/
  car.png               Top-view car artwork
.github/workflows/
  deploy.yml            Build and deploy to GitHub Pages
next.config.js          Static export, unoptimized images, and Pages path
```

The hero respects `prefers-reduced-motion`; animations use transforms and opacity, and the GSAP context is reverted on unmount.
