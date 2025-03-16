import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Text, Image, Pressable } from 'react-native';

import type { Meal } from '../types';

interface MealCardProps {
  meal: Meal;
}

export default function MealCard({ meal }: MealCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/(tabs)/nutrition/[id]',
      params: { id: meal.id }
    });
  };

  return (
    <Pressable className="mb-4 overflow-hidden rounded-xl bg-white shadow-sm" onPress={handlePress}>
      {meal.imageUrl ? (
        <Image source={{ uri: meal.imageUrl }} className="h-44 w-full object-cover" />
      ) : (
        <View className="h-44 w-full items-center justify-center bg-gray-100">
          <Ionicons name="restaurant-outline" size={40} color="#ccc" />
        </View>
      )}
      <View className="p-4">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="flex-1 text-lg font-bold">{meal.name}</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </View>
        <View className="mb-3 flex-row">
          <View className="mr-4 flex-row items-center">
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text className="ml-1 text-sm text-gray-600">{meal.prepTime}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="restaurant-outline" size={16} color="#666" />
            <Text className="ml-1 text-sm text-gray-600">{meal.servingSize}</Text>
          </View>
        </View>
        <View className="flex-row flex-wrap">
          <View className="mr-2 rounded bg-gray-100 px-2 py-1">
            <Text className="text-xs text-gray-600">{meal.calories} kcal</Text>
          </View>
          <View className="rounded bg-gray-100 px-2 py-1">
            <Text className="text-xs text-gray-600">{meal.protein}g protein</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
