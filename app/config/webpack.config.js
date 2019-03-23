const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const basicConfig = require('./basic.config');

const config = {
  entry: {
    app: `${basicConfig.sourceDir}/index.tsx`,
  },
  output: {
    filename  : '[name].[hash].js',
    path      : basicConfig.distDir,
    publicPath: '/',
  },

  devServer: {
    contentBase: basicConfig.distDir,
    port       : 3000,
    publicPath : '/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules   : [
      basicConfig.sourceDir,
      basicConfig.nmDir,
    ],
  },

  module: {
    rules: [],
  },

  plugins: [],

};

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript & Typescript
config.module.rules.push({
  test   : /\.(js|jsx|ts|tsx)$/,
  enforce: 'pre',
  exclude: /node_modules/,

  use: {
    loader : 'babel-loader',
    options: { babelrc: true },
  },
});

// ------------------------------------
// Style Loaders
// ------------------------------------
const extractStyles = new ExtractTextPlugin({
  filename : '[name].[hash].css',
  allChunks: true,
});
const cssloaderOptions = {
  sourceMap: true,
  minimize : {
    autoprefixer: {
      add     : true,
      remove  : true,
      browsers: ['last 2 versions'],
    },
    discardComments: {
      removeAll: true,
    },
    discardUnused: false,
    mergeIdents  : false,
    reduceIdents : false,
    safe         : true,
  },
};

config.module.rules.push({
  test  : /\.(sass|scss|css)$/,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use     : [
      {
        loader : 'css-loader',
        options: cssloaderOptions,
      },
      {
        loader : 'sass-loader',
        options: {
          sourceMap   : true,
          includePaths: [],
        },
      },
    ],
  }),
});


// ------------------------------------
// Output HTML
// ------------------------------------
const htmlPlugin = new HtmlWebpackPlugin({
  template: basicConfig.entryHTML,
  hash    : false,
  filename: `${basicConfig.distDir}/index.html`,
  inject  : 'body',
  minify  : {
    collapseWhitespace: true,
  },
});

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    // ------------------------------------
    // Development Configuration
    // ------------------------------------

    config.devtool = 'source-map';
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  } else if (argv.mode === 'production') {
    // ------------------------------------
    // Production Configuration
    // ------------------------------------
  }

  config.plugins.push(
    extractStyles,
    htmlPlugin,
  );

  return config;
};
