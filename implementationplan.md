# Implementation Plan (Resume Handoff)

Last updated: 2026-02-22 (Asia/Seoul)

## 1) Goal

Finish high-fidelity mobile UI cloning of Naver Blog detail view.

- Focus on design/layout parity, not exact post text content.
- Use Playwright + vision-based comparison loops.
- Final step (still pending): open final webpage in Chrome for manual confirmation.

## 2) What Was Completed So Far

- Built and iterated a comparison workflow using full-page screenshots and segmented crops.
- Applied major UI parity updates across header, post header, body typography, interaction/tag/clip sections.
- Added fallback rendering behavior so the page still renders when `/api/posts` returns 500.
- Added clip thumbnails and updated clip card presentation.
- Ran repeated verification (`lsp_diagnostics`, `npm run lint`, `npm run build`).
- Captured updated full-page screenshot: `final-parity-full.png`.

## 3) Latest Local Edits (Not Committed Yet)

- `src/components/post/PostHeader.tsx`
  - Title tuned back to larger Naver-like emphasis (`text-[31px]`, stronger weight, tighter leading)
  - Increased title-to-meta vertical spacing (`mt-8`)
- `src/components/smart-editor/SeQuote.tsx`
  - Restored quote block breathing room (`my-3`, `px-3 py-2`, rounded corners)
- `src/components/comment/CommentSection.tsx`
  - Replaced raw `<img>` with `next/image` for clip thumbnails

## 4) Verification Evidence

- LSP diagnostics: clean (no diagnostics) for:
  - `src/components/post/PostHeader.tsx`
  - `src/components/smart-editor/SeQuote.tsx`
  - `src/components/comment/CommentSection.tsx`
- `npm run lint`: passed with **0 errors**, **6 warnings** (existing warnings in `src/app/admin/page.tsx` and `src/app/api/posts/route.ts`)
- `npm run build`: success (Next.js production build completed)

## 5) Remaining Work (Priority Order)

### A. Top/Header parity (high)

1. `src/components/layout/MobileHeader.tsx`
   - Re-check right action icon: target should match reference exactly (search vs share decision by latest reference)
   - Enforce single-line ellipsis behavior for blog name text
2. `src/components/post/PostHeader.tsx`
   - Final tune of title weight/line-height and title-to-meta gap
   - Confirm meta row details: timestamp format, button typography (`+이웃추가` spacing), optional kebab menu presence

### B. Lower-section parity (high)

1. Decide whether to keep/remove/relocate interaction row and tag pills to match reference flow
2. Add or tune related-posts module if reference still shows that block before clip cards
3. `src/components/comment/CommentSection.tsx`
   - Tune clip section header composition (text, icon, arrow alignment)
   - Tune card overlays/play button style and spacing
   - Re-check footer watermark usage (`blog`) against reference

### C. Final validation loop (required)

1. Capture new screenshot after each polish pass
2. Compare segmented top/bottom regions against reference
3. Repeat until acceptable parity
4. Open final page in Chrome for manual review

## 6) Useful Artifacts and Paths

- Latest implementation screenshot:
  - `final-parity-full.png`
- Previous screenshots:
  - `before-clone-full.png`
  - `after-clone-full.png`
  - `post-push-full.png`
- Temp compare outputs (ephemeral, see reboot note):
  - `/tmp/compare/latest_top_compare.png`
  - `/tmp/compare/latest_bottom_compare.png`
  - `/tmp/naver-reference.jpg`

## 7) Reboot Note (Important)

`/tmp` files are typically cleared on reboot.

- If `/tmp/naver-reference.jpg` is lost, re-attach/provide the Naver reference screenshot again.
- Then regenerate compare crops before continuing parity iteration.

## 8) Exact Resume Commands

```bash
npm install
npm run dev
```

Then open:

- `http://localhost:3000/` (detail page)
- `http://localhost:3000/posts` (list page)

Validation pass:

```bash
npm run lint
npm run build
```

## 9) Current Git State Summary

- Repository is in a dirty working tree (pre-existing unrelated changes exist).
- Latest parity polish changes in this pass are local and uncommitted.
- Previously pushed parity commit exists on `main`: `276cfde`.
