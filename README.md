# jullay.coffee

The cafe, as a website: walk up to the shopfront, step in, pick a mug off the wall, order at the bar, look at what's on the counter, pull a book off the shelf, and leave at dusk.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Change what it says

All copy, prices, hours, address and books live in `src/data/cafe.ts`. Lines marked `TODO` are placeholders.

- The mugs on the wall: `src/lib/mugs.ts`
- The logo: `public/jullay-logo.png`, made from the supplied artwork. Swap in an SVG when there is one.
- Brand tokens: `src/styles/tokens.css`, taken from the Jullay Coffee design system

## Try other times of day

Add `?hour=7` or `?hour=21` to the URL. The open sign and the window light follow the cafe's local time (`timeZone` in `cafe.ts`).

## Deploy

The site is static, so any static host works (Cloudflare Pages, Netlify, Vercel). Set the build command to `npm run build` and the output folder to `dist`, then point `jullay.coffee` at it.
