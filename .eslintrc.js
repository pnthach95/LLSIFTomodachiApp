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
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  rules: {
    'react/prop-types': [
      'error',
      {
        ignore: ['navigation']
      }
    ],
    'no-unused-vars': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: './'
      }
    ],
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
      'babel-plugin-root-import': {
        rootPathPrefix: '~',
        rootPathSuffix: 'App'
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
  }
};
