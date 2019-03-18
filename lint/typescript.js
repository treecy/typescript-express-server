module.exports = {
  parser: '@typescript-eslint/parser',
  extends: './basic.js',
  plugins: ["jest", "@typescript-eslint"],
  //settings: {
  //  'import/resolver': {
  //    node: {
  //      extensions: ['.js', '.jsx', '.ts', '.tsx'],
  //    },
  //  },
  //},
  rules: {
    // Prevent TypeScript-specific constructs from being erroneously flagged as unused
    '@typescript-eslint/no-unused-vars'         : 'error',
    // Require PascalCased class and interface names
    '@typescript-eslint/class-name-casing'      : 'error',
    // Require a specific member delimiter style for interfaces and type literals
    // Default Semicolon style
    '@typescript-eslint/member-delimiter-style' : 'error',
    // Require a consistent member declaration order
    '@typescript-eslint/member-ordering'        : 'error',
    // Require consistent spacing around type annotations
    '@typescript-eslint/type-annotation-spacing': 'error',
  },
};
