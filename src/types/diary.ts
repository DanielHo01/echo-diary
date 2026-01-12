// Diary Types

export type Mood = 'happy' | 'sad' | 'calm' | 'excited' | 'anxious' | 'neutral';

export interface InterviewQa {
  question: string;
  options?: string[];
  answer: string;
  timestamp: string;
}

export type DiaryStyle = 'warm' | 'poetic' | 'simple' | 'reflective';

export interface Diary {
  id: string;
  title: string;
  content: string;
  preview: string;
  tags: string[];
  mood: Mood;
  eventIds: string[];
  interviewHistory?: InterviewQa[];
  style: DiaryStyle;
  date: string; // YYYY-MM-DD format
  createdAt: string;
  updatedAt?: string;
}

export interface CreateDiaryInput {
  title: string;
  content: string;
  tags?: string[];
  mood?: Mood;
  eventIds: string[];
  interviewHistory?: InterviewQa[];
  style: DiaryStyle;
}

export interface UpdateDiaryInput {
  title?: string;
  content?: string;
  tags?: string[];
  mood?: Mood;
}
