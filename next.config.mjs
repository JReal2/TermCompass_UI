import fs from 'fs';
import path from 'path';
import https from 'https';

const nextConfig = {
  images: {
    loader: "imgix",  // or other supported loaders like "default"
    path: "/",
    disableStaticImages: true,   // 정적 이미지 처리 비활성화
  },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  // assetPrefix: 'http://localhost:3000',
  // assetPrefix: 'http://kyj9447.ddns.net:3000',
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,  // 빌드 시 ESLint 무시
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `/:path*`,
      },
      {
        source: "/admin/:path*",
        destination: `/admin/:path*`,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/admin/:path*',
        has: [
          {
            type: 'host',
            value: 'admin.localhost:3000',
          },
        ],
        destination: 'http://admin.localhost:3000/:path*',
        permanent: false,
      }
    ];
  },
  basePath: '',
  // output: 'export',
};

export default nextConfig;
