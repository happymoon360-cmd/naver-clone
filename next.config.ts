import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blogpfthumb-phinf.pstatic.net',
      },
      {
        protocol: 'https',
        hostname: 'mblogthumb-phinf.pstatic.net',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
