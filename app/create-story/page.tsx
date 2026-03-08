"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { apiGet, apiPost } from "@/lib/api";
import useAuth from "@/hooks/useAuth";

export default function CreateStoryPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [themes, setThemes] = useState<any[]>([]);
  const [voices, setVoices] = useState<any[]>([]);
  const [form, setForm] = useState({
    themeId: "",
    voiceID: "",
    childName: "",
    childAge: "",
    prompt: ""
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading) {
      // Fetch themes
      apiGet("/themes").then(setThemes);

      // Fetch user voices (max 2)
      if (user?.email) {
        apiGet(`/voices?userId=${user.email}`).then((data) => {
          if (Array.isArray(data)) setVoices(data);
        });
      }
    }
  }, [loading, user]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!user?.email) return;

    setSubmitting(true);

    try {
      await apiPost("/generate-story", {
        userId: user.email,
        prompt: form.prompt,
        themeId: form.themeId,
        voiceId: form.voiceID,
        childAge: Number(form.childAge),
        childName: form.childName
      });

      router.push("/my-stories");
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create a Story</h1>

        {/* Theme Dropdown */}
        <label className="block mb-2">Theme</label>
        <select
          name="themeId"
          value={form.themeId}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-900 mb-4"
        >
          <option value="">Select theme</option>
          {themes.map((t) => (
            <option key={t.themeId} value={t.themeId}>
              {t.name}
            </option>
          ))}
        </select>

        {/* Voice Dropdown */}
        <label className="block mb-2">Voice</label>
        <select
          name="voiceID"
          value={form.voiceID}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-900 mb-4"
        >
          <option value="">Select voice</option>

          {voices.length === 0 && (
            <option disabled>No voices found — please clone a voice</option>
          )}

          {voices.map((v) => (
            <option key={v.voiceId} value={v.voiceId}>
              {v.voiceName}
            </option>
          ))}
        </select>

        {/* Child Name */}
        <input
          name="childName"
          placeholder="Child's Name"
          value={form.childName}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-900 mb-4"
        />

        {/* Child Age */}
        <input
          name="childAge"
          placeholder="Child's Age"
          type="number"
          value={form.childAge}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-900 mb-4"
        />

        {/* Prompt */}
        <textarea
          name="prompt"
          placeholder="Story prompt (optional)"
          value={form.prompt}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-900 mb-4 h-32"
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-purple-600 p-3 rounded font-semibold"
        >
          {submitting ? "Creating your story..." : "Generate Story"}
        </button>
      </div>
    </div>
  );
}