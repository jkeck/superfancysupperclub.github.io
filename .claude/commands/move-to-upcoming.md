# Move Restaurant from Wishlist to Upcoming

Promote a wishlist restaurant to the upcoming dinner slot and generate its calendar invite.

## Steps

1. Read `src/data/wishlist.json` and display the list of restaurants with their name, cuisine, and neighborhood. Ask the user which one to move to upcoming.

2. Collect the following for the upcoming dinner:
   - **Date and time** — e.g. "June 14, 2026 at 7pm"; convert to ISO 8601 format `YYYY-MM-DDTHH:MM:SS`
   - **Teaser** — a short, fun one-liner shown on the site (e.g. "It may not be Vespucci, but we will be the judge")
   - **Secret** — whether to hide the restaurant name on the site (default: `false`)
   - **Full street address** — used in the calendar invite LOCATION field (e.g. "1448 Burlingame Ave, Burlingame, CA 94010"); search for it if you can, otherwise ask
   - **Website** — carry over from the wishlist entry if present; otherwise search for it
   - **Lat/Lng** — look up coordinates from the street address via web search; used to show a map on the Upcoming page

3. Derive from the chosen restaurant's existing wishlist entry:
   - `name`, `neighborhood`

4. Compute derived values:
   - DTEND: DTSTART + 2 hours 30 minutes

5. The ICS calendar invite is generated dynamically by `src/pages/events/upcoming.ics.ts` from `upcoming.json` at build time. **Do not create a static ICS file.** The endpoint automatically uses generic content (no restaurant name or address) when `secret: true`, and full details when `secret: false`.

6. Overwrite `src/data/upcoming.json` with the single-object entry:
   ```json
   {
     "name": "Restaurant Name",
     "date": "YYYY-MM-DDTHH:MM:SS",
     "teaser": "Teaser text",
     "secret": false,
     "neighborhood": "Neighborhood",
     "location": "123 Main St, City, CA 94000",
     "ics_url": "/events/upcoming.ics",
     "website": "https://example.com",
     "lat": 37.0000,
     "lng": -122.0000
   }
   ```
   - `location` is the full street address used in the calendar invite (only shown when not secret). Search for it if needed; omit if unknown.
   - `ics_url` is always `/events/upcoming.ics` (the dynamic endpoint).
   - Omit `website` if unknown. Set `lat`/`lng` to `null` if coordinates could not be determined (the map will not render).

7. Remove the chosen restaurant from `src/data/wishlist.json` and write the file back.

8. Summarize all changes made: what was removed from wishlist, what upcoming.json now contains, and the ICS file path.
