module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  "extends": [
    "airbnb",
    "plugin:jest/recommended"
  ],
  "plugins": [],
  "env": {
    "jest/globals": true
  },
  "globals": {

  },

  "rules": {
    // Your own javascript rules
  },
};
