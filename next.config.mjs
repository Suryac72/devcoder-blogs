import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/devcoder-knowledge-base',
  assetPrefix: '/devcoder-knowledge-base/',
  images: {
    unoptimized: true,
  },
};

export default withMDX(config);
