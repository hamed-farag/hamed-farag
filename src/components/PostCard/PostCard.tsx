import Image from "next/image";

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

import { cn } from "@lib/utils/tailwindUtils";

type TPostCardProps = {
  post: IPost;
};

export function PostCard({ post }: TPostCardProps) {
  return (
    <Card>
      <CardHeader>
        <Image
          src={post.thumbnailUrl}
          alt={post.title}
          width={250}
          height={330}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            "portrait" === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </CardHeader>
      <CardContent className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.description}</CardDescription>
          <CardDescription>
            <small>{post.date}</small>
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter>
        <section className="flex space-x-4 text-sm text-muted-foreground">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </section>
      </CardFooter>
    </Card>
  );
}
