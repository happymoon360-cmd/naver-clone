# Implementation Plan - Naver Blog Clone

## Goal Description
Create a functional clone of the Naver Blog interface with specific backend capabilities to manually manipulate engagement metrics (Likes, Views) and author comments under arbitrary identities.

## Key Requirements
- **Authenticity**: Visual clone of Naver Blog (Mobile View).
- **Manipulation**: Admin features to set absolute values for Views/Likes and write comments as any user.
- **Phase 2 Refinements**: Korean UI, Mobile-only layout (centered), Hidden Admin, Nested Comments, Blog Config.
- **Tech**: Next.js 14, Tailwind, Prisma, Vercel, GitHub.

## Proposed Changes

### 1. Project Structure
```
Naver-clone/
├── app/
│   ├── layout.tsx              # Root Layout
│   ├── page.tsx                # Blog Main
│   ├── blog/[postId]/page.tsx  # Post Detail
│   ├── admin/page.tsx          # Admin Control Panel
│   └── api/                    # Backend API
│       ├── posts/[id]/
│       │   ├── views/route.ts  # PUT: Set View Count
│       │   ├── likes/route.ts  # PUT: Set Like Count
│       │   └── comments/       # GET/POST Comments
├── components/
│   ├── layout/ (Header, Sidebar, Footer)
│   ├── blog/   (PostList, PostCard, CommentSection)
│   └── ui/     (Buttons, Inputs, etc.)
├── lib/
│   ├── prisma.ts
│   └── utils.ts
└── prisma/schema.prisma
```

### 2. Database Schema (Prisma)
```prisma
model Post {
  id        Int       @id @default(autoincrement())
  title     String
  content   String    @db.Text
  viewCount Int       @default(0)
  likeCount Int       @default(0)
  category  String?
  allowComment Boolean @default(true) // New: Toggle comments
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  comments  Comment[]
}

model Comment {
  id         Int       @id @default(autoincrement())
  postId     Int
  post       Post      @relation(fields: [postId], references: [id], onDelete: Cascade)
  authorName String
  authorIcon String?
  content    String
  pass       String?   // Optional password for guest deletion
  likeCount  Int       @default(0) // New: Comment likes
  parentId   Int?      // Self-relation
  parent     Comment?  @relation("Reply", fields: [parentId], references: [id])
  replies    Comment[] @relation("Reply")
  createdAt  DateTime  @default(now())
}

model BlogConfig {
  id        Int    @id @default(autoincrement())
  blogName  String @default("My Blog")
  ownerName String @default("Owner")
  categories String @default("Daily,Tech,Travel") // Simple CSV storage
}
```

### Phase 2: UI & Features
1. **Mobile Layout**: Wrap `children` in `app/layout.tsx` with a `max-w-[430px] mx-auto bg-white min-h-screen shadow-lg` container. Body background gray.
2. **Hidden Admin**: Remove `<Link href="/admin">` from Header.
3. **Blog Config**: Check for `BlogConfig` row 1 on load. If missing, create default. Use this data in Header/Sidebar.
4. **Nested Comments**:
    - Update Comment API to fetch with `include: { replies: true }` or handle nesting in UI.
    - Add "Reply" button action -> Set `parentId`.

### 3. API Design
- **Manipulation APIs**:
    - `PUT /api/posts/[id]/views`: Body `{ count: number }` -> Sets direct value.
    - `PUT /api/posts/[id]/likes`: Body `{ count: number }` -> Sets direct value.
- **Comment API**:
    - `POST /api/posts/[id]/comments`: Body `{ authorName: "Anyone", content: "..." }` -> No auth check, allows spoofing.

### 4. Admin Dashboard
- Simple page at `/admin`.
- List all posts.
- Inputs to update Title, Content.
- Inputs to **User-Override** View Count & Like Count.
- Management of all comments (Delete/Edit).

## Verification Plan
### Automated Tests
- `npm run build` verification.

### Manual Verification
- **Admin Flow**: Go to `/admin`, change Post A's view count to 9999. Go to Blog Detail, verify 9999 views.
- **Comment Flow**: Write comment as "Singer IU", then another as "Actor Gong Yoo". Verify both appear with correct names.

---

## 📌 Phase 2 보완사항 (Supplementary - 2026-01-22)

### 1. 추가 API 엔드포인트 설계

```
# 블로그 설정
GET    /api/config              # 블로그 설정 조회 (BlogConfig row 1)
PUT    /api/config              # 블로그 설정 수정
       Body: { blogName, ownerName, categories }

# 게시글 댓글 허용 토글
PUT    /api/posts/[id]          # 기존 수정 API에 allowComment 필드 추가
       Body: { title?, content?, category?, allowComment? }

# 댓글 좋아요
POST   /api/comments/[id]/likes # 댓글 좋아요 +1
PUT    /api/comments/[id]/likes # 댓글 좋아요 수 직접 설정
       Body: { count: number }
```

### 2. 모바일 레이아웃 구현 상세

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="light">
      <body className="bg-gray-100">
        {/* 모바일 컨테이너 - 430px 중앙 정렬 */}
        <div className="max-w-[430px] mx-auto bg-white min-h-screen shadow-lg">
          <Header />
          <main className="flex flex-col">{children}</main>
        </div>
      </body>
    </html>
  );
}
```

### 3. 대댓글 UI 구조

```
댓글 (parentId: null)
├── [프로필] 닉네임 · 시간
├── 댓글 내용
├── [답글] [좋아요 ❤️ 0]
│
└── 대댓글 (parentId: 부모ID) - 들여쓰기
    ├── [프로필] 닉네임 · 시간
    ├── 대댓글 내용
    └── [좋아요 ❤️ 0]
```

### 4. Admin 페이지 BlogConfig 섹션

```
┌─────────────────────────────────┐
│ 블로그 설정                      │
├─────────────────────────────────┤
│ 블로그 이름: [______________]   │
│ 주인장 이름: [______________]   │
│ 카테고리:    [Daily,Tech,Travel]│
│                    [저장]       │
└─────────────────────────────────┘
```

### 5. 다크모드 제거 체크리스트

- [ ] `app/globals.css` - `@media (prefers-color-scheme: dark)` 제거
- [ ] `tailwind.config.ts` - `darkMode` 설정 제거 또는 `'class'`로 변경
- [ ] `app/layout.tsx` - `<html>` 태그에 `className="light"` 강제
- [ ] 모든 `dark:` 접두사 Tailwind 클래스 제거

### 6. 검증 시나리오 추가

| 테스트 | 예상 결과 |
|--------|----------|
| PC에서 접속 | 430px 너비 컨테이너가 중앙에 표시됨 |
| `/admin` 직접 입력 | 관리자 페이지 접근 가능 |
| 메인 페이지에서 Admin 링크 | 보이지 않음 |
| 댓글에 "답글" 클릭 | 대댓글 입력창 표시, 작성 시 들여쓰기로 표시 |
| 댓글 ❤️ 클릭 | 좋아요 수 +1 |
| Admin에서 블로그 이름 변경 | 메인 페이지 헤더에 반영됨 |
| Admin에서 "댓글 허용" OFF | 해당 게시글 상세에서 댓글 섹션 숨김 |
