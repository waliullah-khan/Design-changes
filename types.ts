export enum AppTab {
  CHAT = 'CHAT',
  THUMBNAILS = 'THUMBNAILS',
  MEDIA = 'MEDIA',
  BLOGS = 'BLOGS'
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Suggestion {
  label: string;
  prompt: string;
  category: 'payments' | 'social' | 'blog' | 'calendar' | 'contacts' | 'tasks' | 'documents' | 'surveys';
  icon: string;
}

export interface VideoIdea {
  title: string;
  prompt: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  status: 'Published' | 'Draft' | 'Scheduled';
  date: string;
  platform: string;
}

export interface MediaItem {
  id: string;
  type: 'video' | 'image';
  url: string; // Placeholder URL
  title: string;
  date: string;
  platform?: string;
}

export interface AppConfig {
  webhookUrl: string;
  sessionId: string;
}
