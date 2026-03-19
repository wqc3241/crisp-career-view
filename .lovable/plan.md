

## Plan: Dynamic GitHub Projects (Keeping Existing Static Projects)

### Summary
Add dynamically generated project cards from GitHub alongside the existing 5 static side projects. The "AI Projects" tab will show both: static projects first, then a "From GitHub" section with auto-generated ones.

### Step 1: Create `github_projects` table

Table with columns matching `ProductTemplate` props:
- `id` (uuid PK), `repo_name` (text, unique), `slug` (text, unique)
- `title`, `tagline`, `description`, `vision` (text)
- `images`, `painpoints`, `tech_stack`, `future_improvements`, `tags` (text[])
- `customer_segments`, `features`, `metrics` (jsonb arrays)
- `demo_link`, `github_link`, `test_email`, `test_password` (text, nullable)
- `card_image`, `card_description` (text, nullable) — for the card view
- `is_visible` (boolean, default true), `display_order` (int, default 0)
- `last_synced_at`, `created_at`, `updated_at` (timestamptz)

**RLS**: Public SELECT (anonymous visitors). Admin-only INSERT/UPDATE/DELETE via `has_role()`.

### Step 2: Create `sync-github-projects` Edge Function

1. Fetch public repos from `https://api.github.com/users/wqc3241/repos`
2. For each repo, fetch README via GitHub API
3. Call Lovable AI (Gemini 2.5 Flash) with a prompt to generate JSON matching `ProductTemplate` props — tagline, vision, 4 painpoints, 3 customer segments, 4 features, tech stack, 2 metrics, 5 future improvements, tags, and a short card description
4. Upsert into `github_projects` (match on `repo_name`)
5. Mark removed repos as `is_visible = false`

### Step 3: Daily cron job

`pg_cron` + `pg_net` to call the edge function once per day.

### Step 4: Update Frontend

**`src/hooks/useGithubProjects.ts`** — React Query hook fetching from `github_projects` where `is_visible = true`, ordered by `display_order`.

**`src/components/Projects.tsx`** — In the "AI Projects" tab, show existing static `sideProjects` cards first, then a divider ("More from GitHub"), then dynamically loaded project cards below. Both use the same `ProjectCard` component.

**`src/pages/sideprojects/DynamicProduct.tsx`** — New component for route `/products/:slug` that fetches a row by slug and passes it to the existing `ProductTemplate`.

**`src/App.tsx`** — Add a new route `<Route path="/products/:slug" element={<DynamicProduct />} />` alongside the existing 5 static routes (keep them all).

### Files Summary

| Action | File |
|--------|------|
| Create | `supabase/functions/sync-github-projects/index.ts` |
| Create | `src/hooks/useGithubProjects.ts` |
| Create | `src/pages/sideprojects/DynamicProduct.tsx` |
| Modify | `src/components/Projects.tsx` — add dynamic section below static |
| Modify | `src/App.tsx` — add dynamic route |
| Migration | Create `github_projects` table + RLS + cron job |

All existing static project files and routes remain untouched.

