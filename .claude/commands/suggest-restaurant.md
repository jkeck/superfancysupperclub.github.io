# Suggest a Restaurant for the Wishlist

Proactively find and suggest a new restaurant to add to the wishlist, based on the group's existing taste profile.

## Steps

1. Read all three data files to build the known-restaurant set (by name and slug, to avoid duplicates):
   - `src/data/wishlist.json`
   - `src/data/upcoming.json`
   - `src/data/dinners.json`

2. Analyze existing entries to infer group preferences:
   - Cuisine types that appear most often
   - Neighborhoods and general geography (Peninsula / South Bay)
   - Typical price range

3. Use web search to find a real, currently-operating restaurant in the San Francisco Peninsula or South Bay area that:
   - Fits the inferred cuisine style, neighborhood pattern, and price range
   - Is **not** already in any of the three lists (check by name and slug)
   - Is clearly still open and active (verify via a recent review, Google listing, or the restaurant's own site)
   - While searching, also note the restaurant's website URL and which days of the week it is closed (for `closed_days`)

4. Present the suggestion to the user in this format:
   - **Name**
   - **Cuisine**
   - **Neighborhood**
   - **Price range** (1–4, $ to $$$$)
   - A one- or two-sentence description
   - A brief note on why it fits the group's taste

5. Ask: "Want to add this to the wishlist?"

   **If yes:**
   - `added_by` defaults to "Jessie" — confirm or change if the user specifies someone else
   - `notes` defaults to the description from step 4 — adjust if the user provides alternate wording
   - Generate the `slug` from the name: lowercase, spaces → hyphens, strip punctuation (e.g. "Selby's" → `selbys`, "The Village Pub" → `village-pub`)
   - Check that the slug doesn't already exist in `wishlist.json`; if it does, note the collision and ask the user to confirm or rename
   - Append the new entry to `src/data/wishlist.json` with 2-space indentation:
     ```json
     {
       "slug": "generated-slug",
       "name": "Restaurant Name",
       "cuisine": "Cuisine Type",
       "neighborhood": "Neighborhood",
       "price_range": 3,
       "added_by": "Jessie",
       "notes": "Short description.",
       "website": "https://example.com",
       "closed_days": [0, 1]
     }
     ```
     Omit `website` if not found. Omit `closed_days` or use `[]` if hours are unknown.
   - Confirm what was added and show the final entry.

   **If no / wants a different suggestion:**
   - Go back to step 3 with a new candidate. Do not repeat a restaurant already suggested in this session.
