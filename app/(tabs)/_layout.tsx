import { Feather } from '@expo/vector-icons';
import { useTranslation } from '@i18n/core';
import { Tabs, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNav } from '~/components/navigation/BottomNav';

export default function TabLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const navigateToSettings = useCallback(() => {
    router.push('/settings');
  }, [router]);

  return (
    <View className="relative flex-1">
      {/* Settings button positioned at the top */}
      <View
        className="absolute left-0 right-0 top-0 z-50 bg-transparent"
        style={{ paddingTop: insets.top }}>
        <View className="flex-row items-center justify-end px-5 py-2">
          <View className="flex-1" />
          <Pressable
            onPress={navigateToSettings}
            accessibilityLabel={t('common.settings.title')}
            accessibilityRole="button"
            className="mr-1 h-11 w-11 items-center justify-center rounded-full border border-gray-100 bg-white/90 shadow-sm"
            style={({ pressed }) => (pressed ? { opacity: 0.7 } : {})}>
            <Feather name="settings" size={22} color="#333" />
          </Pressable>
        </View>
      </View>

      {/* Tab navigation - hidden tabBar since we're using custom BottomNav */}
      <View className="flex-1">
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: 'none' } // Hide the default tab bar
          }}>
          <Tabs.Screen name="index" options={{ title: t('navigation.tabs.home') }} />
          <Tabs.Screen name="workout" options={{ title: t('navigation.tabs.workout') }} />
          <Tabs.Screen name="nutrition" options={{ title: t('navigation.tabs.nutrition') }} />
          <Tabs.Screen name="stats" options={{ title: t('navigation.tabs.stats') }} />
          <Tabs.Screen name="chat" options={{ title: t('navigation.tabs.chat') }} />
        </Tabs>
      </View>

      {/* Custom bottom navigation */}
      <BottomNav />
    </View>
  );
}
