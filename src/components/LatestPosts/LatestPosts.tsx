import Link from "next/link";

import { getPosts } from "@services/post";
import { sortPostsByDate } from "@lib/utils/post";
import { formatDate } from "@lib/utils/date";

export function LatestPosts() {
  const posts = sortPostsByDate(getPosts());
  const ontology = posts.filter((post) => post.tags.includes("ontology"));
  const latest = posts.slice(0, 3);

  return (
    <section className="writing-section" id="writing" aria-labelledby="writing-title">
      <div className="section-split-heading">
        <div>
          <p className="section-kicker"><span>●</span> FIELD NOTES / LATEST WRITING</p>
          <h2 id="writing-title">Thinking<br /><em>out loud.</em></h2>
        </div>
        <p>I write practical guides about frontend architecture, ontology-driven software, AI tools, and the craft of making systems understandable.</p>
      </div>

      {ontology.length > 0 && (
        <Link href="/posts?tag=ontology" className="series-feature">
          <div className="series-graphic" aria-hidden="true">
            <span>7 PART SERIES</span>
            <div><i>OBJECTS</i><b>→</b><i>LINKS</i><b>→</b><i>ACTIONS</i><b>→</b><i>UI</i></div>
          </div>
          <div className="series-copy">
            <span>FEATURED SERIES / {ontology.length} ENTRIES</span>
            <h3>The Ontology, explained like you&apos;re new here.</h3>
            <p>From a list of words to the contract that powers UIs, SDKs, and AI agents—built up one practical layer at a time.</p>
            <b>START WITH PART ONE ↗</b>
          </div>
        </Link>
      )}

      <div className="latest-post-rows">
        {latest.map((post, index) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <span className="entry-number">{String(index + 1).padStart(3, "0")}<small>ENTRY</small></span>
            <time>{formatDate(post.date)}</time>
            <div><h3>{post.title}</h3><p>{post.description}</p><span>{post.tags.map((tag) => <i key={tag}>#{tag}</i>)}</span></div>
            <b>↗</b>
          </Link>
        ))}
      </div>
      <Link href="/posts" className="section-end-link">BROWSE THE ARCHIVE <span>→</span></Link>
    </section>
  );
}
