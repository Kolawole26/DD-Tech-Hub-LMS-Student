'use client';

import { Calendar, AlertCircle, FileText, Video, Flag, Clock, Bell, Eye, MoreVertical, X, CheckCircle, MessageSquare, Share2, Download, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function DeadlineCard({ deadline }) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSnoozeMenu, setShowSnoozeMenu] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSnoozed, setIsSnoozed] = useState(false);

  const getIcon = () => {
    switch (deadline.type) {
      case 'assignment':
        return <FileText className="text-red-500" size={20} />;
      case 'session':
        return <Video className="text-blue-500" size={20} />;
      case 'project':
        return <Flag className="text-purple-500" size={20} />;
      default:
        return <Calendar className="text-gray-500" size={20} />;
    }
  };

  const getBgColor = () => {
    if (isCompleted) return 'bg-green-50 border-green-200';
    if (isSnoozed) return 'bg-yellow-50 border-yellow-200';
    
    switch (deadline.type) {
      case 'assignment':
        return 'bg-red-50 border-red-200';
      case 'session':
        return 'bg-blue-50 border-blue-200';
      case 'project':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getPriorityBadge = () => {
    if (isCompleted) {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center space-x-1">
          <CheckCircle size={12} />
          <span>Completed</span>
        </span>
      );
    }

    switch (deadline.priority) {
      case 'high':
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
            High Priority
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
            Medium Priority
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            Low Priority
          </span>
        );
      default:
        return null;
    }
  };

  const getDaysRemaining = () => {
    // Simple days remaining calculation (you can replace with actual date logic)
    if (deadline.date.includes('Nov 30')) {
      return '3 days left';
    } else if (deadline.date.includes('Dec 5')) {
      return '8 days left';
    } else if (deadline.date.includes('Dec 20')) {
      return '23 days left';
    }
    return '';
  };

  const handleSnooze = (duration) => {
    setIsSnoozed(true);
    setShowSnoozeMenu(false);
    
    // In a real app, this would update the deadline date
    console.log(`Deadline snoozed for ${duration}`);
    
    // Auto-remove snooze status after duration
    setTimeout(() => {
      setIsSnoozed(false);
    }, duration === '1 hour' ? 3600000 : 
       duration === '1 day' ? 86400000 : 
       duration === '3 days' ? 259200000 : 3600000);
  };

  const handleMarkComplete = () => {
    setIsCompleted(true);
    setShowActionsMenu(false);
    setShowDetailsModal(false);
  };

  const handleViewDetails = () => {
    setShowDetailsModal(true);
  };

  const handleShareDeadline = () => {
    if (navigator.share) {
      navigator.share({
        title: `Deadline: ${deadline.title}`,
        text: `Don't forget: ${deadline.title} on ${deadline.date}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`Deadline: ${deadline.title}\nDate: ${deadline.date}\nPriority: ${deadline.priority}`);
      // In a real app, show toast
      console.log('Deadline details copied to clipboard');
    }
  };

  const handleSetReminder = () => {
    // In a real app, this would set a calendar reminder
    console.log('Reminder set for deadline:', deadline.title);
    setShowActionsMenu(false);
  };

  const handleDownloadDetails = () => {
    const content = `Deadline Details\n\nTitle: ${deadline.title}\nType: ${deadline.type}\nDate: ${deadline.date}\nPriority: ${deadline.priority}\nCourse: ${deadline.course || 'N/A'}\nStatus: ${isCompleted ? 'Completed' : 'Pending'}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${deadline.title.replace(/\s+/g, '_')}_deadline.txt`;
    a.click();
  };

  const handleDeleteDeadline = () => {
    // In a real app, this would remove from state/API
    console.log('Deadline deleted:', deadline.title);
    setShowActionsMenu(false);
  };

  return (
    <>
      <div className={`p-4 border rounded-lg ${getBgColor()} hover:shadow-sm transition-shadow relative`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="mt-1">
              {getIcon()}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-gray-800">{deadline.title}</h3>
                {getPriorityBadge()}
                {isSnoozed && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    Snoozed
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{deadline.date}</span>
                </span>
                {getDaysRemaining() && !isCompleted && (
                  <>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{getDaysRemaining()}</span>
                    </span>
                  </>
                )}
                {deadline.course && (
                  <>
                    <span>•</span>
                    <span className="text-blue-600">{deadline.course}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowActionsMenu(!showActionsMenu)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <MoreVertical size={20} />
            </button>
            
            {showActionsMenu && (
              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48">
                <div className="py-1">
                  {!isCompleted && (
                    <>
                      <button
                        onClick={handleMarkComplete}
                        className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center space-x-2"
                      >
                        <CheckCircle size={14} />
                        <span>Mark Complete</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowSnoozeMenu(true);
                          setShowActionsMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50 flex items-center space-x-2"
                      >
                        <Bell size={14} />
                        <span>Snooze</span>
                      </button>
                      <button
                        onClick={handleSetReminder}
                        className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 flex items-center space-x-2"
                      >
                        <Bell size={14} />
                        <span>Set Reminder</span>
                      </button>
                    </>
                  )}
                  <button
                    onClick={handleViewDetails}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Eye size={14} />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={handleShareDeadline}
                    className="w-full text-left px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 flex items-center space-x-2"
                  >
                    <Share2 size={14} />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={handleDownloadDetails}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Download size={14} />
                    <span>Download Details</span>
                  </button>
                  <button
                    onClick={handleDeleteDeadline}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-2 mt-4">
          {!isCompleted && (
            <button 
              onClick={() => setShowSnoozeMenu(true)}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-center space-x-1"
            >
              <Bell size={14} />
              <span>{isSnoozed ? 'Resnooze' : 'Snooze'}</span>
            </button>
          )}
          <button 
            onClick={handleViewDetails}
            className={`flex-1 px-3 py-2 text-sm bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white rounded-lg flex items-center justify-center space-x-1 ${isCompleted ? 'opacity-75' : ''}`}
          >
            <Eye size={14} />
            <span>{isCompleted ? 'View Completed' : 'View Details'}</span>
          </button>
        </div>

        {/* Snooze Menu */}
        {showSnoozeMenu && (
          <div className="absolute top-12 left-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48">
            <div className="p-2">
              <div className="flex items-center justify-between mb-2 px-2">
                <span className="text-sm font-medium text-gray-700">Snooze for</span>
                <button
                  onClick={() => setShowSnoozeMenu(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => handleSnooze('1 hour')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  1 hour
                </button>
                <button
                  onClick={() => handleSnooze('1 day')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  1 day
                </button>
                <button
                  onClick={() => handleSnooze('3 days')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  3 days
                </button>
                <button
                  onClick={() => handleSnooze('1 week')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  1 week
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gray-100">
                  {getIcon()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Deadline Details</h3>
                  <p className="text-sm text-gray-600">Deadline information and actions</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-bold text-gray-800 text-lg mb-2">{deadline.title}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium capitalize">{deadline.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium">{deadline.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Priority</span>
                    <span className="font-medium">{deadline.priority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="font-medium">
                      {isCompleted ? 'Completed' : isSnoozed ? 'Snoozed' : 'Active'}
                    </span>
                  </div>
                  {deadline.course && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Course</span>
                      <span className="font-medium">{deadline.course}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {deadline.description && (
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Description</h4>
                  <p className="text-gray-700">{deadline.description}</p>
                </div>
              )}
              
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                  {!isCompleted && (
                    <>
                      <button
                        onClick={() => {
                          handleMarkComplete();
                          setShowDetailsModal(false);
                        }}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center space-x-2"
                      >
                        <CheckCircle size={16} />
                        <span>Mark Complete</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowSnoozeMenu(true);
                          setShowDetailsModal(false);
                        }}
                        className="px-4 py-2 border border-yellow-500 text-yellow-600 hover:bg-yellow-50 rounded-lg flex items-center justify-center space-x-2"
                      >
                        <Bell size={16} />
                        <span>Snooze</span>
                      </button>
                    </>
                  )}
                  <button
                    onClick={handleShareDeadline}
                    className="px-4 py-2 border border-blue-500 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center justify-center space-x-2"
                  >
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={handleDownloadDetails}
                    className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-center space-x-2"
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}