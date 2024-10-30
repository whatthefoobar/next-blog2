import LatestPostsCarousel from "@/components/LatestPostsCarousel";
import { Post } from "../../types";
import PostGallery from "../components/PostGallery";

export default async function Page({
  searchParams,
}: {
  searchParams: { tag?: string; page?: string };
}) {
  // Fetch posts from your API
  //`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`

  const res = await fetch(`../api/posts`, {
    next: { revalidate: 60 }, // Revalidate at most once every 60 seconds
  });
  const posts: Post[] = await res.json();
  // console.log("posts in home", posts);

  // Parse query parameters
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selectedTag = searchParams.tag || "all";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentPage = parseInt(searchParams.page || "1", 10);

  return (
    <div>
      <LatestPostsCarousel posts={posts} />
      <PostGallery posts={posts} />
    </div>
  );
}
