module.exports = {
  extends: ['../lint/react-typescript.js'],
  env: {
    es6: true,
    node: true
  },
  rules: {
    'key-spacing': ['error', {align: {}}]
  }
};
