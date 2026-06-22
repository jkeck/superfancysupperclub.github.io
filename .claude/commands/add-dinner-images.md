# Add Dinner Images

Compress and import one or more photos for a dinner entry. Converts to WebP, resizes to 1400px max width at quality 82, saves to `public/images/dinners/<slug>/`, and updates `dinners.json`.

## Steps

1. Ask the user which dinner they're adding photos for — show the list from `src/data/dinners.json` (name + date, one per line). Skip this step if the user already named the dinner.

2. Ask the user to provide the path(s) to the source image(s). They can drag files into the terminal or paste absolute paths. Accept multiple space-separated paths.

3. Run the script for each set of images:
   ```
   node scripts/add-dinner-image.mjs <path1> [<path2> ...] --dinner <slug>
   ```
   The script will:
   - Convert each image to WebP at quality 82, max 1400px wide
   - Save to `public/images/dinners/<slug>/1.webp`, `2.webp`, etc. (auto-incrementing)
   - Append the public paths to that dinner's `photos[]` in `dinners.json` in a new object like: `{ "src": "{PUBLIC_PATH}", "caption": "" }`
   - Print the before/after file sizes for each image

4. For any entries added that have an empty caption, prompt the user for the caption for that photo, and update the dinners.json appropriately. Offer to open the file for the user (and provide the path).  If no caption is provided keep the empty string and move on.

5. Report what was added: list each output path and the updated `photos[]` array for the dinner.

6. Ask: "Want to commit these images now?" If yes, stage `public/images/dinners/<slug>/` and `src/data/dinners.json` and create a commit with message: `Add photos for <Dinner Name>`.

## Options

You can pass extra flags if needed:
- `--quality <n>` — WebP quality 1–100 (default: 82)
- `--max-width <n>` — max output width in px (default: 1400)

## Notes

- Images are served as static assets by Astro from the `public/` directory.
- The dinner detail page (`/dinners/<slug>`) renders the `photos[]` array as a grid gallery automatically — no extra step needed.
- Photos within a dinner are displayed in array order; to reorder, edit the `photos[]` array in `dinners.json` directly.
