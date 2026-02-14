import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'archiview-bucket.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },

  turbopack: {
    resolveAlias: {
      '@': './src/*',
    },
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return [];
    return [
      {
        source: '/api/v1/:path*',
        destination: `/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
