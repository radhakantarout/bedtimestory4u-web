"use client";

import useAuth from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function DashboardPage() {
  const { loading } = useAuth();

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 space-y-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold">Welcome 👋</h1>
        <p className="text-gray-400">Choose what you want to do today.</p>

        <Link
          href="/create-story"
          className="block bg-blue-600 p-4 rounded-lg text-center font-semibold"
        >
          ✨ Generate Custom Story
        </Link>

        <Link
          href="/voices"
          className="block bg-purple-600 p-4 rounded-lg text-center font-semibold"
        >
          🎤 Clone Your Voice
        </Link>

        <Link
          href="/themes/library"
          className="block bg-pink-600 p-4 rounded-lg text-center font-semibold"
        >
          📚 Explore Themes
        </Link>

        <Link
          href="/history"
          className="block bg-green-600 p-4 rounded-lg text-center font-semibold"
        >
          🎧 My Stories
        </Link>

        <Link
          href="/video-avatar"
          className="block bg-yellow-600 p-4 rounded-lg text-center font-semibold"
        >
          🎥 Video Avatar (Coming Soon)
        </Link>
      </div>
    </div>
  );
}