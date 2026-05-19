/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},

  output: "standalone",

  serverExternalPackages: [
    "@anthropic-ai/sdk",
    "@supabase/supabase-js",
  ],

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
    }

    config.resolve.fallback = {
      ...config.resolve.fallback,
      bufferutil: false,
      "utf-8-validate": false,
    };

    return config;
  },

  images: {
    unoptimized: false,
  },
};

module.exports = nextConfig;