import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTranslation, LANGUAGE_OPTIONS } from '../../i18n';
import { useLanguageStore } from '../../store/language';
import { LanguageOption } from '../../store/language/types';

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language, setLanguage, initializeLanguage } = useLanguageStore();
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

  // Initialize language on component mount
  useEffect(() => {
    initializeLanguage();
  }, [initializeLanguage]);

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

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

  // Find the current language option
  const currentLanguage = LANGUAGE_OPTIONS.find((option) => option.code === language);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
        <TouchableOpacity
          onPress={handleGoBack}
          className="h-10 w-10 items-center justify-center"
          accessibilityLabel={t('common.actions.back')}
          accessibilityRole="button">
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-800">{t('settings.title')}</Text>
        <View className="w-10" />
      </View>

      {/* Content */}
      <View className="flex-1 p-4">
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
      </View>

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
