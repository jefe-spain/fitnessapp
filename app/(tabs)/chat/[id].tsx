import { Feather } from '@expo/vector-icons';
import { useTranslation } from '@i18n/core';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { MessageBubble } from './components/MessageBubble';

import { useChatStore } from '~/store/chat';

// Professional color palette
const COLORS = {
  primary: '#D4A72C', // Professional yellow
  primaryLight: '#FFF4D4',
  background: '#F8F8F8',
  inputBackground: '#FFFFFF',
  border: '#E0E0E0',
  text: '#333333',
  placeholder: '#999999',
  disabled: '#E0E0E0'
};

// Constants for layout calculations
const BOTTOM_NAV_HEIGHT = 60; // Assumed height of bottom navigation bar
const SEND_BUTTON_SIZE = 40;

export default function ChatDetailScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const conversationId = parseInt(id, 10);
  const insets = useSafeAreaInsets();

  const { messages, isLoading, error, fetchMessages, sendMessage } = useChatStore();

  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const currentMessages = messages[conversationId] || [];

  // Load messages for this conversation
  useEffect(() => {
    if (conversationId) {
      fetchMessages(conversationId);
    }
  }, [conversationId, fetchMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (currentMessages.length > 0 && !isLoading) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [currentMessages, isLoading]);

  // Handle sending a new message
  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !conversationId) return;

    sendMessage(conversationId, newMessage.trim());
    setNewMessage('');
  }, [conversationId, newMessage, sendMessage]);

  if (isLoading && currentMessages.length === 0) {
    return (
      <SafeAreaView className="flex-1" edges={['bottom', 'left', 'right']}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1" edges={['bottom', 'left', 'right']}>
        <View className="flex-1 items-center justify-center p-6">
          <Feather name="alert-circle" size={40} color="#f87171" />
          <Text className="mt-4 text-center text-base text-red-500">{error}</Text>
          <Pressable
            style={[styles.retryButton]}
            onPress={() => fetchMessages(conversationId)}
            accessibilityLabel={t('common.tryAgain', 'Try again')}
            accessibilityRole="button">
            <Text style={styles.retryButtonText}>{t('common.tryAgain', 'Try again')}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      {/* Main container with KeyboardAvoidingView to handle keyboard appearance */}
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // Adjust offset to account for bottom navigation bar and safe area
        keyboardVerticalOffset={Platform.OS === 'ios' ? BOTTOM_NAV_HEIGHT + 90 : BOTTOM_NAV_HEIGHT}>
        {/* Chat messages area */}
        <FlatList
          ref={flatListRef}
          data={currentMessages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={[
            styles.chatContainer,
            // Add bottom padding to ensure last message is visible above input
            { paddingBottom: 16 }
          ]}
          showsVerticalScrollIndicator
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Feather name="message-square" size={40} color={COLORS.disabled} />
              <Text style={styles.emptyText}>{t('chat.noMessages', 'No messages yet')}</Text>
            </View>
          }
        />

        {/* Professional yellow-themed input container */}
        <View
          style={[
            styles.inputContainer,
            // Add bottom margin to avoid overlap with bottom navigation
            { marginBottom: insets.bottom + BOTTOM_NAV_HEIGHT }
          ]}>
          {/* Text input with professional styling */}
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder={t('chat.inputPlaceholder', 'Type a message...')}
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
              maxLength={500}
              placeholderTextColor={COLORS.placeholder}
            />

            {/* Send button that changes appearance when active */}
            <Pressable
              onPress={handleSendMessage}
              disabled={!newMessage.trim()}
              style={[
                styles.sendButton,
                { backgroundColor: newMessage.trim() ? COLORS.primary : COLORS.disabled }
              ]}
              accessibilityLabel={t('chat.sendButton', 'Send message')}
              accessibilityRole="button">
              <Feather name="send" size={20} color={newMessage.trim() ? 'white' : '#888'} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Styles for professional yellow-themed chat interface
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  keyboardAvoidingContainer: {
    flex: 1
  },
  chatContainer: {
    padding: 16
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
  },
  emptyText: {
    marginTop: 16,
    textAlign: 'center',
    color: COLORS.placeholder,
    fontSize: 16
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
    padding: 10,
    width: '100%'
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100, // Limit height for very long messages
    paddingTop: 8,
    paddingBottom: 8,
    color: COLORS.text
  },
  sendButton: {
    width: SEND_BUTTON_SIZE,
    height: SEND_BUTTON_SIZE,
    borderRadius: SEND_BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 2
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '500'
  }
});
