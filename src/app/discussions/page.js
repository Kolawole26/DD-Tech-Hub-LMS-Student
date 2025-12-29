'use client';

import { useState, useEffect, useRef } from 'react';
import ChatWindow from '@/components/discussions/ChatWindow';
import MessageInput from '@/components/discussions/MessageInput';
import GroupInfoPanel from '@/components/discussions/GroupInfoPanel';
import FileUploadModal from '@/components/discussions/FileUploadModal';
import { 
  MessageSquare, 
  Search, 
  Users, 
  Clock,
  TrendingUp,
  Filter,
  ChevronRight,
  Sparkles,
  Hash,
  AlertCircle,
  Volume2,
  VolumeX,
  Pin,
  MoreVertical,
  Video,
  Phone,
  Info,
  ArrowLeft
} from 'lucide-react';

export default function DiscussionsPage() {
  const [groupInfo, setGroupInfo] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const chatContainerRef = useRef(null);

  // Single general discussion group
  const generalGroup = {
    id: 'general-discussion',
    name: 'Web App Development Discussion',
    description: 'General discussion group for all students in the Web App Development course. Ask questions, share resources, and collaborate with classmates.',
    members: 150,
    online: 45,
    unread: 12,
    lastActivity: 'Just now',
    type: 'public',
    category: 'General',
    created: 'Nov 15, 2025',
    rules: [
      'Be respectful to all members',
      'No spam or self-promotion',
      'Stay on topic with course-related discussions',
      'Use appropriate language',
      'Help each other learn'
    ],
    pinnedMessages: [
      { id: 1, text: 'Welcome to the group! Please introduce yourself.', sender: 'Admin' },
      { id: 2, text: 'Assignment 2 help thread is pinned above.', sender: 'Moderator' },
    ],
    topics: [
      'Assignment Help',
      'Code Reviews',
      'Resource Sharing',
      'Q&A Sessions',
      'Project Collaboration',
      'Study Groups'
    ],
    stats: {
      totalMessages: 1248,
      activeToday: 32,
      questionsAnswered: 89,
      resourcesShared: 45
    }
  };

  // Recent discussions
  const recentDiscussions = [
    {
      id: 'assignment-help',
      title: 'Assignment 2: JavaScript Calculator Help',
      author: 'John Student',
      replies: 24,
      lastReply: '30 minutes ago',
      unread: true,
      pinned: true
    },
    {
      id: 'css-grid',
      title: 'CSS Grid Layout Issues',
      author: 'Sarah Helper',
      replies: 18,
      lastReply: '2 hours ago',
      unread: true,
      pinned: false
    },
    {
      id: 'react-question',
      title: 'React State Management Best Practices?',
      author: 'Michael Chen',
      replies: 42,
      lastReply: '1 day ago',
      unread: false,
      pinned: true
    }
  ];

  useEffect(() => {
    // Simulate fetching group info
    setTimeout(() => {
      setGroupInfo(generalGroup);
    }, 300);
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  const handleSendMessage = (message, attachments = []) => {
    console.log('Sending message:', message, 'with attachments:', attachments);
    // In real app, this would send to backend
  };

  const handleFileUpload = (files) => {
    console.log('Uploading files:', files);
    // In real app, this would upload to server
    setShowFileModal(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    alert(`Notifications ${!isMuted ? 'muted' : 'unmuted'} for the discussion group`);
  };

  const filteredDiscussions = recentDiscussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [showOverview, setShowOverview] = useState(true);

  if (!groupInfo) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading discussion...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-full flex">
        {/* Sidebar - Only show on large screens when in chat view */}
        {showOverview ? (
          <div className="hidden lg:flex flex-col w-96 border-r bg-white h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-primary-dark to-primary-light rounded-xl">
                  <MessageSquare className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Course Discussion</h2>
                  <p className="text-sm text-gray-600">Connect with classmates</p>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>
            </div>

            {/* Recent Discussions */}
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Recent Discussions</h3>
              <div className="space-y-3">
                {filteredDiscussions.map((discussion) => (
                  <button
                    key={discussion.id}
                    onClick={() => setShowOverview(false)}
                    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${discussion.pinned ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                        <Hash className={discussion.pinned ? 'text-yellow-600' : 'text-blue-600'} size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-800">{discussion.title}</span>
                          {discussion.pinned && (
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              Pinned
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <span>By {discussion.author}</span>
                          <span>•</span>
                          <span>{discussion.replies} replies</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Group Stats */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Group Activity</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Online Now</span>
                    <span className="font-semibold">{groupInfo.online}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Members</span>
                    <span className="font-semibold">{groupInfo.members}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Messages Today</span>
                    <span className="font-semibold">{groupInfo.stats.activeToday}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enter Chat Button */}
            <div className="p-4 border-t">
              <button
                onClick={() => setShowOverview(false)}
                className="w-full py-3 bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white font-semibold rounded-lg flex items-center justify-center space-x-2"
              >
                <MessageSquare size={20} />
                <span>Enter Chat</span>
              </button>
            </div>
          </div>
        ) : (
          // Chat Interface
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="border-b bg-white">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowOverview(true)}
                      className="lg:hidden text-gray-600 hover:text-gray-800"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-primary-dark to-primary-light rounded-lg">
                        <Users className="text-white" size={20} />
                      </div>
                      <div>
                        <h2 className="font-bold text-gray-800">{groupInfo.name}</h2>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>{groupInfo.online} online</span>
                          </span>
                          <span>•</span>
                          <span>{groupInfo.members} members</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Search size={20} />
                    </button>
                    {/* <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg">
                      <Video size={20} />
                    </button> */}
                    <button
                      onClick={toggleMute}
                      className={`p-2 rounded-lg ${
                        isMuted 
                          ? 'text-red-600 hover:bg-red-50' 
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <button 
                      onClick={() => setShowInfoPanel(!showInfoPanel)}
                      className={`p-2 rounded-lg ${
                        showInfoPanel 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Info size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 overflow-hidden">
              <ChatWindow 
                ref={chatContainerRef}
                groupId={groupInfo.id}
                isTyping={isTyping}
              />
            </div>

            {/* Message Input */}
            <div className="border-t bg-white">
              <MessageInput 
                onSendMessage={handleSendMessage}
                onTypingChange={setIsTyping}
                onFileUploadClick={() => setShowFileModal(true)}
              />
            </div>
          </div>
        )}

        {/* Group Info Panel */}
        {showInfoPanel && !showOverview && (
          <GroupInfoPanel 
            groupInfo={groupInfo}
            onClose={() => setShowInfoPanel(false)}
          />
        )}
      </div>

      {/* File Upload Modal */}
      <FileUploadModal 
        isOpen={showFileModal}
        onClose={() => setShowFileModal(false)}
        onUpload={handleFileUpload}
      />
    </>
  );
}