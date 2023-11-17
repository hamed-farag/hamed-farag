import Link from "next/link";

import { EmptyCard } from "@components/EmptyCard";

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/Card";

import { IPost } from "@interfaces/post";

import { calculateTagCount } from "@lib/utils/post";

type TTagFilterProps = {
  posts: Array<IPost>;
};

export function TagFilter({ posts }: TTagFilterProps) {
  const tagCounts = calculateTagCount(posts);

  if (tagCounts.length === 0) {
    return (
      <EmptyCard
        title="No posts added"
        placeholder="Author have not added any posts."
        height={100}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="my-0">
          <Link href="/posts">All Posts</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-none">
          {tagCounts.map((tagCount) => (
            <li key={tagCount.name}>
              <Link
                href={`/posts?tag=${tagCount.name}`}
              >{`${tagCount.name} (${tagCount.count})`}</Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
