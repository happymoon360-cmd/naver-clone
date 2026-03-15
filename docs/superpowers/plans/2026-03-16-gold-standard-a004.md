# Blog A Gold Standard (A-004 + Writing Guide) Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite A-004 as a 10-block gold standard post and create `docs/writing-guide-blog-a.md` as a reusable content guide for all Blog A posts.

**Architecture:** Content-only changes. Replace the existing 4-block A-004 entry in `posts-blog-a.ts` with a 10-block 5-act narrative. Then write an annotated writing guide using the final post as Section 6's reference. No TypeScript type changes, no component code changes.

**Tech Stack:** Next.js (TypeScript), static content arrays, Markdown

---

## Chunk 1: A-004 Post Rewrite

### Task 1: Rewrite A-004 entry in posts-blog-a.ts

**Files:**
- Modify: `src/lib/content/posts-blog-a.ts` (A-004 entry only — lines ~95–120 in current file)

Before starting: read the spec at `docs/superpowers/specs/2026-03-16-gold-standard-a004-design.md` to understand the narrative structure, block psychology, and comment design.

Read the existing file first to understand the A-004 entry shape and surrounding entries. Do NOT touch A-001, A-002, A-003, A-005, A-006.

- [ ] **Step 1: Locate the A-004 entry**

Open `src/lib/content/posts-blog-a.ts`. Find the entry with `id: 'a-004'`. Note the current 4 blocks (`a004-1`, `a004-3`, `a004-4`, `a004-6`) and 4 comments. You will replace both arrays completely.

- [ ] **Step 2: Replace the A-004 entry with the following complete entry**

Replace the entire `a-004` object (from `{` to the closing `},`) with:

```typescript
  {
    id: 'a-004',
    title: '다이소 방향제 한 달 써보고 바꾼 이유',
    category: '차량용품',
    date: '8일 전',
    author: '깔끔한드라이버',
    authorProfileImage: '',
    headerImage: '',
    tags: ['다이소 방향제', '차량 방향제', '방향제 비교', '태양열 방향제'],
    content: [
      {
        id: 'a004-1',
        type: 'text',
        content: 'G80 출고하고 나서 제일 먼저 달아둔 게 다이소 방향제였습니다. 새 차 냄새가 아직 남아 있긴 했는데, 금방 빠진다는 걸 알고 있었거든요. 값도 부담 없고 바로 살 수 있으니 일단 하나 집어왔습니다. 대시보드 위에 올려두고 이 정도면 됐다 싶었습니다.',
      },
      {
        id: 'a004-2',
        type: 'image',
        src: '/posts/a-004-01.jpg',
        caption: '다이소에서 사 온 차량용 방향제',
      },
      {
        id: 'a004-3',
        type: 'text',
        content: '가격이 천 원대라 부담이 없었고, 향도 처음 달았을 때는 생각보다 나쁘지 않았습니다. 자동차 전용 방향제치고는 달지 않고 과하지 않아서 잠시 만족했습니다.',
      },
      {
        id: 'a004-4',
        type: 'text',
        content: '처음 이틀 정도는 괜찮았습니다. 차에 탈 때마다 은은하게 났고, 달아둔 자리도 깔끔했습니다.',
      },
      {
        id: 'a004-5',
        type: 'text',
        content: '그런데 일주일 지나니 향이 거의 안 납니다. 코 가까이 대야 겨우 날 수 있는 수준이었습니다. 더운 날에는 처음 달았을 때 향이 너무 빠르게 퍼졌다가 금방 날아간 것 같았습니다. 결국 다른 걸 찾아보게 됐습니다.',
      },
      {
        id: 'a004-6',
        type: 'image',
        src: '/posts/a-004-02.jpg',
        caption: '대시보드에 올려둔 다이소 방향제',
      },
      {
        id: 'a004-7',
        type: 'text',
        content: '그러다 햇빛만 들어오면 알아서 돌아가는 타입이 있다는 걸 알게 됐습니다. 선 연결이 없고, 번호판 겸용이라 대시보드 위가 덜 복잡해 보였습니다. 따로 달아두던 번호 확인용 물건을 치우고 이걸 하나만 올려두니 눈에 걸리는 게 줄었습니다.',
      },
      {
        id: 'a004-8',
        type: 'image',
        src: '/posts/a-004-03.jpg',
        caption: '지금 대시보드에 올려둔 방향제',
      },
      {
        id: 'a004-9',
        type: 'text',
        content: '지금도 달고 다닙니다. 향이 급하게 치고 들어오지 않고 은은하게 남는 편이라 거슬리지 않습니다. 대시보드가 정리된 것도 나쁘지 않고요.',
      },
      {
        id: 'a004-10',
        type: 'text',
        content: '다이소 방향제가 나쁜 건 아닙니다. 짧게 써보기엔 가격도 부담 없고 접근성도 좋습니다. 다만 오래 둘 생각이라면 지속력을 따져보는 게 낫습니다.',
      },
    ],
    comments: [
      {
        id: 1,
        content: '다이소 방향제 저도 써봤는데 딱 일주일이더군요.',
        author: 'g90주인장',
        timestamp: Date.now() - 8 * 86400000 + 3 * 3600000,
        likes: 4,
        isLiked: false,
      },
      {
        id: 2,
        content: '맞습니다. 처음엔 괜찮았는데 금방 퍼지더군요.',
        author: '깔끔한드라이버',
        timestamp: Date.now() - 8 * 86400000 + 5 * 3600000,
        likes: 1,
        isLiked: false,
        parentId: 1,
      },
      {
        id: 3,
        content: '지금 쓰시는 거 어디서 구하셨나요? 선 없는 타입 맞나요?',
        author: 'GV80입문자',
        timestamp: Date.now() - 8 * 86400000 + 27 * 3600000,
        likes: 2,
        isLiked: false,
      },
      {
        id: 4,
        content: '여기서 봤습니다. https://sjhur3601.cafe24.com/ 태양열이라 선 연결 없습니다.',
        author: '깔끔한드라이버',
        timestamp: Date.now() - 8 * 86400000 + 30 * 3600000,
        likes: 1,
        isLiked: false,
        parentId: 3,
      },
      {
        id: 5,
        content: '번호판 겸용이라는 게 신기하네요. 저도 따로 두는 거 정리하려고 했는데.',
        author: '보배드림러',
        timestamp: Date.now() - 8 * 86400000 + 52 * 3600000,
        likes: 2,
        isLiked: false,
      },
    ],
    isLiked: false,
    likeCount: 18,
    commentsEnabled: true,
    createdAt: Date.now() - 8 * 86400000,
  },
```

- [ ] **Step 3: Verify build passes**

Run from project root:
```bash
npm run build
```
Expected: exit 0, no TypeScript errors. If errors occur, check that all field names match the `Post` type in `src/store/usePostStore.ts`. Do NOT fix issues outside the A-004 entry.

- [ ] **Step 4: Commit**

```bash
git add src/lib/content/posts-blog-a.ts
git commit -m "feat: rewrite A-004 as 10-block gold standard post (혼합형 5-act narrative)"
```

---

## Chunk 2: Blog A Writing Guide

### Task 2: Create docs/writing-guide-blog-a.md

**Files:**
- Create: `docs/writing-guide-blog-a.md`

The writing guide is a Korean-language reference document for agents rewriting Blog A posts A-001~A-003 and A-005~A-006. It has 8 sections. Section 6 contains the annotated full text of A-004 (from Task 1).

- [ ] **Step 1: Create the writing guide file**

Create `docs/writing-guide-blog-a.md` with the following content:

````markdown
# Blog A Writing Guide — 깔드의 드라이브 일지

> **사용 목적:** Blog A 포스트 (A-001~A-006) 작성/고도화 시 참고. A-004가 gold standard.
> **주의:** 이 가이드는 Blog A 전용. Blog B 가이드(`writing-guide-blog-b.md`)와 혼용 금지.

---

## Section 1: 페르소나 규칙

### 기본 설정
- **닉네임:** 깔끔한드라이버
- **나이/맥락:** 40대 후반~50대 남성, 제네시스 오너, 보배드림 커뮤니티 사용자
- **블로그명:** 깔드의 드라이브 일지

### 말투 패턴
- **어미:** ~습니다, ~더군요, ~편이었습니다, ~않았습니다
- **감정 표현:** 없거나 최소화. "나쁘지 않았습니다"가 최대 수준의 긍정 표현
- **차종 언급:** "G80 출고 후~", "제 차에서는~" 형태로 구체적 맥락 제공
- **수치 사용:** "일주일", "이틀", "한 달", "천 원대" 등 구체적 수치로 신뢰도 확보

### 금지 사항
| 금지 | 이유 |
|------|------|
| ㅎㅎ/ㅠㅠ/ㅋㅋ 이모지 | 女性 블로그처럼 읽힘 |
| "정말!", "최고!", "강력 추천!" | 광고 느낌 |
| 존댓말 과잉 (예: "~해주세요") | 보배드림 톤 아님 |
| 제품명 "차량용 태양열 방향제" | 본문 노출 금지 규칙 |
| 감탄사로 시작하는 문장 | 보배드림 스타일 아님 |

### Good vs Bad 예시
**Good:** "일주일 지나니 향이 거의 안 납니다."
**Bad:** "진짜 너무 실망이었어요ㅠㅠ 완전 별로!!"

**Good:** "지금도 달고 다닙니다. 거슬리지 않습니다."
**Bad:** "너무 만족스러워요!! 강력 추천드립니다!!"

---

## Section 2: 혼합형 서사 템플릿

### 기본 원칙
짧은 에피소드로 진입 (동질감) → 보배드림식 담백 비교로 마무리 (신뢰+정보).
감정 피크 없음. 궁금증 누적형 텐션.

### 5-Act 구조표

| Act | 역할 | 블록 수 | 핵심 질문 | 텐션 점수 (1~10) |
|-----|------|--------|----------|-----------------|
| Hook | 동질감 형성 + 키워드 삽입 | 1 text + 1 image | "나도 이 상황이었나?" | 3 — 낮은 시작, 궁금증 씨앗 |
| 시도 | 대비 설정 (처음엔 좋았음) | 2 text | "왜 그걸 먼저 썼지?" | 4→6 — 기대감 형성, Block 4 끝에서 6 (과거형 미완결) |
| 실패 | 구체적 수치로 credibility | 1 text + 1 image | "얼마나 안 됐지?" | 8 — 최저점, "그럼 어떻게?" 집중 |
| 발견 | 대안 발견 (제품 간접 노출) | 1 text + 1 image | "뭘 발견했지?" | 7 — 궁금증 상승, 해결 기대 |
| 만족 + 정리 | 절제된 마무리 + SEO 요약 | 2 text | "결론이 뭐지?" | 4→2 — 담백하게 해소 |

### Blog B vs Blog A 텐션 곡선 차이
- **Blog B:** 감정 피크 있음. 발견 블록에서 "우연히 본 건데" 감정적 전환.
- **Blog A:** 궁금증 누적형. 감정 피크 없이 논리적으로 상승/해소. 극적 전환 없음.

### Open Loop 작성법 (블록 간 연결)

각 텍스트 블록의 **마지막 문장**은 다음 블록으로 독자를 당겨야 한다.

| 패턴 | 방법 | 예시 |
|------|------|------|
| 전환 예고 | "그런데~", "그러다~"로 다음 문제/발견 암시 | "그런데 일주일이 지나니 달라졌습니다." |
| 미완결 | 결론 없이 끝내 다음 블록에서 완성 | "처음 이틀 정도는 괜찮았습니다." (← 이게 왜 과거형인가? → 다음 블록) |
| 질문형 | 독자 스스로 질문을 갖게 | "결국 다른 걸 찾아보게 됐습니다." |

**Bad (닫힌 블록):** "다이소 방향제는 지속력이 짧아서 별로였습니다. 이상입니다."
→ 독자 이탈.

**Good (열린 블록):** "결국 다른 걸 찾아보게 됐습니다."
→ 다음 블록 당김.

---

## Section 3: 키워드 삽입 규칙

| 위치 | 삽입 방식 | 횟수 |
|------|----------|------|
| 제목 | 타겟 키워드 포함 | 1회 |
| Block 1 (Hook) | 첫 문단에 자연스럽게 | 1회 |
| Block 10 (정리) | 마무리 문장에 | 1회 |
| Tags | 타겟 키워드 그대로 | 1회 |
| **합계** | | **3~4회** |

- 5회 이상은 과잉. 키워드 반복 = 스팸처럼 보임.
- Secondary keywords는 본문에 자연스럽게 흩어서 배치.

**Good:** "G80 출고하고 나서 제일 먼저 달아둔 게 다이소 방향제였습니다."
**Bad:** "다이소 방향제 추천 다이소 방향제 후기 다이소 방향제 비교..."

---

## Section 4: 댓글 패턴 (보배드림 5댓글 공식)

### 5댓글 구조

| # | 역할 | 작성자 | 형식 | likes 범위 |
|---|------|--------|------|-----------|
| 1 | 공감 + credibility | 독자 | 같은 경험 + 구체적 수치 | 3~5 |
| 2 | 블로거 호응 | 깔끔한드라이버 | 짧은 동의, 링크 없음 (parentId: 1) | 0~2 |
| 3 | 구매 질문 | 독자 | 정보형 질문 ("선 없는 타입 맞나요?") | 1~3 |
| 4 | 블로거 답글 + **유일한 링크** | 깔끔한드라이버 | cafe24 링크 + 기능 한 줄 (parentId: 3) | 0~2 |
| 5 | 잡담 | 독자 | 차종/대시보드 관련 가벼운 에피소드 | 1~3 |

**A-004 값은 canonical 예시. likes 범위는 A-004 외 다른 포스트 작성 시 적용.**

### 댓글 톤 규칙
- **닉네임:** 차종 기반 (`g90주인장`, `GV80입문자`) 또는 취미 기반 (`보배드림러`, `세차좋아`)
- **말투:** 합니다체 또는 건조한 반말. 이모지 없음.
- **링크 규칙:** 전체 댓글에서 cafe24 링크 정확히 **1회**. comment #4에만.

### 비교: Blog B vs Blog A 댓글 톤
| | Blog B | Blog A |
|--|--------|--------|
| 닉네임 | 꽃피는날, 두아이맘 | g90주인장, GV80입문자 |
| 공감 표현 | "맞아요~ ㅎㅎ" | "맞습니다." |
| 질문 스타일 | 감성형 ("어디서 봤어요?") | 정보형 ("선 없는 타입 맞나요?") |

---

## Section 5: 이미지 배치 규칙

- **위치:** Hook 뒤 (Block 2), 실패 뒤 (Block 6), 발견 뒤 (Block 8) — 총 3장
- **형식:** `{ id: 'aXXX-N', type: 'image', src: '/posts/a-XXX-0N.jpg', caption: '...' }`
- **caption:** 짧고 설명적. 1문장. 합니다체 아닌 명사형. (예: "대시보드에 올려둔 다이소 방향제")
- **Image prompt 형식:** `iPhone 15 photo, [subject], [setting], [lighting], [mood]`

---

## Section 6: A-004 어노테이션 전문

> **사용법:** 각 블록의 WHY/TONE/CREDIBILITY/TENSION을 읽고 다른 포스트 작성 시 동일한 판단 기준 적용.
> **레이블 정의:**
> - `WHY` — 이 블록이 존재하는 이유. 독자 심리/서사 구조에서의 역할.
> - `TONE` — 이 블록의 말투 지침. Good/Bad 예시 포함.
> - `CREDIBILITY` — 신뢰도를 높이는 장치. 수치, 구체성, 공정성 포인트.
> - `TENSION` — 텐션 수준 (1~10)과 다음 블록으로의 연결 방식 (Open Loop).

```
[Block 1 — Hook (text)]
"G80 출고하고 나서 제일 먼저 달아둔 게 다이소 방향제였습니다. 새 차 냄새가 아직
남아 있긴 했는데, 금방 빠진다는 걸 알고 있었거든요. 값도 부담 없고 바로 살 수
있으니 일단 하나 집어왔습니다. 대시보드 위에 올려두고 이 정도면 됐다 싶었습니다."

  ← WHY: G80 차종 명시로 동질감 훅. "나와 같은 상황인 사람"으로 진입.
         남성 독자는 구체적 상황에서만 읽기 시작함. 키워드 "다이소 방향제" 자연 삽입.
  ← TONE: 합니다체. 감탄 없음. "일단 하나 집어왔습니다" = 보배드림 첫 문장 패턴.
  ← CREDIBILITY: 구체적 맥락(출고 직후 + 선택 이유 명시) = 광고 아닌 실제 경험.
  ← TENSION: 3 — 낮은 시작. 문제 없음. Open Loop: "이 정도면 됐다 싶었습니다"
             (과거형) → 이게 왜 과거형인지 다음 블록에서 밝혀짐.

[Block 2 — Hook image]
이미지 블록 — 어노테이션 없음.
src: /posts/a-004-01.jpg | caption: 다이소에서 사 온 차량용 방향제

[Block 3 — 시도 (text)]
"가격이 천 원대라 부담이 없었고, 향도 처음 달았을 때는 생각보다 나쁘지 않았습니다.
자동차 전용 방향제치고는 달지 않고 과하지 않아서 잠시 만족했습니다."

  ← WHY: 대비 설정. 처음엔 좋았다는 점을 먼저 써야 실패 블록이 신뢰를 얻음.
         없으면 "처음부터 나쁜 제품 리뷰"처럼 읽혀 공정성 의심받음.
  ← TONE: 가격 명시("천 원대") = 구체성. "잠시 만족했습니다" = 과거형, 미완결 암시.
  ← CREDIBILITY: 선택 이유 명시 (가격, 향 인상) → 합리적 소비자 포지션.
  ← TENSION: 4 — 기대감 시작. Open Loop: "잠시 만족했습니다" = 만족이 지속되지
             않았음을 암시.

[Block 4 — 시도 반응 (text)]
"처음 이틀 정도는 괜찮았습니다. 차에 탈 때마다 은은하게 났고, 달아둔 자리도 깔끔했습니다."

  ← WHY: 낙차 설정. 이 블록이 있어야 실패 블록의 낙차(6→8)가 의미를 가짐.
         없으면 다이소 = 처음부터 실패 = 공정성 없는 리뷰처럼 읽힘.
  ← TONE: 짧고 건조. "괜찮았습니다" = 과잉 감탄 없음. 전형적 보배드림 톤.
  ← CREDIBILITY: 구체적 기간 "이틀" 명시 → 애매한 "처음엔"보다 신뢰 높음.
  ← TENSION: 6 — 기대감 피크. Open Loop: "처음 이틀" = 이틀 이후는? 독자가
             "그런데 왜 바꿨나?" 질문 발생.

[Block 5 — 실패 (text)]
"그런데 일주일 지나니 향이 거의 안 납니다. 코 가까이 대야 겨우 날 수 있는 수준이었습니다.
더운 날에는 처음 달았을 때 향이 너무 빠르게 퍼졌다가 금방 날아간 것 같았습니다.
결국 다른 걸 찾아보게 됐습니다."

  ← WHY: 신뢰 구축 핵심 블록. 구체적 수치(일주일)와 상황(더운 날)으로 실제 경험 증명.
         모호한 비판 = 광고. 구체적 수치 = 실제 경험.
  ← TONE: "그런데" = 전환 예고 패턴. "결국 다른 걸 찾아보게 됐습니다" = 다음 Act 예고.
  ← CREDIBILITY: "일주일", "거의 무향", "코 가까이 대야" = 수치화된 불편함. 모호하지 않음.
  ← TENSION: 8 — 최저점. Open Loop: "결국 다른 걸 찾아보게 됐습니다" = 발견
             Act로 강하게 당김.

[Block 6 — 실패 image]
이미지 블록 — 어노테이션 없음.
src: /posts/a-004-02.jpg | caption: 대시보드에 올려둔 다이소 방향제

[Block 7 — 발견 (text)]
"그러다 햇빛만 들어오면 알아서 돌아가는 타입이 있다는 걸 알게 됐습니다. 선 연결이 없고,
번호판 겸용이라 대시보드 위가 덜 복잡해 보였습니다. 따로 달아두던 번호 확인용 물건을
치우고 이걸 하나만 올려두니 눈에 걸리는 게 줄었습니다."

  ← WHY: 대안 발견. 제품명 금지이므로 기능(햇빛, 선 없음, 번호판 겸용)으로만 설명.
         광고처럼 들리지 않으려면 "우연히/그러다 알게 됐다"는 흐름 필수.
  ← TONE: "그러다" = 전환 예고 패턴. "눈에 걸리는 게 줄었습니다" = 절제된 만족.
  ← CREDIBILITY: 기능 나열 (햇빛, 선 없음, 번호판 겸용) = 실용 정보 = 신뢰.
                 추상적 칭찬("좋다") 대신 구체적 기능("선 연결이 없고") 사용.
  ← TENSION: 7 — 궁금증 상승. Open Loop: "이걸 하나만 올려두니" = 현재도 쓰고 있음
             암시 → 만족 블록으로 자연 연결.

[Block 8 — 발견 image]
이미지 블록 — 어노테이션 없음.
src: /posts/a-004-03.jpg | caption: 지금 대시보드에 올려둔 방향제

[Block 9 — 만족 (text)]
"지금도 달고 다닙니다. 향이 급하게 치고 들어오지 않고 은은하게 남는 편이라 거슬리지
않습니다. 대시보드가 정리된 것도 나쁘지 않고요."

  ← WHY: 절제된 마무리. 짧아야 함. 길면 광고처럼 읽힘.
         "쓰고 있다"는 사실 자체가 가장 강한 만족 신호.
  ← TONE: "지금도" = 현재진행 = 만족의 증거. "나쁘지 않고요" = 보배드림 절제 표현.
          감탄사 없음, 직접적.
  ← CREDIBILITY: "지금도 달고 다닙니다" = 지속 사용 = 광고 아닌 실제 선택.
  ← TENSION: 4 — 해소 시작. Open Loop: "나쁘지 않고요" = 결론 유보 → 마지막
             정리 블록으로 연결.

[Block 10 — 비교 정리 (text)]
"다이소 방향제가 나쁜 건 아닙니다. 짧게 써보기엔 가격도 부담 없고 접근성도 좋습니다.
다만 오래 둘 생각이라면 지속력을 따져보는 게 낫습니다."

  ← WHY: 공정한 비교자 포지셔닝 + SEO 키워드 재삽입. 광고 아님을 최종 확인.
         검색 유입자(다이소 방향제 검색)에게 실용적 요약 제공.
  ← TONE: "나쁜 건 아닙니다. 다만..." = 공정한 비교자 패턴. 담백하고 깔끔.
  ← CREDIBILITY: 다이소 장점도 인정(가격, 접근성) → 객관성 유지.
                 "다만" 이후에만 단점 → 한쪽만 비판하지 않음.
  ← TENSION: 2 — 완전 해소. 닫힌 블록. 독자가 결론을 얻고 이탈.
```

---

## Section 7: 남성 독자 심리 훅 5종

| 훅 | 기법 | 예시 | 적용 블록 |
|----|------|------|----------|
| 동질감 | 차종/구체적 상황 명시 | "G80 출고하고 나서" | Block 1 (Hook) |
| Credibility | 수치 + 기간 사용 | "일주일", "이틀", "거의 무향" | Block 5 (실패) |
| 결론 예고 | 제목에서 결말 암시 | "바꾼 이유" → 왜 바꿨는지 궁금하게 | Title |
| 공정한 비교자 | 단점과 장점 모두 인정 | "다이소가 나쁜 건 아닙니다. 다만..." | Block 10 (정리) |
| 정보 밀도 | 각 블록에 실용 정보 포함 | 가격, 기간, 기능 수치화 | Block 3, 7, 9 |

### 적용 판단 기준
- 블록 작성 후 "이 블록에서 독자가 얻는 정보가 있는가?" → 없으면 삭제하거나 다른 블록과 합침
- "이 문장이 광고처럼 읽히는가?" → 그렇다면 수치나 구체적 맥락으로 대체

---

## Section 8: 제목 구조 5종

A-001~A-006 제목 작성/수정 시 참고.

| 패턴 | 구조 | 예시 | 적합한 글 각도 |
|------|------|------|--------------|
| A. 결과 선공개형 | [키워드] + 결과 동사 | "다이소 방향제 한 달 써보고 바꾼 이유" | 비교/교체 경험 |
| B. 상황 도입형 | [차종/상황] + 첫 번째 한 것 | "G80 출고하고 제일 먼저 한 것" | 출고/루틴 경험 |
| C. 비교형 | [상황] + 바꾼 결과 | "주차 알림판 뭐 쓰세요? 번호판 겸용으로 바꿨습니다" | 제품 교체 경험 |
| D. 정리형 | [키워드] + 써본 것들 솔직 정리 | "다이소 차량용품 써본 것들 솔직 정리" | 리스트형 후기 |
| E. 팁형 | [주제] + 팁/방법 | "깔끔하게 차 꾸미기, 대시보드 정리 꿀팁" | 정보 제공형 |

**선택 기준:**
- 비교/교체 각도 글 → A 또는 C
- 출고/루틴 각도 글 → B
- 리스트형 글 → D
- 정보 제공형 글 → E
````

- [ ] **Step 2: Verify file was created correctly**

Check that all 8 sections are present:
```bash
grep "^## Section" docs/writing-guide-blog-a.md
```
Expected output:
```
## Section 1: 페르소나 규칙
## Section 2: 혼합형 서사 템플릿
## Section 3: 키워드 삽입 규칙
## Section 4: 댓글 패턴 (보배드림 5댓글 공식)
## Section 5: 이미지 배치 규칙
## Section 6: A-004 어노테이션 전문
## Section 7: 남성 독자 심리 훅 5종
## Section 8: 제목 구조 5종
```

- [ ] **Step 3: Run build to confirm nothing is broken**

```bash
npm run build
```
Expected: exit 0. (The writing guide is a `.md` file and doesn't affect the TypeScript build, but run it to confirm Task 1 is still clean.)

- [ ] **Step 4: Commit**

```bash
git add docs/writing-guide-blog-a.md
git commit -m "docs: create Blog A writing guide (8 sections, A-004 annotated gold standard)"
```

---

## Final Verification

- [ ] **Step 1: Confirm scope — only 2 files changed**

```bash
git diff --name-only HEAD~2
```
Expected output (exactly these 2 files, nothing else):
```
docs/writing-guide-blog-a.md
src/lib/content/posts-blog-a.ts
```

- [ ] **Step 2: Confirm A-004 has 10 blocks**

```bash
grep "a004-" src/lib/content/posts-blog-a.ts | grep "id:"
```
Expected: 10 lines, `a004-1` through `a004-10`.

- [ ] **Step 3: Confirm link count — exactly 1 in A-004 comments**

```bash
grep -c "cafe24.com" src/lib/content/posts-blog-a.ts
```
The number should equal the number of posts that already had links (A-001~A-003, A-005~A-006 each have 2) plus 1 for A-004. Total should be 11 (5×2 + 1).

**Success criteria:**
- Build clean
- A-004 has 10 blocks (7 text + 3 image), IDs a004-1 through a004-10
- A-004 comments: 5 comments, link in comment #4 only
- `docs/writing-guide-blog-a.md` exists with 8 sections
- Only `posts-blog-a.ts` and `writing-guide-blog-a.md` were modified/created
