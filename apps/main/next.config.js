//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  concurrentFeatures: true,
  images: {
    domains: [
      'fafty-assets.s3.amazonaws.com',
      'dhch6dszrgnpb.cloudfront.net',
      'avatars.dicebear.com',
    ],
  },
};

module.exports = withNx(nextConfig);