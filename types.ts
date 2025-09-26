export enum ToolOption {
  Image = 'Image',
  Video = 'Video',
  Website = 'Website',
}

export type ArtStyle = 'none' | 'anime' | 'realistic' | 'hyperrealistic' | 'cartoon' | '3d' | '2d' | 'art';
export type WebsiteCategory = 'none' | 'ai' | 'product' | 'tools' | 'portfolio' | 'ecommerce';

export interface HistoryEntry {
  id: string;
  timestamp: number;
  idea: string;
  prompt: string; // The generated prompt
  tool: ToolOption; // The tool used for this prompt
  style?: ArtStyle;
  category?: WebsiteCategory;
}