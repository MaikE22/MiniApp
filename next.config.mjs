/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Exclude problematic dependencies from the build
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'thread-stream': false,
      };
    }

    return config;
  },
};

export default nextConfig;
