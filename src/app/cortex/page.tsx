import Image from "next/image";
import type { Metadata } from "next";
import {
  Sparkles,
  GitPullRequest,
  BarChart3,
  ListChecks,
  Wand2,
  FlaskConical,
  ShieldCheck,
  MessageSquare,
  KeyRound,
  Terminal,
  ArrowUpRight,
  Check,
  Github,
  Chrome,
} from "lucide-react";

import { Badge } from "@components/ui/Badge";
import { Button } from "@components/ui/Button";
import { WaveDivider } from "@components/WaveDivider";

import {
  generateCortexPageMetadata,
  generateCortexJSONLD,
  generateBreadcrumbJSONLD,
  siteMetadata,
} from "@configs/siteMetadata";

export const metadata: Metadata = generateCortexPageMetadata();

const REPO = "https://github.com/hamedafarag/Cortex";
const STORE =
  "https://chromewebstore.google.com/detail/cortex-%E2%80%94-ai-review-assist/hlfjhmhgkpibcjpflejijbcbpapinifj";

// A small reproduction of the Cortex synapse mark (stroke = currentColor).
function CortexMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="2.3" />
      <circle cx="5" cy="6" r="1.4" />
      <circle cx="19" cy="7" r="1.4" />
      <circle cx="6.5" cy="18.5" r="1.4" />
      <circle cx="18" cy="17" r="1.4" />
      <path d="M12 12 5.9 6.7M12 12l5.4-3.9M12 12l-4.7 5.5M12 12l4.7 4.2" />
    </svg>
  );
}

const FEATURES = [
  {
    icon: Sparkles,
    title: "Highlight & ask",
    body: "Select code in a diff and ask — answers stream in, grounded in the real diff hunk and the PR's stated intent.",
  },
  {
    icon: BarChart3,
    title: "PR overview",
    body: "A deterministic, no-AI change map: churn per file with bars and a by-module rollup, so you see where the weight is.",
  },
  {
    icon: GitPullRequest,
    title: "Whole-PR review",
    body: "A findings list tagged Blocker / Major / Minor / Nit / Praise, with Security, Performance, Error-handling and Readability lenses.",
  },
  {
    icon: Wand2,
    title: "Suggest a fix",
    body: "Generate a committable GitHub suggestion block for the selected lines — the author applies it in one click.",
  },
  {
    icon: FlaskConical,
    title: "Test-gap check",
    body: "A fast, no-AI heuristic that flags changed source files with no matching test change — before you ask for tests.",
  },
  {
    icon: ListChecks,
    title: "Batch review + verdict",
    body: "Accumulate comments into a pending review and submit them together as Comment, Approve, or Request changes.",
  },
  {
    icon: MessageSquare,
    title: "Conventional Comments",
    body: "Prepend semantic labels (suggestion, nit, issue…) with blocking / non-blocking decorations, so intent is unmistakable.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    body: "Keys stay in your browser. Code goes only to Anthropic or your local CLI — and likely secrets are masked first.",
  },
] as const;

const SHOWCASE = [
  {
    img: "/cortex/overview.png",
    w: 936,
    h: 541,
    kicker: "Orient",
    title: "See where the weight is, instantly",
    body: "One click renders a change map — additions, deletions and net per file with a churn bar, plus a by-module rollup. Fully deterministic: no AI call, no tokens.",
  },
  {
    img: "/cortex/review.png",
    w: 936,
    h: 592,
    kicker: "Find problems",
    title: "A reviewer's findings, triaged",
    body: "Whole-PR review streams a findings list, each led by a color-blind-safe severity chip and a path:line, ready to post as a real review comment.",
  },
  {
    img: "/cortex/suggest.png",
    w: 936,
    h: 509,
    kicker: "Apply fixes",
    title: "Feedback that lands as code",
    body: "Ask for a fix and get a committable suggestion block anchored to exactly the lines it replaces — the author applies it from GitHub in one click.",
  },
  {
    img: "/cortex/batch-review.png",
    w: 936,
    h: 682,
    kicker: "Ship the review",
    title: "Build it up, submit once",
    body: "Collect comments into a pending review (kept per PR), then submit them together with a verdict — just like GitHub's own review flow, with a confirm + undo.",
  },
] as const;

export default function CortexPage() {
  return (
    <div className="animate-reveal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateCortexJSONLD()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbJSONLD([
              { name: "Home", url: siteMetadata.siteUrl },
              { name: "Cortex", url: `${siteMetadata.siteUrl}/cortex` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="text-center py-8 md:py-12">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <Badge variant="secondary">Browser extension · MV3</Badge>
          <Badge variant="secondary">GitHub pull requests</Badge>
          <Badge variant="outline">Bring your own key</Badge>
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 flex items-center justify-center gap-3">
          <CortexMark className="h-9 w-9 md:h-11 md:w-11 text-[#6b5cf6]" />
          <span className="gradient-text">Cortex</span>
        </h1>
        <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto font-sans">
          An in-page AI review copilot for GitHub pull requests.
        </p>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-3">
          Highlight code, ask, summarize, review, and post line-anchored comments —
          on your own Claude subscription or API key. No SaaS middleman; your code never
          touches a third-party server.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Button asChild size="lg">
            <a href={STORE} target="_blank" rel="noopener noreferrer">
              <Chrome className="h-4 w-4 mr-2" />
              Get it on the Chrome Web Store
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={REPO} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              View on GitHub
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#features">
              Explore features
              <ArrowUpRight className="h-4 w-4 ml-1.5" />
            </a>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Free · Open source (MIT) · Now on the Chrome Web Store
        </p>

        {/* Hero shot */}
        <div className="card-whimsy mt-12 max-w-3xl mx-auto overflow-hidden border border-border/50 p-2">
          <Image
            src="/cortex/ask.png"
            alt="The Cortex dock on a GitHub PR: a highlighted selection, a streamed answer, comment trays, the Whole-PR toolbar, and a composer."
            width={936}
            height={508}
            priority
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

      <WaveDivider />

      {/* Value strip */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
        {[
          {
            icon: KeyRound,
            title: "Yours, not theirs",
            body: "Runs on the Claude subscription or API key you already pay for — no second subscription, no per-token surprise.",
          },
          {
            icon: ShieldCheck,
            title: "No middleman",
            body: "Code goes only to Anthropic or your local CLI, and to GitHub with your token. Nothing to us. Ever.",
          },
          {
            icon: Check,
            title: "Human-in-the-loop",
            body: "Cortex never reviews or posts on its own. You highlight, you ask, you confirm — every public write is yours.",
          },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="card-whimsy border border-border/50 p-5">
            <Icon className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display text-base mt-0 mb-1.5">{title}</h3>
            <p className="text-sm text-muted-foreground m-0 leading-relaxed">{body}</p>
          </div>
        ))}
      </section>

      {/* Features grid */}
      <section id="features" className="scroll-mt-24 mt-14 mb-6">
        <header className="mb-8 text-center">
          <h2 className="font-display mb-2">
            <span className="gradient-text">Everything a reviewer needs</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto my-0">
            From a quick question to a full, well-labeled review — on demand, never autonomous.
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className={`card-whimsy border border-border/50 p-5 animate-reveal-delay-${(i % 4) + 1}`}
            >
              <div className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10 text-primary mb-3">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base mt-0 mb-1.5">{title}</h3>
              <p className="text-sm text-muted-foreground m-0 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <WaveDivider flip />

      {/* Showcase */}
      <section className="space-y-16 my-6">
        {SHOWCASE.map((s, i) => (
          <div
            key={s.title}
            className={`grid md:grid-cols-2 gap-8 items-center ${
              i % 2 === 1 ? "md:[&>figure]:order-2" : ""
            }`}
          >
            <figure className="card-whimsy m-0 overflow-hidden border border-border/50 p-2">
              <Image
                src={s.img}
                alt={s.title}
                width={s.w}
                height={s.h}
                className="w-full h-auto rounded-lg"
              />
            </figure>
            <div>
              <span className="text-xs font-display font-semibold uppercase tracking-wider text-primary">
                {s.kicker}
              </span>
              <h3 className="font-display text-2xl mt-2 mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed m-0">{s.body}</p>
            </div>
          </div>
        ))}
      </section>

      <WaveDivider />

      {/* Backends */}
      <section className="my-6">
        <header className="mb-8 text-center">
          <h2 className="font-display mb-2">
            <span className="gradient-text">Two backends, your choice</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto my-0">
            One interface, with automatic fallback. Pick whichever you already pay for.
          </p>
        </header>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="card-whimsy border border-border/50 p-6">
            <KeyRound className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display text-lg mt-0 mb-2">Anthropic API</h3>
            <p className="text-sm text-muted-foreground m-0 leading-relaxed">
              Your own API key, billed to your account. The default — paste your key and go,
              nothing else to install. Works straight from the Chrome Web Store.
            </p>
          </div>
          <div className="card-whimsy border border-border/50 p-6">
            <Terminal className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display text-lg mt-0 mb-2">Claude Code CLI</h3>
            <p className="text-sm text-muted-foreground m-0 leading-relaxed">
              Your Claude subscription, via a local native host that shells out to the{" "}
              <code>claude</code> CLI — no API key needed. An opt-in, build-from-source option
              for power users.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="card-whimsy border border-border/50 my-10 p-8 md:p-12 text-center">
        <CortexMark className="h-10 w-10 text-[#6b5cf6] mx-auto mb-4" />
        <h2 className="font-display mt-0 mb-2">Make your reviews sharper</h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-6">
          Cortex is open source and GitHub-only. Install it in one click from the Chrome Web
          Store — or clone it, load it, and bring your own key.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <a href={STORE} target="_blank" rel="noopener noreferrer">
              <Chrome className="h-4 w-4 mr-2" />
              Get it on the Chrome Web Store
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={REPO} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              Get it on GitHub
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={`${REPO}#readme`} target="_blank" rel="noopener noreferrer">
              Read the docs
              <ArrowUpRight className="h-4 w-4 ml-1.5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
