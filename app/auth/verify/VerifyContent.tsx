"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { confirmSignUp } from "@/lib/cognito";
import Image from "next/image";

export default function VerifyContent() {
  const params = useSearchParams();
  const router = useRouter();

  const email = params.get("email") || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setError("");

    if (otp.length < 4) {
      setError("Please enter the 6‑digit code");
      return;
    }

    try {
      setLoading(true);
      await confirmSignUp(email, otp);
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.message || "Verification failed");
    } finally {
      setLoading(false);
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
      <h1 className="text-3xl font-bold mt-4">Verify Your Account</h1>

      {/* Emotional Quote */}
      <p className="text-center text-gray-300 mt-3 px-4 leading-relaxed text-sm">
        “A tiny step before magical bedtime stories begin.  
        Enter the code we sent to your email.”
      </p>

      {/* Form */}
      <div className="w-full max-w-xs mt-8 space-y-4">

        <p className="text-gray-400 text-sm text-center">
          Code sent to <span className="text-white font-semibold">{email}</span>
        </p>

        <input
          className="w-full p-3 rounded bg-gray-900 text-white placeholder-gray-400 text-center tracking-widest text-lg"
          placeholder="Enter OTP"
          maxLength={6}
          onChange={(e) => setOtp(e.target.value)}
        />

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-purple-600 p-3 rounded font-semibold shadow-md disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          Didn’t receive the code?  
          <span className="text-purple-400 underline ml-1">Resend</span>
        </p>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-xs mt-10">
        Made with ❤️ for magical bedtime moments
      </p>
    </div>
  );
}