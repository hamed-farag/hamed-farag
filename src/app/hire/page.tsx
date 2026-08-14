import type { Metadata } from "next";

import { HireForm } from "@components/HireForm";
import { hireServices } from "@configs/hireServices";
import {
  siteMetadata,
  generateHirePageMetadata,
  generateHireJSONLD,
  generateBreadcrumbJSONLD,
} from "@configs/siteMetadata";

export const metadata: Metadata = generateHirePageMetadata();

const skills = ["React", "Next.js", "TypeScript", "LLM integration", "Agentic UI + MCP", "Design systems", "Micro-frontends", "Frontend architecture", "Performance", "Technical direction"];

export default function HirePage() {
  return (
    <div className="hire-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateHireJSONLD(hireServices)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateBreadcrumbJSONLD([
          { name: "Home", url: siteMetadata.siteUrl },
          { name: "Hire Me", url: `${siteMetadata.siteUrl}/hire` },
        ])),
      }} />

      <section className="hire-hero">
        <div>
          <p className="availability"><span /> AVAILABLE FOR SELECT WORK</p>
          <h1>Bring the hard<br />frontend <em>problem.</em></h1>
        </div>
        <div>
          <p>I help teams shape and ship AI-native products, architecture, and developer systems that need to be fast now—and understandable later.</p>
          <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email.toUpperCase()} ↗</a>
        </div>
      </section>

      <div className="skills-tape" aria-label="Technical capabilities">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>

      <section className="hire-form-section" id="contact">
        <div className="hire-form-intro">
          <p className="section-kicker"><span>●</span> PROJECT_INTAKE.FRM</p>
          <h2>Give me the<br /><em>rough version.</em></h2>
          <p>The ambitious brief, the messy architecture diagram, or the half-formed idea is enough. Pick the areas that matter and tell me where you&apos;re trying to go.</p>
          <dl><div><dt>01</dt><dd>YOU SEND THE CONTEXT</dd></div><div><dt>02</dt><dd>I REPLY WITH QUESTIONS</dd></div><div><dt>03</dt><dd>WE SHAPE THE RIGHT ENGAGEMENT</dd></div></dl>
        </div>
        <div className="hire-form-window">
          <div className="window-bar"><div aria-hidden="true"><span /><span /><span /></div><strong>NEW_PROJECT.MESSAGE</strong><b>×</b></div>
          <HireForm email={siteMetadata.email} />
        </div>
      </section>
    </div>
  );
}
