# B-004 Quality Upgrade Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite B-004 blog post with tension curve, psychological hooks, and open loops, then update the writing guide with these new techniques.

**Architecture:** Pure content change — replace title + 7 text block strings in the B-004 TypeScript entry, then add/modify 4 sections in the Markdown writing guide. No component or type changes.

**Tech Stack:** TypeScript (static content), Markdown (writing guide)

**Spec:** `docs/superpowers/specs/2026-03-15-b004-quality-upgrade-design.md`

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/lib/content/posts-blog-b.ts` | Modify | Replace B-004 title + 7 text block content strings (lines 82, 91, 94-95, 97, 100, 103-104) |
| `docs/writing-guide-blog-b.md` | Modify | Add tension curve to Section 2, add new Sections 2-1 and 2-2, update Section 6 annotations |

---

## Chunk 1: B-004 Post Rewrite

### Task 1: Rewrite B-004 title and content blocks

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts` (the `b-004` entry, lines 80-117)

**Content generation rules:**
- Write original Korean blog content in Blog B persona voice (살림하는엄마)
- Tone: 친근한 수다 (~거든요, ~더라고요, ㅎㅎ)
- NO product name ("차량용 태양열 방향제") in body text
- "다이소 방향제" keyword in Block 1 and Block 10 (+ title + tags = 4 total)
- Apply tension curve scores, psychological hooks, and open loops per spec Section 2
- Comments array: DO NOT TOUCH (already gold standard)

- [ ] **Step 1: Read current B-004**

Read `src/lib/content/posts-blog-b.ts` and locate the `b-004` entry. Note lines 82 (title) and 89-105 (content array).

- [ ] **Step 2: Replace title**

Change line 82 from:
```typescript
title: '다이소 방향제 써봤는데.. 남편 차엔 이게 나았어요',
```
to:
```typescript
title: '다이소 방향제 1주일 써보고 결국 바꿨어요',
```

- [ ] **Step 3: Replace Block 1 (Hook — tension 4, 정당화 훅, open loop 전환)**

Replace the b004-1 text content with:
```
남편 차 타면서 '냄새 나는데' 싶으면서도 차마 말을 못 한 적 있잖아요. 잔소리처럼 들릴까봐요. 그래서 말 없이 다이소 방향제를 하나 사왔는데요.
```

Checklist:
- 정당화 hook: "있잖아요" = "나만 그런 거 아니잖아" 공감
- 구체적 장면: 말 못 하고 참는 상황
- 키워드: "다이소 방향제" 자연 삽입
- Open loop: "사왔는데요" → 다음 블록으로 당김
- 3 sentences

- [ ] **Step 4: Replace Block 3 (시도 — tension 5, open loop 전환)**

Replace the b004-3 text content with:
```
천 원짜리 고체 타입이었어요. 다이소 향 코너 지나가다 하나 집어온 건데, 남편 차 송풍구에 끼우는 거였거든요.
```

Checklist:
- 가격 디테일: "천 원짜리"
- 다이소 장면: "향 코너 지나가다 집어온"
- 결론 없음. 장면만. 다음 블록(반응)으로 자연 연결.
- 2 sentences

- [ ] **Step 5: Replace Block 4 (시도 반응 — tension 5, open loop 복선)**

Replace the b004-4 text content with:
```
달아주니까 남편이 "오 향 괜찮은데?" 하면서 좋아했어요. 차 탈 때마다 은은하게 나니까 저도 기분이 좋았거든요. 근데 그게 며칠이었어요.
```

Checklist:
- 남편 대화체 유지 ("오 향 괜찮은데?")
- 긍정 반응 살림
- 복선 open loop: "근데 그게 며칠이었어요" → 실패 예고, 낙차 세팅
- 3 sentences

- [ ] **Step 6: Replace Block 5 (실패 — tension 8 PEAK, 공포 훅, open loop 전환)**

Replace the b004-5 text content with:
```
일주일 지나니까 향이 거의 사라졌어요. 코를 대야 겨우 나는 수준이라, 남편도 "이거 끝난 것 같은데?" 하더라고요. 천 원이라 또 사면 되긴 한데, 매번 갈아끼우는 것도 결국 귀찮잖아요. 그래서 다른 거 없나 찾아봤거든요.
```

Checklist:
- 감정 강화: "매번 갈아끼우는 것도 결국 귀찮잖아요" (기존 "좀 아쉬웠어요" 대비 공포/불편 훅)
- 남편 대화체 유지
- Open loop: "찾아봤거든요" → 발견으로 전환
- 4 sentences

- [ ] **Step 7: Replace Block 7 (발견 — tension 7, 정보갭 훅, open loop 전환)**

Replace the b004-7 text content with:
```
그러다 우연히 본 건데, 햇빛 받으면 알아서 돌아가는 타입이 있더라고요. 선도 없고 충전도 필요 없다길래, 이게 진짜 되나 싶었거든요. 그래서 남편한테 보여줬더니요.
```

Checklist:
- 발견 순간 감정 집중: "이게 진짜 되나 싶었거든요"
- 기능 나열 제거 — 하나만 (선 없음 + 충전 불필요)
- 번호판 겸용은 Block 9로 이동
- Open loop: "보여줬더니요" → 만족 블록으로 당김
- 제품명 없음 ("햇빛 받으면 알아서 돌아가는 타입")
- 3 sentences

- [ ] **Step 8: Replace Block 9 (만족 — tension 4, closed)**

Replace the b004-9 text content with:
```
바꾼 지 2주 정도 됐는데, 향이 은은하게 계속 유지되고 있어요. 주차번호판 겸용이라 대시보드도 깔끔해졌고요. 남편이 직접 닦고 관리하는 거 보면 마음에 든 거 맞는 거죠 ㅎㅎ
```

Checklist:
- Block 7에서 이동한 기능: "주차번호판 겸용" 자연 삽입
- 남편 행동 변화 = 간접 만족 증거 유지
- 닫힌 톤 (릴리즈 구간)
- 3 sentences

- [ ] **Step 9: Replace Block 10 (정리 — tension 2, closed)**

Replace the b004-10 text content with:
```
다이소 방향제가 나쁜 건 아니에요. 가볍게 테스트해보기엔 좋거든요. 근데 저처럼 매번 갈아끼우기 귀찮으면, 다른 쪽도 같이 보시는 게 나을 거예요.
```

Checklist:
- "다이소 방향제" 키워드 재삽입 (SEO)
- 개인적 마무리: "저처럼" → 독자에게 말 거는 느낌
- Block 5의 "귀찮잖아요" 감정을 다시 꺼내서 연결 ("매번 갈아끼우기 귀찮으면")
- 닫힌 톤, 릴리즈 완료
- 3 sentences

- [ ] **Step 10: Verify build**

```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run build
```

Expected: build succeeds with no type errors.

- [ ] **Step 11: Content quality check**

Read back the completed B-004 post and verify:
- [ ] Title is `다이소 방향제 1주일 써보고 결국 바꿨어요`
- [ ] No product name ("차량용 태양열 방향제") in any text block
- [ ] "다이소 방향제" appears in Block 1 and Block 10 (+ title + tags = 4 total)
- [ ] Tags array unchanged: `['다이소 방향제 추천', '방향제 추천', '차량 방향제', '남편 차']`
- [ ] Cafe24 link appears exactly once (comment #4 only) — comments unchanged
- [ ] Each text block is 2-4 sentences
- [ ] Tone matches Blog B persona (~거든요, ~더라고요, ㅎㅎ)
- [ ] Block IDs unchanged: b004-1 through b004-10
- [ ] Image blocks unchanged (b004-2, b004-6, b004-8)
- [ ] Open loops present in Blocks 1, 3, 4, 5, 7
- [ ] Blocks 9, 10 are closed (no open loops)

- [ ] **Step 12: Commit**

```bash
git add src/lib/content/posts-blog-b.ts
git commit -m "content: upgrade B-004 with tension curve, hooks, and open loops"
```

---

## Chunk 2: Writing Guide Update

### Task 2: Add tension curve, hooks, and title systems to writing guide

**Files:**
- Modify: `docs/writing-guide-blog-b.md`

**Reference:**
- Spec Sections 4a-4d: `docs/superpowers/specs/2026-03-15-b004-quality-upgrade-design.md`
- Completed B-004 post from Task 1 (for Section 6 annotations)

- [ ] **Step 1: Update Section 2 — add tension curve columns and open loop subsection**

In `docs/writing-guide-blog-b.md`, replace Section 2 (lines 27-47) with enhanced version that includes:

1. **Updated 5-act table** with 3 new columns (텐션, 심리 훅, Open Loop):

```markdown
## 2. 5단계 서사 구조 + 텐션 커브

모든 글은 이 서사 흐름을 따릅니다. 각 단계에 텐션 점수와 심리 훅을 적용합니다.

| 단계 | 블록 | 텐션 | 심리 훅 | Open Loop | 핵심 질문 |
|------|------|------|---------|-----------|-----------|
| Hook | text 1 + image 1 | 4 | 정당화 | ✅ 전환 | "왜 이 글을 읽어야 하지?" |
| 시도 | text 1~2 | 5 | 구체적 장면 | ✅ 전환/복선 | "처음에 뭘 해봤지?" |
| 실패 | text 1 + image 1 | **8** (피크) | 공포 | ✅ 전환 | "왜 안 됐지?" |
| 발견 | text 1 + image 1 | **7** | 정보갭 | ✅ 전환 | "어떻게 알게 됐지?" |
| 만족 + 정리 | text 2 | 4→2 | 감정 해소 | ❌ 닫힘 | "지금은 어때?" |

**총 블록 수:** 8~10개 (text 6~7 + image 3)

**텐션 커브 원리:**
- Block 3-4(시도)는 텐션 5에서 유지 — 독자가 성공을 기대하는 구간
- Block 5(실패)에서 8로 급상승 — 기대와 현실의 낙차가 클수록 효과적
- Block 7(발견)에서 7 — 두 번째 고조, 새 정보 호기심
- Block 9-10은 4→2로 하강 — 릴리즈, 독자를 편하게 놓아줌
```

2. **Updated 각 단계 사용법** (keep existing content, add hook/loop guidance):

```markdown
### 각 단계 사용법

- **Hook:** 검색자의 pain point를 첫 문장에 **구체적 장면**으로. 타겟 키워드를 자연스럽게 삽입. 정당화 훅("있잖아요", "그렇잖아요") 사용.
- **시도:** 구체적 디테일 (가격, 장소, 장면). 초반 긍정 → 마지막 문장에 복선("근데 그게 며칠이었어요").
- **실패:** 텐션 피크. 감정을 "좀 아쉬웠어요" 수준이 아니라 "귀찮다", "돈 아깝다" 수준으로. 다음 블록으로 당기는 전환.
- **발견:** 제품명 절대 불가. 발견 **순간**의 감정에 집중. 기능 나열 금지 — 가장 놀란 포인트 하나만.
- **만족 + 정리:** 발견 블록에서 뺀 기능을 여기서 자연스럽게 보충. SEO 키워드 재삽입. 개인적 마무리.
```

3. **New subsection "Open Loop 작성법":**

```markdown
### Open Loop 작성법

Block 1~7은 문단 끝이 열려 있어야 합니다. 독자가 다음 문단을 안 읽으면 이야기가 미완성이 되도록.

**3가지 패턴:**

| 패턴 | 설명 | 예시 |
|------|------|------|
| 전환 | 다음 행동/결과로 이어지는 문장 | "그래서 하나 사왔는데요." |
| 복선 | 앞으로 올 반전을 암시 | "근데 그게 며칠이었어요." |
| 질문 | 독자의 궁금증을 직접 유발 | "이게 진짜 되나 싶었거든요." |

### Good vs Bad (Open Loop)

| Good (열림) | Bad (닫힘) |
|-------------|-----------|
| "그래서 하나 사왔는데요." | "그래서 하나 사봤어요." |
| "근데 그게 며칠이었어요." | "기분이 좋았거든요 ㅎㅎ" |
| "남편한테 보여줬더니요." | "깔끔하더라고요." |

**규칙:** Block 9-10(만족/정리)은 닫아도 됩니다. 릴리즈 구간입니다.
```

- [ ] **Step 2: Add new Section 2-1 (심리 훅 5종)**

After the updated Section 2 (before Section 3), insert:

```markdown
## 2-1. 심리 훅 5종

Organicmarketing 캐러셀 프레임워크에서 가져온 5가지 심리 훅입니다.
블로그 존댓말 수다체에 맞게 변환된 예시를 참고하세요.

| 훅 | 정의 | 블로그 적용 | 존댓말 예시 |
|----|------|------------|------------|
| 정당화 (Validation) | "나만 그런 거 아님" — 공감 | Block 1 서문 | "있잖아요", "그렇잖아요", "다들 그러잖아요" |
| 정보갭 (Information Gap) | "이런 게 있었어?" — 호기심 | Block 7 발견 | "이게 되나 싶었거든요", "우연히 봤는데요" |
| 공포 (Fear) | "이대로면 손해" — 불안 | Block 5 실패 | "매번 갈아끼우는 것도 귀찮잖아요", "또 사는 것도요" |
| 탐욕 (Curiosity) | "결과가 궁금" — 기대 | 제목 | "결국 바꿨어요", "비교해봤는데" |
| 소속감 (Belonging) | "나만 알려주는" — 특별함 | 댓글 답글 | "여기서 봤어요~", "저만 알려드릴게요" |

**사용 원칙:**
- Hook(Block 1)에는 정당화 훅이 가장 효과적
- 실패(Block 5)에는 공포 훅으로 텐션 피크
- 발견(Block 7)에는 정보갭 훅으로 호기심
- 제목에는 탐욕 훅이 CTR에 가장 유리
```

- [ ] **Step 3: Add new Section 2-2 (제목 구조 5종)**

After Section 2-1, insert:

```markdown
## 2-2. 제목 구조 5종

| 구조 | 패턴 | 예시 |
|------|------|------|
| A | 감정 + 규모 + 반전 | TBD — Blog B 적용 시 추가 |
| B | 숫자 + 반전 | `다이소 방향제 1주일 써보고 결국 바꿨어요` |
| C | 기대 + 반전 | `다이소 방향제 써봤는데.. 일주일 만에 무향` |
| D | 대결 + 약속 | `다이소 방향제 vs 지금 쓰는 거, 솔직 비교` |
| E | 소속감 + 비밀 | TBD — Blog B 적용 시 추가 |

**선택 기준:**
- 비교/후기 글 → B형 (숫자+반전) 또는 D형 (대결+약속)
- 실패 경험 글 → C형 (기대+반전)
- 팁/정보 글 → A형 (감정+규모+반전) 또는 E형 (소속감+비밀)

**제약:** 타겟 키워드는 반드시 제목 앞쪽에 배치 (네이버 검색 볼드 매칭용)
```

- [ ] **Step 4: Update Section 6 — replace with rewritten B-004 + enhanced annotations**

Replace Section 6 (the section starting with `## 6. B-004 주석 달린 전문 (Gold Standard)` — line numbers will have shifted after Steps 1-3) with the rewritten B-004 text from Task 1. Each block annotation keeps existing WHY/TONE/SEO fields and adds TENSION/HOOK/LOOP:

```markdown
## 6. B-004 주석 달린 전문 (Gold Standard)

아래는 B-004 완성본의 각 블록에 작성 의도를 주석으로 단 것입니다.
새 글을 쓸 때 이 패턴을 참고하세요.

### Block 1 — Hook (text)
> "남편 차 타면서 '냄새 나는데' 싶으면서도 차마 말을 못 한 적 있잖아요. 잔소리처럼 들릴까봐요. 그래서 말 없이 다이소 방향제를 하나 사왔는데요."

- **WHY:** 검색자의 pain point를 구체적 장면으로 첫 문장에 배치.
- **TONE:** ~잖아요 ending = 공감 신호. "차마" = 감정적 무게.
- **SEO:** 타겟 키워드 "다이소 방향제" 첫 등장.
- **TENSION:** 4
- **HOOK:** 정당화 — "있잖아요"로 독자와 즉시 공감대 형성.
- **LOOP:** 전환 — "사왔는데요" → 결과가 궁금해서 다음 블록으로.

### Block 2 — Hook image (image)
> `{ type: 'image', src: '/posts/b-004-01.jpg', caption: '다이소에서 사 온 차량용 방향제' }`

- **WHY:** 텍스트 직후 이미지로 시각적 증거. 독자 이탈 방지.
- **CAPTION:** 짧고 설명적. 어떤 사진인지 한눈에 파악.

### Block 3 — 시도 (text)
> "천 원짜리 고체 타입이었어요. 다이소 향 코너 지나가다 하나 집어온 건데, 남편 차 송풍구에 끼우는 거였거든요."

- **WHY:** 가격("천 원짜리") + 장소("향 코너") 디테일로 신뢰감. 결론 없이 장면만.
- **TONE:** ~거든요 ending. 일상적 쇼핑 장면.
- **TENSION:** 5
- **HOOK:** 구체적 장면 (디테일 = 신뢰).
- **LOOP:** 전환 — 결론 없음. 다음 블록(반응)으로 자연 연결.

### Block 4 — 시도 반응 (text)
> "달아주니까 남편이 '오 향 괜찮은데?' 하면서 좋아했어요. 차 탈 때마다 은은하게 나니까 저도 기분이 좋았거든요. 근데 그게 며칠이었어요."

- **WHY:** 초반 긍정 → 실패와의 낙차 세팅. 마지막 문장이 핵심.
- **TONE:** 대화체("오 향 괜찮은데?") = 생활감. ~거든요 유지.
- **TENSION:** 5
- **HOOK:** 낙차 세팅 — 긍정 반응을 보여줘야 실패가 더 아프게 느껴짐.
- **LOOP:** 복선 — "근데 그게 며칠이었어요" = 곧 나쁜 일이 온다는 암시.

### Block 5 — 실패 (text)
> "일주일 지나니까 향이 거의 사라졌어요. 코를 대야 겨우 나는 수준이라, 남편도 '이거 끝난 것 같은데?' 하더라고요. 천 원이라 또 사면 되긴 한데, 매번 갈아끼우는 것도 결국 귀찮잖아요. 그래서 다른 거 없나 찾아봤거든요."

- **WHY:** 텐션 피크. "좀 아쉬웠어요" 수준이 아니라 "귀찮잖아요" — 반복 비용의 공포.
- **TONE:** ~잖아요 = 독자에게 동의를 구함. 공감을 끌어냄.
- **SEO:** 키워드 없음 (과삽입 방지).
- **TENSION:** 8 (피크)
- **HOOK:** 공포 — "매번 갈아끼우는 것도 결국 귀찮잖아요" = 반복 비용 불안.
- **LOOP:** 전환 — "찾아봤거든요" → 발견 블록으로 당김.

### Block 6 — 실패 image (image)
> `{ type: 'image', src: '/posts/b-004-02.jpg', caption: '남편 차 대시보드에 올려둔 모습' }`

- **WHY:** 실패 장면의 시각적 증거. "실제로 써봤다"는 느낌 강화.
- **CAPTION:** 장소(대시보드) + 상태(올려둔) = 상황 전달.

### Block 7 — 발견 (text)
> "그러다 우연히 본 건데, 햇빛 받으면 알아서 돌아가는 타입이 있더라고요. 선도 없고 충전도 필요 없다길래, 이게 진짜 되나 싶었거든요. 그래서 남편한테 보여줬더니요."

- **WHY:** 발견 순간의 감정에 집중. 기능 나열 대신 놀람 하나("선 없고 충전 불필요").
- **TONE:** "우연히" = 광고 아닌 발견. ~거든요 = 수다.
- **TENSION:** 7
- **HOOK:** 정보갭 — "이게 진짜 되나 싶었거든요" = 새 정보에 대한 호기심.
- **LOOP:** 전환 — "보여줬더니요" → 남편 반응이 궁금해서 다음으로.
- **규칙:** 제품명 대신 "햇빛 받으면 알아서 돌아가는 타입". 번호판 겸용은 Block 9로 이동.

### Block 8 — 발견 image (image)
> `{ type: 'image', src: '/posts/b-004-03.jpg', caption: '지금 남편 차에 올려둔 방향제' }`

- **WHY:** 현재 사용 중인 제품의 시각적 증거. "지금" = 현재 진행형 만족.
- **CAPTION:** "지금" 강조 → 과거 실패와 대비.

### Block 9 — 만족 (text)
> "바꾼 지 2주 정도 됐는데, 향이 은은하게 계속 유지되고 있어요. 주차번호판 겸용이라 대시보드도 깔끔해졌고요. 남편이 직접 닦고 관리하는 거 보면 마음에 든 거 맞는 거죠 ㅎㅎ"

- **WHY:** Block 7에서 뺀 기능("주차번호판 겸용")을 자연스럽게 보충. 남편 행동 변화 = 간접 만족.
- **TONE:** ~인 거죠 + ㅎㅎ = 따뜻한 마무리.
- **TENSION:** 4
- **HOOK:** 감정 해소.
- **LOOP:** closed — 릴리즈 시작.

### Block 10 — 정리 (text)
> "다이소 방향제가 나쁜 건 아니에요. 가볍게 테스트해보기엔 좋거든요. 근데 저처럼 매번 갈아끼우기 귀찮으면, 다른 쪽도 같이 보시는 게 나을 거예요."

- **WHY:** Block 5의 "귀찮잖아요"를 "갈아끼우기 귀찮으면"으로 콜백 — 글 전체가 하나의 서사로 연결.
- **TONE:** "저처럼" = 개인적 마무리. 독자에게 말 거는 느낌.
- **SEO:** "다이소 방향제" 키워드 마지막 등장.
- **TENSION:** 2
- **HOOK:** SEO wrap.
- **LOOP:** closed — 릴리즈 완료.
```

- [ ] **Step 5: Verify build**

```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run build
```

Expected: build succeeds (Markdown changes don't affect build, but verify no accidental TS changes).

- [ ] **Step 6: Commit**

```bash
git add docs/writing-guide-blog-b.md
git commit -m "docs: upgrade writing guide with tension curve, hooks, and open loop system"
```

---

## Chunk 3: Verification

### Task 3: Final verification

- [ ] **Step 0: Verify scope of changes**

```bash
cd /Users/jun/Projects/Naver-blog-clone && git diff --name-only HEAD~2
```

Expected: only these two files:
- `src/lib/content/posts-blog-b.ts`
- `docs/writing-guide-blog-b.md`

- [ ] **Step 1: Run lint**

```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run lint
```

Expected: no new errors from our changes (preexisting errors OK).

- [ ] **Step 2: Run build**

```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run build
```

Expected: successful build, no type errors.

- [ ] **Step 3: Content spot-check**

Read `src/lib/content/posts-blog-b.ts` (B-004 entry) and verify:
- Title: `다이소 방향제 1주일 써보고 결국 바꿨어요`
- No product name ("차량용 태양열 방향제") in any text block
- "다이소 방향제" in Block 1 + Block 10 + title + tags = 4 total
- Cafe24 link in exactly 1 comment (comment #4)
- Open loops in Blocks 1, 3, 4, 5, 7
- Blocks 9, 10 closed
- All comments have `isLiked: false`
- `likeCount: 16`

Read `docs/writing-guide-blog-b.md` and verify:
- Section 2 has tension curve table with 텐션/심리 훅/Open Loop columns
- Section 2 has Open Loop 작성법 subsection with 3 patterns
- Section 2-1 has 5 hooks with 존댓말 examples
- Section 2-2 has 5 title structures
- Section 6 has all 10 blocks with WHY/TONE/SEO + TENSION/HOOK/LOOP annotations
- No product name in Good examples

- [ ] **Step 4: Fix any issues and commit**

```bash
git add src/lib/content/posts-blog-b.ts docs/writing-guide-blog-b.md
git commit -m "fix: address content or guide issues"
```

(Skip this step if no issues found.)
