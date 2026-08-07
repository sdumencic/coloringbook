import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import noBarrelFiles from 'eslint-plugin-no-barrel-files'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores([
    'build',
    'dist',
    'vite.config.ts',
    'coverage',
    '**/__mocks__',
    'knip.config.ts',
    '**/*.spec.{ts,tsx}',
    '**/*.test.{ts,tsx}',
    'src/firebase.config.js'
  ]),
  ...(noBarrelFiles.configs['flat/recommended'] as any),
  js.configs.recommended,
  tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  reactHooks.configs.flat.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactRefresh.configs.vite,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json',
          alwaysTryTypes: true
        }
      },
      react: {
        version: '19'
      }
    },
    languageOptions: {
      ecmaVersion: 12,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.builtin,
        Node: true,
        JSX: true
      }
    },
    rules: {
      // Import
      'import/extensions': 'off',
      // React
      'react/no-unescaped-entities': 'off',
      'react/jsx-no-literals': 'error',
      // #region TYPESCRIPT ------------------------------------------------------------
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      // Naming Conventions for Types, Interfaces and Enums
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          prefix: ['T']
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I']
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
          prefix: ['E']
        }
      ]
      // #endregion TYPESCRIPT ---------------------------------------------------------
    }
  },
  eslintPluginPrettierRecommended
])
