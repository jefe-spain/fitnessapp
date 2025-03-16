import { useAuthStore } from '@store/auth';
import { supabase } from '@utilities/supabase';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

export default function AuthCallback() {
  const router = useRouter();
  const { setError } = useAuthStore();

  useEffect(() => {
    // Handle the OAuth callback
    const handleOAuthCallback = async () => {
      try {
        // The URL params will be automatically handled by Supabase Auth
        // We just need to check if the session exists
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (data?.session) {
          // Session exists, redirect to home
          router.replace('/(tabs)');
        } else {
          // No session, redirect to login
          setError('Authentication failed. Please try again.');
          router.replace('/auth');
        }
      } catch (error: any) {
        console.error('Error in OAuth callback:', error);
        setError(error.message || 'Authentication failed');
        router.replace('/auth');
      }
    };

    handleOAuthCallback();
  }, [router, setError]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text className="mt-4 text-gray-600">Completing authentication...</Text>
    </View>
  );
}
