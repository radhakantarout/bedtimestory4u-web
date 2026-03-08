"use client";

import { useState } from "react";
import { signUp } from "@/lib/cognito";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+61");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (!phone) {
      setError("Phone number is required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const fullPhone = `${countryCode}${phone}`;

    try {
      setLoading(true);
      await signUp(email, password, fullPhone);
      router.push(`/auth/verify?email=${email}`);
    } catch (err: any) {
      setError(err.message || "Signup failed");
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
      <h1 className="text-3xl font-bold mt-4">Create Your Account</h1>

      {/* Emotional Quote */}
      <p className="text-center text-gray-300 mt-3 px-4 leading-relaxed text-sm">
        “Every bedtime story begins with love.  
        Let’s create a magical space for your little one.”
      </p>

      {/* Form */}
      <div className="w-full max-w-xs mt-8 space-y-4">

        <input
          className="w-full p-3 rounded bg-gray-900 text-white placeholder-gray-400"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex gap-2">
          <select
            className="p-3 rounded bg-gray-900 text-white"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="+61">🇦🇺 +61</option>
            <option value="+91">🇮🇳 +91</option>
            <option value="+1">🇺🇸 +1</option>
          </select>

          <input
            className="flex-1 p-3 rounded bg-gray-900 text-white placeholder-gray-400"
            placeholder="Phone number"
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <input
          className="w-full p-3 rounded bg-gray-900 text-white placeholder-gray-400"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-gray-900 text-white placeholder-gray-400"
          placeholder="Confirm Password"
          type="password"
          onChange={(e) => setConfirm(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-green-600 p-3 rounded font-semibold shadow-md disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <a href="/auth/login" className="text-purple-400 underline">
            Login
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