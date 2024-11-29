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
  env: {
    NEXT_PUBLIC_API_BASE_URL: 'http://localhost:4000/api'
  }
};

module.exports = nextConfig;