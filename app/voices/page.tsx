"use client";

import Navbar from "@/components/Navbar";
import useAuth from "@/hooks/useAuth";

export default function VoicesPage() {
  const { loading } = useAuth();
  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="p-6">
        <h1 className="text-xl font-bold">Clone Voice</h1>
        <p className="mt-2 text-gray-400">Voice cloning UI will go here...</p>
      </div>
    </div>
  );
}