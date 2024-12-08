/** @type {import('next').NextConfig} */
const nextConfig = {
  // utfs - uploadthing file service
  images: {
    domains: ['img.clerk.com', 'utfs.io'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/conversations',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
