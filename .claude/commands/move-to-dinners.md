# Move Upcoming Dinner to Dinners List

Record the completed upcoming dinner in the historical dinners list.

## Steps

1. Read `src/data/upcoming.json` and show the user the current upcoming dinner (name, date, neighborhood).

2. Collect:
   - **External rating** — the Yelp (or equivalent) star rating, e.g. `4` or `4.5`; search for it if not known
   - **Cuisine** — search for it or infer from context; ask if uncertain
   - **Price range** — integer 1–4; search for it or infer from context; ask if uncertain
   - **Lat/Lng** — attempt to look up from the restaurant name and neighborhood via web search; if uncertain ask the user to confirm or provide them
   - **Website** — carry over from `upcoming.json` if present; otherwise search for it
   - **Photos** — list of photo URLs (default: `[]`; user can add later)
   - **Notes** — one or two sentence description (can reuse any existing notes from context, or ask)

3. Derive from `upcoming.json`:
   - `name`, `neighborhood`, `date` (use only the `YYYY-MM-DD` portion for the dinner record)

4. Build the slug: `{name-slug}-{YYYY-MM}` where name-slug is the restaurant name lowercased with spaces as hyphens and punctuation stripped, and YYYY-MM comes from the dinner date.

5. Append the entry to `src/data/dinners.json` — insert at the **end** of the array, preserving 2-space indentation:
   ```json
   {
     "slug": "restaurant-slug-YYYY-MM",
     "name": "Restaurant Name",
     "date": "YYYY-MM-DD",
     "cuisine": "Cuisine Type",
     "neighborhood": "Neighborhood",
     "lat": 37.0000,
     "lng": -122.0000,
     "price_range": 3,
     "external_rating": 4,
     "notes": "Short description.",
     "website": "https://example.com",
     "photos": []
   }
   ```
   Omit `website` if unknown (don't use an empty string). Do NOT add `published` or `our_rating` — those are set separately via `/publish-dinner-page`.

6. Confirm: show the entry added to dinners.json.
