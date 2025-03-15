import { Header } from '@components/navigation/Header';
import { Feather } from '@expo/vector-icons';
import { useTranslation, LANGUAGE_OPTIONS } from '@i18n/core';
import { useAuthStore } from '@store/auth';
import { useLanguageStore } from '@store/language';
import { LanguageOption } from '@store/language/types';
import { useRouter, Link } from 'expo-router';
import { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  ActivityIndicator,
  ScrollView,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SignedInContent } from '../../components/auth/AuthStatus';

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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.account')}</Text>

          <SignedInContent>
            <Link href="/settings/profile" asChild>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                  <Feather name="user" size={20} color="#3B82F6" />
                  <Text style={styles.menuItemText}>{t('settings.profile')}</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#999" />
              </TouchableOpacity>
            </Link>
          </SignedInContent>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.preferences')}</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Feather name="globe" size={20} color="#3B82F6" />
              <Text style={styles.menuItemText}>{t('settings.language')}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Feather name="bell" size={20} color="#3B82F6" />
              <Text style={styles.menuItemText}>{t('settings.notifications')}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.about')}</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Feather name="info" size={20} color="#3B82F6" />
              <Text style={styles.menuItemText}>{t('settings.aboutApp')}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Feather name="shield" size={20} color="#3B82F6" />
              <Text style={styles.menuItemText}>{t('settings.privacy')}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#999" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingVertical: 10
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 5,
    textTransform: 'uppercase',
    fontWeight: '500'
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15
  }
});
