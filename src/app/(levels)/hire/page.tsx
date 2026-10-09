import type { Metadata } from "next";
import { Zap } from "pixelarticons/react/Zap.js";

import { HireForm } from "@components/HireForm";
import { LevelScene } from "@components/level";
import { Badge, MsgBox, PixelFrame, PixelIcon, Sign } from "@components/pixel";
import { Sprite } from "@components/pixel/Sprite";

import { hireServices } from "@configs/hireServices";
import {
  siteMetadata,
  generateHirePageMetadata,
  generateHireJSONLD,
  generateBreadcrumbJSONLD,
} from "@configs/siteMetadata";

export const metadata: Metadata = generateHirePageMetadata();

const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "AI / LLM Integration",
  "Agentic UI & MCP",
  "Design Systems",
  "Micro-frontends",
  "Frontend Architecture",
  "Tailwind CSS",
  "Node.js",
  "Performance",
  "CI/CD",
];

// World 4: the Item Shop
export default function HirePage() {
  return (
    <>
      <LevelScene id="hire" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateHireJSONLD(hireServices)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbJSONLD([
              { name: "Home", url: siteMetadata.siteUrl },
              { name: "Hire Me", url: `${siteMetadata.siteUrl}/hire` },
            ])
          ),
        }}
      />

      {/* Pitch / intro */}
      <section className="mb-14 mt-12 flex flex-col items-start gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <p className="px-frame px-frame--wood px-hud-text m-0 px-4 py-2.5 text-[10px]">
            Item Shop
          </p>
          <Badge variant="coin">
            <PixelIcon icon={Zap} />
            Available for select work
          </Badge>
        </div>
        <Sign as="h1" className="text-3xl md:text-5xl">
          Let&apos;s build something
        </Sign>
        <PixelFrame className="max-w-3xl p-6 md:p-8">
          <p className="m-0 leading-relaxed">
            I&apos;m {siteMetadata.author}, a Lead AI Frontend Engineer /
            Frontend Architect who helps teams ship fast, maintainable,
            AI-native frontends. With 15 years across frontend and backend, I
            now focus on the AI and agentic transformation of software — from
            LLM integrations and MCP servers to design systems that AI coding
            agents can consume directly. Pick what you need below, tell me about
            your project, and I&apos;ll get back to you.
          </p>
        </PixelFrame>
      </section>

      {/* Skills / tech stack */}
      <section className="mb-14 flex flex-col items-start gap-6" aria-labelledby="hire-skills">
        <Sign id="hire-skills" className="text-xl md:text-2xl">
          Tech I work with
        </Sign>
        <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
          {SKILLS.map((skill) => (
            <li key={skill} className="p-0">
              <Badge>{skill}</Badge>
            </li>
          ))}
        </ul>
      </section>

      {/* Interactive contact form */}
      <section aria-label="Send me a project inquiry">
        <MsgBox>
          <HireForm
            email={siteMetadata.email}
            victory={<Sprite sheet="hero/hero" tag="victory" scale={3} />}
          />
        </MsgBox>
      </section>
    </>
  );
}
