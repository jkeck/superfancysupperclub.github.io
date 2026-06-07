# Add Restaurant to Wishlist

Add a new restaurant entry to `src/data/wishlist.json`.

## Steps

1. If the user provided restaurant details in their message, use them. Otherwise ask for:
   - **Name** (required)
   - **Cuisine** — e.g. American, Italian, Japanese, Californian, Mediterranean, Seafood, etc.
   - **Neighborhood** — city or neighborhood name
   - **Price range** — integer 1–4 ($ to $$$$)
   - **Added by** — who is recommending it (default: "Jessie")
   - **Notes** — one or two sentence description of the restaurant
   - **Website** — the restaurant's website URL (optional; use web search to find it if not provided)
   - **Closed days** — days of the week the restaurant is closed, as an array of integers where 0=Sunday, 1=Monday … 6=Saturday (optional; use web search to find hours if not provided; default: `[]`)

   Collect all missing required fields before proceeding. Prompt for optional fields if not provided.

2. Generate a `slug` from the name: lowercase, spaces replaced with hyphens, strip punctuation. Examples: "Selby's" → `selbys`, "The Village Pub" → `village-pub`.

3. Read `src/data/wishlist.json`.

4. Check that the slug doesn't already exist; if it does, note the collision and ask the user to confirm or rename.

5. Append the new entry and write the file back with 2-space indentation.

   Entry shape:
   ```json
   {
     "slug": "generated-slug",
     "name": "Restaurant Name",
     "cuisine": "Cuisine Type",
     "neighborhood": "Neighborhood",
     "price_range": 3,
     "added_by": "Name",
     "notes": "Short description.",
     "website": "https://example.com",
     "closed_days": [0, 1]
   }
   ```
   Omit `website` if unknown (don't use an empty string). Omit `closed_days` or use `[]` if unknown.

6. Confirm what was added and show the final entry.
