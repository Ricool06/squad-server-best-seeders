module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'no-undef': 'error',
    'import/prefer-default-export': 0,
    'no-console': 0,
    'import/extensions': ['error', 'ignorePackages'],
  },
  ignorePatterns: ['dist/'],
};
