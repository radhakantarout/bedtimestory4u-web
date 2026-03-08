"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import ThemeCard from "@/components/ThemeCard";
import useAuth from "@/hooks/useAuth";
import { apiGet } from "@/lib/api";

export default function ThemesLibraryPage() {
  const { loading } = useAuth();
  const [themes, setThemes] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading) {
      apiGet("/themes")
        .then((data) => {
          // data is an ARRAY, not an object
          setThemes(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error("Theme load error:", err);
          setError("Failed to load themes");
        });
    }
  }, [loading]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Themes</h1>

        {error && <p className="text-red-400">{error}</p>}

        <div className="grid grid-cols-1 gap-4">
          {themes.map((theme) => (
            <ThemeCard
              key={theme.themeId}
              id={theme.themeId}
              title={theme.name}
              description={theme.description}
            />
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}