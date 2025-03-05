import { useTranslation } from '@i18n/core';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center p-6">
      <Text className="mb-2 text-2xl font-bold">{t('navigation.tabs.home')}</Text>
      <Text className="text-base text-gray-600">{t('common.app.tagline')}</Text>
    </View>
  );
}
