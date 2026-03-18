import Link from "next/link";
import { ArrowRight, Calendar, Hash, Layers } from "lucide-react";

import { EmptyCard } from "@components/EmptyCard";
import { Badge } from "@components/ui/Badge";

import { getPosts } from "@services/post";
import { sortPostsByDate, filterPosts, calculateTagCount } from "@lib/utils/post";
import { formatDate } from "@lib/utils/date";

import { IPost, ISearchParams } from "@interfaces/post";

export default function PostsPage({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const allPosts = getPosts();
  const filteredPosts = filterPosts(allPosts, searchParams);
  const sortedPosts = sortPostsByDate(filteredPosts);
  const tagCounts = calculateTagCount(allPosts);
  const activeTag = searchParams?.tag || null;
  const totalPosts = allPosts.length;

  // Group posts by year
  const postsByYear: Record<string, IPost[]> = {};
  sortedPosts.forEach((post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!postsByYear[year]) postsByYear[year] = [];
    postsByYear[year].push(post);
  });
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="animate-reveal">
      {/* Hero */}
      <section className="relative mb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display mb-2">
              <span className="gradient-text">Writing</span>
            </h1>
            <p className="text-muted-foreground my-0 max-w-lg">
              {totalPosts} articles on frontend engineering, tooling, and the
              craft of building for the web.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Layers className="w-4 h-4" />
            <span className="font-display font-semibold">{sortedPosts.length}</span>
            <span>{activeTag ? `in "${activeTag}"` : "total"}</span>
          </div>
        </div>

        {/* Tag bar */}
        <div className="flex flex-wrap gap-2 animate-reveal-delay-1">
          <Link href="/posts">
            <Badge
              variant={!activeTag ? "default" : "secondary"}
              className={`rounded-full text-xs font-display font-semibold px-3.5 py-1.5 transition-all duration-300 hover:scale-105 ${
                !activeTag ? "shadow-md" : ""
              }`}
            >
              All
            </Badge>
          </Link>
          {tagCounts
            .sort((a, b) => b.count - a.count)
            .map(({ name, count }) => (
              <Link key={name} href={`/posts?tag=${name}`}>
                <Badge
                  variant={activeTag === name ? "default" : "secondary"}
                  className={`rounded-full text-xs font-display font-semibold px-3.5 py-1.5 transition-all duration-300 hover:scale-105 ${
                    activeTag === name ? "shadow-md" : ""
                  }`}
                >
                  <Hash className="w-3 h-3 mr-0.5" />
                  {name}
                  <span className="ml-1.5 opacity-60">{count}</span>
                </Badge>
              </Link>
            ))}
        </div>
      </section>

      {/* Posts timeline */}
      {sortedPosts.length === 0 ? (
        <EmptyCard
          title="No posts found"
          placeholder="Try a different tag or check back later."
          height={350}
        />
      ) : (
        <section className="animate-reveal-delay-2">
          {years.map((year) => (
            <div key={year} className="relative mb-12 last:mb-0">
              {/* Year marker */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-display font-bold text-3xl gradient-text">
                  {year}
                </span>
                <div className="flex-1 h-px" style={{ background: "var(--gradient-primary)", opacity: 0.15 }} />
                <span className="text-xs font-display font-semibold text-muted-foreground px-2.5 py-1 rounded-full border border-border/60">
                  {postsByYear[year].length} {postsByYear[year].length === 1 ? "post" : "posts"}
                </span>
              </div>

              {/* Posts in this year */}
              <div className="relative ml-4 md:ml-6 border-l-2 border-border/40 pl-6 md:pl-8 space-y-0">
                {postsByYear[year].map((post, index) => (
                  <article
                    key={post.id}
                    className="group relative pb-8 last:pb-0"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-[33px] md:-left-[37px] top-1 w-3 h-3 rounded-full border-2 transition-colors duration-300 group-hover:scale-125"
                      style={{
                        borderColor: "var(--color-primary)",
                        background: index === 0 ? "var(--color-primary)" : "hsl(var(--background))",
                      }}
                    />

                    {/* Card */}
                    <Link href={`/posts/${post.id}`} className="block">
                      <div className="p-5 md:p-6 rounded-2xl border border-transparent transition-all duration-300 group-hover:border-border/50 group-hover:bg-card group-hover:shadow-lg">
                        {/* Date */}
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                          <time className="text-xs font-display font-semibold tracking-wider uppercase" style={{ color: "var(--color-secondary)" }}>
                            {formatDate(post.date)}
                          </time>
                        </div>

                        {/* Title */}
                        <h2 className="font-display text-xl md:text-2xl mt-0 mb-2 transition-colors duration-300 group-hover:text-primary">
                          {post.title}
                        </h2>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm leading-relaxed m-0 mb-3">
                          {post.description}
                        </p>

                        {/* Tags + Read more */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex flex-wrap gap-1.5">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] font-display font-semibold text-muted-foreground px-2 py-0.5 rounded-full border border-border/50"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="flex items-center gap-1 text-xs font-display font-semibold text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 shrink-0">
                            Read
                            <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
