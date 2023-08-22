const webpack = require('webpack');

module.exports = {
  // other webpack config options...

  resolve: {
    fallback: {
      util: require.resolve('util/'),
    },
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
const path = require('path');

