"use client";

export default function AudioPlayer({ src }: any) {
  return (
    <audio controls className="w-full mt-3">
      <source src={src} type="audio/mpeg" />
    </audio>
  );
}