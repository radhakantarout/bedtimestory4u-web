"use client";

export default function StoryListItem({ title, audioUrl, rating, isPremium }: any) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg mb-3 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold">{title}</p>

        {isPremium && (
          <span className="text-yellow-400 text-xs font-bold bg-yellow-900 px-2 py-1 rounded">
            PREMIUM
          </span>
        )}
      </div>

      {rating && (
        <p className="text-gray-400 text-sm mb-2">⭐ {rating}</p>
      )}

      <audio controls className="w-full mb-3">
        <source src={audioUrl} type="audio/mpeg" />
      </audio>

      <a
        href={audioUrl}
        download
        className="text-blue-400 underline text-sm"
      >
        Download
      </a>
    </div>
  );
}