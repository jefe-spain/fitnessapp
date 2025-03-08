export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'trainer';
  time: string;
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
