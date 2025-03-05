import { useTranslation } from '@i18n/core';
import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MealCard } from './components/MealCard';
import { useNutritionStore } from '../../../store/nutrition';

export default function NutritionIndexScreen() {
  const { t } = useTranslation();
  const { meals, isLoading, error, fetchMeals } = useNutritionStore();

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  if (isLoading && meals.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center p-6">
        <Text className="mb-4 text-lg text-red-500">{error}</Text>
        <Text className="text-base">{t('common.tryAgain', 'Please try again later')}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="mb-1 text-2xl font-bold">{t('nutrition.title', 'Nutrition')}</Text>
        <Text className="mb-6 text-base text-gray-600">
          {t('nutrition.subtitle', 'Discover healthy meal options')}
        </Text>

        <FlatList
          data={meals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MealCard meal={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-6"
        />
      </View>
    </SafeAreaView>
  );
}
