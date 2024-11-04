"use client";
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LatestPostsCarousel from "@/components/LatestPostsCarousel";
import PostGallery from "../components/PostGallery";
import { Post } from "../../types";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get<Post[]>(`/api/posts`);
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load posts.");
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this runs once on component mount

  if (error) return <p className="text-red-500">{error}</p>;
  if (posts.length === 0) return <p>Loading...</p>;

  return (
    <div>
      <LatestPostsCarousel posts={posts} />
      <PostGallery posts={posts} />
    </div>
  );
}
