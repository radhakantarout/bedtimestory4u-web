"use client";

import { Suspense } from "react";
import VerifyContent from "@/app/auth/verify/VerifyContent";

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <p className="text-gray-300">Loading...</p>
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}