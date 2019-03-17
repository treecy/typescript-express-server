const presets = [
    ["@babel/env", {
        targets: {
            node: process.versions.node
        },
    }]
];

const plugins = [];
module.exports = {presets, plugins};