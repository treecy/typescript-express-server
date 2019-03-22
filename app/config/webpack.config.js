const ExtractTextPlugin = require('extract-text-webpack-plugin');
const basicConfig = require('./basic.config');

const config = {
  entry: {
    app: `${basicConfig.sourceDir}/index.tsx`,
  },
  output: {
    filename: '[name].[hash].js',
    path    : basicConfig.distDir,
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [],
  },

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
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
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

module.exports = (env, argv) => {
  // ------------------------------------
  // Development config
  // ------------------------------------
  let IS_DEV = false;
  if (argv.mode === 'development') {
    IS_DEV = true;
    config.devtool = 'source-map';
  }

  return config;
};
