"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import useAuth from "@/hooks/useAuth";
import { apiGet } from "@/lib/api";

export default function StoryDetailPage() {
  const params = useParams();
  const { user, loading } = useAuth();
  const [story, setStory] = useState<any>(null);
  const [script, setScript] = useState("");

  useEffect(() => {
    if (!loading && user?.email) {
      apiGet(`/my-stories?userId=${user.email}`).then((list) => {
        const found = list.find((s: any) => s.storyId === params.storyId);
        setStory(found);

        if (found?.scriptUrl) {
          fetch(found.scriptUrl)
            .then((res) => res.text())
            .then(setScript);
        }
      });
    }
  }, [loading, user, params.storyId]);

  if (!story) return <p className="p-6">Loading story...</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">{story.prompt}</h1>

        <audio controls className="w-full mb-4">
          <source src={story.audioUrl} type="audio/mpeg" />
        </audio>

        <h2 className="text-xl font-semibold mb-2">Story Script</h2>
        <pre className="whitespace-pre-wrap text-gray-300 bg-gray-900 p-4 rounded">
          {script}
        </pre>
      </div>
    </div>
  );
}