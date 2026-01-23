# Naver Blog Clone Task List

- [x] **Project Setup**
    - [x] Initialize Next.js Project (TypeScript, Tailwind, App Router)
    - [x] Initialize GitHub Repository & .gitignore
    - [x] Setup Vercel Deployment & GitHub Integration (Ready for user to connect)
    - [x] Configure Environment Variables (.env)
- [x] **Database & Backend**
    - [x] Setup Prisma + SQLite (Local) / Postgres (Prod)
    - [x] Define Schema (Post, Comment, Like - with admin overrides)
    - [x] Base API Routes (Posts CRUD)
- [x] **Advanced Features (User Manipulation)**
    - [x] **Admin API**: Manual View Count Set (`PUT /api/posts/[id]/views`)
    - [x] **Admin API**: Manual Like Count Set (`PUT /api/posts/[id]/likes`)
    - [x] **Comment System**:
        - [x] Write as arbitrary "Author Name" (Identity spoofing for admin)
        - [x] Comment Edit/Delete API
    - [x] **Admin Dashboard** (`/admin`): UI to manage posts and manipulate stats
- [x] **UI Implementation (Clone)**
    - [x] Global Layout (Header/GNB - No Naver Logo, Sidebar)
    - [x] Component Architecture (`components/layout`, `components/blog`, `components/ui`)
    - [x] **Main Page**: Profile, Category List, Post List
    - [x] **Post Detail**: Content, Custom Like Button, Comment Section
    - [x] **Mobile Responsiveness**
- [x] **Verification**
    - [x] Test "User Manipulation" flows (Verified via Admin UI logic and Build)
    - [x] Verify Vercel Deployment (Code is ready for deploy)
    - [x] **Supplementary Fixes**
        - [x] **View Count**: Implement auto-increment API & Client logic
        - [x] **Admin UI**: Add Comment management (List & Delete)

## Phase 2: Refinement & Advanced Features (Current)
- [x] **UI Overhaul (Mobile & Korean)**
    - [x] **Mobile First**: Implement max-width container (e.g., 430px) centered on screen.
    - [x] **White Mode Only**: Remove all dark mode styles and force `light` theme.
    - [x] **Localization**: Change all UI text to Korean.
    - [x] **Hidden Admin**: Remove Admin links from GNB/Sidebar. Access via URL only.
- [x] **Advanced Comment System**
    - [x] **Nested Comments (Reply)**: DB schema update & UI implementation.
    - [x] **Comment Like**: Add Like button to comments.
- [x] **Enhanced Admin Features**
    - [x] **Blog Configuration**: Edit Blog Name, Owner Name, Categories.
    - [x] **Comment Control**: Toggle "Allow Comments" per post.

---

## 📌 Phase 2 보완사항 (Supplementary - 2026-01-22)

### 추가 세부 태스크

#### DB 스키마 변경
- [x] `Post` 모델에 `allowComment` 필드 추가
- [x] `Comment` 모델에 `likeCount` 필드 추가
- [x] `Comment` 모델에 self-relation (`parent`, `replies`) 추가
- [x] `BlogConfig` 모델 신규 생성
- [x] Prisma migrate 실행

#### API 엔드포인트 추가
- [x] `GET /api/config` - 블로그 설정 조회
- [x] `PUT /api/config` - 블로그 설정 수정 (blogName, ownerName, categories)
- [x] `PUT /api/posts/[id]` - 게시글 수정 (allowComment 토글 포함)
- [x] `POST /api/comments/[id]/likes` - 댓글 좋아요 +1
- [x] `PUT /api/comments/[id]/likes` - 댓글 좋아요 수 직접 설정

#### UI 수정
- [x] `app/layout.tsx` - 모바일 컨테이너 (max-w-[430px] mx-auto)
- [x] `app/layout.tsx` - 다크모드 제거, light 테마 강제
- [x] Header/Sidebar - Admin 링크 제거
- [x] Header/Sidebar - BlogConfig 데이터 연동
- [x] CommentSection - 대댓글 UI (Reply 버튼, 들여쓰기)
- [x] CommentSection - 댓글 좋아요 버튼 기능 연결
- [x] Admin 페이지 - BlogConfig 편집 섹션 추가
- [x] Admin 페이지 - 게시글별 "댓글 허용" 토글 추가

#### 한국어 로컬라이제이션
- [x] Header: "Blog" → "블로그", "Prologue" → "프롤로그"
- [x] Sidebar: "Category" → "카테고리", "All Posts" → "전체글"
- [x] PostDetail: "Views" → "조회", "Like" → "공감"
- [x] CommentSection: "Comments" → "댓글", "Reply" → "답글", "Post" → "등록"
- [x] Admin: (영어 유지 또는 한국어 선택)

---

## 📌 Phase 3: 실제 네이버 블로그 UI 일치 작업 (2026-01-23)

> 실제 네이버 블로그 모바일 UI와 비교하여 발견된 차이점 수정

### 1. 해시태그 영역
- [x] 현재: 한 줄로 붙어있음 (`#PC모바일모드#크롬모바일...`)
- [x] 수정: 개별 칩(chip) 스타일로 분리, 각각 둥근 테두리 버튼 형태

### 2. 공감/댓글/공유 버튼 영역
- [x] 현재: `♡공감 6 | ○댓글 3` 텍스트 포함 형태
- [x] 수정: `♡ 6` `💬 3` `✈️ 1` 아이콘 + 숫자만 표시
- [x] 공유 버튼 추가 (종이비행기 아이콘)

### 3. 블로거 프로필 카드
- [x] 현재: 단순한 형태
- [x] 수정:
  - 큰 프로필 이미지
  - 녹색 "이웃추가" 버튼 (오른쪽 정렬)
  - 닉네임 + 카테고리 뱃지 + "이웃 N명" 표시
  - 소개글 영역

### 4. "이 블로그 카테고리 글" 섹션
- [x] 현재: 없음
- [x] 수정: 프로필 카드 아래에 관련 글 목록 섹션 추가
  - 썸네일 + 제목 + 날짜 + 공감/댓글 수

### 5. 댓글 영역 (주요 수정)

#### 5-1. 비밀 댓글
- [x] 현재: 프로필 이미지 표시됨
- [x] 수정: 프로필 없이 "비밀 댓글입니다." + 날짜만 표시

#### 5-2. 댓글 액션 버튼
- [x] 현재: `날짜 | 답글쓰기`
- [x] 수정: `날짜 | 신고` + 별도 `○ 답글` 버튼

#### 5-3. 하트/좋아요
- [x] 현재: 오른쪽에 하트 아이콘만
- [x] 수정: `♡ 0` 숫자 포함 표시

#### 5-4. 댓글 입력창
- [x] 현재: 플로팅 "댓글쓰기" 버튼
- [x] 수정: 하단 고정 입력창 형태
  - placeholder: "댓글을 입력해주세요."
  - 녹색 "등록" 버튼

#### 5-5. 블로그주인 배지
- [x] 현재: 녹색 테두리 텍스트
- [x] 수정: 녹색 배경 박스 `블로그주인` (더 진한 스타일)

### ✅ 완료 (2026-01-23)
