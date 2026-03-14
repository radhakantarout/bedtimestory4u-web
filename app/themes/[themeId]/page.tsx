"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import StoryListItem from "@/components/StoryListItem";
import useAuth from "@/hooks/useAuth";
import { apiGet } from "@/lib/api";

export default function ThemePage() {
  const { loading } = useAuth();
  const params = useParams(); // <-- FIX
  const themeId = params.themeId as string; // <-- FIX

  const [stories, setStories] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && themeId) {
      apiGet(`/library-stories?themeId=${themeId}`)
        .then((data) => {
          if (Array.isArray(data)) {
            setStories(data);
          } else {
            setStories([]);
          }
        })
        .catch((err) => {
          console.error("Library stories error:", err);
          setError("Failed to load stories");
        });
    }
  }, [loading, themeId]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">{themeId} Stories</h1>

        {error && <p className="text-red-400">{error}</p>}

        {stories.length === 0 && (
          <p className="text-gray-400">No stories available.</p>
        )}

        {stories.map((story) => (
  <StoryListItem
    key={story.storyId}
    storyId={story.storyId}
    themeId={themeId}
    title={story.title}
    rating={story.rating}
    isPremium={story.isPremium}
  />
))}
      </div>
    </div>
  );
}