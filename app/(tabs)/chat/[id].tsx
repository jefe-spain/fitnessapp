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
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MessageBubble } from './components/MessageBubble';

import { Header } from '~/components/navigation/Header';
import { useChatStore } from '~/store/chat';

export default function ChatDetailScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const conversationId = parseInt(id, 10);

  const { messages, conversations, isLoading, error, fetchMessages, sendMessage } = useChatStore();

  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // Get the current conversation
  const conversation = conversations.find((c) => c.id === conversationId);
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
        <Header title={conversation?.trainerName || t('chat.conversation', 'Conversation')} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1" edges={['bottom', 'left', 'right']}>
        <Header title={conversation?.trainerName || t('chat.conversation', 'Conversation')} />
        <View className="flex-1 items-center justify-center p-6">
          <Feather name="alert-circle" size={40} color="#f87171" />
          <Text className="mt-4 text-center text-base text-red-500">{error}</Text>
          <Pressable
            className="mt-6 rounded-lg bg-blue-500 px-4 py-2"
            onPress={() => fetchMessages(conversationId)}
            accessibilityLabel={t('common.tryAgain', 'Try again')}
            accessibilityRole="button">
            <Text className="text-white">{t('common.tryAgain', 'Try again')}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom', 'left', 'right']}>
      <Header title={conversation?.trainerName || t('chat.conversation', 'Conversation')} />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <FlatList
          ref={flatListRef}
          data={currentMessages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerClassName="p-4"
          showsVerticalScrollIndicator
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-10">
              <Feather name="message-square" size={40} color="#ccc" />
              <Text className="mt-4 text-center text-gray-500">
                {t('chat.noMessages', 'No messages yet')}
              </Text>
            </View>
          }
        />

        <View className="border-t border-gray-200 bg-white p-2">
          <View className="flex-row items-center rounded-full border border-gray-300 bg-gray-50 px-3 py-2">
            <TextInput
              className="flex-1 text-base text-gray-700"
              placeholder={t('chat.inputPlaceholder', 'Type a message...')}
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
              maxLength={500}
              onSubmitEditing={handleSendMessage}
              returnKeyType="send"
            />
            <Pressable
              onPress={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`ml-2 rounded-full p-2 ${
                newMessage.trim() ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              accessibilityLabel={t('chat.sendButton', 'Send message')}
              accessibilityRole="button">
              <Feather name="send" size={20} color={newMessage.trim() ? 'white' : '#999'} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
