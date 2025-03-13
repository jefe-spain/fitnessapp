import { BottomNav } from '@components/navigation/BottomNav';
import { Header } from '@components/navigation/Header';
import { useTranslation } from '@i18n/core';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <View className="relative flex-1">
      {/* Header with settings button */}
      <Header />

      {/* Tab navigation - hidden tabBar since we're using custom BottomNav */}
      <View className="flex-1">
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: 'none' } // Hide the default tab bar
          }}>
          <Tabs.Screen name="home" options={{ title: t('navigation.tabs.home') }} />
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
