# B-004 Quality Upgrade + Writing Guide Enhancement

## Goal

Upgrade B-004 blog post quality and writing guide by applying Organicmarketing's engagement framework (psychological hooks, tension curve, open loops) to the existing Blog B 5-act structure.

## Deliverables

1. **B-004 post rewrite** — all 7 text blocks + title rewritten with tension curve and open loops
2. **Writing guide update** — 4 new/modified sections in `docs/writing-guide-blog-b.md` (Section 2 modified, Sections 2-1 and 2-2 new, Section 6 updated)

## Context

- Source framework: `/Users/jun/Projects/Organicmarketing` carousel engine
- Blog B persona: 살림하는엄마 (50대 초반 여성, 존댓말 수다체)
- Technique import only — tone stays Blog B (NOT carousel 반말)
- Target keyword: "다이소 방향제" must remain in title, Block 1, Block 10, and tags (tag uses long-tail variant "다이소 방향제 추천")
- Product name ban: "차량용 태양열 방향제" never appears in body text

## User Priorities (ranked)

1. **CTR (Click-Through Rate)** — title must trigger curiosity
2. **서문 (Intro)** — Block 1 must hook with empathy + scene
3. **이탈방지 (Anti-Bounce)** — open loops between blocks, tension curve

---

## Section 1: Title

**Current:** `다이소 방향제 써봤는데.. 남편 차엔 이게 나았어요`

**Problem:** "이게 나았어요" is vague. No curiosity trigger.

**New title:** `다이소 방향제 1주일 써보고 결국 바꿨어요`

> **Note:** This supersedes the title from the gold-standard spec (`2026-03-15-gold-standard-b004-design.md`). The original title lacked a curiosity trigger; this upgrade prioritizes CTR per user requirements.

- Structure: B형 (숫자 + 반전)
- Hook: 정보갭 — "뭘로 바꿨지?"
- Keyword "다이소 방향제" at front for Naver bold matching
- "1주일" = concrete number → trust
- "결국 바꿨어요" = open loop → "뭘로?"

---

## Section 2: Tension Curve Mapping

Organicmarketing's 7-slide tension curve adapted to Blog B's 10-block 5-act structure.

| Block | Act | Tension | 심리 훅 | Open Loop (type) | Purpose |
|-------|-----|---------|---------|------------------|---------|
| 1 (text) | Hook | 4 | 정당화 | YES — 전환: "그래서 하나 사왔는데..." | 공감 + 키워드 삽입 |
| 2 (image) | Hook | — | — | — (unchanged) | 시각 증거 |
| 3 (text) | 시도 | 5 | 구체적 장면 | YES — 전환: 결론 없이 장면만, 다음 블록으로 흐름 | 디테일 신뢰 |
| 4 (text) | 시도 반응 | 5 | 낙차 세팅 | YES — 복선: "됐다 싶었는데..." / "근데 그게 며칠이었어요" | 실패 대비용 긍정 |
| 5 (text) | 실패 | **8** (peak) | 공포 | YES — 전환: "그래서 다른 거 없나 찾아봤거든요" | 텐션 피크 |
| 6 (image) | 실패 | — | — | — (unchanged) | 시각 증거 |
| 7 (text) | 발견 | **7** | 정보갭 | YES — 전환: "남편한테 보여줬더니..." | 발견 감정 |
| 8 (image) | 발견 | — | — | — (unchanged) | 시각 증거 |
| 9 (text) | 만족 | 4 | 감정 해소 | NO | 릴리즈 시작 |
| 10 (text) | 정리 | 2 | SEO wrap | NO | 릴리즈 완료 |

**Key principles:**
- All text blocks through Block 7 end with open loops. Blocks 9-10 close.
- Image blocks (2, 6, 8) are unchanged — they support the preceding text block.
- Block 3-4 share tension 5 intentionally: the "attempt" phase holds steady because the reader expects success. The shock comes from the sudden jump to 8 at Block 5.

---

## Section 3: Block-by-Block Rewrite Direction

### Block 1 — Hook (tension 4, 정당화 훅)

**Direction:**
- First sentence: concrete scene of the pain point — "말 못 하고 참는 상황" level empathy
- "다이소 방향제" keyword naturally inserted
- Last sentence: open loop — "그래서 하나 사왔는데..."
- 3 sentences

### Block 3 — 시도 (tension 5)

**Direction:**
- Specific price detail ("천몇백 원" / "천 원짜리")
- Daiso shopping scene — "지나가다 집어온" casual feel
- No conclusion. Scene only. Flows into Block 4 (reaction).
- 2-3 sentences

### Block 4 — 시도 반응 (tension 5, drop setup)

**Direction:**
- Keep husband's positive dialogue ("오 향 괜찮은데?")
- Critical change at end: setup for fall — "이 정도면 됐다 싶었어요" or foreshadow "근데 그게 며칠이었어요"
- 2-3 sentences

### Block 5 — 실패 (tension 8 PEAK, 공포 훅)

**Direction:**
- Stronger emotion than current "좀 아쉬웠어요" — elevate to "돈 아깝다" / "또 실패" feeling
- Keep husband dialogue (good)
- End with open loop: "그래서 다른 거 없나 찾아봤거든요"
- 3-4 sentences

### Block 7 — 발견 (tension 7, 정보갭 훅)

**Direction:**
- Focus on the MOMENT of discovery, not feature listing
- Sentence 1: discovery moment — "잠깐, 선이 없네?" style reaction
- Sentence 2: one surprise point elaboration — the single most striking feature
- Sentence 3: open loop — "남편한테 보여줬더니..."
- Move remaining features (번호판 겸용 etc.) to Block 9
- 3 sentences total

### Block 9 — 만족 (tension 4, release)

**Direction:**
- Keep: "향 유지 + 남편이 직접 관리" (good indirect proof)
- Add: features moved from Block 7 — "쓰다 보니 이것도 편하더라고요" (번호판 겸용 etc.)
- Closed tone OK (release zone)
- 2-3 sentences

### Block 10 — 정리 (tension 2, full release)

**Direction:**
- "다이소 방향제" keyword re-insertion (SEO)
- Last sentence: personal address — "저처럼 남편 차 냄새 고민이면~"
- Memorable close, not generic
- 2-3 sentences

---

## Section 4: Writing Guide Updates

**File:** `docs/writing-guide-blog-b.md`

### 4a. Modify Section 2 (5단계 서사 구조)

Add to existing 5-act table: tension score, 심리 훅, open loop columns.

Add subsection **"Open Loop 작성법"**:
- Principle: Block 1-7 must end with open loop
- 3 open loop patterns: 복선 (foreshadow), 전환 (transition), 질문 (question)
- Good vs Bad table

### 4b. New Section 2-1: 심리 훅 5종

| Hook | Description | Blog Application |
|------|-------------|-----------------|
| 정당화 (Validation) | "나만 그런 거 아니잖아요" | Block 1 서문 |
| 정보갭 (Information Gap) | "이런 게 있었어요" | Block 7 발견 |
| 공포 (Fear) | "이대로 두면 돈만 날려요" | Block 5 실패 |
| 탐욕 (Curiosity) | "결과가 궁금하죠?" | 제목 |
| 소속감 (Belonging) | "저만 알려드릴게요" | 댓글 답글 |

Each hook includes: definition, blog-tone example (존댓말), when to use.

### 4c. New Section 2-2: 제목 구조 5종

| Structure | Pattern | Example |
|-----------|---------|---------|
| A | 감정 + 규모 + 반전 | TBD — examples to be added when first used for a Blog B post |
| B | 숫자 + 반전 | `다이소 방향제 1주일 써보고 결국 바꿨어요` |
| C | 기대 + 반전 | `다이소 방향제 써봤는데.. 일주일 만에 무향` |
| D | 대결 + 약속 | `다이소 방향제 vs 지금 쓰는 거, 솔직 비교` |
| E | 소속감 + 비밀 | TBD — examples to be added when first used for a Blog B post |

Selection guidance: match structure to post topic.

### 4d. Modify Section 6 (B-004 주석 전문)

Replace with rewritten B-004 text. Each block annotation **adds** to the existing WHY/TONE/SEO fields (keep those, don't replace):
- **TENSION:** score (e.g., 8)
- **HOOK:** type (e.g., 공포)
- **LOOP:** open loop technique used (e.g., 복선) — or "closed" for Blocks 9-10

---

## Constraints

- No changes to Post type, ContentBlock type, or any component code
- Only `src/lib/content/posts-blog-b.ts` (B-004 entry) and `docs/writing-guide-blog-b.md` modified
- Build must pass after changes
- Korean blog content only — persona tone unchanged
- All Organicmarketing techniques adapted to 존댓말 수다체
- Comments array unchanged (already gold standard from prior commit)
