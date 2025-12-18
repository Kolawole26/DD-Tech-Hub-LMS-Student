'use client';

import { Calendar, AlertCircle, FileText, Video, Flag, Clock } from 'lucide-react';

export default function DeadlineCard({ deadline }) {
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

  return (
    <div className={`p-4 border rounded-lg ${getBgColor()} hover:shadow-sm transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            {getIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-800">{deadline.title}</h3>
              {getPriorityBadge()}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>{deadline.date}</span>
              </span>
              {getDaysRemaining() && (
                <>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{getDaysRemaining()}</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <AlertCircle size={20} />
        </button>
      </div>
      
      {/* Action buttons */}
      <div className="flex space-x-2 mt-4">
        <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg">
          Snooze
        </button>
        <button className="flex-1 px-3 py-2 text-sm bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white rounded-lg">
          View Details
        </button>
      </div>
    </div>
  );
}