import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout.component';
import { Chat } from '../components/chat.component';
import styles from '../styles/dashboard-layout.module.scss';
import { Button, ouraColors, Typography } from '@/lib/dsl/dsl';
import { chatService } from '@/services/chat/chat-service';
import { Conversation } from '../types/chat.types';
import { dummyConversations, groupConversationsByDate } from '../helpers/dummy-data';

export const Dashboard: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);

  useEffect(() => {
    handleCreateNewChat();
    const fetchData = async () => {
      try {
        setConversations(dummyConversations);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateNewChat = async () => {
    try {
      const newConversation = await chatService.createConversation('New Chat');
      setConversations([...conversations, newConversation]);
      setSelectedConversation(newConversation.id);
    } catch (error) {
      console.error('Error creating new conversation:', error);
    }
  };

  const groupedConversations = groupConversationsByDate(conversations);

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.leftSidebar}>
          <div className={styles.sidebarHeader}>
            <Typography variant="h2-bold" color={ouraColors['text-900']}>
              Oura AI
            </Typography>
            <Button 
              variant="primary" 
              size="small" 
              label="New Chat" 
              onClick={handleCreateNewChat} 
              className={styles.newChatButton}
            />
          </div>
          <div className={styles.promptsList}>
            {Object.entries(groupedConversations).map(([group, conversations]) => (
              conversations.length > 0 && (
                <div key={group} className={styles.conversationGroup}>
                  <Typography variant="body-bold" color={ouraColors['text-700']}>
                    {group.charAt(0).toUpperCase() + group.slice(1).toLocaleLowerCase()}
                  </Typography>
                  {conversations.map((conversation: Conversation) => (
                    <div
                      key={conversation.id}
                      className={`${styles.conversationItem} ${
                        selectedConversation === conversation.id ? styles.selected : ''
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <Typography variant="body-regular" color={ouraColors['text-1000']}>
                        {conversation.title}
                      </Typography>
                    </div>
                  ))}
                </div>
              )
            ))}
          </div>
          <div className={styles.sidebarFooter}>
            <Button
              variant="secondary"
              size="small"
              label="Logout"
              onClick={() => {
                // Handle logout logic here
              }}
              className={styles.logoutButton}
            />
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.chatMessages}>
            {true ? (
              <Chat conversationId={selectedConversation || ''} />
            ) : (
              <div className={styles.emptyState}>
                <Typography 
                  variant="h2-bold" 
                  color={ouraColors['text-1000']}
                >
                  What can I help with?
                </Typography>
              </div>
            )}
          </div>
          
          <div className={styles.chatInputContainer}>
            <input 
              type="text" 
              className={styles.chatInput}
              placeholder="Type your prompt..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button 
              variant="primary" 
              className={styles.newChatButton}
              label='Send'
              onClick={() => {
                // Handle send message
                setInput('');
              }}
            />
          </div>
        </div>

        <div className={styles.rightSidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.avatarContainer}>
              <Typography variant="h3-bold" color={ouraColors['text-900']}>
                Tools
              </Typography>
              <div 
                className={styles.avatar}
                onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}
              >
                <span>GP</span>
              </div>
              {showLogoutDropdown && (
                <div className={styles.logoutDropdown}>
                  <Button 
                    variant="secondary" 
                    className={styles.logoutButton}
                    onClick={() => {/* Handle logout */}}
                    label='Logout'
                  />
                </div>
              )}
            </div>
          </div>

          <div className={styles.sidebarSection}>
            <Typography variant="h3-bold" color={ouraColors['text-900']}>
              Suggested Prompts
            </Typography>
            <div className={styles.suggestedPrompts}>
              {/* Suggested prompts will be populated here */}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};