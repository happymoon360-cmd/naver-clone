'use client';

import { useState } from 'react';

const CommentItem = ({ comment, onLike }) => {
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

  // 댓글 공감 클릭 핸들러
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
      // 에러 시 원래 상태로 복구
      setIsCommentLiked(!isCommentLiked);
      setCommentLikeCount(isCommentLiked ? commentLikeCount + 1 : commentLikeCount - 1);
    }
  };

  return (
    <div className="py-[16px] border-b border-[#f1f3f4] relative">
      {/* 프로필 이미지 + 닉네임 + 내용 Wrapper to keep layout tight if needed, but per design image is left, text right */}
      <div className="flex gap-[12px]">
        {/* 프로필 이미지 */}
        <div className="w-[36px] h-[36px] rounded-full overflow-hidden flex-shrink-0">
          <img
            src={`https://i.pravatar.cc/36?u=${comment.author?.nickname || '익명'}`}
            alt={comment.author?.nickname || '익명'}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          {/* 닉네임 */}
          <div className="font-bold text-[14px] text-[#333] mb-[4px]">
            {comment.author?.nickname || '익명'}
          </div>

          {/* 비밀댓글 표시 */}
          {comment.isSecret && (
            <div className="inline-flex items-center gap-[4px] px-[6px] py-[2px] bg-[#f8f9fa] rounded-[4px] mb-[6px] text-[12px] text-[#888]">
              <span>🔒</span> <span>비밀댓글</span>
            </div>
          )}

          {/* 댓글 내용 */}
          <div className="text-[15px] leading-[1.5] text-[#333] mb-[6px] break-words">
            {formatContent(comment.comment)}
          </div>

          {/* Bottom Row: Date, Reply Button */}
          <div className="flex items-center gap-[8px] text-[12px] text-[#999]">
            <span>{comment.createdAt}</span>
            <span className="w-[1px] h-[10px] bg-[#e5e5e5]"></span>
            <button className="text-[#999] text-[12px] cursor-pointer hover:text-[#666]">
              답글쓰기
            </button>
          </div>
        </div>
      </div>

      {/* 공감 버튼 (Simplified, no border, Absolute right bottom or aligned per design) 
          Design Ref: Floating right or inline? Usually inline in replies, but top level might be right.
          User plan says: "Simplify Like Button style (remove border)". 
          Position: Usually bottom right of the comment block.
      */}
      <div className="absolute right-0 bottom-[16px]">
        <button
          onClick={handleCommentLike}
          className="flex items-center gap-[4px] text-[12px] text-[#999] hover:text-[#ff4b4b] transition-colors"
        >
          <span className={`text-[14px] ${isCommentLiked ? 'opacity-100' : 'opacity-50 grayscale'}`}>
            {isCommentLiked ? '❤️' : '🤍'}
            {/* Note: Standard Naver might use SVG heart. Using emoji for now as per previous code, but removing border. */}
          </span>
          <span className={isCommentLiked ? 'text-[#ff4b4b]' : ''}>{commentLikeCount > 0 ? commentLikeCount : '공감'}</span>
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
