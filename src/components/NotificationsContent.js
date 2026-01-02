'use client';

import { useState } from 'react';
import { 
  Bell, 
  CheckCircle, 
  Trash2, 
  X, 
  Clock,
  Eye
} from 'lucide-react';

export default function SimpleNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Live Class Starting Soon',
      message: 'Advanced JavaScript Concepts starts in 30 minutes',
      time: '10 minutes ago',
      read: false,
      type: 'class'
    },
    {
      id: 2,
      title: 'Assignment Deadline',
      message: 'Assignment 2 due in 2 days',
      time: '1 hour ago',
      read: false,
      type: 'assignment'
    },
    {
      id: 3,
      title: 'New Grade Posted',
      message: 'Your grade for Quiz 3: 92%',
      time: '3 hours ago',
      read: true,
      type: 'grade'
    },
    {
      id: 4,
      title: 'System Maintenance',
      message: 'Scheduled for Sunday, 2 AM - 4 AM',
      time: '1 day ago',
      read: true,
      type: 'system'
    },
  ]);

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Delete a notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-dark to-primary-light rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-primary-lighter">View your latest alerts and updates</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{unreadCount}</div>
              <div className="text-sm opacity-90">Unread</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">{notifications.length}</div>
              <div className="text-sm opacity-90">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <button
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle size={24} className="" />
          <span>Mark All as Read</span>
        </button>

        <button
          onClick={clearAll}
          disabled={notifications.length === 0}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={24} className="" />
          <span>Clear All</span>
        </button>

        {/* <button
          onClick={() => {}}
          className="bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white font-semibold py-4 rounded-xl flex flex-col items-center justify-center transition-colors"
        >
          <Bell size={24} className="mb-2" />
          <span>Settings</span>
        </button>

        <button
          onClick={() => {}}
          className="bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white font-semibold py-4 rounded-xl flex flex-col items-center justify-center transition-colors"
        >
          <Eye size={24} className="mb-2" />
          <span>View All</span>
        </button> */}
      </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Your Notifications</h2>
          <span className="text-sm text-gray-600">
            {notifications.length} items
          </span>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-xl transition-all ${
                  !notification.read 
                    ? 'border-primary-light bg-primary-lighter' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Notification Icon */}
                  <div className={`p-2 rounded-lg ${
                    notification.type === 'class' ? 'bg-red-100' :
                    notification.type === 'assignment' ? 'bg-orange-100' :
                    notification.type === 'grade' ? 'bg-green-100' :
                    'bg-purple-100'
                  }`}>
                    <Bell className={
                      notification.type === 'class' ? 'text-red-600' :
                      notification.type === 'assignment' ? 'text-orange-600' :
                      notification.type === 'grade' ? 'text-green-600' :
                      'text-purple-600'
                    } size={20} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`font-semibold ${
                        notification.read ? 'text-gray-700' : 'text-gray-900'
                      }`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-primary-dark rounded-full"></span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-2">{notification.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Clock size={14} />
                        <span>{notification.time}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-sm text-primary-dark hover:bg-primary-lighter px-3 py-1  rounded"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Simple Settings */}
      {/* <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Notification Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
              <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white" />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Push Notifications</p>
              <p className="text-sm text-gray-600">Receive browser notifications</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
              <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white" />
            </button>
          </div>
          
          <button className="w-full bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white font-semibold py-3 rounded-lg">
            Save Settings
          </button>
        </div>
      </div> */}
    </div>
  );
}