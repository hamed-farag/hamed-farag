import fs from "fs";
import matter from "gray-matter";
import getConfig from "next/config";

import { findFilesByName } from "@lib/utils/directory";

import { IPost } from "@interfaces/post";

const { serverRuntimeConfig } = getConfig();

// TODO: WRAP THIS FUNCTION WITH AN API, FOR REPLACING search.json later on
export function getPosts() {
  const filePaths = findFilesByName(
    serverRuntimeConfig.POSTS_ROOT,
    "metadata.mdx"
  );

  return filePaths.map((filePath: string) => {
    // GET BLOG NAME BASED ON FOLDER NAME
    // filePathApart -> [ '', 'hamed-farag', 'src', 'app', 'posts', 'my-blog', 'my-blog.mdx' ]
    const filePathApart = filePath.split("/");
    const id = filePathApart[filePathApart.length - 2];

    const fileContents = fs.readFileSync(filePath, "utf-8");
    const matterResults = matter(fileContents);

    const post: IPost = {
      id, // to be file name
      title: matterResults.data.title,
      date: matterResults.data.date,
      description: matterResults.data.description,
      tags: matterResults.data.tags,
      content: matterResults.content,
    };

    return post;
  });
}
