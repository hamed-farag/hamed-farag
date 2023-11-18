import fs from "fs";
import matter from "gray-matter";
import getConfig from "next/config";

import { findFilesWithExtension, findFilesByName } from "@lib/utils/directory";

import { IPost } from "@interfaces/post";

const { serverRuntimeConfig } = getConfig();

function extractPostFromPath(path: string) {
  // GET BLOG NAME BASED ON FOLDER NAME
  // filePathApart -> [ '', 'hamed-farag', 'app', 'posts', 'my-blog.mdx' ]
  const filePathApart = path.split("/");
  let id = filePathApart[filePathApart.length - 1];
  id = id.replace(/\.[^/.]+$/, ""); // remove extension

  const fileContents = fs.readFileSync(path, "utf-8");
  const matterResults = matter(fileContents);

  const post: IPost = {
    id,
    title: matterResults.data.title,
    date: matterResults.data.date,
    description: matterResults.data.description,
    tags: matterResults.data.tags,
    content: matterResults.content,
  };

  return post;
}

// TODO: WRAP THIS FUNCTION WITH AN API, FOR REPLACING search.json later on
export function getPosts() {
  const filePaths = findFilesWithExtension(
    serverRuntimeConfig.POSTS_ROOT,
    ".mdx"
  );

  return filePaths.map((filePath: string) => {
    return extractPostFromPath(filePath);
  });
}

// TODO: WRAP THIS FUNCTION WITH AN API, FOR REPLACING search.json later on
export function getPostsById(id: string) {
  const filePaths = findFilesByName(
    serverRuntimeConfig.POSTS_ROOT,
    `${id}.mdx`
  );

  if (filePaths.length > 0) {
    const filePath = filePaths[0];

    return extractPostFromPath(filePath);
  }

  return null;
}
