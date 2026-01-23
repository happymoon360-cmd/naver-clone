'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import CommentList from './CommentList';

const CommentSection = ({ postId = 1, onCommentChange }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [commentText, setCommentText] = useState('');

  // Fetch Comments (MOCKED FOR VISUAL CHECK)
  const fetchComments = async () => {
    try {
      setLoading(true);
      // MOCK DATA - 실제 네이버 스크린샷 기반
      const mockComments = [
        {
          commentId: 1,
          content: null,
          createdAt: "2023.12.22. 06:10",
          isSecret: true,
          likeCount: 0,
          isLiked: false,
          author: { nickname: "익명", profileImageUrl: null }
        },
        {
          commentId: 2,
          content: "되돌리는 방법은 없나요..?",
          createdAt: "2024.4.17. 12:06",
          isSecret: false,
          likeCount: 0,
          isLiked: false,
          author: { nickname: "에잇에잇호오호오", profileImageUrl: null }
        },
        {
          commentId: 3,
          content: "F12 누르시고 오른쪽 창에서 태블릿/모바일 모드를 꺼주시면 됩니다.\n불이 꺼져있는게 비활성화입니다.",
          createdAt: "2024.4.17. 14:13",
          isSecret: false,
          likeCount: 0,
          isLiked: false,
          parentId: 2, // 답글
          author: { nickname: "신선비", profileImageUrl: null }
        }
      ];

      await new Promise(resolve => setTimeout(resolve, 300));

      setComments(mockComments);
      setTotalCount(3);
      return 3;
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const notifyCommentChange = async () => {
    const newCommentCount = await fetchComments();

    if (onCommentChange) {
      onCommentChange(newCommentCount);
    }

    window.dispatchEvent(
      new CustomEvent('commentChanged', {
        detail: { postId, commentCount: newCommentCount },
      }),
    );
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const response = await api.post(`/posts/${postId}/comments`, {
        content: commentText.trim(),
        isSecret: false,
      });

      if (response.status === 201 || response.status === 200) {
        setCommentText('');
        await notifyCommentChange();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment.');
    }
  };

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
    <div className="bg-white pb-[80px]">
      {/* Header: Comment Count */}
      <div className="px-5 py-4 border-t border-[#f0f0f0]">
        <div className="text-[15px] font-bold text-[#333]">
          댓글 <span className="text-[#03c75a]">{totalCount}</span>
        </div>
      </div>

      {/* Comment List */}
      <div className="px-5">
        <CommentList
          comments={comments}
          onLikeComment={handleLikeComment}
          onDeleteComment={handleDeleteComment}
        />
      </div>

      {/* Fixed Bottom Comment Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e5e5] px-4 py-3 z-50">
        <div className="max-w-[430px] mx-auto flex items-center gap-3">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
            placeholder="댓글을 입력해주세요."
            className="flex-1 h-[40px] px-4 bg-[#f5f5f5] rounded-[20px] text-[14px] outline-none placeholder:text-[#999] border-none"
          />
          <button
            onClick={handleAddComment}
            disabled={!commentText.trim()}
            className={`h-[40px] px-5 rounded-[20px] text-[14px] font-medium transition-colors ${
              commentText.trim()
                ? 'bg-[#03c75a] text-white'
                : 'bg-[#e5e5e5] text-[#999] cursor-not-allowed'
            }`}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
