'use client';

import { useState } from 'react';
import { 
  X, 
  Users, 
  Calendar, 
  Settings, 
  Bell, 
  BellOff,
  Shield,
  Pin,
  Link as LinkIcon,
  Copy,
  Check,
  UserPlus,
  LogOut,
  Flag,
  Volume2,
  VolumeX,
  Search,
  Edit,
  Hash,
  Globe,
  Lock
} from 'lucide-react';

export default function GroupInfoPanel({ groupInfo, onClose }) {
  const [isMuted, setIsMuted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock members data
  const members = [
    { id: 1, name: 'John Student', role: 'Student', online: true, lastSeen: 'Just now' },
    { id: 2, name: 'Sarah Helper', role: 'Teaching Assistant', online: true, lastSeen: '2 min ago' },
    { id: 3, name: 'Michael Chen', role: 'Student', online: true, lastSeen: '5 min ago' },
    { id: 4, name: 'Group Admin', role: 'Moderator', online: false, lastSeen: '1 hour ago' },
    { id: 5, name: 'Emily Wilson', role: 'Student', online: true, lastSeen: 'Just now' },
    { id: 6, name: 'David Brown', role: 'Student', online: false, lastSeen: '2 hours ago' },
    { id: 7, name: 'You', role: 'Student', online: true, lastSeen: 'Now' },
  ];

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyLink = () => {
    const link = `https://edplatform.com/discussions/${groupInfo.id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    alert(`Group ${!isMuted ? 'muted' : 'unmuted'}`);
  };

  const handleLeaveGroup = () => {
    if (confirm('Are you sure you want to leave this group?')) {
      alert('You have left the group');
      onClose();
    }
  };

  const handleReportGroup = () => {
    alert('Group reported to administrators');
  };

  return (
    <div className="w-96 border-l bg-white h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Group Info</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Group Header */}
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-gradient-to-r from-primary-dark to-primary-light rounded-xl">
            <Users className="text-white" size={32} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-lg">{groupInfo.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              {groupInfo.type === 'public' ? (
                <Globe className="text-green-500" size={14} />
              ) : (
                <Lock className="text-orange-500" size={14} />
              )}
              <span className="text-sm text-gray-600">{groupInfo.category}</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-600">{groupInfo.members} members</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={handleCopyLink}
            className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2"
          >
            {copied ? (
              <Check className="text-green-500" size={16} />
            ) : (
              <Copy className="text-gray-600" size={16} />
            )}
            <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
          <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
            <UserPlus className="text-gray-600" size={16} />
            <span className="text-sm">Invite</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Description */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Description</h3>
            <button className="text-blue-600 hover:text-blue-800">
              <Edit size={14} />
            </button>
          </div>
          <p className="text-gray-600">{groupInfo.description}</p>
        </div>

        {/* Group Settings */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Group Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  {isMuted ? (
                    <VolumeX className="text-red-500" size={18} />
                  ) : (
                    <Bell className="text-gray-600" size={18} />
                  )}
                  <div>
                    <p className="font-medium text-gray-800">Notifications</p>
                    <p className="text-sm text-gray-600">{isMuted ? 'Muted' : 'All notifications'}</p>
                  </div>
                </div>
                <button
                  onClick={handleMuteToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    isMuted ? 'bg-gray-300' : 'bg-blue-500'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    isMuted ? 'translate-x-1' : 'translate-x-6'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Pin className="text-gray-600" size={18} />
                  <div>
                    <p className="font-medium text-gray-800">Pinned Messages</p>
                    <p className="text-sm text-gray-600">{groupInfo.pinnedMessages.length} pinned</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  View All
                </button>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="text-gray-600" size={18} />
                  <div>
                    <p className="font-medium text-gray-800">Group Rules</p>
                    <p className="text-sm text-gray-600">{groupInfo.rules.length} rules</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  View Rules
                </button>
              </div>
            </div>
          </div>

          {/* Members */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Members</h3>
              <span className="text-sm text-gray-600">
                {filteredMembers.filter(m => m.online).length} online
              </span>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>

            {/* Members List */}
            <div className="space-y-2">
              {filteredMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        member.role === 'Teaching Assistant' ? 'bg-purple-100' :
                        member.role === 'Moderator' ? 'bg-orange-100' :
                        'bg-blue-100'
                      }`}>
                        <span className={`font-bold ${
                          member.role === 'Teaching Assistant' ? 'text-purple-600' :
                          member.role === 'Moderator' ? 'text-orange-600' :
                          'text-blue-600'
                        }`}>
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      {member.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{member.name}</p>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          member.role === 'Teaching Assistant' ? 'bg-purple-100 text-purple-800' :
                          member.role === 'Moderator' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {member.role}
                        </span>
                        {!member.online && (
                          <span className="text-gray-500">{member.lastSeen}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {member.online && (
                    <span className="text-xs text-green-600">Online</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Group Details */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Group Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Created</span>
                <span className="font-medium">{groupInfo.created}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type</span>
                <span className="font-medium capitalize">{groupInfo.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium">{groupInfo.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Messages</span>
                <span className="font-medium">1,248</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t space-y-3">
        <button
          onClick={handleLeaveGroup}
          className="w-full p-3 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg flex items-center justify-center space-x-2"
        >
          <LogOut size={16} />
          <span>Leave Group</span>
        </button>
        
        <button
          onClick={handleReportGroup}
          className="w-full p-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-center space-x-2"
        >
          <Flag size={16} />
          <span>Report Group</span>
        </button>
      </div>
    </div>
  );
}