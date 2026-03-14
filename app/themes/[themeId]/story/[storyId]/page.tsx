"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { apiGet } from "@/lib/api";

export default function StoryPlaybackPage() {
  const params = useParams();
  const { user } = useAuth();

  const themeId = params.themeId as string;
  const storyId = params.storyId as string;

  const [story, setStory] = useState<any>(null);
  const [script, setScript] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    // Fetch story details
    apiGet(`/library-stories-by-id?storyId=${storyId}&themeId=${themeId}`)
      .then(async (data) => {
        setStory(data);

        // Fetch script text from presigned URL
        const scriptText = await fetch(data.scriptUrl).then((r) => r.text());
        setScript(scriptText);
      });

    // Fetch avatar
    if (user?.email) {
      apiGet(`/user/avatar?userId=${user.email}`).then((res) =>
        setAvatarUrl(res.avatarUrl)
      );
    }
  }, [storyId, themeId, user]);

  if (!story) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Background Avatar Video */}
      {avatarUrl && (
        <video
          src={avatarUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Foreground Story Content */}
      <div className="relative z-10 p-6 max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4">{story.title}</h1>

        <audio controls src={story.audioUrl} className="w-full mb-6" />

        <p className="text-gray-200 leading-relaxed whitespace-pre-line">
          {script}
        </p>
      </div>
    </div>
  );
}