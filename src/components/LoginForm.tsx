"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser(); // Access setUser from the context
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      //change this
      const res = await axios.post("/api/users/login", {
        email,
        password,
      });

      // If login is successful, set the user in the global context
      setUser(res.data);

      // Optionally store a token in localStorage for further requests
      localStorage.setItem("token", res.data.token); // Only if you handle tokens

      console.log("Login successful!", res.data);

      router.push("/"); // Redirect to home or another page
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message || "Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
      )}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          placeholder="••••••••"
        />
      </div>
      <div>
        <button
          type="submit"
          className={`w-full bg-teal-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-700"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
