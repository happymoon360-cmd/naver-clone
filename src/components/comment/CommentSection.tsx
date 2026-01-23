import CommentList from "./CommentList";
import CommentInput from "./CommentInput";

export default function CommentSection() {
    return (
        <div className="mt-8 pt-8 border-t border-naver-border bg-[#F9F9F9] -mx-8 px-8 pb-8">
            {/* -mx-8 px-8 to extend background color to full width of parent container padding */}
            <h3 className="font-bold text-gray-800 mb-4 text-sm">댓글 <span className="text-naver-green">3</span></h3>
            <CommentList />
            <CommentInput />
        </div>
    );
}
