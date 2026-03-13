"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<any>(null);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="w-full p-4 bg-black border-b border-gray-800 flex justify-between items-center relative">
      <Link href="/dashboard" className="font-bold text-lg">
        BedtimeStory4U
      </Link>

      {/* Profile Icon */}
      <button onClick={() => setOpen(!open)} className="text-2xl">
        👤
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-4 top-14 bg-gray-900 border border-gray-700 rounded-lg w-48 shadow-lg p-2 z-50"
        >
          <Link
            href="/profile"
            className="block px-3 py-2 text-gray-200 hover:bg-gray-800 rounded"
          >
            My Profile
          </Link>

          <Link
            href="/voices"
            className="block px-3 py-2 text-gray-200 hover:bg-gray-800 rounded"
          >
            🎤 Clone Voice
          </Link>

          <Link
            href="/my-stories"
            className="block px-3 py-2 text-gray-200 hover:bg-gray-800 rounded"
          >
            📚 My Stories
          </Link>

          <Link
            href="/themes"
            className="block px-3 py-2 text-gray-200 hover:bg-gray-800 rounded"
          >
            🎨 Themes
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-red-400 hover:bg-gray-800 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}