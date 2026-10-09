const nextConfig = {
  async headers() {
    return [
      {
        // self-hosted fonts carry a content hash in their file names
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
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
