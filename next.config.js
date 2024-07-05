/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/syobocal',
        destination: 'http://cal.syoboi.jp/rss.php',
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizeCss: true, // CSSの最適化
    optimizeImages: true, // 画像の最適化
  },
}


module.exports = nextConfig

module.exports = nextConfig