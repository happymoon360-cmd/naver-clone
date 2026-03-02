"use client";

import { usePostStore, ContentBlock, BlockType, Post } from "@/store/usePostStore";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Trash2, Edit, Plus, ArrowLeft, Eye, MessageCircle, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import SeText from "@/components/smart-editor/SeText";
import SeImage from "@/components/smart-editor/SeImage";
import SeQuote from "@/components/smart-editor/SeQuote";
import SeLine from "@/components/smart-editor/SeLine";
import { mockPosts } from "@/lib/mockPosts";

const DEFAULT_AUTHOR = "대동";
const DEFAULT_AUTHOR_IMAGE = "https://picsum.photos/seed/bestie-author/200/200";
const DEFAULT_HEADER_IMAGE = "https://picsum.photos/seed/bestie-header/1200/900";

export default function AdminPage() {
    const {
        posts,
        setPosts,
        deletePost,
        addPost,
        updatePost,
        setCurrentPostId,
        deleteComment,
        addComment,
        setComments,
        setCommentLikeState,
        toggleCommentLike,
        setCommentsVisible,
        setCommentsOpen,
        updateComment
    } = usePostStore();
    const [isCreating, setIsCreating] = useState(false);
    const [editorHtml, setEditorHtml] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [likeInputs, setLikeInputs] = useState<Record<string, string>>({});
    const [commentDrafts, setCommentDrafts] = useState<Record<string, { author: string; content: string }>>({});
    const [replyDrafts, setReplyDrafts] = useState<Record<string, { author: string; content: string }>>({});
    const [editCommentDrafts, setEditCommentDrafts] = useState<Record<string, { author: string; content: string }>>({});
    const [activeReplyTarget, setActiveReplyTarget] = useState<string | null>(null);
    const [activeEditTarget, setActiveEditTarget] = useState<string | null>(null);
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [editEditorHtml, setEditEditorHtml] = useState("");
    const [editPreviewOpen, setEditPreviewOpen] = useState(false);
    const [editError, setEditError] = useState<string | null>(null);
    const [adminKey, setAdminKey] = useState("");
    const [isAuthed, setIsAuthed] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [adminNotice, setAdminNotice] = useState<string | null>(null);
    const editorRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const editEditorRef = useRef<HTMLDivElement | null>(null);
    const editFileInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    const getCommentKey = (postId: string, commentId: number) => `${postId}:${commentId}`;

    useEffect(() => {
        fetch("/api/admin/auth")
            .then(res => res.json())
            .then(data => {
                setIsAuthed(data.authenticated);
                setAuthLoading(false);
            })
            .catch(() => setAuthLoading(false));
    }, []);

    useEffect(() => {
        if (!isAuthed) return;
        let active = true;

        const loadPostsAndComments = async () => {
            setLoadingPosts(true);
            setAdminNotice(null);
            try {
                const response = await fetch("/api/posts", { cache: "no-store" });
                if (!response.ok) {
                    throw new Error("포스트 목록을 불러오지 못했습니다.");
                }

                const data = await response.json();
                if (!active) return;

                const nextPosts = Array.isArray(data) ? data : [];
                setPosts(nextPosts);

                await Promise.all(
                    nextPosts.map(async post => {
                        if (!post || typeof post !== "object" || typeof post.id !== "string") {
                            return;
                        }

                        try {
                            const commentsResponse = await fetch(`/api/posts/${post.id}/comments`, {
                                cache: "no-store"
                            });

                            if (!commentsResponse.ok) return;
                            const commentsData = await commentsResponse.json();
                            if (!active) return;

                            setComments(post.id, Array.isArray(commentsData) ? commentsData : []);
                        } catch {
                            if (active) {
                                setComments(post.id, []);
                            }
                            return;
                        }
                    })
                );
            } catch {
                if (active) {
                    setPosts(mockPosts);
                    setAdminNotice("서버 연결에 실패해 로컬 데이터 모드로 동작합니다.");
                }
            } finally {
                if (active) {
                    setLoadingPosts(false);
                }
            }
        };

        void loadPostsAndComments();

        return () => {
            active = false;
        };
    }, [isAuthed, setPosts, setComments]);

    const [form, setForm] = useState({
        title: "",
        category: "",
        tags: "",
        author: "",
        authorProfileImage: "",
        headerImage: "",
        date: "",
        likeCount: "0",
        commentsEnabled: true
    });

    const [editForm, setEditForm] = useState({
        title: "",
        category: "",
        tags: "",
        author: "",
        authorProfileImage: "",
        headerImage: "",
        date: "",
        commentsEnabled: true
    });

    const handleAdminLogin = async () => {
        try {
            const response = await fetch("/api/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: adminKey }),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setIsAuthed(true);
                setAdminKey("");
                return;
            }
            alert(data.message || "관리자 키가 올바르지 않습니다.");
        } catch {
            alert("로그인에 실패했습니다.");
        }
    };

    const handleAdminLogout = async () => {
        await fetch("/api/admin/auth", { method: "DELETE" });
        setIsAuthed(false);
    };

    const sanitizeHtml = (html: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        doc.querySelectorAll("script,style").forEach(el => {
            el.remove();
        });
        doc.body.querySelectorAll("*").forEach(node => {
            Array.from(node.attributes).forEach(attr => {
                if (attr.name.toLowerCase().startsWith("on")) {
                    node.removeAttribute(attr.name);
                }
            });
        });
        return doc.body.innerHTML;
    };

    const escapeHtml = (value: string) => {
        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    const buildHtmlBlocks = (html: string): ContentBlock[] => {
        if (!html.trim()) return [];
        return [
            {
                id: crypto.randomUUID(),
                type: "html",
                content: html
            }
        ];
    };

    const blocksToHtml = (blocks: ContentBlock[]) => {
        return blocks.map(block => {
            switch (block.type) {
                case "html":
                    return block.content ?? "";
                case "text":
                    return `<p>${escapeHtml(block.content ?? "")}</p>`;
                case "quote":
                    return `<blockquote>${escapeHtml(block.content ?? "")}</blockquote>`;
                case "line":
                    return "<hr />";
                case "image": {
                    if (!block.src) return "";
                    const caption = block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : "";
                    const alt = block.caption ? escapeHtml(block.caption) : "";
                    return `<figure><img src="${block.src}" alt="${alt}" />${caption}</figure>`;
                }
                default:
                    return "";
            }
        }).join("");
    };

    const renderBlock = (block: ContentBlock) => {
        switch (block.type as BlockType) {
            case "text":
                return <SeText key={block.id}>{block.content}</SeText>;
            case "image":
                if (!block.src) return null;
                return (
                    <SeImage
                        key={block.id}
                        src={block.src}
                        caption={block.caption}
                        width={block.width}
                        height={block.height}
                    />
                );
            case "quote":
                return <SeQuote key={block.id}>{block.content}</SeQuote>;
            case "line":
                return <SeLine key={block.id} />;
            case "html": {
                const parser = new DOMParser();
                const doc = parser.parseFromString(block.content ?? "", "text/html");
                const textOnly = (doc.body.textContent ?? "").trim();
                if (!textOnly) return null;
                return <SeText key={block.id}>{textOnly}</SeText>;
            }
            default:
                return null;
        }
    };

    const updateEditorHtml = (ref: React.RefObject<HTMLDivElement | null>, setHtml: (value: string) => void) => {
        setHtml(ref.current?.innerHTML ?? "");
    };

    const execCommand = (
        ref: React.RefObject<HTMLDivElement | null>,
        setHtml: (value: string) => void,
        command: string,
        value?: string
    ) => {
        document.execCommand(command, false, value);
        updateEditorHtml(ref, setHtml);
    };

    const handleInsertLink = () => {
        const url = prompt("링크 URL을 입력하세요.");
        if (!url) return;
        execCommand(editorRef, setEditorHtml, "createLink", url);
    };

    const handleEditInsertLink = () => {
        const url = prompt("링크 URL을 입력하세요.");
        if (!url) return;
        execCommand(editEditorRef, setEditEditorHtml, "createLink", url);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const result = typeof reader.result === "string" ? reader.result : "";
            if (!result) return;
            execCommand(editorRef, setEditorHtml, "insertImage", result);
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const result = typeof reader.result === "string" ? reader.result : "";
            if (!result) return;
            execCommand(editEditorRef, setEditEditorHtml, "insertImage", result);
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    const handleViewPost = (id: string) => {
        setCurrentPostId(id);
        router.push("/");
    };

    const handleDeletePost = async (postId: string) => {
        if (!confirm("정말 이 포스트를 삭제하시겠습니까?")) return;
        try {
            const response = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
            if (!response.ok) {
                deletePost(postId);
                setAdminNotice("서버 삭제에 실패해 로컬 목록에서만 삭제되었습니다.");
                return;
            }
            deletePost(postId);
            setAdminNotice(null);
        } catch {
            deletePost(postId);
            setAdminNotice("네트워크 문제로 로컬 목록에서만 삭제되었습니다.");
        }
    };

    const handleDeleteComment = async (postId: string, commentId: number) => {
        if (!confirm("정말 이 댓글을 삭제하시겠습니까?")) return;
        try {
            const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                deleteComment(postId, commentId);
                setAdminNotice("서버 삭제에 실패해 로컬 댓글에서만 삭제되었습니다.");
                return;
            }
            deleteComment(postId, commentId);
            setAdminNotice(null);
        } catch {
            deleteComment(postId, commentId);
            setAdminNotice("네트워크 문제로 로컬 댓글에서만 삭제되었습니다.");
        }
    };

    const savePostLikeCount = async (targetPost: Post, nextLikeCount: number) => {
        const safeLikeCount = Math.max(0, Math.floor(nextLikeCount));
        try {
            const response = await fetch(`/api/posts/${targetPost.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: targetPost.title,
                    category: targetPost.category,
                    date: targetPost.date,
                    author: targetPost.author,
                    authorProfileImage: targetPost.authorProfileImage,
                    headerImage: targetPost.headerImage,
                    tags: targetPost.tags,
                    content: targetPost.content,
                    commentsEnabled: targetPost.commentsEnabled,
                    likeCount: safeLikeCount
                })
            });

            if (!response.ok) {
                updatePost(targetPost.id, { likeCount: safeLikeCount });
                setLikeInputs(prev => ({
                    ...prev,
                    [targetPost.id]: String(safeLikeCount)
                }));
                setAdminNotice("서버 저장에 실패해 로컬 좋아요 수로 반영되었습니다.");
                return;
            }

            const data = await response.json();
            updatePost(targetPost.id, data);
            setLikeInputs(prev => ({
                ...prev,
                [targetPost.id]: String(data.likeCount ?? nextLikeCount)
            }));
            setAdminNotice(null);
        } catch {
            updatePost(targetPost.id, { likeCount: safeLikeCount });
            setLikeInputs(prev => ({
                ...prev,
                [targetPost.id]: String(safeLikeCount)
            }));
            setAdminNotice("네트워크 문제로 로컬 좋아요 수로 반영되었습니다.");
        }
    };

    const handleApplyLikeCount = (postId: string, fallback: number) => {
        const value = likeInputs[postId] ?? String(fallback);
        const next = Number(value);
        if (!Number.isFinite(next)) {
            alert("좋아요 수는 숫자만 입력할 수 있습니다.");
            return;
        }

        const targetPost = posts.find(post => post.id === postId);
        if (!targetPost) return;

        void savePostLikeCount(targetPost, next);
    };

    const handleIncrementLikeCount = (postId: string, delta: number) => {
        const targetPost = posts.find(post => post.id === postId);
        if (!targetPost) return;

        const nextLikeCount = targetPost.likeCount + delta;
        void savePostLikeCount(targetPost, nextLikeCount);
    };

    const handleToggleCommentLike = async (postId: string, commentId: number) => {
        try {
            const response = await fetch(`/api/posts/${postId}/comments/${commentId}/like`, {
                method: "POST"
            });

            if (!response.ok) {
                toggleCommentLike(postId, commentId);
                setAdminNotice("서버 연동에 실패해 로컬 공감 상태로 반영되었습니다.");
                return;
            }

            const data = await response.json();
            if (typeof data.likes === "number" && typeof data.isLiked === "boolean") {
                setCommentLikeState(postId, commentId, data.likes, data.isLiked);
            }
            setAdminNotice(null);
        } catch {
            toggleCommentLike(postId, commentId);
            setAdminNotice("네트워크 문제로 로컬 공감 상태로 반영되었습니다.");
        }
    };

    const handleSetCommentVisibility = (postId: string, visible: boolean) => {
        setCommentsVisible(postId, visible);
        setAdminNotice(visible ? "댓글창을 보이도록 설정했습니다." : "댓글창을 숨기도록 설정했습니다.");
    };

    const handleSetCommentOpen = (postId: string, open: boolean) => {
        setCommentsOpen(postId, open);
        setAdminNotice(open ? "댓글창을 열림 상태로 설정했습니다." : "댓글창을 닫힘 상태로 설정했습니다.");
    };

    const submitAdminComment = async (
        postId: string,
        payload: { author: string; content: string; parentId?: number },
        onAfter: () => void
    ) => {
        const targetPost = posts.find(post => post.id === postId);
        if (!targetPost?.commentsEnabled) {
            alert("댓글이 비활성화되었습니다.");
            return;
        }
        const author = payload.author.trim() || "익명";
        const content = payload.content.trim();
        if (!content) {
            alert("댓글 내용을 입력하세요.");
            return;
        }

        const localCommentId = (targetPost?.comments ?? []).reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
        const localComment = {
            id: localCommentId,
            content,
            author,
            timestamp: Date.now(),
            likes: 0,
            isLiked: false,
            parentId: payload.parentId
        };

        try {
            const response = await fetch(`/api/posts/${postId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content,
                    author,
                    ...(payload.parentId !== undefined ? { parentId: payload.parentId } : {})
                })
            });
            if (!response.ok) {
                addComment(postId, localComment);
                setAdminNotice("서버 저장에 실패해 로컬 댓글로 추가되었습니다.");
                onAfter();
                return;
            }
            const data = await response.json();
            addComment(postId, data);
            setAdminNotice(null);
            onAfter();
        } catch {
            addComment(postId, localComment);
            setAdminNotice("네트워크 문제로 로컬 댓글로 추가되었습니다.");
            onAfter();
        }
    };

    const handleAdminAddComment = async (postId: string) => {
        const draft = commentDrafts[postId] ?? { author: "", content: "" };
        await submitAdminComment(
            postId,
            {
                author: draft.author,
                content: draft.content
            },
            () => {
                setCommentDrafts(prev => ({
                    ...prev,
                    [postId]: { author: draft.author, content: "" }
                }));
            }
        );
    };

    const handleAdminAddReply = async (postId: string, parentId: number) => {
        const key = getCommentKey(postId, parentId);
        const draft = replyDrafts[key] ?? { author: "", content: "" };
        await submitAdminComment(
            postId,
            {
                author: draft.author,
                content: draft.content,
                parentId
            },
            () => {
                setReplyDrafts(prev => ({
                    ...prev,
                    [key]: { author: draft.author, content: "" }
                }));
                setActiveReplyTarget(null);
            }
        );
    };

    const handleStartEditComment = (postId: string, comment: { id: number; author: string; content: string }) => {
        const key = getCommentKey(postId, comment.id);
        setEditCommentDrafts(prev => ({
            ...prev,
            [key]: {
                author: comment.author,
                content: comment.content
            }
        }));
        setActiveEditTarget(key);
    };

    const handleCancelEditComment = () => {
        setActiveEditTarget(null);
    };

    const handleSaveEditComment = async (postId: string, commentId: number) => {
        const key = getCommentKey(postId, commentId);
        const draft = editCommentDrafts[key] ?? { author: "", content: "" };
        const author = draft.author.trim() || "익명";
        const content = draft.content.trim();

        if (!content) {
            alert("댓글 내용을 입력하세요.");
            return;
        }

        try {
            const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ author, content })
            });

            if (!response.ok) {
                updateComment(postId, commentId, { author, content });
                setAdminNotice("서버 저장에 실패해 로컬 댓글 수정으로 반영되었습니다.");
                setActiveEditTarget(null);
                return;
            }

            const data = await response.json();
            updateComment(postId, commentId, {
                author: typeof data.author === "string" ? data.author : author,
                content: typeof data.content === "string" ? data.content : content
            });
            setAdminNotice(null);
            setActiveEditTarget(null);
        } catch {
            updateComment(postId, commentId, { author, content });
            setAdminNotice("네트워크 문제로 로컬 댓글 수정으로 반영되었습니다.");
            setActiveEditTarget(null);
        }
    };

    const handleCreatePost = async () => {
        const sanitizedHtml = sanitizeHtml(editorHtml);
        const parser = new DOMParser();
        const doc = parser.parseFromString(sanitizedHtml, "text/html");
        const hasText = (doc.body.textContent ?? "").trim().length > 0;
        const hasImage = !!doc.body.querySelector("img");
        if (!form.title.trim()) {
            setFormError("제목을 입력하세요.");
            return;
        }
        if (!form.category.trim()) {
            setFormError("카테고리를 입력하세요.");
            return;
        }
        if (!hasText && !hasImage) {
            setFormError("본문 내용을 입력하세요.");
            return;
        }
        const nowValue = Math.round(performance.timeOrigin + performance.now());
        const tags = form.tags
            .split(",")
            .map(tag => tag.trim())
            .filter(Boolean);
        const blocks = buildHtmlBlocks(sanitizedHtml);
        const likeCount = Number(form.likeCount);
        const id = crypto.randomUUID();
        const payload = {
            title: form.title.trim(),
            category: form.category.trim(),
            date: form.date.trim() || new Date(nowValue).toLocaleString(),
            author: form.author.trim() || DEFAULT_AUTHOR,
            authorProfileImage: form.authorProfileImage.trim() || DEFAULT_AUTHOR_IMAGE,
            headerImage: form.headerImage.trim() || DEFAULT_HEADER_IMAGE,
            tags,
            content: blocks,
            commentsEnabled: form.commentsEnabled
        };
        const localPost = {
            id,
            title: payload.title,
            category: payload.category,
            date: payload.date,
            author: payload.author,
            authorProfileImage: payload.authorProfileImage,
            headerImage: payload.headerImage,
            tags: payload.tags,
            content: payload.content,
            comments: [],
            isLiked: false,
            likeCount: Number.isFinite(likeCount) ? Math.max(0, Math.floor(likeCount)) : 0,
            commentsEnabled: payload.commentsEnabled,
            commentsVisible: true,
            commentsOpen: true,
            createdAt: nowValue
        };
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                addPost(localPost);
                setAdminNotice("서버 저장에 실패해 로컬 포스트로 추가되었습니다.");
            } else {
                addPost(localPost);
                setAdminNotice(null);
            }
        } catch {
            addPost(localPost);
            setAdminNotice("네트워크 문제로 로컬 포스트로 추가되었습니다.");
        }
        setFormError(null);
        setForm({
            title: "",
            category: "",
            tags: "",
            author: "",
            authorProfileImage: "",
            headerImage: "",
            date: "",
            likeCount: "0",
            commentsEnabled: true
        });
        setEditorHtml("");
        if (editorRef.current) {
            editorRef.current.innerHTML = "";
        }
        setIsCreating(false);
    };

    const handleEditPost = (postId: string) => {
        const post = posts.find(item => item.id === postId);
        if (!post) return;
        setIsCreating(false);
        setEditingPostId(post.id);
        setEditForm({
            title: post.title,
            category: post.category,
            tags: post.tags.join(", "),
            author: post.author,
            authorProfileImage: post.authorProfileImage,
            headerImage: post.headerImage,
            date: post.date,
            commentsEnabled: post.commentsEnabled
        });
        const html = blocksToHtml(post.content);
        setEditEditorHtml(html);
        setEditPreviewOpen(false);
        setEditError(null);
        requestAnimationFrame(() => {
            if (editEditorRef.current) {
                editEditorRef.current.innerHTML = html;
            }
        });
    };

    const handleToggleComments = async (post: Post) => {
        const nextEnabled = !post.commentsEnabled;
        try {
            const response = await fetch(`/api/posts/${post.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: post.title,
                    category: post.category,
                    date: post.date,
                    author: post.author,
                    authorProfileImage: post.authorProfileImage,
                    headerImage: post.headerImage,
                    tags: post.tags,
                    content: post.content,
                    commentsEnabled: nextEnabled
                })
            });
            if (!response.ok) {
                updatePost(post.id, { commentsEnabled: nextEnabled });
                setAdminNotice("서버 저장에 실패해 로컬 댓글 설정으로 반영되었습니다.");
                return;
            }
            const data = await response.json();
            updatePost(post.id, data);
            setAdminNotice(null);
        } catch {
            updatePost(post.id, { commentsEnabled: nextEnabled });
            setAdminNotice("네트워크 문제로 로컬 댓글 설정으로 반영되었습니다.");
        }
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
        setEditEditorHtml("");
        setEditPreviewOpen(false);
        setEditError(null);
        if (editEditorRef.current) {
            editEditorRef.current.innerHTML = "";
        }
    };

    const handleUpdatePost = async () => {
        if (!editingPostId) return;
        const sanitizedHtml = sanitizeHtml(editEditorHtml);
        const parser = new DOMParser();
        const doc = parser.parseFromString(sanitizedHtml, "text/html");
        const hasText = (doc.body.textContent ?? "").trim().length > 0;
        const hasImage = !!doc.body.querySelector("img");
        if (!editForm.title.trim()) {
            setEditError("제목을 입력하세요.");
            return;
        }
        if (!editForm.category.trim()) {
            setEditError("카테고리를 입력하세요.");
            return;
        }
        if (!hasText && !hasImage) {
            setEditError("본문 내용을 입력하세요.");
            return;
        }
        const tags = editForm.tags
            .split(",")
            .map(tag => tag.trim())
            .filter(Boolean);
        const blocks = buildHtmlBlocks(sanitizedHtml);
        const payload = {
            title: editForm.title.trim(),
            category: editForm.category.trim(),
            date: editForm.date.trim() || "방금 전",
            author: editForm.author.trim() || DEFAULT_AUTHOR,
            authorProfileImage: editForm.authorProfileImage.trim() || DEFAULT_AUTHOR_IMAGE,
            headerImage: editForm.headerImage.trim() || DEFAULT_HEADER_IMAGE,
            tags,
            content: blocks,
            commentsEnabled: editForm.commentsEnabled
        };
        const fallbackUpdatedPost: Partial<Post> = {
            ...payload
        };
        try {
            const response = await fetch(`/api/posts/${editingPostId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                updatePost(editingPostId, fallbackUpdatedPost);
                setAdminNotice("서버 저장에 실패해 로컬 포스트 수정으로 반영되었습니다.");
                handleCancelEdit();
                return;
            }
            const data = await response.json();
            updatePost(editingPostId, data);
            setAdminNotice(null);
            handleCancelEdit();
        } catch {
            updatePost(editingPostId, fallbackUpdatedPost);
            setAdminNotice("네트워크 문제로 로컬 포스트 수정으로 반영되었습니다.");
            handleCancelEdit();
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500">확인 중...</div>
            </div>
        );
    }

    if (!isAuthed) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-sm p-6">
                    <h1 className="text-lg font-semibold text-gray-900 mb-4">Admin Access</h1>
                    <input
                        type="password"
                        value={adminKey}
                        onChange={(e) => setAdminKey(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                        placeholder="관리자 비밀번호"
                    />
                    <button
                        type="button"
                        onClick={handleAdminLogin}
                        className="w-full mt-4 bg-primary text-white py-2 rounded-md text-sm font-medium hover:bg-primary-hover transition-colors"
                    >
                        로그인
                    </button>
                </div>
            </div>
        );
    }

    const previewBlocks = buildHtmlBlocks(sanitizeHtml(editorHtml));
    const editPreviewBlocks = buildHtmlBlocks(sanitizeHtml(editEditorHtml));

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>
                        Total Posts: <span className="font-bold text-primary">{posts.length}</span>
                    </span>
                    <button
                        type="button"
                        onClick={handleAdminLogout}
                        className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        로그아웃
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-4xl space-y-6 p-3 sm:space-y-8 sm:p-6">
                {adminNotice && (
                    <div className="rounded-md border border-[#d7e4d8] bg-[#f7fbf7] px-4 py-3 text-sm text-[#48624b]">
                        {adminNotice}
                    </div>
                )}

                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">새 포스트 작성</h2>
                        <button
                            type="button"
                            onClick={() => setIsCreating(prev => !prev)}
                            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition-colors shadow-sm"
                        >
                            <Plus size={18} />
                            <span>{isCreating ? "닫기" : "New Post"}</span>
                        </button>
                    </div>

                    {isCreating && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-600">제목</p>
                                    <input
                                        value={form.title}
                                        onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="포스트 제목"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-600">카테고리</p>
                                    <input
                                        value={form.category}
                                        onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="카테고리"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-600">태그 (쉼표 구분)</p>
                                    <input
                                        value={form.tags}
                                        onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="예: 개발, 일상"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-600">작성자</p>
                                    <input
                                        value={form.author}
                                        onChange={(e) => setForm(prev => ({ ...prev, author: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="작성자 표시 이름"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-600">작성자 프로필 이미지</p>
                                    <input
                                        value={form.authorProfileImage}
                                        onChange={(e) => setForm(prev => ({ ...prev, authorProfileImage: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="이미지 URL"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-600">헤더 이미지</p>
                                    <input
                                        value={form.headerImage}
                                        onChange={(e) => setForm(prev => ({ ...prev, headerImage: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="이미지 URL"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-600">표시 날짜</p>
                                    <input
                                        value={form.date}
                                        onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="예: 방금 전"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-600">초기 좋아요 수</p>
                                    <input
                                        value={form.likeCount}
                                        onChange={(e) => setForm(prev => ({ ...prev, likeCount: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <span>댓글 닫기</span>
                                <button
                                    type="button"
                                    onClick={() => setForm(prev => ({ ...prev, commentsEnabled: !prev.commentsEnabled }))}
                                    className={`px-3 py-1 rounded-full text-xs font-medium border ${form.commentsEnabled ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"
                                        }`}
                                >
                                    {form.commentsEnabled ? "열림" : "닫힘"}
                                </button>
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs font-semibold text-gray-600">본문</p>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand(editorRef, setEditorHtml, "bold"); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">B</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand(editorRef, setEditorHtml, "italic"); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">I</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand(editorRef, setEditorHtml, "underline"); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">U</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand(editorRef, setEditorHtml, "insertUnorderedList"); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">목록</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand(editorRef, setEditorHtml, "insertOrderedList"); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">번호</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand(editorRef, setEditorHtml, "formatBlock", "blockquote"); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">인용</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand(editorRef, setEditorHtml, "insertHorizontalRule"); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">구분선</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); handleInsertLink(); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">링크</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); fileInputRef.current?.click(); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">이미지</button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                                <div className="relative">
                                    {editorHtml.trim().length === 0 && (
                                        <div className="absolute top-3 left-3 text-xs text-gray-400 pointer-events-none">
                                            본문을 입력하세요. 서식, 이미지, 링크를 사용할 수 있습니다.
                                        </div>
                                    )}
                                    <div
                                        ref={editorRef}
                                        contentEditable
                                        suppressContentEditableWarning
                                        onInput={() => updateEditorHtml(editorRef, setEditorHtml)}
                                        className="min-h-[220px] border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            {formError && (
                                <div className="text-sm text-red-500">{formError}</div>
                            )}

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleCreatePost}
                                    className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-hover transition-colors"
                                >
                                    포스트 생성
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPreviewOpen(prev => !prev)}
                                    className="border border-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    {previewOpen ? "미리보기 닫기" : "미리보기"}
                                </button>
                            </div>

                            {previewOpen && (
                                <div className="border border-gray-200 rounded-lg overflow-hidden mt-4">
                                    <div className="relative w-full h-[220px] overflow-hidden">
                                        <div className="absolute inset-0 blur-[2px] opacity-90 scale-105">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={form.headerImage || DEFAULT_HEADER_IMAGE}
                                                alt="Header"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-black/30"></div>
                                        <div className="absolute bottom-0 left-0 w-full p-5 text-white z-10">
                                            <div className="text-sm font-bold opacity-90 mb-2">
                                                {form.category || "카테고리"}
                                            </div>
                                            <h1 className="text-xl font-bold leading-tight mb-4 text-shadow-sm">
                                                {form.title || "제목 미리보기"}
                                            </h1>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30">
                                                    <img src={form.authorProfileImage || DEFAULT_AUTHOR_IMAGE} alt="Profile" />
                                                </div>
                                                <div className="flex flex-col text-[11px] leading-tight">
                                                    <span className="font-bold">{form.author || DEFAULT_AUTHOR}</span>
                                                    <span className="opacity-80">{form.date || "방금 전"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="se-main-container bg-white px-4 py-6">
                                        {previewBlocks.length === 0 ? (
                                            <div className="text-sm text-gray-400">본문을 입력하면 미리보기가 표시됩니다.</div>
                                        ) : (
                                            previewBlocks.map(renderBlock)
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {editingPostId && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">글 수정</h2>
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                닫기
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-600">제목</p>
                                    <input
                                        value={editForm.title}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="포스트 제목"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-600">카테고리</p>
                                    <input
                                        value={editForm.category}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="카테고리"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-600">태그 (쉼표 구분)</p>
                                    <input
                                        value={editForm.tags}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, tags: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="예: 개발, 일상"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-600">작성자</p>
                                    <input
                                        value={editForm.author}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, author: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="작성자 표시 이름"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-600">작성자 프로필 이미지</p>
                                    <input
                                        value={editForm.authorProfileImage}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, authorProfileImage: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="이미지 URL"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-600">헤더 이미지</p>
                                    <input
                                        value={editForm.headerImage}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, headerImage: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="이미지 URL"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-600">표시 날짜</p>
                                    <input
                                        value={editForm.date}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="예: 방금 전"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <span>댓글 닫기</span>
                                <button
                                    type="button"
                                    onClick={() => setEditForm(prev => ({ ...prev, commentsEnabled: !prev.commentsEnabled }))}
                                    className={`px-3 py-1 rounded-full text-xs font-medium border ${editForm.commentsEnabled ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"
                                        }`}
                                >
                                    {editForm.commentsEnabled ? "열림" : "닫힘"}
                                </button>
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs font-semibold text-gray-600">본문</p>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand(editEditorRef, setEditEditorHtml, "bold"); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">B</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand(editEditorRef, setEditEditorHtml, "italic"); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">I</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand(editEditorRef, setEditEditorHtml, "underline"); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">U</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand(editEditorRef, setEditEditorHtml, "insertUnorderedList"); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">목록</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand(editEditorRef, setEditEditorHtml, "insertOrderedList"); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">번호</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand(editEditorRef, setEditEditorHtml, "formatBlock", "blockquote"); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">인용</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); execCommand(editEditorRef, setEditEditorHtml, "insertHorizontalRule"); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">구분선</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); handleEditInsertLink(); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">링크</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); editFileInputRef.current?.click(); }} className="border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">이미지</button>
                                    <input
                                        ref={editFileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleEditImageUpload}
                                    />
                                </div>
                                <div className="relative">
                                    {editEditorHtml.trim().length === 0 && (
                                        <div className="absolute top-3 left-3 text-xs text-gray-400 pointer-events-none">
                                            본문을 입력하세요. 서식, 이미지, 링크를 사용할 수 있습니다.
                                        </div>
                                    )}
                                    <div
                                        ref={editEditorRef}
                                        contentEditable
                                        suppressContentEditableWarning
                                        onInput={() => updateEditorHtml(editEditorRef, setEditEditorHtml)}
                                        className="min-h-[220px] border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            {editError && (
                                <div className="text-sm text-red-500">{editError}</div>
                            )}

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleUpdatePost}
                                    className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-hover transition-colors"
                                >
                                    수정 완료
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="border border-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    취소
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditPreviewOpen(prev => !prev)}
                                    className="border border-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    {editPreviewOpen ? "미리보기 닫기" : "미리보기"}
                                </button>
                            </div>

                            {editPreviewOpen && (
                                <div className="border border-gray-200 rounded-lg overflow-hidden mt-4">
                                    <div className="relative w-full h-[220px] overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[2px] opacity-90 scale-105"
                                            style={{ backgroundImage: `url('${editForm.headerImage || DEFAULT_HEADER_IMAGE}')` }}
                                        />
                                        <div className="absolute inset-0 bg-black/30"></div>
                                        <div className="absolute bottom-0 left-0 w-full p-5 text-white z-10">
                                            <div className="text-sm font-bold opacity-90 mb-2">
                                                {editForm.category || "카테고리"}
                                            </div>
                                            <h1 className="text-xl font-bold leading-tight mb-4 text-shadow-sm">
                                                {editForm.title || "제목 미리보기"}
                                            </h1>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30">
                                                    <img src={editForm.authorProfileImage || DEFAULT_AUTHOR_IMAGE} alt="Profile" />
                                                </div>
                                                <div className="flex flex-col text-[11px] leading-tight">
                                                    <span className="font-bold">{editForm.author || DEFAULT_AUTHOR}</span>
                                                    <span className="opacity-80">{editForm.date || "방금 전"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="se-main-container bg-white px-4 py-6">
                                        {editPreviewBlocks.length === 0 ? (
                                            <div className="text-sm text-gray-400">본문을 입력하면 미리보기가 표시됩니다.</div>
                                        ) : (
                                            editPreviewBlocks.map(renderBlock)
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    {loadingPosts ? (
                        <div className="p-8 text-center text-gray-500">포스트를 불러오는 중...</div>
                    ) : posts.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No posts found. Create your first post!
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {posts.map((post) => (
                                <div key={post.id} className="border-b border-gray-100 last:border-0">
                                    <li className="group flex flex-col items-start justify-between gap-3 p-4 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                                                <img src={post.headerImage} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900 line-clamp-1">{post.title}</h3>
                                                <div className="text-xs text-gray-500 mt-1 flex gap-2 items-center">
                                                    <span>{post.category}</span>
                                                    <span>•</span>
                                                    <span>{post.date}</span>
                                                    <span className="flex items-center gap-1 ml-2">
                                                        <Heart size={12} className={post.isLiked ? "text-primary fill-primary" : ""} />
                                                        {post.likeCount}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleComments(post)}
                                                        className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold ${post.commentsEnabled ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                                                            }`}
                                                    >
                                                        댓글입력 {post.commentsEnabled ? "열림" : "닫힘"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSetCommentOpen(post.id, !(post.commentsOpen ?? true))}
                                                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${(post.commentsOpen ?? true) ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-600"
                                                            }`}
                                                    >
                                                        댓글창 {(post.commentsOpen ?? true) ? "열림" : "닫힘"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSetCommentVisibility(post.id, !(post.commentsVisible ?? true))}
                                                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${(post.commentsVisible ?? true) ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-600"
                                                            }`}
                                                    >
                                                        댓글창 {(post.commentsVisible ?? true) ? "보임" : "숨김"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                                            <button
                                                type="button"
                                                onClick={() => handleViewPost(post.id)}
                                                className="p-2 text-gray-400 hover:text-green-600 transition-colors rounded-full hover:bg-green-50"
                                                title="View Post"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleEditPost(post.id)}
                                                className="p-2 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-blue-50"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => void handleDeletePost(post.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </li>

                                    <div className="px-4 pb-4 space-y-4">
                                        <div className="flex flex-wrap items-center gap-2 text-xs">
                                            <span className="text-gray-500 font-semibold">좋아요 조작</span>
                                            <input
                                                value={likeInputs[post.id] ?? String(post.likeCount)}
                                                onChange={(e) => setLikeInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                                                className="w-24 border border-gray-200 rounded px-2 py-1 text-xs"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleApplyLikeCount(post.id, post.likeCount)}
                                                className="px-2 py-1 border border-gray-200 rounded text-xs hover:bg-gray-50"
                                            >
                                                적용
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleIncrementLikeCount(post.id, 1)}
                                                className="px-2 py-1 border border-gray-200 rounded text-xs hover:bg-gray-50"
                                            >
                                                +1
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleIncrementLikeCount(post.id, 100)}
                                                className="px-2 py-1 border border-gray-200 rounded text-xs hover:bg-gray-50"
                                            >
                                                +100
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2 text-xs">
                                            <span className="text-gray-500 font-semibold">댓글창 조작</span>
                                            <span className={`px-2 py-1 rounded-full ${(post.commentsVisible ?? true) ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-600"}`}>
                                                {(post.commentsVisible ?? true) ? "보이는 상태" : "숨긴 상태"}
                                            </span>
                                            <span className={`px-2 py-1 rounded-full ${(post.commentsOpen ?? true) ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                                                {(post.commentsOpen ?? true) ? "열린 상태" : "닫힌 상태"}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleSetCommentVisibility(post.id, !(post.commentsVisible ?? true))}
                                                className="px-2 py-1 border border-gray-200 rounded text-xs hover:bg-gray-50"
                                            >
                                                {(post.commentsVisible ?? true) ? "숨기기" : "보이기"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleSetCommentOpen(post.id, !(post.commentsOpen ?? true))}
                                                className="px-2 py-1 border border-gray-200 rounded text-xs hover:bg-gray-50"
                                            >
                                                {(post.commentsOpen ?? true) ? "닫기" : "열기"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleToggleComments(post)}
                                                className="px-2 py-1 border border-gray-200 rounded text-xs hover:bg-gray-50"
                                            >
                                                입력 {(post.commentsEnabled ? "차단" : "허용")}
                                            </button>
                                        </div>

                                        <div className="border border-gray-200 rounded-md p-3 bg-gray-50">
                                            <div className="text-xs font-semibold text-gray-500 mb-2">가짜 댓글 작성</div>
                                            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr_auto] gap-2">
                                                <input
                                                    value={commentDrafts[post.id]?.author ?? ""}
                                                    onChange={(e) => setCommentDrafts(prev => ({
                                                        ...prev,
                                                        [post.id]: { author: e.target.value, content: prev[post.id]?.content ?? "" }
                                                    }))}
                                                    className="border border-gray-200 rounded px-2 py-1 text-xs disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                    placeholder="계정명"
                                                    disabled={!post.commentsEnabled}
                                                />
                                                <input
                                                    value={commentDrafts[post.id]?.content ?? ""}
                                                    onChange={(e) => setCommentDrafts(prev => ({
                                                        ...prev,
                                                        [post.id]: { author: prev[post.id]?.author ?? "", content: e.target.value }
                                                    }))}
                                                    className="border border-gray-200 rounded px-2 py-1 text-xs disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                    placeholder="댓글 내용"
                                                    disabled={!post.commentsEnabled}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => void handleAdminAddComment(post.id)}
                                                    disabled={!post.commentsEnabled}
                                                    className="px-3 py-1 border border-gray-200 rounded text-xs hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                                                >
                                                    작성
                                                </button>
                                            </div>
                                            {!post.commentsEnabled && (
                                                <div className="mt-2 text-xs text-gray-500">댓글이 비활성화되었습니다.</div>
                                            )}
                                        </div>
                                    </div>

                                    {post.commentsEnabled ? (
                                        post.comments && post.comments.length > 0 ? (
                                            <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <MessageCircle size={14} className="text-gray-400" />
                                                    <span className="text-xs font-semibold text-gray-500">Comments ({post.comments.length})</span>
                                                </div>
                                                <ul className="space-y-2 pl-6">
                                                    {post.comments.map(comment => {
                                                        const rowKey = getCommentKey(post.id, comment.id);
                                                        const isEditing = activeEditTarget === rowKey;
                                                        const isReplying = activeReplyTarget === rowKey;
                                                        const editDraft = editCommentDrafts[rowKey] ?? { author: comment.author, content: comment.content };
                                                        const replyDraft = replyDrafts[rowKey] ?? { author: "", content: "" };

                                                        return (
                                                            <li key={comment.id} className={`text-sm group/comment ${comment.parentId ? "ml-4" : ""}`}>
                                                                <div className="flex justify-between items-start gap-2">
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-1.5">
                                                                            {comment.parentId ? (
                                                                                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">답글</span>
                                                                            ) : null}
                                                                            <span className="font-medium text-gray-700">{comment.author}:</span>
                                                                            <span className="text-gray-600">{comment.content}</span>
                                                                        </div>

                                                                        <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2 flex-wrap">
                                                                            <span>{new Date(comment.timestamp).toLocaleString()}</span>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => void handleToggleCommentLike(post.id, comment.id)}
                                                                                className="flex items-center gap-0.5 hover:text-primary transition-colors cursor-pointer"
                                                                                title="Toggle Comment Like"
                                                                            >
                                                                                <Heart size={10} className={comment.isLiked ? "text-primary fill-primary" : ""} />
                                                                                {comment.likes}
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    setActiveReplyTarget(prev => prev === rowKey ? null : rowKey);
                                                                                    setReplyDrafts(prev => ({
                                                                                        ...prev,
                                                                                        [rowKey]: prev[rowKey] ?? { author: "", content: "" }
                                                                                    }));
                                                                                }}
                                                                                className="rounded border border-gray-200 px-1.5 py-0.5 text-[10px] text-gray-600 hover:bg-gray-50"
                                                                            >
                                                                                답글 작성
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    if (isEditing) {
                                                                                        handleCancelEditComment();
                                                                                        return;
                                                                                    }
                                                                                    handleStartEditComment(post.id, comment);
                                                                                }}
                                                                                className="rounded border border-gray-200 px-1.5 py-0.5 text-[10px] text-gray-600 hover:bg-gray-50"
                                                                            >
                                                                                {isEditing ? "수정 취소" : "수정"}
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                    <button
                                                                        type="button"
                                                                        onClick={() => void handleDeleteComment(post.id, comment.id)}
                                                                        className="p-1 text-gray-400 opacity-100 transition-opacity hover:text-red-500 sm:opacity-0 sm:group-hover/comment:opacity-100"
                                                                        title="Delete Comment"
                                                                    >
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </div>

                                                                {isEditing ? (
                                                                    <div className="mt-2 grid grid-cols-1 md:grid-cols-[140px_1fr_auto_auto] gap-2">
                                                                        <input
                                                                            value={editDraft.author}
                                                                            onChange={(e) => setEditCommentDrafts(prev => ({
                                                                                ...prev,
                                                                                [rowKey]: {
                                                                                    ...editDraft,
                                                                                    author: e.target.value
                                                                                }
                                                                            }))}
                                                                            className="border border-gray-200 rounded px-2 py-1 text-xs"
                                                                            placeholder="작성자"
                                                                        />
                                                                        <input
                                                                            value={editDraft.content}
                                                                            onChange={(e) => setEditCommentDrafts(prev => ({
                                                                                ...prev,
                                                                                [rowKey]: {
                                                                                    ...editDraft,
                                                                                    content: e.target.value
                                                                                }
                                                                            }))}
                                                                            className="border border-gray-200 rounded px-2 py-1 text-xs"
                                                                            placeholder="댓글 내용"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => void handleSaveEditComment(post.id, comment.id)}
                                                                            className="px-2 py-1 border border-gray-200 rounded text-xs hover:bg-gray-50"
                                                                        >
                                                                            저장
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={handleCancelEditComment}
                                                                            className="px-2 py-1 border border-gray-200 rounded text-xs hover:bg-gray-50"
                                                                        >
                                                                            취소
                                                                        </button>
                                                                    </div>
                                                                ) : null}

                                                                {isReplying ? (
                                                                    <div className="mt-2 grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-2">
                                                                        <input
                                                                            value={replyDraft.author}
                                                                            onChange={(e) => setReplyDrafts(prev => ({
                                                                                ...prev,
                                                                                [rowKey]: {
                                                                                    ...replyDraft,
                                                                                    author: e.target.value
                                                                                }
                                                                            }))}
                                                                            className="border border-gray-200 rounded px-2 py-1 text-xs"
                                                                            placeholder="답글 작성자"
                                                                            disabled={!post.commentsEnabled}
                                                                        />
                                                                        <input
                                                                            value={replyDraft.content}
                                                                            onChange={(e) => setReplyDrafts(prev => ({
                                                                                ...prev,
                                                                                [rowKey]: {
                                                                                    ...replyDraft,
                                                                                    content: e.target.value
                                                                                }
                                                                            }))}
                                                                            className="border border-gray-200 rounded px-2 py-1 text-xs"
                                                                            placeholder="답글 내용"
                                                                            disabled={!post.commentsEnabled}
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => void handleAdminAddReply(post.id, comment.id)}
                                                                            disabled={!post.commentsEnabled}
                                                                            className="px-3 py-1 border border-gray-200 rounded text-xs hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                                                                        >
                                                                            답글 등록
                                                                        </button>
                                                                    </div>
                                                                ) : null}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        ) : null
                                    ) : (
                                        <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 text-xs text-gray-500">
                                            댓글이 비활성화되었습니다.
                                        </div>
                                    )}
                                </div>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}
