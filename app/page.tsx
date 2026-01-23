import { Sidebar } from "@/components/layout/Sidebar";
import { PostList } from "@/components/blog/PostList";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Sidebar className="w-full" />
      <PostList />
    </div>
  );
}
