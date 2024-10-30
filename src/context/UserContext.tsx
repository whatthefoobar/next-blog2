"use client"; // Ensure the file can use client-side hooks like useState, useEffect

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface User {
  _id: string;
  username: string;
  email: string;
  profilePic?: string;
}

// Create the UserContext with default undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// The provider that holds user data
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return null;
      }

      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        return null;
      }
    }
    return null;
  });

  // Update localStorage whenever `user` state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
