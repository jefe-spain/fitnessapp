import { Feather } from '@expo/vector-icons';
import { useTranslation } from '@i18n/core';
import { useAuthStore } from '@store/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EmailSignInScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  // Get auth state and methods from store
  const { login, isLoading, error: authError, isAuthenticated } = useAuthStore();

  // Redirect to tabs if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  // Update local error when auth error changes
  useEffect(() => {
    if (authError) {
      setLocalError(authError);
    }
  }, [authError]);

  const handleSignIn = async () => {
    if (!email || !password) {
      setLocalError(t('common.errors.required'));
      return;
    }

    try {
      setLocalError(null);

      // Use the login method from auth store
      await login(email, password);

      // If login is successful, the auth provider will handle the redirect
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      setLocalError(error.message || t('common.errors.general'));
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-white">
      <LinearGradient colors={['#f0f4ff', '#e6eeff', '#d9e6ff']} className="absolute inset-0" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom
          }}>
          <View className="flex-1 p-6">
            {/* Back Button */}
            <Pressable
              className="mb-6 h-10 w-10 items-center justify-center rounded-full bg-white/70"
              onPress={goBack}>
              <Feather name="arrow-left" size={22} color="#333" />
            </Pressable>

            <Text className="mb-2 text-3xl font-bold text-gray-800">
              {t('common.auth.signInWithEmail')}
            </Text>
            <Text className="mb-8 text-base text-gray-600">
              {t('common.auth.signInToContinue')}
            </Text>

            {/* Email Input */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700">Email</Text>
              <View className="flex-row items-center rounded-xl border border-gray-300 bg-white px-4 py-3">
                <Feather name="mail" size={18} color="#6B7280" className="mr-3" />
                <TextInput
                  className="flex-1 text-base text-gray-800"
                  placeholder="email@example.com"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="mb-2 text-sm font-medium text-gray-700">Password</Text>
              <View className="flex-row items-center rounded-xl border border-gray-300 bg-white px-4 py-3">
                <Feather name="lock" size={18} color="#6B7280" className="mr-3" />
                <TextInput
                  className="flex-1 text-base text-gray-800"
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              <Pressable className="mt-2 self-end">
                <Text className="text-sm font-medium text-blue-500">Forgot Password?</Text>
              </Pressable>
            </View>

            {/* Error Message */}
            {localError && (
              <View className="mb-4 rounded-lg bg-red-50 p-3">
                <Text className="text-sm text-red-500">{localError}</Text>
              </View>
            )}

            {/* Sign In Button */}
            <Pressable
              className={`mt-2 items-center rounded-xl py-4 ${isLoading ? 'bg-blue-400' : 'bg-blue-500'}`}
              onPress={handleSignIn}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text className="text-base font-semibold text-white">{t('settings.login')}</Text>
              )}
            </Pressable>

            {/* Signup Link */}
            <View className="mt-6 flex-row justify-center">
              <Text className="text-gray-600">{t('common.auth.dontHaveAccount')} </Text>
              <Pressable onPress={() => router.push('/auth/signup')}>
                <Text className="font-semibold text-blue-500">{t('common.auth.signUp')}</Text>
              </Pressable>
            </View>

            {/* Demo credentials hint */}
            <View className="mt-8 rounded-lg bg-gray-100 p-4">
              <Text className="text-center text-sm text-gray-600">
                Demo credentials: user@example.com / password
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
