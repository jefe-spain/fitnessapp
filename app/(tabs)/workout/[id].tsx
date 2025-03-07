import { Feather } from '@expo/vector-icons';
import { useTranslation } from '@i18n/core';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define TypeScript interface for workout
interface Workout {
  id: number;
  name: string;
  duration: string;
  level: string;
  focus: string;
  image: string;
  description?: string;
  exercises?: Exercise[];
}

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

// Mock data for the workout detail - Adding query parameters to image URLs for better loading
const workoutDetails: Record<string, Workout> = {
  '1': {
    id: 1,
    name: 'Full-Body Strength Workout',
    duration: '45 min',
    level: 'Intermediate',
    focus: 'Strength & Muscle Building',
    image:
      'https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=800&q=80',
    description:
      'A comprehensive full-body workout designed to build strength and muscle. This workout targets all major muscle groups with compound movements for maximum efficiency.',
    exercises: [
      { id: 1, name: 'Barbell Squats', sets: 4, reps: '8-10', rest: '90 sec' },
      { id: 2, name: 'Bench Press', sets: 4, reps: '8-10', rest: '90 sec' },
      { id: 3, name: 'Bent-Over Rows', sets: 3, reps: '10-12', rest: '60 sec' },
      { id: 4, name: 'Overhead Press', sets: 3, reps: '10-12', rest: '60 sec' },
      { id: 5, name: 'Romanian Deadlifts', sets: 3, reps: '10-12', rest: '60 sec' }
    ]
  },
  '2': {
    id: 2,
    name: 'HIIT Cardio Blast',
    duration: '30 min',
    level: 'Advanced',
    focus: 'Cardio & Fat Burn',
    image:
      'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&w=800&q=80',
    description:
      'An intense HIIT workout designed to maximize calorie burn and improve cardiovascular fitness. This workout alternates between high-intensity exercises and short rest periods.',
    exercises: [
      { id: 1, name: 'Burpees', sets: 4, reps: '45 sec', rest: '15 sec' },
      { id: 2, name: 'Mountain Climbers', sets: 4, reps: '45 sec', rest: '15 sec' },
      { id: 3, name: 'Jump Squats', sets: 4, reps: '45 sec', rest: '15 sec' },
      { id: 4, name: 'High Knees', sets: 4, reps: '45 sec', rest: '15 sec' },
      { id: 5, name: 'Plank Jacks', sets: 4, reps: '45 sec', rest: '15 sec' }
    ]
  },
  '3': {
    id: 3,
    name: 'Core & Flexibility',
    duration: '35 min',
    level: 'Beginner',
    focus: 'Core Strength & Flexibility',
    image:
      'https://images.unsplash.com/photo-1522898467493-49726bf28798?auto=format&fit=crop&w=800&q=80',
    description:
      'A balanced workout focusing on core strength and overall flexibility. This workout combines dynamic and static exercises to improve posture, stability, and range of motion.',
    exercises: [
      { id: 1, name: 'Plank', sets: 3, reps: '30-60 sec', rest: '30 sec' },
      { id: 2, name: 'Russian Twists', sets: 3, reps: '15 each side', rest: '30 sec' },
      { id: 3, name: 'Bicycle Crunches', sets: 3, reps: '20 total', rest: '30 sec' },
      { id: 4, name: 'Downward Dog', sets: 3, reps: '30 sec hold', rest: '15 sec' },
      { id: 5, name: "Child's Pose", sets: 3, reps: '30 sec hold', rest: '15 sec' }
    ]
  }
};

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      if (id && workoutDetails[id]) {
        setWorkout(workoutDetails[id]);
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

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

  if (!workout) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center p-6"
        edges={['bottom', 'left', 'right']}>
        <View className="flex-1 items-center justify-center">
          <Text className="mb-4 text-center text-lg font-bold">
            {t('workout.detail.notFound', 'Workout not found')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom', 'left', 'right']}>
      <ScrollView className="pb-6">
        <View className="h-64 w-full bg-gray-100">
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
            accessibilityLabel={t('workout.detail.imageAlt', 'Image for {{name}}', {
              name: workout.name
            })}
          />
        </View>

        <View className="p-4">
          <Text className="mb-4 text-2xl font-bold">{workout.name}</Text>

          <View className="mb-6 flex-row flex-wrap">
            <View className="mb-2 mr-4 flex-row items-center">
              <Feather name="clock" size={20} color="#666" />
              <Text className="ml-1 text-sm text-gray-600">
                {t('workout.detail.duration', '{{duration}}', { duration: workout.duration })}
              </Text>
            </View>
            <View className="mb-2 mr-4 flex-row items-center">
              <Feather name="activity" size={20} color="#666" />
              <Text className="ml-1 text-sm text-gray-600">
                {t('workout.detail.level', '{{level}}', { level: workout.level })}
              </Text>
            </View>
            <View className="mb-2 mr-4 flex-row items-center">
              <Feather name="target" size={20} color="#666" />
              <Text className="ml-1 text-sm text-gray-600">
                {t('workout.detail.focus', '{{focus}}', { focus: workout.focus })}
              </Text>
            </View>
          </View>

          {workout.description && (
            <View className="mb-6">
              <Text className="mb-3 text-lg font-bold">
                {t('workout.detail.description', 'Description')}
              </Text>
              <Text className="text-base text-gray-700">{workout.description}</Text>
            </View>
          )}

          <View className="mb-6">
            <Text className="mb-3 text-lg font-bold">
              {t('workout.detail.exercises', 'Exercises')}
            </Text>

            {workout.exercises?.map((exercise, index) => (
              <View key={exercise.id} className="mb-3 border-b border-gray-100 pb-3">
                <View className="flex-row items-center">
                  <Text className="mr-3 h-6 w-6 rounded-full bg-blue-500 text-center text-sm font-bold leading-6 text-white">
                    {index + 1}
                  </Text>
                  <Text className="flex-1 text-base font-medium">{exercise.name}</Text>
                </View>
                <View className="mt-2 flex-row flex-wrap">
                  <View className="mb-2 mr-2 rounded-full bg-gray-100 px-3 py-1.5">
                    <Text className="text-sm text-gray-600">
                      {t('workout.detail.sets', 'Sets')}: {exercise.sets}
                    </Text>
                  </View>
                  <View className="mb-2 mr-2 rounded-full bg-gray-100 px-3 py-1.5">
                    <Text className="text-sm text-gray-600">
                      {t('workout.detail.reps', 'Reps')}: {exercise.reps}
                    </Text>
                  </View>
                  <View className="mb-2 mr-2 rounded-full bg-gray-100 px-3 py-1.5">
                    <Text className="text-sm text-gray-600">
                      {t('workout.detail.rest', 'Rest')}: {exercise.rest}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View className="mb-6">
            <Text className="mb-3 text-lg font-bold">
              {t('workout.detail.startWorkout', 'Start Workout')}
            </Text>
            <Pressable
              className="rounded-lg bg-blue-500 px-4 py-3"
              style={({ pressed }) => (pressed ? { opacity: 0.8 } : {})}
              accessibilityLabel={t('workout.detail.startWorkoutButton', 'Start this workout')}
              accessibilityRole="button">
              <Text className="text-center text-base font-semibold text-white">
                {t('workout.detail.beginWorkout', 'Begin Workout')}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
