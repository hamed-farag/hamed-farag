import { IPost } from "@/interfaces/post";
import type { Metadata } from "next";

const siteMetadata = {
  title: "Hamed Farag's Space",
  author: "Hamed Farag",
  authorAvatar: "/hf-avatar.jpg",
  jobTitle: "Lead Frontend Engineer",
  headerTitle: "HF",
  description: "Hamed Farag's Personal Technical Space",
  language: "en-us",
  siteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL || "",
  siteLogo: "/hg_logo.png",
  socialBanner: "/social-banner.png",
  siteRepo: "https://github.com/hamed-farag/hamed-farag",
  email: "hamed.farag.2009@gmail.com",
  github: "https://github.com/hamed-farag",
  twitter: " https://twitter.com/hamedmfarag",
  linkedin: "https://www.linkedin.com/in/hamedmfarag/",
  locale: "en_US",
};

function generateSiteMetadata(): Metadata {
  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      template: `%s | ${siteMetadata.headerTitle}`,
      default: siteMetadata.title,
    },
    description: siteMetadata.description,
    openGraph: {
      title: siteMetadata.title,
      description: siteMetadata.description,
      url: siteMetadata.siteUrl,
      siteName: siteMetadata.title,
      images: [siteMetadata.socialBanner],
      locale: siteMetadata.locale,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: siteMetadata.title,
      description: siteMetadata.description,
      images: [siteMetadata.socialBanner],
    },
  };
}

function generatePostMetadata(post: IPost): Metadata {
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteMetadata.siteUrl}/posts/${post.id}`,
      siteName: siteMetadata.title,
      locale: siteMetadata.locale,
      type: "article",
      images: [siteMetadata.socialBanner],
      authors: [siteMetadata.author],
      publishedTime: new Date(post.date).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [siteMetadata.socialBanner],
    },
  };
}

export { siteMetadata, generateSiteMetadata, generatePostMetadata };
