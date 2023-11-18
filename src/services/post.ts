import fs from "fs";
import { remark } from "remark";
import matter from "gray-matter";
import remarkHtml from "remark-html";

import { getFilesWithExtension, getFilesByName } from "@lib/utils/directory";
import { headingTree } from "@lib/plugins/remark-headingTree";

import { IPost } from "@interfaces/post";

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
  const filePaths = getFilesWithExtension("posts", ".mdx");

  const posts = filePaths.map((filePath: string) => {
    return extractPostFromPath(filePath);
  });

  return posts;
}

// TODO: WRAP THIS FUNCTION WITH AN API, FOR REPLACING search.json later on
export function getPostsById(id: string) {
  const filePaths = getFilesByName("posts", `${id}.mdx`);

  if (filePaths.length > 0) {
    const filePath = filePaths[0];

    return extractPostFromPath(filePath);
  }

  return null;
}

export async function getPostContentById(id: string) {
  const postFilePath = getFilesByName("posts", `${id}.mdx`);

  if (postFilePath.length > 0) {
    const postContent = fs.readFileSync(postFilePath[0], "utf-8");
    const postResult = matter(postContent);

    const htmlContent = await remark()
      .use(headingTree)
      .use(remarkHtml)
      .process(postResult.content);

    return {
      postData: postResult,
      htmlContent: htmlContent,
    };
  }

  return null;
}
