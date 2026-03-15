# Blog B Content Upgrade Design

**Date:** 2026-03-16
**Status:** Approved by task brief

## Goal

Upgrade Blog B posts `B-001`, `B-002`, `B-003`, `B-005`, and `B-006` so they match the gold-standard narrative quality of `B-004` and comply with `docs/writing-guide-blog-b.md`.

## Constraints

- Do not modify `B-004`.
- Rewrite each target post to `8~10` blocks using the Blog B `5-step` narrative:
  `Hook -> 시도 -> 실패 -> 발견 -> 만족 + 정리`
- Keep image paths unchanged.
- Do not add the product name `차량용 태양열 방향제` in body copy.
- Keep cafe24 link usage to exactly one reply comment per post.
- Run `npm run build` after each post rewrite.

## Current Project Context

- Gold standard already exists in `src/lib/content/posts-blog-b.ts` as `B-004`.
- Writing guide defines:
  - persona (`살림하는엄마`, 50대 초반 여성, 남편 차 챙기는 주부)
  - tone endings (`~거든요`, `~더라고요`, `~잖아요`, `~인 거죠`)
  - open-loop requirement for blocks `1~7`
  - keyword placement in title, hook block, last block, and tags
  - fixed image rhythm (`2`, `6`, `8`)
  - fixed 5-comment pattern with one link reply

## Recommended Approach

### Approach 1: Minimal body-only edits

- Rewrite only `content` arrays.
- Low risk, but misses guide requirements tied to title and keyword placement.

### Approach 2: Full post-level alignment

- Rewrite `title`, `tags`, and `content` for each target entry.
- Preserve `id`, dates, images, comments structure, likes, and timestamps.
- Best match for the guide because keyword placement and CTR framing depend on title + body together.

### Approach 3: Global normalization

- Rewrite target posts and also normalize every comment/timestamp/caption pattern across the file.
- Higher churn than needed for this task.

## Chosen Design

Use **Approach 2**.

Each target post will:

- keep the same post object identity and image sources
- keep the same 10-block structure already present, but upgrade copy so each block maps cleanly to the guide
- keep comments at 5 entries with one link in reply `#4`
- strengthen the failure peak at block `5`
- make block `7` discovery more curiosity-driven and block `9~10` more relaxed
- ensure target keywords appear naturally in:
  - title front
  - block `1`
  - final block
  - tags

## Post-Level Angles

- `B-001`: 남편 차 냄새를 말로 지적하기 싫어서 조용히 해결책을 찾은 흐름
- `B-002`: 남편 생일 선물을 고를 때 "서랍행"이 제일 싫어서 실용 쪽으로 좁힌 흐름
- `B-003`: 실용적인 선물의 기준이 "바로 쓰게 되는가"로 바뀐 계기
- `B-005`: 자동차 꾸미기를 더하는 게 아니라 덜어내는 방향으로 재정의한 흐름
- `B-006`: 커피향 방향제를 찾다가 향 강도보다 답답하지 않은 지속감으로 기준을 바꾼 흐름

## Verification

- `npm run build` after each post rewrite
- final scan for:
  - accidental edits to `B-004`
  - changed image paths
  - forbidden product-name insertion
  - missing keyword mention in title/hook/final block
