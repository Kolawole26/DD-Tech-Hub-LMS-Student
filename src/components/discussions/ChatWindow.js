'use client';

import { forwardRef, useState, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { 
  Pin,
  Users,
  FileText,
  Image,
  Download,
  Clock
} from 'lucide-react';

// Define static messages outside component
const STATIC_MESSAGES = [
  {
    id: 1,
    sender: {
      id: 'user1',
      name: 'John Student',
      avatar: 'JS',
      role: 'Student'
    },
    content: 'Hi everyone! I\'m having trouble with the CSS grid assignment. Any tips?',
    timestamp: '10:30 AM',
    isOwn: false,
    reactions: { '👍': 3, '❤️': 1 },
    attachments: [],
  },
  {
    id: 2,
    sender: {
      id: 'user2',
      name: 'Sarah Helper',
      avatar: 'SH',
      role: 'Teaching Assistant'
    },
    content: 'Sure John! The key is to understand the grid-template-columns property. Have you tried using fr units?',
    timestamp: '10:32 AM',
    isOwn: false,
    reactions: { '👍': 5 },
    attachments: [],
  },
  {
    id: 3,
    sender: {
      id: 'user3',
      name: 'You',
      avatar: 'ME',
      role: 'Student'
    },
    content: 'Thanks Sarah! I was using px units. Let me try fr units instead.',
    timestamp: '10:35 AM',
    isOwn: true,
    reactions: {},
    attachments: [],
  },
  {
    id: 4,
    sender: {
      id: 'mod1',
      name: 'Group Admin',
      avatar: 'GA',
      role: 'Moderator'
    },
    content: 'Reminder: Assignment 2 is due this Friday! Don\'t forget to submit.',
    timestamp: '11:00 AM',
    isOwn: false,
    isPinned: true,
    reactions: { '📌': 8 },
    attachments: [],
  },
];

const ChatWindow = forwardRef(({ isTyping }, ref) => {
  const [messages, setMessages] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Use static data
    setMessages(STATIC_MESSAGES);
  }, []);

  const handleReaction = (messageId, reaction) => {
    setMessages(prev =>
      prev.map(msg => {
        if (msg.id === messageId) {
          const currentReactions = { ...msg.reactions };
          if (currentReactions[reaction]) {
            currentReactions[reaction] += 1;
          } else {
            currentReactions[reaction] = 1;
          }
          return { ...msg, reactions: currentReactions };
        }
        return msg;
      })
    );
  };

  const handleDeleteMessage = (messageId) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    }
  };

  const pinnedMessages = messages.filter(msg => msg.isPinned);

  if (!isClient) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-dark mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Pinned Messages */}
      {pinnedMessages.length > 0 && (
        <div className="border-b bg-yellow-50">
          <div className="px-4 py-2">
            <div className="flex items-center space-x-2 mb-2">
              <Pin className="text-yellow-600" size={16} />
              <span className="text-sm font-medium text-yellow-800">Pinned Messages</span>
            </div>
            <div className="space-y-2">
              {pinnedMessages.map((msg) => (
                <div key={msg.id} className="bg-white border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-yellow-600">
                        {msg.sender.avatar}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{msg.sender.name}</span>
                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div 
        ref={ref}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {/* Welcome Message */}
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-dark to-primary-light rounded-full flex items-center justify-center">
            <Users className="text-white" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Welcome to Web App Development Discussion!
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            This is the general discussion for all students. Ask questions, share resources, and collaborate!
          </p>
        </div>

        {/* Messages */}
        {messages.map((message, index) => {
          const showSender = index === 0 || 
            messages[index - 1].sender.id !== message.sender.id;

          return (
            <MessageBubble
              key={message.id}
              message={message}
              showSender={showSender}
              onReaction={handleReaction}
              onDelete={handleDeleteMessage}
            />
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center space-x-2 p-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">TA</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
            </div>
            <span className="text-sm text-gray-500">Teaching Assistant is typing...</span>
          </div>
        )}

        {/* Online Users */}
        <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-8 h-8 border-2 border-white rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
              ></div>
            ))}
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              <span className="font-medium">45 members</span> are online now
            </p>
          </div>
          <Clock className="text-gray-400" size={16} />
        </div>
      </div>
    </div>
  );
});

ChatWindow.displayName = 'ChatWindow';

export default ChatWindow;