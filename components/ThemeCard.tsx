"use client";

import Link from "next/link";

export default function ThemeCard({ id, title, description }: any) {
  return (
    <Link
      href={`/themes/${id}`}
      className="bg-gray-900 rounded-lg p-4 shadow-md block"
    >
      <p className="text-lg font-semibold mb-1">{title}</p>
      <p className="text-gray-400 text-sm">{description}</p>
    </Link>
  );
}