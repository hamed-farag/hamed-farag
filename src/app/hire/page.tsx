import { Sparkles } from "lucide-react";
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

const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Frontend Architecture",
  "Micro-frontends",
  "Design Systems",
  "Tailwind CSS",
  "Testing",
  "Performance",
  "CI/CD",
];

export default function HirePage() {
  return (
    <div className="animate-reveal">
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
      <section className="relative mb-12">
        <span className="inline-flex items-center gap-1.5 text-xs font-display font-semibold tracking-wider uppercase px-3 py-1 rounded-full border border-border/60 text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          Available for select work
        </span>
        <h1 className="font-display mt-4 mb-3">
          <span className="gradient-text">Let&apos;s build something</span>
        </h1>
        <p className="text-muted-foreground my-0 max-w-xl leading-relaxed">
          I&apos;m {siteMetadata.author}, a {siteMetadata.jobTitle} who helps
          teams ship fast, maintainable frontends. Pick what you need below,
          tell me about your project, and I&apos;ll get back to you.
        </p>
      </section>

      {/* Skills / tech stack */}
      <section className="mb-12 animate-reveal-delay-1">
        <h2 className="font-display text-lg mb-4">Tech I work with</h2>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="text-xs font-display font-semibold px-3.5 py-1.5 rounded-full border border-border/60 text-muted-foreground transition-all duration-300 hover:scale-105 hover:border-primary hover:text-primary cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Interactive contact form */}
      <section className="animate-reveal-delay-2">
        <div className="card-whimsy border border-border/50 p-6 md:p-8">
          <HireForm email={siteMetadata.email} />
        </div>
      </section>
    </div>
  );
}
