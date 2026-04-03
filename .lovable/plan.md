

## Plan: Reorganize AI Projects Tab Layout

### What changes

1. **`src/components/Projects.tsx`**:
   - Merge `featuredProjects` (GitHub projects with `demo_link`) into the top grid alongside `sideProjects`, so all card-style projects appear together
   - Rename the "Other Projects" section divider to "More from GitHub"
   - Remove the separate "More from GitHub" featured cards section since those cards now live in the top grid

### Technical details

- The top grid will render `sideProjects` cards first, then `featuredProjects` cards, all in the same `lg:grid-cols-4` grid
- The "Other Projects" divider text changes to "More from GitHub"
- The old "More from GitHub" card grid section is removed entirely

