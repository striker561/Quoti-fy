"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useAuthStore from "@/stores/auth/useAuthStore";

export default function SessionSyncer() {
  const { data: session, status } = useSession();
  const { login, logout } = useAuthStore();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      login(session.user);
    } else if (status === "unauthenticated") {
      logout();
    }
  }, [session, status, login, logout]);

  return null;
}
