export type MessageStatus = 'sent' | 'delivered' | 'read' | null;

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'trainer';
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: number;
  trainerId: number;
  trainerName: string;
  trainerAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

// This default export is needed to prevent Expo Router from treating this file as a route
export default function ChatTypes() {
  return null;
}
