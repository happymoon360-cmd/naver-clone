'use client';

import { useState, useEffect } from 'react';
import api from '@/src/lib/axios'; // Global api instance (includes JWT interceptor)
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const CommentSection = ({ postId = 1, onCommentChange }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch Comments (MOCKED FOR VISUAL CHECK)
  const fetchComments = async () => {
    try {
      setLoading(true);
      // MOCK DATA
      const mockComments = Array(12).fill(null).map((_, i) => ({
        commentId: i + 1,
        content: i === 0 ? "정말 유익한 정보네요! 감사합니다." : `안녕하세요, 댓글 테스트입니다. ${i + 1}`,
        createdAt: "2026. 1. 22. 12:30",
        isSecret: i === 1, // 2nd comment secret
        likeCount: i % 3 === 0 ? 5 : 0,
        isLiked: false,
        author: {
          nickname: i === 0 ? "이웃1" : `방문자${i}`,
          profileImageUrl: null
        }
      }));

      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 300));

      setComments(mockComments);
      setTotalCount(12);
      return 12;
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Fetch
  useEffect(() => {
    fetchComments();
  }, [postId]);

  // Notify Parent/Global
  const notifyCommentChange = async () => {
    const newCommentCount = await fetchComments(); // Refresh and get count

    if (onCommentChange) {
      onCommentChange(newCommentCount);
    }

    window.dispatchEvent(
      new CustomEvent('commentChanged', {
        detail: {
          postId,
          commentCount: newCommentCount,
        },
      }),
    );
  };

  // Add Comment
  const handleAddComment = async (content, isSecret) => {
    try {
      const response = await api.post(`/posts/${postId}/comments`, {
        content: content,
        isSecret: isSecret || false,
      });

      if (response.status === 201 || response.status === 200) {
        await notifyCommentChange();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment.');
    }
  };

  // Like Comment
  const handleLikeComment = async commentId => {
    try {
      const response = await api.post(`/comments/${commentId}/like`);
      if (response.status === 200) {
        await fetchComments();
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  // Delete Comment
  const handleDeleteComment = async commentId => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const response = await api.delete(`/comments/${commentId}`);
      if (response.status === 204 || response.status === 200) {
        await notifyCommentChange();
        alert('Comment deleted.');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment.');
    }
  };

  if (loading && comments.length === 0) {
    return <div className="text-center py-5 text-gray-500">Loading comments...</div>;
  }

  return (
    <div className="max-w-[920px] mx-auto p-[20px] bg-white pb-[80px]"> {/* pb-80 for floating button space */}

      {/* Header: Comment Count */}
      <div className="mb-[16px] text-[16px] font-bold text-[#333] flex items-center gap-1">
        <span>댓글</span>
        <span className="text-[#03c75a]">{totalCount}</span>
      </div>

      {/* Comment List */}
      <CommentList
        comments={comments}
        onLikeComment={handleLikeComment}
        onDeleteComment={handleDeleteComment}
      />

      {/* Pagination (Static for now as per previous code) */}
      <div className="flex justify-center items-center mb-[30px] gap-[20px]">
        <span className="px-[1px] py-[2px] border border-[#ddd] bg-white text-black rounded-[4px] text-[14px] min-w-[36px] h-[32px] flex items-center justify-center">
          1
        </span>
      </div>

      {/* Comment Form */}
      <CommentForm onAddComment={handleAddComment} />

      {/* Floating Write Button */}
      {/* Positioned fixed at bottom right, typically above the bottom navigation if exists */}
      <button
        className="fixed bottom-[20px] right-[20px] z-50 bg-[#03c75a] text-white rounded-full px-[20px] py-[12px] shadow-lg flex items-center gap-[6px] font-bold text-[14px]"
        onClick={() => {
          // Logic to focus comment form or open it. For now, simple scroll to bottom
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }}
      >
        <span className="text-[18px]">+</span>
        <span>댓글쓰기</span>
      </button>
    </div>
  );
};

export default CommentSection;
