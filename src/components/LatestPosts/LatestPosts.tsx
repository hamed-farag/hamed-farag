import { PostCard } from "@components/PostCard";

import { getPosts } from "@services/post";

import { IPost } from "@interfaces/post";

export function LatestPosts() {
  // get top 4 posts
  const topFourPosts = getPosts().slice(0, 4);

  if (topFourPosts.length === 0) return <span>Empty</span>;

  return (
    <div>
      {topFourPosts.map((post: IPost) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
}
