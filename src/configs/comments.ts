import type { GiscusProps, Theme as GiscusTheme } from "@giscus/react";

const postConfig: {
  giscus: Omit<GiscusProps, "theme"> & {
    /**
     * The themes to use in the Giscus comment sections.
     * Must be a valid {@link GiscusTheme}.
     */
    theme?: {
      /**
       * @default 'light'
       */
      light?: GiscusTheme;
      /**
       * @default 'dark_dimmed'
       */
      dark?: GiscusTheme;
    };
  };
} = {
  giscus: {
    repo: "hamed-farag/hamed-farag",
    repoId: "R_kgDOIWT60A",
    category: "General",
    categoryId: "DIC_kwDOIWT60M4CbgXb",
    mapping: "title",
    reactionsEnabled: "1",
    theme: {
      light: "light",
      dark: "dark_dimmed",
    },
  },
};

export { postConfig };
