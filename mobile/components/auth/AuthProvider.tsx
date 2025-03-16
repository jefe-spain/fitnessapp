import { useRouter, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useAuthStore } from '../../store/auth';
import { supabase } from '../../utilities/supabase';
import { extractUserData } from '../../utilities/supabase/session';

// Protected routes require authentication
const PROTECTED_SEGMENTS = ['(tabs)', 'settings'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const [isInitialized, setIsInitialized] = useState(false);

  // Get auth state from store
  const { isAuthenticated, isLoading, initialize, setUser, setTokens, logout } = useAuthStore();

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      await initialize();
      setIsInitialized(true);
    };

    initAuth();
  }, [initialize]);

  // Set up Supabase auth state change listener
  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.get().auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Handle sign in
        const { user } = session;

        if (user) {
          setUser(extractUserData(user));
          await setTokens(session.access_token, session.refresh_token);
        }
      } else if (event === 'SIGNED_OUT') {
        // Handle sign out - this will be handled by the logout function
      } else if (event === 'TOKEN_REFRESHED' && session) {
        // Handle token refresh
        await setTokens(session.access_token, session.refresh_token);
      }
    });

    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setTokens, logout]);

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
