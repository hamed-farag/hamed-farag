import Link from "next/link";
import { ArrowRight, PenLine } from "lucide-react";

import { PostCard } from "@components/PostCard";
import { EmptyCard } from "@components/EmptyCard";

import { getPosts } from "@services/post";

import { IPost } from "@interfaces/post";

import { sortPostsByDate } from "@lib/utils/post";

export function LatestPosts() {
  const allPosts = sortPostsByDate(getPosts());

  const renderEmpty = () => (
    <EmptyCard
      title="No posts yet!"
      placeholder="Stay tuned — something is brewing."
      height={350}
    />
  );

  const renderPosts = () => (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {allPosts.slice(0, 4).map((post: IPost, index: number) => {
          return (
            <article
              key={post.id}
              className={`animate-reveal-delay-${index + 1}`}
            >
              <PostCard post={post} />
            </article>
          );
        })}
      </section>
      <Link
        href="/posts"
        className="group flex items-center justify-end gap-2 font-display font-semibold text-primary hover:text-accent transition-colors duration-300"
      >
        All Posts
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
      </Link>
    </>
  );

  return (
    <section className="py-8 animate-reveal-delay-1">
      <h2 className="font-display gradient-text inline-block mb-2">
        Latest Posts <PenLine className="inline-block h-5 w-5 ml-1" />
      </h2>
      {allPosts.length === 0 ? renderEmpty() : renderPosts()}
    </section>
  );
}
