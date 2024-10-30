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

// import Image from "next/image";
// import { notFound } from "next/navigation";
// import { Post } from "../../../../types";
// import BackButton from "@/components/BackButton";

// interface Props {
//   params: {
//     blogId: string;
//   };
// }

// export default async function BlogPostPage({ params }: Props) {
//   const { blogId } = params;

//   // Fetch the specific post based on blogId
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${blogId}`,
//     {
//       next: { revalidate: 60 }, // Revalidate at most once every 60 seconds
//     }
//   );

//   if (!res.ok) {
//     notFound(); // Handle the case where the post is not found
//   }

//   const post: Post = await res.json();

//   console.log("individual post", post);

//   //   const formattedDate = format(new Date(post.date), "MMM d, yyyy");

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <BackButton />
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <Image
//           className="w-full h-64 object-cover"
//           width={200}
//           height={50}
//           src={`/images/${post.image}`}
//           alt={post.title}
//         />

//         <div className="p-6">
//           {/* Title */}
//           <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

//           {/* Date */}
//           <p className="text-gray-600 mb-4">{post.date}</p>

//           {/* Description */}
//           <p className="text-gray-800 mb-6">{post.description}</p>

//           {/* Tags */}
//           <div className="mb-6">
//             <p className="text-gray-700 font-medium">Tags:</p>
//             <ul className="flex flex-wrap space-x-2">
//               {post.tags.map((tag, index) => (
//                 <li
//                   key={index}
//                   className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg"
//                 >
//                   {tag}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Author */}
//           <p className="text-gray-600 mb-6">By {post.username}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
