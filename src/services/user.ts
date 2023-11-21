import fs from "fs";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

import { siteMetadata } from "@configs/siteMetadata";

import { getFilesByName } from "@lib/utils/directory";

import { IUser } from "@interfaces/user";

export async function getUser() {
  const postsDirectory = "author";

  const filePaths = getFilesByName(postsDirectory, "about.mdx");

  const filePath = filePaths[0];

  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const matterResults = matter(fileContents);

  const htmlContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(matterResults.content);

  const user: IUser = {
    name: siteMetadata.author,
    jobTitle: siteMetadata.jobTitle,
    avatar: siteMetadata.authorAvatar,
    github: siteMetadata.github,
    linkedIn: siteMetadata.linkedin,
    twitter: siteMetadata.twitter,
    content: String(htmlContent),
  };

  return user;
}
