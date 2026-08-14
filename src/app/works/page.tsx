import type { Metadata } from "next";

import { WorkCard } from "@components/WorkCard";
import { getWorks } from "@services/work";
import {
  generateWorksPageMetadata,
  generateWorksJSONLD,
  generateBreadcrumbJSONLD,
  siteMetadata,
} from "@configs/siteMetadata";

export const metadata: Metadata = generateWorksPageMetadata();

const principles = [
  ["01", "Make the invisible visible", "Architecture should be inspectable: clear boundaries, explicit contracts, and evidence for every important decision."],
  ["02", "Prototype the risky part", "I build the smallest real system that answers the hard question—not the biggest demo that avoids it."],
  ["03", "Design for the next builder", "The system should help the next developer—or agent—make a correct move without reading your mind."],
];

export default function WorksPage() {
  const works = getWorks();

  return (
    <div className="page-shell works-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWorksJSONLD(works)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateBreadcrumbJSONLD([
          { name: "Home", url: siteMetadata.siteUrl },
          { name: "My Works", url: `${siteMetadata.siteUrl}/works` },
        ])),
      }} />

      <section className="page-hero">
        <div>
          <p className="section-kicker"><span>●</span> WORK_INDEX.DAT / {String(works.length).padStart(2, "0")} PROJECTS</p>
          <h1>Products, systems,<br />and useful <em>experiments.</em></h1>
        </div>
        <p>Selected work across AI review, agent orchestration, developer experience, frontend architecture, and tools that make good engineering easier to repeat.</p>
      </section>

      <section className="works-editorial-grid" aria-label="Selected projects">
        {works.map((work, index) => <WorkCard work={work} index={index + 1} key={work.id} />)}
      </section>

      <section className="work-principles" aria-labelledby="principles-title">
        <div><p className="section-kicker"><span>●</span> THE OPERATING PRINCIPLES</p><h2 id="principles-title">How the work<br /><em>gets made.</em></h2></div>
        <div>{principles.map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
      </section>
    </div>
  );
}
