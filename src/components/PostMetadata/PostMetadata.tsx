import Link from "next/link";

import { Badge } from "@components/ui/Badge";

export function PostMetadata({ postMetadata }: { [key: string]: any }) {
  return (
    <section className="text-sm text-gray-500 dark:text-gray-400">
      <span className="block uppercase mb-5">Tags</span>
      <section className="flex flex-wrap gap-3">
        {postMetadata.tags.map((tag: string) => (
          <Link key={tag} href={`/posts?tag=${tag}`}>
            <Badge>#{tag}</Badge>
          </Link>
        ))}
      </section>
    </section>
  );
}
