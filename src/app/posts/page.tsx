"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/layout/Container";
import { getStaticPosts } from "@/lib/blogConstants";

const POSTS_PER_PAGE = 10;
const getInitial = (value: string) => value.trim().charAt(0) || "B";

export default function PostsPage() {
  const posts = useMemo(() => getStaticPosts(), []);
  const categories = useMemo(() => [...new Set(posts.map(p => p.category))], [posts]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p => p.title.toLowerCase().includes(query) || p.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    return result;
  }, [posts, searchQuery, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  return (
    <Container>
      <div className="py-8">
        <h1 className="mb-6 text-2xl font-bold text-text">모든 글</h1>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="제목 또는 태그로 검색"
              className="w-full rounded-md border border-border py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={e => handleCategoryChange(e.target.value)}
            className="rounded-md border border-border bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">전체 카테고리</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            {posts.length === 0 ? "아직 작성된 글이 없습니다." : "검색 결과가 없습니다."}
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedPosts.map(post => (
                <Link
                  key={post.id}
                  href={`/?post=${post.id}`}
                  className="block overflow-hidden rounded-lg border border-border bg-white transition-shadow hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row">
                    {post.headerImage ? (
                      <div className="relative h-32 w-full flex-shrink-0 sm:h-auto sm:w-48">
                        <Image src={post.headerImage} alt={post.title} fill className="object-cover" />
                      </div>
                    ) : null}
                    <div className="flex-1 p-4">
                      <div className="mb-1 text-xs font-medium text-primary">{post.category}</div>
                      <h2 className="mb-2 line-clamp-2 text-lg font-semibold text-text">{post.title}</h2>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-[10px] font-semibold text-gray-600">
                          {post.authorProfileImage ? (
                            <Image
                              src={post.authorProfileImage}
                              alt={post.author}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            getInitial(post.author)
                          )}
                        </div>
                        <span>{post.author}</span>
                        <span>·</span>
                        <span>{post.date}</span>
                      </div>
                      {post.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={page === 1}
                  className="rounded-md border border-border p-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button
                      type="button"
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`h-8 w-8 rounded-md text-sm ${
                        page === pageNumber ? "bg-primary text-white" : "border border-border hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={page === totalPages}
                  className="rounded-md border border-border p-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Container>
  );
}
