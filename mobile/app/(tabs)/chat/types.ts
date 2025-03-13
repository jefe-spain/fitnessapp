export type MessageStatus = 'sent' | 'delivered' | 'read' | null;

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'trainer';
  time: string;
  status?: MessageStatus; // Status for user messages: sent, delivered, read
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
