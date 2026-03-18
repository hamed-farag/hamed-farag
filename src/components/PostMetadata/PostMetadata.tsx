import Link from "next/link";

import { Badge } from "@components/ui/Badge";

export function PostMetadata({ postMetadata }: { [key: string]: any }) {
  return (
    <section>
      <span className="block text-xs font-display font-bold tracking-wider uppercase mb-4 gradient-text">
        Tags
      </span>
      <section className="flex flex-wrap gap-2">
        {postMetadata.tags.map((tag: string) => (
          <Link key={tag} href={`/posts?tag=${tag}`}>
            <Badge variant="secondary" className="text-xs rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md">
              #{tag}
            </Badge>
          </Link>
        ))}
      </section>
    </section>
  );
}
