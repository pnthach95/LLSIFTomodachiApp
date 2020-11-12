module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'react',
    'react-hooks',
    'react-native',
    'import'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-native/all'
  ],
  rules: {
    'react/prop-types': [
      'error',
      {
        ignore: ['navigation']
      }
    ],
    'no-unused-vars': 'off',
    'no-console': 1,
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: './'
      }
    ],
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react-native/no-raw-text': 'off',
    'import/extensions': 0,
    'class-methods-use-this': 'off',
    'no-use-before-define': 'off',
    'prettier/prettier': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      'babel-module': {
        alias: {
          map: [['~', './App/']],
          extensions: ['.ts', '.js', '.tsx'],
        },
      }
    }
  },
  env: {
    es6: true,
    node: true,
    jest: true
  },
  globals: {
    __DEV__: true
  },
  ignorePatterns: ['/*.*']
};
