# Errors

Command failures and integration errors.

---

## [ERR-20260522-001] next_build_export

**Logged**: 2026-05-22T17:25:52+08:00
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary
Adding `app/business/page.tsx` conflicted with the exported legacy `/business/index.html` route.

### Error
```text
EISDIR: illegal operation on a directory, copyfile '.next/server/app/business.html' -> 'out/business/index.html'
```

### Context
- Command attempted: `npm run build`
- The project uses `output: "export"` and `trailingSlash: true`.
- A new `/business` page tried to export to `out/business/index.html`, but legacy `.html` routing already creates `out/business/index.html/`.

### Suggested Fix
Avoid adding an app route that exports to the same path as an existing legacy `.html` directory. Fix incoming `/business` links to point at an existing non-conflicting route instead.

After an export collision, remove stale `.next` and `out` build artifacts before re-running `next build`; stale manifests can surface unrelated `PageNotFoundError` failures.

### Metadata
- Reproducible: yes
- Related Files: app/business/page.tsx, app/business/[...slug]/page.tsx, next.config.js

---
