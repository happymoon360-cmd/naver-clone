# Naver Blog Clone Walkthrough

## Project Overview
This is a pixel-perfect clone of the Naver Blog UI (excluding copyrighted logos) built with Next.js 14. It includes a powerful Admin Dashboard to manipulate engagement metrics and author comments under any alias.

## Getting Started

1. **Install Dependencies** (if not already done)
   ```bash
   npm install
   ```

2. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Feature Guide

### 1. Admin Dashboard (`/admin`)
This is the control center for your blog manipulation features.
- **Create Post**: Write generic posts to populate the blog.
- **Manipulate Stats**:
    - **Views**: Edit the view count to any number (e.g., set directly to 9,999).
    - **Likes**: Edit the like count freely.
- **Manage Comments**: 
    - Click **"Comments"** on any post in the list to expand.
    - View all comments for that post and **Delete** specific ones.

### 2. Comment System (Impersonation)
On any blog post detail page:
- Scroll to the comment section.
- **Nickname Field**: You can type *any* name here (e.g., "G-Dragon", "Anonymous").
- **Post**: The comment will appear immediately with that name.

### 3. View Count Logic
- **Auto-Increment**: Visits to a post detail page will automatically increment the view count by 1.
- **Manual Override**: Use the Admin Dashboard to set the view count to a specific value regardless of actual visits.

### 4. Vercel Deployment
1. Push this code to GitHub.
2. Import project in Vercel.
3. **Database**: Switch `prisma/schema.prisma` provider to `postgresql` if verifying on Vercel with Vercel Postgres, or use SQLite for quick demo (note: SQLite files on Vercel are ephemeral).
   - *Recommendation*: For persistent production data, connect a Vercel Postgres database and update `.env` with `POSTGRES_PRISMA_URL`.

## Project Structure
- `app/admin/page.tsx`: Admin logic.
- `app/api/`: Backend endpoints for manipulation.
- `components/layout/`: Naver-style Header, Sidebar.
- `components/blog/`: Post list, Detail, Comment UI.
