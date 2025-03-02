import { isWeb } from '@utilities/platform';
import * as SecureStore from 'expo-secure-store';

// Storage keys
const ACCESS_TOKEN_KEY = 'auth_access_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_KEY = 'auth_user';

// Web fallback using localStorage with simple encryption
// Note: This is not truly secure but provides a basic level of obfuscation for web
const webEncrypt = (text: string): string => {
  return btoa(`fitness_app_${text}`);
};

const webDecrypt = (encryptedText: string): string => {
  try {
    const decoded = atob(encryptedText);
    return decoded.replace('fitness_app_', '');
  } catch (error) {
    console.error(error);
    return '';
  }
};

export async function saveSecurely(key: string, value: string): Promise<void> {
  if (isWeb) {
    localStorage.setItem(key, webEncrypt(value));
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

export async function getSecurely(key: string): Promise<string | null> {
  if (isWeb) {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return webDecrypt(value);
  } else {
    return await SecureStore.getItemAsync(key);
  }
}

// Delete data securely
export async function deleteSecurely(key: string): Promise<void> {
  if (isWeb) {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}

export const saveTokens = async (accessToken: string, refreshToken: string): Promise<void> => {
  await saveSecurely(ACCESS_TOKEN_KEY, accessToken);
  await saveSecurely(REFRESH_TOKEN_KEY, refreshToken);
};

export const getTokens = async (): Promise<{
  accessToken: string | null;
  refreshToken: string | null;
}> => {
  const accessToken = await getSecurely(ACCESS_TOKEN_KEY);
  const refreshToken = await getSecurely(REFRESH_TOKEN_KEY);
  return { accessToken, refreshToken };
};

export const clearTokens = async (): Promise<void> => {
  await deleteSecurely(ACCESS_TOKEN_KEY);
  await deleteSecurely(REFRESH_TOKEN_KEY);
};

export const saveUser = async (user: any): Promise<void> => {
  await saveSecurely(USER_KEY, JSON.stringify(user));
};

export const getUser = async (): Promise<any | null> => {
  const userData = await getSecurely(USER_KEY);
  if (!userData) return null;
  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const clearUser = async (): Promise<void> => {
  await deleteSecurely(USER_KEY);
};
