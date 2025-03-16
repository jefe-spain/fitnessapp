import { useTranslation } from '@i18n/core';
import { View, Text } from 'react-native';

export default function StatsScreen() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center p-6">
      <Text className="mb-2 text-2xl font-bold">{t('navigation.tabs.stats')}</Text>
      <Text className="text-center text-base text-gray-500">{t('common.app.tagline')}</Text>
    </View>
  );
}
