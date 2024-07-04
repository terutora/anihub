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
    domains: [
      'api.annict.com',
      'narenare-anime.com',
    ], // Annictの画像ドメインを追加
    
  },
};


module.exports = nextConfig

module.exports = nextConfig