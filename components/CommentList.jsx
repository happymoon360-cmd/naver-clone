'use client';

import CommentItem from './CommentItem';

const CommentList = ({ comments, onLikeComment, onDeleteComment }) => {
  // 부모 댓글과 답글 분리
  const parentComments = comments.filter(c => !c.parentId);
  const getReplies = (parentId) => comments.filter(c => c.parentId === parentId);

  return (
    <div>
      {parentComments.map(comment => (
        <div key={comment.commentId}>
          {/* 부모 댓글 */}
          <CommentItem
            comment={comment}
            onLike={() => onLikeComment(comment.commentId)}
            onDelete={() => onDeleteComment(comment.commentId)}
            isReply={false}
          />

          {/* 답글 (대댓글) */}
          {getReplies(comment.commentId).map(reply => (
            <CommentItem
              key={reply.commentId}
              comment={reply}
              onLike={() => onLikeComment(reply.commentId)}
              onDelete={() => onDeleteComment(reply.commentId)}
              isReply={true}
            />
          ))}
        </div>
      ))}

      {comments.length === 0 && (
        <div className="text-center py-10 text-[#999] text-[14px]">
          아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
        </div>
      )}
    </div>
  );
};

export default CommentList;
