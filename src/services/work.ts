import { IWork } from "@interfaces/work";

// Add or edit your projects here. Drop project images in `public/works/`
// and reference them as `/works/<filename>`.
const works: IWork[] = [
  {
    id: "claudeck",
    title: "Claudeck",
    description:
      "A curated deck of tips, workflows, and patterns for getting the most out of Claude Code.",
    image: "/social-banner.png",
    link: "https://hamedafarag.github.io/claudeck/",
  },
  {
    id: "placeholder-project",
    title: "Your Next Project",
    description:
      "Replace this placeholder with one of your projects — set the image, title, description, and external link in src/services/work.ts.",
    image: "/social-banner.png",
    link: "https://github.com/hamed-farag",
  },
];

export function getWorks() {
  return works;
}
