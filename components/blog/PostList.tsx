"use client";

import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";

export function PostList() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="py-10 text-center text-gray-500">Loading posts...</div>;
    }

    if (posts.length === 0) {
        return (
            <div className="py-20 text-center border rounded-md bg-white text-gray-500">
                No posts yet. <br />
                <span className="text-xs">Go to Admin to create one.</span>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm min-h-[500px]">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h3 className="font-bold text-[#03c75a]">All Posts ({posts.length})</h3>
                <button className="text-xs text-gray-500">List View</button>
            </div>
            <div className="space-y-2">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
