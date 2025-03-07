import { Feather } from '@expo/vector-icons';
import { useTranslation } from '@i18n/core';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define TypeScript interface for workout
interface Workout {
  id: number;
  name: string;
  duration: string;
  level: string;
  focus: string;
  image: string;
}

// Mock data for workouts - Adding query parameters to image URLs for better loading
const workoutsData: Workout[] = [
  {
    id: 1,
    name: 'Full-Body Strength Workout',
    duration: '45 min',
    level: 'Intermediate',
    focus: 'Strength & Muscle Building',
    image:
      'https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'HIIT Cardio Blast',
    duration: '30 min',
    level: 'Advanced',
    focus: 'Cardio & Fat Burn',
    image:
      'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Core & Flexibility',
    duration: '35 min',
    level: 'Beginner',
    focus: 'Core Strength & Flexibility',
    image:
      'https://images.unsplash.com/photo-1522898467493-49726bf28798?auto=format&fit=crop&w=800&q=80'
  }
];

export default function WorkoutScreen() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setWorkouts(workoutsData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  function WorkoutCard({ workout }: { workout: Workout }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const { t } = useTranslation();

    return (
      <Link href={`/(tabs)/workout/${workout.id}`} asChild>
        <Pressable
          className="mb-4 overflow-hidden rounded-xl bg-white shadow-sm"
          style={({ pressed }) => (pressed ? { opacity: 0.9 } : {})}
          accessibilityLabel={t('workout.card.viewWorkout', 'View workout: {{name}}', {
            name: workout.name
          })}
          accessibilityRole="button">
          <View className="h-40 w-full bg-gray-100">
            {workout.image ? (
              <Image
                source={{ uri: workout.image }}
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: imageLoaded ? 'transparent' : '#f0f0f0'
                }}
                contentFit="cover"
                transition={200}
                cachePolicy="memory-disk"
                onLoad={() => setImageLoaded(true)}
              />
            ) : (
              <View className="h-full w-full items-center justify-center">
                <Feather name="image" size={40} color="#ccc" />
              </View>
            )}
          </View>
          <View className="p-3">
            <Text className="mb-2 text-lg font-semibold">{workout.name}</Text>
            <View className="mb-2 flex-row flex-wrap gap-3">
              <View className="flex-row items-center">
                <Feather name="clock" size={16} color="#666" />
                <Text className="ml-1 text-sm text-gray-600">
                  {t('workout.card.duration', '{{duration}}', { duration: workout.duration })}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="activity" size={16} color="#666" />
                <Text className="ml-1 text-sm text-gray-600">
                  {t('workout.card.level', '{{level}}', { level: workout.level })}
                </Text>
              </View>
            </View>
            <View className="self-start rounded bg-gray-100 px-2 py-1">
              <Text className="text-xs text-gray-600">
                {t('workout.card.focus', '{{focus}}', { focus: workout.focus })}
              </Text>
            </View>
          </View>
        </Pressable>
      </Link>
    );
  }

  if (isLoading) {
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

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom', 'left', 'right']}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <WorkoutCard workout={item} />}
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center p-8">
            <Text className="text-center text-lg text-gray-500">
              {t('workout.noWorkouts', 'No workouts available')}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
