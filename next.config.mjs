// next.config.mjs

const nextConfig = {
  images: {
    domains: ["jooeng.s3.ap-northeast-2.amazonaws.com"],
  },
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
