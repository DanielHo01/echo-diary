// Settings Types

export type Theme = 'dark' | 'light' | 'system';
export type DiaryStyle = 'warm' | 'poetic' | 'simple' | 'reflective';

export interface UserSettings {
  apiKey: string;
  theme: Theme;
  language: string;
  speechLanguage: string;
  autoSave: boolean;
  defaultDiaryStyle: DiaryStyle;
  notifications: {
    dailyReminder: boolean;
    reminderTime?: string;
  };
}

export interface UpdateSettingsInput {
  apiKey?: string;
  theme?: Theme;
  language?: string;
  speechLanguage?: string;
  autoSave?: boolean;
  defaultDiaryStyle?: DiaryStyle;
  notifications?: {
    dailyReminder?: boolean;
    reminderTime?: string;
  };
}

export type { Theme };
export type { DiaryStyle };
