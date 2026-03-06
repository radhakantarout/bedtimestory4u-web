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

  const handleSignup = async () => {
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (!phone) {
      setError("Phone number is required");
      return;
    }

    const fullPhone = `${countryCode}${phone}`;

    try {
      await signUp(email, password, fullPhone);
      router.push(`/auth/verify?email=${email}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Account</h1>

      <input
        className="w-full p-2 mb-3 text-black"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="flex gap-2 mb-3">
        <select
          className="p-2 text-black"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        >
          <option value="+61">🇦🇺 +61</option>
          <option value="+91">🇮🇳 +91</option>
          <option value="+1">🇺🇸 +1</option>
        </select>

        <input
          className="flex-1 p-2 text-black"
          placeholder="Phone number"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <input
        className="w-full p-2 mb-3 text-black"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        className="w-full p-2 mb-3 text-black"
        placeholder="Confirm Password"
        type="password"
        onChange={(e) => setConfirm(e.target.value)}
      />

      {error && <p className="text-red-400">{error}</p>}

      <button
        onClick={handleSignup}
        className="w-full bg-blue-600 p-3 rounded mt-4"
      >
        Sign Up
      </button>
    </div>
  );
}