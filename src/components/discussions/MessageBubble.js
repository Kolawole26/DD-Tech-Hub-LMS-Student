'use client';

import { useState } from 'react';
import { 
  ThumbsUp, 
  Heart, 
  Laugh, 
  Smile, 
  MoreVertical,
  Trash2,
  Pin,
  Flag,
  Copy,
  Edit,
  Clock,
  FileText,
  Image,
  Download,
  X
} from 'lucide-react';

export default function MessageBubble({ message, showSender, onReaction, onDelete }) {
  const [showReactions, setShowReactions] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);

  const isOwnMessage = message.isOwn;
  const isSystemMessage = message.isSystem;

  const reactions = [
    { emoji: '👍', icon: ThumbsUp, label: 'Like' },
    { emoji: '❤️', icon: Heart, label: 'Love' },
    { emoji: '😂', icon: Laugh, label: 'Haha' },
    { emoji: '😮', icon: Smile, label: 'Wow' },
  ];

  const handleReaction = (reaction) => {
    onReaction(message.id, reaction);
    setShowReactions(false);
  };

  const handleDelete = () => {
    onDelete(message.id);
    setShowMenu(false);
  };

  const handleSaveEdit = () => {
    // In real app, this would update the message in backend
    alert('Message updated!');
    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    alert('Message copied to clipboard!');
    setShowMenu(false);
  };

  const formatFileSize = (size) => {
    if (size.includes('KB')) return size;
    const kb = parseInt(size) / 1024;
    return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    <div className={`group relative ${isOwnMessage ? 'flex justify-end' : ''}`}>
      {/* Sender Info for others' messages */}
      {!isOwnMessage && !isSystemMessage && showSender && (
        <div className="flex items-center space-x-2 mb-1 ml-14">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
              message.sender.role === 'Teaching Assistant' ? 'bg-purple-500' :
              message.sender.role === 'Moderator' ? 'bg-orange-500' :
              'bg-blue-500'
            }`}>
              {message.sender.avatar}
            </div>
            <div>
              <span className="text-sm font-medium text-gray-800">
                {message.sender.name}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {message.sender.role}
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-400">{message.timestamp}</span>
        </div>
      )}

      {/* System Message */}
      {isSystemMessage ? (
        <div className="text-center my-4">
          <div className="inline-block px-4 py-2 bg-gray-100 rounded-lg">
            <span className="text-sm text-gray-600">{message.content}</span>
            <span className="text-xs text-gray-400 ml-2">{message.timestamp}</span>
          </div>
        </div>
      ) : (
        /* Regular Message Bubble */
        <div className={`flex ${isOwnMessage ? 'justify-end' : ''}`}>
          {/* Message Actions (Left side for others' messages) */}
          {!isOwnMessage && (
            <div className="flex flex-col items-center mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setShowReactions(!showReactions)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <ThumbsUp size={16} />
              </button>
            </div>
          )}

          {/* Message Content */}
          <div className={`max-w-xl ${isOwnMessage ? 'order-2' : 'order-1'}`}>
            <div
              className={`rounded-2xl p-4 ${
                isOwnMessage
                  ? 'bg-gradient-to-r from-primary-dark to-primary-dark text-white rounded-br-none'
                  : 'bg-white border border-gray-200 rounded-bl-none'
              }`}
            >
              {/* Pinned Indicator */}
              {message.isPinned && (
                <div className={`flex items-center space-x-1 mb-2 ${
                  isOwnMessage ? 'text-blue-100' : 'text-yellow-600'
                }`}>
                  <Pin size={12} />
                  <span className="text-xs">Pinned</span>
                </div>
              )}

              {/* Message Text */}
              {isEditing ? (
                <div className="space-y-2">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full p-2 border rounded-lg text-gray-800"
                    rows="3"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveEdit}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className={`whitespace-pre-wrap ${isOwnMessage ? 'text-white' : 'text-gray-800'}`}>
                  {message.content}
                </p>
              )}

              {/* Attachments */}
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.attachments.map(att => (
                    <div
                      key={att.id}
                      className={`p-3 rounded-lg border ${
                        isOwnMessage
                          ? 'bg-blue-400/20 border-blue-300/30'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {att.type.includes('image') ? (
                            <Image className="text-blue-500" size={20} />
                          ) : (
                            <FileText className="text-gray-500" size={20} />
                          )}
                          <div>
                            <p className={`text-sm font-medium ${
                              isOwnMessage ? 'text-blue-100' : 'text-gray-800'
                            }`}>
                              {att.name}
                            </p>
                            <p className={`text-xs ${
                              isOwnMessage ? 'text-blue-200' : 'text-gray-500'
                            }`}>
                              {formatFileSize(att.size)} • {att.type}
                            </p>
                          </div>
                        </div>
                        <button className={`p-1 rounded ${
                          isOwnMessage
                            ? 'text-blue-200 hover:text-white hover:bg-blue-400/30'
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                        }`}>
                          <Download size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reactions */}
              {Object.keys(message.reactions).length > 0 && (
                <div className={`flex flex-wrap gap-1 mt-3 ${
                  isOwnMessage ? 'justify-end' : 'justify-start'
                }`}>
                  {Object.entries(message.reactions).map(([emoji, count]) => (
                    <div
                      key={emoji}
                      className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 ${
                        isOwnMessage
                          ? 'bg-blue-400/30 text-blue-100'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span>{emoji}</span>
                      <span>{count}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Timestamp and Status */}
              <div className={`flex items-center justify-between mt-2 ${
                isOwnMessage ? 'text-primary-lighter' : 'text-gray-500'
              }`}>
                <span className="text-xs">{message.timestamp}</span>
                {isOwnMessage && (
                  <div className="flex items-center space-x-1">
                    <span className="text-xs">✓✓</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Message Actions (Right side for own messages) */}
          {isOwnMessage && (
            <div className="flex flex-col items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity order-1">
              <button
                onClick={() => setShowReactions(!showReactions)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <ThumbsUp size={16} />
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <MoreVertical size={16} />
                </button>
                
                {showMenu && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border z-10">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setShowMenu(false);
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={handleCopy}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                    >
                      <Copy size={14} />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={() => {
                        onReaction(message.id, '📌');
                        setShowMenu(false);
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                    >
                      <Pin size={14} />
                      <span>Pin</span>
                    </button>
                    <hr />
                    <button
                      onClick={handleDelete}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reactions Picker */}
      {showReactions && (
        <div className={`absolute ${
          isOwnMessage ? 'right-14' : 'left-14'
        } bottom-full mb-2 bg-white rounded-full shadow-lg border p-1 flex space-x-1 z-10`}>
          {reactions.map((reaction) => (
            <button
              key={reaction.emoji}
              onClick={() => handleReaction(reaction.emoji)}
              className="p-2 hover:bg-gray-100 rounded-full transition-transform hover:scale-125"
              title={reaction.label}
            >
              <reaction.icon size={18} className="text-gray-600" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}