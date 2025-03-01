import { Redirect } from 'expo-router';

// This file serves as a fallback for non-web platforms
// It simply redirects to the tabs navigation
export default function Index() {
  return <Redirect href="/(tabs)" />;
}
