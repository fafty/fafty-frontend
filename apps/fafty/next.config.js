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
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  env: {
    commitHash: commitHash,
  },
  async headeres() {
    return [
      {
        source: '/*',
        headers: [{ key: 'Web-Build', value: commitHash }]
      }
    ];
  },
  generateBuildId: async () => {
    // latest git commit hash here
    return commitHash
  },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   // Note: we provide webpack above so you should not `require` it
  //   // Perform customizations to webpack config
  //   // Important: return the modified config
  //   config.plugins.push({
  //     test: /\.(ogg|mp3|wav|mpe?g)$/i,
  //     use: [
  //       {
  //         loader: 'file-loader',
  //         options: {
  //           name: '[path][name].[ext]',
  //         },
  //       },
  //     ],
  //   })
  //   return config
  // },
  webpack(config, options) {
    // const { isServer } = options;
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    });
    return config;
  },
};

module.exports = withNx(nextConfig);
