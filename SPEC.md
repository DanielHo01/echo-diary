# 回响 Echo Diary - 项目规范文档

> 版本：v2.1  
> 创建日期：2026-01-12  
> 最后更新：2026-01-12  
> 状态：开发中

---

## 目录

1. [项目概述](./docs/PROJECT.md)
2. [技术架构](./docs/ARCHITECTURE.md)
3. [技术栈选型](./docs/TECH-STACK.md)
4. [数据模型](./docs/DATA-MODEL.md)
5. [API 集成](./docs/API-INTEGRATION.md)
6. [设计系统](./docs/DESIGN-SYSTEM.md)
7. [开发规范](./docs/DEVELOPMENT-GUIDE.md)
8. [实施计划](./docs/IMPLEMENTATION-PLAN.md)

---

## 快速概览

### 产品愿景

**回响 Echo Diary** 是一款基于 AI 的个人日记应用，通过简单的事件记录和智能采访，帮助用户生成有温度的每日日记。

### 核心功能

| 功能模块 | 功能点 | 优先级 |
|---------|-------|-------|
| **事件记录** | 添加事件（文字/语音）、时间轴展示 | P0 |
| **AI 采访** | 基于事件生成采访问题、选项交互 | P0 |
| **日记生成** | 一键生成、多风格选择、保存历史 | P0 |
| **日记列表** | 卡片网格展示、日期筛选、标签搜索 | P1 |
| **数据管理** | 数据导出/导入、本地备份 | P2 |

### 技术栈

| 层级 | 技术选型 |
|------|---------|
| 框架 | React 19 + Vite 6 |
| 路由 | React Router 7 |
| 状态管理 | React Context + useReducer |
| 样式 | Tailwind CSS 4.x |
| UI 组件 | Headless UI |
| 图标 | Lucide React |
| 日期处理 | date-fns |
| 语音识别 | 硅基流动 SenseVoiceSmall API |
| AI 对话 | 硅基流动 DeepSeek-R1-0528-Qwen3-8B |
| 数据存储 | localStorage + IndexedDB |
| PWA | vite-plugin-pwa |
| 代码规范 | ESLint + Prettier + Husky |
| 测试 | Vitest + React Testing Library |

### 实施计划

#### MVP（最小可行产品）

**目标**：快速验证核心功能

| 阶段 | 功能 | 预计工时 |
|-----|------|---------|
| **P0 - 核心功能** | | |
| 事件记录 | 添加事件、时间轴展示、编辑 | 1 天 |
| AI 采访 | 问题生成、选项交互 | 0.5 天 |
| 日记生成 | 基于事件+采访生成日记 | 1 天 |
| **P1 - 重要功能** | | |
| 语音识别 | 语音输入事件 | 0.5 天 |
| 日志保存 | 保存到 localStorage | 0.5 天 |
| 日记列表 | 查看历史日记 | 0.5 天 |

#### 增强功能（后续阶段）

| 功能 | 优先级 | 预计工时 |
|-----|--------|---------|
| 日记详情页面 | P1 | 1 天 |
| 主题切换 | P1 | 1 天 |
| 数据导出 | P2 | 1 天 |
| 追问机制 | P2 | 2 天 |
| 标签系统 | P2 | 2 天 |
| 搜索功能 | P2 | 2 天 |

### 项目结构

```
echo-diary/
├── .github/
│   └── workflows/           # CI/CD 配置
├── docs/                    # 文档
├── public/
│   └── icons/               # PWA 图标
├── src/
│   ├── components/          # 可复用组件
│   │   ├── ui/             # 原子组件
│   │   ├── layout/         # 布局组件
│   │   └── features/       # 功能组件
│   ├── pages/              # 页面组件
│   ├── contexts/           # Context providers
│   ├── hooks/              # 自定义 Hooks
│   ├── services/           # API 服务层
│   ├── utils/              # 工具函数
│   ├── types/              # TypeScript 类型
│   ├── styles/             # 全局样式
│   ├── App.tsx             # 路由配置
│   └── main.tsx            # 应用入口
├── tests/                  # 测试文件
├── .eslintrc.cjs           # ESLint 配置
├── .prettierrc             # Prettier 配置
├── tailwind.config.js      # Tailwind 配置
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
├── package.json
└── README.md
```

### 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 代码检查
pnpm lint

# 类型检查
pnpm type-check

# 测试
pnpm test

# 构建
pnpm build
```

### 贡献指南

#### 提交规范

```
<type>(<scope>): <subject>

feat(ui): 添加时间轴组件
fix(api): 修复语音识别超时问题
docs(readme): 更新快速开始指南
refactor(services): 重构存储服务
test: 添加日记生成测试
```

#### 开发流程

1. 创建功能分支：`feature/xxx`
2. 提交代码：`git commit -m "feat: xxx"`
3. 推送分支：`git push origin feature/xxx`
4. 创建 Pull Request

---

## 文档索引

| 文档 | 说明 |
|-----|------|
| [PROJECT.md](./docs/PROJECT.md) | 产品愿景、用户场景、核心价值 |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | 架构图、系统设计、技术选型理由 |
| [TECH-STACK.md](./docs/TECH-STACK.md) | 详细的技术栈说明和版本要求 |
| [DATA-MODEL.md](./docs/DATA-MODEL.md) | Event、Diary、Settings 数据模型定义 |
| [API-INTEGRATION.md](./docs/API-INTEGRATION.md) | 硅基流动 API 集成和 Prompt 设计 |
| [DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) | 颜色、字体、间距、组件设计规范 |
| [DEVELOPMENT-GUIDE.md](./docs/DEVELOPMENT-GUIDE.md) | Git 工作流、代码规范、测试策略 |
| [IMPLEMENTATION-PLAN.md](./docs/IMPLEMENTATION-PLAN.md) | 详细的实施计划和里程碑 |

---

> 本文档为初稿，欢迎讨论和补充。  
> 文档状态：开发中
