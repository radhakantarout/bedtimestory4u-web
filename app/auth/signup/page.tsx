"use client";

import { useState } from "react";
import { signUp } from "@/lib/cognito";
import { useRouter } from "next/navigation";

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
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>

      <div className="space-y-4">
        <input
          className="w-full p-3 rounded text-black"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex gap-2">
          <select
            className="p-3 rounded text-black"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="+61">🇦🇺 +61</option>
            <option value="+91">🇮🇳 +91</option>
            <option value="+1">🇺🇸 +1</option>
          </select>

          <input
            className="flex-1 p-3 rounded text-black"
            placeholder="Phone number"
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <input
          className="w-full p-3 rounded text-black"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="w-full p-3 rounded text-black"
          placeholder="Confirm Password"
          type="password"
          onChange={(e) => setConfirm(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 p-3 rounded mt-4 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-400 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}