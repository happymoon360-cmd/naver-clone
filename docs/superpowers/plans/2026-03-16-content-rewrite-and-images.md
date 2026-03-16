# Content Rewrite & Image Prompts Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite all 12 blog posts with diversified narratives + write 36 Nano Banana 2 image prompts

**Architecture:** Replace uniform "discovery" narrative across 12 posts with 5 distinct narrative types. Then write scene-based image prompts following Nano Banana 2 best practices. Content files are static TypeScript arrays.

**Tech Stack:** TypeScript (content data files), Nano Banana 2 / Gemini (image generation)

**Key References:**
- Spec: `docs/superpowers/specs/2026-03-16-content-rewrite-and-images-design.md`
- Writing Guide A: `docs/writing-guide-blog-a.md`
- Writing Guide B: `docs/writing-guide-blog-b.md`
- Blog A posts: `src/lib/content/posts-blog-a.ts`
- Blog B posts: `src/lib/content/posts-blog-b.ts`
- Post interface: `src/store/usePostStore.ts:27-44`

**Global Rules (apply to ALL rewrite tasks):**
- **Before writing:** Read the applicable writing guide (`docs/writing-guide-blog-a.md` for Blog A, `docs/writing-guide-blog-b.md` for Blog B)
- **Field preservation:** Only update `title`, `tags`, `content[]`, `comments[]`. Preserve ALL other fields (id, date, author, authorProfileImage, headerImage, category, isLiked, likeCount, commentsEnabled, commentsVisible, commentsOpen, createdAt) as-is.
- **Tag rule:** Remove product-name tags (e.g., "태양열 방향제") from ALL 12 posts. Tags should reflect the post topic, not the product.
- **Comment #4:** Every post must have cafe24 link (https://sjhur3601.cafe24.com/) in comment #4 reply. Comment #3 asks a natural question, comment #4 answers with link + one-line context. This applies to ALL 12 posts including those with 0% product exposure.
- **Image test workflow** (spec Section 5.6) is deferred to the next session. This plan covers content + prompts only.

---

## Chunk 1: Writing Guide Updates + Blog A Posts (a-001 ~ a-003)

### Task 1: Update Writing Guides for New Narrative Types

The current guides only describe the "discovery" (발견형) narrative. Add sections for the 5 new narrative types so agents can reference them.

**Files:**
- Modify: `docs/writing-guide-blog-a.md`
- Modify: `docs/writing-guide-blog-b.md`

- [ ] **Step 1: Add narrative type templates to Blog A guide**

Add a new section after Section 2 (혼합형 서사 템플릿):

```markdown
## Section 2-1: 서사 유형별 템플릿

기존 Section 2의 5-Act 구조(발견형)는 더 이상 전체 글에 적용하지 않음.
아래 유형 중 spec에서 지정된 것을 사용.

### 비교형 (Comparison)
- 구조: 도입(왜 비교하게 됐나) → 제품별 리뷰(각각 장단점) → 정리(균형 잡힌 결론)
- 제품 노출: 여러 옵션 중 하나로 동등하게. ~20%
- Block 배치: Block 1(도입) → Block 2(img: 비교 대상들) → Block 3-4(각 제품 리뷰) → Block 5(비교 중 불편) → Block 6(img: 사용 과정) → Block 7(남은 옵션 정리) → Block 8(img: 현재 상태) → Block 9-10(결론)
- 끝: "본인 상황에 맞게 고르면 된다" 류의 균형 잡힌 마무리
- 톤: 정보 밀도 높게. 수치(가격, 기간, 크기) 반드시 포함.

### 일상 에피소드형 (Lifestyle Episode)
- 구조: 에피소드 시작 → 전개 → 마무리 (이야기가 메인)
- 제품 노출: 이야기 중간에 곁다리로. ~10%
- Block 배치: Block 1(에피소드 시작) → Block 2(img: 시작 장면) → Block 3-4(에피소드 전개) → Block 5(에피소드 전환점) → Block 6(img: 중간 장면) → Block 7(자연스러운 전환) → Block 8(img: 마무리 장면) → Block 9-10(에피소드 마무리)
- 끝: 이야기의 자연스러운 결말. 제품 칭찬이 아님.
- 톤: 스토리텔링 중심. 감정선이 제품이 아니라 에피소드를 따라감.

### 실패담형 (Failure Story)
- 구조: 기대 → 시도 → 실패 과정 → 실패 결과/교훈
- 제품 노출: 없거나 끝에 암시만. ~5%
- Block 배치: Block 1(기대/구매) → Block 2(img: 구매한 것) → Block 3-4(사용 과정, 초반 괜찮음) → Block 5(실패 진행) → Block 6(img: 실패 장면) → Block 7(실패 결과) → Block 8(img: 결과/빈 대시보드) → Block 9-10(교훈, 대안은 암시만)
- 끝: "아직 찾는 중" 또는 열린 결말. 제품 추천 없음.
- 톤: 솔직한 실패 경험 공유. 공정한 비교자 포지션.

### 팁/정보형 (Tips/Info)
- 구조: 주제 도입 → 팁 3~4개 나열 → 정리
- 제품 노출: 팁 중 하나로 포함. ~15%
- Block 배치: Block 1(주제 도입) → Block 2(img: 관련 상황) → Block 3(팁1) → Block 4(팁2) → Block 5(팁3) → Block 6(img: 팁 적용 과정) → Block 7(팁4 — 제품 카테고리 포함 가능) → Block 8(img: 정리된 결과) → Block 9-10(요약)
- 끝: 일반적 조언으로 마무리. 특정 제품 추천 아님.
- 톤: 정보 전달 중심. 실용적.

### 사용 후기형 (Usage Review)
- 구조: 현재 상태에서 시작 → 사용 경험 → 일상 속 모습
- 제품 노출: 이미 쓰고 있는 전제. ~25%. 발견 과정 없음.
- Block 배치: Block 1(현재 상황) → Block 2(img: 현재 차 내부) → Block 3-4(사용 중 경험, 장단점) → Block 5(일상 속 한 장면) → Block 6(img: 사용 디테일) → Block 7(한 달 소감) → Block 8(img: 일상 운전) → Block 9-10(근황 마무리)
- 끝: 일상 소감으로 마무리. 추천이 아님.
- 톤: 근황 보고 느낌. "지금도 쓰고 있다"가 가장 강한 만족 신호.
```

- [ ] **Step 2: Add narrative type templates to Blog B guide**

Same structure as Step 1, but adapted to Blog B tone (~거든요, ~더라고요, ㅎㅎ, 남편 언급).

- [ ] **Step 3: Mark old "discovery" sections as deprecated**

In both guides, add note at top of Section 2:
```markdown
> ⚠️ 아래 5-Act 발견형 구조는 더 이상 전체 글에 일괄 적용하지 않음.
> 각 포스트별 서사 유형은 spec 문서 참조: `docs/superpowers/specs/2026-03-16-content-rewrite-and-images-design.md`
> 새 유형별 템플릿은 Section 2-1 참조.
```

- [ ] **Step 4: Commit**
```bash
git add docs/writing-guide-blog-a.md docs/writing-guide-blog-b.md
git commit -m "docs: add narrative type templates to writing guides"
```

---

### Task 2: Rewrite a-001 (Lifestyle Episode — 새차 + 방향제)

**Files:**
- Modify: `src/lib/content/posts-blog-a.ts` (a-001 section)

**Narrative:** G80 출고 당일 이야기. 설렘, 첫 주차, 블랙박스 설치 등이 메인. 제품은 대시보드 정리하면서 "이것도 올려뒀다" 한두 줄. 끝은 출고 첫날 감상.

**Rules:**
- Follow Blog A writing guide: 합니다체, 감탄 없음, 보배드림 톤
- Keyword "새차" + "방향제" in title, Block 1, Block 10, tags (3-4회 total)
- 10 blocks (7 text + 3 image at positions 2, 6, 8)
- 5 comments following 댓글 패턴 (comment #4 has cafe24 link)
- Tags: remove product-specific tags. Keep car/lifestyle tags.
- Product exposure ~10%: mentioned casually in 1 text block only

- [ ] **Step 1: Write the 10 content blocks**

Write complete Korean content for all 10 blocks following the Lifestyle Episode template. The story arc:
- Block 1: 출고 당일 아침, 딜러에서 차 받는 장면
- Block 2: (image) 출고 첫날 주차장에 세운 차
- Block 3: 블랙박스 설치하러 가기, 첫 주유
- Block 4: 집으로 돌아와서 대시보드 세팅 시작
- Block 5: 이것저것 올려두고 정리하는 과정 (제품 한두 줄 여기서)
- Block 6: (image) 세팅 중인 대시보드 모습
- Block 7: 첫 야간 드라이브, 차 느낌
- Block 8: (image) 밤 주차장에서 본 차
- Block 9: 출고 첫날 돌아보며
- Block 10: 새차 받으면 제일 먼저 뭘 하는지에 대한 짧은 정리

Image captions should match the new narrative (에피소드 장면).

- [ ] **Step 2: Write the 5 comments**

Follow 5댓글 공식. Comment topics should match the new story (출고 경험 공유, 블랙박스 질문, etc.). Comment #4 links to cafe24 naturally.

- [ ] **Step 3: Update the a-001 object in posts-blog-a.ts**

Replace the entire a-001 object with new content. Keep id, date, author, authorProfileImage, headerImage, isLiked, likeCount, commentsEnabled, createdAt unchanged.

Update: title, tags, content[], comments[]

- [ ] **Step 4: Run build to verify**
```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run build
```
Expected: Build passes with no errors.

- [ ] **Step 5: Commit**
```bash
git add src/lib/content/posts-blog-a.ts
git commit -m "content: rewrite a-001 as lifestyle episode (새차 출고)"
```

---

### Task 3: Rewrite a-002 (Tips/Info — 주차 알림판)

**Files:**
- Modify: `src/lib/content/posts-blog-a.ts` (a-002 section)

**Narrative:** 주차 알림판 종류별 장단점. 종이, 자석식, 흡착식, 겸용 타입 비교. 겸용 타입은 선택지 중 하나. 끝은 "본인 차에 맞는 걸로."

**Rules:** Same as Task 2 but Tips/Info template. Keyword "주차 알림판" 3-4회.
- Product exposure ~15%: one of 3-4 tips mentions combo type

- [ ] **Step 1: Write the 10 content blocks**

Tips/Info arc:
- Block 1: 주차 알림판 왜 필요한지
- Block 2: (image) 관련 상황
- Block 3: 종이 타입 — 장단점
- Block 4: 자석식/흡착식 — 장단점
- Block 5: 겸용 타입 소개 (제품 카테고리 언급)
- Block 6: (image) 비교 과정
- Block 7: 선택 기준 정리
- Block 8: (image) 정리된 대시보드
- Block 9-10: 요약 + 키워드 마무리

- [ ] **Step 2: Write the 5 comments**
- [ ] **Step 3: Update the a-002 object in posts-blog-a.ts**
- [ ] **Step 4: Run build to verify**
- [ ] **Step 5: Commit**
```bash
git add src/lib/content/posts-blog-a.ts
git commit -m "content: rewrite a-002 as tips/info (주차 알림판)"
```

---

### Task 4: Rewrite a-003 (Comparison — 다이소 차량용품)

**Files:**
- Modify: `src/lib/content/posts-blog-a.ts` (a-003 section)

**Narrative:** 다이소에서 산 4-5개 용품 솔직 후기. 제품 NOT mentioned. Pure Daiso review. 끝: "가성비 괜찮은 것도 있고 돈 아까운 것도 있다."

**Rules:** Same format. Keyword "다이소 차량용품" 3-4회.
- Product exposure 0%: 제품 언급 없음
- Tags: 다이소 관련만. "태양열 방향제" 등 제품 태그 제거.
- Comment #4: 독자가 "다이소 말고 다른 데 괜찮은 거 있나요?" → 블로거가 자연스럽게 cafe24 링크

- [ ] **Step 1: Write the 10 content blocks**

Comparison arc:
- Block 1: 다이소 차량용품 코너에서 이것저것 사온 이야기
- Block 2: (image) 사온 용품들
- Block 3: 폰 거치대 — 후기
- Block 4: 컵홀더 패드 + 송풍구 클립 — 후기
- Block 5: 선바이저 수납 + 기타 — 후기
- Block 6: (image) 며칠 쓰고 빼둔 것들
- Block 7: 살아남은 것 vs 탈락한 것 정리
- Block 8: (image) 지금 차에 남겨둔 것
- Block 9-10: 다이소 차량용품 정리 + 키워드 마무리

- [ ] **Step 2: Write the 5 comments**
- [ ] **Step 3: Update the a-003 object in posts-blog-a.ts**
- [ ] **Step 4: Run build to verify**
- [ ] **Step 5: Commit**
```bash
git add src/lib/content/posts-blog-a.ts
git commit -m "content: rewrite a-003 as comparison (다이소 차량용품)"
```

---

## Chunk 2: Blog A Posts (a-004 ~ a-006)

### Task 5: Rewrite a-004 (Failure Story — 다이소 방향제)

**Files:**
- Modify: `src/lib/content/posts-blog-a.ts` (a-004 section)

**Narrative:** 다이소 방향제 한 달 사용기. 기대 → 실망 과정. 끝: "아직 다른 거 찾는 중." 제품 NOT shown.

**Rules:** Keyword "다이소 방향제" 3-4회.
- Product exposure ~5%: 끝에 "다른 쪽도 알아보는 중" 암시만
- Tags: "태양열 방향제" 제거
- Comment #4: "다른 거 찾으셨어요?" → 블로거가 "하나 써보고 있는데 여기서 봤습니다" + cafe24 링크

- [ ] **Step 1: Write the 10 content blocks**

Failure Story arc:
- Block 1: 다이소에서 방향제 사온 날 (기대)
- Block 2: (image) 사온 방향제
- Block 3: 처음 며칠 — 괜찮았음
- Block 4: 일주일 후 — 향 약해짐
- Block 5: 한 달 후 — 거의 무향, 교체 반복의 피로감
- Block 6: (image) 대시보드에 남은 빈 방향제
- Block 7: 실패 원인 분석 (가격대비, 지속력, 여름 온도)
- Block 8: (image) 빈 대시보드 or 방향제 빼고 남은 자리
- Block 9: 다이소 방향제 장점도 인정 (공정성)
- Block 10: "아직 다른 거 찾는 중" + 키워드 마무리

- [ ] **Step 2: Write the 5 comments**
- [ ] **Step 3: Update the a-004 object in posts-blog-a.ts**
- [ ] **Step 4: Run build to verify**
- [ ] **Step 5: Commit**
```bash
git add src/lib/content/posts-blog-a.ts
git commit -m "content: rewrite a-004 as failure story (다이소 방향제)"
```

---

### Task 6: Rewrite a-005 (Tips/Info — 차 꾸미기)

**Files:**
- Modify: `src/lib/content/posts-blog-a.ts` (a-005 section)

**Narrative:** 대시보드 깔끔하게 유지하는 팁 3-4가지. "겸용 제품으로 물건 수 줄이기"가 팁 중 하나. 끝: "덜 올려두는 게 제일 깔끔하다."

**Rules:** Keyword "차 꾸미기" 3-4회. Product exposure ~15%.

- [ ] **Step 1: Write the 10 content blocks**

Tips/Info arc:
- Block 1: 차 꾸미기 = 뭘 더하는 게 아니라 정리하는 것
- Block 2: (image) 소품 많은 대시보드 상태
- Block 3: 팁1 — 색상 통일 (검정/다크 계열로)
- Block 4: 팁2 — 선 정리 (무선 충전, 블랙박스 배선)
- Block 5: 팁3 — 겸용 제품으로 물건 수 줄이기 (제품 카테고리 언급)
- Block 6: (image) 정리 과정
- Block 7: 팁4 — 닦는 루틴 (주 1회 대시보드 물티슈)
- Block 8: (image) 정리 후 깔끔한 대시보드
- Block 9-10: 요약 + 키워드 마무리

- [ ] **Step 2: Write the 5 comments**
- [ ] **Step 3: Update the a-005 object in posts-blog-a.ts**
- [ ] **Step 4: Run build to verify**
- [ ] **Step 5: Commit**
```bash
git add src/lib/content/posts-blog-a.ts
git commit -m "content: rewrite a-005 as tips/info (차 꾸미기)"
```

---

### Task 7: Rewrite a-006 (Usage Review — 새차)

**Files:**
- Modify: `src/lib/content/posts-blog-a.ts` (a-006 section)

**Narrative:** 출고 한 달 후 근황. 제품 이미 대시보드에 있는 상태에서 시작. 발견 과정 없음. 끝: 새차 한 달 소감.

**Rules:** Keyword "새차" 3-4회. Product exposure ~25% (already in use premise).

- [ ] **Step 1: Write the 10 content blocks**

Usage Review arc:
- Block 1: 출고 한 달째, 지금 차 상태
- Block 2: (image) 현재 차 내부 전경
- Block 3: 한 달간 주행거리, 첫 세차 경험
- Block 4: 대시보드에 올려둔 것들 근황 (제품 자연스럽게 — "지금 올려둔 거 하나")
- Block 5: 새차 냄새 빠지면서 달라진 점
- Block 6: (image) 대시보드 디테일
- Block 7: 한 달 소감 — 좋은 점, 아쉬운 점
- Block 8: (image) 일상 운전 장면 (주차장, 출근길 등)
- Block 9-10: 새차 한 달 정리 + 키워드 마무리

- [ ] **Step 2: Write the 5 comments**
- [ ] **Step 3: Update the a-006 object in posts-blog-a.ts**
- [ ] **Step 4: Run build to verify**
- [ ] **Step 5: Commit**
```bash
git add src/lib/content/posts-blog-a.ts
git commit -m "content: rewrite a-006 as usage review (새차 한 달)"
```

---

## Chunk 3: Blog B Posts (b-001 ~ b-003)

### Task 8: Rewrite b-001 (Lifestyle Episode — 차 냄새)

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts` (b-001 section)

**Narrative:** 남편 차 냄새 때문에 벌어지는 부부 에피소드. 이야기가 메인. 제품은 중간에 "이것저것 해봤는데" 흐름에서 자연스럽게. 끝: 부부 에피소드 마무리.

**Rules:** Follow Blog B writing guide (거든요, 더라고요, ㅎㅎ 톤). Keyword "차 냄새" 3-4회. Product exposure ~10%.

- [ ] **Step 1: Write the 10 content blocks**

Lifestyle Episode arc:
- Block 1: 남편 차 탔을 때 냄새 에피소드 시작
- Block 2: (image) 에피소드 시작 장면
- Block 3: 남편한테 말할까 말까 고민
- Block 4: 결국 살짝 언급했다가 분위기 어색해진 이야기
- Block 5: 몰래 해결하기로 결심, 이것저것 시도 (제품 한두 줄 여기)
- Block 6: (image) 에피소드 중간 장면
- Block 7: 남편이 어느 날 먼저 "차가 좋아진 것 같다" 언급
- Block 8: (image) 에피소드 마무리 장면
- Block 9-10: 부부 사이 에피소드 마무리 + 키워드

- [ ] **Step 2: Write the 5 comments**
- [ ] **Step 3: Update the b-001 object in posts-blog-b.ts**
- [ ] **Step 4: Run build to verify**
- [ ] **Step 5: Commit**
```bash
git add src/lib/content/posts-blog-b.ts
git commit -m "content: rewrite b-001 as lifestyle episode (차 냄새)"
```

---

### Task 9: Rewrite b-002 (Failure Story — 남편 생일 선물)

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts` (b-002 section)

**Narrative:** 과거 남편 생일 선물 실패 사례들. 서랍행 패턴. 이번에는 "매일 손이 가는 쪽으로" 골랐지만 뭔지 모호하게. 끝: 열린 결말 ("서랍행 아니길").

**Rules:** Keyword "남편 생일 선물" 3-4회. Product exposure ~5% (what it is stays vague).

- [ ] **Step 1: Write the 10 content blocks**

Failure Story arc:
- Block 1: 남편 생일 선물 고르기의 어려움
- Block 2: (image) 선물 후보들을 모아본 장면
- Block 3: 작년 선물 — 셔츠 (서랍행)
- Block 4: 재작년 선물 — 향수 (서랍행)
- Block 5: 패턴 깨닫기 — "예쁜 것 사면 서랍, 매일 쓰는 것이 답"
- Block 6: (image) 서랍에 남은 안 쓰는 선물들
- Block 7: 이번엔 기준을 바꿔서 골랐다 (뭔지 안 밝힘, "매일 손이 가는 쪽으로")
- Block 8: (image) 포장한 선물 (내용물 안 보이게)
- Block 9: 건네고 나서 "서랍행 아니길" 바라는 마음
- Block 10: 남편 생일 선물 고르는 팁으로 마무리 + 키워드

- [ ] **Step 2: Write the 5 comments**
Comment #4: "뭘 골랐는지 궁금해요!" → "여기서 봤어요~ [cafe24 link] 아직 서랍행인지는 지켜보는 중이에요 ㅎㅎ"

- [ ] **Step 3: Update the b-002 object in posts-blog-b.ts**
- [ ] **Step 4: Run build to verify**
- [ ] **Step 5: Commit**
```bash
git add src/lib/content/posts-blog-b.ts
git commit -m "content: rewrite b-002 as failure story (남편 생일 선물)"
```

---

### Task 10: Rewrite b-003 (Tips/Info — 실용적인 선물)

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts` (b-003 section)

**Narrative:** 실용적인 선물 고르는 기준 3-4가지. 차량용품은 카테고리 예시 중 하나. 끝: "받자마자 쓰는 장면이 떠오르면 성공."

**Rules:** Keyword "실용적인 선물" 3-4회. Product exposure ~15%.

- [ ] **Step 1: Write the 10 content blocks**

Tips/Info arc:
- Block 1: 실용적인 선물 고르기가 왜 어려운지
- Block 2: (image) 관련 상황
- Block 3: 기준1 — "받자마자 바로 쓸 수 있는가"
- Block 4: 기준2 — "일상에서 반복적으로 쓰는가"
- Block 5: 기준3 — "보관/관리가 번거롭지 않은가"
- Block 6: (image) 기준 적용 과정
- Block 7: 카테고리 예시 — 주방용품, 차량용품(제품 카테고리 언급), 생활소품
- Block 8: (image) 실용적 선물 예시
- Block 9-10: 정리 + 키워드 마무리

- [ ] **Step 2: Write the 5 comments**
- [ ] **Step 3: Update the b-003 object in posts-blog-b.ts**
- [ ] **Step 4: Run build to verify**
- [ ] **Step 5: Commit**
```bash
git add src/lib/content/posts-blog-b.ts
git commit -m "content: rewrite b-003 as tips/info (실용적인 선물)"
```

---

## Chunk 4: Blog B Posts (b-004 ~ b-006)

### Task 11: Rewrite b-004 (Comparison — 다이소 방향제 추천)

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts` (b-004 section)

**Narrative:** 다이소 방향제 2-3종 + 다른 가격대 1-2종 비교. 제품이 비교 대상 중 하나로 자연스럽게. 끝: "가격대별로 만족도가 다르다."

**Rules:** Keyword "다이소 방향제 추천" 3-4회. Product exposure ~20%.

- [ ] **Step 1: Write the 10 content blocks**

Comparison arc:
- Block 1: 방향제 추천글 왜 쓰게 됐는지 (남편 차 때문에 여러 개 사봤다)
- Block 2: (image) 비교할 방향제들 모아둔 장면
- Block 3: 다이소 고체형 — 가격, 향, 지속력
- Block 4: 다이소 젤형 — 가격, 향, 지속력
- Block 5: 만원대 송풍구형 — 가격, 향, 지속력
- Block 6: (image) 사용 과정
- Block 7: 대시보드형 (햇빛 타입 = 제품) — 가격, 향, 지속력 (동등하게 비교)
- Block 8: (image) 현재 상태
- Block 9: 비교 결과 표 or 정리
- Block 10: "가격대별로 다르다" + 키워드 마무리

- [ ] **Step 2: Write the 5 comments**
- [ ] **Step 3: Update the b-004 object in posts-blog-b.ts**
- [ ] **Step 4: Run build to verify**
- [ ] **Step 5: Commit**
```bash
git add src/lib/content/posts-blog-b.ts
git commit -m "content: rewrite b-004 as comparison (다이소 방향제 추천)"
```

---

### Task 12: Rewrite b-005 (Lifestyle Episode — 자동차 꾸미기)

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts` (b-005 section)

**Narrative:** 남편 차 몰래 꾸며주기 에피소드. 제품은 꾸미기 과정에서 자연스럽게. 끝: 남편 반응.

**Rules:** Keyword "자동차 꾸미기" 3-4회. Product exposure ~10%.

- [ ] **Step 1: Write the 10 content blocks**

Lifestyle Episode arc:
- Block 1: 남편 차 깜짝 꾸미기를 계획한 이유
- Block 2: (image) 계획 시작 장면
- Block 3: 뭘 바꿀지 고민 (매트, 대시보드, 향)
- Block 4: 남편 출근 사이에 몰래 정리 시작
- Block 5: 꾸미기 과정 — 이것저것 올려보기 (제품 하나 포함)
- Block 6: (image) 꾸미기 중간
- Block 7: 남편 퇴근 후 차 타는 순간
- Block 8: (image) 완성된 차 내부
- Block 9: 남편 반응 — "뭔가 달라졌는데?" ㅎㅎ
- Block 10: 자동차 꾸미기 소감 + 키워드 마무리

- [ ] **Step 2: Write the 5 comments**
- [ ] **Step 3: Update the b-005 object in posts-blog-b.ts**
- [ ] **Step 4: Run build to verify**
- [ ] **Step 5: Commit**
```bash
git add src/lib/content/posts-blog-b.ts
git commit -m "content: rewrite b-005 as lifestyle episode (자동차 꾸미기)"
```

---

### Task 13: Rewrite b-006 (Comparison — 블랙체리향 방향제)

**Files:**
- Modify: `src/lib/content/posts-blog-b.ts` (b-006 section)

**Narrative:** 과일/베리향 방향제 여러 개 비교. 블랙체리향 포함. 끝: "향은 직접 맡아봐야 안다."

**IMPORTANT:** 키워드가 커피향 → 블랙체리향으로 변경됨. 전면 재작성 (title, tags, body, comments, captions 모두).

**Rules:** Keyword "블랙체리향 방향제" 3-4회. Product exposure ~20%.

- [ ] **Step 1: Write the 10 content blocks**

Comparison arc:
- Block 1: 과일향/베리향 방향제에 관심 갖게 된 이유
- Block 2: (image) 비교할 방향제들
- Block 3: 라벤더향 — 무난하지만 차 안에서 너무 강함
- Block 4: 피치/복숭아향 — 달콤하지만 오래 못 감
- Block 5: 체리/블랙체리향 — 달지 않고 깊은 향 (제품 포함)
- Block 6: (image) 사용 과정
- Block 7: 향 비교 정리 + 차 안에서의 차이
- Block 8: (image) 현재 쓰고 있는 상태
- Block 9: 향 선택은 개인차라는 결론
- Block 10: "직접 맡아봐야 안다" + 키워드 마무리

- [ ] **Step 2: Write the 5 comments**
- [ ] **Step 3: Update the b-006 object in posts-blog-b.ts**
- [ ] **Step 4: Run build to verify**
- [ ] **Step 5: Commit**
```bash
git add src/lib/content/posts-blog-b.ts
git commit -m "content: rewrite b-006 as comparison (블랙체리향 방향제)"
```

---

## Chunk 5: Image Prompts

### Task 14: Write 36 Nano Banana 2 Image Prompts

**Files:**
- Create: `docs/image-prompts.md`
- Read first: `src/lib/content/posts-blog-a.ts` and `src/lib/content/posts-blog-b.ts` (finalized content after Tasks 2-13)

**IMPORTANT: Before writing any prompt, reference these spec sections:**
- Spec Section 5.4 — Image Role by Narrative Type (what each image should show per narrative type)
- Spec Section 5.5 — Image 3 Product Visibility by Post (which posts show product in Image 3, and method)
- Spec Section 5.7 — Prompt Writing Rules

**Rules from spec:**
- Blog A preset: iPhone 15 Pro, tilted angle, male driver snap, no filters, dark leather sedan interior, fine dust/scratches, no logos
- Blog B preset: iPhone 15 Plus, Kodak Portra 400 tone, housewife snap, warm light, group-chat-photo level, no logos
- Brand avoidance: no G80/Genesis/Daiso logos or distinctive marks visible
- Describe scenes like a creative director — narrative paragraphs, not keywords
- Include: lighting direction + quality, texture/material details, photographer behavior, intentional imperfection
- Constrain: "no text, no logos, no watermarks, no perfect symmetry"

- [ ] **Step 1: Write Blog A image prompts (18 prompts)**

For each of a-001 through a-006, write 3 prompts. Each prompt:
1. Opens with Blog A preset
2. Describes the specific scene from the finalized content block context
3. Specifies lighting direction and quality
4. Includes texture/material details
5. Describes photographer behavior
6. Adds intentional imperfections
7. Ends with constraints

Format per prompt:
```markdown
#### a-001 Image 1 (Block 2) — 출고 첫날 주차장

[Full prompt text here]

**Context:** [Which text block this follows, what the image should convey]
**Product visible:** Yes/No
**Method:** Text only / Reference image + prompt
```

- [ ] **Step 2: Write Blog B image prompts (18 prompts)**

Same structure but using Blog B preset.

- [ ] **Step 3: Mark Image 3 prompts that need reference photos**

Add a summary table at the top of the document:

```markdown
## Reference Image Required
| Post | Image | Needs reference photo? |
|------|-------|----------------------|
| a-001 | Image 3 | Yes |
| a-002 | Image 3 | Yes |
| a-003 | Image 3 | No |
...
```

- [ ] **Step 4: Commit**
```bash
git add docs/image-prompts.md
git commit -m "docs: add 36 Nano Banana 2 image prompts"
```

---

### Task 15: Final Build Verification

**Files:**
- Verify: `src/lib/content/posts-blog-a.ts`
- Verify: `src/lib/content/posts-blog-b.ts`

- [ ] **Step 1: Run full build**
```bash
cd /Users/jun/Projects/Naver-blog-clone && npm run build
```
Expected: Build passes.

- [ ] **Step 2: Verify post count and structure**

Quick check that all 12 posts exist and have correct structure:
- Each post has 10 content blocks (7 text + 3 image)
- Images at positions 2, 6, 8
- Each post has 5 comments
- Comment #4 has cafe24 link
- No product name in body text
- Tags match new narratives

- [ ] **Step 3: Final commit if any fixes needed**
```bash
git add -A
git commit -m "fix: post-rewrite verification fixes"
```
