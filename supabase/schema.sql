-- Supabase Database Schema for Naver Blog Clone
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT '작성자',
  author_profile_image TEXT NOT NULL DEFAULT '',
  header_image TEXT NOT NULL DEFAULT '',
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  content JSONB NOT NULL DEFAULT '[]'::jsonb,
  comments_enabled BOOLEAN NOT NULL DEFAULT true,
  like_count INTEGER NOT NULL DEFAULT 0,
  created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW()) * 1000,
  updated_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW()) * 1000
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT '익명',
  likes INTEGER NOT NULL DEFAULT 0,
  parent_id BIGINT REFERENCES comments(id) ON DELETE CASCADE,
  created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW()) * 1000
);

-- Post likes table (for tracking unique likes per session)
CREATE TABLE IF NOT EXISTS post_likes (
  id BIGSERIAL PRIMARY KEY,
  post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW()) * 1000,
  UNIQUE(post_id, session_id)
);

-- Comment likes table
CREATE TABLE IF NOT EXISTS comment_likes (
  id BIGSERIAL PRIMARY KEY,
  comment_id BIGINT NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW()) * 1000,
  UNIQUE(comment_id, session_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- Row Level Security (RLS) - Enable for all tables
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;

-- Policies: Allow public read access
CREATE POLICY "Allow public read posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Allow public read comments" ON comments FOR SELECT USING (true);
CREATE POLICY "Allow public read post_likes" ON post_likes FOR SELECT USING (true);
CREATE POLICY "Allow public read comment_likes" ON comment_likes FOR SELECT USING (true);

-- Policies: Allow public insert/update (for API routes)
CREATE POLICY "Allow public insert posts" ON posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update posts" ON posts FOR UPDATE USING (true);
CREATE POLICY "Allow public delete posts" ON posts FOR DELETE USING (true);

CREATE POLICY "Allow public insert comments" ON comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update comments" ON comments FOR UPDATE USING (true);
CREATE POLICY "Allow public delete comments" ON comments FOR DELETE USING (true);

CREATE POLICY "Allow public insert post_likes" ON post_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete post_likes" ON post_likes FOR DELETE USING (true);

CREATE POLICY "Allow public insert comment_likes" ON comment_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete comment_likes" ON comment_likes FOR DELETE USING (true);
