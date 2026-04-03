

## Plan: Split GitHub Projects into Card View and List View

### What Changes
In the AI Projects tab, GitHub projects will be split into two groups:

1. **Card view (top)** — Projects that have a `demo_link` (meaning screenshots are from the actual deployed app)
2. **List view (bottom)** — Projects without a `demo_link` (screenshots are from the GitHub page or missing entirely), shown in a compact list format below a divider

### File Changes

**`src/components/Projects.tsx`**
- Split `githubProjects` into two arrays:
  - `featuredProjects` = projects where `demo_link` is not null/empty
  - `otherProjects` = the rest
- Render `featuredProjects` in the existing card grid (under "More from GitHub")
- Render `otherProjects` in a compact list view (under a second divider like "Other Projects") using a new `GithubProjectListItem` component

**`src/components/GithubProjectListItem.tsx`** (new file)
- Compact list item similar to `CompanyListItem` but adapted for GitHub projects
- Shows: title, description (truncated), tags, and a chevron link to `/projects/{slug}`
- No image/screenshot displayed
- Clickable, links to the project detail page

### Technical Details
- The heuristic for "has a formal screenshot" is simply: `demo_link` is truthy. From the data, projects with `demo_link` have real app screenshots; those without captured the GitHub repo page instead.
- Currently ~6 projects have `demo_link`, the remaining ~40+ will go to list view.
- Sort order within each group remains `repo_created_at DESC`.

