import { IPost } from "@/interfaces/post";
import type { Metadata } from "next";

const siteMetadata = {
  title: "Hamed Farag's Space",
  author: "Hamed Farag",
  authorAvatar: "/hf-avatar.jpg",
  jobTitle: "Lead Frontend Engineer",
  headerTitle: "HF",
  description:
    "Personal technical blog by Hamed Farag — articles on frontend engineering, React, architecture, and building for the web.",
  language: "en-us",
  siteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL || "",
  siteLogo: "/hg_logo.png",
  socialBanner: "/social-banner.png",
  siteRepo: "https://github.com/hamed-farag/hamed-farag",
  email: "hamed.farag.2009@gmail.com",
  github: "https://github.com/hamed-farag",
  twitter: "https://twitter.com/hamedmfarag",
  twitterHandle: "@hamedmfarag",
  linkedin: "https://www.linkedin.com/in/hamedmfarag/",
  locale: "en_US",
};

function generateSiteMetadata(): Metadata {
  return {
    metadataBase: siteMetadata.siteUrl
      ? new URL(siteMetadata.siteUrl)
      : undefined,
    title: {
      template: `%s | ${siteMetadata.title}`,
      default: siteMetadata.title,
    },
    icons: {
      icon: "/hf-logo.svg",
      shortcut: "/hf-logo.svg",
      apple: "/hf_logo.png",
    },
    description: siteMetadata.description,
    keywords: [
      "frontend engineering",
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "web development",
      "Hamed Farag",
    ],
    authors: [{ name: siteMetadata.author, url: siteMetadata.siteUrl }],
    creator: siteMetadata.author,
    publisher: siteMetadata.author,
    alternates: {
      canonical: siteMetadata.siteUrl,
    },
    openGraph: {
      title: siteMetadata.title,
      description: siteMetadata.description,
      url: siteMetadata.siteUrl,
      siteName: siteMetadata.title,
      images: [
        {
          url: siteMetadata.socialBanner,
          width: 1200,
          height: 630,
          alt: siteMetadata.title,
        },
      ],
      locale: siteMetadata.locale,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: siteMetadata.title,
      description: siteMetadata.description,
      site: siteMetadata.twitterHandle,
      creator: siteMetadata.twitterHandle,
      images: [siteMetadata.socialBanner],
    },
  };
}

function generateHomePageMetadata(): Metadata {
  const title = `${siteMetadata.author} — ${siteMetadata.jobTitle}`;
  const description =
    "Hamed Farag, a Lead Frontend Engineer writing about React, Next.js, frontend architecture, and the craft of building for the web.";
  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: siteMetadata.siteUrl,
    },
    openGraph: {
      title,
      description,
      url: siteMetadata.siteUrl,
      siteName: siteMetadata.title,
      locale: siteMetadata.locale,
      type: "website",
      images: [
        {
          url: siteMetadata.socialBanner,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteMetadata.twitterHandle,
      creator: siteMetadata.twitterHandle,
      images: [siteMetadata.socialBanner],
    },
  };
}

function generatePostsPageMetadata(): Metadata {
  const description =
    "Articles on frontend engineering, tooling, architecture, and the craft of building for the web.";
  const url = `${siteMetadata.siteUrl}/posts`;
  return {
    title: "Blog",
    description,
    keywords: [
      "frontend engineering",
      "React",
      "Next.js",
      "TypeScript",
      "web development",
      "software architecture",
      siteMetadata.author,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "Blog | " + siteMetadata.title,
      description,
      url,
      siteName: siteMetadata.title,
      locale: siteMetadata.locale,
      type: "website",
      images: [
        {
          url: siteMetadata.socialBanner,
          width: 1200,
          height: 630,
          alt: "Blog | " + siteMetadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | " + siteMetadata.title,
      description,
      site: siteMetadata.twitterHandle,
      creator: siteMetadata.twitterHandle,
      images: [siteMetadata.socialBanner],
    },
  };
}

function generateWorksPageMetadata(): Metadata {
  const description =
    "A selection of projects, experiments, and things I've built.";
  const url = `${siteMetadata.siteUrl}/works`;
  return {
    title: "My Works",
    description,
    keywords: [
      "portfolio",
      "projects",
      "frontend engineering",
      "React",
      "Next.js",
      siteMetadata.author,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "My Works | " + siteMetadata.title,
      description,
      url,
      siteName: siteMetadata.title,
      locale: siteMetadata.locale,
      type: "website",
      images: [
        {
          url: siteMetadata.socialBanner,
          width: 1200,
          height: 630,
          alt: "My Works | " + siteMetadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "My Works | " + siteMetadata.title,
      description,
      site: siteMetadata.twitterHandle,
      creator: siteMetadata.twitterHandle,
      images: [siteMetadata.socialBanner],
    },
  };
}

function generateHirePageMetadata(): Metadata {
  const description =
    "Work with Hamed Farag — frontend architecture, React/Next.js development, performance, and technical consulting.";
  const url = `${siteMetadata.siteUrl}/hire`;
  return {
    title: "Hire Me",
    description,
    keywords: [
      "hire frontend engineer",
      "frontend consultant",
      "React developer",
      "Next.js developer",
      "frontend architecture",
      "technical consulting",
      siteMetadata.author,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "Hire Me | " + siteMetadata.title,
      description,
      url,
      siteName: siteMetadata.title,
      locale: siteMetadata.locale,
      type: "website",
      images: [
        {
          url: siteMetadata.socialBanner,
          width: 1200,
          height: 630,
          alt: "Hire Me | " + siteMetadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Hire Me | " + siteMetadata.title,
      description,
      site: siteMetadata.twitterHandle,
      creator: siteMetadata.twitterHandle,
      images: [siteMetadata.socialBanner],
    },
  };
}

function generateCortexPageMetadata(): Metadata {
  const title = "Cortex — AI Review Assistant";
  const description =
    "An in-page AI review copilot for GitHub pull requests — highlight code, ask, summarize, review, and post line-anchored comments on your own Claude subscription or API key. No SaaS middleman.";
  const url = `${siteMetadata.siteUrl}/cortex`;
  return {
    title,
    description,
    keywords: [
      "Cortex",
      "code review",
      "GitHub pull requests",
      "AI code review",
      "browser extension",
      "Claude",
      "Anthropic",
      siteMetadata.author,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title + " | " + siteMetadata.title,
      description,
      url,
      siteName: siteMetadata.title,
      locale: siteMetadata.locale,
      type: "website",
      images: [
        {
          url: siteMetadata.socialBanner,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title + " | " + siteMetadata.title,
      description,
      site: siteMetadata.twitterHandle,
      creator: siteMetadata.twitterHandle,
      images: [siteMetadata.socialBanner],
    },
  };
}

function generateCortexJSONLD() {
  const url = `${siteMetadata.siteUrl}/cortex`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Cortex — AI Review Assistant",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Chromium-based browsers (Chrome, Edge, Brave)",
    description:
      "An in-page AI review copilot for GitHub pull requests, running on the user's own Claude subscription or Anthropic API key.",
    url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: siteMetadata.author,
      url: siteMetadata.siteUrl,
      jobTitle: siteMetadata.jobTitle,
    },
  };
}

function generatePostMetadata(post: IPost): Metadata {
  const publishedTime = new Date(post.date).toISOString();
  const postUrl = `${siteMetadata.siteUrl}/posts/${post.id}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: siteMetadata.author, url: siteMetadata.siteUrl }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      siteName: siteMetadata.title,
      locale: siteMetadata.locale,
      type: "article",
      images: [
        {
          url: siteMetadata.socialBanner,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      authors: [siteMetadata.author],
      publishedTime,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      site: siteMetadata.twitterHandle,
      creator: siteMetadata.twitterHandle,
      images: [siteMetadata.socialBanner],
    },
  };
}

function generatePostJSONLD(post: IPost) {
  const postUrl = `${siteMetadata.siteUrl}/posts/${post.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    author: {
      "@type": "Person",
      name: siteMetadata.author,
      url: siteMetadata.siteUrl,
      jobTitle: siteMetadata.jobTitle,
    },
    publisher: {
      "@type": "Person",
      name: siteMetadata.author,
      url: siteMetadata.siteUrl,
      image: {
        "@type": "ImageObject",
        url: `${siteMetadata.siteUrl}${siteMetadata.authorAvatar}`,
      },
    },
    keywords: post.tags?.join(", "),
  };
}

function generateWebsiteJSONLD() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    author: {
      "@type": "Person",
      name: siteMetadata.author,
      url: siteMetadata.siteUrl,
      jobTitle: siteMetadata.jobTitle,
      sameAs: [
        siteMetadata.github,
        siteMetadata.linkedin,
        siteMetadata.twitter,
      ],
    },
  };
}

function generateBreadcrumbJSONLD(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function generateWorksJSONLD(
  works: Array<{ id: string; title: string; description: string; link: string }>
) {
  const url = `${siteMetadata.siteUrl}/works`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "My Works",
    description: "A selection of projects, experiments, and things I've built.",
    url,
    author: {
      "@type": "Person",
      name: siteMetadata.author,
      url: siteMetadata.siteUrl,
      jobTitle: siteMetadata.jobTitle,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: works.map((work, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: work.title,
        description: work.description,
        url: work.link,
      })),
    },
  };
}

function generateHireJSONLD(
  services: Array<{ label: string; description: string }>
) {
  const url = `${siteMetadata.siteUrl}/hire`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    mainEntity: {
      "@type": "Person",
      name: siteMetadata.author,
      url: siteMetadata.siteUrl,
      jobTitle: siteMetadata.jobTitle,
      email: `mailto:${siteMetadata.email}`,
      image: `${siteMetadata.siteUrl}${siteMetadata.authorAvatar}`,
      sameAs: [
        siteMetadata.github,
        siteMetadata.linkedin,
        siteMetadata.twitter,
      ],
      makesOffer: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.label,
          description: service.description,
        },
      })),
    },
  };
}

export {
  siteMetadata,
  generateSiteMetadata,
  generateHomePageMetadata,
  generatePostsPageMetadata,
  generateWorksPageMetadata,
  generateHirePageMetadata,
  generateCortexPageMetadata,
  generateCortexJSONLD,
  generatePostMetadata,
  generatePostJSONLD,
  generateWebsiteJSONLD,
  generateBreadcrumbJSONLD,
  generateWorksJSONLD,
  generateHireJSONLD,
};
