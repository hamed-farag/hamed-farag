import { Layers } from "lucide-react";
import type { Metadata } from "next";

import { EmptyCard } from "@components/EmptyCard";
import { WorkCard } from "@components/WorkCard";

import { getWorks } from "@services/work";
import {
  generateWorksPageMetadata,
  generateWorksJSONLD,
  generateBreadcrumbJSONLD,
  siteMetadata,
} from "@configs/siteMetadata";

import { IWork } from "@interfaces/work";

export const metadata: Metadata = generateWorksPageMetadata();

export default function WorksPage() {
  const works = getWorks();

  return (
    <div className="animate-reveal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWorksJSONLD(works)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbJSONLD([
              { name: "Home", url: siteMetadata.siteUrl },
              { name: "My Works", url: `${siteMetadata.siteUrl}/works` },
            ])
          ),
        }}
      />
      {/* Hero */}
      <section className="relative mb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="font-display mb-2">
              <span className="gradient-text">My Works</span>
            </h1>
            <p className="text-muted-foreground my-0 max-w-lg">
              A selection of projects, experiments, and things I&apos;ve built.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Layers className="w-4 h-4" />
            <span className="font-display font-semibold">{works.length}</span>
            <span>{works.length === 1 ? "project" : "projects"}</span>
          </div>
        </div>
      </section>

      {/* Works grid */}
      {works.length === 0 ? (
        <EmptyCard
          title="No works yet!"
          placeholder="Projects are on the way — check back soon."
          height={350}
        />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-reveal-delay-1">
          {works.map((work: IWork, index: number) => (
            <article
              key={work.id}
              className={`animate-reveal-delay-${(index % 4) + 1}`}
            >
              <WorkCard work={work} />
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
