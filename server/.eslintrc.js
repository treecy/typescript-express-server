module.exports = {
  extends: ['../lint/typescript.js'],
  env: {
    es6: true,
    node: true
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        root: ['./src'],
        extensions: ['.js', '.ts',],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    }
  }
};
