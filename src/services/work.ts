import { IWork } from "@interfaces/work";

// Add or edit your projects here. Drop project images in `public/works/`
// and reference them as `/works/<filename>`.
const works: IWork[] = [
  {
    id: "cortex",
    title: "Cortex — AI Review Assistant",
    description:
      "An in-page AI review copilot for GitHub pull requests — highlight code, ask, summarize, review, and post line-anchored comments, on your own Claude subscription or API key. A Manifest V3 browser extension; no SaaS middleman.",
    image: "/works/cortex.png",
    link: "/cortex",
  },
  {
    id: "claudeck",
    title: "Claudeck",
    description:
      "The browser UI for Claude Code — chat, autonomous agents, workflows, and cost tracking, all from your browser. Built on vanilla JS with zero framework and no build step.",
    image: "/works/claudeck.png",
    link: "https://claudeck.app",
  },
  {
    id: "hamedfarag-dev",
    title: "hamedfarag.dev",
    description:
      "My personal space and technical blog — articles on frontend engineering, React, architecture, and the craft of building for the web. Built with Next.js, Tailwind CSS, Shadcn/UI, and MDX.",
    image: "/works/hamedfarag-dev.png",
    link: "https://www.hamedfarag.dev",
  },
  {
    id: "bragbit",
    title: "BragBit — Brag-Document Tracker",
    description:
      "An open-source, self-hostable brag-document tracker for developers — log wins in 30 seconds, import your merged PRs and Linear issues, and share a read-only timeline before review season. Built with Next.js, Postgres, and Drizzle, with capture straight from your AI assistant over MCP.",
    image: "/works/bragbit.png",
    link: "https://bragbit.backtick.site",
  },
];

export function getWorks() {
  return works;
}
