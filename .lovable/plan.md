

## Plan: Compact All Main Page Components

Reduce spacing, margins, and padding across all main page components so content is denser and more scannable.

### Changes

**`src/components/Projects.tsx`**
- Reduce section padding from `py-6 sm:py-8` → `py-3 sm:py-4`
- Reduce tabs margin-bottom from `mb-12` → `mb-6`
- Reduce grid gap from `gap-6` → `gap-4`
- Reduce divider margins (`mt-10` → `mt-6`, `mb-6` → `mb-4`)
- Reduce list spacing from `space-y-3` → `space-y-2`

**`src/components/ProjectCard.tsx`**
- Reduce card padding from `p-6` → `p-4`
- Tighten text margins (`mb-3` → `mb-2`, `mb-4` → `mb-2`)

**`src/components/CompanyListItem.tsx`**
- Reduce card padding from `p-6` → `p-4`
- Reduce gap from `gap-6` → `gap-4`
- Tighten internal margins (`mt-3` → `mt-2`, `mt-4` → `mt-3`)

**`src/components/GithubProjectListItem.tsx`**
- Already compact, minor tweaks only (padding `p-4` → `p-3`)

**`src/components/ui/tabs.tsx`**
- Reduce trigger padding from `px-8 py-4` → `px-6 py-2.5`
- Reduce tab list padding from `p-2` → `p-1`

**`src/components/Header.tsx`**
- Reduce padding from `py-4` → `py-2`

**`src/components/Footer.tsx`**
- Reduce top margin from `mt-16` → `mt-8`
- Reduce padding from `py-6` → `py-4`

### Files Modified
- `src/components/Projects.tsx`
- `src/components/ProjectCard.tsx`
- `src/components/CompanyListItem.tsx`
- `src/components/GithubProjectListItem.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/Header.tsx`
- `src/components/Footer.tsx`

