# 技术栈选型

## 核心依赖

| 依赖包 | 版本 | 用途 |
|-------|------|------|
| **核心框架** | | |
| react | ^19.0.0 | UI 框架 |
| react-dom | ^19.0.0 | DOM 渲染 |
| **构建工具** | | |
| vite | ^6.0.0 | 构建工具 |
| @vitejs/plugin-react | ^4.3.0 | React 插件 |
| **路由** | | |
| react-router | ^7.0.0 | 路由管理 |
| **样式** | | |
| tailwindcss | ^4.0.0 | 原子化 CSS |
| postcss | ^8.4.0 | CSS 处理 |
| autoprefixer | ^10.4.0 | CSS 前缀 |
| **UI 组件** | | |
| @headlessui/react | ^2.0.0 | 无样式组件 |
| lucide-react | ^0.400+ | 图标库 |
| **工具库** | | |
| date-fns | ^4.0.0 | 日期处理 |
| clsx | ^2.1.0 | 类名拼接 |
| tailwind-merge | ^2.3.0 | Tailwind 合并 |

## 开发依赖

| 依赖包 | 版本 | 用途 |
|-------|------|------|
| **类型系统** | | |
| typescript | ^5.6.0 | 类型系统 |
| @types/react | ^19.0.0 | React 类型 |
| @types/react-dom | ^19.0.0 | DOM 类型 |
| @types/node | ^20.0.0 | Node 类型 |
| **代码规范** | | |
| eslint | ^9.0.0 | 代码检查 |
| prettier | ^3.0.0 | 代码格式化 |
| @typescript-eslint/parser | ^7.0.0 | TypeScript ESLint 解析器 |
| @typescript-eslint/eslint-plugin | ^7.0.0 | TypeScript ESLint 规则 |
| eslint-config-prettier | ^9.0.0 | Prettier ESLint 兼容 |
| eslint-plugin-prettier | ^6.0.0 | Prettier ESLint 插件 |
| **Git Hooks** | | |
| husky | ^9.0.0 | Git Hooks 管理 |
| lint-staged | ^16.0.0 | Git 暂存文件检查 |
| @commitlint/cli | ^19.0.0 | Commit 信息检查 |
| @commitlint/config-conventional | ^19.0.0 | 传统提交规范 |
| **测试** | | |
| vitest | ^2.0.0 | 测试框架 |
| @testing-library/react | ^16.0.0 | React 测试库 |
| @testing-library/user-event | ^14.0.0 | 用户事件模拟 |
| **PWA** | | |
| vite-plugin-pwa | ^1.0.0 | PWA 插件 |

## API 服务

| 服务 | 提供商 | 用途 |
|-----|-------|------|
| AI 对话 | 硅基流动 DeepSeek-R1-0528-Qwen3-8B | 日记生成、采访问题 |
| 语音识别 | 硅基流动 SenseVoiceSmall | 语音转文字 |

## 包管理器

**pnpm**（推荐）

```bash
# 安装 pnpm
npm install -g pnpm

# 安装依赖
pnpm install

# 添加依赖
pnpm add <package>

# 添加开发依赖
pnpm add -D <package>
```

## Node.js 版本要求

- **最低版本**：Node.js 20.x LTS
- **推荐版本**：Node.js 20.x LTS 或 22.x

```bash
# 检查 Node.js 版本
node --version
```

## 安装命令汇总

### 核心依赖

```bash
pnpm add react-router@latest @headlessui/react lucide-react date-fns clsx tailwind-merge
```

### 构建工具

```bash
pnpm add -D tailwindcss@latest postcss autoprefixer @vitejs/plugin-react
```

### 类型系统

```bash
pnpm add -D typescript @types/react @types/react-dom @types/node
```

### 代码质量工具

```bash
pnpm add -D eslint prettier eslint-config-prettier eslint-plugin-prettier \
  @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Git Hooks

```bash
pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional
```

### 测试工具

```bash
pnpm add -D vitest @testing-library/react @testing-library/user-event
```

### PWA

```bash
pnpm add -D vite-plugin-pwa
```

## package.json 脚本

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:run": "vitest run",
    "test:ui": "vitest --ui",
    "prepare": "husky install"
  }
}
```
