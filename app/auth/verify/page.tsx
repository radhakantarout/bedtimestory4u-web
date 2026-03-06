"use client";

import { useState } from "react";
import { confirmSignUp } from "@/lib/cognito";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyPage() {
  const params = useSearchParams();
  const email = params.get("email") || "";
  const router = useRouter();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    try {
      await confirmSignUp(email, code);
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Verify Email</h1>
      <p className="mb-3">Enter the OTP sent to {email}</p>

      <input
        className="w-full p-2 mb-3 text-black"
        placeholder="Verification Code"
        onChange={(e) => setCode(e.target.value)}
      />

      {error && <p className="text-red-400">{error}</p>}

      <button
        onClick={handleVerify}
        className="w-full bg-green-600 p-3 rounded mt-4"
      >
        Verify
      </button>
    </div>
  );
}