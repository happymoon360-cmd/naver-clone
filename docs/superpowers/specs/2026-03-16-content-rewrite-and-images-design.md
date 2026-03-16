# Content Rewrite & Image Generation Design

**Date:** 2026-03-16
**Scope:** Full rewrite of 12 blog posts + 36 image prompts for Nano Banana 2

---

## 1. Problem Statement

All 12 posts currently follow the same narrative arc:
> Problem → cheap attempt → failure → solar air freshener discovery → solved!

A reader who reads 2-3 posts will immediately recognize the blog as a product promotion page. Posts need diversified narratives to feel like a genuine personal blog.

---

## 2. Narrative Types (6 types)

### 2.1 Comparison (비교형)
- Reviews multiple products/options side by side
- Product appears as one of several options, treated equally (~20% exposure)
- Ends with balanced conclusion, not a product endorsement

### 2.2 Lifestyle Episode (일상 에피소드형)
- Personal story is the main content
- Product appears incidentally in the story (~10% exposure)
- Ends with the episode's natural conclusion, not product praise

### 2.3 Failure Story (실패담형)
- Centers on a failed product/approach experience
- Product either not mentioned or only hinted at the end (~5% exposure)
- Ends with the failure lesson, no clear alternative presented

### 2.4 Tips/Info (팁/정보형)
- Shares 3-5 practical tips on a topic
- Product category included as one tip among many (~15% exposure)
- Ends with general advice, not product-specific recommendation

### 2.5 Usage Review (사용 후기형)
- Starts with product already in use (no discovery arc)
- Reviews within daily life context (~25% exposure)
- Ends with everyday reflection, not product promotion

### 2.6 Discovery (발견형) — NOT USED
- The current structure. Removed from all 12 posts.

---

## 3. Post-Narrative Mapping

### Blog A (깔끔한드라이버 — male, late 40s, Genesis owner)

| Post | Target Keyword | Narrative Type | Story Summary |
|------|---------------|----------------|---------------|
| a-001 | 새차 + 방향제 | Lifestyle Episode | G80 delivery day story. Excitement, first parking, dashcam install. Product mentioned in passing during dashboard setup. Ends with delivery day impressions. |
| a-002 | 주차 알림판 | Tips/Info | Types of parking number boards (paper, magnetic, suction, combo) with pros/cons. Combo type is one option. Ends with "pick what fits your car." |
| a-003 | 다이소 차량용품 | Comparison | Honest review of 4-5 Daiso car accessories. Product NOT mentioned at all. Pure Daiso review. Ends with "some worth it, some not." |
| a-004 | 다이소 방향제 | Failure Story | One month with Daiso air freshener — initial hope to disappointment. Ends with "still looking for alternatives." Product NOT shown. |
| a-005 | 차 꾸미기 | Tips/Info | 3-4 tips for clean dashboard. "Reduce items with combo products" is one tip. Ends with "less is more." |
| a-006 | 새차 | Usage Review | One month after delivery update. Product already on dashboard, described casually. Ends with monthly car ownership reflection. |

### Blog B (살림하는엄마 — female, early 50s, housewife)

| Post | Target Keyword | Narrative Type | Story Summary |
|------|---------------|----------------|---------------|
| b-001 | 차 냄새 | Lifestyle Episode | Husband's car smell — couple dynamics episode. Tried various solutions along the way. Ends with couple episode resolution. |
| b-002 | 남편 생일 선물 | Failure Story | Past birthday gift failures (ended up in drawer). Focus is on the pattern of wasted gifts. Ends ambiguously with wrapping a new gift — what it is stays vague ("이번엔 매일 손이 가는 쪽으로"), no product description, no result shown. |
| b-003 | 실용적인 선물 | Tips/Info | 3-4 criteria for picking practical gifts. Car accessories mentioned as one category example. Ends with "if you can picture them using it immediately, that's the one." |
| b-004 | 다이소 방향제 추천 | Comparison | 2-3 Daiso fresheners + 1-2 other price ranges compared. Product included as one option naturally. Ends with "satisfaction differs by price range." |
| b-005 | 자동차 꾸미기 | Lifestyle Episode | Secretly decorating husband's car as surprise. Product appears naturally in the process. Ends with husband's reaction. |
| b-006 | 블랙체리향 방향제 | Comparison | Multiple fruit/berry scented fresheners compared. Black cherry option included. Ends with "you have to smell it yourself." |

---

## 4. Content Rules (unchanged)

- 10 content blocks per post (7 text + 3 image), images at blocks 2, 6, 8
- 3 images per post
- Product name NEVER in body text
- Product link in comment #4 (Q&A reply) — ALL 12 posts, including a-003/a-004 where product is absent from body. Comment Q&A must transition naturally (e.g., reader asks about alternatives → author shares link).
- 5 comments per post (community-style Q&A)
- Tags must match new narrative — remove product-related tags (e.g., "태양열 방향제") from posts where product is not mentioned
- Blog A tone: 담백, 보배드림 느낌, 짧은 문장
- Blog B tone: 친근, 주부 일상, 따뜻한 말투

---

## 5. Image Strategy

### 5.1 Common Principles

**Authenticity over quality:**
- 40-50s Korean blogger taking casual phone photos
- Not composed, not edited, not Instagram-worthy
- Blog A: especially rough — one-handed snap from driver seat
- Blog B: slightly more care, but still group-chat-photo level
- All 3 images per post should have similar casual quality (no sudden pro-shot)

**Brand Recognition Avoidance Rule:**
| Subject | Policy |
|---------|--------|
| Our product (solar air freshener) | OK — use reference photo, nobody recognizes it |
| Genesis G80 / specific car models | NO direct exposure — no logos, emblems, distinctive dashboard design |
| Daiso products | NO direct exposure — no Daiso packaging or logos |
| Other recognizable brands | NO — same rule |

**How to avoid:**
- Car interior: angles that hide logos/emblems, crop steering wheel logo, partial dashboard only
- Prompt as "dark leather dashboard of a mid-size sedan" instead of naming models
- Daiso products: "generic small vent-clip air freshener in cheap plastic" — no brand
- Prefer close-ups over wide shots to reduce brand cues

### 5.2 Blog A Image Preset

> Shot on iPhone 15 Pro, no composition planning, slightly tilted angle, casual male driver's perspective from driver seat. No post-processing, no filters. Dark leather interior of a mid-size Korean sedan. Mundane, unstaged, the way a middle-aged Korean man would snap a quick photo to show a friend. Visible fine dust, minor scratches, lived-in details. No logos, no brand marks visible.

### 5.3 Blog B Image Preset

> Shot on iPhone 15 Plus, warm natural light, Kodak Portra 400 color tone, Korean housewife's casual snap. Slightly more care than a man's photo but still everyday — not influencer level. Subtle warmth, like a 50-something mom taking a photo to share in a family group chat. Soft, slightly overexposed highlights. No logos, no brand marks visible.

### 5.4 Image Role by Narrative Type

| Narrative Type | Image 1 | Image 2 | Image 3 |
|---------------|---------|---------|---------|
| Comparison | Products/options laid out | Using/testing process | Final comparison or daily scene |
| Lifestyle Episode | Episode start scene | Episode middle | Episode ending (may not be product) |
| Failure Story | Failed product/situation | Failure worsened | Failure result or empty dashboard |
| Tips/Info | Before-state or situation | Tip in action | After-state overview |
| Usage Review | Current car interior wide | In-use detail | Daily driving scene |

### 5.5 Image 3 Product Visibility by Post

| Post | Product in Image 3? | Method |
|------|---------------------|--------|
| a-001 | Yes — naturally on dashboard | Reference image + prompt |
| a-002 | Yes — one of several items | Reference image + prompt |
| a-003 | No — Daiso items only | Text prompt only |
| a-004 | No — failure result only | Text prompt only |
| a-005 | Yes — part of clean dashboard | Reference image + prompt |
| a-006 | Yes — already placed, casual | Reference image + prompt |
| b-001 | Yes — naturally in husband's car | Reference image + prompt |
| b-002 | No — gift wrapped, unclear | Text prompt only |
| b-003 | Yes — one example among tips | Reference image + prompt |
| b-004 | Yes — one of compared products | Reference image + prompt |
| b-005 | Yes — part of decoration | Reference image + prompt |
| b-006 | Yes — one of compared scents | Reference image + prompt |

### 5.6 Reference Image Workflow (Method B)

1. Images with product visible → Gemini web: product photo + text prompt
2. Images without product → text prompt only (Antigravity or Gemini)
3. Test first: generate a-006 Image 3 sample in Gemini web → verify quality
4. If quality OK → proceed with remaining images
5. Daily limit: ~15 images per 5 hours → 2-3 days for all 36

### 5.7 Prompt Writing Rules (from Nano Banana 2 research)

1. **Describe scenes like a creative director** — narrative paragraphs, not keyword lists
2. **Name real camera equipment** — activates learned depth-of-field characteristics
3. **Specify lighting direction + quality + intent** — "upper-left soft light casting uneven patches" not "good lighting"
4. **Include texture/material details** — "fine dust near vents", "worn leather" prevents plastic AI look
5. **Describe photographer's behavior** — "holding phone one-handed, tilted" adds authenticity
6. **Intentional imperfection** — off-center framing, partial objects at edges, slight blur
7. **State purpose** — "casual blog review photo" or "family group chat snap"
8. **Constrain aggressively** — "no text, no logos, no watermarks, no perfect symmetry"

---

## 6. Execution Order

### Phase 1: Content Rewrite (this session)
- Rewrite all 12 posts based on assigned narrative types
- Update image block captions to match new narratives
- Maintain existing comment structure (update if narrative changes require it)

### Phase 2: Image Prompts (this session)
- Write 36 prompts based on finalized content
- Apply Blog A/B presets + brand avoidance rules + Nano Banana 2 best practices

### Phase 3: Sample Test (next session)
- Test a-006 Image 3 in Gemini web with reference photo
- Verify photorealism quality before proceeding

### Phase 4: Full Image Generation (next session)
- Generate all 36 images via Antigravity or Gemini API
- ~15 images/5 hours → 2-3 days

### Phase 5: Code Integration (next session)
- Upload images to Cloudinary
- Update src paths in posts-blog-a.ts and posts-blog-b.ts
- Build verification + deploy

---

## 7. Keyword Change

- b-006: 커피향 방향제 → **블랙체리향 방향제** (product doesn't have coffee scent)
- This is a full narrative rewrite, not a find-and-replace. Title, tags, body text, comments, image captions all change to fruit/berry scent theme.

---

## 8. Notes

- Product reference photo: provided by user (multiple angles available). Location to be confirmed before Phase 3.
- Quality fallback: if Gemini web test fails quality bar, iterate on prompts before proceeding. Do not generate all 36 until sample is approved.
