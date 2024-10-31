"use client";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Add this to detect client-side rendering
  const { user, setUser } = useUser();
  useEffect(() => {
    setMounted(true); // Set mounted to true after the component has mounted
  }, []);

  const router = useRouter();

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle Logout
  const handleLogout = () => {
    setUser(null); // Clear the user context
    router.push("/login"); // Redirect to the login page
  };

  // this avoids hydration error due to user being on the client side and not the server
  if (!mounted) {
    // Don't render anything until the component has mounted on the client
    return null;
  }

  return (
    <nav className="bg-teal-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/" className="flex items-center text-white">
            <span className="text-lg">Eco blog</span>
          </Link>
        </div>

        {/* Navigation Links for Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          {/* <Link href="/" className="hover:text-gray-400">
            Blog
          </Link> */}
          <Link href="/about" className="hover:text-gray-400">
            About
          </Link>
          {user && (
            <Link href="/write" className="hover:text-gray-400">
              Write
            </Link>
          )}
          <Link href="/contact" className="hover:text-gray-400">
            Contact
          </Link>
          {user ? (
            <>
              {/* User Info with Profile Picture */}
              <div className="flex items-center space-x-3">
                <span className="hover:text-gray-400">
                  Hello {user.username || "User"}
                </span>
                {user.profilePic && (
                  <Image
                    src={`${user.profilePic}`}
                    width={30} // Adjust width as needed
                    height={30}
                    alt={`${user.username}'s profile`}
                    className="rounded-full object-cover"
                  />
                )}
              </div>
              <button onClick={handleLogout} className="hover:text-gray-400">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:text-gray-400">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-teal-800 ${isMenuOpen ? "block" : "hidden"}`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="block py-2 px-4 text-white hover:bg-teal-700"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="block py-2 px-4 text-white hover:bg-teal-700"
            >
              About
            </Link>
            <Link
              href="/write"
              className="block py-2 px-4 text-white hover:bg-teal-700"
            >
              Write
            </Link>
            <Link
              href="/contact"
              className="block py-2 px-4 text-white hover:bg-teal-700"
            >
              Contact
            </Link>
            {user ? (
              <>
                <div className="flex items-center space-x-3">
                  <span className="block py-2 px-4 text-white hover:bg-teal-700">
                    Hello {user.username || "User"}
                  </span>
                  {user.profilePic && (
                    <Image
                      src={`${user.profilePic}`}
                      width={30} // Adjust width as needed
                      height={30}
                      alt={`${user.username}'s profile`}
                      className="rounded-full object-cover"
                    />
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="block py-2 px-4 text-white hover:bg-teal-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block py-2 px-4 text-white hover:bg-teal-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
