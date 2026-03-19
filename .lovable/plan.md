

## Plan: Auto-Generate Screenshots for GitHub Projects

### Problem
Currently, synced GitHub projects have empty `images` arrays. The user wants 2-3 actual screenshots of each project's live web app, captured during the sync process.

### Approach

Use **Firecrawl's screenshot format** to capture real screenshots of each project's demo website. For projects without a demo link, use the GitHub repo page as a fallback. Screenshots are uploaded to the existing `project` storage bucket and their public URLs stored in the `images` column.

### Prerequisites

Connect the **Firecrawl** connector — it supports a `screenshot` format that captures full-page screenshots of any URL. This is the cleanest way to get real website screenshots from an edge function (no headless browser needed).

### Step 1: Connect Firecrawl

Use the Firecrawl connector to get screenshot capabilities in the edge function.

### Step 2: Update `sync-github-projects` Edge Function

After generating AI content for each repo, add a screenshot capture step:

1. Determine the target URL: use `repo.homepage` (demo link) if available, otherwise use `repo.html_url` (GitHub page)
2. Call Firecrawl's scrape endpoint with `formats: ['screenshot']` for the main page — this gives screenshot #1
3. If the project has a demo link, also scrape 1-2 subpages:
   - Parse the page HTML/links to find internal navigation links (using Firecrawl's `links` format)
   - Screenshot the first 2 internal links found — these become screenshots #2 and #3
4. Decode the base64 screenshots and upload to the `project` storage bucket under `github-screenshots/{slug}/`
5. Store the public URLs in the `images` array during upsert

### Step 3: Handle Edge Cases

- **No demo link**: Screenshot the GitHub repo page (1 image) + generate 1-2 AI images using Lovable AI's image generation model as supplementary visuals
- **Firecrawl rate limits**: Add delays between screenshot calls; process screenshots sequentially
- **Large base64 data**: Upload directly to storage, don't pass through AI

### Files Changed

| Action | File |
|--------|------|
| Modify | `supabase/functions/sync-github-projects/index.ts` — add screenshot capture logic |

### Technical Details

- Firecrawl screenshot returns base64 PNG via `data.data.screenshot`
- Screenshots uploaded to `project` bucket at path `github-screenshots/{slug}/screenshot-{n}.png`
- Public URL constructed from Supabase storage URL
- Existing `images` column (text[]) already supports this — no schema change needed
- Delay of ~2s between Firecrawl calls to respect rate limits

