"use client";

import { createContext, useContext, useState } from "react";

type THireLevel = {
  /** the form was sent: the hero celebrates under the magnifier */
  cleared: boolean;
  setCleared: (cleared: boolean) => void;
};

const HireLevelContext = createContext<THireLevel>({ cleared: false, setCleared: () => {} });

export function HireLevelProvider({ children }: { children: React.ReactNode }) {
  const [cleared, setCleared] = useState(false);

  return <HireLevelContext value={{ cleared, setCleared }}>{children}</HireLevelContext>;
}

export function useHireLevel() {
  return useContext(HireLevelContext);
}
