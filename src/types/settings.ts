// Settings Types

export type Theme = 'dark' | 'light' | 'system';

export interface UserSettings {
  apiKey: string;
  theme: Theme;
  language: string;
  speechLanguage: string;
  autoSave: boolean;
  defaultDiaryStyle: 'warm' | 'poetic' | 'simple' | 'reflective';
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
  defaultDiaryStyle?: 'warm' | 'poetic' | 'simple' | 'reflective';
  notifications?: {
    dailyReminder?: boolean;
    reminderTime?: string;
  };
}
