"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import useAuth from "@/hooks/useAuth";
import { apiGet } from "@/lib/api";

export default function VoicesPage() {
  const { user, loading } = useAuth();
  const [voices, setVoices] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && user?.email) {
      apiGet(`/voices?userId=${user.email}`).then((data) => {
        if (Array.isArray(data)) setVoices(data);
      });
    }
  }, [loading, user]);

  const hasMom = voices.some((v) => v.voiceName === "Mom");
  const hasDad = voices.some((v) => v.voiceName === "Dad");

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Voices</h1>

        <div className="space-y-4">
          <Link
            href="/voices/record?name=Mom"
            className="block bg-gray-900 p-4 rounded"
          >
            <p className="font-semibold">Mom’s Voice</p>
            <p className="text-gray-400 text-sm">
              {hasMom ? "Ready" : "Not created yet"}
            </p>
          </Link>

          <Link
            href="/voices/record?name=Dad"
            className="block bg-gray-900 p-4 rounded"
          >
            <p className="font-semibold">Dad’s Voice</p>
            <p className="text-gray-400 text-sm">
              {hasDad ? "Ready" : "Not created yet"}
            </p>
          </Link>
        </div>
      </div>
        <BottomNav />
    </div>
  );
}