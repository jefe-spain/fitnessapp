import { Link, useRouter } from 'expo-router';
import { useEffect } from 'react';

import './index.web.css'; // We'll create this file for Tailwind styles
import { useAuthStore } from '../store/auth';

export default function WebLandingPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, logout } = useAuthStore();

  // Redirect to tabs if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isLoading, router]);

  // Handle login button click
  const handleLoginClick = () => {
    router.push('/auth');
  };

  // Handle signup button click
  const handleSignupClick = () => {
    router.push('/auth/signup');
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
  };

  // If loading or authenticated, show minimal content
  if (isLoading || isAuthenticated) {
    return null;
  }

  // This component will only be used on web for unauthenticated users
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
          Welcome to My Fitness App
        </h1>

        <div className="mb-8 rounded-lg bg-white p-8 shadow-md">
          <p className="mb-6 text-lg text-gray-600">
            Track your workouts, monitor nutrition, view fitness statistics, and chat with fitness
            professionals. Sign in to access all features.
          </p>

          <div className="flex justify-center space-x-4">
            <button
              className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              onClick={handleLoginClick}>
              Log In
            </button>

            <button
              className="rounded-md bg-gray-200 px-6 py-3 font-medium text-gray-800 transition-colors hover:bg-gray-300"
              onClick={handleSignupClick}>
              Sign Up
            </button>
          </div>
        </div>

        <div className="text-center">
          <Link href="/(tabs)" className="text-blue-600 hover:underline">
            Skip to app
          </Link>
        </div>
      </div>
    </div>
  );
}
