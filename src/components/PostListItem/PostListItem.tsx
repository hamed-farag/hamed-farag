import Link from "next/link";

import { IPost } from "@interfaces/post";

import { formatDate } from "@lib/utils/date";
import { Badge } from "@components/ui/Badge";

export function PostListItem({ post }: { post: IPost }) {
  return (
    <article className="mb-8 last:mb-0">
      <small className="block">{formatDate(post.date)}</small>
      <Link href={`/posts/${post.id}`}>
        <h2 className="mt-0">{post.title}</h2>
      </Link>
      <section className="flex flex-wrap gap-3">
        {post.tags.map((tag) => (
          <Link key={tag} href={`/posts?tag=${tag}`}>
            <Badge>#{tag}</Badge>
          </Link>
        ))}
      </section>
      <p className="text-gray-500 dark:text-gray-400">{post.description}</p>
    </article>
  );
}
