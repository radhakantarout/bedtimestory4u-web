"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import useAuth from "@/hooks/useAuth";
import { apiGet } from "@/lib/api";
import Link from "next/link";

export default function MyStoriesPage() {
  const { user, loading } = useAuth();
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && user?.email) {
      apiGet(`/my-stories?userId=${user.email}`).then(setStories);
    }
  }, [loading, user]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">My Stories</h1>

        {stories.map((story) => (
          <Link
            key={story.storyId}
            href={`/story/${story.storyId}`}
            className="block bg-gray-900 p-4 rounded mb-3"
          >
            <p className="font-semibold">{story.prompt}</p>
            <p className="text-sm text-gray-400">{story.themeId}</p>
            <p className="text-sm text-gray-500">{story.status}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}