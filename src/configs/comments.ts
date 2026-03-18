import type { GiscusProps } from "@giscus/react";

const giscusConfig: Omit<GiscusProps, "theme"> = {
  repo: "hamed-farag/hamed-farag",
  repoId: "R_kgDOIWT60A",
  category: "General",
  categoryId: "DIC_kwDOIWT60M4CbgXb",
  mapping: "pathname",
  strict: "1",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "en",
  loading: "lazy",
};

export { giscusConfig };
