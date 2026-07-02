# Super Fancy Super Club Site

## SEO

- `sitemap-index.xml` / `sitemap-0.xml` are generated at build time by `@astrojs/sitemap` (configured in `astro.config.mjs`); `public/robots.txt` points crawlers at it.
- Dinner pages (`src/pages/dinners/[slug].astro`) auto-generate a unique meta description, Open Graph image, and `Review`/`Restaurant` JSON-LD from each entry's data — set a good `notes` field in `src/data/dinners.json` for new dinners, since it's used verbatim in the meta description.
- If the site domain ever changes, submit the updated sitemap in Google Search Console.
