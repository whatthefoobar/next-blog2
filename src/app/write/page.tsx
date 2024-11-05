"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

const WritePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { user } = useUser();
  const username = user?.username || "";

  const handleTagChange = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postData = {
      title,
      description,
      tags: selectedTags,
      username,
      image: imageFile?.name || "",
    };

    try {
      const res = await axios.post(`/api/posts`, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccess("Post created successfully!");

      // Redirect to the newly created post's page using its ID
      router.push(`/posts/${res.data.post._id}`);
      toast.success("Post created successfully!");
    } catch (error) {
      setError("Error creating post");
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Blog Post</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Tags</label>
          <div className="flex flex-wrap gap-2">
            {["health", "fashion", "diy", "economy", "activism"].map((tag) => (
              <label key={tag} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-1">
            Image (attach an image file, optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default WritePage;
