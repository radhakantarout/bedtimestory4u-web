"use client";

import Link from "next/link";

export default function CreateStoryCard() {
  return (
    <Link
      href="/create-story"
      className="bg-blue-600 p-4 rounded-lg text-center font-semibold"
    >
      ✨ Create Custom Story
    </Link>
  );
}