import type { MetadataRoute } from "next";

import { getPosts } from "@services/post";
import { siteMetadata } from "@configs/siteMetadata";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

// Same priorities and change frequencies as the old next-sitemap `transform`.
const pages: Array<{
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}> = [
  { path: "", priority: 1.0, changeFrequency: "daily" },
  { path: "/posts", priority: 0.9, changeFrequency: "daily" },
  { path: "/works", priority: 0.8, changeFrequency: "weekly" },
  { path: "/hire", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cortex", priority: 0.7, changeFrequency: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Prerendered at build time, so this is the build date (as next-sitemap did).
  const lastModified = new Date();

  const pageEntries = pages.map(({ path, priority, changeFrequency }) => ({
    url: `${siteMetadata.siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const postEntries = getPosts().map((post) => ({
    url: `${siteMetadata.siteUrl}/posts/${post.id}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...pageEntries, ...postEntries];
}
