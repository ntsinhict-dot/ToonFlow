export enum AspectRatio {
  MOBILE_9_16 = '9:16 (Mobile/TikTok)',
  PC_16_9 = '16:9 (Youtube/PC)'
}

export enum MangaRule {
  KOMA_4 = '4-koma (4 Khung dọc)',
  WEBTOON = 'Webtoon Scroll (Cuộn vô tận)',
  MANGA_PAGE = 'Manga Page (Truyền thống)'
}

export enum ReadingDirection {
  LTR = 'Trái sang Phải',
  TTB = 'Trên xuống Dưới'
}

export interface StyleOption {
  id: string;
  name: string;
  category: string;
  promptModifier: string; // Hidden prompt addition
}

export interface StudioConfig {
  episodeCount: number;
  pagesPerEpisode: number;
  aspectRatio: AspectRatio;
  mangaRule: MangaRule;
  readingDirection: ReadingDirection;
  authorName: string;
  negativePrompt: string;
  storyIdea: string;
  referenceImage?: File | null;
}

export type PanelLayout = 'square' | 'wide' | 'tall';
export type BubblePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

export interface PanelData {
  id: number;
  description: string;
  dialogue: string;
  prompt: string; // The full prompt to copy
  layout?: PanelLayout;
  imageUrl?: string; // For simulation or generated result
  bubblePos?: BubblePosition;
}

export interface PageData {
  pageNumber: number;
  panels: PanelData[];
}

export interface EpisodeData {
  id: number;
  title: string;
  coverPrompt: string;
  pages: PageData[];
}

export interface GeneratedResult {
  title: string;
  episodes: EpisodeData[];
}

// Types for ConfigurationPanel.tsx
export enum Language {
  VIETNAMESE = 'vi',
  ENGLISH = 'en'
}

export enum ScriptProvider {
  GEMINI = 'gemini',
  OPENAI = 'openai'
}

export enum ScriptModel {
  GEMINI_FLASH = 'gemini-2.5-flash',
  GEMINI_PRO = 'gemini-3.0-pro'
}

export enum TTSProvider {
  GEMINI = 'gemini',
  ELEVENLABS = 'elevenlabs'
}

export enum TTSModel {
  GEMINI_TTS = 'gemini-tts'
}

export enum VoiceOption {
  PUCK = 'Puck',
  CHARON = 'Charon',
  KORE = 'Kore',
  FENRIR = 'Fenrir',
  ZEPHYR = 'Zephyr'
}

export interface AppConfig {
  language: Language;
  scriptProvider: ScriptProvider;
  scriptModel: ScriptModel;
  ttsProvider: TTSProvider;
  ttsModel: TTSModel;
  voice: VoiceOption;
  pageCount: number;
}

// Types for ComicDisplay.tsx
export interface GeneratedStoryPanel {
  panelNumber: number;
  imageUrl?: string;
  description: string;
  caption?: string;
  dialogue: string;
}

export interface GeneratedStory {
  title: string;
  panels: GeneratedStoryPanel[];
}