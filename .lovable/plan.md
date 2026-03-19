

## Plan: Fix Screenshot Generation for All GitHub Projects

### Problem
The sync function processes repos sequentially, taking ~15-20s per repo for screenshots. With ~28 repos, it far exceeds the edge function timeout (~60s), so only 8-10 projects get screenshots before the function is killed.

### Solution: Process Only Projects Missing Images

Instead of re-screenshotting all projects every sync, split the logic so screenshots are only captured for projects that don't already have images. This makes each sync run incremental — it picks up where the last one left off.

### Changes

**File: `supabase/functions/sync-github-projects/index.ts`**

1. **Separate AI content sync from screenshot capture**: First loop through all repos and upsert AI content (fast, no Firecrawl calls). Then query the DB for projects with empty `images` arrays and process only those for screenshots.

2. **Batch limit**: Process at most 5 projects per invocation to stay within the timeout. The admin can click "Re-sync" multiple times to progressively fill in all screenshots.

3. **Skip already-screenshotted projects**: Before capturing, check if `images` array already has entries — skip those entirely.

### Flow

```text
Sync invocation:
  1. Fetch GitHub repos → upsert AI content for ALL (fast)
  2. Query DB: SELECT where images = '{}' LIMIT 5
  3. For each: capture 2-3 screenshots via Firecrawl
  4. Update images in DB
  5. Return: "synced 28 repos, screenshotted 5/17 remaining"
```

### Technical Details

- AI content upsert preserves existing `images` (won't overwrite with empty array)
- Screenshot batch limit of 5 keeps runtime under ~50s (5 × ~10s each)
- Admin panel sync button shows how many still need screenshots, encouraging repeat clicks
- No schema changes needed

