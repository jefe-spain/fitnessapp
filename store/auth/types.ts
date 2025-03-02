export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
}

export interface AuthStore extends AuthState {
  // Authentication methods
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;

  // Token management
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  refreshTokens: () => Promise<boolean>;

  // State management
  setUser: (user: User) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  // Initialization
  initialize: () => Promise<void>;
}
