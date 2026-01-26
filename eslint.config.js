import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  // 忽略文件
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '*.config.js',
      '*.config.ts',
      'coverage/**',
      '.vscode/**',
      '.idea/**',
      '*.min.js',
    ],
  },
  // 基础 JavaScript 推荐规则
  js.configs.recommended,
  // TypeScript 推荐规则
  ...tseslint.configs.recommended,
  // Vue3 推荐规则
  ...vue.configs['flat/recommended'],
  // Vue3 严格规则（可选，可根据团队需求调整）
  ...vue.configs['flat/strongly-recommended'],
  // 项目特定规则
  {
    files: ['**/*.{js,jsx,ts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      // Vue 特定规则
      'vue/multi-word-component-names': 'off', // 允许单字组件名
      'vue/no-v-html': 'warn', // 警告使用 v-html
      'vue/require-default-prop': 'warn', // 建议提供默认 prop
      'vue/require-explicit-emits': 'error', // 要求显式声明 emits
      'vue/no-unused-vars': 'error', // 未使用的变量
      'vue/no-unused-components': 'warn', // 未使用的组件
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
          ignores: [
            // Element Plus 组件使用 kebab-case
            '^el-',
            // Vue Router 组件
            '^router-',
          ],
        },
      ], // 组件名使用 PascalCase（第三方组件库除外）
      'vue/attribute-hyphenation': ['error', 'always'], // 属性使用 kebab-case
      'vue/v-on-event-hyphenation': ['error', 'always'], // 事件名使用 kebab-case
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ], // 自闭合标签
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3,
          multiline: 1,
        },
      ], // 每行最大属性数
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'ignore',
          multiline: 'below',
        },
      ], // 第一个属性换行规则

      // TypeScript 规则
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ], // 未使用的变量（允许 _ 前缀）
      '@typescript-eslint/no-explicit-any': 'warn', // 警告使用 any
      '@typescript-eslint/explicit-function-return-type': 'off', // 不强制显式返回类型
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 不强制模块边界类型
      '@typescript-eslint/no-non-null-assertion': 'warn', // 警告非空断言
      '@typescript-eslint/no-var-requires': 'error', // 禁止使用 require

      // 通用 JavaScript 规则
      'no-console': ['warn', { allow: ['warn', 'error'] }], // 允许 console.warn 和 console.error
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn', // 生产环境禁止 debugger
      'no-unused-vars': 'off', // 关闭基础规则，使用 TypeScript 版本
      'prefer-const': 'error', // 优先使用 const
      'no-var': 'error', // 禁止使用 var
      'eqeqeq': ['error', 'always', { null: 'ignore' }], // 必须使用 === 和 !==
      'curly': ['error', 'all'], // 必须使用大括号
      'no-eval': 'error', // 禁止使用 eval
      'no-implied-eval': 'error', // 禁止隐式 eval
      'no-new-wrappers': 'error', // 禁止 new String/Number/Boolean
      'no-throw-literal': 'error', // 禁止抛出字面量
      'prefer-promise-reject-errors': 'error', // Promise reject 必须使用 Error
      'no-return-await': 'off', // 关闭基础规则（TypeScript 中允许 return await）
    },
  },
  // Prettier 配置（必须放在最后，覆盖冲突的规则）
  prettier,
);

