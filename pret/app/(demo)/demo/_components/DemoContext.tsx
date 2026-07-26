"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { Anomalie, Intervenant, Logement } from "./types";
import {
  anomaliesInitiales,
  intervenantsInitiaux,
  logementsInitiaux,
} from "./data";

interface DemoContextValue {
  logements: Logement[];
  setLogements: Dispatch<SetStateAction<Logement[]>>;
  anomalies: Anomalie[];
  setAnomalies: Dispatch<SetStateAction<Anomalie[]>>;
  intervenants: Intervenant[];
  toast: string | null;
  showToast: (message: string) => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [logements, setLogements] = useState<Logement[]>(logementsInitiaux);
  const [anomalies, setAnomalies] = useState<Anomalie[]>(anomaliesInitiales);
  const [intervenants] = useState<Intervenant[]>(intervenantsInitiaux);
  const [toast, setToast] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setToast(null), 2600);
  }, []);

  return (
    <DemoContext.Provider
      value={{
        logements,
        setLogements,
        anomalies,
        setAnomalies,
        intervenants,
        toast,
        showToast,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error("useDemo doit être utilisé sous DemoProvider");
  }
  return ctx;
}
