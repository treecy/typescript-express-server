const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const config = {
  // ----------------------------------
  // Project Structure
  // ----------------------------------
  rootPath : ROOT,
  sourceDir: path.resolve(ROOT, 'src'),
  distDir  : path.resolve(ROOT, 'dist'),
  publicDir: path.resolve(ROOT, 'public'),
  entryFile: path.resolve(ROOT, 'index.html'),
};

module.exports = config;
