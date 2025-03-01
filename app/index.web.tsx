import { Link } from 'expo-router';
import './index.web.css'; // We'll create this file for Tailwind styles

export default function WebLandingPage() {
  // This component will only be used on web
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">Welcome to My App</h1>

        <div className="mb-8 rounded-lg bg-white p-8 shadow-md">
          <p className="mb-6 text-lg text-gray-600">
            This is a web-only landing page built with standard web technologies and Tailwind CSS.
            After login, users will be directed to the React Native app interface.
          </p>

          <div className="flex justify-center space-x-4">
            <button
              className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              onClick={() => {
                // Handle login logic here
                window.location.href = '/(tabs)';
              }}>
              Log In
            </button>

            <button className="rounded-md bg-gray-200 px-6 py-3 font-medium text-gray-800 transition-colors hover:bg-gray-300">
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
