"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

interface SessionUser {
  id: string
  name?: string;
  email?: string;
  image?: string | null;
  address?: string | null;
  phone?: string | null;
  jobRole?: string | null;
  role?: string | null;
}

interface AuthContextProps {
  session: SessionUser | null;
  setSession: Dispatch<SetStateAction<SessionUser | null>>;
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
