import { useState, useEffect, FC, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { KBarProvider } from "kbar";
import type { Action } from "kbar";

import { getMiniPosts } from "@services/postClient";
import { IMiniPost } from "@interfaces/post";

import { KBarModal } from "./KBarModal";

export interface KBarSearchProps {
  defaultActions?: Action[];
}

export interface KBarConfig {
  kbarConfig: KBarSearchProps;
}

export const KBarSearchProvider: FC<{
  children: ReactNode;
  kbarConfig: KBarSearchProps;
}> = ({ kbarConfig, children }) => {
  const router = useRouter();
  const { defaultActions } = kbarConfig;
  const [searchActions, setSearchActions] = useState<Action[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const mapPosts = (posts: Array<IMiniPost>) => {
      const actions: Action[] = [];
      for (const post of posts) {
        actions.push({
          id: post.id,
          name: post.title,
          keywords: post.description,
          section: "posts",
          subtitle: post.date,
          perform: () => router.push("/posts/" + post.id),
        });
      }
      return actions;
    };

    async function fetchData() {
      const posts = await getMiniPosts();
      const actions = mapPosts(posts.data);
      setSearchActions(actions);
      setDataLoaded(true);
    }

    if (!dataLoaded) {
      fetchData();
    } else {
      setDataLoaded(true);
    }
  }, [defaultActions, dataLoaded, router]);

  return (
    <KBarProvider actions={defaultActions}>
      <KBarModal actions={searchActions} isLoading={!dataLoaded} />
      {children}
    </KBarProvider>
  );
};
