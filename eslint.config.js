const {fixupConfigRules, fixupPluginRules} = require('@eslint/compat');
const {FlatCompat} = require('@eslint/eslintrc');
const js = require('@eslint/js');
const stylistic = require('@stylistic/eslint-plugin');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const {defineConfig, globalIgnores} = require('eslint/config');
const _import = require('eslint-plugin-import');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    extends: fixupConfigRules(
      compat.extends(
        '@react-native',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
      ),
    ),
    languageOptions: {
      parser: tsParser,
      parserOptions: {project: ['./tsconfig.json']},
    },
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
      '@stylistic': stylistic,
    },
    rules: {
      'no-console': 'error',
      'no-var': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-require-imports': [
        'error',
        {allow: ['eslint', '@stylistic/', '@typescript-eslint/']},
      ],
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
      'react/no-unstable-nested-components': ['error', {allowAsProps: true}],
      'react/jsx-curly-brace-presence': [
        'warn',
        {props: 'never', children: 'never'},
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
      '@typescript-eslint/ban-ts-comment': 'off',
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
          alphabetize: {order: 'asc'},
        },
      ],
      'sort-imports': ['error', {ignoreDeclarationSort: true}],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {checksVoidReturn: false},
      ],
    },
  },
  globalIgnores([
    '**/babel.config.js',
    '**/metro.config.js',
    '**/.prettierrc.js',
    '**/jest.config.js',
  ]),
]);
