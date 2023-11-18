import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

import { getFilesByName } from "@lib/utils/directory";

import { IUser } from "@interfaces/user";

export async function getUser() {
  const postsDirectory = "src/data";

  const filePaths = getFilesByName(postsDirectory, "about.mdx");

  const filePath = filePaths[0];

  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const matterResults = matter(fileContents);

  const htmlContent = await remark()
    .use(remarkHtml)
    .process(matterResults.content);

  const user: IUser = {
    name: matterResults.data.name,
    jobTitle: matterResults.data.jobTitle,
    avatar: matterResults.data.avatar,
    github: matterResults.data.github,
    linkedIn: matterResults.data.linkedIn,
    x: matterResults.data.x,
    content: String(htmlContent),
  };

  return user;
}
