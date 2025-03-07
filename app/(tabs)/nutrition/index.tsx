import { useTranslation } from '@i18n/core';
import { useNutritionStore } from '@store/nutrition';
import { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MealCard } from './components/MealCard';

export default function NutritionIndexScreen() {
  const { t } = useTranslation();
  const { meals, isLoading, error, fetchMeals } = useNutritionStore();

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  if (isLoading && meals.length === 0) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center"
        edges={['bottom', 'left', 'right']}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center p-6"
        edges={['bottom', 'left', 'right']}>
        <View className="flex-1 items-center justify-center">
          <Text className="mb-4 text-lg text-red-500">{error}</Text>
          <Text className="text-base">{t('common.tryAgain', 'Please try again later')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom', 'left', 'right']}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MealCard meal={item} />}
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center p-8">
            <Text className="text-center text-lg text-gray-500">
              {t('nutrition.noMeals', 'No meals available')}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
