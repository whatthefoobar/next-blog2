"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Post } from "../../types";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import TagBar from "./TagBar";

const POSTS_PER_PAGE = 4;

interface PostGalleryProps {
  posts: Post[];
}

const PostGallery = ({ posts }: PostGalleryProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract query parameters
  const queryTag = searchParams.get("tag") || "all";
  const queryPage = parseInt(searchParams.get("page") || "1", 10);

  const [currentPage, setCurrentPage] = useState(queryPage);
  const [selectedTag, setSelectedTag] = useState(queryTag);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  //return filtered posts if clicking on tag buttons
  useEffect(() => {
    const updatedFilteredPosts =
      selectedTag === "all"
        ? posts
        : posts.filter((post) => post.tags.includes(selectedTag));

    setFilteredPosts(updatedFilteredPosts);
  }, [selectedTag, posts]);

  // start at 1 but if on click of page numbers then change
  useEffect(() => {
    setCurrentPage(queryPage);
  }, [queryPage]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // on tag click change query params to reflect tag and page number
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
    router.push(`/?tag=${tag}&page=1`);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    router.push(`/?tag=${selectedTag}&page=${pageNumber}`);
  };

  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const uniqueTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>

      {/* Tags Bar that filters posts by tag */}
      <TagBar
        selectedTag={selectedTag}
        uniqueTags={uniqueTags}
        onTagClick={handleTagClick}
      />

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentPosts.map((post) => (
          <BlogCard
            key={post._id}
            id={post._id}
            image={post.image}
            title={post.title}
            description={post.description}
            tags={post.tags}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      />
    </div>
  );
};

export default PostGallery;
