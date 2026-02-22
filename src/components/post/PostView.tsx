import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import InteractionBar from "./InteractionBar";
import CommentSection from "../comment/CommentSection";

export default function PostView() {
    return (
        <div className="w-full">
            <PostHeader />
            <PostBody />
            <InteractionBar />
            <CommentSection />
        </div>
    );
}
