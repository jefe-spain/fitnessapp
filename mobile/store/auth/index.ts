import { saveTokens, clearTokens, saveUser, getUser, clearUser } from '@utilities/storage';
import { supabase } from '@utilities/supabase';
import {
  extractUserData,
  saveSessionData,
  getCurrentSession,
  refreshSession
} from '@utilities/supabase/session';
import { create } from 'zustand';

import { AuthState, AuthStore } from './types';

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  accessToken: null,
  refreshToken: null,
  error: null
};

// Create the auth store
export const useAuthStore = create<AuthStore>((set, get) => ({
  ...initialState,

  // Initialize auth state from storage
  initialize: async () => {
    try {
      set({ isLoading: true });

      // Check for existing session in Supabase
      const session = await getCurrentSession();

      if (session) {
        // Get user data from secure storage or create from session
        let userData = await getUser();

        if (!userData && session.user) {
          userData = extractUserData(session.user);
          await saveUser(userData);
        }

        if (userData) {
          set({
            isAuthenticated: true,
            user: userData,
            accessToken: session.access_token,
            refreshToken: session.refresh_token
          });
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Login method
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });

      // Call Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Extract user and session
      const { user, session } = data;

      if (!user || !session) {
        throw new Error('Login failed: No user or session returned');
      }

      // Create user object and save session data
      const userData = await saveSessionData(session);

      if (!userData) {
        throw new Error('Failed to save user data');
      }

      // Update state
      set({
        isAuthenticated: true,
        user: userData,
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
        error: null
      });
    } catch (error: any) {
      set({ error: error.message || 'Login failed' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Sign up method
  signUp: async (email, password, name) => {
    try {
      set({ isLoading: true, error: null });

      // Call Supabase signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || email.split('@')[0]
          }
        }
      });

      if (error) throw error;

      // Extract user and session
      const { user, session } = data;

      if (!user) {
        throw new Error('Sign up failed: No user returned');
      }

      // If email confirmation is required, session might be null
      if (!session) {
        set({
          isLoading: false,
          error: 'Please check your email to confirm your account'
        });
        return;
      }

      // Save session data
      const userData = await saveSessionData(session);

      if (!userData) {
        throw new Error('Failed to save user data');
      }

      // Update state
      set({
        isAuthenticated: true,
        user: userData,
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
        error: null
      });
    } catch (error: any) {
      set({ error: error.message || 'Sign up failed' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Logout method
  logout: async () => {
    try {
      set({ isLoading: true });

      // Call Supabase logout
      await supabase.auth.signOut();

      // Clear tokens and user data from storage
      await clearTokens();
      await clearUser();

      // Reset state
      set({
        ...initialState,
        isLoading: false
      });
    } catch (error) {
      console.error('Logout error:', error);
      set({ isLoading: false });
    }
  },

  // Set tokens method
  setTokens: async (accessToken, refreshToken) => {
    await saveTokens(accessToken, refreshToken);
    set({ accessToken, refreshToken });
  },

  // Refresh tokens method
  refreshTokens: async () => {
    try {
      const session = await refreshSession();

      if (!session) {
        return false;
      }

      // Save new tokens
      await saveTokens(session.access_token, session.refresh_token);

      // Update state
      set({
        accessToken: session.access_token,
        refreshToken: session.refresh_token
      });

      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  },

  // Set user method
  setUser: (user) => {
    set({ user });
    saveUser(user).catch(console.error);
  },

  // Set loading state
  setLoading: (isLoading) => {
    set({ isLoading });
  },

  // Set error state
  setError: (error) => {
    set({ error });
  }
}));
