import {
  saveTokens,
  getTokens,
  clearTokens,
  saveUser,
  getUser,
  clearUser
} from '@utilities/storage';
import { create } from 'zustand';

import { AuthState, AuthStore, User } from './types';

// Mock API functions - replace with actual API calls in production
const mockLogin = async (
  email: string,
  password: string
): Promise<{ user: User; tokens: { access: string; refresh: string } }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock validation
  if (email !== 'user@example.com' || password !== 'password') {
    throw new Error('Invalid credentials');
  }

  return {
    user: {
      id: '1',
      email,
      name: 'Demo User'
    },
    tokens: {
      access: 'mock-access-token',
      refresh: 'mock-refresh-token'
    }
  };
};

const mockSignUp = async (
  email: string,
  password: string,
  name?: string
): Promise<{ user: User; tokens: { access: string; refresh: string } }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    user: {
      id: '2',
      email,
      name: name || 'New User'
    },
    tokens: {
      access: 'mock-access-token-new',
      refresh: 'mock-refresh-token-new'
    }
  };
};

const mockRefreshToken = async (
  refreshToken: string
): Promise<{ access: string; refresh: string }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!refreshToken) {
    throw new Error('Invalid refresh token');
  }

  return {
    access: 'new-mock-access-token',
    refresh: 'new-mock-refresh-token'
  };
};

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

      // Get tokens from secure storage
      const { accessToken, refreshToken } = await getTokens();

      if (accessToken && refreshToken) {
        // Get user data from secure storage
        const userData = await getUser();

        if (userData) {
          set({
            isAuthenticated: true,
            user: userData,
            accessToken,
            refreshToken
          });
        } else {
          // If we have tokens but no user data, try to refresh tokens
          const success = await get().refreshTokens();
          if (!success) {
            // Clear everything if refresh fails
            await clearTokens();
            await clearUser();
          }
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

      // Call login API (mock for now)
      const { user, tokens } = await mockLogin(email, password);

      // Save tokens and user data
      await saveTokens(tokens.access, tokens.refresh);
      await saveUser(user);

      // Update state
      set({
        isAuthenticated: true,
        user,
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
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

      // Call signup API (mock for now)
      const { user, tokens } = await mockSignUp(email, password, name);

      // Save tokens and user data
      await saveTokens(tokens.access, tokens.refresh);
      await saveUser(user);

      // Update state
      set({
        isAuthenticated: true,
        user,
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
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
      const { refreshToken } = get();

      if (!refreshToken) {
        return false;
      }

      // Call refresh token API (mock for now)
      const tokens = await mockRefreshToken(refreshToken);

      // Save new tokens
      await saveTokens(tokens.access, tokens.refresh);

      // Update state
      set({
        accessToken: tokens.access,
        refreshToken: tokens.refresh
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
