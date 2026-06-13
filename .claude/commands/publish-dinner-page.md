# Publish Dinner Page

Write up a past dinner and create its detail page. The page is created as a draft (not publicly linked) until explicitly published.

## Steps

1. Read `src/data/dinners.json`. List all entries, showing name, date, and whether each already has a page (`published: true` or a matching file in `src/content/dinners/`). Ask the user which dinner to write up.

2. Collect the write-up content — ask for each item; the user may provide some or all upfront:
   - **Our rating** — your group's rating, decimal to one place (e.g. `4.3`); optional, skip if not yet decided
   - **Highlights** — 2–4 short sentences capturing the standout moments of the evening
   - **Standout dishes** — 2–5 dishes in the format `"Dish Name: brief note on why it stood out"`
   - **Pro tips** — 1–3 practical tips for future visitors (reservations, ordering strategy, seating, etc.)
   - **Narrative** — 2–4 paragraphs of freeform prose about the evening (atmosphere, experience, memorable moments). Write in first-person plural ("we"). If the user hasn't written it, offer to draft it from the highlights and dishes they provided, in the voice of the supper club — sophisticated, warm, a little witty.

3. Determine the slug from the dinner entry in `dinners.json`.

4. Create `src/content/dinners/{slug}.md` with this structure:
   ```markdown
   ---
   highlights:
     - First highlight
     - Second highlight
   dishes:
     - "Dish Name: note"
   tips:
     - First tip
   ---

   Narrative paragraphs here.
   ```
   Omit any frontmatter key (`highlights`, `dishes`, `tips`) if the user didn't provide values for it.

5. If `our_rating` was provided, add `"our_rating": <value>` after `"external_rating"` in the dinner's entry in `src/data/dinners.json`. Do **not** set `published: true` yet.

6. Ask the user: "Ready to publish? This will add `published: true` to the dinners.json entry and make the page linkable from the Past Dinners list."
   - If yes: set `"published": true` on the entry and confirm.
   - If no: confirm the draft was saved and remind them they can publish later by setting `"published": true` on the entry or re-running this command.
