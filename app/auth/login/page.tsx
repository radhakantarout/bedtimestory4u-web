"use client";

import { useState } from "react";
import { login } from "@/lib/cognito";
import { saveSession } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const session: any = await login(email, password);
      saveSession(session);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">

      {/* Logo */}
      <div className="mt-10">
        <Image
          src="/logo.png"
          alt="BedtimeStory4U Logo"
          width={100}
          height={100}
          className="rounded-full shadow-lg"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mt-4">Welcome Back</h1>

      {/* Emotional Quote */}
      <p className="text-center text-gray-300 mt-3 px-4 leading-relaxed text-sm">
        “Every story begins with a moment of love.  
        Let’s get you back to creating magical memories.”
      </p>

      {/* Form */}
      <div className="w-full max-w-xs mt-8">
        <input
          className="w-full p-3 mb-4 rounded bg-gray-900 text-white placeholder-gray-400"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 mb-4 rounded bg-gray-900 text-white placeholder-gray-400"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-400 text-sm mb-2 text-center">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 p-3 rounded font-semibold shadow-md"
        >
          Sign In
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          New here?{" "}
          <a href="/auth/signup" className="text-purple-400 underline">
            Create an account
          </a>
        </p>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-xs mt-10">
        Made with ❤️ for magical bedtime moments
      </p>
    </div>
  );
}