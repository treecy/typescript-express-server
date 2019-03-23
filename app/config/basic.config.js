const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const config = {
  // ----------------------------------
  // Project Structure
  // ----------------------------------
  rootPath     : ROOT,
  sourceDir    : path.resolve(ROOT, 'src'),
  distDir      : path.resolve(ROOT, 'dist'),
  distAssetsDir: path.resolve(ROOT, 'dist/assets'),
  publicDir    : path.resolve(ROOT, 'public'),
  nmDir        : path.resolve(ROOT, 'node_modules'),
  entryHTML    : path.resolve(ROOT, 'src/index.html'),
};

module.exports = config;
