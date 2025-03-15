import { useUser, useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';

export default function ProfileScreen() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isUserLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileImagePlaceholder}>
          <Text style={styles.profileImageText}>
            {user?.firstName?.[0] || user?.emailAddresses[0].emailAddress[0].toUpperCase()}
          </Text>
        </View>

        <Text style={styles.userName}>
          {user?.firstName
            ? `${user.firstName} ${user.lastName || ''}`
            : user?.emailAddresses[0].emailAddress}
        </Text>

        <Text style={styles.userEmail}>{user?.emailAddresses[0].emailAddress}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user?.emailAddresses[0].emailAddress}</Text>
        </View>

        {user?.phoneNumbers && user.phoneNumbers.length > 0 && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{user.phoneNumbers[0].phoneNumber}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut} disabled={isLoading}>
        <Text style={styles.signOutButtonText}>{isLoading ? 'Signing out...' : 'Sign Out'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  profileImageText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white'
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5
  },
  userEmail: {
    fontSize: 16,
    color: '#666'
  },
  infoSection: {
    padding: 20
  },
  infoItem: {
    marginBottom: 20
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500'
  },
  signOutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#f44336',
    borderRadius: 8,
    alignItems: 'center'
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
