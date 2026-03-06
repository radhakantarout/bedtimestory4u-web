"use client";

import { useState } from "react";
import { login } from "@/lib/cognito";
import { saveSession } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const session: any = await login(email, password);
      saveSession(session);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <input
        className="w-full p-2 mb-3 text-black"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full p-2 mb-3 text-black"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-400">{error}</p>}

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 p-3 rounded mt-4"
      >
        Sign In
      </button>
    </div>
  );
}