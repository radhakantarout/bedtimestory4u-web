"use client";

import useAuth from "@/hooks/useAuth";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [voices, setVoices] = useState<any[]>([]);

  useEffect(() => {
    if (user?.email) {
      apiGet(`/voices?userId=${user.email}`).then((data) => {
        if (Array.isArray(data)) setVoices(data);
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  if (loading) return <p className="p-6 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="p-6 max-w-md mx-auto">

        {/* Avatar */}
        <div className="flex flex-col items-center mt-6">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-4xl">
            👤
          </div>
          <h1 className="text-xl font-bold mt-3">{user?.email}</h1>
          <p className="text-gray-400 text-sm">Your bedtime storyteller</p>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 space-y-4">
          <Link
            href="/voices"
            className="block bg-gray-900 p-4 rounded flex justify-between items-center"
          >
            <span>🎤 Clone Voice</span>
            <span>›</span>
          </Link>

          <Link
            href="/themes"
            className="block bg-gray-900 p-4 rounded flex justify-between items-center"
          >
            <span>🎨 Explore Themes</span>
            <span>›</span>
          </Link>

          <Link
            href="/my-stories"
            className="block bg-gray-900 p-4 rounded flex justify-between items-center"
          >
            <span>📚 My Stories</span>
            <span>›</span>
          </Link>

          <div className="block bg-gray-900 p-4 rounded flex justify-between items-center opacity-50">
            <span>🎥 Video Avatar (coming soon)</span>
            <span>›</span>
          </div>
        </div>

        {/* Voices List */}
        <h2 className="text-lg font-semibold mt-10 mb-3">Your Voices</h2>
        <div className="space-y-3">
          {voices.length === 0 && (
            <p className="text-gray-400 text-sm">No voices created yet.</p>
          )}

          {voices.map((v) => (
            <div
              key={v.voiceId}
              className="bg-gray-900 p-4 rounded flex justify-between"
            >
              <span>{v.voiceName}</span>
              <span className="text-purple-400 text-sm">Ready</span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 p-3 rounded font-semibold mt-10"
        >
          Logout
        </button>
      </div>

      <BottomNav />
    </div>
  );
}