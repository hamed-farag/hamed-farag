import { RedirectType, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import Link from "next/link";
import type { Metadata } from "next";

import { Separator } from "@components/ui/Separator";
import { TOC } from "@components/TOC";
import { PostMetadata } from "@components/PostMetadata";
import { Comments } from "@components/Comments";

import { IPost } from "@interfaces/post";
import { getPostsById, getPosts, getPostContentById } from "@services/post";

import { formatDate } from "@lib/utils/date";
import {
  siteMetadata,
  generatePostMetadata,
  generatePostJSONLD,
  generateBreadcrumbJSONLD,
} from "@configs/siteMetadata";

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

  return (
    <section className="animate-reveal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePostJSONLD(postData.data as IPost)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbJSONLD([
              { name: "Home", url: siteMetadata.siteUrl },
              { name: "Blog", url: `${siteMetadata.siteUrl}/posts` },
              {
                name: postData.data.title,
                url: `${siteMetadata.siteUrl}/posts/${postData.data.id}`,
              },
            ])
          ),
        }}
      />
      <section className="text-center mb-10">
        <span
          className="text-xs font-display font-bold tracking-wider uppercase block mb-4"
          style={{ color: "var(--color-secondary)" }}
        >
          {formatDate(postData.data.date)}
        </span>
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4">
          {postData.data.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto my-0">
          {postData.data.description}
        </p>
      </section>
      <div className="w-24 h-1 mx-auto rounded-full mb-10" style={{ background: "var(--gradient-primary)" }} />
      <section className="grid grid-cols-12 lg:gap-12">
        <aside className="hidden lg:block lg:col-span-3 animate-reveal-delay-1">
          <div className="sticky top-28 space-y-6">
            <TOC data={headings as Array<any>} />
            <Separator className="opacity-20" />
            <PostMetadata postMetadata={postData.data} />
            <Separator className="opacity-20" />
            <Link
              href="/posts"
              className="group flex items-center gap-2 text-sm font-display font-semibold text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-2" />
              Back to the blog
            </Link>
          </div>
        </aside>
        <article className="col-span-12 lg:col-span-9 animate-reveal-delay-2">
          <div
            className="mdx"
            dangerouslySetInnerHTML={{ __html: String(htmlContent) }}
          />
          <div className="w-16 h-1 rounded-full my-10" style={{ background: "var(--gradient-primary)" }} />
          <Comments />
        </article>
      </section>
    </section>
  );
}
