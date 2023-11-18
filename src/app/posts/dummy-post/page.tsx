import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

import getConfig from "next/config";

import { Separator } from "@components/ui/Separator";
import { TOC } from "@components/TOC";

import { headingTree } from "@lib/plugins/remark-headingTree";

const { serverRuntimeConfig } = getConfig();

export default async function PostPage() {
  const currentDirectoryPathApart = __dirname.split("/");
  const currentDirectory =
    currentDirectoryPathApart[currentDirectoryPathApart.length - 1];

  const postMetadataFilePath = path.join(
    serverRuntimeConfig.POSTS_ROOT,
    currentDirectory,
    "metadata.mdx"
  );

  const postFilePath = path.join(
    serverRuntimeConfig.POSTS_ROOT,
    currentDirectory,
    "post.mdx"
  );

  const metadataContent = fs.readFileSync(postMetadataFilePath, "utf-8");
  const metadata = matter(metadataContent);

  const postContent = fs.readFileSync(postFilePath, "utf-8");
  const postResult = matter(postContent);

  const htmlContent = await remark()
    .use(headingTree)
    .use(remarkHtml)
    .process(postResult.content);

  return (
    <section>
      <section className="text-center">
        <small>{metadata.data.date}</small>
        <h1>{metadata.data.title}</h1>
      </section>
      <Separator />
      <section className="grid grid-cols-12 lg:gap-10">
        <article className="col-span-12 lg:col-span-9">
          <div dangerouslySetInnerHTML={{ __html: String(htmlContent) }} />
        </article>
        <aside className="hidden lg:block lg:col-span-3">
          <TOC data={htmlContent.data.headings as Array<any>} />
        </aside>
      </section>
    </section>
  );
}
