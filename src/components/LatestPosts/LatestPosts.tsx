import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { PostCard } from "@components/PostCard";
import { EmptyCard } from "@components/EmptyCard";

import { getPosts } from "@services/post";

import { IPost } from "@interfaces/post";

import { sortPostsByDate } from "@lib/utils/post";

export function LatestPosts() {
  const allPosts = sortPostsByDate(getPosts());

  const renderEmpty = () => (
    <EmptyCard
      title="No posts added"
      placeholder="Author have not added any posts."
      height={350}
    />
  );

  const renderPosts = () => (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
        {allPosts.slice(0, 4).map((post: IPost) => {
          return (
            <article key={post.id}>
              <PostCard post={post} />
            </article>
          );
        })}
      </section>
      <Link href="/posts" className="group block text-end">
        More Posts{" "}
        <ArrowRightIcon className="inline-block  transition-all group-hover:translate-x-1" />
      </Link>
    </>
  );

  return (
    <section className="mb-5">
      <h1>Latest Posts</h1>
      <h4 className="tracking-tight text-gray-500 dark:text-gray-400">
        A place for my random thoughts and ideas
      </h4>
      {allPosts.length === 0 ? renderEmpty() : renderPosts()}
    </section>
  );
}
