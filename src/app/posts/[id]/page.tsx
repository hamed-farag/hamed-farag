import { RedirectType, redirect } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import Link from "next/link";
import type { Metadata } from "next";

import { Separator } from "@components/ui/Separator";
import { TOC } from "@components/TOC";
import { PostMetadata } from "@components/PostMetadata";

import { getPostsById, getPosts, getPostContentById } from "@services/post";

import { formatDate } from "@lib/utils/date";
import { generatePostMetadata } from "@configs/siteMetadata";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostsById(params.id);

  if (!post) return {};

  return generatePostMetadata(post);
}

export async function generateStaticParams() {
  const posts = getPosts();

  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function PostPage({ params }: Props) {
  const post = await getPostContentById(params.id);

  if (!post) redirect("/404", RedirectType.push);

  const { htmlContent, postData, headings } = post;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: postData.data.title,
    description: postData.data.description,
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="text-center">
        <small>{formatDate(postData.data.date)}</small>
        <h1>{postData.data.title}</h1>
        <h3>{postData.data.description}</h3>
      </section>
      <Separator />
      <section className="grid grid-cols-12 lg:gap-10">
        <aside className="hidden lg:block lg:col-span-3">
          <TOC data={headings as Array<any>} />
          <Separator />
          <PostMetadata postMetadata={postData.data} />
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
          <div
            className="mdx"
            dangerouslySetInnerHTML={{ __html: String(htmlContent) }}
          />
        </article>
      </section>
    </section>
  );
}
