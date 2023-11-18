const nextConfig = {
  // Optionally, add any other Next.js config below,
  serverRuntimeConfig: {
    PROJECT_ROOT: process.cwd(),
    POSTS_ROOT: `${process.cwd()}/posts`,
  },
};

// Merge MDX config with Next.js config
module.exports = nextConfig;
