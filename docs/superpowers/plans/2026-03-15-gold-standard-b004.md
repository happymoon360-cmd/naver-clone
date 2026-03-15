# Gold Standard B-004 Rewrite + Writing Guide Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite Blog B post B-004 as a high-quality gold standard (10 content blocks, 5 comments), then create an annotated writing guide for agents to replicate this quality.

**Architecture:** Pure content change — replace the B-004 entry in the static TypeScript post array, then create a standalone Markdown guide doc. No component or type changes. The guide references the completed B-004 as its annotated example.

**Tech Stack:** TypeScript (static content), Markdown (writing guide)

**Spec:** `docs/superpowers/specs/2026-03-15-gold-standard-b004-design.md`

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/lib/content/posts-blog-b.ts` | Modify | Replace B-004 post (4 blocks → 10 blocks, 4 comments → 5 comments) |
| `docs/writing-guide-blog-b.md` | Create | Blog B writing guide with annotated B-004 reference |

---

## Chunk 1: B-004 Post Rewrite

### Task 1: Write B-004 content blocks

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts` (the `b-004` entry in the `postsBlogB` array)

**Reference:**
- Existing B-004: starts around line 80 in `posts-blog-b.ts`
- Existing B-001: lines 4-27 for tone reference (수다 톤, ~거든요, ~더라고요, ㅎㅎ)
- Spec: `docs/superpowers/specs/2026-03-15-gold-standard-b004-design.md` — Block 1-10 design

**Content generation rules:**
- Write original Korean blog content in Blog B persona voice (살림하는엄마)
- Tone: 친근한 수다 (~거든요, ~더라고요, ㅎㅎ)
- NO product name ("차량용 태양열 방향제") in body text — use indirect descriptions only
- "다이소 방향제" keyword appears in Block 1, Block 10, and tags (total ~4 times naturally)
- Each text block: 2-4 sentences as specified per block in the spec

- [ ] **Step 1: Read the current B-004 post**

Read `src/lib/content/posts-blog-b.ts` and locate the `b-004` entry. Note the exact start and end lines for replacement.

- [ ] **Step 2: Replace B-004 with rewritten post**

Replace the entire `b-004` object in the `postsBlogB` array with the new version. The new post must have:

**Meta fields (unchanged except tags):**
```typescript
id: 'b-004',
title: '다이소 방향제 써봤는데.. 남편 차엔 이게 나았어요',
category: '차량용품',
date: '9일 전',
author: '살림하는엄마',
authorProfileImage: '',
headerImage: '',
tags: ['다이소 방향제 추천', '방향제 추천', '차량 방향제', '남편 차'],
```

**Content array — 10 blocks following the 5-act structure:**

```typescript
content: [
  // Act 1: Hook
  { id: 'b004-1', type: 'text', content: '...' },
  // 3-4 sentences. 남편 차 냄새 고민 → 다이소 방향제부터 시작한 이유.
  // Must include "다이소 방향제" keyword naturally.
  // Tone example: "남편 차 탈 때마다 은근 냄새가 신경 쓰이거든요."

  { id: 'b004-2', type: 'image', src: '/posts/b-004-01.jpg', caption: '다이소에서 사 온 차량용 방향제' },

  // Act 2: 시도
  { id: 'b004-3', type: 'text', content: '...' },
  // 2-3 sentences. 어떤 걸 샀는지, 가격, 남편 차에 달아준 장면.

  { id: 'b004-4', type: 'text', content: '...' },
  // 2-3 sentences. 남편 반응 "오 향 괜찮은데?", 처음엔 만족.

  // Act 3: 실패
  { id: 'b004-5', type: 'text', content: '...' },
  // 3-4 sentences. 며칠 후 향 사라짐. 아쉬움.

  { id: 'b004-6', type: 'image', src: '/posts/b-004-02.jpg', caption: '남편 차 대시보드에 올려둔 모습' },

  // Act 4: 발견
  { id: 'b004-7', type: 'text', content: '...' },
  // 3-4 sentences. 햇빛으로 돌아가는 타입 발견. 선 없고 번호판 겸용.
  // NO product name. Use indirect: "햇빛 받으면 알아서 돌아가는 타입"

  { id: 'b004-8', type: 'image', src: '/posts/b-004-03.jpg', caption: '지금 남편 차에 올려둔 방향제' },

  // Act 5: 만족 + 정리
  { id: 'b004-9', type: 'text', content: '...' },
  // 2-3 sentences. 2주째 사용 중. 남편이 직접 관리.

  { id: 'b004-10', type: 'text', content: '...' },
  // 2-3 sentences. SEO wrap-up. "다이소 방향제" keyword 재삽입.
  // 다이소 = 테스트용 OK, 오래 쓸 거면 다른 선택지.
],
```

**Comments array — 5 comments, link exactly 1 time:**

```typescript
comments: [
  { id: 1, content: '다이소 방향제 저도 써봤는데 진짜 일주일이면 끝이에요 ㅠㅠ', author: '꽃피는날', timestamp: Date.now() - 9 * 86400000 + 4 * 3600000, likes: 4, isLiked: false },
  { id: 2, content: '맞아요~ 처음엔 괜찮은데 금방 날아가더라고요 ㅎㅎ', author: '살림하는엄마', timestamp: Date.now() - 9 * 86400000 + 6 * 3600000, likes: 1, isLiked: false, parentId: 1 },
  { id: 3, content: '혹시 지금 쓰시는 거 어디서 구매하셨어요? 선 없는 거 찾고 있었거든요', author: '차안이좋아', timestamp: Date.now() - 8 * 86400000 + 2 * 3600000, likes: 2, isLiked: false },
  { id: 4, content: '여기서 봤어요~ https://sjhur3601.cafe24.com/ 번호판 겸용이라 깔끔해요', author: '살림하는엄마', timestamp: Date.now() - 8 * 86400000 + 5 * 3600000, likes: 1, isLiked: false, parentId: 3 },
  { id: 5, content: '남편한테 보여줬더니 본인이 직접 사겠대요 ㅋㅋ', author: '두아이맘', timestamp: Date.now() - 7 * 86400000 + 1 * 3600000, likes: 3, isLiked: false },
],
```

**Remaining post fields:**

```typescript
isLiked: false,
likeCount: 16,
commentsEnabled: true,
createdAt: Date.now() - 9 * 86400000,
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run build
```

Expected: build succeeds with no type errors.

- [ ] **Step 4: Content quality check**

Read back the completed B-004 post and verify:
- [ ] No product name ("차량용 태양열 방향제") in any text block
- [ ] "다이소 방향제" appears in Block 1 and Block 10 (+ title + tags = 4 total)
- [ ] Cafe24 link appears exactly once (comment #4 only)
- [ ] Each text block is 2-4 sentences
- [ ] Tone matches Blog B persona (~거든요, ~더라고요, ㅎㅎ)
- [ ] Block IDs are sequential b004-1 through b004-10
- [ ] Image blocks have `type: 'image'`, `src`, and `caption`
- [ ] All 5 comments have `isLiked: false`
- [ ] Comment timestamps are staggered realistically

- [ ] **Step 5: Commit**

```bash
git add src/lib/content/posts-blog-b.ts
git commit -m "content: rewrite B-004 as gold standard (10 blocks, 5-act narrative)"
```

---

## Chunk 2: Writing Guide

### Task 2: Create Blog B Writing Guide

**Files:**
- Create: `docs/writing-guide-blog-b.md`

**Reference:**
- Spec Sections 1-6: `docs/superpowers/specs/2026-03-15-gold-standard-b004-design.md` (lines 150-220)
- Completed B-004 post from Task 1 (for Section 6 annotated text)

- [ ] **Step 1: Create the writing guide**

Create `docs/writing-guide-blog-b.md` with 6 sections as defined in the spec. The guide must be written in Korean (it's for Korean blog content).

**Document structure:**

```markdown
# Blog B 글쓰기 가이드 — 살림엄마의 소소일상

> 이 가이드는 Blog B 글을 작성하거나 수정할 때 참고하는 문서입니다.
> B-004 ("다이소 방향제") 글을 gold standard로 삼습니다.

## 1. 페르소나 규칙

- 필명: 살림하는엄마
- 설정: 50대 초반 여성, 남편·아들 차를 챙기는 주부
- 말투 패턴:
  - 문장 끝: ~거든요, ~더라고요, ~잖아요, ~인 거죠
  - 감정: ㅎㅎ (긍정), ㅠㅠ (아쉬움), ㅋㅋ (웃김)
  - 남편 언급: "남편이~", "남편 차에~" (자연스럽게)
- 금지어:
  - 제품명 (차량용 태양열 방향제) → "햇빛으로 돌아가는 타입" 등 간접 표현 사용
  - 광고성 표현 ("강력 추천!", "최고의~", "꼭 사세요!")
  - 존댓말 과잉 ("~하겠습니다", "~드립니다")

### Good vs Bad

| Good | Bad |
|------|-----|
| "그래서 요즘은 이거 쓰고 있는데, 나쁘지 않아요." | "태양열 방향제를 강력 추천합니다! 최고의 가성비!" |
| "남편이 직접 닦고 관리하는 거 보면 마음에 든 거 맞는 거죠 ㅎㅎ" | "남편도 매우 만족하셨습니다." |
| "향이 은근 오래가더라고요." | "향 지속력이 매우 우수한 제품입니다." |

## 2. 5단계 서사 구조

모든 글은 이 서사 흐름을 따릅니다:

| 단계 | 역할 | 블록 수 | 핵심 질문 |
|------|------|---------|-----------|
| Hook | 검색 의도 연결 | text 1 + image 1 | "왜 이 글을 읽어야 하지?" |
| 시도 | 기존 방법 시도 | text 1~2 | "처음에 뭘 해봤지?" |
| 실패 | 한계/아쉬움 | text 1 + image 1 | "왜 안 됐지?" |
| 발견 | 대안 발견 (제품 간접 노출) | text 1 + image 1 | "어떻게 알게 됐지?" |
| 만족 + 정리 | 현재 만족 + SEO 요약 | text 2 | "지금은 어때?" |

**총 블록 수:** 8~10개 (text 6~7 + image 3)

### 각 단계 사용법

- **Hook:** 검색자의 pain point를 첫 문장에. 타겟 키워드를 자연스럽게 삽입.
- **시도:** 구체적 디테일 (가격, 장소, 장면). 초반 긍정 → 나중에 실패와 대비.
- **실패:** 솔직한 한계. 과장 없이. "좀 아쉽더라고요" 정도.
- **발견:** 제품명 절대 불가. "우연히 본 건데~", "햇빛으로 돌아가는~" 등 간접만.
- **만족 + 정리:** 감정적 마무리 → SEO 키워드 재삽입으로 wrap-up.

## 3. 키워드 삽입 규칙

- **Title:** 반드시 타겟 키워드 포함
- **Block 1 (Hook):** 첫 문단에 자연스럽게 1회
- **마지막 블록 (정리):** 마무리에 1회
- **Tags:** 타겟 키워드 포함
- **Total:** 3~4회. 5회 이상은 과잉.

### Good vs Bad

| Good | Bad |
|------|-----|
| "다이소 방향제를 먼저 사봤거든요." | "다이소 방향제 추천 다이소 방향제 후기 다이소 방향제 비교..." |
| "결국 다이소 방향제는 테스트용으로는 괜찮았어요." | "다이소 방향제 다이소 방향제 다이소 방향제..." |

## 4. 댓글 패턴

5개 댓글 공식:

| # | 역할 | likes | 특징 |
|---|------|-------|------|
| 1 | 공감 | 3~5 | 독자가 같은 경험 공유 |
| 2 | 블로거 호응 | 0~2 | 짧은 동의. parentId: 1. **링크 없음** |
| 3 | 질문 | 1~3 | 자연스러운 구매 관심 |
| 4 | 블로거 답글 + 링크 | 0~2 | cafe24 link + 한 줄 설명. parentId: 3 |
| 5 | 잡담 | 1~4 | 가벼운 에피소드, 사회적 증거 |

**링크 규칙:** 전체 댓글에서 cafe24 링크 **정확히 1회** (댓글 #4에서만).

**timestamp 패턴:** post + 4h, +6h, +1d 2h, +1d 5h, +2d 1h (자연스럽게 분산)

## 5. 이미지 배치 규칙

- **위치:** Hook 뒤 (블록 2), 실패 뒤 (블록 6), 발견 뒤 (블록 8) — 총 3장
- **Block format:** `{ id: 'bXXX-N', type: 'image', src: '/posts/b-XXX-0N.jpg', caption: '...' }`
- **Caption:** 짧고 설명적. 1문장.
- **Image prompt 형식:** `iPhone 15 photo, [subject], [setting], [lighting], [mood]`

## 6. B-004 주석 달린 전문 (Gold Standard)

아래는 B-004 완성본의 각 블록에 작성 의도를 주석으로 단 것입니다.
새 글을 쓸 때 이 패턴을 참고하세요.
```

**Section 6 content:** Copy the final B-004 text blocks from the completed Task 1. For each block, add inline annotations in the following format:

```
### Block 1 — Hook
> "남편 차 탈 때마다 은근 냄새가 신경 쓰이거든요..."

- **WHY:** 검색자의 pain point를 첫 문장에 배치. "다이소 방향제"를 자연스럽게 끌어옴.
- **TONE:** ~거든요 ending = 수다 시작 신호. 첫 문장부터 페르소나 확립.
- **SEO:** 타겟 키워드 "다이소 방향제" 첫 등장.
```

Repeat this pattern for all 10 blocks.

- [ ] **Step 2: Verify build**

```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run build
```

Expected: build succeeds (new .md file doesn't affect build, but verify no accidental changes).

- [ ] **Step 3: Commit**

```bash
git add docs/writing-guide-blog-b.md
git commit -m "docs: add Blog B writing guide with annotated B-004 gold standard"
```

---

## Chunk 3: Verification

### Task 3: Final verification

- [ ] **Step 0: Verify scope of changes**

```bash
cd /Users/jun/Projects/Naver-blog-clone && git diff --name-only HEAD~2
```

Expected: only these two files appear:
- `src/lib/content/posts-blog-b.ts`
- `docs/writing-guide-blog-b.md`

If other files appear, investigate and revert unintended changes before proceeding.

- [ ] **Step 1: Run lint**

```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run lint
```

Expected: no errors.

- [ ] **Step 2: Run build**

```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run build
```

Expected: successful build, no type errors.

- [ ] **Step 3: Content spot-check**

Read `src/lib/content/posts-blog-b.ts` (B-004 entry) and verify:
- No product name in any text block content
- Cafe24 link in exactly 1 comment (comment #4)
- Block IDs: `b004-1` through `b004-10` (sequential)
- All comments have `isLiked: false`
- `likeCount: 16`

Read `docs/writing-guide-blog-b.md` and verify:
- Section 6 contains all 10 blocks with annotations
- No product name in Good examples
- Comment pattern section specifies 1 link rule

- [ ] **Step 4: Fix any issues and commit**

```bash
git add src/lib/content/posts-blog-b.ts docs/writing-guide-blog-b.md
git commit -m "fix: address content or guide issues"
```

(Skip this step if no issues found.)
