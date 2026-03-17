# Antigravity Mission: Generate 24 Text-Only Blog Images

## Goal
Generate 24 blog images using text prompts only (no reference photo needed).
Save to `public/posts/`. Commit and push to branch `content-rewrite-v2`.

## Project
- Path: `/Users/jun/Projects/Naver-blog-clone`
- Branch: `content-rewrite-v2`
- Full prompts: `docs/image-prompts.md`
- Output: `public/posts/` (create if not exists)
- Format: JPEG, landscape ratio (~1200×900px), max 2MB each

## Presets

Apply the matching preset to EVERY prompt before generating.

**Blog A Preset** (for all `a-xxx` images):
> Shot on iPhone 15 Pro, no composition planning, slightly tilted angle, casual male driver's perspective from driver seat. No post-processing, no filters. Dark leather interior of a mid-size Korean sedan. Mundane, unstaged, the way a middle-aged Korean man would snap a quick photo to show a friend. Visible fine dust, minor scratches, lived-in details. No logos, no brand marks visible.

**Blog B Preset** (for all `b-xxx` images):
> Shot on iPhone 15 Plus, warm natural light, Kodak Portra 400 color tone, Korean housewife's casual snap. Slightly more care than a man's photo but still everyday — not influencer level. Subtle warmth, like a 50-something mom taking a photo to share in a family group chat. Soft, slightly overexposed highlights. No logos, no brand marks visible.

---

## Images to Generate (24 total)

Each entry = [filename] → use the matching prompt from `docs/image-prompts.md`.

### Blog A — 13 images

| File | Section in image-prompts.md |
|------|----------------------------|
| `a-001-01.jpg` | a-001 Image 1 |
| `a-001-02.jpg` | a-001 Image 2 |
| `a-002-01.jpg` | a-002 Image 1 |
| `a-002-02.jpg` | a-002 Image 2 |
| `a-003-01.jpg` | a-003 Image 1 |
| `a-003-02.jpg` | a-003 Image 2 |
| `a-003-03.jpg` | a-003 Image 3 |
| `a-004-01.jpg` | a-004 Image 1 |
| `a-004-02.jpg` | a-004 Image 2 |
| `a-004-03.jpg` | a-004 Image 3 |
| `a-005-01.jpg` | a-005 Image 1 |
| `a-005-02.jpg` | a-005 Image 2 |
| `a-006-03.jpg` | a-006 Image 3 |

### Blog B — 11 images

| File | Section in image-prompts.md |
|------|----------------------------|
| `b-001-01.jpg` | b-001 Image 1 |
| `b-001-02.jpg` | b-001 Image 2 |
| `b-002-01.jpg` | b-002 Image 1 |
| `b-002-02.jpg` | b-002 Image 2 |
| `b-002-03.jpg` | b-002 Image 3 |
| `b-003-01.jpg` | b-003 Image 1 |
| `b-003-02.jpg` | b-003 Image 2 |
| `b-004-02.jpg` | b-004 Image 2 |
| `b-005-01.jpg` | b-005 Image 1 |
| `b-005-03.jpg` | b-005 Image 3 |
| `b-006-02.jpg` | b-006 Image 2 |

---

## Steps

1. Read `docs/image-prompts.md` to get all prompts.
2. Create `public/posts/` directory if it does not exist.
3. For each image in the table above:
   - Combine preset + specific prompt.
   - Generate image with Nano Banana.
   - Save as `public/posts/{filename}`.
4. After all 24 images are saved, run `npm run build` — must pass.
5. `git add public/posts/`
6. `git commit -m "feat: add 24 text-only AI-generated blog images"`
7. `git push origin content-rewrite-v2`

## Do NOT
- Generate reference-required images (a-001-03, a-002-03, a-005-03, a-006-01, a-006-02, b-001-03, b-003-03, b-004-01, b-004-03, b-005-02, b-006-01, b-006-03) — those are handled separately.
- Modify any `.ts` source files.
- Push without running `npm run build` first.

## Success
- `public/posts/` has exactly 24 `.jpg` files listed above.
- `npm run build` passes.
- Pushed to `content-rewrite-v2`.
