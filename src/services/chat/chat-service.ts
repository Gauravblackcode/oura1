import { gql } from '@apollo/client';
import { client } from '../../graphql/client';

const GET_CONVERSATIONS = gql`
  query GetConversations {
    getConversations {
      id
      title
      createdAt
      updatedAt
    }
  }
`;

const GET_CONVERSATION = gql`
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
      id
      title
      messages {
        id
        content
        role
        timestamp
      }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($conversationId: ID!, $content: String!) {
    sendMessage(conversationId: $conversationId, content: $content) {
      id
      content
      role
      timestamp
    }
  }
`;

const CREATE_CONVERSATION = gql`
  mutation CreateConversation($title: String!) {
    createConversation(title: $title) {
      id
      title
      createdAt
    }
  }
`;

export const chatService = {
  getConversations: async () => {
    const { data } = await client.query({
      query: GET_CONVERSATIONS,
    });
    return data.getConversations;
  },

  getConversation: async (id: string) => {
    const { data } = await client.query({
      query: GET_CONVERSATION,
      variables: { id },
    });
    return data.getConversation;
  },

  sendMessage: async (conversationId: string, content: string) => {
    const { data } = await client.mutate({
      mutation: SEND_MESSAGE,
      variables: { conversationId, content },
    });
    return data.sendMessage;
  },

  createConversation: async (title: string) => {
    const { data } = await client.mutate({
      mutation: CREATE_CONVERSATION,
      variables: { title },
    });
    // return data.createConversation;
    // Generate random ID and title for dummy data
    const dummyId = `dummy-${Math.random().toString(36).substr(2, 9)}`;
    const titles = [
      'Marketing Strategy',
      'Product Analysis',
      'Customer Feedback',
      'Sales Report',
      'New Chat'
    ];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    
    return {
      id: dummyId,
      title: randomTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Math.random().toString(36).substr(2, 9)}`,
          content: 'Hello! How can I help you today?',
          role: 'assistant',
          timestamp: new Date().toISOString()
        }
      ]
    };
  },
}; 