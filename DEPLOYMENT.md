# Multi-Blog Deployment Guide

## Setup

This project supports multiple blog deployments from a single codebase.
Each blog is a separate Vercel project with different environment variables.

## Vercel Setup (per blog)

1. Create a new Vercel project linked to this repo.
2. Set environment variables from the corresponding `.env.blog-*` template.
3. Also set the shared secrets in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `ADMIN_PASSWORD`
4. Deploy.

## Blog A (남성 차량 오너)
- Template: `.env.blog-a`
- Vercel project name: TBD
- Domain: TBD

## Blog B (여성 일상 블로그)
- Template: `.env.blog-b`
- Vercel project name: TBD
- Domain: TBD

## Local Development

To run locally as a specific blog:

    cp .env.blog-a .env.local  # or .env.blog-b
    npm run dev
