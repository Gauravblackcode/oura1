export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
}

export interface GroupedConversations {
  today: Conversation[];
  yesterday: Conversation[];
  lastWeek: Conversation[];
  older: Conversation[];
} 