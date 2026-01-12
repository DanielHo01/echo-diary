# 开发规范

## Git 工作流

```
main (生产分支)
  │
  ├── develop (开发分支)
  │     │
  │     ├── feature/timeline-ui
  │     ├── feature/ai-interview
  │     └── feature/diary-search
  │
  └── hotfix/xxx (紧急修复)
```

## 提交规范

```
<type>(<scope>): <subject>

feat(ui): 添加时间轴组件
fix(api): 修复语音识别超时问题
docs(readme): 更新快速开始指南
refactor(services): 重构存储服务
test: 添加日记生成测试
```

### Type 类型

| 类型 | 说明 |
|-----|------|
| feat | 新功能 |
| fix | Bug 修复 |
| docs | 文档更新 |
| style | 代码格式（不影响功能） |
| refactor | 重构 |
| test | 测试相关 |
| chore | 构建/工具相关 |

## 代码规范

### React 组件

```tsx
// Good: 使用函数组件 + Hooks
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface EventCardProps {
  event: Event;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    console.log('EventCard mounted');
  }, []);
  
  return (
    <div className="card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <div className="actions">
        <Button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '收起' : '展开'}
        </Button>
      </div>
    </div>
  );
}
```

### 样式

```tsx
// Good: Tailwind 类名按功能分组
<div 
  className="
    flex flex-col items-center justify-center
    p-4 m-2
    bg-gray-800 rounded-lg
    hover:bg-gray-700
    transition-colors
  "
>
  Content
</div>
```

### 命名规范

| 类型 | 规则 | 示例 |
|-----|------|-----|
| 组件 | PascalCase | `EventCard`, `DiaryEditor` |
| 函数/变量 | camelCase | `handleSubmit`, `eventList` |
| 常量 | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
| 类型/接口 | PascalCase | `UserSettings`, `EventProps` |
| 文件 | kebab-case | `event-card.tsx`, `api-client.ts` |

### 注释规范

```typescript
// Good: 复杂逻辑需要注释
/**
 * 计算两个日期之间的天数差
 * @param startDate 起始日期
 * @param endDate 结束日期
 * @returns 天数差
 */
function getDaysBetween(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
```

## 目录结构规范

```
src/
├── components/           # 可复用组件
│   ├── ui/              # 原子组件（Button, Input, Card...）
│   │   └── Button/
│   │       ├── Button.tsx
│   │       ├── Button.test.tsx
│   │       └── index.ts
│   ├── layout/          # 布局组件
│   └── features/        # 功能组件
├── pages/               # 页面组件
├── contexts/            # Context providers
├── hooks/               # 自定义 Hooks
│   └── useEvent.ts
├── services/            # API 服务层
│   ├── api/
│   └── storage/
├── utils/               # 工具函数
├── types/               # TypeScript 类型定义
├── styles/              # 全局样式
├── App.tsx              # 路由配置
└── main.tsx             # 应用入口
```

## 测试策略

### 测试分层

```
┌─────────────────────────────────────────────────────┐
│                    测试金字塔                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│                    ┌─────────┐                       │
│                    │  E2E    │  10%                 │
│                    │  测试    │                      │
│              ┌─────────────────────┐                │
│              │     集成测试         │  30%          │
│              │  (React Testing     │                │
│              │   Library)          │                │
│        ┌─────────────────────────────┐             │
│        │         单元测试             │  60%        │
│        │      (Vitest + Hooks)       │             │
│        └─────────────────────────────┘             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 测试范围

| 类型 | 覆盖范围 | 工具 |
|-----|---------|-----|
| 单元测试 | hooks、工具函数、services | Vitest |
| 组件测试 | UI 组件渲染、交互 | RTL |
| 集成测试 | 核心用户流程 | Playwright |
| E2E 测试 | 完整用户流程 | Playwright |

### 测试用例优先级

- **P0**：核心功能（添加事件、生成日记、语音识别）
- **P1**：重要功能（日记编辑、搜索、设置）
- **P2**：边缘功能（数据导入导出、主题切换）

## 代码质量工具配置

### ESLint 配置

```javascript
// .eslintrc.cjs
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
}
```

### Prettier 配置

```json
// .prettierrc
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5",
  "jsxSingleQuote": true,
  "bracketSpacing": true
}
```

### Husky + lint-staged

```json
// package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
```

```bash
# .husky/pre-commit
npx lint-staged

# .husky/commit-msg
npx --no -- commitlint --edit "$1"
```

## 性能要求

| 指标 | 目标值 | 测量方式 |
|-----|-------|---------|
| FCP (首次内容绘制) | < 1s | Lighthouse |
| LCP (最大内容绘制) | < 2s | Lighthouse |
| FID (首次输入延迟) | < 100ms | Lighthouse |
| CLS (累积布局偏移) | < 0.1 | Lighthouse |
| 包体积 (gzip) | < 200KB | 构建分析 |
| 首屏加载时间 | < 3s | 实际测试 |

## 优化策略

1. **代码分割**：路由级别懒加载
2. **图片优化**：使用 WebP 格式，懒加载
3. **音频处理**：录音时压缩，识别后清理
4. **存储优化**：IndexedDB 大数据，localStorage 小数据
5. **缓存策略**：PWA 离线缓存
