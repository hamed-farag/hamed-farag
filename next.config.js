const nextConfig = {
  // Optionally, add any other Next.js config below,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
    POSTS_ROOT: `${__dirname}/posts`,
  },
};

// Merge MDX config with Next.js config
module.exports = nextConfig;
