import LatestPostsCarousel from "@/components/LatestPostsCarousel";
import { Post } from "../../types";
import PostGallery from "../components/PostGallery";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    next: { revalidate: 60 }, // Revalidate at most once every 60 seconds
  });
  const posts: Post[] = await res.json();
  // console.log("posts in home", posts);

  return (
    <div>
      <LatestPostsCarousel posts={posts} />
      <PostGallery posts={posts} />
    </div>
  );
}
