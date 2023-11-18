import React from "react";

import { KBarSearchProvider } from "./KBar";
import type { KBarConfig } from "./KBar";

export type SearchConfig = KBarConfig;
export interface SearchConfigProps {
  searchConfig: SearchConfig;
  children: React.ReactNode;
}

export const SearchProvider = ({
  searchConfig,
  children,
}: SearchConfigProps) => {
  return (
    <KBarSearchProvider kbarConfig={searchConfig.kbarConfig}>
      {children}
    </KBarSearchProvider>
  );
};
