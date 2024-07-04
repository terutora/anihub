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
}

module.exports = nextConfig