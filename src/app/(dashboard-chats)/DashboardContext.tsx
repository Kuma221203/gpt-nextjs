"use client";
import { createContext, useContext, useState } from "react";

interface DashboardContextType {
  model: string;
  newStateId: string;
  setModel: (value: string) => void;
  setNewStateId: (value: string) => void;
}

const DashboardContext = createContext<DashboardContextType>({
  model: "",
  newStateId: "",
  setModel: () => {},
  setNewStateId: () => {},
});

export function useDashboardContext() {
  return useContext(DashboardContext);
}

export function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [model, setModel] = useState<string>("");
  const [newStateId, setNewStateId] = useState<string>("");
  

  const value: DashboardContextType = {
    model,
    newStateId,
    setModel,
    setNewStateId,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
