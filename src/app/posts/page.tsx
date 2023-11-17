import { getPosts } from "@services/post";

import { TagFilter } from "@components/TagFilter";
import { PostListItem } from "@components/PostListItem";
import { EmptyCard } from "@components/EmptyCard";

import { Input } from "@components/ui/Input";

import { sortPosts } from "@lib/utils/post";

export default function PostsPage() {
  const allPosts = sortPosts(getPosts());

  const renderEmpty = () => (
    <EmptyCard
      title="No posts added"
      placeholder="Author have not added any posts."
      height={350}
    />
  );

  const renderPosts = () => (
    <>
      <Input type="text" placeholder="Search posts" className="mb-5" />
      <article>
        {allPosts.map((post) => {
          return <PostListItem key={post.id} post={post} />;
        })}
      </article>
    </>
  );

  return (
    <>
      <h1>Posts</h1>
      <section className="grid grid-cols-12 md:gap-10">
        <section className="hidden md:block md:col-span-4 lg:col-span-3">
          <TagFilter posts={allPosts} />
        </section>
        <section className="col-span-12 md:col-span-8 lg:col-span-9">
          {allPosts.length === 0 ? renderEmpty() : renderPosts()}
        </section>
      </section>
    </>
  );
}
