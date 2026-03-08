"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

export default function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      // Decode JWT payload
      const payload = JSON.parse(atob(token.split(".")[1]));

      setUser({
        email: payload.email,
        sub: payload.sub,
        ...payload
      });
    } catch (err) {
      console.error("Failed to decode token:", err);
      router.push("/auth/login");
      return;
    }

    setLoading(false);
  }, [router]);

  return { user, loading };
}