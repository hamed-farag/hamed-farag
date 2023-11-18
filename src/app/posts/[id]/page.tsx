import { ArrowLeftIcon } from "@radix-ui/react-icons";

import Link from "next/link";
import type { Metadata } from "next";

import { Separator } from "@components/ui/Separator";
import { TOC } from "@components/TOC";
import { PostMetadata } from "@components/PostMetadata";
import { NotAvailableCard } from "@components/NotAvailableCard";

import { getPostsById, getPosts, getPostContentById } from "@services/post";

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
  const post = await getPostContentById(params.id);

  if (!post)
    return (
      <section>
        <NotAvailableCard
          title="Post not available"
          placeholder="For some reason, the post is not available"
        />
      </section>
    );

  const { htmlContent, postData } = post;

  return (
    <section>
      <section className="text-center">
        <small>{postData.data.date}</small>
        <h1>{postData.data.title}</h1>
        <h3>{postData.data.description}</h3>
      </section>
      <Separator />
      <section className="grid grid-cols-12 lg:gap-10">
        <aside className="hidden lg:block lg:col-span-3">
          <TOC data={htmlContent.data.headings as Array<any>} />
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
          <div dangerouslySetInnerHTML={{ __html: String(htmlContent) }} />
        </article>
      </section>
    </section>
  );
}
