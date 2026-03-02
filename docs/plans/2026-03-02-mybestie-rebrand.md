# mybestie Rebrand Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove all Naver-specific identifiers and fix structural/design issues to make the blog legally safe for Vercel deployment while preserving the Naver-like UX.

**Architecture:** Change brand color, logo, metadata, and terminology globally; rename Naver Smart Editor CSS classes to generic ones; extract mobile sidebar logic out of CommentSection into its own component; remove duplicate code via shared constants.

**Tech Stack:** Next.js 14, React, Tailwind CSS v4, Zustand, TypeScript

---

## File Map

| File | Change Type |
|---|---|
| `src/app/globals.css` | Modify |
| `src/app/layout.tsx` | Modify |
| `src/components/layout/MobileHeader.tsx` | Modify |
| `src/components/post/PostHeader.tsx` | Modify |
| `src/components/post/PostSidebar.tsx` | Modify |
| `src/components/post/PostView.tsx` | Modify |
| `src/components/post/PostBody.tsx` | Modify |
| `src/components/comment/CommentSection.tsx` | Modify |
| `src/components/smart-editor/SeText.tsx` | Modify |
| `src/components/smart-editor/SeQuote.tsx` | Modify |
| `src/components/smart-editor/SeImage.tsx` | Modify |
| `src/components/smart-editor/SeLine.tsx` | Modify |
| `src/lib/mockPosts.ts` | Modify |
| `src/lib/blogConstants.ts` | Create |
| `src/components/post/MobileSidebar.tsx` | Create |
| `src/app/admin/page.tsx` | Modify |

---

### Task 1: Update global brand color and CSS

**Files:**
- Modify: `src/app/globals.css`

No tests needed (visual change). Commit after verifying build passes.

**Step 1: Replace Naver green with mybestie teal**

Open `src/app/globals.css` and make these changes:

```css
@theme {
  --color-primary: #0ea5e9;
  --color-primary-hover: #0284c7;
  /* rest unchanged */
}

/* In .article-html blockquote: change bg from #e9f5d0 to #e0f2fe */
.article-html blockquote {
  background: #e0f2fe;
}

/* In .article-html a: change color from #03c75a to #0ea5e9 */
.article-html a {
  color: #0ea5e9;
}
```

**Step 2: Verify build**

```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run build 2>&1 | tail -5
```
Expected: exit 0, no type errors.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "rebrand: change primary color from naver green to mybestie teal"
```

---

### Task 2: Update page metadata and HTML lang

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Update metadata title, description**

```tsx
export const metadata: Metadata = {
  title: "mybestie",
  description: "mybestie — personal blog",
};
```

Also update `<html lang="ko">` — keep as `ko` since content is Korean, that's fine.

**Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "rebrand: update page title to mybestie"
```

---

### Task 3: Update MobileHeader — logo and blog title

**Files:**
- Modify: `src/components/layout/MobileHeader.tsx`

**Step 1: Replace "N" logo with "M" in teal (uses CSS var now)**

Change:
```tsx
<Link href="/" aria-label="홈" className="grid h-6 w-6 place-items-center rounded-[5px] bg-[#03c75a] text-[12px] font-bold text-white">
    N
</Link>
```

To:
```tsx
<Link href="/" aria-label="홈" className="grid h-6 w-6 place-items-center rounded-[5px] bg-primary text-[12px] font-bold text-white">
    M
</Link>
```

**Step 2: Update hardcoded blog title**

Change:
```tsx
<span className="block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-medium text-[#1a1a1a]">
    팀 트라이 : 성장 기록 아카이브
</span>
```

To:
```tsx
<span className="block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-medium text-[#1a1a1a]">
    mybestie
</span>
```

**Step 3: Commit**

```bash
git add src/components/layout/MobileHeader.tsx
git commit -m "rebrand: update header logo to M and title to mybestie"
```

---

### Task 4: Replace 이웃추가 with 구독 in PostHeader

**Files:**
- Modify: `src/components/post/PostHeader.tsx`

**Step 1: Replace button text and color class**

Change:
```tsx
<button type="button" className="h-7 rounded-[4px] border border-primary px-2.5 text-[11px] font-semibold text-primary">
    +이웃추가
</button>
```

To:
```tsx
<button type="button" className="h-7 rounded-[4px] border border-primary px-2.5 text-[11px] font-semibold text-primary">
    +구독
</button>
```

**Step 2: Commit**

```bash
git add src/components/post/PostHeader.tsx
git commit -m "rebrand: replace 이웃추가 with 구독 in PostHeader"
```

---

### Task 5: Create shared blog constants file

**Files:**
- Create: `src/lib/blogConstants.ts`

This eliminates duplicate `FALLBACK_THUMBNAIL` and `toSimpleTitle` across PostSidebar and CommentSection.

**Step 1: Create the file**

```ts
export const FALLBACK_THUMBNAIL = "https://picsum.photos/seed/bestie-related/900/700";

export const toSimpleTitle = (index: number): string =>
    `관련 글 제목 ${String(index + 1).padStart(2, "0")}`;
```

**Step 2: Commit**

```bash
git add src/lib/blogConstants.ts
git commit -m "refactor: extract shared blog constants"
```

---

### Task 6: Create MobileSidebar component

**Files:**
- Create: `src/components/post/MobileSidebar.tsx`

Extract the mobile author card + recent posts + related posts grid from `CommentSection.tsx` into its own component.

**Step 1: Create the file**

```tsx
"use client";

import Image from "next/image";
import { usePostStore } from "@/store/usePostStore";
import { FALLBACK_THUMBNAIL, toSimpleTitle } from "@/lib/blogConstants";

export default function MobileSidebar() {
    const { posts, currentPostId } = usePostStore();
    const post = posts.find(item => item.id === currentPostId);
    const relatedPosts = posts.filter(item => item.id !== currentPostId).slice(0, 6);

    if (!post || relatedPosts.length === 0) return null;

    return (
        <>
            {/* Author card */}
            <section className="mt-6 rounded-[10px] border border-[#ececec] bg-[#fafafa] px-3.5 py-3.5 md:hidden">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#e8e8e8]">
                            {post.authorProfileImage ? (
                                <Image src={post.authorProfileImage} alt={post.author} fill className="object-cover" />
                            ) : (
                                <span className="flex h-full w-full items-center justify-center text-[14px] font-semibold text-[#555]">
                                    {post.author.slice(0, 1)}
                                </span>
                            )}
                        </div>
                        <div>
                            <p className="text-[14px] font-semibold text-[#1b1b1b]">{post.author}</p>
                            <p className="mt-0.5 text-[11px] text-[#8b8b8b]">mybestie</p>
                        </div>
                    </div>
                    <button type="button" className="rounded-[5px] border border-primary px-2.5 py-1 text-[11px] font-semibold text-primary">
                        + 구독
                    </button>
                </div>
            </section>

            {/* Recent posts */}
            <section className="mt-5 md:hidden">
                <div className="mb-2.5 flex items-center justify-between">
                    <h4 className="text-[14px] font-bold text-[#111]">최근 글</h4>
                    <button type="button" className="text-[11px] text-[#777]">더보기</button>
                </div>
                <div className="space-y-2.5">
                    {relatedPosts.slice(0, 3).map((item, index) => (
                        <article key={item.id} className="flex items-center gap-2.5 rounded-[8px] border border-[#efefef] bg-white p-2">
                            <div className="relative h-[60px] w-[84px] shrink-0 overflow-hidden rounded-[6px] bg-[#f1f1f1]">
                                <Image
                                    src={item.headerImage || FALLBACK_THUMBNAIL}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="line-clamp-2 text-[12px] font-medium leading-[1.35] text-[#202020]">{toSimpleTitle(index)}</p>
                                <p className="mt-1 text-[11px] text-[#8d8d8d]">{item.date}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Related content grid */}
            <section className="mt-5 md:hidden">
                <h4 className="mb-2.5 text-[14px] font-bold text-[#111]">관련 글</h4>
                <div className="grid grid-cols-2 gap-2">
                    {relatedPosts.slice(0, 4).map((item, index) => (
                        <article key={`${item.id}-thumb`} className="overflow-hidden rounded-[8px] border border-[#efefef] bg-white">
                            <div className="relative aspect-[4/3] w-full bg-[#f1f1f1]">
                                <Image
                                    src={item.headerImage || FALLBACK_THUMBNAIL}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-2">
                                <p className="line-clamp-2 text-[11px] leading-[1.3] text-[#292929]">{toSimpleTitle(index)}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}
```

**Step 2: Commit**

```bash
git add src/components/post/MobileSidebar.tsx
git commit -m "refactor: extract MobileSidebar component from CommentSection"
```

---

### Task 7: Clean up CommentSection

**Files:**
- Modify: `src/components/comment/CommentSection.tsx`

Remove: duplicate imports (`Image`), `FALLBACK_THUMBNAIL`, `toSimpleTitle`, the three inline sections (author card, recent posts, related grid, "blog" text). Import and render `<MobileSidebar />` instead.

**Step 1: Replace top of file**

Remove:
```tsx
import Image from "next/image";
// ...
const FALLBACK_THUMBNAIL = "https://picsum.photos/seed/naver-related/900/700";
const toSimpleTitle = (index: number) => `관련 글 제목 ${String(index + 1).padStart(2, "0")}`;
```

Add:
```tsx
import MobileSidebar from "@/components/post/MobileSidebar";
```

Also remove the `relatedPosts` useMemo (no longer needed here):
```tsx
// DELETE this:
const relatedPosts = useMemo(
    () => posts.filter(item => item.id !== currentPostId).slice(0, 6),
    [posts, currentPostId]
);
```

**Step 2: Replace inline mobile sections at bottom of JSX**

Remove the three `<section>` blocks for author card, recent posts, and related grid, plus the `"blog"` text div.

Replace them all with one line:
```tsx
<MobileSidebar />
```

Place it right after the `<CommentInput />` div.

**Step 3: Fix the comment count color**

Change:
```tsx
<span className="text-[#03c75a]">{post.comments.length}</span>
```
To:
```tsx
<span className="text-primary">{post.comments.length}</span>
```

**Step 4: Commit**

```bash
git add src/components/comment/CommentSection.tsx
git commit -m "refactor: replace inline mobile sidebar in CommentSection with MobileSidebar component"
```

---

### Task 8: Clean up PostSidebar

**Files:**
- Modify: `src/components/post/PostSidebar.tsx`

**Step 1: Replace duplicate constants with shared imports**

Remove:
```tsx
const FALLBACK_THUMBNAIL = "https://picsum.photos/seed/naver-related/900/700";
const toSimpleTitle = (index: number) => `관련 글 제목 ${String(index + 1).padStart(2, "0")}`;
```

Add:
```tsx
import { FALLBACK_THUMBNAIL, toSimpleTitle } from "@/lib/blogConstants";
```

**Step 2: Replace hardcoded Naver green and 이웃추가**

Change:
```tsx
<button type="button" className="rounded-[5px] border border-[#03c75a] px-2.5 py-1 text-[11px] font-semibold text-[#03c75a]">
    + 이웃추가
</button>
```
To:
```tsx
<button type="button" className="rounded-[5px] border border-primary px-2.5 py-1 text-[11px] font-semibold text-primary">
    + 구독
</button>
```

**Step 3: Update blog description and remove "blog" text**

Change:
```tsx
<p className="mt-0.5 text-[11px] text-[#8b8b8b]">일상 기록과 작업 로그</p>
```
To:
```tsx
<p className="mt-0.5 text-[11px] text-[#8b8b8b]">mybestie</p>
```

Remove the "blog" text div at the bottom:
```tsx
// DELETE:
<div className="mt-5 border-t border-[#efefef] pt-3 text-center text-[22px] font-semibold tracking-[-0.03em] text-[#1f1f1f]">
    blog
</div>
```

**Step 4: Update image src to use fallback cleanly**

For each Image that uses `item.headerImage ? ... : FALLBACK_THUMBNAIL`, simplify to:
```tsx
<Image
    src={item.headerImage || FALLBACK_THUMBNAIL}
    alt={item.title}
    fill
    className="object-cover"
/>
```

**Step 5: Rename section header "이 블로그의 최근 글" → "최근 글"**

```tsx
<h4 className="text-[14px] font-bold text-[#111]">최근 글</h4>
```

**Step 6: Rename section header "연관 콘텐츠" → "관련 글"**

```tsx
<h4 className="mb-2.5 text-[14px] font-bold text-[#111]">관련 글</h4>
```

**Step 7: Commit**

```bash
git add src/components/post/PostSidebar.tsx
git commit -m "rebrand: clean up PostSidebar - remove naver green, 이웃추가, blog text"
```

---

### Task 9: Rename Smart Editor CSS classes

**Files:**
- Modify: `src/components/smart-editor/SeText.tsx`
- Modify: `src/components/smart-editor/SeQuote.tsx`
- Modify: `src/components/smart-editor/SeImage.tsx`
- Modify: `src/components/smart-editor/SeLine.tsx`
- Modify: `src/components/post/PostBody.tsx`

Replace Naver Smart Editor class names with generic equivalents. These classes do nothing stylistically (no CSS targets them) — they are pure Naver IP.

**Step 1: SeText.tsx — flatten to single wrapper**

Replace entire component:
```tsx
export default function SeText({ children }: { children: React.ReactNode }) {
    return (
        <p className="blog-text text-[15px] leading-[1.82] tracking-[-0.01em] text-[#222]">
            {children}
        </p>
    );
}
```

**Step 2: SeQuote.tsx — flatten**

Replace entire component:
```tsx
export default function SeQuote({ children }: { children: React.ReactNode }) {
    return (
        <blockquote className="blog-quote my-2.5 rounded-[4px] bg-[#e0f2fe] px-3 py-1.5 text-[15px] font-medium leading-[1.75] tracking-[-0.01em] text-[#202020]">
            {children}
        </blockquote>
    );
}
```

**Step 3: SeImage.tsx — flatten**

Replace entire component:
```tsx
import Image from "next/image";

interface SeImageProps {
    src: string;
    caption?: string;
    width?: number;
    height?: number;
}

export default function SeImage({ src, caption, width = 900, height = 900 }: SeImageProps) {
    return (
        <figure className="blog-image my-2">
            <div className="relative w-full overflow-hidden rounded-[10px] bg-[#f1f3f5]">
                <Image
                    src={src}
                    alt={caption || "Post image"}
                    width={width}
                    height={height}
                    className="h-auto w-full object-cover"
                />
            </div>
            {caption && (
                <figcaption className="mt-2 text-center text-[12px] text-[#8a8a8a]">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
```

**Step 4: SeLine.tsx — flatten**

Read the file first, then simplify to:
```tsx
export default function SeLine() {
    return <hr className="blog-divider my-4 border-0 border-t border-[#ececec]" />;
}
```

**Step 5: PostBody.tsx — remove se-main-container**

Change:
```tsx
<section className="se-main-container bg-white px-3.5 pb-5 pt-3.5">
```
To:
```tsx
<section className="bg-white px-3.5 pb-5 pt-3.5">
```

**Step 6: Commit**

```bash
git add src/components/smart-editor/ src/components/post/PostBody.tsx
git commit -m "rebrand: replace naver smart-editor class names with generic blog classes"
```

---

### Task 10: Update mockPosts.ts — remove Naver CDN URLs and rename seeds

**Files:**
- Modify: `src/lib/mockPosts.ts`

**Step 1: Replace Naver CDN profile image URL**

Change:
```ts
const DEFAULT_AUTHOR_IMAGE = "https://blogpfthumb-phinf.pstatic.net/...";
```
To:
```ts
const DEFAULT_AUTHOR_IMAGE = "https://picsum.photos/seed/bestie-author/200/200";
```

**Step 2: Rename picsum seeds from naver-* to bestie-***

```ts
const DEFAULT_HEADER_IMAGE = "https://picsum.photos/seed/bestie-header/1200/900";

const ARTICLE_IMAGES = [
  "https://picsum.photos/seed/bestie-detail-1/1200/900",
  "https://picsum.photos/seed/bestie-detail-2/1200/900",
  "https://picsum.photos/seed/bestie-detail-3/1200/900",
  "https://picsum.photos/seed/bestie-detail-4/1200/900"
];
```

**Step 3: Commit**

```bash
git add src/lib/mockPosts.ts
git commit -m "rebrand: replace naver CDN URLs with picsum placeholders in mockPosts"
```

---

### Task 11: Update admin/page.tsx — remove Naver CDN URLs

**Files:**
- Modify: `src/app/admin/page.tsx`

**Step 1: Replace Naver CDN URLs at top of file**

Change:
```ts
const DEFAULT_AUTHOR = "대동";
const DEFAULT_AUTHOR_IMAGE = "https://blogpfthumb-phinf.pstatic.net/...";
const DEFAULT_HEADER_IMAGE = "https://mblogthumb-phinf.pstatic.net/...";
```
To:
```ts
const DEFAULT_AUTHOR = "대동";
const DEFAULT_AUTHOR_IMAGE = "https://picsum.photos/seed/bestie-author/200/200";
const DEFAULT_HEADER_IMAGE = "https://picsum.photos/seed/bestie-header/1200/900";
```

**Step 2: Commit**

```bash
git add src/app/admin/page.tsx
git commit -m "rebrand: remove naver CDN image URLs from admin page"
```

---

### Task 12: Final verification

**Step 1: Build**

```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run build 2>&1
```
Expected: exit 0, no type errors.

**Step 2: Search for any remaining Naver references**

```bash
grep -r "naver\|pstatic\|03c75a\|이웃추가\|se-component\|se-module\|se-section\|Naver" \
  src/ --include="*.tsx" --include="*.ts" --include="*.css" -l
```
Expected: no output (no matching files).

**Step 3: Final commit if any minor cleanups needed**

```bash
git add -A
git commit -m "rebrand: final cleanup - all naver references removed"
```
