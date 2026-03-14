"use client";

import { useSearchParams } from "next/navigation";

export default function AvatarPreview() {
  const params = useSearchParams();
  const url = params.get("url");

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">

      {/* Background Video */}
      <video
        src={url || ""}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Avatar is Ready</h1>
        <p className="text-gray-300 max-w-md">
          This avatar will appear in the background while your bedtime stories play.
        </p>

        <button
          onClick={() => window.history.back()}
          className="mt-8 bg-purple-600 px-6 py-3 rounded-lg font-semibold"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}