/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['api.annict.com', 'cal.syoboi.jp'], // APIから画像を取得する場合に必要
    },
  }
  
  module.exports = nextConfig