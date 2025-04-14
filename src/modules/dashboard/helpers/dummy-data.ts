import { Conversation, GroupedConversations } from '../types/chat.types';

export const dummyMessages = [
  { id: 1, sender: 'user', text: 'Hello, how can you help me?' },
  { id: 2, sender: 'ai', text: 'I can help you with various tasks. What would you like to know?' },
  { id: 3, sender: 'user', text: 'Tell me about the features of this platform' },
  { id: 4, sender: 'ai', text: 'This platform allows you to manage your ad campaigns, track performance metrics, and optimize your advertising strategy.' },
];

export const dummyConversations: Conversation[] = [
  // Today's conversations
  {
    id: '1',
    title: 'How to optimize my ad campaign?',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Best practices for audience targeting',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Analyze my campaign performance',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Yesterday's conversations
  {
    id: '4',
    title: 'Create a new ad strategy for Q2',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '5',
    title: 'Review my budget allocation',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '6',
    title: 'Help with ad copywriting',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  // Last week's conversations
  {
    id: '7',
    title: 'Competitor analysis report',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: '8',
    title: 'ROI calculation for my campaigns',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: '9',
    title: 'Social media ad recommendations',
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    updatedAt: new Date(Date.now() - 345600000).toISOString()
  },
  // Older conversations
  {
    id: '10',
    title: 'Yearly campaign planning',
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
    updatedAt: new Date(Date.now() - 2592000000).toISOString()
  },
  {
    id: '11',
    title: 'Market trend analysis',
    createdAt: new Date(Date.now() - 3456000000).toISOString(),
    updatedAt: new Date(Date.now() - 3456000000).toISOString()
  },
  {
    id: '12',
    title: 'Brand positioning strategy',
    createdAt: new Date(Date.now() - 4320000000).toISOString(),
    updatedAt: new Date(Date.now() - 4320000000).toISOString()
  }
];

export const groupConversationsByDate = (conversations: Conversation[]): GroupedConversations => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  return conversations.reduce((acc, conversation) => {
    const convDate = new Date(conversation.createdAt);
    convDate.setHours(0, 0, 0, 0);

    if (convDate.getTime() === today.getTime()) {
      acc.today.push(conversation);
    } else if (convDate.getTime() === yesterday.getTime()) {
      acc.yesterday.push(conversation);
    } else if (convDate > lastWeek) {
      acc.lastWeek.push(conversation);
    } else {
      acc.older.push(conversation);
    }
    return acc;
  }, { today: [], yesterday: [], lastWeek: [], older: [] } as GroupedConversations);
}; 