import { IWork } from "@interfaces/work";

// Add or edit your projects here. Drop project images in `public/works/`
// and reference them as `/works/<filename>`.
const works: IWork[] = [
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
];

export function getWorks() {
  return works;
}
