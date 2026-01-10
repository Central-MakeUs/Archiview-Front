import { defineConfig, globalIgnores } from 'eslint/config';
import base from '@archiview/eslint';
import boundaries from 'eslint-plugin-boundaries';
import path from 'path';

export default defineConfig([
  ...base,

  {
    // FSD
    files: ['**/src/**/*.{js,jsx,ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'pages', pattern: 'src/pages/**' },
        { type: 'widgets', pattern: 'src/widgets/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'shared', pattern: 'src/shared/**' },
        { type: 'mocks', pattern: 'src/mocks/**' },
      ],
      'boundaries/ignore': ['**/*.test.*', '**/*.spec.*'],
    },
    rules: {
      'boundaries/no-unknown-files': 'error',
      'boundaries/no-unknown': 'error',

      // 레이어 간 의존성 규칙
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'shared', allow: ['shared'] },
            { from: 'entities', allow: ['shared', 'entities'] },
            { from: 'features', allow: ['shared', 'entities', 'features'] },
            { from: 'widgets', allow: ['shared', 'entities', 'features', 'widgets'] },
            { from: 'pages', allow: ['shared', 'entities', 'features', 'widgets', 'pages'] },
            { from: 'app', allow: ['app', 'shared', 'entities', 'features', 'widgets', 'pages'] },
          ],
        },
      ],
    },

    // 리턴 타입 강제 끔
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
