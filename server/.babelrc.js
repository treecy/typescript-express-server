const presets = [
  ['@babel/env', {
    targets: {
      node: process.versions.node,
    },
  }],
  '@babel/preset-typescript',
];

const plugins = [
  ['module-resolver', {
    root: ['./src'],
    extensions: ['.js', '.ts']
  }],
];
module.exports = { presets, plugins };
