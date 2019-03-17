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
  }],
];
module.exports = { presets, plugins };
