"use client";

import useAuth from "@/hooks/useAuth";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
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

        {/* Avatar + Email */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <p className="font-semibold">{user?.email}</p>
            <p className="text-gray-400 text-sm">Your bedtime storyteller</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2 mb-8">
          <p className="text-gray-400 text-sm mb-1">Quick Actions</p>

          <button
            onClick={() => router.push("/voices")}
            className="w-full bg-gray-900 p-3 rounded flex justify-between items-center"
          >
            <span>🎤 Clone Voice</span>
            <span>›</span>
          </button>

          <button
            onClick={() => router.push("/my-stories")}
            className="w-full bg-gray-900 p-3 rounded flex justify-between items-center"
          >
            <span>📚 My Stories</span>
            <span>›</span>
          </button>

          <button
            onClick={() => router.push("/themes/library")}
            className="w-full bg-gray-900 p-3 rounded flex justify-between items-center"
          >
            <span>🎨 Explore Themes</span>
            <span>›</span>
          </button>

          <div className="w-full bg-gray-900 p-3 rounded flex justify-between items-center opacity-50">
            <span>🎥 Video Avatar (coming soon)</span>
            <span>›</span>
          </div>
        </div>

        {/* Voices List */}
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-2">Your Voices</p>

          {voices.length === 0 && (
            <p className="text-gray-500 text-sm">No voices created yet.</p>
          )}

          {voices.map((v) => (
            <div
              key={v.voiceId}
              className="bg-gray-900 p-3 rounded flex justify-between items-center mb-2"
            >
              <span>{v.voiceName}</span>
              <span className="text-purple-400 text-sm">Ready</span>
            </div>
          ))}
        </div>

        {/* Account */}
        <div className="space-y-2">
          <p className="text-gray-400 text-sm mb-1">Account</p>

          <button
            onClick={handleLogout}
            className="w-full bg-gray-900 p-3 rounded text-left text-red-400"
          >
            Logout
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}