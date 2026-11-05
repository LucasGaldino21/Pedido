import type { NextConfig } from 'next';

// No GitHub Pages o site fica em /nome-do-repo; o workflow define BASE_PATH.
const basePath = process.env.BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
export default nextConfig;
