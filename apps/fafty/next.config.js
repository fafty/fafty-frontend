// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const path = require('path');
const loaderUtils = require('loader-utils');

const hashOnlyIdent = (context, _, exportName) =>
  loaderUtils
    .getHashDigest(
      Buffer.from(
        `filePath:${path
          .relative(context.rootContext, context.resourcePath)
          .replace(/\\+/g, '/')}#className:${exportName}`,
      ),
      'md4',
      'base64',
      6,
    )
    .replace(/^(-?\d|--)/, '_$1');

// // get git info from command line
const commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim();

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: false,
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
        headers: [{ key: 'Web-Build', value: commitHash }],
      },
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
    ];
  },
  generateBuildId: async () => {
    // latest git commit hash here
    return commitHash;
  },
  experimental: {
    concurrentFeatures: true,
    // serverComponents: true,
    images: { allowFutureImage: true },
  },
  images: {
    domains: [
      'fafty-assets.s3.amazonaws.com',
      'dhch6dszrgnpb.cloudfront.net',
      'avatars.dicebear.com',
    ],
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

  webpack(config, { dev }) {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule) => Array.isArray(rule.use));

    if (!dev)
      rules.forEach((rule) => {
        rule.use.forEach((moduleLoader) => {
          if (
            moduleLoader.loader?.includes('css-loader') &&
            !moduleLoader.loader?.includes('postcss-loader')
          )
            moduleLoader.options.modules.getLocalIdent = hashOnlyIdent;
        });
      });

    return config;
  },
};

module.exports = withNx(nextConfig);
