"use client";

import Link from "next/link";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <nav className="w-full p-4 bg-black border-b border-gray-800 flex justify-between items-center">
      <Link href="/dashboard" className="font-bold text-lg">
        BedtimeStory4U
      </Link>

      <button onClick={handleLogout} className="text-sm text-red-400">
        Logout
      </button>
    </nav>
  );
}