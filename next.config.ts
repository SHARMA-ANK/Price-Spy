import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb',
      allowedOrigins: ['*']
    },
    serverComponentsExternalPackages:['mongoose']
  },
  images: {
    domains: ['m.media-amazon.com'],
  },
};

export default nextConfig;
