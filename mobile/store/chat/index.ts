import { create } from 'zustand';

import { Message, Conversation, MessageStatus } from '~/app/(tabs)/chat/types';

interface ChatState {
  messages: Record<number, Message[]>;
  conversations: Conversation[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchMessages: (conversationId: number) => Promise<void>;
  sendMessage: (conversationId: number, text: string) => Promise<void>;
  fetchConversations: () => Promise<void>;
  updateMessageStatus: (conversationId: number, messageId: number, status: MessageStatus) => void;
}

// Mock data for initial conversations
const mockConversations: Conversation[] = [
  {
    id: 1,
    trainerId: 101,
    trainerName: 'Sarah Mitchell',
    trainerAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'Great work on your workout yesterday!',
    lastMessageTime: '9:36 AM',
    unreadCount: 1
  }
];

// Mock initial messages for conversation 1
const initialMessages: Record<number, Message[]> = {
  1: [
    {
      id: 1,
      text: 'Great work on your workout yesterday!',
      sender: 'trainer',
      time: '9:30 AM'
    },
    {
      id: 2,
      text: "Thanks! I'm feeling much stronger already.",
      sender: 'user',
      time: '9:35 AM',
      status: 'read'
    },
    {
      id: 3,
      text: "Ready for today's session?",
      sender: 'trainer',
      time: '9:36 AM'
    }
  ]
};

export const useChatStore = create<ChatState>((set, get) => ({
  messages: {},
  conversations: [],
  isLoading: false,
  error: null,

  fetchMessages: async (conversationId: number) => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Return mock data
      set((state) => ({
        isLoading: false,
        messages: {
          ...state.messages,
          [conversationId]: initialMessages[conversationId] || []
        }
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch messages'
      });
    }
  },

  sendMessage: async (conversationId: number, text: string) => {
    if (!text.trim()) return;

    const currentMessages = get().messages[conversationId] || [];
    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const newUserMessage: Message = {
      id: currentMessages.length + 1,
      text: text.trim(),
      sender: 'user',
      time: currentTime,
      status: 'sent' // Initial status is 'sent'
    };

    // Update messages with user message
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), newUserMessage]
      }
    }));

    // Update conversation last message
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: text.trim(),
              lastMessageTime: currentTime,
              unreadCount: 0
            }
          : conv
      )
    }));

    // Simulate message status updates
    setTimeout(() => {
      // Update to 'delivered' after 1 second
      get().updateMessageStatus(conversationId, newUserMessage.id, 'delivered');
    }, 1000);

    // Simulate trainer response after a delay
    setTimeout(
      async () => {
        // Update to 'read' when trainer responds
        get().updateMessageStatus(conversationId, newUserMessage.id, 'read');

        const responses = [
          'Great! Keep up the good work.',
          "Awesome! You're making great progress.",
          "How are you feeling after yesterday's workout?",
          'Remember to stay hydrated during your workouts!'
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const trainerResponseTime = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        const currentMessagesUpdated = get().messages[conversationId] || [];
        const trainerResponse: Message = {
          id: currentMessagesUpdated.length + 1,
          text: randomResponse,
          sender: 'trainer',
          time: trainerResponseTime
        };

        // Update messages with trainer response
        set((state) => ({
          messages: {
            ...state.messages,
            [conversationId]: [...(state.messages[conversationId] || []), trainerResponse]
          }
        }));

        // Update conversation last message
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  lastMessage: randomResponse,
                  lastMessageTime: trainerResponseTime,
                  unreadCount: 1
                }
              : conv
          )
        }));
      },
      2000 + Math.random() * 1000
    ); // Random delay between 2-3 seconds
  },

  fetchConversations: async () => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Return mock data
      set({
        isLoading: false,
        conversations: mockConversations,
        messages: initialMessages
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch conversations'
      });
    }
  },

  updateMessageStatus: (conversationId: number, messageId: number, status: MessageStatus) => {
    set((state) => {
      const conversationMessages = state.messages[conversationId] || [];
      const updatedMessages = conversationMessages.map((message) =>
        message.id === messageId && message.sender === 'user' ? { ...message, status } : message
      );

      return {
        messages: {
          ...state.messages,
          [conversationId]: updatedMessages
        }
      };
    });
  }
}));
