"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex flex-col items-center text-xs ${
      pathname === path ? "text-purple-400" : "text-gray-400"
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-2 flex justify-around text-white z-50">
      
      <Link href="/dashboard" className={linkClass("/dashboard")}>
        <span>🏠</span>
        <span>Home</span>
      </Link>

      <Link href="/create-story" className={linkClass("/create-story")}>
        <span>✨</span>
        <span>Create</span>
      </Link>

      <Link href="/themes/library" className={linkClass("/themes")}>
        <span>🎨</span>
        <span>Themes</span>
      </Link>

      <Link href="/my-stories" className={linkClass("/my-stories")}>
        <span>📚</span>
        <span>Stories</span>
      </Link>

      <Link href="/profile" className={linkClass("/profile")}>
        <span>👤</span>
        <span>Profile</span>
      </Link>
    </div>
  );
}