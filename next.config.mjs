/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/portfolio',
        destination: 'https://portfolio.geofreynjoroge.com',
      },
      {
        source: '/portfolio/:path*',
        destination: 'https://portfolio.geofreynjoroge.com/:path*',
      },
    ];
  },
};

export default nextConfig;
