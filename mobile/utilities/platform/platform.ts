import { Platform } from 'react-native';

/**
 * Platform detection utilities
 */
export const isWeb = Platform.OS === 'web';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
