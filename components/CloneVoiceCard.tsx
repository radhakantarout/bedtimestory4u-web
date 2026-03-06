"use client";

import Link from "next/link";

export default function CloneVoiceCard() {
  return (
    <Link
      href="/voices"
      className="bg-purple-600 p-4 rounded-lg text-center font-semibold"
    >
      🎤 Clone Your Voice
    </Link>
  );
}