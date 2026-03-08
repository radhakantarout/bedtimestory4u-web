"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import useAuth from "@/hooks/useAuth";
import { apiPost } from "@/lib/api";

export default function RecordVoicePage() {
  const params = useSearchParams();
  const router = useRouter();
  const { user, loading } = useAuth();

  const voiceName = params.get("name") || "Voice";

  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [audioBase64, setAudioBase64] = useState("");
  const mediaRecorderRef = useRef<any>(null);
  const chunksRef = useRef<any[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e: any) => {
      chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
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

  const saveVoice = async () => {
    if (!user?.email || !audioBase64) return;

    await apiPost("/save-voice", {
      userId: user.email,
      voiceName,
      audioBase64
    });

    router.push("/voices");
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Record {voiceName}</h1>

        <p className="text-gray-300 mb-4">
          Read this aloud for 10–20 seconds:
        </p>

        <div className="bg-gray-900 p-4 rounded mb-6 text-gray-300">
          “Hi sweetheart, this is your bedtime voice. I love telling you stories.
          Once upon a time, in a cozy little forest, a tiny star learned how to
          shine. And now, I’m excited to read you many more stories.”
        </div>

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
          <div className="mt-6 space-y-4">
            <audio controls src={audioURL} className="w-full" />

            <button
              onClick={startRecording}
              className="w-full bg-gray-700 p-3 rounded font-semibold"
            >
              Retake
            </button>

            <button
              onClick={saveVoice}
              className="w-full bg-green-600 p-3 rounded font-semibold"
            >
              Save Voice
            </button>
          </div>
        )}
      </div>
    </div>
  );
}