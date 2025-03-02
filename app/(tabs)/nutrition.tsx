import { useTranslation } from '@i18n/core';
import { StyleSheet, View, Text } from 'react-native';

export default function NutritionScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('navigation.tabs.nutrition')}</Text>
      <Text style={styles.subtitle}>{t('common.app.tagline')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center'
  }
});
