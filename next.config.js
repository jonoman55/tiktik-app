/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'cdn.pixabay.com',
      'p16-amd-va.tiktokcdn.com',
      'image.shutterstock.com'
    ],
  },
};

module.exports = nextConfig;
