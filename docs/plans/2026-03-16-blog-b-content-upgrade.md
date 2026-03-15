# Blog B Content Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite Blog B posts `B-001`, `B-002`, `B-003`, `B-005`, and `B-006` so they follow the Blog B writing guide and match the narrative quality bar set by `B-004`.

**Architecture:** All work happens in `src/lib/content/posts-blog-b.ts`. Each target post keeps its existing object shape, comments, and image paths, while `title`, `tags`, and `content` copy are upgraded to the gold-standard 5-act story pattern. Validation uses repeated production builds instead of unit tests because this is structured content work.

**Tech Stack:** Next.js, TypeScript content objects, npm build pipeline

---

### Task 1: Capture the editable scope

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts`
- Reference: `docs/writing-guide-blog-b.md`
- Reference: `docs/plans/2026-03-16-blog-b-content-upgrade-design.md`

**Step 1: Confirm target sections**

Run: `rg -n "id: 'b-00[1-6]'" src/lib/content/posts-blog-b.ts`
Expected: entries for `b-001` through `b-006`

**Step 2: Confirm protected section**

Read `B-004` and note that it must remain unchanged.

**Step 3: Commit**

No commit in this step.

### Task 2: Rewrite `B-001`

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts`

**Step 1: Rewrite title, tags, and 10 blocks**

- keep image ids and sources untouched
- keep comments untouched unless guide compliance requires it
- make `남편 차` appear in title front, block `1`, and final block

**Step 2: Run build**

Run: `npm run build`
Expected: build succeeds

**Step 3: Commit**

No commit in this step.

### Task 3: Rewrite `B-002`

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts`

**Step 1: Rewrite title, tags, and 10 blocks**

- keyword: `남편 생일 선물`
- sharpen the failure block around unused gifts going to the drawer

**Step 2: Run build**

Run: `npm run build`
Expected: build succeeds

**Step 3: Commit**

No commit in this step.

### Task 4: Rewrite `B-003`

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts`

**Step 1: Rewrite title, tags, and 10 blocks**

- keyword: `실용적인 선물`
- emphasize awkwardness when a carefully chosen gift is left unused

**Step 2: Run build**

Run: `npm run build`
Expected: build succeeds

**Step 3: Commit**

No commit in this step.

### Task 5: Rewrite `B-005`

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts`

**Step 1: Rewrite title, tags, and 10 blocks**

- keyword: `자동차 꾸미기`
- title should start with the keyword
- failure block should peak around dashboard clutter and rider discomfort

**Step 2: Run build**

Run: `npm run build`
Expected: build succeeds

**Step 3: Commit**

No commit in this step.

### Task 6: Rewrite `B-006`

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts`

**Step 1: Rewrite title, tags, and 10 blocks**

- keyword: `커피향 방향제`
- failure block should focus on heaviness, headache, or fast fade

**Step 2: Run build**

Run: `npm run build`
Expected: build succeeds

**Step 3: Commit**

No commit in this step.

### Task 7: Final verification and commit

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts`
- Create: `docs/plans/2026-03-16-blog-b-content-upgrade-design.md`
- Create: `docs/plans/2026-03-16-blog-b-content-upgrade.md`

**Step 1: Run diff review**

Run: `git diff -- src/lib/content/posts-blog-b.ts docs/plans/2026-03-16-blog-b-content-upgrade-design.md docs/plans/2026-03-16-blog-b-content-upgrade.md`
Expected: only target posts and new docs changed

**Step 2: Run final build**

Run: `npm run build`
Expected: build succeeds

**Step 3: Commit**

```bash
git add src/lib/content/posts-blog-b.ts \
  docs/plans/2026-03-16-blog-b-content-upgrade-design.md \
  docs/plans/2026-03-16-blog-b-content-upgrade.md
git commit -m "content: upgrade Blog B post narratives"
```
