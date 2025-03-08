import { Feather } from '@expo/vector-icons';
import { useTranslation } from '@i18n/core';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Conversation } from './types';

import { useChatStore } from '~/store/chat';

// Professional color palette - matching the one in [id].tsx
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
          style={({ pressed }) =>
            pressed
              ? {
                  opacity: 0.9,
                  backgroundColor: COLORS.primaryLight
                }
              : {
                  backgroundColor: 'white'
                }
          }
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
              <View
                className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full"
                style={{ backgroundColor: COLORS.primary }}>
                <Text className="text-xs font-bold text-white">{conversation.unreadCount}</Text>
              </View>
            )}
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold" style={{ color: COLORS.text }}>
                {conversation.trainerName}
              </Text>
              <Text className="text-xs text-gray-500" style={{ color: COLORS.placeholder }}>
                {conversation.lastMessageTime}
              </Text>
            </View>
            <Text
              className="text-sm text-gray-600"
              style={{ color: COLORS.placeholder }}
              numberOfLines={1}>
              {conversation.lastMessage}
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={COLORS.disabled} />
        </Pressable>
      </Link>
    );
  }

  if (isLoading && conversations.length === 0) {
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
          <Text className="mt-4 text-center text-base" style={{ color: COLORS.error }}>
            {error}
          </Text>
          <Pressable
            className="mt-6 rounded-lg px-4 py-2"
            style={{ backgroundColor: COLORS.primary }}
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
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: COLORS.background }}
      edges={['bottom', 'left', 'right']}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ConversationItem conversation={item} />}
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-10">
            <Feather name="message-square" size={40} color={COLORS.disabled} />
            <Text className="mt-4 text-center text-gray-500" style={{ color: COLORS.placeholder }}>
              {t('chat.noConversations', 'No conversations yet')}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
