const presets = [
  ["@babel/env", {
      targets: {
          node: process.versions.node
      },
  }],
  '@babel/preset-type',
];

const plugins = [];
module.exports = {presets, plugins};
