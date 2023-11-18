import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import Link from "next/link";
import getConfig from "next/config";
import type { Metadata } from "next";

import { Separator } from "@components/ui/Separator";
import { TOC } from "@components/TOC";
import { PostMetadata } from "@components/PostMetadata";

import { getPostsById, getPosts } from "@services/post";
import { headingTree } from "@lib/plugins/remark-headingTree";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostsById(params.id);

  return {
    title: post?.title,
  };
}

export async function generateStaticParams() {
  const posts = getPosts();

  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function PostPage({ params }: Props) {
  const { serverRuntimeConfig } = getConfig();

  const postFilePath = path.join(
    serverRuntimeConfig.POSTS_ROOT,
    `${params.id}.mdx`
  );

  const postContent = fs.readFileSync(postFilePath, "utf-8");
  const postResult = matter(postContent);

  const htmlContent = await remark()
    .use(headingTree)
    .use(remarkHtml)
    .process(postResult.content);

  return (
    <section>
      <section className="text-center">
        <small>{postResult.data.date}</small>
        <h1>{postResult.data.title}</h1>
        <h3>{postResult.data.description}</h3>
      </section>
      <Separator />
      <section className="grid grid-cols-12 lg:gap-10">
        <aside className="hidden lg:block lg:col-span-3">
          <TOC data={htmlContent.data.headings as Array<any>} />
          <Separator />
          <PostMetadata postMetadata={postResult.data} />
          <Separator />
          <Link
            href="/posts"
            className="group block text-gray-500 dark:text-gray-400"
          >
            <ArrowLeftIcon className="inline-block  transition-all group-hover:-translate-x-1" />{" "}
            Back to the blog
          </Link>
        </aside>
        <article className="col-span-12 lg:col-span-9">
          <div dangerouslySetInnerHTML={{ __html: String(htmlContent) }} />
        </article>
      </section>
    </section>
  );
}
