// Event Types

export interface InterviewQa {
  question: string;
  options?: string[];
  answer: string;
  timestamp: string;
}

export type EventType = 'event' | 'interview';

export interface Event {
  id: string;
  timestamp: string;
  text: string;
  type: EventType;
  audioUrl?: string;
  audioText?: string;
  interviewHistory?: InterviewQa[];
  date: string; // YYYY-MM-DD format
  createdAt: string;
  updatedAt?: string;
}

export interface CreateEventInput {
  text: string;
  type?: EventType;
  audioUrl?: string;
  audioText?: string;
}

export interface UpdateEventInput {
  text?: string;
  audioUrl?: string;
  audioText?: string;
  interviewHistory?: InterviewQa[];
}

export type { InterviewQa };
