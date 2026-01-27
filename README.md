# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## 📋 代码质量工具

本项目已配置代码质量检查工具，确保代码风格一致性：

- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **Husky**: Git hooks 管理
- **lint-staged**: 提交前自动检查和格式化

### 使用说明

详细配置和使用说明请查看：[Husky + Lint-staged 配置说明](./docs/HUSKY_LINT_STAGED.md)

### 快速开始

```bash
# 安装依赖（会自动初始化 Husky）
npm install

# 检查代码
npm run lint

# 自动修复 ESLint 问题
npm run lint:fix

# 格式化代码
npm run format
```

提交代码时，Husky 会自动运行 lint-staged，对暂存的文件进行检查和格式化。

### 测试用例

项目中包含一个测试文件 `src/test-eslint-error.ts`，用于验证当代码包含 ESLint 错误时，Git 提交会被阻止。

**快速测试：**

```bash
# 1. 添加测试文件
git add src/test-eslint-error.ts

# 2. 尝试提交（应该被阻止）
git commit -m "test: 测试 ESLint 错误"

# 3. 如果提交失败并显示错误信息，说明配置正常 ✅
```

详细测试说明请查看：[ESLint 错误阻止提交测试用例](./docs/TEST_ESLINT_ERROR.md)
