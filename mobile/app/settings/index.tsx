import { Header } from '@components/navigation/Header';
import { Feather } from '@expo/vector-icons';
import { useTranslation, LANGUAGE_OPTIONS } from '@i18n/core';
import { useAuthStore } from '@store/auth';
import { useLanguageStore } from '@store/language';
import { LanguageOption } from '@store/language/types';
import { useRouter } from 'expo-router';
import { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language, setLanguage, initializeLanguage } = useLanguageStore();
  const { logout, isLoading } = useAuthStore();
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

  // Initialize language on component mount
  useEffect(() => {
    initializeLanguage();
  }, [initializeLanguage]);

  const openLanguageModal = useCallback(() => {
    setIsLanguageModalVisible(true);
  }, []);

  const closeLanguageModal = useCallback(() => {
    setIsLanguageModalVisible(false);
  }, []);

  const handleLanguageSelect = useCallback(
    (languageOption: LanguageOption) => {
      setLanguage(languageOption.code);
      closeLanguageModal();
    },
    [setLanguage, closeLanguageModal]
  );

  // Handle logout
  const handleLogout = useCallback(() => {
    Alert.alert(t('settings.logout.confirmTitle'), t('settings.logout.confirmMessage'), [
      {
        text: t('common.actions.cancel'),
        style: 'cancel'
      },
      {
        text: t('settings.logout.confirmButton'),
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/auth');
        }
      }
    ]);
  }, [logout, router, t]);

  // Find the current language option
  const currentLanguage = LANGUAGE_OPTIONS.find((option) => option.code === language);

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom', 'left', 'right']}>
      <Header title={t('common.settings.title')} showBackButton showSettingsButton={false} />
      <ScrollView className="flex-1">
        {/* Language Settings */}
        <View className="mt-6 rounded-xl bg-white p-4 shadow-sm">
          <Text className="mb-4 text-base font-semibold text-gray-800">
            {t('settings.language.title')}
          </Text>
          <TouchableOpacity
            className="flex-row items-center py-3"
            onPress={openLanguageModal}
            accessibilityRole="button"
            accessibilityLabel={t('settings.language.title')}>
            <View className="mr-3 h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
              <Feather name="globe" size={18} color="#555" />
            </View>
            <Text className="flex-1 text-base text-gray-800">{t('settings.language.title')}</Text>
            <Text className="mr-2 text-base text-gray-600">
              {currentLanguage?.flag} {currentLanguage?.name}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <View className="mt-6 rounded-xl bg-white p-4 shadow-sm">
          <Text className="mb-4 text-base font-semibold text-gray-800">
            {t('settings.account.title')}
          </Text>

          {/* Logout Button */}
          <TouchableOpacity
            className="flex-row items-center py-3"
            onPress={handleLogout}
            disabled={isLoading}
            accessibilityRole="button"
            accessibilityLabel={t('settings.logout.title')}>
            <View className="mr-3 h-8 w-8 items-center justify-center rounded-lg bg-red-100">
              <Feather name="log-out" size={18} color="#E53E3E" />
            </View>
            <Text className="flex-1 text-base text-red-600">{t('settings.logout.title')}</Text>
            {isLoading && <ActivityIndicator size="small" color="#3B82F6" />}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={isLanguageModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeLanguageModal}>
        <View className="flex-1 justify-end bg-black/50">
          <SafeAreaView edges={['bottom']} className="rounded-t-3xl bg-white">
            <View className="flex-row items-center justify-between border-b border-gray-100 px-5 py-4">
              <Text className="text-lg font-semibold text-gray-800">
                {t('settings.language.selectLanguage')}
              </Text>
              <TouchableOpacity onPress={closeLanguageModal} className="p-1">
                <Feather name="x" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={LANGUAGE_OPTIONS}
              keyExtractor={(item) => item.code}
              contentContainerClassName="px-5"
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`flex-row items-center border-b border-gray-100 py-4 ${
                    item.code === language ? 'bg-blue-50' : ''
                  }`}
                  onPress={() => handleLanguageSelect(item)}>
                  <Text className="mr-4 text-2xl">{item.flag}</Text>
                  <Text className="flex-1 text-base text-gray-800">{item.name}</Text>
                  {item.code === language && <Feather name="check" size={20} color="#3B82F6" />}
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
