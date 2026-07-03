"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface SessionUser {
  name?: string;
  email?: string;
  image?: string | null;
  role?: string | null;
}

interface AuthContextProps {
  session: SessionUser | null;
  setSession: (value: SessionUser | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({
  children,
  session: initialSession,
}: {
  children: React.ReactNode;
  session: SessionUser | null;
}) {
  const [session, setSession] = useState<SessionUser | null>(initialSession);
  const value = useMemo(() => ({ session, setSession }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
}
