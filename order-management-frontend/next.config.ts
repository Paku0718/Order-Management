/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src'],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = './src';
    return config;
  },
};

module.exports = nextConfig;