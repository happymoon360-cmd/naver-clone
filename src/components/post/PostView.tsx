import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import InteractionBar from "./InteractionBar";
import PostTags from "./PostTags";
import CommentSection from "../comment/CommentSection";
import PostSidebar from "./PostSidebar";

export default function PostView() {
    return (
        <div className="w-full md:px-4 lg:px-6 md:py-5">
            <div className="md:mx-auto md:grid md:max-w-[1120px] md:grid-cols-[minmax(0,1fr)_320px] md:gap-7">
                <div className="min-w-0 md:overflow-hidden md:rounded-[14px] md:border md:border-[#e8e8e8] md:bg-white md:shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                    <PostHeader />
                    <PostBody />
                    <InteractionBar />
                    <PostTags />
                    <CommentSection />
                </div>
                <PostSidebar />
            </div>
        </div>
    );
}
