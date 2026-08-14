import Link from "next/link";
import type { Metadata } from "next";

import { getPosts } from "@services/post";
import { sortPostsByDate, filterPosts, calculateTagCount } from "@lib/utils/post";
import { formatDate } from "@lib/utils/date";
import { generatePostsPageMetadata } from "@configs/siteMetadata";
import { IPost, ISearchParams } from "@interfaces/post";

export const metadata: Metadata = generatePostsPageMetadata();

export default function PostsPage({ searchParams }: { searchParams: ISearchParams }) {
  const allPosts = getPosts();
  const sortedPosts = sortPostsByDate(filterPosts(allPosts, searchParams));
  const tagCounts = calculateTagCount(allPosts).sort((a, b) => b.count - a.count);
  const activeTag = searchParams?.tag || null;
  const ontology = sortPostsByDate(allPosts.filter((post) => post.tags.includes("ontology")));

  const postsByYear: Record<string, IPost[]> = {};
  sortedPosts.forEach((post) => {
    const year = new Date(post.date).getFullYear().toString();
    postsByYear[year] ??= [];
    postsByYear[year].push(post);
  });

  return (
    <div className="page-shell archive-page">
      <section className="page-hero archive-hero">
        <div>
          <p className="section-kicker"><span>●</span> NOTES_FROM_THE_FIELD / {allPosts.length} ARTICLES</p>
          <h1>Writing to make<br />the system <em>clearer.</em></h1>
        </div>
        <p>Practical field notes on frontend architecture, AI-native software, ontology-driven interfaces, developer tooling, and the craft of building for the web.</p>
      </section>

      {!activeTag && ontology.length > 0 && (
        <Link href="/posts?tag=ontology" className="archive-series">
          <span>FEATURED / {ontology.length}-PART SERIES</span>
          <div><h2>The Ontology,<br /><em>from words to working UI.</em></h2><p>A beginner-friendly sequence about the contract that can power data, SDKs, actions, agent tools, and adaptive frontends.</p></div>
          <b>BEGIN WITH PART ONE ↗</b>
        </Link>
      )}

      <nav className="tag-filter" aria-label="Filter articles by topic">
        <Link href="/posts" className={!activeTag ? "active" : ""}>ALL <span>{allPosts.length}</span></Link>
        {tagCounts.map(({ name, count }) => <Link href={`/posts?tag=${name}`} className={activeTag === name ? "active" : ""} key={name}>#{name} <span>{count}</span></Link>)}
      </nav>

      {Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a)).map((year) => (
        <section className="archive-year" key={year}>
          <div className="year-marker"><strong>{year}</strong><span>{postsByYear[year].length} ENTRIES</span></div>
          <div className="archive-rows">
            {postsByYear[year].map((post, index) => (
              <Link href={`/posts/${post.id}`} key={post.id}>
                <span className="entry-number">{String(index + 1).padStart(3, "0")}</span>
                <time>{formatDate(post.date)}</time>
                <div><h2>{post.title}</h2><p>{post.description}</p><span>{post.tags.map((tag) => <i key={tag}>#{tag}</i>)}</span></div>
                <b>↗</b>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {sortedPosts.length === 0 && <div className="empty-editorial"><strong>NO MATCHES.</strong><p>Try another topic or return to the complete archive.</p><Link href="/posts">RESET FILTER →</Link></div>}
    </div>
  );
}
