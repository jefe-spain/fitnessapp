import { useRouter, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useAuthStore } from '../../store/auth';

// Protected routes require authentication
const PROTECTED_SEGMENTS = ['(tabs)', 'settings'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const [isInitialized, setIsInitialized] = useState(false);

  // Get auth state from store
  const { isAuthenticated, isLoading, initialize } = useAuthStore();

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      await initialize();
      setIsInitialized(true);
    };

    initAuth();
  }, [initialize]);

  // Handle navigation based on auth state
  useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === 'auth';
    const inProtectedRoute = PROTECTED_SEGMENTS.includes(segments[0]);

    if (isAuthenticated && inAuthGroup) {
      // Redirect to home if authenticated but in auth group
      router.replace('/(tabs)');
    } else if (!isAuthenticated && inProtectedRoute) {
      // Redirect to login if not authenticated but in protected route
      router.replace('/auth');
    }
  }, [isAuthenticated, segments, isInitialized, router]);

  // Show loading indicator while initializing
  if (isLoading && !isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <>{children}</>;
}
