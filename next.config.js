/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
