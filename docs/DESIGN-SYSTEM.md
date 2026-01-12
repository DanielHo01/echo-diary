# 设计系统

## 设计理念

- **简洁**：去除不必要的视觉元素
- **自然**：交互符合用户直觉
- **温度**：细节处体现人文关怀
- **高效**：减少操作步骤，快速完成任务

## 颜色系统

### 基础色

```css
:root {
  --color-primary: #6366f1;       /* 主色 */
  --color-primary-hover: #4f46e5; /* 主色悬停 */
  --color-primary-light: #e0e7ff; /* 主色浅色 */
}
```

### 语义色

```css
:root {
  --color-success: #22c55e;       /* 成功 */
  --color-warning: #f59e0b;       /* 警告 */
  --color-error: #ef4444;         /* 错误 */
  --color-info: #3b82f6;          /* 信息 */
}
```

### 情绪色

```css
:root {
  --color-mood-happy: #fbbf24;    /* 开心 */
  --color-mood-sad: #60a5fa;      /* 悲伤 */
  --color-mood-calm: #a78bfa;     /* 平静 */
  --color-mood-excited: #f472b6;  /* 兴奋 */
  --color-mood-anxious: #fb7185;  /* 焦虑 */
  --color-mood-neutral: #a3a3a3;  /* 中性 */
}
```

### 中性色（暗色主题）

```css
:root {
  --color-bg: #0f0f0f;            /* 背景色 */
  --color-bg-secondary: #1a1a1a;  /* 次要背景 */
  --color-bg-tertiary: #262626;   /* 第三背景 */
  --color-border: #333333;        /* 边框色 */
  --color-text: #f5f5f5;          /* 文字色 */
  --color-text-secondary: #a3a3a3;/* 次要文字 */
  --color-text-muted: #737373;    /* 弱化文字 */
}
```

## 字体系统

```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-base: 1rem;    /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
}
```

## 间距系统

```css
:root {
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-5: 1.25rem;  /* 20px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-8: 2rem;     /* 32px */
  --spacing-10: 2.5rem;  /* 40px */
  --spacing-12: 3rem;    /* 48px */
}
```

## 圆角系统

```css
:root {
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-full: 9999px;  /* 圆形 */
}
```

## 阴影系统

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

## 响应式断点

```css
/* Tailwind 默认断点 */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

## 组件设计规范

### 按钮 (Button)

| 类型 | 用途 | 样式 |
|-----|------|-----|
| primary | 主要操作 | 主色背景，白色文字 |
| secondary | 次要操作 | 边框样式，灰色背景 |
| ghost | 文字按钮 | 无背景，悬停浅灰 |
| danger | 删除等危险操作 | 红色背景/文字 |

**示例**：

```tsx
// src/components/ui/Button/Button.tsx

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
  
  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500',
    secondary: 'border border-gray-600 hover:bg-gray-800 text-gray-200 focus:ring-gray-500',
    ghost: 'text-gray-400 hover:text-white hover:bg-gray-800 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### 输入框 (Input)

- 圆角-md
- 暗色背景
- 聚焦时主色边框
- 支持图标前缀

**示例**：

```tsx
// src/components/ui/Input/Input.tsx

interface InputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
}

export function Input({
  label,
  placeholder,
  error,
  icon,
  value,
  onChange,
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          type="text"
          className={`
            w-full rounded-lg bg-gray-800 border border-gray-700 text-white
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2
            ${error ? 'border-red-500' : ''}
          `}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
```

### 卡片 (Card)

- 圆角-lg
- 深色背景
- 悬停时轻微提升效果

**示例**：

```tsx
// src/components/ui/Card/Card.tsx

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  hover = false,
  onClick,
}: CardProps) {
  return (
    <div
      className={`
        bg-gray-800 rounded-xl p-6
        ${hover ? 'hover:bg-gray-750 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
```

## Tailwind CSS 4.x 配置

```css
/* src/styles/index.css */

@import "tailwindcss";

@theme {
  /* 颜色系统 */
  --color-primary: #6366f1;
  --color-primary-hover: #4f46e5;
  --color-primary-light: #e0e7ff;
  
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  --color-mood-happy: #fbbf24;
  --color-mood-sad: #60a5fa;
  --color-mood-calm: #a78bfa;
  --color-mood-excited: #f472b6;
  --color-mood-anxious: #fb7185;
  
  --color-bg: #0f0f0f;
  --color-bg-secondary: #1a1a1a;
  --color-bg-tertiary: #262626;
  --color-border: #333333;
  --color-text: #f5f5f5;
  --color-text-secondary: #a3a3a3;
  --color-text-muted: #737373;

  /* 字体系统 */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* 字体大小 */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;

  /* 间距系统 */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;

  /* 圆角系统 */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  /* 阴影系统 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* 全局样式 */
@layer base {
  body {
    @apply bg-gray-900 text-gray-100 antialiased;
  }
}
```
