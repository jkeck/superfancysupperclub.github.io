# Super Fancy Super Club Site

## Home page tagline

- The italic tagline under the homepage title is sourced from `src/data/taglines.json`, an array of strings — add or remove entries to change the rotation.
- The first entry is always what's server-rendered (seen by no-JS visitors and crawlers); if there's more than one entry, a small inline script on the page swaps in a random one on each page load.
- This is independent of SEO — the `<meta name="description">` / `og:description` tags come from `Base.astro`'s `description` prop (default: "An itinerant feast through the Bay Area Peninsula."), not from the tagline.

## Maps

- All Leaflet maps (`DinnerMap.astro`, `StatsMap.astro`, `upcoming.astro`) share one tile config in `src/lib/basemap.ts` — CARTO's "Dark Matter" raster basemap.
- CARTO requires an API key on `basemaps.cartocdn.com`; unauthenticated tiles get an "API KEY REQUIRED" watermark. The key is hardcoded in `basemap.ts` (it's domain-scoped and unavoidably public in the client bundle). Override it at build time with the `PUBLIC_CARTO_BASEMAP_KEY` env var to keep it out of source. Request a free key at https://carto.com/basemaps/apikey/.

## SEO

- `sitemap-index.xml` / `sitemap-0.xml` are generated at build time by `@astrojs/sitemap` (configured in `astro.config.mjs`); `public/robots.txt` points crawlers at it.
- Dinner pages (`src/pages/dinners/[slug].astro`) auto-generate a unique meta description, Open Graph image, and `Review`/`Restaurant` JSON-LD from each entry's data — set a good `notes` field in `src/data/dinners.json` for new dinners, since it's used verbatim in the meta description.
- If the site domain ever changes, submit the updated sitemap in Google Search Console.
