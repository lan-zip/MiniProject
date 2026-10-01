"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { authenticate, restoreSession, SESSION_KEY } from "./service";
import type { User } from "./types";
import { LoginModal } from "./components/login-modal";
import { useToast } from "@/providers/toast-provider";

type AuthState = {
  user: User | null;
  ready: boolean;
  openLogin: () => void;
  logout: () => void;
};
const AuthContext = createContext<AuthState | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const router = useRouter();
  const notify = useToast();
  useEffect(() => {
    Promise.resolve().then(() => {
      setUser(restoreSession());
      setReady(true);
    });
  }, []);
  function login(nim: string, password: string) {
    const account = authenticate(nim, password);
    if (!account) return false;
    try {
      sessionStorage.setItem(SESSION_KEY, account.nim);
    } catch {
      /* In-memory demo session remains available. */
    }
    setUser(account);
    setLoginOpen(false);
    router.push(`/dashboard/${account.role}`);
    notify(`Selamat datang, ${account.name}!`);
    return true;
  }
  function logout() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* Clear the in-memory session as well. */
    }
    setUser(null);
    router.push("/");
    notify("Anda telah keluar.");
  }
  function openLogin() {
    if (user) router.push(`/dashboard/${user.role}`);
    else setLoginOpen(true);
  }
  return (
    <AuthContext.Provider value={{ user, ready, openLogin, logout }}>
      {children}
      {loginOpen && (
        <LoginModal onClose={() => setLoginOpen(false)} onLogin={login} />
      )}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthProvider diperlukan.");
  return context;
}
