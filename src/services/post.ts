import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { findFilesWithExtension } from "@lib/utils/directory";

import { IPost } from "@types/post";

const postsDirectory = path.join(process.cwd(), "src/app/posts");

export function getPosts() {
  const filePaths = findFilesWithExtension(postsDirectory, ".mdx");
  console.log(filePaths);
  return filePaths.map((filePath: string) => {
    const fileContents = fs.readFileSync(filePath, "utf-8");

    const matterResults = matter(fileContents);

    const post: IPost = {
      id: "fileNameWithoutExtension", // to be file name
      title: matterResults.data.title,
      date: matterResults.data.date,
      description: matterResults.data.description,
      thumbnailUrl: matterResults.data.thumbnailUrl,
      tags: matterResults.data.tags,
      content: "",
    };

    return post;
  });
}
