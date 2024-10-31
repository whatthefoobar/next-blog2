import { notFound } from "next/navigation";
import { Post } from "../../../../types";
import BlogPost from "@/components/BlogPost";

interface Props {
  params: {
    blogId: string;
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { blogId } = params;

  // Fetch the specific post based on blogId
  // `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${blogId}`,
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${blogId}`,
    {
      next: { revalidate: 60 }, // Revalidate at most once every 60 seconds
    }
  );

  if (!res.ok) {
    notFound(); // Handle the case where the post is not found
  }

  const post: Post = await res.json();

  return <BlogPost post={post} />;
}
