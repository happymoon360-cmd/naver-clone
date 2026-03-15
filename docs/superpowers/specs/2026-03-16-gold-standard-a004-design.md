# Gold Standard Blog Post: A-004 Rewrite + Writing Guide

## Goal

Rewrite Blog A post A-004 ("다이소 방향제 vs 태양열 방향제, 한 달 써본 후기") as a high-quality gold standard, then produce an annotated writing guide that agents can use to replicate this quality across all Blog A posts.

## Deliverables

1. **A-004 rewritten post** — replaces current 4-block post in `src/lib/content/posts-blog-a.ts`
2. **Blog A Writing Guide** — `docs/writing-guide-blog-a.md`, annotated reference for agent-driven content rewriting

## Context

- Blog A persona: 깔끔한드라이버 (40대 후반~50대 남성, 제네시스 오너, 보배드림 커뮤니티 톤)
- Tone: 합니다체, 건조하고 담백함 (`~습니다`, `~더군요`, `~편이었습니다`)
- Product: 태양열 차량용 방향제 + 주차번호판 겸용
- Product exposure rule: **NO product name in body text.** Only indirect descriptions ("햇빛으로 돌아가는 타입", "선 연결 없는 타입"). Product link only in comment replies.
- Target keyword: "다이소 방향제" (500/month, Medium competition, ₩54 CPC)
- Cafe24 link: `https://sjhur3601.cafe24.com/`

---

## A-004 Post Design

### Meta

- **id:** `a-004`
- **title:** `다이소 방향제 한 달 써보고 바꾼 이유`
- **category:** `차량용품`
- **date:** `8일 전`
- **tags:** `['다이소 방향제', '차량 방향제', '방향제 비교', '태양열 방향제']`
- **author:** `깔끔한드라이버`
- **authorProfileImage:** `''` (placeholder)
- **headerImage:** `''` (placeholder)
- **likeCount:** 18
- **isLiked:** `false`
- **commentsEnabled:** `true`
- **createdAt:** `Date.now() - 8 * 86400000`

### Narrative Structure: 혼합형 (에피소드 도입 + 담백 비교)

짧은 에피소드로 진입 → 보배드림식 담백한 비교로 마무리.
5-act arc: Hook → 시도 → 실패 → 발견 → 만족+정리

**Note:** 10 content blocks (7 text + 3 image). Blog B gold standard와 동일한 블록 수. 남성 독자는 감정 과잉보다 정보 밀도를 선호하므로 각 블록에 실용적 디테일을 포함한다.

**Block IDs:** Sequential `a004-1` through `a004-10`.

#### Block 1 (`a004-1`) — Hook (text)
- **Act:** Hook
- **Purpose:** 동질감 형성 + 키워드 자연 삽입. 같은 상황의 독자가 "나도 이랬는데"를 느끼게.
- **Content direction:** G80 출고 후 다이소 방향제부터 달았던 맥락. "다이소 방향제" 키워드 첫 문단 자연 삽입.
- **Tone:** "출고하고 나서 일단 다이소 방향제부터 달았습니다."
- **WHY:** 남성 독자는 "나와 같은 상황인 사람의 경험"만 읽음. 차종 명시가 동질감 훅의 핵심.
- **CREDIBILITY:** G80 차종 명시 → 구체적 상황 = 실제 경험임을 암시
- **TENSION:** 낮은 시작점. 문제가 아직 없음 → 독자가 "왜 바꿨나"에 궁금증 생김
- **Length:** 3~4 문장

#### Block 2 (`a004-2`) — Hook image (image)
- **Act:** Hook
- **src:** `/posts/a-004-01.jpg` (placeholder)
- **caption:** `다이소에서 사 온 차량용 방향제`
- **Image prompt:** `iPhone 15 photo, Daiso air freshener in Korean man's hand, car interior background, natural daylight, clean aesthetic`

#### Block 3 (`a004-3`) — 시도 (text)
- **Act:** 시도
- **Purpose:** 대비 설정. 처음엔 좋았다는 점을 먼저 써야 실패 블록이 신뢰를 얻음.
- **Content direction:** 가격·접근성 이유로 선택. "천 원대라 부담 없었습니다." 처음엔 무난했음.
- **Tone:** 담백한 사실 서술. "가격도 부담 없고 바로 달 수 있어서 일단 써봤습니다."
- **WHY:** 다이소를 무조건 나쁘다 하지 않음 → 공정한 비교자 포지셔닝 → 신뢰도 상승
- **CREDIBILITY:** 선택 이유를 명시 (가격, 접근성) → 합리적 소비자처럼 보임
- **TENSION:** 기대감 살짝 형성 → 다음 블록의 실망과 대비 준비
- **Length:** 2~3 문장

#### Block 4 (`a004-4`) — 시도 반응 (text)
- **Act:** 시도
- **Purpose:** 초반 긍정 반응. 이게 있어야 실패 블록의 낙차가 생김.
- **Content direction:** 처음 달았을 때 향이 생각보다 괜찮았던 기억. 대시보드 모습.
- **Tone:** "처음 달고 한 이틀은 나쁘지 않았습니다."
- **WHY:** 낙차 설정. 이 블록 없이 실패로 바로 가면 "처음부터 나쁜 제품 리뷰"처럼 읽힘
- **TENSION:** 잠깐 상승 → 다음 블록에서 급하락
- **Length:** 2~3 문장

#### Block 5 (`a004-5`) — 실패 (text)
- **Act:** 실패
- **Purpose:** 신뢰 구축의 핵심 블록. 구체적 수치로 실제 경험임을 증명.
- **Content direction:** "일주일 지나니 향이 거의 안 납니다." 더운 날 처음에 너무 빨리 퍼졌다가 금방 사라짐.
- **Tone:** "일주일 지나니 향이 거의 안 납니다. 코 가까이 대야 겨우 나는 수준이었습니다."
- **WHY:** 모호한 비판 = 광고. 구체적 수치(일주일, 거의 무향) = 실제 경험. 보배드림 독자는 이걸 봄.
- **CREDIBILITY:** 수치 사용 ("일주일", "거의 무향") + 계절 맥락 (더운 날)
- **TENSION:** 최저점. 문제가 명확해짐 → 독자가 "그럼 어떻게 했나"에 집중
- **Length:** 3~4 문장

#### Block 6 (`a004-6`) — 실패 image (image)
- **Act:** 실패
- **src:** `/posts/a-004-02.jpg` (placeholder)
- **caption:** `대시보드에 올려둔 다이소 방향제`
- **Image prompt:** `iPhone 15 photo, small Daiso-style air freshener on car dashboard, Korean sedan interior, natural daylight, slightly underwhelming feel`

#### Block 7 (`a004-7`) — 발견 (text)
- **Act:** 발견
- **Purpose:** 대안 발견. 간접 표현으로 제품 소개. 제품명 사용 금지.
- **Content direction:** "다른 거 없나" 찾다가 햇빛으로 돌아가는 타입 알게 됨. 선 없고 번호판 겸용.
- **Tone:** "그러다 햇빛만 들면 알아서 돌아가는 타입이 있다는 걸 알게 됐습니다. 선 연결이 없고 번호판 겸용이라 대시보드가 덜 복잡해 보였습니다."
- **WHY:** 발견의 자연스러움이 중요. 광고처럼 들리지 않으려면 "우연히 알게 됐다"는 흐름 필요
- **CREDIBILITY:** 기능 설명 (햇빛, 선 없음, 번호판 겸용) → 실용적 정보 = 신뢰
- **TENSION:** 상승 시작. "이게 뭔지" 궁금증 유발
- **Length:** 3~4 문장

#### Block 8 (`a004-8`) — 발견 image (image)
- **Act:** 발견
- **src:** `/posts/a-004-03.jpg` (placeholder)
- **caption:** `지금 대시보드에 올려둔 방향제`
- **Image prompt:** `iPhone 15 photo, solar air freshener on car dashboard, Korean sedan, passenger seat view, clean minimal dashboard, warm afternoon light`

#### Block 9 (`a004-9`) — 만족 (text)
- **Act:** 만족
- **Purpose:** 절제된 마무리. 남성 독자는 감정 과잉 거부감. "괜찮습니다" 2~3줄이 최적.
- **Content direction:** 지금도 쓰고 있음. 향 지속되는 편. 대시보드 정리감 언급.
- **Tone:** "지금도 달고 다닙니다. 향이 급하게 치고 들어오지 않고 은은하게 남는 편이라 거슬리지 않습니다."
- **WHY:** 짧아야 함. 길면 광고처럼 읽힘. "쓰고 있다"는 사실 자체가 만족의 증거.
- **TENSION:** 평탄하게 해소. 극적 감정 피크 없음 — 이게 보배드림 톤.
- **Length:** 2~3 문장

#### Block 10 (`a004-10`) — 비교 정리 (text)
- **Act:** 만족 (wrap-up)
- **Purpose:** SEO wrap-up + 공정한 비교자 포지셔닝. 키워드 재삽입.
- **Content direction:** "다이소 방향제가 나쁜 건 아닙니다. 짧게 쓸 거면 괜찮고, 오래 둘 생각이면 지속력을 따져보는 게 낫습니다."
- **Tone:** 담백한 결론. 광고 느낌 없이 정보 정리.
- **WHY:** "공정한 비교자" 포지셔닝 → 신뢰도 유지 + SEO 키워드 자연 재삽입
- **CREDIBILITY:** 양쪽 모두 인정 → 독자가 "이 사람은 광고 아니다" 판단
- **TENSION:** 완전 해소. 깔끔하게 끝냄.
- **Length:** 2~3 문장

### Keyword Strategy

| Location | Keyword | Frequency |
|----------|---------|-----------|
| Title | 다이소 방향제 | 1 |
| Block 1 (Hook) | 다이소 방향제 | 1 |
| Block 10 (정리) | 다이소 방향제 | 1 |
| Tags | 다이소 방향제 | 1 |
| **Total** | | **4회** (자연스럽게 분산) |

Secondary keywords woven in naturally: 차량 방향제, 태양열 방향제, 방향제 비교

### Comments Design

5 comments total. **Link appears exactly once** (comment #4). All comments: `isLiked: false`.
보배드림 스타일: 짧고 건조, 합니다체, 차종 기반 닉네임.

**Implementation note:** Replace the **entire existing `comments` array** in the A-004 entry with the 5 comments below. Do not keep any of the current comments.

| # | id | author | content | parentId | likes | purpose |
|---|-----|--------|---------|----------|-------|---------|
| 1 | 1 | g90주인장 | "다이소 방향제 저도 써봤는데 딱 일주일이더군요." | — | 4 | 공감 + credibility |
| 2 | 2 | 깔끔한드라이버 | "맞습니다. 처음엔 괜찮았는데 금방 퍼지더군요." | 1 | 1 | 블로거 호응 (링크 없음) |
| 3 | 3 | GV80입문자 | "지금 쓰시는 거 어디서 구하셨나요? 선 없는 타입 맞나요?" | — | 2 | 자연스러운 구매 질문 |
| 4 | 4 | 깔끔한드라이버 | "여기서 봤습니다. https://sjhur3601.cafe24.com/ 태양열이라 선 연결 없습니다." | 3 | 1 | **유일한 링크** |
| 5 | 5 | 보배드림러 | "번호판 겸용이라는 게 신기하네요. 저도 따로 두는 거 정리하려고 했는데." | — | 2 | 잡담 + 사회적 증거 |

**Comment timestamp pattern:**
- Comment 1: post + 3h
- Comment 2: post + 5h (블로거 답글)
- Comment 3: post + 1d 3h
- Comment 4: post + 1d 6h (블로거 답글)
- Comment 5: post + 2d 4h

---

## Writing Guide Design

**File:** `docs/writing-guide-blog-a.md`

### Section 1: Persona Rules

- **Name:** 깔끔한드라이버
- **Age/Context:** 40대 후반~50대 남성, 제네시스 오너, 보배드림 커뮤니티 스타일
- **말투 패턴:**
  - Endings: ~습니다, ~더군요, ~편이었습니다, ~않았습니다
  - 감정 표현: 없거나 최소화. "나쁘지 않았습니다" 수준이 최대.
  - 차종 언급: "G80 출고 후~", "제 차에서는~" (구체적 맥락 제공)
- **금지어:** ㅎㅎ/ㅠㅠ/ㅋㅋ 이모지, 과잉 감탄("정말!", "최고!"), 존댓말 과잉, 제품명(차량용 태양열 방향제)
- **Good 예시:** "일주일 지나니 향이 거의 안 납니다."
- **Bad 예시:** "진짜 너무 실망이었어요ㅠㅠ 완전 별로!!"

### Section 2: 혼합형 서사 템플릿

짧은 에피소드로 진입 (동질감) → 보배드림식 담백 비교로 마무리 (신뢰+정보).

| Act | Role | Blocks | Key question | Tension score (1~10) |
|-----|------|--------|-------------|----------------------|
| Hook | 동질감 형성 + 키워드 | 1 text + 1 image | "나도 이 상황이었나?" | 3 — 낮은 시작, 궁금증 씨앗 |
| 시도 | 대비 설정 (처음엔 좋았음) | 2 text | "왜 그걸 먼저 썼지?" | 4→5 — 기대감 살짝 형성 |
| 실패 | 구체적 수치로 credibility | 1 text + 1 image | "얼마나 안 됐지?" | 8 — 최저점, "그럼 어떻게?" 집중 |
| 발견 | 대안 발견 (제품 간접 노출) | 1 text + 1 image | "뭘 발견했지?" | 7 — 궁금증 상승, 해결 기대 |
| 만족 + 정리 | 절제된 마무리 + SEO 요약 | 2 text | "결론이 뭐지?" | 4→2 — 담백하게 해소 |

**Blog B vs Blog A 텐션 곡선 차이:**
- Blog B: 감정 피크 있음 (발견 블록에서 "우연히 본 건데" 감정적 전환)
- Blog A: 궁금증 누적형. 감정 피크 없이 논리적으로 상승/해소. 극적 전환 없음.

**Open Loop 작성법 (블록 간 연결):**

각 텍스트 블록의 마지막 문장은 다음 블록으로 독자를 당겨야 한다. 3가지 패턴:

| 패턴 | 방법 | 예시 |
|------|------|------|
| 전환 예고 | "그런데~", "그러다~" 로 다음 문제/발견 암시 | "그런데 일주일이 지나니 달라졌습니다." |
| 미완결 | 결론 없이 끝내 다음 블록에서 완성 | "처음엔 나쁘지 않았습니다." (← 이게 왜 과거형인가? → 다음 블록) |
| 질문형 | 독자 스스로 질문을 갖게 | "향이 금방 날아가는 게 문제라면, 대안이 있어야 하는데." |

**Bad (닫힌 블록):** "다이소 방향제는 지속력이 짧아서 별로였습니다. 이상입니다." → 독자 이탈.
**Good (열린 블록):** "결국 다른 걸 찾아보게 됐습니다." → 다음 블록 당김.

### Section 3: Keyword Insertion Rules

- Blog B writing guide와 동일:
  - **Title:** 반드시 타겟 키워드 포함
  - **Block 1 (Hook):** 첫 문단에 자연스럽게 1회
  - **Block 10 (정리):** 마무리에 1회
  - **Tags:** 타겟 키워드 포함
  - **Total:** 3~4회. 5회 이상은 과잉.

### Section 4: Comment Pattern

5-comment 보배드림 공식:

1. **공감** — 같은 경험, 구체적 수치 언급 (likes 3~5)
2. **블로거 호응** — 짧은 동의, 링크 없음 (parentId: 1, likes 0~2)
3. **질문** — 정보형 구매 질문 ("선 없는 타입 맞나요?") (likes 1~3)
4. **블로거 답글 + 링크** — cafe24 link, 기능 한 줄 설명 (parentId: 3, likes 0~2)
5. **잡담** — 차종/대시보드 관련 에피소드 (likes 1~3)

**A-004 값은 canonical 예시. likes 범위는 A-004 외 다른 포스트 작성 시 적용.**

**Comment tone rules:**
- 닉네임: 차종 기반 (`g90주인장`, `GV80입문자`) 또는 취미 기반 (`보배드림러`, `세차좋아`)
- 모든 댓글: 합니다체 또는 건조한 반말 (이모지 없음)
- **Link rule:** 전체 댓글에서 cafe24 링크 정확히 1회

### Section 5: Image Placement Rules

- Blog B writing guide와 동일:
  - **Position:** Hook 뒤, 실패 뒤, 발견 뒤 (총 3장)
  - **Image block format:** `{ id: 'aXXX-N', type: 'image', src: '/posts/a-XXX-0N.jpg', caption: '...' }`
  - **Caption:** 짧고 설명적. 1문장. 합니다체 아닌 명사형.
  - **Prompt style:** `iPhone 15 photo, [subject], [setting], [lighting], [mood]`

### Section 6: A-004 Annotated Full Text

B-004 어노테이션과 동일한 형식. **모든 10개 블록**에 4개 레이블 적용:

**레이블 정의:**
- `WHY` — 이 블록이 존재하는 이유. 독자 심리/서사 구조에서의 역할.
- `TONE` — 이 블록의 말투 지침. Good/Bad 예시 포함.
- `CREDIBILITY` — 신뢰도를 높이는 장치. 수치, 구체성, 공정성 포인트.
- `TENSION` — 이 블록의 텐션 수준과 다음 블록으로의 연결 방식.

**Blog B (WHY/TONE/SEO/TENSION) vs Blog A (WHY/TONE/CREDIBILITY/TENSION):**
- `SEO` → `CREDIBILITY` 교체. Blog A 독자 설득의 핵심은 신뢰도이기 때문.

**Format:**
```
[Block N — Act]
"실제 작성된 텍스트..."
  ← WHY: ...
  ← TONE: ...
  ← CREDIBILITY: ...
  ← TENSION: ... / Open Loop: ...
```

**Sequencing:** Write A-004 post text first (Deliverable 1), then copy final text into Section 6 with inline annotations for all 10 blocks (Deliverable 2). Section 6 must be complete — no placeholder text.

### Section 7: 남성 독자 심리 훅 5종

Blog B의 "심리적 훅 5종"에 대응하는 Blog A 전용 섹션.

| 훅 | 기법 | 예시 | 적용 블록 |
|----|------|------|----------|
| 동질감 | 차종/구체적 상황 명시 | "G80 출고하고 나서" | Block 1 (Hook) |
| Credibility | 수치 + 기간 사용 | "일주일", "한 달", "거의 무향" | Block 5 (실패) |
| 결론 예고 | 제목에서 결말 암시 | "바꾼 이유" → 왜 바꿨는지 궁금하게 | Title |
| 공정한 비교자 | 단점과 장점 모두 인정 | "다이소가 나쁜 건 아닙니다. 다만..." | Block 10 (정리) |
| 정보 밀도 | 각 블록에 실용 정보 포함 | 가격, 기간, 기능 수치화 | Block 3, 7, 9 |

### Section 8: 제목 구조 5종

A-001~A-006 제목 작성 시 참고. 각 포스트의 키워드와 각도에 맞는 패턴 선택.

| 패턴 | 구조 | 예시 |
|------|------|------|
| A. 결과 선공개형 | [키워드] + 결과 동사 | "다이소 방향제 한 달 써보고 바꾼 이유" |
| B. 상황 도입형 | [차종/상황] + 첫 번째 한 것 | "G80 출고하고 제일 먼저 한 것" |
| C. 비교형 | [A] vs [B] + 기간/경험 | "주차 알림판 뭐 쓰세요? 번호판 겸용으로 바꿨습니다" |
| D. 정리형 | [키워드] + 써본 것들 솔직 정리 | "다이소 차량용품 써본 것들 솔직 정리" |
| E. 팁형 | 키워드 + 팁/방법 | "깔끔하게 차 꾸미기, 대시보드 정리 꿀팁" |

**선택 기준:**
- 비교 각도 글 → A 또는 C
- 경험/루틴 각도 글 → B
- 리스트형 글 → D
- 정보 제공형 글 → E

---

## Constraints

- No changes to Post type, ContentBlock type, or any component code.
- Only `src/lib/content/posts-blog-a.ts` (A-004 entry) and `docs/writing-guide-blog-a.md` are modified/created.
- Build must pass after changes.
- Writing guide is Blog A specific. Blog B guide (`docs/writing-guide-blog-b.md`) is out of scope.
- Other Blog A posts (A-001~A-003, A-005~A-006) are NOT modified in this task.
