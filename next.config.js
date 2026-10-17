/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true,
  },
  basePath: "/car-scroll-animation",
  assetPrefix: "/car-scroll-animation/",
};

module.exports = nextConfig;
