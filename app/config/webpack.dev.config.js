const webpack = require('webpack');
const basicConfig = require('./basic.config');

const config = {
  devtool: 'source-map',
  output : {
    filename  : '[name].[hash].js',
    path      : basicConfig.distDir,
    publicPath: '/',
  },

  devServer: {
    contentBase       : basicConfig.distDir,
    port              : 3000,
    historyApiFallback: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;
