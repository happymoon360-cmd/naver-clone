# Implementation Plan - Naver Blog Clone

## Goal Description
Create a functional clone of the Naver Blog interface with specific backend capabilities to manually manipulate engagement metrics (Likes, Views) and author comments under arbitrary identities.

## Key Requirements
- **Authenticity**: Visual clone of Naver Blog (excluding logo).
- **Manipulation**: Admin features to set absolute values for Views/Likes and write comments as any user.
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
  viewCount Int       @default(0) // Manually editable
  likeCount Int       @default(0) // Manually editable
  category  String?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  comments  Comment[]
}

model Comment {
  id         Int       @id @default(autoincrement())
  postId     Int
  post       Post      @relation(fields: [postId], references: [id], onDelete: Cascade)
  authorName String    // Arbitrary input allowed
  authorIcon String?   // Optional URL/Icon ID
  content    String
  parentId   Int?      // For replies
  createdAt  DateTime  @default(now())
}
```

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
