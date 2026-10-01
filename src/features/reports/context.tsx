"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "../auth/context";
import { mutateReports, readReports, REPORTS_KEY } from "./repository";
import type { Report, ReportInput, ReportStatus } from "./types";

type ReportsState = {
  reports: Report[];
  ready: boolean;
  error: string | null;
  reload: () => void;
  create: (input: ReportInput) => void;
  edit: (id: string, input: ReportInput) => void;
  remove: (id: string) => void;
  changeStatus: (id: string, status: ReportStatus) => void;
};
const ReportsContext = createContext<ReportsState | null>(null);
export function ReportsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reload = useCallback(() => {
    try {
      setReports(readReports());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Laporan tidak dapat dimuat.");
    }
    setReady(true);
  }, []);
  useEffect(() => {
    Promise.resolve().then(reload);
    const sync = (event: StorageEvent) => {
      if (event.key === REPORTS_KEY || event.key === null) reload();
    };
    window.addEventListener("storage", sync);
    window.addEventListener("focus", reload);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", reload);
    };
  }, [reload]);
  function mutate(action: Parameters<typeof mutateReports>[1]) {
    if (!user) throw new Error("Silakan masuk kembali.");
    try {
      setReports(mutateReports(user, action));
      setError(null);
    } catch (e) {
      reload();
      throw e;
    }
  }
  return (
    <ReportsContext.Provider
      value={{
        reports,
        ready,
        error,
        reload,
        create: (input) => mutate({ type: "create", input }),
        edit: (id, input) => mutate({ type: "edit", id, input }),
        remove: (id) => mutate({ type: "delete", id }),
        changeStatus: (id, status) => mutate({ type: "status", id, status }),
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}
export function useReports() {
  const context = useContext(ReportsContext);
  if (!context) throw new Error("ReportsProvider diperlukan.");
  return context;
}
