import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { isWeb } from '@utilities/platform';
import * as SecureStore from 'expo-secure-store';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key)
};

// Singleton pattern to initialize Supabase lazily
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const getSupabase = () => {
  if (!supabaseInstance) {
    const storage = isWeb ? AsyncStorage : ExpoSecureStoreAdapter;
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: isWeb
      }
    });
  }
  return supabaseInstance;
};

// Export a convenience wrapper if you want to use it directly
export const supabase = {
  get: () => getSupabase()
};
