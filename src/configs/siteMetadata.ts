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
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      template: `%s | ${siteMetadata.title}`,
      default: siteMetadata.title,
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

function generatePostsPageMetadata(): Metadata {
  return {
    title: "Blog",
    description:
      "Articles on frontend engineering, tooling, architecture, and the craft of building for the web.",
    alternates: {
      canonical: `${siteMetadata.siteUrl}/posts`,
    },
    openGraph: {
      title: "Blog | " + siteMetadata.title,
      description:
        "Articles on frontend engineering, tooling, architecture, and the craft of building for the web.",
      url: `${siteMetadata.siteUrl}/posts`,
      siteName: siteMetadata.title,
      locale: siteMetadata.locale,
      type: "website",
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

export {
  siteMetadata,
  generateSiteMetadata,
  generatePostsPageMetadata,
  generatePostMetadata,
  generatePostJSONLD,
  generateWebsiteJSONLD,
  generateBreadcrumbJSONLD,
};
