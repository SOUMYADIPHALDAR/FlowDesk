"use client";

import { createContext, useContext, useMemo } from "react";

interface SessionUser {
  name?: string;
  email?: string;
  image?: string;
  role?: string;
}

interface AuthContextProps {
  session: SessionUser | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionUser | null;
}) {
  const value = useMemo(() => ({ session }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used inside AuthProvider.")
    }
    return context;
}
