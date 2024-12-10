// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization settings - works well with Vercel's image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Caching headers - Vercel handles these efficiently
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|js|css|woff|woff2)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },

  // Optimize third-party packages
  experimental: {
    optimizePackageImports: ['framer-motion', '@vercel/analytics', 'react-hot-toast'],
    optimizeCss: true,
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimize chunk splitting
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 70000,
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 40,
              enforce: true
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20
            },
            // Add specific group for images
            images: {
              name: 'images',
              test: /\.(png|jpg|jpeg|gif|svg|webp|avif)$/,
              chunks: 'all',
              priority: 30
            }
          }
        }
      };
    }
    return config;
  }
};

export default nextConfig;