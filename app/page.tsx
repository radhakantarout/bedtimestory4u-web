"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      
      {/* Logo */}
      <div className="mt-10">
        <Image
          src="/logo.png"
          alt="BedtimeStory4U Logo"
          width={150}
          height={150}
          className="rounded-full shadow-lg"
        />
      </div>

      {/* App Title */}
      <h1 className="text-3xl font-bold mt-4">BedtimeStory4U</h1>

      {/* Emotional Quote */}
      <p className="text-center text-gray-300 mt-4 px-4 leading-relaxed">
        “Every night is a chance to create memories your little one will carry forever.”
      </p>

      {/* Buttons */}
      <div className="mt-10 w-full max-w-xs flex flex-col gap-4">
        <a
          href="/auth/login"
          className="bg-purple-600 p-3 rounded text-center font-semibold shadow-md"
        >
          Login
        </a>

        <a
          href="/auth/signup"
          className="bg-green-600 p-3 rounded text-center font-semibold shadow-md"
        >
          Create Account
        </a>
      </div>

      {/* Footer small text */}
      <p className="text-gray-500 text-xs mt-10">
        Made with ❤️ for magical bedtime moments
      </p>
    </div>
  );
}