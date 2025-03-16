import { Feather } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  // Render status indicators (ticks) based on message status
  const renderStatusIndicator = () => {
    if (!isUser || !message.status) return null;

    switch (message.status) {
      case 'sent':
        return <Feather name="check" size={12} className="ml-0.5 text-gray-400" />;
      case 'delivered':
        return (
          <View className="h-3 w-[18px] flex-row items-center justify-center">
            <Feather
              name="check"
              size={12}
              className="absolute left-0 -translate-x-0.5 text-gray-400"
            />
            <Feather
              name="check"
              size={12}
              className="absolute left-0 translate-x-0.5 text-gray-400"
            />
          </View>
        );
      case 'read':
        return (
          <View className="h-3 w-[18px] flex-row items-center justify-center">
            <Feather
              name="check"
              size={12}
              className="absolute left-0 -translate-x-0.5 text-yellow-600"
            />
            <Feather
              name="check"
              size={12}
              className="absolute left-0 translate-x-0.5 text-yellow-600"
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className={`my-1.5 max-w-[80%] ${isUser ? 'self-end' : 'self-start'}`}>
      <View
        className={`
          min-w-[100px] rounded-2xl px-3.5 pb-6 pt-2.5
          shadow-sm
          ${isUser ? 'rounded-tr-sm bg-[#FFF4D4]' : 'rounded-tl-sm border border-gray-100 bg-white'}
        `}>
        <Text
          className={`
            mr-[42px] pb-0.5 text-base leading-[22px] text-[#333333]
          `}>
          {message.text}
        </Text>

        <View className="absolute bottom-2 right-3.5 flex-row items-center">
          <Text className={`mr-0.5 text-xs ${isUser ? 'text-[#D4A72C]' : 'text-gray-400'}`}>
            {message.time}
          </Text>
          {renderStatusIndicator()}
        </View>
      </View>
    </View>
  );
}
