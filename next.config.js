/** @type {import('next').NextConfig} */
const path = require('path');
const { withSentryConfig } = require('@sentry/nextjs');

const isSentryEnabled = process.env.IS_SENTRY_ENABLED === '1';
const isProduction = process.env.NODE_ENV;

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  async redirects() {
    const redirects = [];
    if (process.env.NEXT_PUBLIC_BASE_PATH) {
      redirects.push({
        source: '/',
        destination: process.env.NEXT_PUBLIC_BASE_PATH,
        basePath: false,
        permanent: false,
      });
    }
    return redirects;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
    prependData: `@import "~@/styles/resources.scss";`,
    crossOrigin: 'anonymous',
    swcMinify: true,
    optimizeFonts: true,
    reactStrictMode: true,
    generateEtags: false,
    poweredByHeader: false,
  },
};
if (!isProduction) {
  /* Only use swc-plugin-coverage-instrument in dev build */
  nextConfig.experimental.swcPlugins = [['swc-plugin-coverage-instrument', {}]];
}

if (isSentryEnabled) {
  module.exports = withSentryConfig(
    nextConfig,
    {
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options

      // Suppresses source map uploading logs during build
      silent: true,
      org: 'oura1',
      project: 'oura1',
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: true,

      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
      tunnelRoute: '/monitoring',

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,

      // Enables automatic instrumentation of Vercel Cron Monitors.
      // See the following for more information:
      // https://docs.sentry.io/product/crons/
      // https://vercel.com/docs/cron-jobs
      automaticVercelMonitors: true,
    },
  );
} else {
  module.exports = nextConfig;
}
