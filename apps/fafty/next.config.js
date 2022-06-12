// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

// // get git info from command line
const commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim();

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: true,
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  env: {
    commitHash: commitHash,
  },
  async headeres() {
    return [
      {
        source: '/*',
        headers: [{ key: 'Web-Build', value: commitHash }]
      },
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
      }
    ];
  },
  generateBuildId: async () => {
    // latest git commit hash here
    return commitHash
  },
  experimental: {
    concurrentFeatures: true,
    // serverComponents: true,
    images: { layoutRaw: true }
  },
  // swcMinify: true,
  compress: false,
  oweredByHeader: false,
  trailingSlash: true,
  // compiler: {
  //   // ssr and displayName are configured by default
  //   styledComponents: true,
  //   relay: {
  //     // This should match relay.config.js
  //     src: './',
  //     artifactDirectory: './__generated__',
  //     language: 'typescript',
  //   },
  // }
};

module.exports = withNx(nextConfig);
