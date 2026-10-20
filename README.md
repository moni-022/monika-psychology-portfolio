# Monika Mittal — Psychology Portfolio

A responsive sage-and-ivory psychology portfolio built with React, TypeScript, Vite, custom CSS, and GSAP ScrollTrigger. The project is organized by independently maintainable page sections, each with its own TSX and CSS file.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Vite outputs production files to `dist/`.

## Project structure

```text
src/
├── App.tsx
├── main.tsx
├── styles.css                         # Global tokens, typography, loader, resets
└── components/
    ├── effects/
    │   ├── FloatingBackground.tsx     # Ambient animated background layer
    │   ├── FloatingBackground.css
    │   └── useReveal.ts                # Shared GSAP reveal hook
    ├── layout/
    │   ├── SiteHeader.tsx
    │   ├── SiteHeader.css
    │   ├── SiteFooter.tsx
    │   └── SiteFooter.css
    ├── sections/
    │   ├── Main.tsx                   # Hero / homepage
    │   ├── Main.css
    │   ├── AnimationSection.tsx       # Brain-to-flower section wrapper
    │   ├── AnimationSection.css
    │   ├── AboutMe.tsx
    │   ├── AboutMe.css
    │   ├── CuriousCorner.tsx
    │   ├── CuriousCorner.css
    │   ├── MyJourney.tsx
    │   ├── MyJourney.css
    │   ├── LetsConnect.tsx
    │   └── LetsConnect.css
    ├── ScrollBloom.tsx                # SVG artwork + GSAP ScrollTrigger timeline
    └── ScrollBloom.css
```

## Animation system

- The intro loader animates the custom brain PNG.
- `useReveal.ts` adds reusable GSAP scroll reveals for section content and cards.
- `ScrollBloom.tsx` owns the pinned brain-to-flower scroll animation.
- `FloatingBackground.tsx` adds slow, low-contrast ambient blobs and botanical line art.
- CSS micro-interactions add hover lift, breathing rings, and decorative movement.
- Reduced-motion preferences are respected by GSAP and CSS.

## Content verification

Education and internship details are carried forward from the previous website. The public LinkedIn preview does not expose every role or date. Monika should verify all qualifications, internship dates, role titles, locations, and descriptions before publication. Do not imply independent clinical practice based on internship exposure.

Replace `public/images/portrait-placeholder.svg` with a professional photo approved by Monika before launch. `public/images/brain-icon.png` is the custom brain artwork.

## Contact form email delivery (Netlify + Resend)

The contact form uses the Netlify Function at `netlify/functions/contact.ts`. It sends email through Resend, and the recipient address is stored only in a server-side environment variable. The success popup appears after Resend accepts the message.

Before testing live email, create a Resend account, verify a sending domain, and set these variables in Netlify's site environment-variable settings:

- `RESEND_API_KEY` — your Resend API key
- `CONTACT_TO` — the inbox that should receive messages
- `CONTACT_FROM` — a sender address on the domain verified with Resend

Do not commit real secrets or prefix these variables with `VITE_`. Redeploy after changing environment variables.

## Deploy to GitHub + Netlify

1. Create a GitHub repository and push this project folder (the folder containing `package.json`, `index.html`, and `netlify.toml`). Never upload `node_modules`, `dist`, or `.env`.
2. In Netlify, choose **Add new project → Import an existing project**, connect GitHub, and select the repository.
3. Use build command `npm run build` and publish directory `dist`. The included `netlify.toml` already defines these settings and the serverless-function directory.
4. Deploy. Netlify will rebuild and deploy whenever you push changes to the connected branch.
5. In Netlify's environment variables, add `RESEND_API_KEY`, `CONTACT_TO`, and `CONTACT_FROM`, then trigger a new deploy.
6. Test the contact form on the live Netlify URL and confirm the message arrives.
7. To use a custom domain, open **Domain management → Add a domain** in Netlify and follow its DNS instructions. A custom domain normally has a registration cost; the Netlify-provided subdomain can be used free.

Requires Node.js 20.19+ or 22.12+ and npm for local development. Run `npm install`, `npm run dev` for local preview, and `npm run build` to build the site. Netlify Functions do not run through the plain Vite dev server; use a deployed Netlify site or Netlify CLI to test the live function.
