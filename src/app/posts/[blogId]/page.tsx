"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import BackButton from "@/components/BackButton";
import { useUser } from "@/context/UserContext";
import { Post } from "../../../../types";

interface Props {
  params: {
    blogId: string;
  };
}

export default function BlogPostPage({ params }: Props) {
  const { blogId } = params;
  const { user } = useUser();
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const availableTags = ["health", "fashion", "diy", "economy", "activism"];

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get<Post>(`/api/posts/${blogId}`);
        setPost(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setTags(res.data.tags);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post.");
      }
    };

    fetchPost();
  }, [blogId]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleEdit = async () => {
    const updatedPost = {
      title,
      description,
      tags,
      username: user?.username,
      image: post?.image,
    };

    try {
      await axios.put(`/api/posts/${post?._id}`, updatedPost);
      setIsEditing(false);
      toast.success("Post updated successfully!");
      router.refresh(); // Refresh to show updated post
    } catch (err) {
      console.error("Edit error:", err);
      setError("Error updating post");
      toast.error("Error updating post");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`/api/posts/${post?._id}`);
        toast.success("Post deleted successfully!");
        router.push("/");
      } catch (err) {
        console.error("Delete error:", err);
        setError("Error deleting post");
      }
    }
  };

  const toggleTag = (tag: string) => {
    setTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const formattedDate = post
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <BackButton />
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {post.image && (
          <Image
            className="w-full h-64 object-cover"
            width={200}
            height={50}
            src={`/images/${post.image}`}
            alt={post.title}
          />
        )}
        <div className="p-6">
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
                {post.tags.map((tag, index) => (
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
