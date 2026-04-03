

## Plan: Compact Top Section

The goal is to reduce the vertical space the hero takes so project content is visible without scrolling.

### Changes

**`src/components/Hero.tsx`**
- Remove the large name heading and subtitle (already in the Header)
- Remove the descriptive paragraph
- Keep only the "Chat with Virtual Me" button and the LinkedIn/GitHub/Resume buttons, but lay them out in a single horizontal row instead of two stacked rows
- Reduce padding significantly (e.g. `pt-4 pb-2`)
- For logged-in users, simplify to a single-line welcome

**`src/components/Header.tsx`**
- Add the subtitle "Experienced Product Manager" next to or below the name in the header
- Move the "Chat with Virtual Me" button into the header nav area (small size, inline with other links)

### Resulting Layout

```text
┌─────────────────────────────────────────────────────────┐
│ Qichao Wang · Experienced Product Manager    LinkedIn │
│                                    GitHub Resume [Chat]│
├─────────────────────────────────────────────────────────┤
│         [ Career ]  [ AI Projects ]                     │
│                                                         │
│  Project cards...                                       │
```

The Hero section effectively becomes just a thin strip with the action buttons, or is removed entirely with everything merged into the Header. The tabs content starts much higher on the page.

### Alternative (simpler)
Instead of merging into the header, just shrink the Hero:
- Reduce heading to `text-2xl`
- Remove the paragraph entirely
- Put Chat + LinkedIn + GitHub + Resume all on one row
- Minimal padding (`py-4`)

### Recommendation
Go with the simpler approach — keep Hero but make it minimal: one line for name+title, one row for all buttons. This preserves the current component structure while cutting the hero height roughly in half.

### Files Modified
- `src/components/Hero.tsx` — shrink heading, remove paragraph, single-row buttons

