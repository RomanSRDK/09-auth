"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const pathname = usePathname();

  const setUser = useAuthStore((state) => state.setUser);

  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      setIsLoading(true);

      try {
        const isSessionActive = await checkSession();

        if (!isSessionActive) {
          clearIsAuthenticated();
          return;
        }

        const user = await getMe();

        setUser(user);
      } catch {
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, [pathname, setUser, clearIsAuthenticated]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return children;
}
