import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { fromDir } from "@lib/utils/directory";

import { IPost } from "@types/post";

const postsDirectory = path.join(process.cwd(), "src/app/posts");

export function getPosts() {
  const fileNames = fromDir(postsDirectory, ".mdx");

  console.log(fileNames);

  return fileNames?.map((fileName: string) => {
    const fileNameWithoutExtension = fileName.replace(/\.mdx$/, "");

    const fullPath = path.join(
      postsDirectory,
      `${fileNameWithoutExtension}/${fileName}`
    );
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const matterResults = matter(fileContents);

    const post: IPost = {
      id: fileNameWithoutExtension,
      title: matterResults.data.title,
      date: matterResults.data.date,
      description: matterResults.data.description,
      thumbnailUrl: matterResults.data.thumbnailUrl,
      tags: matterResults.data.tags,
    };

    return post;
  });
}
