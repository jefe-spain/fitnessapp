import { Feather } from '@expo/vector-icons';
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

import { useTranslation } from '../../i18n/core';
import { useAuthStore } from '../../store/auth';

export default function SignUpScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  // Get auth state and methods from store
  const { signUp, isLoading, error: authError, isAuthenticated } = useAuthStore();

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

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setLocalError(t('common.errors.required'));
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    try {
      setLocalError(null);

      // Use the signUp method from auth store
      await signUp(email, password, name || undefined);

      // If signup is successful, the auth provider will handle the redirect
    } catch (error: any) {
      console.error('Error signing up:', error.message);
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

            <Text className="mb-2 text-3xl font-bold text-gray-800">{t('common.auth.signUp')}</Text>
            <Text className="mb-8 text-base text-gray-600">
              {t('common.auth.signInToContinue')}
            </Text>

            {/* Name Input */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700">Name (optional)</Text>
              <View className="flex-row items-center rounded-xl border border-gray-300 bg-white px-4 py-3">
                <Feather name="user" size={18} color="#6B7280" className="mr-3" />
                <TextInput
                  className="flex-1 text-base text-gray-800"
                  placeholder="Your name"
                  placeholderTextColor="#9CA3AF"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            </View>

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
            <View className="mb-4">
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
            </View>

            {/* Confirm Password Input */}
            <View className="mb-6">
              <Text className="mb-2 text-sm font-medium text-gray-700">Confirm Password</Text>
              <View className="flex-row items-center rounded-xl border border-gray-300 bg-white px-4 py-3">
                <Feather name="lock" size={18} color="#6B7280" className="mr-3" />
                <TextInput
                  className="flex-1 text-base text-gray-800"
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Error Message */}
            {localError && (
              <View className="mb-4 rounded-lg bg-red-50 p-3">
                <Text className="text-sm text-red-500">{localError}</Text>
              </View>
            )}

            {/* Sign Up Button */}
            <Pressable
              className={`mt-2 items-center rounded-xl py-4 ${isLoading ? 'bg-blue-400' : 'bg-blue-500'}`}
              onPress={handleSignUp}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text className="text-base font-semibold text-white">
                  {t('common.auth.signUp')}
                </Text>
              )}
            </Pressable>

            {/* Login Link */}
            <View className="mt-6 flex-row justify-center">
              <Text className="text-gray-600">{t('common.auth.alreadyHaveAccount')} </Text>
              <Pressable onPress={() => router.push('/auth/email')}>
                <Text className="font-semibold text-blue-500">{t('settings.login')}</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
