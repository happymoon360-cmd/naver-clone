import Link from "next/link";
import { format } from "date-fns";
import { Heart, MessageCircle } from "lucide-react";

interface Post {
    id: number;
    title: string;
    content: string;
    viewCount: number;
    likeCount: number;
    createdAt: string;
    _count?: {
        comments: number;
    };
}

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    // Simple truncation
    const snippet = post.content.length > 150 ? post.content.slice(0, 150) + "..." : post.content;

    return (
        <div className="border-b border-gray-100 py-6 first:pt-0">
            <Link href={`/blog/${post.id}`} className="group block">
                <h3 className="text-lg font-bold text-gray-900 group-hover:underline group-hover:text-[#03c75a] mb-2">
                    {post.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {snippet}
                </p>
            </Link>
            <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>{format(new Date(post.createdAt), "yyyy. M. d.")}</span>
                <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" /> {post.likeCount}
                </div>
                <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" /> {post._count?.comments || 0}
                </div>
                <span>Views {post.viewCount}</span>
            </div>
        </div>
    );
}
