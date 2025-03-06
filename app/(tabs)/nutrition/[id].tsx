import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '@i18n/core';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNutritionStore } from '../../../store/nutrition';

export default function MealDetailScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { meals, isLoading, fetchMeals, getMealById } = useNutritionStore();

  const meal = getMealById(id);

  useEffect(() => {
    if (meals.length === 0) {
      fetchMeals();
    }
  }, [fetchMeals, meals.length]);

  if (isLoading && !meal) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>{t('common.loading')}</Text>
      </SafeAreaView>
    );
  }

  if (!meal) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center p-6">
        <Text className="mb-4 text-center text-lg font-bold">
          {t('nutrition.mealNotFound', 'Meal not found')}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="pb-6">
        {meal.imageUrl ? (
          <Image source={{ uri: meal.imageUrl }} className="h-64 w-full object-cover" />
        ) : (
          <View className="h-64 w-full items-center justify-center bg-gray-100">
            <Ionicons name="restaurant-outline" size={60} color="#ccc" />
          </View>
        )}

        <View className="p-4">
          <Text className="mb-4 text-2xl font-bold">{meal.name}</Text>

          <View className="mb-6 flex-row flex-wrap">
            <View className="mb-2 mr-4 flex-row items-center">
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text className="ml-1 text-sm text-gray-600">{meal.prepTime}</Text>
            </View>
            <View className="mb-2 mr-4 flex-row items-center">
              <Ionicons name="restaurant-outline" size={20} color="#666" />
              <Text className="ml-1 text-sm text-gray-600">{meal.servingSize}</Text>
            </View>
            <View className="mb-2 mr-4 flex-row items-center">
              <Ionicons name="flame-outline" size={20} color="#666" />
              <Text className="ml-1 text-sm text-gray-600">{meal.calories} kcal</Text>
            </View>
          </View>

          <View className="mb-6">
            <Text className="mb-3 text-lg font-bold">{t('nutrition.macros', 'Macros')}</Text>
            <View className="flex-row flex-wrap">
              <View className="mb-2 mr-2 rounded-full bg-gray-100 px-3 py-1.5">
                <Text className="text-sm text-gray-600">
                  {t('nutrition.protein', 'Protein')}: {meal.protein}g
                </Text>
              </View>
              <View className="mb-2 mr-2 rounded-full bg-gray-100 px-3 py-1.5">
                <Text className="text-sm text-gray-600">
                  {t('nutrition.carbs', 'Carbs')}: {meal.carbs}g
                </Text>
              </View>
              <View className="mb-2 mr-2 rounded-full bg-gray-100 px-3 py-1.5">
                <Text className="text-sm text-gray-600">
                  {t('nutrition.fat', 'Fat')}: {meal.fat}g
                </Text>
              </View>
            </View>
          </View>

          <View className="mb-6">
            <Text className="mb-3 text-lg font-bold">
              {t('nutrition.ingredients', 'Ingredients')}
            </Text>
            {meal.ingredients.map((ingredient, index) => (
              <View key={index} className="flex-row flex-wrap border-b border-gray-100 py-2">
                <Text className="flex-2 text-base font-medium">{ingredient.name}</Text>
                <Text className="flex-1 text-right text-base text-gray-600">
                  {ingredient.quantity}
                </Text>
                {ingredient.notes && (
                  <Text className="mt-1 w-full text-sm text-gray-500">{ingredient.notes}</Text>
                )}
              </View>
            ))}
          </View>

          <View className="mb-6">
            <Text className="mb-3 text-lg font-bold">
              {t('nutrition.instructions', 'Instructions')}
            </Text>
            {meal.instructions.map((instruction, index) => (
              <View key={index} className="mb-3 flex-row">
                <Text className="mr-3 h-6 w-6 rounded-full bg-blue-500 text-center text-sm font-bold leading-6 text-white">
                  {index + 1}
                </Text>
                <Text className="flex-1 text-base leading-6">{instruction}</Text>
              </View>
            ))}
          </View>

          {meal.tips && (
            <View>
              <Text className="mb-3 text-lg font-bold">{t('nutrition.tips', 'Tips')}</Text>
              <Text className="text-base italic text-gray-600">{meal.tips}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
