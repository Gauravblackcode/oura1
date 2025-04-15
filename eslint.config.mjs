import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
      ecmaVersion: 5,
      sourceType: 'script',
    },
    plugins: {
      react,
      reactHooks,
      jsxA11y,
      import: importPlugin,
      '@typescript-eslint': tseslint,
      eslintPluginPrettierRecommended: eslintPluginPrettierRecommended,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the react version
      },
    },
    rules: {
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'implicit-arrow-linebreak': 'off',
      'comma-dangle': 'off',
      'react-hooks/exhaustive-deps': 'off',
      indent: 'off',
      'no-trailing-spaces': 'off',
      'react/forbid-prop-types': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'dot-notation': 'off',
      'react/jsx-props-no-spreading': 'off',
      'import/no-cycle': 'off',
      'class-methods-use-this': 'off',
      'no-plusplus': 'off',
      'no-case-declarations': 'off',
      'no-else-return': 'off',
      'import/prefer-default-export': 'off',
      'react/no-array-index-key': 'off',
      'max-len': ['off', { code: 160 }],
      'no-console': ['error', { allow: ['debug', 'error'] }],
      'security/detect-object-injection': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
      '@typescript-eslint/no-unused-vars': [
        'off',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'import/order': [
        'off',
        {
          pathGroups: [
            {
              pattern: '@material-ui/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@emotion/*',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@auth0/*',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          groups: ['builtin', 'external', 'internal', 'unknown', 'parent', 'sibling'],
        },
      ],
      '@next/next/no-img-element': 'off',
    },
    ignores: ['.config/*', 'types.ts'],
  },
];
