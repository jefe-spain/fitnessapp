import { Feather } from '@expo/vector-icons';
import { useTranslation } from '@i18n/core';
import { useAuthStore } from '@store/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Platform,
  useWindowDimensions,
  ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { supabase } from '../../utilities/supabase';

// Required for OAuth in Expo
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  // Get auth state from store
  const { isAuthenticated, isLoading, setError } = useAuthStore();

  // Redirect to tabs if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  // Show loading indicator while checking auth state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  const handleAppleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: 'fitnessapp://auth/callback'
        }
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing in with Apple:', error);
      setError(error.message || 'Failed to sign in with Apple');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'fitnessapp://auth/callback'
        }
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      setError(error.message || 'Failed to sign in with Google');
    }
  };

  const handleEmailSignIn = () => {
    // Navigate to email sign in screen
    router.push('/auth/email');
  };

  const handleGuestContinue = () => {
    // Navigate to main app without authentication
    // In a real app, you might want to implement a guest login flow
    // For now, we'll just redirect to tabs
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-white">
      <LinearGradient colors={['#f0f4ff', '#e6eeff', '#d9e6ff']} className="absolute inset-0" />

      <View
        className="flex-1 justify-between p-6"
        style={{
          paddingTop: Platform.OS === 'ios' ? insets.top + 20 : 40,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 40
        }}>
        <View className="mb-10 items-center">
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=200&auto=format&fit=crop'
            }}
            className="mb-4 h-20 w-20 rounded-2xl"
          />
          <Text className="mb-2 text-3xl font-bold text-gray-800">{t('common.app.name')}</Text>
          <Text className="text-base text-gray-600">{t('common.auth.signInToContinue')}</Text>
        </View>

        <View className={`w-full ${isTablet ? 'w-4/5 max-w-lg' : 'w-full'} self-center`}>
          {/* Apple Sign In Button */}
          <Pressable
            className="mb-4 flex-row items-center justify-center rounded-xl bg-black px-6 py-4 shadow-sm"
            onPress={handleAppleSignIn}>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
              }}
              className="mr-3 h-5 w-5"
              style={{ tintColor: '#fff' }}
            />
            <Text className="text-base font-semibold text-white">
              {t('common.auth.signInWithApple')}
            </Text>
          </Pressable>

          {/* Google Sign In Button */}
          <Pressable
            className="mb-4 flex-row items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm"
            onPress={handleGoogleSignIn}>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
              }}
              className="mr-3 h-5 w-5"
            />
            <Text className="text-base font-semibold text-gray-800">
              {t('common.auth.signInWithGoogle')}
            </Text>
          </Pressable>

          {/* Email Sign In Button */}
          <Pressable
            className="mb-4 flex-row items-center justify-center rounded-xl border border-gray-100 bg-gray-100 px-6 py-4 shadow-sm"
            onPress={handleEmailSignIn}>
            <Feather name="mail" size={20} color="#333" className="mr-3" />
            <Text className="text-base font-semibold text-gray-800">
              {t('common.auth.signInWithEmail')}
            </Text>
          </Pressable>

          {/* Continue as Guest */}
          <Pressable
            className="mt-2 flex-row items-center justify-center py-3"
            onPress={handleGuestContinue}>
            <Text className="mr-2 text-base font-medium text-blue-500">
              {t('common.auth.continueAsGuest')}
            </Text>
            <Feather name="arrow-right" size={16} color="#3B82F6" />
          </Pressable>
        </View>

        <View className="mt-10 items-center">
          <Text className="mb-4 text-sm text-gray-600">
            {t('common.auth.dontHaveAccount')}{' '}
            <Text
              className="font-semibold text-blue-500"
              onPress={() => router.push('/auth/signup')}>
              {t('common.auth.signUp')}
            </Text>
          </Text>
          <Text className="text-center text-xs leading-5 text-gray-400">
            {t('common.auth.termsText')}{' '}
            <Text className="text-blue-500">{t('common.auth.termsOfService')}</Text>{' '}
            {t('common.auth.and')}{' '}
            <Text className="text-blue-500">{t('common.auth.privacyPolicy')}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
