const nextConfig = {
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
