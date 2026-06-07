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
   - ICS filename: `{slug}-{YYYY-MM}.ics` (slug from wishlist entry, YYYY-MM from the dinner date)
   - DTEND: DTSTART + 2 hours 30 minutes

5. Write the ICS file to `public/events/{slug}-{YYYY-MM}.ics`:
   ```
   BEGIN:VCALENDAR
   VERSION:2.0
   PRODID:-//Super Fancy Supper Club//EN
   CALSCALE:GREGORIAN
   METHOD:PUBLISH
   BEGIN:VEVENT
   DTSTART:{YYYYMMDDTHHmmss}
   DTEND:{YYYYMMDDTHHmmss}
   SUMMARY:Super Fancy Supper Club · {name}
   LOCATION:{full street address}
   DESCRIPTION:{teaser}\n\nSee you there.
   URL:https://superfancysupperclub.com/upcoming
   END:VEVENT
   END:VCALENDAR
   ```
   Note: escape commas in DESCRIPTION and LOCATION with `\,`.

6. Overwrite `src/data/upcoming.json` with the single-object entry:
   ```json
   {
     "name": "Restaurant Name",
     "date": "YYYY-MM-DDTHH:MM:SS",
     "teaser": "Teaser text",
     "secret": false,
     "neighborhood": "Neighborhood",
     "ics_url": "/events/{slug}-{YYYY-MM}.ics",
     "website": "https://example.com",
     "lat": 37.0000,
     "lng": -122.0000
   }
   ```
   Omit `website` if unknown. Set `lat`/`lng` to `null` if coordinates could not be determined (the map will not render).

7. Remove the chosen restaurant from `src/data/wishlist.json` and write the file back.

8. Summarize all changes made: what was removed from wishlist, what upcoming.json now contains, and the ICS file path.
