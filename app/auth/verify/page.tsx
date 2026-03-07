"use client";

import { Suspense } from "react";
import VerifyContent from "@/app/auth/verify/VerifyContent"

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}