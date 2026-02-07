// components/UpcomingSessions.js
import { Calendar, Clock, Users, Bell, Play, Video } from 'lucide-react';
import { useState } from 'react';

export default function UpcomingSessions({ 
  sessions, 
  onSetReminder,
  onJoinSession 
}) {
  const [expandedSession, setExpandedSession] = useState(null);

  const toggleExpand = (sessionId) => {
    setExpandedSession(expandedSession === sessionId ? null : sessionId);
  };

  const getSessionStatus = (session) => {
    const sessionDate = new Date(session.schedule_time);
    const today = new Date();
    const sessionDay = sessionDate.toDateString();
    const todayString = today.toDateString();
    
    if (sessionDay === todayString) {
      return 'today';
    }
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (sessionDay === tomorrow.toDateString()) {
      return 'tomorrow';
    }
    
    return 'upcoming';
  };

  const formatSessionTime = (session) => {
    const sessionDate = new Date(session.schedule_time);
    const status = getSessionStatus(session);
    
    if (status === 'today') {
      return `Today, ${sessionDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`;
    }
    
    if (status === 'tomorrow') {
      return `Tomorrow, ${sessionDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`;
    }
    
    return sessionDate.toLocaleString('en-US', { 
      weekday: 'long',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Live Sessions</h3>
      <div className="space-y-4">
        {sessions.map((session) => {
          const status = getSessionStatus(session);
          const isExpanded = expandedSession === session.id;
          
          return (
            <div key={session.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-800">{session.title}</h4>
                    {status === 'today' && (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full font-medium">
                        Today
                      </span>
                    )}
                    {status === 'tomorrow' && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
                        Tomorrow
                      </span>
                    )}
                    {status === 'upcoming' && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
                        Upcoming
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{formatSessionTime(session)}</span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{session.duration}</span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center space-x-1">
                      <Users size={14} />
                      <span>{session.instructor}</span>
                    </span>
                  </div>
                  
                  {session.description && (
                    <div className="mt-3">
                      {!isExpanded && (
                        <p className="text-sm text-gray-500 line-clamp-2">{session.description}</p>
                      )}
                      {isExpanded && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">{session.description}</p>
                          {session.room_id && (
                            <div className="flex items-center space-x-2 text-xs text-gray-600">
                              <Video size={12} />
                              <span>Room ID: <code className="bg-gray-100 px-1 py-0.5 rounded">{session.room_id}</code></span>
                            </div>
                          )}
                        </div>
                      )}
                      {session.description.length > 100 && (
                        <button
                          onClick={() => toggleExpand(session.id)}
                          className="text-primary-dark hover:text-primary-light text-xs font-medium mt-1"
                        >
                          {isExpanded ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  {status === 'today' && onJoinSession && (
                    <button 
                      onClick={() => onJoinSession(session)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg flex items-center justify-center space-x-2 whitespace-nowrap"
                    >
                      <Play size={16} />
                      <span>Join Now</span>
                    </button>
                  )}
                  <button 
                    onClick={() => onSetReminder(session)}
                    className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 font-semibold rounded-lg flex items-center justify-center space-x-2 whitespace-nowrap"
                  >
                    <Bell size={16} />
                    <span>Set Reminder</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}