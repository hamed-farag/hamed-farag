import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { findFilesByName } from "@lib/utils/directory";

import { IPost } from "@interfaces/post";

export function getPosts() {
  const postsDirectory = path.join(process.cwd(), "src/app/posts");
  const filePaths = findFilesByName(postsDirectory, "metadata.mdx");

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
