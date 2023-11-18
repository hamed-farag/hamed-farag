import { useState, useEffect, FC, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { KBarProvider } from "kbar";
import type { Action } from "kbar";

import { formatDate } from "@lib/utils/date";

import { IPost } from "@interfaces/post";

import { KBarModal } from "./KBarModal";

export interface KBarSearchProps {
  searchDocumentsPath: string | false;
  defaultActions?: Action[];
  onSearchDocumentsLoad?: (json: any) => Action[];
}

export interface KBarConfig {
  kbarConfig: KBarSearchProps;
}

export const KBarSearchProvider: FC<{
  children: ReactNode;
  kbarConfig: KBarSearchProps;
}> = ({ kbarConfig, children }) => {
  const router = useRouter();
  const { searchDocumentsPath, defaultActions, onSearchDocumentsLoad } =
    kbarConfig;
  const [searchActions, setSearchActions] = useState<Action[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const mapPosts = (posts: Array<IPost>) => {
      const actions: Action[] = [];
      for (const post of posts) {
        actions.push({
          id: post.id,
          name: post.title,
          keywords: post.description,
          section: "posts",
          subtitle: formatDate(post.date),
          perform: () => router.push("/posts/" + post.id),
        });
      }
      return actions;
    };

    async function fetchData() {
      if (searchDocumentsPath) {
        const url =
          searchDocumentsPath.indexOf("://") > 0 ||
          searchDocumentsPath.indexOf("//") === 0
            ? searchDocumentsPath
            : new URL(searchDocumentsPath, window.location.origin);
        const res = await fetch(url);
        const json = await res.json();
        const actions = onSearchDocumentsLoad
          ? onSearchDocumentsLoad(json)
          : mapPosts(json);
        setSearchActions(actions);
        setDataLoaded(true);
      }
    }
    if (!dataLoaded && searchDocumentsPath) {
      fetchData();
    } else {
      setDataLoaded(true);
    }
  }, [
    defaultActions,
    dataLoaded,
    router,
    searchDocumentsPath,
    onSearchDocumentsLoad,
  ]);

  return (
    <KBarProvider actions={defaultActions}>
      <KBarModal actions={searchActions} isLoading={!dataLoaded} />
      {children}
    </KBarProvider>
  );
};
