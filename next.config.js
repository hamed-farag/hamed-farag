const createMDX = require("@next/mdx");

const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
    POSTS_ROOT: `${__dirname}/src/app/posts`,
  },
};

const withMDX = createMDX({
  options: {
    extension: /\.mdx?$/,
  },
});

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig);
