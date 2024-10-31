"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BackButton from "@/components/BackButton";
import { useUser } from "@/context/UserContext";
import { Post } from "../../types";
import { toast } from "react-toastify";

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  const { user } = useUser();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [tags, setTags] = useState(post.tags); // Editable tags as an array
  const availableTags = ["health", "fashion", "diy", "economy", "activism"];

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleEdit = async () => {
    const updatedPost = {
      title,
      description,
      tags,
      username: user?.username,
      image: post.image,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPost),
        }
      );

      if (!res.ok) throw new Error("Failed to update post");

      setIsEditing(false); // Exit editing mode
      router.refresh(); // Refresh to show updated post
      toast.success("Post updated successfully!");
    } catch (err) {
      toast.error("Error updating post");
      setError("Error updating post");
      console.error("Edit error:", err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const deleteRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post._id}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteRes.ok) throw new Error("Failed to delete post");

      //toast.success("Post deleted successfully!");
      router.refresh(); // Trigger a refresh to fetch updated data
      router.push("/"); // Redirect to home page after deletion
      toast.success("Post deleted successfully!");
    } catch (err) {
      setError("Error deleting post");
      console.error("Delete error:", err);
    }
  };

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  // format date
  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short", // "long" for full month name, "numeric" for numbers
    day: "numeric",
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <BackButton />
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Image
          className="w-full h-64 object-cover"
          width={200}
          height={50}
          src={`/images/${post.image}`}
          alt={post.title}
        />

        <div className="p-6">
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Title */}
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-3xl font-bold mb-4 border border-gray-300 p-2 rounded w-full"
            />
          ) : (
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
          )}

          {/* Date */}
          <p className="text-gray-600 mb-4">{formattedDate}</p>

          {/* Description */}
          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-gray-800 mb-6 border border-gray-300 p-2 rounded w-full"
            />
          ) : (
            <p className="text-gray-800 mb-6">{description}</p>
          )}

          {/* Tags */}
          <div className="mb-6">
            <p className="text-gray-700 font-medium">Tags:</p>
            {isEditing ? (
              <div className="flex flex-wrap space-x-2">
                {availableTags.map((tag) => (
                  <label key={tag} className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      checked={tags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                      className="mr-2"
                    />
                    <span className="text-gray-800">{tag}</span>
                  </label>
                ))}
              </div>
            ) : (
              <ul className="flex flex-wrap space-x-2">
                {post.tags.map((tag: string, index: number) => (
                  <li
                    key={index}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Author */}
          <p className="text-gray-600 mb-6">By {post.username}</p>

          {/* Edit/Delete Buttons */}
          {user && post.username === user.username && (
            <div className="flex space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
              )}
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
