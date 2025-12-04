import { Suggestion, VideoIdea, BlogPost, MediaItem } from './types';

// NOTE: Replace with your actual N8N Webhook URL
export const WEBHOOK_URL = 'https://YOUR_N8N_WEBHOOK_URL_HERE';

export const VIDEO_IDEAS: VideoIdea[] = [
  { title: "Daily Tip", prompt: "Create a 20-30 second video sharing one useful tip for customers of a [business type] business...", icon: "💡" },
  { title: "Update", prompt: "Create a short announcement video for a [business type] business about...", icon: "📢" },
  { title: "Meet Team", prompt: "Create a 20-30 second introduction video for the owner or team...", icon: "👋" },
  { title: "Q&A", prompt: "Create a video answering the customer question: [insert question]...", icon: "❓" },
  { title: "Promo", prompt: "Create a short promotional video explaining the current offer...", icon: "🎁" },
  { title: "Services", prompt: "Create a simple explainer video describing the service...", icon: "📋" },
];

export const SUGGESTIONS: Suggestion[] = [
  { label: "Create Invoice", prompt: "Create and send an invoice to [contact name] for $[amount]...", category: "payments", icon: "💳" },
  { label: "Facebook Post", prompt: "Create a Facebook post about [topic]...", category: "social", icon: "fb" },
  { label: "Instagram Post", prompt: "Create an Instagram post with caption...", category: "social", icon: "ig" },
  { label: "New Blog", prompt: "Create a new blog post titled...", category: "blog", icon: "📝" },
  { label: "Schedule Meeting", prompt: "Schedule an appointment with...", category: "calendar", icon: "🗓️" },
  { label: "Add Contact", prompt: "Add a new contact named...", category: "contacts", icon: "👤" },
];

// Placeholder Data for UI visualization
export const MOCK_BLOGS: BlogPost[] = [
  { id: '1', title: "10 Tips for Business Growth", status: "Published", date: "Oct 24, 2023", platform: "Wordpress" },
  { id: '2', title: "Q4 Marketing Strategies", status: "Draft", date: "Nov 01, 2023", platform: "Webflow" },
  { id: '3', title: "Customer Retention 101", status: "Scheduled", date: "Nov 15, 2023", platform: "Wordpress" },
];

export const MOCK_MEDIA: MediaItem[] = [
  { id: '1', type: 'video', url: 'https://picsum.photos/400/225', title: 'Product Launch Teaser', date: '2 days ago', platform: 'TikTok' },
  { id: '2', type: 'image', url: 'https://picsum.photos/400/400', title: 'Instagram Carousel P1', date: '3 days ago', platform: 'Instagram' },
  { id: '3', type: 'image', url: 'https://picsum.photos/400/401', title: 'Instagram Carousel P2', date: '3 days ago', platform: 'Instagram' },
  { id: '4', type: 'video', url: 'https://picsum.photos/400/226', title: 'Behind the Scenes', date: '1 week ago', platform: 'YouTube Shorts' },
  { id: '5', type: 'image', url: 'https://picsum.photos/400/402', title: 'Quote of the Day', date: '1 week ago', platform: 'LinkedIn' },
];

export const MOCK_THUMBNAILS: string[] = [
  'https://picsum.photos/300/169?random=1',
  'https://picsum.photos/300/169?random=2',
  'https://picsum.photos/300/169?random=3',
  'https://picsum.photos/300/169?random=4',
  'https://picsum.photos/300/169?random=5',
  'https://picsum.photos/300/169?random=6',
];
