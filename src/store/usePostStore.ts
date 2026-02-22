import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BlockType = 'text' | 'image' | 'quote' | 'line' | 'html';

export interface ContentBlock {
    id: string;
    type: BlockType;
    content?: string;
    src?: string;
    caption?: string;
    width?: number;
    height?: number;
}

export interface Comment {
    id: number;
    content: string;
    author: string;
    timestamp: number;
    likes: number;
    isLiked: boolean;
    parentId?: number;
}

export interface Post {
    id: string;
    title: string;
    category: string;
    date: string; // ISO string or formatted string
    author: string;
    authorProfileImage: string;
    headerImage: string;
    tags: string[];
    content: ContentBlock[];
    comments: Comment[];
    isLiked: boolean;
    likeCount: number;
    commentsEnabled: boolean;
    createdAt?: number;
}

interface PostStore {
    posts: Post[];
    currentPostId: string;
    setPosts: (posts: Post[]) => void;
    setCurrentPostId: (id: string) => void;
    updatePost: (id: string, updatedPost: Partial<Post>) => void;
    deletePost: (id: string) => void;
    addPost: (post: Post) => void;
    togglePostLike: (postId: string) => void;
    setPostLikeCount: (postId: string, count: number) => void;
    incrementPostLike: (postId: string, delta: number) => void;
    addComment: (postId: string, comment: Comment) => void;
    deleteComment: (postId: string, commentId: number) => void;
    toggleCommentLike: (postId: string, commentId: number) => void;
    setCommentsEnabled: (postId: string, enabled: boolean) => void;
    setComments: (postId: string, comments: Comment[]) => void;
}

const parseDateValue = (value: string) => {
    const trimmed = value.trim();
    const hoursMatch = trimmed.match(/(\d+)\s*시간\s*전/);
    if (hoursMatch) {
        return Date.now() - Number(hoursMatch[1]) * 60 * 60 * 1000;
    }
    const minutesMatch = trimmed.match(/(\d+)\s*분\s*전/);
    if (minutesMatch) {
        return Date.now() - Number(minutesMatch[1]) * 60 * 1000;
    }
    const daysMatch = trimmed.match(/(\d+)\s*일\s*전/);
    if (daysMatch) {
        return Date.now() - Number(daysMatch[1]) * 24 * 60 * 60 * 1000;
    }
    const parsed = Date.parse(trimmed);
    if (!Number.isNaN(parsed)) {
        return parsed;
    }
    return null;
};

const resolveCreatedAt = (post: Post) => {
    if (typeof post.createdAt === "number" && Number.isFinite(post.createdAt)) {
        return post.createdAt;
    }
    if (post.date) {
        const parsed = parseDateValue(post.date);
        if (parsed !== null) {
            return parsed;
        }
    }
    return 0;
};

const normalizePost = (post: Post): Post => ({
    ...post,
    tags: post.tags ?? [],
    commentsEnabled: typeof post.commentsEnabled === "boolean" ? post.commentsEnabled : true,
    createdAt: resolveCreatedAt(post)
});

const ensurePosts = (posts: Post[]) => {
    const normalized = posts.map(normalizePost);
    return [...normalized].sort((a, b) => resolveCreatedAt(b) - resolveCreatedAt(a));
};

export const usePostStore = create<PostStore>()(
    persist(
        (set) => ({
            posts: [],
            currentPostId: "",
            setPosts: (posts) => set({ posts: ensurePosts(posts) }),
            setCurrentPostId: (id) => set({ currentPostId: id }),
            updatePost: (id, updatedPost) => set((state) => ({
                posts: ensurePosts(state.posts.map((post) => {
                    if (post.id !== id) return post;
                    const next = { ...post, ...updatedPost };
                    if (updatedPost.likeCount !== undefined) {
                        next.likeCount = Math.max(0, Math.floor(updatedPost.likeCount));
                    }
                    if (updatedPost.tags !== undefined) {
                        next.tags = updatedPost.tags;
                    } else if (!next.tags) {
                        next.tags = [];
                    }
                    if (updatedPost.commentsEnabled !== undefined) {
                        next.commentsEnabled = updatedPost.commentsEnabled;
                    }
                    next.createdAt = resolveCreatedAt(next);
                    return next;
                }))
            })),
            deletePost: (id) => set((state) => ({
                posts: ensurePosts(state.posts.filter((post) => post.id !== id))
            })),
            addPost: (post) => set((state) => ({
                posts: ensurePosts([...state.posts, normalizePost(post)])
            })),
            togglePostLike: (postId) => set((state) => ({
                posts: state.posts.map(post => {
                    if (post.id !== postId) return post;
                    const newIsLiked = !post.isLiked;
                    const nextCount = newIsLiked ? post.likeCount + 1 : post.likeCount - 1;
                    return {
                        ...post,
                        isLiked: newIsLiked,
                        likeCount: Math.max(0, nextCount)
                    };
                })
            })),
            setPostLikeCount: (postId, count) => set((state) => ({
                posts: state.posts.map(post => post.id === postId ? { ...post, likeCount: Math.max(0, Math.floor(count)) } : post)
            })),
            incrementPostLike: (postId, delta) => set((state) => ({
                posts: state.posts.map(post => {
                    if (post.id !== postId) return post;
                    return {
                        ...post,
                        likeCount: Math.max(0, post.likeCount + delta)
                    };
                })
            })),
            addComment: (postId, comment) => set((state) => ({
                posts: state.posts.map(post => {
                    if (post.id !== postId) return post;
                    if (!comment.content || !comment.content.trim()) return post;
                    return {
                        ...post,
                        comments: [comment, ...post.comments]
                    };
                })
            })),
            deleteComment: (postId, commentId) => set((state) => ({
                posts: state.posts.map(post => {
                    if (post.id !== postId) return post;
                    return {
                        ...post,
                        comments: post.comments.filter(c => c.id !== commentId)
                    };
                })
            })),
            toggleCommentLike: (postId, commentId) => set((state) => ({
                posts: state.posts.map(post => {
                    if (post.id !== postId) return post;
                    return {
                        ...post,
                        comments: post.comments.map(c => {
                            if (c.id !== commentId) return c;
                            const newIsLiked = !c.isLiked;
                            const nextLikes = newIsLiked ? c.likes + 1 : c.likes - 1;
                            return {
                                ...c,
                                isLiked: newIsLiked,
                                likes: Math.max(0, nextLikes)
                            };
                        })
                    };
                })
            })),
            setCommentsEnabled: (postId, enabled) => set((state) => ({
                posts: ensurePosts(state.posts.map(post => post.id === postId ? normalizePost({ ...post, commentsEnabled: enabled }) : post))
            })),
            setComments: (postId, comments) => set((state) => ({
                posts: state.posts.map(post => {
                    if (post.id !== postId) return post;
                    return {
                        ...post,
                        comments: comments
                    };
                })
            }))
        }),
        {
            name: 'naver-blog-posts',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.posts = ensurePosts(state.posts ?? []);
                }
            }
        }
    )
);

if (typeof window !== "undefined") {
    window.addEventListener("storage", (event) => {
        if (event.key !== "naver-blog-posts" || !event.newValue) return;
        try {
            const data = JSON.parse(event.newValue);
            const nextPosts = data?.state?.posts;
            if (!Array.isArray(nextPosts)) return;
            const currentIds = usePostStore.getState().posts.map(post => post.id).join("|");
            const nextIds = nextPosts.map((post: Post) => post.id).join("|");
            if (currentIds === nextIds) return;
            usePostStore.setState({ posts: ensurePosts(nextPosts) });
        } catch {
            return;
        }
    });
}
