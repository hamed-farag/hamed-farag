const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hamedafarag.github.io",
      },
    ],
  },
};

// Merge MDX config with Next.js config
module.exports = nextConfig;
