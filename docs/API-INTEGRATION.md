# API 集成规格

## 硅基流动 API

### 1. AI 对话 API

```typescript
// POST https://api.siliconflow.cn/v1/chat/completions

interface ChatCompletionRequest {
  model: string;                 // "deepseek-ai/DeepSeek-R1-0528-Qwen3-8B"
  messages: Message[];
  temperature?: number;          // 默认 0.5
  max_tokens?: number;           // 默认 4096
  stream?: boolean;              // 默认 false
}

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletionResponse {
  id: string;
  object: 'chat.completion';
  created: number;
  model: string;
  choices: {
    index: number;
    message: Message;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
```

### 2. 语音识别 API

```typescript
// POST https://api.siliconflow.cn/v1/audio/transcriptions

interface TranscribeRequest {
  file: File;                    // 音频文件 (webm, wav, mp3)
  model: string;                 // "FunAudioLLM/SenseVoiceSmall"
  language?: string;             // 语言，"auto" 自动检测
  prompt?: string;               // 可选的提示词
}

interface TranscribeResponse {
  text: string;                  // 识别结果
}
```

## Prompt 设计规范

### 1. 生成采访问题

```
角色：你是一位温暖而专业的生活采访者
输入：用户今日事件记录
输出：3-4 个采访问题 + 简短选项
风格：友好、具体、循序渐进
```

**示例 Prompt**：

```typescript
const generateInterviewQuestions = (events: Event[]): string => {
  const eventTexts = events.map(e => e.text).join('\n');
  
  return `
你是一位温暖而专业的生活采访者。用户今天记录了以下事件：

${eventTexts}

请基于这些事件，生成 3-4 个采访问题，帮助用户深入挖掘这些经历的细节和感受。

要求：
1. 问题要友好、具体、循序渐进
2. 每个问题提供 3-4 个简短选项
3. 至少包含一个开放性问题

请以 JSON 格式输出：
[
  {
    "question": "问题内容",
    "options": ["选项1", "选项2", "选项3"]
  }
]
`;
};
```

### 2. 生成日记

```
角色：你是一位诚实可靠的生活记录者
输入：事件记录 + 采访历史
输出：结构化日记（标题 + 正文 + 标签 + 情绪）
规则：只使用用户提供的信息，绝不编造
风格：可配置（温暖/诗意/简洁/理性）
```

**示例 Prompt**：

```typescript
const generateDiary = (
  events: Event[], 
  interviewHistory: InterviewQa[],
  style: DiaryStyle
): string => {
  const styleInstructions = {
    warm: "温暖、亲切、富有情感",
    poetic: "诗意、优美、富有想象力",
    simple: "简洁、清晰、直接明了",
    reflective: "理性、深思、富有洞察"
  };
  
  const eventTexts = events.map(e => e.text).join('\n');
  const interviewQa = interviewHistory
    .map(qa => `Q: ${qa.question}\nA: ${qa.answer}`)
    .join('\n');
  
  return `
你是一位诚实可靠的生活记录者，写作风格：${styleInstructions[style]}。

根据以下信息，生成一篇结构化的日记：

## 事件记录：
${eventTexts}

## 采访记录：
${interviewQa}

要求：
1. 只使用用户提供的信息，绝不编造
2. 生成标题（简洁有力）
3. 生成正文（200-500字）
4. 生成 2-4 个标签
5. 判断情绪（happy/sad/calm/excited/anxious/neutral）

请以 JSON 格式输出：
{
  "title": "日记标题",
  "content": "日记正文...",
  "tags": ["标签1", "标签2"],
  "mood": "happy"
}
`;
};
```

## AI Service 实现

```typescript
// src/services/api/siliconflow.ts

import type { Event, InterviewQa, DiaryStyle } from '@/types';

const API_BASE_URL = 'https://api.siliconflow.cn/v1';

interface SiliconFlowConfig {
  apiKey: string;
}

export class SiliconFlowService {
  private apiKey: string;
  
  constructor(config: SiliconFlowConfig) {
    this.apiKey = config.apiKey;
  }
  
  private async chatCompletion(messages: { role: string; content: string }[]) {
    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-R1-0528-Qwen3-8B',
        messages,
        temperature: 0.5,
        max_tokens: 4096,
        stream: false,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  async generateInterviewQuestions(events: Event[]) {
    const messages = [
      {
        role: 'system',
        content: '你是一位温暖而专业的生活采访者。'
      },
      {
        role: 'user',
        content: this.buildInterviewPrompt(events)
      }
    ];
    
    const response = await this.chatCompletion(messages);
    return JSON.parse(response.choices[0].message.content);
  }
  
  async generateDiary(
    events: Event[],
    interviewHistory: InterviewQa[],
    style: DiaryStyle
  ) {
    const messages = [
      {
        role: 'system',
        content: '你是一位诚实可靠的生活记录者。'
      },
      {
        role: 'user',
        content: this.buildDiaryPrompt(events, interviewHistory, style)
      }
    ];
    
    const response = await this.chatCompletion(messages);
    return JSON.parse(response.choices[0].message.content);
  }
  
  private buildInterviewPrompt(events: Event[]): string {
    const eventTexts = events.map(e => e.text).join('\n');
    return `用户今天记录了以下事件：\n${eventTexts}\n\n请生成 3-4 个采访问题。`;
  }
  
  private buildDiaryPrompt(
    events: Event[],
    interviewHistory: InterviewQa[],
    style: DiaryStyle
  ): string {
    const eventTexts = events.map(e => e.text).join('\n');
    const interviewQa = interviewHistory
      .map(qa => `Q: ${qa.question}\nA: ${qa.answer}`)
      .join('\n');
    return `事件：${eventTexts}\n采访：${interviewQa}\n风格：${style}`;
  }
}
```

## Speech Service 实现

```typescript
// src/services/api/speech.ts

interface SpeechConfig {
  apiKey: string;
}

export class SpeechService {
  private apiKey: string;
  private baseUrl = 'https://api.siliconflow.cn/v1/audio/transcriptions';
  
  constructor(config: SpeechConfig) {
    this.apiKey = config.apiKey;
  }
  
  async transcribe(audioFile: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('model', 'FunAudioLLM/SenseVoiceSmall');
    formData.append('language', 'auto');
    
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Speech API Error: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.text;
  }
}
```

## 错误处理

```typescript
// src/services/api/errors.ts

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const handleAPIError = (error: unknown): APIError => {
  if (error instanceof APIError) {
    return error;
  }
  
  if (error instanceof Error) {
    // 处理 fetch 错误
    if (error.message.includes('Failed to fetch')) {
      return new APIError('网络连接失败', 0, 'NETWORK_ERROR');
    }
    
    // 处理 API 错误
    if (error.message.includes('401')) {
      return new APIError('API Key 无效', 401, 'INVALID_API_KEY');
    }
    
    if (error.message.includes('429')) {
      return new APIError('请求频率超限', 429, 'RATE_LIMIT');
    }
  }
  
  return new APIError('未知错误', 0, 'UNKNOWN_ERROR');
};
```
