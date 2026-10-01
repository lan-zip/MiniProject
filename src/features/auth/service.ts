import { DEMO_ACCOUNTS } from "./demo-users";
import type { User } from "./types";

export const SESSION_KEY = "campusspace.session.v1";

function publicUser(account: (typeof DEMO_ACCOUNTS)[number]): User {
  return { nim: account.nim, name: account.name, role: account.role };
}

export function authenticate(nim: string, password: string): User | null {
  const account = DEMO_ACCOUNTS.find(
    (u) => u.nim === nim.trim() && u.password === password,
  );
  return account ? publicUser(account) : null;
}

export function restoreSession(): User | null {
  try {
    const nim = sessionStorage.getItem(SESSION_KEY);
    const account = DEMO_ACCOUNTS.find((u) => u.nim === nim);
    return account ? publicUser(account) : null;
  } catch {
    return null;
  }
}
