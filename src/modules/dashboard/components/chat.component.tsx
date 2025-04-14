import React, { useState } from 'react';
import styles from '../styles/dashboard-layout.module.scss';
import { Button, ouraColors, Typography } from '@/lib/dsl/dsl';

// Dummy chat data
const dummyMessages = [
  { id: 1, sender: 'user', text: 'Hello, how can you help me?' },
  { id: 2, sender: 'ai', text: 'I can help you with various tasks. What would you like to know?' },
  { id: 3, sender: 'user', text: 'Tell me about the features of this platform' },
  { id: 4, sender: 'ai', text: 'This platform allows you to manage your ad campaigns, track performance metrics, and optimize your advertising strategy.' },
];

interface ChatProps {
  conversationId: string;
}

export const Chat: React.FC<ChatProps> = ({ conversationId }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(dummyMessages);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input.trim()
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: 'This is a simulated AI response. In a real implementation, this would come from your chat service.'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className={styles.chatSection}>
      <div className={styles.chatMessages}>
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`${styles.message} ${message.sender === 'user' ? styles.userMessage : styles.aiMessage}`}
          >
            <Typography variant="body-regular"
            color='#ffff' 
            >
              {message.text}
            </Typography>
          </div>
        ))}
      </div>
      
   
    </div>
  );
}; 