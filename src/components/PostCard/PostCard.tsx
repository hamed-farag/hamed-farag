import Link from "next/link";

import {
  Card,
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
    <Card>
      <CardHeader>
        <Link href={`/posts/${post.id}`}>
          <CardTitle>{post.title}</CardTitle>
        </Link>
        <CardDescription>
          <small>{formatDate(post.date)}</small>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>{post.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <section className="flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/posts?tag=${tag}`}>
              <Badge>#{tag}</Badge>
            </Link>
          ))}
        </section>
      </CardFooter>
    </Card>
  );
}
