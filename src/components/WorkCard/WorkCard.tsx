import Image from "next/image";
import Link from "next/link";

import { IWork } from "@interfaces/work";

type TWorkCardProps = {
  work: IWork;
  index?: number;
};

const projectDetails: Record<string, { meta: string; note: string }> = {
  cortex: { meta: "BROWSER EXTENSION · AI", note: "Manifest V3 · BYO Claude" },
  claudeck: { meta: "DEVELOPER TOOLING · OSS", note: "Vanilla JS · Zero framework" },
  bragbit: { meta: "PRODUCTIVITY · MCP", note: "Next.js · Postgres · Drizzle" },
  afkgnt: { meta: "AUTONOMOUS AGENTS", note: "Guardrails · Review · Draft PR" },
  "hamedfarag-dev": { meta: "WRITING · PORTFOLIO", note: "Next.js · MDX · Design system" },
};

export function WorkCard({ work, index }: TWorkCardProps) {
  const isInternal = work.link.startsWith("/");
  const details = projectDetails[work.id] ?? { meta: "PRODUCT WORK", note: "DESIGN · ENGINEERING" };
  const number = String(index ?? 1).padStart(2, "0");

  const content = (
    <>
      <div className="work-shot">
        <div className="shot-titlebar"><span>{work.id.toUpperCase()}.APP</span><b>— □ ×</b></div>
        <Image
          src={work.image}
          alt={`${work.title} product screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <span className="work-number">{number}</span>
      </div>
      <div className="work-card-copy">
        <div className="work-card-meta"><span>{details.meta}</span><b>{details.note}</b></div>
        <h3>{work.title}</h3>
        <p>{work.description}</p>
        <span className="work-visit">OPEN CASE / PRODUCT <b>↗</b></span>
      </div>
    </>
  );

  return isInternal ? (
    <Link href={work.link} className="editorial-work-card">{content}</Link>
  ) : (
    <a href={work.link} target="_blank" rel="noopener noreferrer" className="editorial-work-card">{content}</a>
  );
}
