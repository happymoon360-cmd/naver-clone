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
