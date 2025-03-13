import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

import { Message } from '../types';

// Professional color palette
const COLORS = {
  userBubble: '#FFF4D4', // Light professional yellow
  userText: '#333333',
  userTimeText: '#D4A72C', // Darker yellow for time
  trainerBubble: '#FFFFFF',
  trainerText: '#333333',
  trainerTimeText: '#999999',
  tickSent: '#92A0A8',
  tickRead: '#D4A72C' // Yellow for read ticks
};

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  // Render status indicators (ticks) based on message status
  const renderStatusIndicator = () => {
    if (!isUser || !message.status) return null;

    switch (message.status) {
      case 'sent':
        return <Feather name="check" size={12} color={COLORS.tickSent} style={styles.statusIcon} />;
      case 'delivered':
        return (
          <View style={styles.doubleTickContainer}>
            <Feather
              name="check"
              size={12}
              color={COLORS.tickSent}
              style={[styles.statusIcon, styles.doubleTickFirst]}
            />
            <Feather
              name="check"
              size={12}
              color={COLORS.tickSent}
              style={[styles.statusIcon, styles.doubleTickSecond]}
            />
          </View>
        );
      case 'read':
        return (
          <View style={styles.doubleTickContainer}>
            <Feather
              name="check"
              size={12}
              color={COLORS.tickRead}
              style={[styles.statusIcon, styles.doubleTickFirst]}
            />
            <Feather
              name="check"
              size={12}
              color={COLORS.tickRead}
              style={[styles.statusIcon, styles.doubleTickSecond]}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.trainerContainer]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.trainerBubble]}>
        <Text style={[styles.messageText, isUser ? styles.userText : styles.trainerText]}>
          {message.text}
        </Text>

        {/* Time and status indicator container */}
        <View style={styles.metadataContainer}>
          <Text style={[styles.timeText, isUser ? styles.userTimeText : styles.trainerTimeText]}>
            {message.time}
          </Text>

          {/* Status indicators (ticks) */}
          {renderStatusIndicator()}
        </View>
      </View>
    </View>
  );
}

// Professional message bubble styles
const styles = StyleSheet.create({
  container: {
    marginVertical: 6, // Increased vertical spacing between messages
    maxWidth: '80%'
  },
  userContainer: {
    alignSelf: 'flex-end'
  },
  trainerContainer: {
    alignSelf: 'flex-start'
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 14, // Increased horizontal padding
    paddingTop: 10, // Increased top padding
    paddingBottom: 24, // Extra space for the time and status indicators
    minWidth: 100, // Increased minimum width for short messages
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1 // Subtle shadow for depth
  },
  userBubble: {
    backgroundColor: COLORS.userBubble,
    borderTopRightRadius: 4 // Pointed edge on user side
  },
  trainerBubble: {
    backgroundColor: COLORS.trainerBubble,
    borderTopLeftRadius: 4, // Pointed edge on trainer side
    borderWidth: 1,
    borderColor: '#F0F0F0' // Light border for trainer bubbles
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginRight: 42, // Increased space for time and status indicators
    paddingBottom: 2 // Extra space between text and metadata
  },
  userText: {
    color: COLORS.userText
  },
  trainerText: {
    color: COLORS.trainerText
  },
  // Container for time and status indicators
  metadataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 14, // Aligned with horizontal padding
    bottom: 8 // Increased bottom spacing
  },
  timeText: {
    fontSize: 11,
    marginRight: 3 // Increased spacing between time and ticks
  },
  userTimeText: {
    color: COLORS.userTimeText
  },
  trainerTimeText: {
    color: COLORS.trainerTimeText
  },
  // Status indicator styles
  statusIcon: {
    marginLeft: 2
  },
  doubleTickContainer: {
    flexDirection: 'row',
    width: 18, // Increased width
    height: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  doubleTickFirst: {
    position: 'absolute',
    left: 0,
    transform: [{ translateX: -2 }]
  },
  doubleTickSecond: {
    position: 'absolute',
    left: 0,
    transform: [{ translateX: 2 }]
  }
});
