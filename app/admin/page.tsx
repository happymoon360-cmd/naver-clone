"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function AdminPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Daily Life");

    // Config State
    const [config, setConfig] = useState<any>({ blogName: "", ownerName: "", categories: "" });

    const [comments, setComments] = useState<Record<number, any[]>>({});
    const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

    useEffect(() => {
        fetchPosts();
        fetchConfig();
    }, []);

    const fetchConfig = () => {
        fetch("/api/config")
            .then(res => res.json())
            .then(data => {
                if (data) setConfig(data);
            });
    };

    const handleUpdateConfig = async () => {
        await fetch("/api/config", {
            method: "PUT",
            body: JSON.stringify(config),
        });
        alert("Blog Settings Updated!");
    };

    const fetchPosts = () => {
        fetch("/api/posts")
            .then((res) => res.json())
            .then(setPosts);
    };

    // ... (existing toggleComments, handleDeleteComment) similar logic, re-implemented below ...
    const toggleComments = async (postId: number) => {
        if (expandedPostId === postId) {
            setExpandedPostId(null);
            return;
        }
        setExpandedPostId(postId);
        const res = await fetch(`/api/posts/${postId}/comments`);
        const data = await res.json();
        setComments(prev => ({ ...prev, [postId]: data }));
    };

    const handleDeleteComment = async (commentId: number, postId: number) => {
        if (!confirm("Delete comment?")) return;
        await fetch(`/api/comments/${commentId}`, { method: "DELETE" });
        const res = await fetch(`/api/posts/${postId}/comments`);
        const data = await res.json();
        setComments(prev => ({ ...prev, [postId]: data }));
    };

    const handleCreate = async () => {
        if (!title || !content) return;
        await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({ title, content, category }),
        });
        setTitle("");
        setContent("");
        fetchPosts();
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete post?")) return;
        await fetch(`/api/posts/${id}`, { method: "DELETE" });
        fetchPosts();
    };

    const handleUpdateStats = async (id: number, type: 'views' | 'likes', count: number) => {
        await fetch(`/api/posts/${id}/${type}`, {
            method: 'PUT',
            body: JSON.stringify({ count })
        });
        fetchPosts();
    };

    const handleToggleAllowComment = async (post: any) => {
        const newValue = !post.allowComment;
        // Optimistic update
        setPosts(posts.map(p => p.id === post.id ? { ...p, allowComment: newValue } : p));

        await fetch(`/api/posts/${post.id}`, {
            method: "PUT",
            body: JSON.stringify({ allowComment: newValue })
        });
    };

    return (
        <main className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

            {/* Blog Configuration */}
            <div className="bg-white p-6 rounded shadow mb-10 border border-blue-200">
                <h2 className="font-bold mb-4 text-blue-600">Blog Configuration</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-bold mb-1">Blog Name</label>
                        <input
                            className="w-full border p-2 rounded text-sm"
                            value={config.blogName}
                            onChange={e => setConfig({ ...config, blogName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-1">Owner Name</label>
                        <input
                            className="w-full border p-2 rounded text-sm"
                            value={config.ownerName}
                            onChange={e => setConfig({ ...config, ownerName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-1">Categories (CSV)</label>
                        <input
                            className="w-full border p-2 rounded text-sm"
                            value={config.categories}
                            onChange={e => setConfig({ ...config, categories: e.target.value })}
                        />
                    </div>
                </div>
                <button onClick={handleUpdateConfig} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700">Save Config</button>
            </div>

            {/* Create Post */}
            <div className="bg-white p-6 rounded shadow mb-10 border">
                <h2 className="font-bold mb-4">Write New Post</h2>
                <div className="space-y-4">
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <select
                        className="w-full border p-2 rounded"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        {/* Dynamic categories logic could go here, but kept simple for now */}
                        {config.categories.split(",").map((c: string) => (
                            <option key={c} value={c.trim()}>{c.trim()}</option>
                        ))}
                    </select>
                    <textarea
                        className="w-full border p-2 rounded h-40"
                        placeholder="Content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    <button
                        onClick={handleCreate}
                        className="bg-black text-white px-4 py-2 rounded font-bold"
                    >
                        Publish
                    </button>
                </div>
            </div>

            {/* Manage Posts */}
            <div className="bg-white p-6 rounded shadow border">
                <h2 className="font-bold mb-4">Manage Posts ({posts.length})</h2>
                <div className="space-y-4">
                    {posts.map(post => (
                        <div key={post.id} className="border p-4 rounded flex flex-col gap-4">
                            <div className="flex justify-between items-start w-full">
                                <div>
                                    <h3 className="font-bold text-lg">{post.title}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{format(new Date(post.createdAt), "yyyy.MM.dd")} · {post.category}</p>
                                    <div className="flex gap-4 text-sm mb-2">
                                        <div className="flex items-center gap-1">
                                            <span>Views:</span>
                                            <input
                                                type="number"
                                                className="border w-16 px-1"
                                                defaultValue={post.viewCount}
                                                onBlur={(e) => handleUpdateStats(post.id, 'views', parseInt(e.target.value))}
                                            />
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>Likes:</span>
                                            <input
                                                type="number"
                                                className="border w-16 px-1"
                                                defaultValue={post.likeCount}
                                                onBlur={(e) => handleUpdateStats(post.id, 'likes', parseInt(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={post.allowComment !== false} // Default true
                                            onChange={() => handleToggleAllowComment(post)}
                                            id={`allow-${post.id}`}
                                        />
                                        <label htmlFor={`allow-${post.id}`} className="text-sm text-gray-700 select-none">Allow Comments</label>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => window.open(`/blog/${post.id}`, '_blank')} className="text-blue-500 text-sm hover:underline">View</button>
                                    <button onClick={() => toggleComments(post.id)} className="text-gray-600 text-sm hover:underline">Comments</button>
                                    <button onClick={() => handleDelete(post.id)} className="text-red-500 text-sm hover:underline">Delete</button>
                                </div>
                            </div>

                            {/* Comment Management Section */}
                            {expandedPostId === post.id && (
                                <div className="bg-gray-50 p-4 rounded text-sm border-t">
                                    <h4 className="font-bold mb-2">Comments</h4>
                                    {comments[post.id]?.length === 0 ? (
                                        <p className="text-gray-500">No comments.</p>
                                    ) : (
                                        <ul className="space-y-2">
                                            {comments[post.id]?.map((comment: any) => (
                                                <li key={comment.id} className="flex justify-between items-start bg-white p-2 border rounded">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-bold">{comment.authorName}</span>
                                                            {comment.parentId && <span className="text-xs text-gray-400 bg-gray-100 px-1 rounded">Reply</span>}
                                                        </div>
                                                        <span className="text-gray-600 block">{comment.content}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeleteComment(comment.id, post.id)}
                                                        className="text-red-500 text-xs border px-2 py-1 rounded hover:bg-red-50 shrink-0 ml-2"
                                                    >
                                                        Delete
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
