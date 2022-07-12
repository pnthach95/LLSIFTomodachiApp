module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks', 'react-native', 'import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    'no-console': 'error',
    'no-var': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'prefer-const': 'error',
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        reservedFirst: true,
      },
    ],
    'react-native/sort-styles': [
      'error',
      'asc',
      {ignoreClassNames: false, ignoreStyleProperties: false},
    ],
    'react-native/no-single-element-style-arrays': 'error',
    'react-native/no-inline-styles': 'error',
    'react-native/no-unused-styles': 'warn',
    'react-hooks/exhaustive-deps': 'off',
    'object-shorthand': ['error', 'always'],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/array-type': ['error', {default: 'array'}],
    eqeqeq: ['error', 'always'],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'internal',
          'external',
          'parent',
          'sibling',
          'index',
          'type',
        ],
        alphabetize: {
          order: 'asc',
        },
        pathGroups: [
          {
            pattern: '~/**',
            group: 'external',
          },
        ],
      },
    ],
    'sort-imports': ['error', {ignoreDeclarationSort: true}],
  },
};
