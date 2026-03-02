export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          title: string;
          category: string;
          date: string;
          author: string;
          author_profile_image: string;
          header_image: string;
          tags: Json[];
          content: Json[];
          comments_enabled: boolean;
          like_count: number;
          created_at: number;
          updated_at: number;
        };
        Insert: {
          id?: string;
          title: string;
          category: string;
          date?: string;
          author?: string;
          author_profile_image?: string;
          header_image?: string;
          tags?: Json[];
          content: Json[];
          comments_enabled?: boolean;
          like_count?: number;
          created_at?: number;
          updated_at?: number;
        };
        Update: {
          id?: string;
          title?: string;
          category?: string;
          date?: string;
          author?: string;
          author_profile_image?: string;
          header_image?: string;
          tags?: Json[];
          content?: Json[];
          comments_enabled?: boolean;
          like_count?: number;
          created_at?: number;
          updated_at?: number;
        };
      };
      comments: {
        Row: {
          id: number;
          post_id: string;
          content: string;
          author: string;
          likes: number;
          parent_id: number | null;
          created_at: number;
        };
        Insert: {
          id?: number;
          post_id: string;
          content: string;
          author?: string;
          likes?: number;
          parent_id?: number | null;
          created_at?: number;
        };
        Update: {
          id?: number;
          post_id?: string;
          content?: string;
          author?: string;
          likes?: number;
          parent_id?: number | null;
          created_at?: number;
        };
      };
      post_likes: {
        Row: {
          id: number;
          post_id: string;
          session_id: string;
          created_at: number;
        };
        Insert: {
          id?: number;
          post_id: string;
          session_id: string;
          created_at?: number;
        };
        Update: {
          id?: number;
          post_id?: string;
          session_id?: string;
          created_at?: number;
        };
      };
      comment_likes: {
        Row: {
          id: number;
          comment_id: number;
          session_id: string;
          created_at: number;
        };
        Insert: {
          id?: number;
          comment_id: number;
          session_id: string;
          created_at?: number;
        };
        Update: {
          id?: number;
          comment_id?: number;
          session_id?: string;
          created_at?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type BlockType = "text" | "image" | "quote" | "line" | "html";

export interface ContentBlock {
  id: string;
  type: BlockType;
  content?: string;
  src?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export type PostRow = Database["public"]["Tables"]["posts"]["Row"];
export type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];
export type PostUpdate = Database["public"]["Tables"]["posts"]["Update"];

export type CommentRow = Database["public"]["Tables"]["comments"]["Row"];
export type CommentInsert = Database["public"]["Tables"]["comments"]["Insert"];
export type CommentUpdate = Database["public"]["Tables"]["comments"]["Update"];
