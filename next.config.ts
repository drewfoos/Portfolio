// next.config.ts
import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const config: NextConfig = {
  // Image optimization settings
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compression and optimization
  compress: true,
  poweredByHeader: false,
  crossOrigin: 'anonymous',

  // Caching headers
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|js|css|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Priority',
            value: 'high'
          }
        ]
      }
    ];
  },

  // Experimental features
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'react-hot-toast',
      'gsap',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-toast',
      'lucide-react',
      'react-icons'
    ],
    optimizeCss: true
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 70000,
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
              priority: 40,
              enforce: true
            },
            radix: {
              name: 'radix',
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              priority: 35,
              enforce: true
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20
            },
            images: {
              name: 'images',
              test: /\.(png|jpg|jpeg|gif|svg|webp|avif)$/,
              chunks: 'all',
              priority: 30
            },
            styles: {
              name: 'styles',
              test: /\.(css|scss)$/,
              chunks: 'all',
              enforce: true,
              priority: 40
            }
          }
        },
        runtimeChunk: 'single'
      };
      config.optimization.usedExports = true;
    }
    return config;
  }
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false
})(config);