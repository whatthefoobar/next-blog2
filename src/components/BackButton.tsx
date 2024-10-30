"use client";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="mb-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400"
    >
      &larr; Back
    </button>
  );
};

export default BackButton;
