import { useAuthStore } from '@store/auth';
import { Redirect } from 'expo-router';

// This file serves as a fallback for non-web platforms
// It redirects based on authentication status
export default function Index() {
  const { isAuthenticated, isLoading } = useAuthStore();

  // If still loading auth state, don't redirect yet
  if (isLoading) {
    return null;
  }

  // Redirect based on authentication status
  return isAuthenticated ? <Redirect href="/(tabs)" /> : <Redirect href="/auth" />;
}
