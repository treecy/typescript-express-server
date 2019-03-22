const presets = [
  ['@babel/env', {
    targets: {
      node: process.versions.node,
    },
  }],
  '@babel/react',
  '@babel/preset-typescript',
];

const plugins = [];
module.exports = { presets, plugins };
