const webpack = require('webpack');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const basic = require('./basic.config');
const debug = require('debug')('app:config:webpack');

const {
  __LOCAL__, __DEV__, __STG__, __PRO__,
} = basic.globals;

debug('Creating configuration.');
const __webpackConfig = {
  name    : 'client',
  target  : 'web',
  devtool : basic.compiler_devtool,
  resolve : {
    modules: [
      basic.paths.client(),
      'node_modules',
    ],
    unsafeCache: false,
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module : {
    rules: [],
  },
  node: {
    fs: 'empty',
    module: 'empty'
  }
};
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = basic.paths.client('main.js');
const CSS_VENDOR_ENTRY = basic.paths.client('styles', 'vendor-css.js');

__webpackConfig.entry = {
  vendor : basic.compiler_vendors.concat(CSS_VENDOR_ENTRY),
  app : __LOCAL__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${basic.app_server_url_prefix}/__webpack_hmr`)
    : [APP_ENTRY],
};

// ------------------------------------
// Bundle Output
// ------------------------------------
__webpackConfig.output = {
  filename   : `[name].[${basic.compiler_hash_type}].js`,
  path       : basic.paths.dist() + basic.static_baseurl,
  publicPath : basic.static_baseurl,
  crossOriginLoading: basic.compiler_crossorigin,
};

// ------------------------------------
// Externals
// ------------------------------------
__webpackConfig.externals                                   = {};
__webpackConfig.externals['react/lib/ExecutionEnvironment'] = true;
__webpackConfig.externals['react/lib/ReactContext']         = true;
__webpackConfig.externals['react/addons']                   = true;

// ------------------------------------
// Plugins
// ------------------------------------
__webpackConfig.plugins = [
  new webpack.DefinePlugin(basic.globals),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        cssnano({
          autoprefixer : {
            add      : true,
            remove   : true,
            browsers : ['last 2 versions'],
          },
          discardComments : {
            removeAll : true,
          },
          discardUnused : false,
          mergeIdents   : false,
          reduceIdents  : false,
          safe          : true,
          sourcemap     : true,
        }),
      ],
    },
  }),
  new CaseSensitivePathsPlugin(),
  new HtmlWebpackPlugin({
    template : basic.paths.client('index.html'),
    hash     : false,
    favicon  : basic.paths.public('favicon.ico'),
    filename : '../index.html',
    inject   : 'body',
    minify   : {
      collapseWhitespace : true,
    },
  }),
];

if (__LOCAL__) {
  debug('Enabling plugins for live development (HMR, NoErrors).');
  __webpackConfig.mode         = 'development';
  __webpackConfig.optimization = {
    noEmitOnErrors: true
  };
  __webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
  __webpackConfig.resolve.unsafeCache = true; // for faster build
} else if (__DEV__ || __STG__ || __PRO__) {
  debug('Enabling plugins for production (OccurrenceOrder, Dedupe & LoaderOptionsPlugin).');
  __webpackConfig.mode = 'production';

  __webpackConfig.optimization = {
    namedModules: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  };

  __webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
    })
  );
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript & Typescript
__webpackConfig.module.rules.push({
  test    : /\.(js|jsx|ts|tsx)$/,
  enforce: 'pre',
  exclude : /node_modules/,
  use  : {
    loader: 'babel-loader',
    options: { babelrc: true },
  },
});


// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const extractStyles = new ExtractTextPlugin({
  filename: '[name].[hash].css',
  disable: __LOCAL__,
  allChunks : true,
});
const cssloaderOptions = {
  sourceMap: true,
  minimize: {
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions'],
    },
    discardComments: {
      removeAll : true,
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: basic.compiler_devtool,
  },
};
// Images used in limitless don't exist, and this cased building errors.
// This is to disable url handler in css-loader
const cssContainsFont = /limitless\/assets\/css\/(?!(icons|bootstrap)).*css$/;
__webpackConfig.module.rules.push({
  test: cssContainsFont,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: Object.assign({ url: false }, cssloaderOptions),
      },
    ],
  }),
});

__webpackConfig.module.rules.push({
  test: /\.(sass|scss|css)$/,
  exclude: cssContainsFont,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: cssloaderOptions,
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          includePaths: [
            basic.paths.client('styles'),
          ],
        },
      },
    ],
  }),
});
__webpackConfig.plugins.push(extractStyles);


// File loaders
/* eslint-disable */
const fontPath = 'fonts/';
__webpackConfig.module.rules.push(
  { test: /\.woff(\?.*)?$/,  loader: `url-loader?prefix=fonts/&name=${fontPath}[name].[ext]&limit=10000&mimetype=application/font-woff` },
  { test: /\.woff2(\?.*)?$/, loader: `url-loader?prefix=fonts/&name=${fontPath}[name].[ext]&limit=10000&mimetype=application/font-woff2` },
  { test: /\.otf(\?.*)?$/,   loader: `file-loader?prefix=fonts/&name=${fontPath}[name].[ext]&limit=10000&mimetype=font/opentype` },
  { test: /\.ttf(\?.*)?$/,   loader: `url-loader?prefix=fonts/&name=${fontPath}[name].[ext]&limit=10000&mimetype=application/octet-stream` },
  { test: /\.eot(\?.*)?$/,   loader: `file-loader?prefix=fonts/&name=${fontPath}[name].[ext]` },
  { test: /\.svg(\?.*)?$/,   loader: `url-loader?prefix=fonts/&name=${fontPath}[name].[ext]&limit=10000&mimetype=image/svg+xml` },
  { test: /\.(png|jpg)$/,    loader: 'url-loader?limit=8192' }
);
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809

__webpackConfig.module.noParse = /object-hash\/dist\/object_hash.js/;

module.exports = __webpackConfig;
