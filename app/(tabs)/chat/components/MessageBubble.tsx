import { View, Text } from 'react-native';

import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <View
      className={`mb-3 max-w-[80%] rounded-2xl p-3 ${
        isUser ? 'self-end rounded-tr-none bg-blue-500' : 'self-start rounded-tl-none bg-gray-200'
      }`}>
      <Text className={`text-base ${isUser ? 'text-white' : 'text-gray-800'}`}>{message.text}</Text>
      <Text className={`mt-1 text-right text-xs ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
        {message.time}
      </Text>
    </View>
  );
}
