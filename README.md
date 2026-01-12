# 回响 Echo Diary

> 基于 AI 的个人日记应用

## 简介

**回响 Echo Diary** 是一款基于 AI 的个人日记应用，通过简单的事件记录和智能采访，帮助用户生成有温度的每日日记。

## 功能特性

- 📝 **事件记录** - 支持文字和语音记录生活点滴
- 🤖 **AI 采访** - 基于事件智能生成采访问题
- 📖 **日记生成** - 一键生成结构化、有情感的日记
- 🎨 **多风格选择** - 温暖、诗意、简洁、理性多种风格
- 📅 **历史回顾** - 按日期查看和管理日记
- 🌙 **暗色主题** - 护眼设计，夜间使用更舒适

## 技术栈

- **React 19** + **Vite 6** - 现代前端框架和构建工具
- **React Router 7** - 路由管理
- **Tailwind CSS 4.x** - 原子化 CSS 样式
- **Headless UI** - 无样式组件库
- **TypeScript** - 类型安全
- **Vitest** - 单元测试
- **GitHub Actions** - CI/CD 自动化

## 快速开始

### 环境要求

- Node.js >= 20.x
- pnpm >= 10.x

### 安装依赖

```bash
# 安装依赖
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
pnpm dev
```

### 代码检查

```bash
# 运行 ESLint
pnpm lint

# 运行 Prettier 格式化
pnpm format

# 类型检查
pnpm type-check
```

### 测试

```bash
# 运行测试
pnpm test

# 运行测试（无 UI）
pnpm test:run
```

### 构建

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 项目结构

```
echo-diary/
├── .github/
│   └── workflows/           # CI/CD 配置
├── docs/                    # 项目文档
├── public/
│   └── icons/               # PWA 图标
├── src/
│   ├── components/          # 可复用组件
│   │   ├── ui/             # 原子组件（Button, Input, Card...）
│   │   ├── layout/         # 布局组件（Layout, Header, Sidebar...）
│   │   └── features/       # 功能组件（Timeline, DiaryEditor...）
│   ├── pages/              # 页面组件
│   ├── contexts/           # Context providers
│   ├── hooks/              # 自定义 Hooks
│   ├── services/           # API 服务层
│   ├── utils/              # 工具函数
│   ├── types/              # TypeScript 类型定义
│   ├── styles/             # 全局样式
│   ├── App.tsx             # 路由配置
│   └── main.tsx            # 应用入口
├── tests/                  # 测试文件
├── .eslintrc.cjs           # ESLint 配置
├── .prettierrc             # Prettier 配置
├── tailwind.config.js      # Tailwind CSS 配置
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
├── package.json
└── README.md
```

## 文档

- [项目概述](./docs/PROJECT.md)
- [技术架构](./docs/ARCHITECTURE.md)
- [技术栈选型](./docs/TECH-STACK.md)
- [数据模型](./docs/DATA-MODEL.md)
- [API 集成](./docs/API-INTEGRATION.md)
- [设计系统](./docs/DESIGN-SYSTEM.md)
- [开发规范](./docs/DEVELOPMENT-GUIDE.md)
- [实施计划](./docs/IMPLEMENTATION-PLAN.md)

## 贡献指南

### 提交规范

```
<type>(<scope>): <subject>

feat(ui): 添加时间轴组件
fix(api): 修复语音识别超时问题
docs(readme): 更新快速开始指南
```

### Type 类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具

## 许可证

MIT License

## 联系方式

- 项目地址：https://github.com/yourusername/echo-diary
- 问题反馈：https://github.com/yourusername/echo-diary/issues
