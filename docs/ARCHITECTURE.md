# 技术架构

## 架构图

```
┌─────────────────────────────────────────────────────────────┐
│                      用户设备 (Browser)                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   React SPA 应用                      │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐  │   │
│  │  │ Context  │ │  Pages   │ │Components│ │ Hooks  │  │   │
│  │  │  Store   │ │          │ │          │ │        │  │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └────────┘  │   │
│  │       │            │            │           │        │   │
│  │       ▼            ▼            ▼           ▼        │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │              Services Layer                    │  │   │
│  │  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │  │   │
│  │  │  │  AI    │ │ Speech │ │Storage │ │Export │  │  │   │
│  │  │  │ Service│ │ Service│ │ Service│ │ Service│  │  │   │
│  │  │  └────────┘ └────────┘ └────────┘ └────────┘  │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                                │
│                            ▼                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 外部 API 服务                         │   │
│  │  ┌────────────────────┐ ┌─────────────────────────┐  │   │
│  │  │ 硅基流动 AI API    │ │ 硅基流动 Speech API     │  │   │
│  │  │ (DeepSeek + 日记)  │ │ (SenseVoiceSmall)       │  │   │
│  │  └────────────────────┘ └─────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 层级说明

### 1. 用户界面层 (UI Layer)

**组件架构**：

```
src/components/
├── ui/               # 原子组件（可复用基础组件）
│   ├── Button/       # 按钮
│   ├── Input/        # 输入框
│   ├── Card/         # 卡片
│   ├── Modal/        # 模态框
│   └── Tabs/         # 标签页
├── layout/           # 布局组件
│   ├── Layout/       # 主布局
│   ├── Header/       # 顶部导航
│   ├── Sidebar/      # 侧边栏
│   └── MobileNav/    # 移动端导航
└── features/         # 功能组件
    ├── Timeline/     # 时间轴
    ├── EventCard/    # 事件卡片
    ├── InterviewPanel/  # AI 采访面板
    └── DiaryEditor/  # 日记编辑器
```

### 2. 页面层 (Pages Layer)

```
src/pages/
├── Home/             # 首页（时间轴）
├── Diaries/          # 日记列表
├── DiaryDetail/      # 日记详情
└── Settings/         # 设置页面
```

### 3. 状态管理层 (State Layer)

```
src/contexts/
├── AppContext.tsx    # 全局状态（主题、用户设置）
├── DiaryContext.tsx  # 日记数据
└── EventContext.tsx  # 事件数据
```

### 4. 业务逻辑层 (Services Layer)

```
src/services/
├── api/              # API 服务
│   ├── client.ts     # AI API 客户端
│   ├── speech.ts     # 语音识别服务
│   └── index.ts
├── storage/          # 存储服务
│   ├── localStorage.ts
│   ├── indexedDB.ts
│   └── index.ts
└── export/           # 导出服务
    └── dataExport.ts
```

### 5. 工具层 (Utils Layer)

```
src/utils/
├── formatters.ts     # 日期格式化
├── validators.ts     # 表单验证
└── constants.ts      # 常量定义
```

## 技术选型理由

### 核心框架：React 19 + Vite 6

**React 19**：
- 支持最新的并发特性
- 更好的性能优化
- 自动记忆化（React Compiler）

**Vite 6**：
- 极速的开发服务器启动
- 热模块替换（HMR）
- 优化的构建产物

### 路由管理：React Router 7

- React 官方推荐
- 支持数据加载和操作
- 类型安全的路由

### 状态管理：React Context + useReducer

- 轻量级方案
- 无需引入额外状态管理库
- 适合中小型应用

### 样式方案：Tailwind CSS 4.x

- 原子化 CSS，体积小
- 响应式设计友好
- 主题定制灵活
- CSS-first 配置（4.x 新特性）

### 数据存储策略

| 数据类型 | 存储方式 | 存储 Key | 容量估算 |
|---------|---------|---------|---------|
| 日记列表 | localStorage | `echo_diaries_v2` | ~500KB (100篇日记) |
| 今日事件 | localStorage | `echo_events_today` | ~50KB |
| 用户设置 | localStorage | `echo_settings_v2` | ~1KB |
| 备份数据 | IndexedDB | `echo_backup` | ~5MB |

### PWA 支持

- 离线访问
- 可安装到桌面/手机
- 推送通知（可选）
