import '../global.css';
import '../i18n'; // Import i18n configuration

import { Stack } from 'expo-router';
import { useEffect } from 'react';

import { useLanguageStore } from '../store/language';

export default function RootLayout() {
  const { initializeLanguage } = useLanguageStore();

  // Initialize language on app start
  useEffect(() => {
    initializeLanguage();
  }, [initializeLanguage]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
