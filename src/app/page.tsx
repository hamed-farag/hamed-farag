import { Sparkles } from "lucide-react";

import { AboutCard } from "@components/AboutCard";
import { LatestPosts } from "@components/LatestPosts";
import { WaveDivider } from "@components/WaveDivider";

import { generateWebsiteJSONLD } from "@configs/siteMetadata";

export default function HomePage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebsiteJSONLD()),
        }}
      />
      <section className="text-center py-8 md:py-12 animate-reveal">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Hey! I&apos;m{" "}
          <span className="gradient-text">Hamed</span>
          {" "}<Sparkles className="inline-block h-8 w-8 text-accent" />
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto font-sans">
          A place for my random thoughts, ideas, and things I&apos;ve learned
          along the way.
        </p>
      </section>
      <WaveDivider />
      <LatestPosts />
      <WaveDivider flip />
      <AboutCard />
    </div>
  );
}
