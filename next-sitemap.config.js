/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/api/post"],
};
