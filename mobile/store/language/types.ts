export type SupportedLanguage = 'en' | 'es';

export interface LanguageState {
  language: SupportedLanguage;
  isInitialized: boolean;
  setLanguage: (language: SupportedLanguage) => Promise<void>;
  initializeLanguage: () => Promise<void>;
}

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];
