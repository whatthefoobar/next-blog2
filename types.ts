export interface Post {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  username: string;
  date: string; // Date as a string; convert to Date object if needed
}

// src/types/User.ts
export interface User {
  _id: string;
  username: string;
  email: string;
  profilePic: string;
}
