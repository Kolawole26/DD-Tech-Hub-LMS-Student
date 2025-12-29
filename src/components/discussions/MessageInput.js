'use client';

import { useState, useRef } from 'react';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Image, 
  Code,
  X,
  Mic,
  Video
} from 'lucide-react';
import EmojiPicker from '@/components/common/EmojiPicker';

export default function MessageInput({ onSendMessage, onTypingChange, onFileUploadClick }) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message.trim(), attachments);
      setMessage('');
      setAttachments([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    onTypingChange(e.target.value.length > 0);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji.native);
    setShowEmojiPicker(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleVoiceMessage = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording
      alert('Starting voice recording...');
    } else {
      // Stop recording and send
      alert('Voice message sent!');
    }
  };

  const [attachments, setAttachments] = useState([]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: (file.size / 1024).toFixed(1) + ' KB',
      file,
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  return (
    <div className="p-4">
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">
              {attachments.length} file(s) attached
            </span>
            <button
              onClick={() => setAttachments([])}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {attachments.map(att => (
              <div key={att.id} className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border">
                {att.type.startsWith('image/') ? (
                  <Image className="text-blue-500" size={16} />
                ) : att.type.includes('code') || att.name.endsWith('.js') || att.name.endsWith('.css') ? (
                  <Code className="text-green-500" size={16} />
                ) : (
                  <Paperclip className="text-gray-500" size={16} />
                )}
                <span className="text-sm truncate max-w-xs">{att.name}</span>
                <button
                  onClick={() => removeAttachment(att.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-end space-x-2">
          {/* Left Actions */}
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={onFileUploadClick}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Paperclip size={20} />
            </button>
            <label className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg cursor-pointer">
              <Image size={20} />
              <input
                type="file"
                multiple
                accept="image/*,application/pdf,.doc,.docx,.txt,.js,.css,.html"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg relative"
            >
              <Smile size={20} />
            </button>
          </div>

          {/* Textarea */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here... (Shift + Enter for new line)"
              rows="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
              style={{ minHeight: '48px' }}
            />
            
            {/* Quick Formatting */}
            <div className="absolute right-2 bottom-2 flex items-center space-x-1">
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-gray-600 text-xs"
                title="Code block"
              >
                {`</>`}
              </button>
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-gray-600 text-xs font-bold"
                title="Bold"
              >
                B
              </button>
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-gray-600 text-xs italic"
                title="Italic"
              >
                I
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={handleVoiceMessage}
              className={`p-2 rounded-lg ${
                isRecording
                  ? 'text-red-600 bg-red-50 animate-pulse'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              <Mic size={20} />
            </button>
            <button
              type="submit"
              disabled={!message.trim() && attachments.length === 0}
              className={`p-2 rounded-lg ${
                message.trim() || attachments.length > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-full left-0 mb-2 z-10">
            <EmojiPicker onSelect={handleEmojiSelect} />
          </div>
        )}
      </form>

      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-3">
        {/* <div className="flex items-center space-x-4 text-sm text-gray-500">
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <Video size={14} />
            <span>Start Video Call</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-green-600">
            <Code size={14} />
            <span>Share Code Snippet</span>
          </button>
        </div> */}
        
        <div className="text-xs text-gray-400">
          Press Enter to send • Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}