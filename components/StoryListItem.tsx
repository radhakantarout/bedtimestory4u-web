"use client";

import Link from "next/link";

export default function StoryListItem({
  storyId,
  themeId,
  title,
  rating,
  isPremium,
}: any) {
  return (
    <Link href={`/themes/${themeId}/story/${storyId}`}>
      <div className="bg-gray-900 p-4 rounded-lg mb-3 shadow-md cursor-pointer active:scale-[0.98] transition">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold">{title}</p>

          {isPremium && (
            <span className="text-yellow-400 text-xs font-bold bg-yellow-900 px-2 py-1 rounded">
              PREMIUM
            </span>
          )}
        </div>

        {rating && (
          <p className="text-gray-400 text-sm">⭐ {rating}</p>
        )}

        <p className="text-purple-400 text-sm mt-2 underline">
          Tap to play story →
        </p>
      </div>
    </Link>
  );
}