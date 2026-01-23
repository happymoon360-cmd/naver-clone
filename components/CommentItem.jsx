'use client';

import { useState } from 'react';

const CommentItem = ({ comment, onLike, isReply = false }) => {
  const [isCommentLiked, setIsCommentLiked] = useState(comment.isLiked || false);
  const [commentLikeCount, setCommentLikeCount] = useState(comment.likeCount || 0);

  const formatContent = content => {
    if (!content) return '';

    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  const handleCommentLike = async () => {
    try {
      if (onLike) {
        const response = await onLike(comment.commentId);

        if (response && response.data) {
          setIsCommentLiked(response.data.isLiked);
          setCommentLikeCount(response.data.likeCount);
        }
      }
    } catch (error) {
      console.error('댓글 공감 오류: ', error);
      setIsCommentLiked(!isCommentLiked);
      setCommentLikeCount(isCommentLiked ? commentLikeCount + 1 : commentLikeCount - 1);
    }
  };

  // 비밀 댓글인 경우 - 프로필 없이 간단하게 표시
  if (comment.isSecret) {
    return (
      <div className={`py-4 border-b border-[#f5f5f5] ${isReply ? 'pl-10' : ''}`}>
        <div className="text-[14px] text-[#999] mb-1">비밀 댓글입니다.</div>
        <div className="text-[12px] text-[#bbb]">{comment.createdAt}</div>
      </div>
    );
  }

  // 일반 댓글
  return (
    <div className={`py-4 border-b border-[#f5f5f5] ${isReply ? 'pl-10 bg-[#fafafa]' : ''}`}>
      <div className="flex gap-3">
        {/* Profile Image */}
        <div className="w-[36px] h-[36px] rounded-full overflow-hidden flex-shrink-0 bg-[#f0f0f0]">
          <img
            src={comment.author?.profileImageUrl || `https://i.pravatar.cc/150?u=${comment.author?.nickname || '익명'}`}
            alt={comment.author?.nickname || '익명'}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Header: Nickname & Badge */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-[14px] text-[#333]">
              {comment.author?.nickname || '익명'}
            </span>
            {comment.author?.nickname === '신선비' && (
              <span className="text-[11px] text-white bg-[#03c75a] px-1.5 py-0.5 rounded-[3px] font-medium">
                블로그주인
              </span>
            )}
          </div>

          {/* Content */}
          <div className="text-[14px] leading-[1.7] text-[#333] mb-2 break-keep">
            {formatContent(comment.content)}
          </div>

          {/* Footer: Date, 신고, 답글 */}
          <div className="flex items-center gap-2 text-[12px] text-[#999]">
            <span>{comment.createdAt}</span>
            <span className="text-[#ddd]">|</span>
            <button className="hover:text-[#666]">신고</button>
          </div>

          {/* 답글 버튼 - 별도 라인 */}
          <div className="mt-2 flex items-center">
            <button className="flex items-center gap-1 text-[13px] text-[#666]">
              <span className="w-4 h-4 rounded-full border border-[#ccc] flex items-center justify-center text-[10px]">○</span>
              <span>답글</span>
            </button>
          </div>
        </div>

        {/* Like Heart + Count (Right Aligned) */}
        <div className="flex-shrink-0">
          <button
            onClick={handleCommentLike}
            className="flex flex-col items-center gap-0.5 p-1"
          >
            {isCommentLiked ? (
              <span className="text-[#ff4b4b] text-[18px]">♥</span>
            ) : (
              <span className="text-[#ccc] text-[18px]">♡</span>
            )}
            <span className="text-[11px] text-[#999]">{commentLikeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
