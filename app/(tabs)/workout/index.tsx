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
const workouts: Workout[] = [
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

export default function WorkoutListScreen() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [workoutData] = useState<Workout[]>(workouts);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  function WorkoutCard({ workout }: { workout: Workout }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
      <Link href={`/workout/${workout.id}` as any} asChild>
        <Pressable
          className="mb-4 overflow-hidden rounded-xl bg-white shadow-sm"
          style={({ pressed }) => (pressed ? { opacity: 0.9 } : {})}
          accessibilityLabel={workout.name}
          accessibilityRole="button">
          <View className="h-44 w-full bg-gray-100">
            <Image
              source={{ uri: workout.image }}
              style={{
                flex: 1,
                backgroundColor: imageLoaded ? 'transparent' : '#f0f0f0'
              }}
              contentFit="cover"
              transition={300}
              cachePolicy="memory-disk"
              onLoad={() => setImageLoaded(true)}
              accessibilityLabel={`Image for ${workout.name}`}
            />
          </View>
          <View className="p-4">
            <View className="mb-2 flex-row items-center justify-between">
              <Text className="flex-1 text-lg font-bold">{workout.name}</Text>
              <Feather name="chevron-right" size={20} color="#ccc" />
            </View>
            <View className="mb-3 flex-row">
              <View className="mr-4 flex-row items-center">
                <Feather name="clock" size={16} color="#666" />
                <Text className="ml-1 text-sm text-gray-600">{workout.duration}</Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="activity" size={16} color="#666" />
                <Text className="ml-1 text-sm text-gray-600">{workout.level}</Text>
              </View>
            </View>
            <View className="self-start rounded bg-gray-100 px-2 py-1">
              <Text className="text-xs text-gray-600">{workout.focus}</Text>
            </View>
          </View>
        </Pressable>
      </Link>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="mb-1 text-2xl font-bold">{t('workout.title', 'Workouts')}</Text>
        <Text className="mb-6 text-base text-gray-600">
          {t('workout.subtitle', 'Find the perfect workout for you')}
        </Text>

        <FlatList
          data={workoutData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <WorkoutCard workout={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-6"
        />
      </View>
    </SafeAreaView>
  );
}
