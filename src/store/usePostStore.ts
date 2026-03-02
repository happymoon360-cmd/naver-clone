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
    commentsVisible?: boolean;
    commentsOpen?: boolean;
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
    setCommentLikeState: (postId: string, commentId: number, likes: number, isLiked: boolean) => void;
    setCommentsEnabled: (postId: string, enabled: boolean) => void;
    setCommentsVisible: (postId: string, visible: boolean) => void;
    setCommentsOpen: (postId: string, open: boolean) => void;
    updateComment: (postId: string, commentId: number, payload: Partial<Pick<Comment, "author" | "content" | "parentId">>) => void;
    setComments: (postId: string, comments: Comment[]) => void;
}

const normalizeComment = (comment: Comment): Comment => ({
    id: Number(comment.id),
    content: String(comment.content ?? "").trim(),
    author: String(comment.author ?? "익명").trim() || "익명",
    timestamp: Number.isFinite(comment.timestamp) ? comment.timestamp : Date.now(),
    likes: Number.isFinite(comment.likes) ? Math.max(0, Math.floor(comment.likes)) : 0,
    isLiked: typeof comment.isLiked === "boolean" ? comment.isLiked : false,
    parentId: typeof comment.parentId === "number" && Number.isFinite(comment.parentId) ? comment.parentId : undefined
});

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
    comments: Array.isArray(post.comments) ? post.comments.map(normalizeComment) : [],
    isLiked: typeof post.isLiked === "boolean" ? post.isLiked : false,
    likeCount: Number.isFinite(post.likeCount) ? Math.max(0, Math.floor(post.likeCount)) : 0,
    commentsEnabled: typeof post.commentsEnabled === "boolean" ? post.commentsEnabled : true,
    commentsVisible: typeof post.commentsVisible === "boolean" ? post.commentsVisible : true,
    commentsOpen: typeof post.commentsOpen === "boolean" ? post.commentsOpen : true,
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
            setPosts: (posts) => set((state) => ({
                posts: ensurePosts(posts.map((post) => {
                    const prev = state.posts.find(item => item.id === post.id);
                    return normalizePost({
                        ...post,
                        commentsEnabled: typeof post.commentsEnabled === "boolean"
                            ? post.commentsEnabled
                            : prev?.commentsEnabled ?? true,
                        commentsVisible: typeof post.commentsVisible === "boolean"
                            ? post.commentsVisible
                            : prev?.commentsVisible ?? true,
                        commentsOpen: typeof post.commentsOpen === "boolean"
                            ? post.commentsOpen
                            : prev?.commentsOpen ?? true
                    });
                }))
            })),
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
                    if (updatedPost.commentsVisible !== undefined) {
                        next.commentsVisible = updatedPost.commentsVisible;
                    }
                    if (updatedPost.commentsOpen !== undefined) {
                        next.commentsOpen = updatedPost.commentsOpen;
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
                    const nextComment = normalizeComment(comment);
                    if (!nextComment.content) return post;
                    return {
                        ...post,
                        comments: [nextComment, ...post.comments]
                    };
                })
            })),
            deleteComment: (postId, commentId) => set((state) => ({
                posts: state.posts.map(post => {
                    if (post.id !== postId) return post;
                    const targetIds = new Set<number>([commentId]);
                    let changed = true;
                    while (changed) {
                        changed = false;
                        post.comments.forEach(comment => {
                            if (comment.parentId && targetIds.has(comment.parentId) && !targetIds.has(comment.id)) {
                                targetIds.add(comment.id);
                                changed = true;
                            }
                        });
                    }
                    return {
                        ...post,
                        comments: post.comments.filter(c => !targetIds.has(c.id))
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
            setCommentLikeState: (postId, commentId, likes, isLiked) => set((state) => ({
                posts: state.posts.map(post => {
                    if (post.id !== postId) return post;
                    return {
                        ...post,
                        comments: post.comments.map(comment => {
                            if (comment.id !== commentId) return comment;
                            return {
                                ...comment,
                                likes: Math.max(0, Math.floor(likes)),
                                isLiked
                            };
                        })
                    };
                })
            })),
            setCommentsEnabled: (postId, enabled) => set((state) => ({
                posts: ensurePosts(state.posts.map(post => post.id === postId ? normalizePost({ ...post, commentsEnabled: enabled }) : post))
            })),
            setCommentsVisible: (postId, visible) => set((state) => ({
                posts: ensurePosts(state.posts.map(post => post.id === postId ? normalizePost({ ...post, commentsVisible: visible }) : post))
            })),
            setCommentsOpen: (postId, open) => set((state) => ({
                posts: ensurePosts(state.posts.map(post => post.id === postId ? normalizePost({ ...post, commentsOpen: open }) : post))
            })),
            updateComment: (postId, commentId, payload) => set((state) => ({
                posts: state.posts.map(post => {
                    if (post.id !== postId) return post;
                    return {
                        ...post,
                        comments: post.comments.map(comment => {
                            if (comment.id !== commentId) return comment;
                            const nextAuthor = payload.author !== undefined
                                ? (String(payload.author).trim() || comment.author)
                                : comment.author;
                            const nextContent = payload.content !== undefined
                                ? (String(payload.content).trim() || comment.content)
                                : comment.content;
                            const nextParent = payload.parentId !== undefined
                                ? payload.parentId
                                : comment.parentId;
                            return {
                                ...comment,
                                author: nextAuthor,
                                content: nextContent,
                                parentId: nextParent
                            };
                        })
                    };
                })
            })),
            setComments: (postId, comments) => set((state) => ({
                posts: state.posts.map(post => {
                    if (post.id !== postId) return post;
                    return {
                        ...post,
                        comments: Array.isArray(comments)
                            ? comments
                                .map(normalizeComment)
                                .sort((a, b) => b.timestamp - a.timestamp)
                            : []
                    };
                })
            }))
        }),
        {
            name: 'mybestie-posts',
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
        if (event.key !== "mybestie-posts" || !event.newValue) return;
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
