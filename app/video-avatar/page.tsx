"use client";

import useAuth from "@/hooks/useAuth";
import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default function VideoAvatarPage() {
  const [selfie, setSelfie] = useState<string>("");
  const { user, loading } = useAuth();
  const router = useRouter();
  const [audioURL, setAudioURL] = useState<string>("");
  const [audioBase64, setAudioBase64] = useState<string>("");
  const [recording, setRecording] = useState(false);

  const mediaRecorderRef = useRef<any>(null);
  const chunksRef = useRef<any[]>([]);

  // ---------------------------
  // 1) Upload or Capture Selfie
  // ---------------------------
  const handleSelfieUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelfie(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ---------------------------
  // 2) Record Audio (mp4 → wav backend)
  // ---------------------------
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const options = { mimeType: "audio/mp4" };
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e: any) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/mp4" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(",")[1];
        setAudioBase64(base64);
      };
      reader.readAsDataURL(blob);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  // ---------------------------
  // 3) Generate Avatar (Backend)
  // ---------------------------
  console.log("User:", user);
 const generateAvatar = async () => {
  if (!user || !user.email) {
    alert("User not loaded yet. Please wait.");
    return;
  }
  console.log("User: inside==", user);
  if (!selfie || !audioBase64) {
    alert("Please upload selfie and audio first.");
    return;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-avatar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user.email,
      selfieBase64: selfie,
      audioBase64,
    }),
  });

  const data = await res.json();

  if (data.videoUrl) {
    router.push(`/avatar-preview?url=${encodeURIComponent(data.videoUrl)}`);
  }
};


  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <div className="p-6 max-w-md mx-auto">

        <h1 className="text-2xl font-bold mb-4">Create Video Avatar</h1>

        <p className="text-gray-300 mb-6">
          Upload a selfie and record a short audio sample. We’ll create a
          magical talking avatar for your bedtime stories.
        </p>

        {/* Step 1: Selfie */}
        <div className="bg-gray-900 p-4 rounded mb-6">
          <p className="font-semibold mb-2">1. Upload or Take Selfie</p>

          {selfie ? (
            <img
              src={selfie}
              alt="Selfie"
              className="w-full rounded mb-3"
            />
          ) : (
            <p className="text-gray-400 text-sm mb-3">
              Choose a clear front-facing photo.
            </p>
          )}

          <input
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleSelfieUpload}
            className="w-full bg-gray-800 p-2 rounded"
          />
        </div>

        {/* Step 2: Audio */}
        <div className="bg-gray-900 p-4 rounded mb-6">
          <p className="font-semibold mb-2">2. Record or Upload Audio</p>

          {audioURL ? (
            <audio controls src={audioURL} className="w-full mb-3" />
          ) : (
            <p className="text-gray-400 text-sm mb-3">
              Record 10–20 seconds of your voice.
            </p>
          )}

          {!recording && !audioURL && (
            <button
              onClick={startRecording}
              className="w-full bg-purple-600 p-3 rounded font-semibold"
            >
              Start Recording
            </button>
          )}

          {recording && (
            <button
              onClick={stopRecording}
              className="w-full bg-red-600 p-3 rounded font-semibold"
            >
              Stop Recording
            </button>
          )}

          {audioURL && (
            <button
              onClick={startRecording}
              className="w-full bg-gray-700 p-3 rounded font-semibold mt-3"
            >
              Retake Audio
            </button>
          )}
        </div>

        {/* Step 3: Generate */}
        <button
          onClick={generateAvatar}
          className="w-full bg-green-600 p-3 rounded font-semibold"
        >
          Generate Avatar
        </button>
      </div>

      <BottomNav />
    </div>
  );
}