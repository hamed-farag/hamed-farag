const nextConfig = {
  // Keep `next build` from replacing files used by a running dev server.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hamed-farag.github.io",
      },
    ],
  },
};

// Merge MDX config with Next.js config
module.exports = nextConfig;
