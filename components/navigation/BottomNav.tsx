import { Feather } from '@expo/vector-icons';
import { useTranslation } from '@i18n/core';
import { useRouter, usePathname } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Types
interface NavItem {
  id: string;
  icon: keyof typeof Feather.glyphMap;
  labelKey: string;
  href: string;
}

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const navItems: NavItem[] = useMemo(
    () => [
      { id: 'home', icon: 'home', labelKey: 'navigation.tabs.home', href: '/(tabs)' },
      {
        id: 'workout',
        icon: 'activity',
        labelKey: 'navigation.tabs.workout',
        href: '/(tabs)/workout'
      },
      {
        id: 'nutrition',
        icon: 'book-open',
        labelKey: 'navigation.tabs.nutrition',
        href: '/(tabs)/nutrition'
      },
      {
        id: 'stats',
        icon: 'bar-chart-2',
        labelKey: 'navigation.tabs.stats',
        href: '/(tabs)/stats'
      },
      {
        id: 'chat',
        icon: 'message-square',
        labelKey: 'navigation.tabs.chat',
        href: '/(tabs)/chat'
      }
    ],
    []
  );

  const isTabActive = useCallback(
    (href: string) => {
      if (href === '/(tabs)' && (pathname === '/(tabs)' || pathname === '/(tabs)/index')) {
        return true;
      }
      return pathname === href;
    },
    [pathname]
  );

  const handleNavigation = useCallback(
    (href: string) => {
      // Using router.navigate for better tab navigation
      router.navigate(href as any);
    },
    [router]
  );

  return (
    <View
      className="absolute bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/90"
      style={{ paddingBottom: insets.bottom || 16 }}>
      <View className="flex-row items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const isActive = isTabActive(item.href);

          return (
            <Pressable
              key={item.id}
              className={`relative flex-1 items-center justify-center overflow-hidden rounded-lg px-3 py-2.5 ${
                isActive ? 'scale-105' : ''
              }`}
              onPress={() => handleNavigation(item.href)}
              accessibilityRole="button"
              accessibilityLabel={t(item.labelKey)}
              accessibilityState={{ selected: isActive }}>
              {isActive && <View className="absolute inset-0 rounded-lg bg-blue-500/10" />}
              <Feather
                name={item.icon}
                size={22}
                color={isActive ? '#3B82F6' : '#6B7280'}
                className="self-center"
              />
              <Text
                className={`mt-1 text-center text-xs font-medium ${
                  isActive ? 'text-blue-500' : 'text-gray-500'
                }`}>
                {t(item.labelKey)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
