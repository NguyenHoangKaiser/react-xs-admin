module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },

  extends: ['@jsxiaosi/eslint-config-react', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        usePrettierrc: true,
      },
    ],
    // Forbidden to use unknown DOM attributes
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
          },
        ],
      },
    ],
  },
};
