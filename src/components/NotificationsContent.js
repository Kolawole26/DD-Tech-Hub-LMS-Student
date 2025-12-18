'use client';

import { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Filter,
  Trash2,
  Archive,
  Settings,
  Mail,
  MessageSquare,
  Video,
  FileText,
  Award,
  Users,
  ChevronRight
} from 'lucide-react';

export default function NotificationsContent() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  const notifications = [
    {
      id: 1,
      type: 'class',
      title: 'Live Class Starting Soon',
      description: 'Advanced JavaScript Concepts starts in 30 minutes',
      time: '10 minutes ago',
      read: false,
      priority: 'high',
      icon: Video,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      id: 2,
      type: 'assignment',
      title: 'Assignment Deadline Approaching',
      description: 'Assignment 2 due in 2 days - JavaScript Calculator',
      time: '1 hour ago',
      read: false,
      priority: 'high',
      icon: FileText,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      id: 3,
      type: 'grade',
      title: 'New Grade Posted',
      description: 'Your grade for Quiz 3 has been published (92%)',
      time: '3 hours ago',
      read: true,
      priority: 'medium',
      icon: Award,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      id: 4,
      type: 'discussion',
      title: 'New Discussion Reply',
      description: 'Sarah Johnson replied to your post in CSS Challenges',
      time: '5 hours ago',
      read: true,
      priority: 'low',
      icon: MessageSquare,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      id: 5,
      type: 'system',
      title: 'System Maintenance',
      description: 'Scheduled maintenance on Sunday, 2 AM - 4 AM',
      time: '1 day ago',
      read: true,
      priority: 'medium',
      icon: Settings,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      id: 6,
      type: 'announcement',
      title: 'New Course Material Available',
      description: 'Week 4 slides and exercises have been uploaded',
      time: '2 days ago',
      read: true,
      priority: 'medium',
      icon: FileText,
      iconColor: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
    },
    {
      id: 7,
      type: 'reminder',
      title: 'Office Hours Reminder',
      description: 'Professor office hours tomorrow at 3 PM',
      time: '3 days ago',
      read: true,
      priority: 'low',
      icon: Users,
      iconColor: 'text-teal-500',
      bgColor: 'bg-teal-50',
    },
    {
      id: 8,
      type: 'deadline',
      title: 'Project Submission Deadline',
      description: 'Final project submission due in 7 days',
      time: '4 days ago',
      read: true,
      priority: 'high',
      icon: Calendar,
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50',
    },
  ];

  const filters = [
    { id: 'all', label: 'All Notifications', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'class', label: 'Class Alerts', count: notifications.filter(n => n.type === 'class').length },
    { id: 'assignment', label: 'Assignments', count: notifications.filter(n => n.type === 'assignment').length },
    { id: 'grade', label: 'Grades', count: notifications.filter(n => n.type === 'grade').length },
    { id: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length },
  ];

  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : activeFilter === 'unread'
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === activeFilter);

  const toggleNotificationSelection = (id) => {
    setSelectedNotifications(prev =>
      prev.includes(id)
        ? prev.filter(notificationId => notificationId !== id)
        : [...prev, id]
    );
  };

  const markAsRead = (id) => {
    // In a real app, this would update the backend
    alert(`Marked notification ${id} as read`);
  };

  const deleteNotifications = () => {
    if (selectedNotifications.length === 0) return;
    if (confirm(`Delete ${selectedNotifications.length} notification(s)?`)) {
      // In a real app, this would delete from backend
      setSelectedNotifications([]);
      alert('Notifications deleted successfully');
    }
  };

  const clearAllNotifications = () => {
    if (confirm('Clear all notifications?')) {
      // In a real app, this would clear all from backend
      alert('All notifications cleared');
    }
  };

  const markAllAsRead = () => {
    // In a real app, this would update all in backend
    alert('All notifications marked as read');
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-dark to-primary-light rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Notifications & Reminders</h1>
            <p className="text-primary-lighter">Stay updated with class alerts, deadlines, and announcements</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{notifications.filter(n => !n.read).length}</div>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={markAllAsRead}
          className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Mark All as Read</p>
              <p className="text-sm text-gray-600">Clear all unread notifications</p>
            </div>
          </div>
        </button>

        <button
          onClick={clearAllNotifications}
          className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <Trash2 className="text-red-600" size={24} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Clear All</p>
              <p className="text-sm text-gray-600">Remove all notifications</p>
            </div>
          </div>
        </button>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Settings className="text-blue-600" size={24} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Notification Settings</p>
              <p className="text-sm text-gray-600">Customize preferences</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Bell className="text-purple-600" size={24} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Email Digest</p>
              <p className="text-sm text-gray-600">Configure daily/weekly</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Filters</h2>
              <Filter className="text-gray-500" size={20} />
            </div>

            <div className="space-y-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
                    activeFilter === filter.id
                      ? 'bg-primary-lighter text-primary-dark'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium">{filter.label}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activeFilter === filter.id
                      ? 'bg-primary-light text-primary-dark'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Bulk Actions */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-semibold text-gray-800 mb-3">Bulk Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={deleteNotifications}
                  disabled={selectedNotifications.length === 0}
                  className={`w-full px-4 py-2 rounded-lg flex items-center space-x-2 ${
                    selectedNotifications.length === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                  }`}
                >
                  <Trash2 size={16} />
                  <span>Delete Selected ({selectedNotifications.length})</span>
                </button>
                
                <button
                  onClick={() => setSelectedNotifications(notifications.map(n => n.id))}
                  className="w-full px-4 py-2 rounded-lg flex items-center space-x-2 bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <CheckCircle size={16} />
                  <span>Select All</span>
                </button>
                
                <button
                  onClick={() => setSelectedNotifications([])}
                  className="w-full px-4 py-2 rounded-lg flex items-center space-x-2 bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <XCircle size={16} />
                  <span>Deselect All</span>
                </button>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-semibold text-gray-800 mb-3">Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email Notifications</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                    <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Push Notifications</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                    <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Desktop Alerts</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                    <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Notifications List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {activeFilter === 'all' ? 'All Notifications' : 
                 activeFilter === 'unread' ? 'Unread Notifications' :
                 filters.find(f => f.id === activeFilter)?.label}
              </h2>
              <div className="text-sm text-gray-600">
                {filteredNotifications.length} items
              </div>
            </div>

            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No notifications found</h3>
                <p className="text-gray-600">You're all caught up!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-xl transition-all hover:shadow-sm ${
                        selectedNotifications.includes(notification.id)
                          ? 'border-blue-500 bg-blue-50'
                          : notification.read
                          ? 'border-gray-200'
                          : 'border-blue-200 bg-blue-50'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={() => toggleNotificationSelection(notification.id)}
                          className="mt-1.5"
                        />
                        
                        {/* Icon */}
                        <div className={`p-3 rounded-lg ${notification.bgColor}`}>
                          <Icon className={notification.iconColor} size={20} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className={`font-semibold ${
                                  notification.read ? 'text-gray-800' : 'text-gray-900'
                                }`}>
                                  {notification.title}
                                </h3>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                )}
                                {getPriorityBadge(notification.priority)}
                              </div>
                              <p className="text-gray-600 mb-2">{notification.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center space-x-1">
                                  <Clock size={14} />
                                  <span>{notification.time}</span>
                                </span>
                                <span>•</span>
                                <span className="capitalize">{notification.type}</span>
                              </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex items-center space-x-2">
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="px-3 py-1 text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg"
                                >
                                  Mark as read
                                </button>
                              )}
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <ChevronRight size={16} />
                              </button>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex space-x-2 mt-4">
                            {notification.type === 'class' && (
                              <button className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg">
                                Join Class
                              </button>
                            )}
                            {notification.type === 'assignment' && (
                              <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                                View Assignment
                              </button>
                            )}
                            <button className="px-3 py-1 text-sm border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg">
                              Archive
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upcoming Class Reminders */}
          <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Upcoming Class Reminders</h2>
              <Calendar className="text-gray-500" size={20} />
            </div>

            <div className="space-y-4">
              {[
                { day: 'Today', time: '10:00 AM', title: 'Advanced JavaScript', instructor: 'Dr. Sarah Johnson' },
                { day: 'Tomorrow', time: '2:00 PM', title: 'CSS Grid Masterclass', instructor: 'Prof. Michael Chen' },
                { day: 'Wednesday', time: '11:00 AM', title: 'React Fundamentals', instructor: 'Dr. Emily Wilson' },
              ].map((classItem, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-primary-dark transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-600">{classItem.day}</div>
                        <div className="text-lg font-bold text-gray-800">{classItem.time}</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{classItem.title}</h3>
                        <p className="text-sm text-gray-600">With {classItem.instructor}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 border border-primary-dark text-primary-dark hover:bg-primary-lighter rounded-lg">
                        Add to Calendar
                      </button>
                      <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                        Set Reminder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Email Notifications Settings */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-semibold text-gray-800 mb-4">Email Notification Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Mail className="text-blue-500" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Class Reminders</h4>
                      <p className="text-sm text-gray-600">Send 1 hour before class</p>
                    </div>
                  </div>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>1 hour before</option>
                    <option>30 minutes before</option>
                    <option>15 minutes before</option>
                  </select>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <AlertCircle className="text-orange-500" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Deadline Alerts</h4>
                      <p className="text-sm text-gray-600">Send 2 days before deadline</p>
                    </div>
                  </div>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>2 days before</option>
                    <option>1 day before</option>
                    <option>6 hours before</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}