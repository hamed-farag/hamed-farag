import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { ArchitectureLab } from "@components/ArchitectureLab";
import { LatestPosts } from "@components/LatestPosts";
import { WorkCard } from "@components/WorkCard";

import { getWorks } from "@services/work";
import {
  generateWebsiteJSONLD,
  generateHomePageMetadata,
} from "@configs/siteMetadata";

export const metadata: Metadata = generateHomePageMetadata();

const capabilities = [
  ["01", "AI-native frontends", "LLM features, agentic interfaces, and product experiences that feel native—not bolted on."],
  ["02", "Frontend architecture", "Design systems, micro-frontends, and foundations that help ambitious teams move without breaking things."],
  ["03", "MCP + agent tooling", "Interfaces and servers that let coding agents understand your system, its rules, and your intent."],
  ["04", "Technical direction", "Architecture reviews, prototypes, and a clear path from interesting idea to production practice."],
];

export default function HomePage() {
  const works = getWorks().filter((work) => work.id !== "hamedfarag-dev").slice(0, 4);

  return (
    <div className="home-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteJSONLD()) }}
      />

      <section className="portfolio-hero" aria-labelledby="hero-title">
        <div className="hero-copy-panel">
          <p className="availability"><span /> AVAILABLE FOR SELECT WORK · RIYADH / REMOTE</p>
          <h1 id="hero-title">I design the <em>systems</em> behind AI-native software.</h1>
          <div className="hero-proof">
            <p>
              Lead AI Frontend Engineer and Frontend Architect—building MCP-enabled design systems,
              ontology-driven interfaces, and autonomous developer tools.
            </p>
            <div>
              <Link href="#work" className="button-brutal primary">SEE THE WORK <span>↓</span></Link>
              <Link href="/hire" className="button-brutal">START A PROJECT <span>↗</span></Link>
            </div>
          </div>
        </div>

        <aside className="profile-window" aria-label="Hamed Farag profile">
          <div className="window-bar">
            <div aria-hidden="true"><span /><span /><span /></div>
            <strong>HAMED_PROFILE.JPG</strong>
            <b>×</b>
          </div>
          <div className="profile-image">
            <Image src="/hf-avatar.jpg" alt="Hamed Farag" fill priority sizes="(max-width: 960px) 100vw, 42vw" />
            <div className="image-halftone" />
            <span className="profile-role">FRONTEND<br />ARCHITECT<br />+ AI BUILDER</span>
            <span className="profile-since">BUILDING<br />SINCE 2010</span>
          </div>
          <div className="window-status"><span>HF / FULL COLOR</span><span>15+ YEARS ONLINE</span></div>
        </aside>
      </section>

      <div className="tech-ticker" aria-label="Core capabilities">
        <div><span>REACT ✦ NEXT.JS ✦ MCP ✦ AGENTIC UI ✦ DESIGN SYSTEMS ✦ MICRO-FRONTENDS ✦ </span><span aria-hidden="true">REACT ✦ NEXT.JS ✦ MCP ✦ AGENTIC UI ✦ DESIGN SYSTEMS ✦ MICRO-FRONTENDS ✦ </span></div>
      </div>

      <section className="positioning-section" id="about">
        <p className="section-kicker"><span>●</span> README.TXT</p>
        <div>
          <h2>I build software for the moment when a prototype needs to become a <em>system.</em></h2>
          <div className="positioning-bottom">
            <p>
              For 15 years I&apos;ve worked across the stack—from .NET to design systems,
              micro-frontends, and today&apos;s AI-native product architectures. At WakeCap,
              I lead frontend technology and turn emerging capabilities into engineering practice.
            </p>
            <dl>
              <div><dt>15+</dt><dd>YEARS BUILDING</dd></div>
              <div><dt>10</dt><dd>YEARS IN FRONTEND</dd></div>
              <div><dt>03</dt><dd>CITIES CALLED HOME</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="selected-work" id="work" aria-labelledby="work-title">
        <div className="section-split-heading inverse">
          <div>
            <p className="section-kicker"><span>●</span> SELECTED WORK / 2026</p>
            <h2 id="work-title">Tools for people<br />who <em>make things.</em></h2>
          </div>
          <p>A collection of products where agents, interfaces, architecture, and developer experience meet.</p>
        </div>
        <div className="home-work-grid">
          {works.map((work, index) => <WorkCard work={work} key={work.id} index={index + 1} />)}
        </div>
        <Link href="/works" className="section-end-link inverse-link">EXPLORE ALL WORK <span>→</span></Link>
      </section>

      <ArchitectureLab />

      <LatestPosts />

      <section className="capabilities-section" aria-labelledby="capabilities-title">
        <div className="capabilities-lead">
          <p className="section-kicker"><span>●</span> HOW I CAN HELP</p>
          <h2 id="capabilities-title">Complexity in.<br /><em>Clarity out.</em></h2>
          <pre>IF (PROBLEM.IS_INTERESTING) &#123;{"\n"}  HAMED.BUILD();{"\n"}&#125;</pre>
        </div>
        <div className="capabilities-list">
          {capabilities.map(([number, title, copy]) => (
            <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>
          ))}
        </div>
      </section>

      <section className="visitor-paths" aria-labelledby="path-title">
        <div>
          <p className="section-kicker"><span>●</span> CHOOSE YOUR PATH</p>
          <h2 id="path-title">What brought you here?</h2>
        </div>
        <div className="path-grid">
          <Link href="/hire#contact"><span>01</span><strong>I&apos;m hiring a frontend architect</strong><p>Architecture, design systems, technical direction, and team enablement.</p><b>LET&apos;S TALK ↗</b></Link>
          <Link href="/hire#contact"><span>02</span><strong>I need help shaping an AI product</strong><p>Agentic UX, LLM integration, MCP, prototyping, and production strategy.</p><b>START HERE ↗</b></Link>
          <Link href="/works"><span>03</span><strong>I want to explore the open-source work</strong><p>Cortex, Claudeck, AFKGNT, BragBit, and the thinking behind them.</p><b>OPEN THE LAB ↗</b></Link>
        </div>
      </section>

      <section className="home-contact">
        <div>
          <p className="section-kicker light"><span>●</span> OPEN CHANNEL</p>
          <h2>Let&apos;s make<br />the <em>next thing.</em></h2>
        </div>
        <div>
          <p>Have an ambitious interface, an AI product that needs a shape, or a frontend system that needs a plan? Tell me where you&apos;re headed.</p>
          <Link href="/hire" className="button-brutal yellow">BUILD SOMETHING TOGETHER <span>↗</span></Link>
          <a href="mailto:hamed.farag.2009@gmail.com">HAMED.FARAG.2009@GMAIL.COM ↗</a>
        </div>
      </section>
    </div>
  );
}
