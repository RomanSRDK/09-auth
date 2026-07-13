"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { checkSession, logout } from "@/lib/api/clientApi";
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
        const user = await checkSession();

        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();

        if (pathname.startsWith("/profile") || pathname.startsWith("/notes")) {
          await logout();
        }
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
