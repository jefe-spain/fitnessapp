import { Feather } from '@expo/vector-icons';
import { useTranslation } from '@i18n/core';
import { Link } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Conversation } from './types';

import { Header } from '~/components/navigation/Header';
import { useChatStore } from '~/store/chat';

export default function ChatScreen() {
  const { t } = useTranslation();
  const { conversations, isLoading, error, fetchConversations } = useChatStore();

  // Load conversations
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Render a conversation item
  function ConversationItem({ conversation }: { conversation: Conversation }) {
    return (
      <Link href={`/(tabs)/chat/${conversation.id}`} asChild>
        <Pressable
          className="mb-2 flex-row items-center rounded-xl bg-white p-3 shadow-sm"
          style={({ pressed }) => (pressed ? { opacity: 0.9 } : {})}
          accessibilityLabel={t('chat.openConversation', 'Open conversation with {{name}}', {
            name: conversation.trainerName
          })}
          accessibilityRole="button">
          <View className="relative mr-3">
            <Image
              source={{ uri: conversation.trainerAvatar }}
              className="h-12 w-12 rounded-full"
              accessibilityLabel={t('chat.trainerAvatar', "{{name}}'s profile picture", {
                name: conversation.trainerName
              })}
            />
            {conversation.unreadCount > 0 && (
              <View className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                <Text className="text-xs font-bold text-white">{conversation.unreadCount}</Text>
              </View>
            )}
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold">{conversation.trainerName}</Text>
              <Text className="text-xs text-gray-500">{conversation.lastMessageTime}</Text>
            </View>
            <Text className="text-sm text-gray-600" numberOfLines={1}>
              {conversation.lastMessage}
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color="#ccc" />
        </Pressable>
      </Link>
    );
  }

  if (isLoading && conversations.length === 0) {
    return (
      <SafeAreaView className="flex-1" edges={['bottom', 'left', 'right']}>
        <Header title={t('navigation.tabs.chat')} showBackButton={false} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1" edges={['bottom', 'left', 'right']}>
        <Header title={t('navigation.tabs.chat')} showBackButton={false} />
        <View className="flex-1 items-center justify-center p-6">
          <Feather name="alert-circle" size={40} color="#f87171" />
          <Text className="mt-4 text-center text-base text-red-500">{error}</Text>
          <Pressable
            className="mt-6 rounded-lg bg-blue-500 px-4 py-2"
            onPress={() => fetchConversations()}
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
      <Header title={t('navigation.tabs.chat')} showBackButton={false} />

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ConversationItem conversation={item} />}
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-10">
            <Feather name="message-square" size={40} color="#ccc" />
            <Text className="mt-4 text-center text-gray-500">
              {t('chat.noConversations', 'No conversations yet')}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
