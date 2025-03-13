import { Stack } from 'expo-router';

export default function WorkoutTabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="workout/index" />
      <Stack.Screen
        name="workout/[id]"
        options={{
          presentation: 'card',
          animation: 'slide_from_right'
        }}
      />
    </Stack>
  );
}
