/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/syobocal",
        destination: "http://cal.syoboi.jp/rss.php",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizeCss: true, // CSSの最適化はそのまま
    // optimizeImagesは削除
  },
};

module.exports = nextConfig;
