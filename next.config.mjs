/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Route /portfolio/* to the old Vercel portfolio
      {
        source: '/portfolio',
        destination: 'https://geofrey94.vercel.app',
      },
      {
        source: '/portfolio/:path*',
        destination: 'https://geofrey94.vercel.app/:path*',
      },
    ];
  },
};

export default nextConfig;
