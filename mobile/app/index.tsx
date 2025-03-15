import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

// This file serves as a fallback for non-web platforms
// It redirects based on authentication status
export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();

  // If still loading auth state, show a loading indicator
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  // Redirect based on authentication status
  return isSignedIn ? <Redirect href="/(tabs)" /> : <Redirect href="/auth" />;
}
