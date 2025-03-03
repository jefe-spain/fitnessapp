import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18next from 'i18next';
import { create } from 'zustand';

import { LanguageState, SupportedLanguage } from './types';

const LANGUAGE_STORAGE_KEY = 'user-language';

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: 'en',
  isInitialized: false,

  setLanguage: async (language: SupportedLanguage) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      i18next.changeLanguage(language);
      set({ language });
    } catch (error) {
      console.error('Failed to set language:', error);
    }
  },

  initializeLanguage: async () => {
    try {
      // Try to get saved language preference
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
        i18next.changeLanguage(savedLanguage);
        set({ language: savedLanguage as SupportedLanguage, isInitialized: true });
        return;
      }

      // If no saved preference, use device language
      const deviceLocale = Localization.getLocales()[0].languageCode;
      const supportedLocale: SupportedLanguage = deviceLocale === 'es' ? 'es' : 'en'; // Default to English if not Spanish

      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, supportedLocale);
      i18next.changeLanguage(supportedLocale);
      set({ language: supportedLocale, isInitialized: true });
    } catch (error) {
      console.error('Failed to initialize language:', error);
      // Fallback to English
      i18next.changeLanguage('en');
      set({ language: 'en', isInitialized: true });
    }
  }
}));
