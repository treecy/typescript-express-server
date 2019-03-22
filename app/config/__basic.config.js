/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path');
const url = require('url');
const debug = require('debug')('app:config:environment');

debug('Creating default configuration.');
// ========================================================
// Default Configuration
// ========================================================
const env = process.env.NODE_ENV;
const isLocal = env === undefined;

let envConfig = require(`./conf.${env}.js`);

const APP_SERVER_ENDPOINT = url.format({
  protocol: envConfig.app_server.protocol,
  slashes: true,
  host: `${envConfig.app_server.host}${envConfig.app_server.port ? `:${envConfig.app_server.port}` : ''}`,
  pathname: envConfig.app_server.url_prefix,
});
const API_SERVER_ENDPOINT = url.format({
  protocol: envConfig.api_server.protocol,
  slashes: true,
  host: `${envConfig.api_server.host}${envConfig.api_server.port ? `:${envConfig.api_server.port}` : ''}`,
  pathname: envConfig.api_server.url_prefix,
});
const API_SERVER_LOGINCHECK_ENDPOINT = url.format({
  protocol: envConfig.auth_server.protocol,
  slashes: true,
  host: `${envConfig.auth_server.host}${envConfig.auth_server.port ? `:${envConfig.auth_server.port}` : ''}`,
  pathname: envConfig.auth_server.url_prefix,
});

const API_SERVER_WEBSOCKET_URL = url.format({
  protocol: envConfig.websocket.protocol,
  slashes: true,
  host: `${envConfig.api_server.host}${envConfig.api_server.port ? `:${envConfig.api_server.port}` : ''}`,
  pathname: `${envConfig.api_server.url_prefix}/subscriptions`,
});

const config = {
  // Env
  env,
  is_local: isLocal,

  // Front-end App Configuration
  app_server_endpoint: APP_SERVER_ENDPOINT,
  app_server_url_prefix: envConfig.app_server.url_prefix,
  app_server_port : process.env.PORT || envConfig.app_server.port,
  static_baseurl: `${envConfig.app_server.url_prefix}/assets/`,

  cookie_domain: envConfig.cookie_domain,
  ubid_key: envConfig.ubid_key,
  tracker_enabled: envConfig.tracker_enabled,

  // API Server Configuration
  api_server_endpoint: API_SERVER_ENDPOINT,
  api_server_logincheck_endpoint: API_SERVER_LOGINCHECK_ENDPOINT,
  api_server_graphql_url: envConfig.isContainer ? '/graphql' : `${API_SERVER_ENDPOINT}/graphql`,
  api_server_data_file_url: `${API_SERVER_ENDPOINT}/data`,
  websocket_url: API_SERVER_WEBSOCKET_URL,

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '..'),
  dir_client : 'src',
  dir_dist   : 'dist',
  dir_public : 'public',
  dir_server : 'server',
  dir_test   : 'tests',
  entry_file : 'index.html',

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_babel : {
    cacheDirectory : true,
    plugins        : [['transform-runtime', { polyfill: false }], 'transform-decorators-legacy', 'lodash'],
    presets        : ['es2015', 'react', 'stage-0'],
  },
  compiler_crossorigin     : false,
  compiler_devtool         : 'cheap-module-source-map',
  compiler_hash_type       : 'hash',
  compiler_fail_on_warning : false,
  compiler_public_path     : '/',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true,
  },
  compiler_vendors : [
    'react',
    'react-redux',
    'react-router',
    'redux',
  ],
};

// ------------------------------------
// Global Configuration
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(config.env),
  },
  NODE_ENV     : JSON.stringify(config.env),
  // Just 3 chars to describe which environtment is used
  UPCASE_ENV   : JSON.stringify(envConfig.env_upcase),
  APP_SERVER_URL_PREFIX  : JSON.stringify(config.app_server_url_prefix),
  API_SERVER_ENDPOINT : JSON.stringify(config.api_server_endpoint),
  API_SERVER_LOGINCHECK_ENDPOINT : JSON.stringify(config.api_server_logincheck_endpoint),
  API_SERVER_GRAPHQL_URL      : JSON.stringify(config.api_server_graphql_url),
  WEBSOCKET_URL: JSON.stringify(config.websocket_url),
  STATIC_BASEURL: JSON.stringify(config.static_baseurl),

  __LOCAL__    : isLocal,
  __DEV__      : config.env === 'development' || config.env === 'development.container',
  __STG__      : config.env === 'staging' || config.env === 'staging.container',
  __PRO__      : config.env === 'production' || config.env === 'production.container',
  __TEST__     : config.env === 'test' || config.env === 'test.container',
  __BASENAME__ : JSON.stringify(process.env.BASENAME || ''),

  NGATE_SERVER: JSON.stringify('ngate301'),
  NGATE_DIRECTORY: JSON.stringify('rat_data_export'),
};
// ------------------------------------
// Utilities
// ------------------------------------
function base(...filenames) {
  const args = [config.path_base].concat([].slice.call(filenames));
  return path.resolve(...args);
}

config.paths = {
  base,
  client : base.bind(null, config.dir_client),
  public : base.bind(null, config.dir_public),
  dist   : base.bind(null, config.dir_dist),
  entry  : base.bind(null, `${config.dir_dist}${envConfig.app_server.url_prefix}`, config.entry_file),
};

// ------------------------------------
// Environment Configuration
// ------------------------------------

if (!isLocal) {
  Object.assign(config, {
    compiler_fail_on_warning : false,
    compiler_hash_type       : 'chunkhash',
    compiler_crossorigin     : 'anonymous',
    compiler_devtool         : 'source-map',
    compiler_stats           : {
      chunks       : true,
      chunkModules : true,
      colors       : true,
      children     : false,
    },
  });
}

module.exports = config;
