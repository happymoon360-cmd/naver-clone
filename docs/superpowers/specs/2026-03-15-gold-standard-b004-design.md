# Gold Standard Blog Post: B-004 Rewrite + Writing Guide

## Goal

Rewrite Blog B post B-004 ("다이소 방향제 써봤는데.. 남편 차엔 이게 나았어요") as a high-quality gold standard, then produce an annotated writing guide that agents can use to replicate this quality across all Blog B posts.

## Deliverables

1. **B-004 rewritten post** — replaces current 4-block post in `src/lib/content/posts-blog-b.ts`
2. **Blog B Writing Guide** — `docs/writing-guide-blog-b.md`, annotated reference for agent-driven content rewriting

## Context

- Blog B persona: 살림하는엄마 (50대 초반 여성, 남편·아들 차 챙기는 주부)
- Tone: 친근한 수다 (~거든요, ~더라고요, ㅎㅎ)
- Product: 태양열 차량용 방향제 + 주차번호판 겸용
- Product exposure rule: **NO product name in body text.** Only indirect descriptions ("햇빛으로 돌아가는 타입", "선 없는 거"). Product link only in comment replies.
- Target keyword: "다이소 방향제 추천" (500/month, Medium competition, ₩489 CPC)
- Cafe24 link: `https://sjhur3601.cafe24.com/`

---

## B-004 Post Design

### Meta

- **id:** `b-004`
- **title:** `다이소 방향제 써봤는데.. 남편 차엔 이게 나았어요` (unchanged)
- **category:** `차량용품`
- **date:** `9일 전`
- **tags:** `['다이소 방향제 추천', '방향제 추천', '차량 방향제', '남편 차']`
- **author:** `살림하는엄마`
- **authorProfileImage:** `''` (placeholder)
- **headerImage:** `''` (placeholder)
- **likeCount:** 16
- **isLiked:** `false`
- **commentsEnabled:** `true`
- **createdAt:** `Date.now() - 9 * 86400000`

### Narrative Structure: 5-Act Episode

The post follows a "문제 → 시도 → 실패 → 발견 → 만족" arc. Each act is 1~2 text blocks + optional image placeholder.

**Note:** This gold standard uses 10 content blocks (7 text + 3 image), exceeding the original spec's 5-7 block guideline. This is intentional — the expanded structure creates a richer narrative for the gold standard reference. When rewriting other posts, agents should target 8-10 blocks following this template.

**Block IDs:** Sequential `b004-1` through `b004-10`.

#### Block 1 (`b004-1`) — Hook (text)
- **Act:** Hook
- **Purpose:** 검색 의도 즉시 연결. "다이소 방향제" 키워드 자연 삽입.
- **Content direction:** 남편 차 냄새 고민 → 다이소 방향제부터 시작한 이유
- **Tone:** "남편 차 탈 때마다 은근 냄새가 신경 쓰이거든요."
- **Length:** 3~4 문장

#### Block 2 (`b004-2`) — Hook image (image)
- **Act:** Hook
- **src:** `/posts/b-004-01.jpg` (placeholder)
- **caption:** `다이소에서 사 온 차량용 방향제`
- **Image prompt:** `iPhone 15 photo, Daiso air freshener in a Korean woman's hand, Korean home background, natural lighting, casual feel`

#### Block 3 (`b004-3`) — 시도 (text)
- **Act:** 시도
- **Purpose:** 다이소 방향제 선택 이유 (가격, 접근성). 구체적 디테일로 신뢰감.
- **Content direction:** 어떤 걸 샀는지, 가격, 남편 차에 달아준 장면
- **Tone:** "천원도 안 하니까 일단 하나 집어왔어요."
- **Length:** 2~3 문장

#### Block 4 (`b004-4`) — 시도 반응 (text)
- **Act:** 시도
- **Purpose:** 초반 긍정 반응 → 나중에 실패와 대비됨
- **Content direction:** 남편 반응 "오 향 괜찮은데?", 처음엔 만족했던 기억
- **Tone:** 대화체 + ㅎㅎ
- **Length:** 2~3 문장

#### Block 5 (`b004-5`) — 실패 (text)
- **Act:** 실패
- **Purpose:** 전환점. 다이소 방향제의 한계 솔직하게.
- **Content direction:** 며칠 후 향 사라짐. "코 가까이 대야 겨우 나는 수준." 아쉬움.
- **Tone:** "근데 일주일 지나니까 거의 무향이더라고요."
- **Length:** 3~4 문장

#### Block 6 (`b004-6`) — 실패 image (image)
- **Act:** 실패
- **src:** `/posts/b-004-02.jpg` (placeholder)
- **caption:** `남편 차 대시보드에 올려둔 모습`
- **Image prompt:** `iPhone 15 photo, car dashboard with small Daiso-style air freshener, Korean sedan interior, slightly messy everyday car, natural daylight`

#### Block 7 (`b004-7`) — 발견 (text)
- **Act:** 발견
- **Purpose:** 대안 발견. 간접 표현으로 제품 소개. 제품명 사용 금지.
- **Content direction:** "다른 거 없나" 찾다가 햇빛으로 돌아가는 타입 알게 됨. 선 없고 번호판 겸용이라 깔끔.
- **Tone:** "그러다 우연히 본 건데, 햇빛 받으면 알아서 돌아가는 타입이 있더라고요."
- **Length:** 3~4 문장

#### Block 8 (`b004-8`) — 발견 image (image)
- **Act:** 발견
- **src:** `/posts/b-004-03.jpg` (placeholder)
- **caption:** `지금 남편 차에 올려둔 방향제`
- **Image prompt:** `iPhone 15 photo, car dashboard with solar air freshener, seen from passenger seat perspective, Korean sedan, warm afternoon light`

#### Block 9 (`b004-9`) — 만족 (text)
- **Act:** 만족
- **Purpose:** 현재 상태. 감정적 만족으로 마무리.
- **Content direction:** 2주째 사용 중. 향 은은하게 유지. 남편이 직접 관리하기 시작.
- **Tone:** "남편이 직접 닦고 관리하는 거 보면 마음에 든 거 맞는 거죠 ㅎㅎ"
- **Length:** 2~3 문장

#### Block 10 (`b004-10`) — 만족/정리 (text)
- **Act:** 만족 (wrap-up)
- **Purpose:** SEO wrap-up. 키워드 재삽입. 검색 유입자를 위한 요약.
- **Content direction:** 다이소 = 테스트용 OK, 오래 쓸 거면 다른 선택지. 용도에 따라 다름.
- **Tone:** 담백한 정리. "다이소 방향제가 나쁜 건 아니에요. 다만..."
- **Length:** 2~3 문장

### Keyword Strategy

| Location | Keyword | Frequency |
|----------|---------|-----------|
| Title | 다이소 방향제 | 1 |
| Block 1 (Hook) | 다이소 방향제 | 1 |
| Block 10 (정리) | 다이소 방향제 | 1 |
| Tags | 다이소 방향제 추천 | 1 |
| **Total** | | **4회** (자연스럽게 분산) |

Secondary keywords woven in naturally: 방향제 추천, 차량 방향제, 남편 차

### Comments Design

5 comments total. **Link appears exactly once** (comment #4). All comments: `isLiked: false`.

**Note:** Existing Blog B posts have 2 links per post. This gold standard intentionally tightens to 1 link for a more natural feel. Other posts will be updated to match when rewritten.

| # | id | author | content | parentId | likes | purpose |
|---|-----|--------|---------|----------|-------|---------|
| 1 | 1 | 꽃피는날 | "다이소 방향제 저도 써봤는데 진짜 일주일이면 끝이에요 ㅠㅠ" | — | 4 | 공감 |
| 2 | 2 | 살림하는엄마 | "맞아요~ 처음엔 괜찮은데 금방 날아가더라고요 ㅎㅎ" | 1 | 1 | 블로거 호응 (링크 없음) |
| 3 | 3 | 차안이좋아 | "혹시 지금 쓰시는 거 어디서 구매하셨어요? 선 없는 거 찾고 있었거든요" | — | 2 | 자연스러운 질문 |
| 4 | 4 | 살림하는엄마 | "여기서 봤어요~ https://sjhur3601.cafe24.com/ 번호판 겸용이라 깔끔해요" | 3 | 1 | **유일한 링크** |
| 5 | 5 | 두아이맘 | "남편한테 보여줬더니 본인이 직접 사겠대요 ㅋㅋ" | — | 3 | 잡담/사회적 증거 |

**Comment timestamp pattern:**
- Comment 1: post + 4h
- Comment 2: post + 6h (블로거 답글)
- Comment 3: post + 1d 2h
- Comment 4: post + 1d 5h (블로거 답글)
- Comment 5: post + 2d 1h

---

## Writing Guide Design

**File:** `docs/writing-guide-blog-b.md`

### Section 1: Persona Rules

- **Name:** 살림하는엄마
- **Age/Context:** 50대 초반, 남편·아들 차를 챙기는 주부
- **말투 패턴:**
  - Endings: ~거든요, ~더라고요, ~잖아요, ~인 거죠
  - 감정 표현: ㅎㅎ (긍정), ㅠㅠ (아쉬움), ㅋㅋ (웃김)
  - 남편 언급: "남편이~", "남편 차에~" (자연스럽게 등장)
- **금지어:** 제품명(차량용 태양열 방향제), 광고성 표현("강력 추천!", "최고의~"), 존댓말 과잉
- **Good 예시:** "그래서 요즘은 이거 쓰고 있는데, 나쁘지 않아요."
- **Bad 예시:** "태양열 방향제를 강력 추천합니다! 최고의 가성비!"

### Section 2: 5-Act Narrative Template

For each post, map the topic to this arc:

| Act | Role | Blocks | Key question |
|-----|------|--------|-------------|
| Hook | 검색 의도 연결 | 1 text + 1 image | "왜 이 글을 읽어야 하지?" |
| 시도 | 기존 방법/제품 시도 | 1~2 text | "처음에 뭘 해봤지?" |
| 실패 | 한계/아쉬움 | 1 text + 1 image | "왜 안 됐지?" |
| 발견 | 대안 발견 (제품 간접 노출) | 1 text + 1 image | "어떻게 알게 됐지?" |
| 만족 + 정리 | 현재 만족 + SEO 요약 | 2 text | "지금은 어때?" |

### Section 3: Keyword Insertion Rules

- **Title:** 반드시 타겟 키워드 포함
- **Block 1 (Hook):** 첫 문단에 자연스럽게 1회
- **Block 10 (정리):** 마무리에 1회
- **Tags:** 타겟 키워드 포함
- **Total:** 3~4회. 5회 이상은 과잉.
- **Good:** "다이소 방향제를 먼저 사봤거든요."
- **Bad:** "다이소 방향제 추천 다이소 방향제 후기 다이소 방향제 비교..."

### Section 4: Comment Pattern

5-comment formula:

1. **공감** — 독자가 같은 경험 공유 (likes 3~5)
2. **블로거 호응** — 짧은 동의, 링크 없음 (parentId: 1, likes 0~2)
3. **질문** — 자연스러운 구매 관심 (likes 1~3)
4. **블로거 답글 + 링크** — cafe24 link, 한 줄 설명 (parentId: 3, likes 0~2)
5. **잡담** — 가벼운 에피소드, 사회적 증거 (likes 1~4)

**Link rule:** 전체 댓글에서 cafe24 링크 정확히 1회.

### Section 5: Image Placement Rules

- **Position:** Hook 뒤, 실패 뒤, 발견 뒤 (총 3장)
- **Image block format:** `{ id: 'bXXX-N', type: 'image', src: '/posts/b-XXX-0N.jpg', caption: '...' }`
- **Caption:** 짧고 설명적. 1문장.
- **Prompt style:** `iPhone 15 photo, [subject], [setting], [lighting], [mood]`

### Section 6: B-004 Annotated Full Text

The complete B-004 post with inline annotations explaining each writing decision. Format:

```
[Block 1 — Hook]
"남편 차 탈 때마다 은근 냄새가 신경 쓰이거든요..."
  ← WHY: 검색자의 pain point를 첫 문장에. "다이소 방향제"를 자연스럽게 끌어옴.
  ← TONE: ~거든요 ending = 수다 시작 신호
```

(Actual content will be written during implementation.)

**Sequencing:** Write B-004 post text first (Deliverable 1), then copy final text into Section 6 with inline annotations (Deliverable 2).

---

## Constraints

- No changes to Post type, ContentBlock type, or any component code.
- Only `src/lib/content/posts-blog-b.ts` (B-004 entry) and `docs/writing-guide-blog-b.md` are modified/created.
- Build must pass after changes.
- Writing guide is Blog B specific. Blog A guide is out of scope.
