import { Feather } from '@expo/vector-icons';
import { useTranslation } from '@i18n/core';
import { useHeaderStore } from '@store/header';
import { useRouter, usePathname } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Define which paths should show the back button
const NESTED_PATHS = ['[id]'];

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showSettingsButton?: boolean;
  onBackPress?: () => void;
}

export function Header({
  title: propTitle,
  showBackButton,
  showSettingsButton = true,
  onBackPress
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  // Get title from store, fallback to prop title
  const { title: storeTitle } = useHeaderStore();
  const displayTitle = storeTitle || propTitle;

  // Determine if we should show the back button based on the current path
  // if not explicitly provided via props
  const shouldShowBackButton = useMemo(() => {
    if (showBackButton !== undefined) return showBackButton;

    // Check if we're in a nested route within a tab
    // For example: /(tabs)/nutrition/[id] should show back button
    const pathParts = pathname.split('/');

    // Check if the last part of the path is in the NESTED_PATHS array
    const lastPathPart = pathParts[pathParts.length - 1];
    return NESTED_PATHS.includes(lastPathPart) || pathParts.length > 2;
  }, [pathname, showBackButton]);

  const navigateBack = useCallback(() => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  }, [onBackPress, router]);

  const navigateToSettings = useCallback(() => {
    router.push('/settings');
  }, [router]);

  return (
    <View
      className="z-50 w-full border-b border-gray-200 bg-white/90"
      style={{ paddingTop: insets.top }}>
      <View className="h-14 flex-row items-center justify-between px-4 py-2">
        {/* Left side - Back button or empty space */}
        <View className="w-11">
          {shouldShowBackButton && (
            <Pressable
              onPress={navigateBack}
              accessibilityLabel={t('common.navigation.back')}
              accessibilityRole="button"
              className="h-10 w-10 items-center justify-center rounded-full"
              style={({ pressed }) => (pressed ? { opacity: 0.7 } : {})}>
              <Feather name="arrow-left" size={24} color="#333" />
            </Pressable>
          )}
        </View>

        {/* Center - Title */}
        {displayTitle && (
          <Text
            className="flex-1 text-center text-lg font-semibold text-gray-800"
            numberOfLines={1}>
            {displayTitle}
          </Text>
        )}

        {/* Right side - Settings button or empty space */}
        <View className="w-11">
          {showSettingsButton && (
            <Pressable
              onPress={navigateToSettings}
              accessibilityLabel={t('common.settings.title')}
              accessibilityRole="button"
              className="h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white/90 shadow-sm"
              style={({ pressed }) => (pressed ? { opacity: 0.7 } : {})}>
              <Feather name="settings" size={22} color="#333" />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
