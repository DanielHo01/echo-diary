# 数据模型

## Event（事件）

```typescript
// src/types/event.ts

export interface Event {
  id: string;                    // 唯一标识
  timestamp: ISO8601String;      // 创建时间
  text: string;                  // 事件描述
  type: 'event' | 'interview';   // 类型
  audioUrl?: string;             // 语音文件 URL（可选）
  audioText?: string;            // 语音识别结果（可选）
  interviewHistory?: InterviewQa[]; // 采访历史
  date: ISO8601Date;             // 所属日期 (YYYY-MM-DD)
  createdAt: ISO8601String;      // 记录创建时间
  updatedAt?: ISO8601String;     // 更新时间
}

export interface InterviewQa {
  question: string;              // 问题
  options?: string[];            // 选项（多选题）
  answer: string;                // 回答
  timestamp: ISO8601String;      // 回答时间
}
```

## Diary（日记）

```typescript
// src/types/diary.ts

export interface Diary {
  id: string;                    // 唯一标识
  title: string;                 // 标题
  content: string;               // 正文
  preview: string;               // 预览（100字以内）
  tags: string[];                // 标签数组
  mood: Mood;                    // 情绪
  eventIds: string[];            // 关联事件 ID
  interviewHistory?: InterviewQa[]; // 采访历史
  style: DiaryStyle;             // 生成风格
  date: ISO8601Date;             // 所属日期
  createdAt: ISO8601String;      // 创建时间
  updatedAt?: ISO8601String;     // 更新时间
}

export type Mood = 
  | 'happy' 
  | 'sad' 
  | 'calm' 
  | 'excited' 
  | 'anxious' 
  | 'neutral';

export type DiaryStyle = 
  | 'warm'      // 温暖
  | 'poetic'    // 诗意
  | 'simple'    // 简洁
  | 'reflective'; // 理性
```

## UserSettings（用户设置）

```typescript
// src/types/settings.ts

export interface UserSettings {
  apiKey: string;                // 硅基流动 API Key
  theme: 'dark' | 'light' | 'system'; // 主题
  language: string;              // 语言（预留）
  speechLanguage: string;        // 语音识别语言
  autoSave: boolean;             // 自动保存
  defaultDiaryStyle: DiaryStyle; // 默认日记风格
  notifications: {               // 通知设置
    dailyReminder: boolean;
    reminderTime?: string;
  };
}
```

## 数据类型导出

```typescript
// src/types/index.ts

export * from './event';
export * from './diary';
export * from './settings';
```

## 数据存储策略

| 数据类型 | 存储方式 | 存储 Key | 容量估算 |
|---------|---------|---------|---------|
| 日记列表 | localStorage | `echo_diaries_v2` | ~500KB (100篇日记) |
| 今日事件 | localStorage | `echo_events_today` | ~50KB |
| 用户设置 | localStorage | `echo_settings_v2` | ~1KB |
| 备份数据 | IndexedDB | `echo_backup` | ~5MB |

## 示例数据

### Event 示例

```json
{
  "id": "evt_20260112_001",
  "timestamp": "2026-01-12T10:30:00Z",
  "text": "今天早上在公园跑步5公里",
  "type": "event",
  "audioUrl": "/audio/evt_001.webm",
  "audioText": "今天早上在公园跑步五公里",
  "date": "2026-01-12",
  "createdAt": "2026-01-12T10:30:00Z",
  "updatedAt": "2026-01-12T10:35:00Z",
  "interviewHistory": [
    {
      "question": "你今天早上为什么选择去公园跑步？",
      "answer": "想要开始健康的生活方式",
      "timestamp": "2026-01-12T10:40:00Z"
    }
  ]
}
```

### Diary 示例

```json
{
  "id": "diary_20260112_001",
  "title": "新的一天，从运动开始",
  "content": "今天早上，我做了一个重要的决定...",
  "preview": "今天早上，我做了一个重要的决定...",
  "tags": ["运动", "健康", "晨跑"],
  "mood": "happy",
  "eventIds": ["evt_20260112_001"],
  "style": "warm",
  "date": "2026-01-12",
  "createdAt": "2026-01-12T11:00:00Z",
  "updatedAt": "2026-01-12T11:30:00Z"
}
```

### UserSettings 示例

```json
{
  "apiKey": "sk-xxx",
  "theme": "dark",
  "language": "zh-CN",
  "speechLanguage": "zh-CN",
  "autoSave": true,
  "defaultDiaryStyle": "warm",
  "notifications": {
    "dailyReminder": true,
    "reminderTime": "21:00"
  }
}
```
