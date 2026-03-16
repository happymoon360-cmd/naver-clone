# Blog Content Round 2 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 10 blog posts (5 per blog) and update blog configurations (names, colors) based on keyword research.

**Architecture:** Static content in TypeScript arrays. Each post follows the existing `Post` type from `src/store/usePostStore.ts`. No database, no API — just append to existing arrays in `posts-blog-a.ts` and `posts-blog-b.ts`.

**Tech Stack:** Next.js 16, TypeScript, static content

**Spec:** `docs/superpowers/specs/2026-03-15-blog-content-round2-design.md`

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `.env.blog-a` | Modify | Set `NEXT_PUBLIC_BLOG_NAME=깔드의 드라이브 일지` |
| `.env.blog-b` | Modify | Set blog name, primary colors |
| `src/lib/content/posts-blog-a.ts` | Modify | Add posts A-002 through A-006 |
| `src/lib/content/posts-blog-b.ts` | Modify | Add posts B-002 through B-006 |

---

## Chunk 1: Config + Blog A Posts

### Task 1: Update env config files

**Files:**
- Modify: `.env.blog-a` (line 2)
- Modify: `.env.blog-b` (lines 2, 8-9)

- [ ] **Step 1: Update `.env.blog-a`**

Change line 2:
```
NEXT_PUBLIC_BLOG_NAME=깔드의 드라이브 일지
```

- [ ] **Step 2: Update `.env.blog-b`**

Change lines 2, 8-9:
```
NEXT_PUBLIC_BLOG_NAME=살림엄마의 소소일상
```
```
NEXT_PUBLIC_COLOR_PRIMARY=#f472b6
NEXT_PUBLIC_COLOR_PRIMARY_HOVER=#ec4899
```

(`NEXT_PUBLIC_META_PIXEL_ID` stays `TBD` — out of scope)

- [ ] **Step 3: Commit**

```bash
git add .env.blog-a .env.blog-b
git commit -m "config: set blog names and Blog B color theme"
```

---

### Task 2: Write Blog A posts (A-002, A-003)

**Files:**
- Modify: `src/lib/content/posts-blog-a.ts`

**Reference:** Existing `a-001` post for exact structure, tone, and field patterns.

**Conventions:**
- Content block IDs: `a002-1`, `a002-2`, etc.
- Comment IDs: sequential from 1 within each post
- Image paths: `/posts/a-002-01.jpg`, `/posts/a-002-header.jpg` (placeholders)
- Author: `깔끔한드라이버`, profile: `/profile-a.jpg`
- No product name in body text. Product link only in comment replies.
- `createdAt`: use `Date.now() - N * 86400000` matching the `date` field
- Comment `likes`: 0~3, varied to look natural
- **Content generation:** The implementing agent must compose original Korean blog content matching the persona's voice, tone, and angle as described in the spec.

- [ ] **Step 1: Add post A-002 (주차 알림판)**

Append to the `postsBlogA` array. Follow spec section "A-002":
- id: `'a-002'`
- title: `'주차 알림판 뭐 쓰세요? 번호판 겸용으로 바꿨습니다'`
- category: `'차량용품'`, date: `'4일 전'`
- tags: `['주차 알림판', '주차번호판', '차량용품', '대시보드']`
- 5~6 content blocks (text + image), tone: 담백한 비교
- Angle: 기존 주차 알림판 불만 → 번호판 겸용 제품으로 교체
- 2~3 comments: "이거 어디서 구하셨어요?" → cafe24 링크 답글
- likeCount: randomize 5~20
- createdAt: `Date.now() - 4 * 86400000`

- [ ] **Step 2: Add post A-003 (다이소 차량용품)**

Append to the `postsBlogA` array. Follow spec section "A-003":
- id: `'a-003'`
- title: `'다이소 차량용품 써본 것들 솔직 정리'`
- category: `'차량용품'`, date: `'6일 전'`
- tags: `['다이소', '차량용품', '다이소 차량용품', '가성비']`
- 5~7 content blocks, tone: 리스트형, 각 아이템 한줄평
- Angle: 다이소 차량용품 3~4가지 후기 → "결국 쓰는 건"
- 2~3 comments: "방향제는 다이소 말고 뭐 쓰세요?" → 자연스러운 제품 언급
- createdAt: `Date.now() - 6 * 86400000`

- [ ] **Step 3: Verify build**

```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run build
```

Expected: build succeeds with no type errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/content/posts-blog-a.ts
git commit -m "content: add Blog A posts A-002 (주차 알림판) and A-003 (다이소 차량용품)"
```

---

### Task 3: Write Blog A posts (A-004, A-005, A-006)

**Files:**
- Modify: `src/lib/content/posts-blog-a.ts`

- [ ] **Step 1: Add post A-004 (다이소 방향제)**

Follow spec section "A-004":
- id: `'a-004'`
- title: `'다이소 방향제 vs 태양열 방향제, 한 달 써본 후기'`
- category: `'차량용품'`, date: `'8일 전'`
- tags: `['다이소 방향제', '태양열 방향제', '방향제 비교', '차량 방향제']`
- 5~7 content blocks, tone: 솔직 비교 ("가격은 다이소가 / 지속력은")
- Angle: 다이소 방향제 장단점 → 태양열 방향제 비교
- 2~3 comments: "태양열 방향제 가격이 얼마예요?" → "2만원대였습니다" + 링크
- createdAt: `Date.now() - 8 * 86400000`

- [ ] **Step 2: Add post A-005 (차 꾸미기)**

Follow spec section "A-005":
- id: `'a-005'`
- title: `'깔끔하게 차 꾸미기, 대시보드 정리 꿀팁'`
- category: `'차량용품'`, date: `'11일 전'`
- tags: `['차 꾸미기', '대시보드 정리', '차량 인테리어', '미니멀']`
- 5~6 content blocks, tone: 팁 나열, 담백하게
- Angle: 대시보드 미니멀 정리 → 겸용 제품 활용
- 2 comments: "번호판이랑 방향제 겸용인 거 처음 봤어요" → 자연스러운 반응
- createdAt: `Date.now() - 11 * 86400000`

- [ ] **Step 3: Add post A-006 (새차)**

Follow spec section "A-006":
- id: `'a-006'`
- title: `'새차 출고 후 제일 먼저 한 세 가지'`
- category: `'일상'`, date: `'14일 전'`
- tags: `['새차', '출고', '블랙박스', '차량용품', '방향제']`
- 5~7 content blocks, tone: 리스트형, 경험담
- Angle: 출고 루틴 (블박, 번호판, 방향제)
- 2~3 comments: "방향제 어떤 거예요? 선 연결 없는 건가요?" → 태양열 설명 + 링크
- createdAt: `Date.now() - 14 * 86400000`

- [ ] **Step 4: Verify build**

```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/content/posts-blog-a.ts
git commit -m "content: add Blog A posts A-004 (다이소 방향제), A-005 (차 꾸미기), A-006 (새차)"
```

---

## Chunk 2: Blog B Posts

### Task 4: Write Blog B posts (B-002, B-003)

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts`

**Reference:** Existing `b-001` post for exact structure, tone, and field patterns.

**Conventions:**
- Content block IDs: `b002-1`, `b002-2`, etc.
- Author: `살림하는엄마`, profile: `/profile-b.jpg`
- Tone: 친근한 수다 톤 ("~거든요", "~더라고요", "ㅎㅎ")
- No product name in body. Product link only in comment replies.

- [ ] **Step 1: Add post B-002 (남편 생일 선물)**

Follow spec section "B-002":
- id: `'b-002'`
- title: `'남편 생일 선물 뭐 사지? 실용적인 거 골라봤어요'`
- category: `'일상'`, date: `'5일 전'`
- tags: `['남편 생일 선물', '실용적 선물', '남편 선물', '차량용품']`
- 5~7 content blocks, tone: 수다 톤
- Angle: 매년 고민 → 후보 3~4개 → 결국 선택
- 2~3 comments: "저도 남편 선물 고민인데 이거 괜찮네요~" → 감사 + 링크
- createdAt: `Date.now() - 5 * 86400000`

- [ ] **Step 2: Add post B-003 (실용적인 선물)**

Follow spec section "B-003":
- id: `'b-003'`
- title: `'실용적인 선물 고르는 법, 안 쓰면 의미 없잖아요'`
- category: `'일상'`, date: `'7일 전'`
- tags: `['실용적인 선물', '선물 추천', '가성비 선물', '차량용품']`
- 5~6 content blocks, tone: 공감형
- Angle: 선물 줬는데 안 쓰는 경험 → 매일 쓰는 실용템 추천
- 2 comments: "차량용품 선물 생각 못 했는데 좋은 아이디어네요" → 동의 + 링크
- createdAt: `Date.now() - 7 * 86400000`

- [ ] **Step 3: Verify build**

```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/content/posts-blog-b.ts
git commit -m "content: add Blog B posts B-002 (남편 생일 선물) and B-003 (실용적인 선물)"
```

---

### Task 5: Write Blog B posts (B-004, B-005, B-006)

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts`

- [ ] **Step 1: Add post B-004 (다이소 방향제 추천)**

Follow spec section "B-004":
- id: `'b-004'`
- title: `'다이소 방향제 써봤는데.. 남편 차엔 이게 나았어요'`
- category: `'차량용품'`, date: `'9일 전'`
- tags: `['다이소 방향제', '방향제 추천', '차량 방향제', '남편 차']`
- 5~7 content blocks, tone: 솔직 비교
- Angle: 다이소 방향제 → 향 금방 날아감 → 대안으로 바꿈
- 2~3 comments: "남편 차에 어떤 거 올려놓으셨어요?" → 제품 설명 + 링크
- createdAt: `Date.now() - 9 * 86400000`

- [ ] **Step 2: Add post B-005 (자동차 꾸미기)**

Follow spec section "B-005":
- id: `'b-005'`
- title: `'남편 차 몰래 꾸며줬더니 반응이 ㅎㅎ'`
- category: `'일상'`, date: `'12일 전'`
- tags: `['자동차 꾸미기', '남편 차', '차량 인테리어', '깜짝 선물']`
- 5~7 content blocks, tone: 에피소드형
- Angle: 남편 차 소소하게 꾸며줌 → 반응 에피소드
- 2 comments: "저도 남편 차 해줘야겠어요 ㅎㅎ" → 호응
- createdAt: `Date.now() - 12 * 86400000`

- [ ] **Step 3: Add post B-006 (커피 방향제)**

Follow spec section "B-006":
- id: `'b-006'`
- title: `'커피향 방향제 찾다가 결국 이걸로 정착'`
- category: `'차량용품'`, date: `'14일 전'`
- tags: `['커피 방향제', '커피향', '차량 방향제', '방향제 추천']`
- 5~7 content blocks, tone: 후기형
- Angle: 커피향 좋아서 여러 개 써봄 → 향 비교 → 최종 선택
- 2~3 comments: "커피향 말고 다른 향도 있나요?" → 답변 + 링크
- createdAt: `Date.now() - 14 * 86400000`

- [ ] **Step 4: Verify build**

```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/content/posts-blog-b.ts
git commit -m "content: add Blog B posts B-004 (다이소 방향제), B-005 (자동차 꾸미기), B-006 (커피 방향제)"
```

---

## Chunk 3: Verification

### Task 6: Final verification and lint

- [ ] **Step 1: Run lint**

```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run lint
```

Expected: no errors. Fix any warnings.

- [ ] **Step 2: Run build**

```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run build
```

Expected: successful build, no type errors.

- [ ] **Step 3: Spot-check content quality**

Read `src/lib/content/posts-blog-a.ts` and `src/lib/content/posts-blog-b.ts`. Verify:
- No product name in any post body text
- All comment Q&As include cafe24 link in reply
- Content block IDs follow convention (`a002-1`, `b003-1`, etc.)
- Like counts are varied (5~20 range)
- Comment timestamps are staggered realistically
- Tags include target keyword

- [ ] **Step 4: Fix any issues and commit**

```bash
git add src/lib/content/posts-blog-a.ts src/lib/content/posts-blog-b.ts
git commit -m "fix: address lint and content issues"
```

(Skip this step if no issues found.)
