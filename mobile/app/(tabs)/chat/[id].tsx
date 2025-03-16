import { Feather } from '@expo/vector-icons';
import { useTranslation } from '@i18n/core';
import { useChatStore } from '@store/chat';
import { useHeaderStore } from '@store/header';
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
  ActivityIndicator
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import MessageBubble from './components/MessageBubble';

// Professional color palette
const COLORS = {
  primary: '#D4A72C', // Professional yellow
  primaryLight: '#FFF4D4',
  background: '#F8F8F8',
  inputBackground: '#FFFFFF',
  border: '#E0E0E0',
  text: '#333333',
  placeholder: '#999999',
  disabled: '#E0E0E0',
  error: '#f87171'
};

// Constants for layout calculations
const BOTTOM_NAV_HEIGHT = 60; // Assumed height of bottom navigation bar
const SEND_BUTTON_SIZE = 40;

export default function ChatDetailScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const conversationId = parseInt(id, 10);
  const insets = useSafeAreaInsets();

  const { messages, conversations, isLoading, error, fetchMessages, sendMessage } = useChatStore();
  const { setTitle } = useHeaderStore();
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // Get the current conversation
  const conversation = conversations.find((c) => c.id === conversationId);
  const currentMessages = messages[conversationId] || [];

  // Set the header title when the conversation data is available
  useEffect(() => {
    if (conversation) {
      setTitle(conversation.trainerName);
    } else {
      setTitle(t('chat.conversation', 'Conversation'));
    }
    return () => setTitle('');
  }, [conversation, setTitle, t]);

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
          <Feather name="alert-circle" size={40} color={COLORS.error} />
          <Text className="mt-4 text-center text-base text-red-500">{error}</Text>
          <Pressable
            className="mt-4 rounded-lg bg-[#D4A72C] px-5 py-2.5"
            onPress={() => fetchMessages(conversationId)}
            accessibilityLabel={t('common.tryAgain', 'Try again')}
            accessibilityRole="button">
            <Text className="font-medium text-white">{t('common.tryAgain', 'Try again')}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8]" edges={['left', 'right']}>
      {/* Main container with KeyboardAvoidingView to handle keyboard appearance */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? BOTTOM_NAV_HEIGHT + 90 : BOTTOM_NAV_HEIGHT}>
        {/* Chat messages area */}
        <FlatList
          ref={flatListRef}
          data={currentMessages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={{ padding: 16, paddingBottom: 16 }}
          showsVerticalScrollIndicator
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-10">
              <Feather name="message-square" size={40} className="text-gray-300" />
              <Text className="mt-4 text-center text-base text-gray-400">
                {t('chat.noMessages', 'No messages yet')}
              </Text>
            </View>
          }
        />

        {/* Professional yellow-themed input container */}
        <View
          className="w-full border-t border-[#E0E0E0] bg-[#F8F8F8] p-2.5"
          style={{ marginBottom: insets.bottom + BOTTOM_NAV_HEIGHT }}>
          {/* Text input with professional styling */}
          <View className="flex-row items-end rounded-3xl border border-[#E0E0E0] bg-white px-4 py-2.5 shadow-sm">
            <TextInput
              className="max-h-[100px] flex-1 py-2 text-base text-[#333333]"
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
              className={`-mb-0.5 ml-2.5 h-[40px] w-[40px] items-center justify-center rounded-full
                ${newMessage.trim() ? 'bg-[#D4A72C]' : 'bg-[#E0E0E0]'}`}
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
