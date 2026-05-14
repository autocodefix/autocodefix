/** @type {import('next').NextConfig} */
const nextConfig = {
turbopack: {},
  // Standalone output: bundles only what's needed — required for Hostinger Node.js deployment
  output: 'standalone',

  // Next.js 15: serverExternalPackages replaces the old experimental key
  serverExternalPackages: ['@anthropic-ai/sdk', '@supabase/supabase-js'],

  // Silence the "Critical dependency" warning from Supabase realtime internals
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || []
    }
    // Suppress dynamic require warnings from ws/bufferutil (Supabase realtime)
    config.resolve.fallback = {
      ...config.resolve.fallback,
      bufferutil: false,
      'utf-8-validate': false,
    }
    return config
  },

  // Production image optimisation — keep default (no external loader needed)
  images: {
    unoptimized: false,
  },
}

module.exports = nextConfig
