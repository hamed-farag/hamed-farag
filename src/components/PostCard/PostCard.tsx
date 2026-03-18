import Link from "next/link";

import {
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/Card";
import { Badge } from "@components/ui/Badge";

import { IPost } from "@interfaces/post";

import { formatDate } from "@lib/utils/date";

type TPostCardProps = {
  post: IPost;
};

export function PostCard({ post }: TPostCardProps) {
  return (
    <div className="card-whimsy h-full flex flex-col border border-border/50">
      <CardHeader className="flex-none">
        <CardDescription className="text-xs font-display font-semibold tracking-wider uppercase" style={{ color: "var(--color-secondary)" }}>
          {formatDate(post.date)}
        </CardDescription>
        <Link href={`/posts/${post.id}`}>
          <CardTitle className="my-0 font-display text-lg transition-colors duration-300 hover:text-primary">
            {post.title}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="m-0 line-clamp-3 leading-relaxed">
          {post.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <section className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/posts?tag=${tag}`}>
              <Badge variant="secondary" className="text-xs rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md">
                #{tag}
              </Badge>
            </Link>
          ))}
        </section>
      </CardFooter>
    </div>
  );
}
