'use client';

import Link from 'next/link';
import { Bell, Calendar, Search, Settings, User } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-4 py-3 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Left Section - Date & Title */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-gray-600">
              <Calendar size={20} />
              <span className="font-medium">{currentDate}</span>
            </div>
            <div className="md:hidden">
              <h2 className="text-lg font-bold text-gray-800">Dashboard</h2>
            </div>
            <div className="text-sm bg-primary-lighter text-primary-dark px-3 py-1 rounded-full font-medium">
              Current Time: 08:27 AM WAT
            </div>
          </div>

          {/* Right Section - Search & Notifications */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative flex-1 md:flex-initial">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses, modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            {/* Notification Bell */}
            <Link 
              href="/notifications" 
              className="relative p-2 text-gray-600 hover:text-primary-dark transition-colors"
            >
              <Bell size={24} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-status-red rounded-full"></span>
            </Link>

            {/* Profile */}
            <Link 
              href="/profile" 
              className="p-2 text-gray-600 hover:text-primary-dark transition-colors"
            >
              <User size={24} />
            </Link>

            {/* Settings */}
            <Link 
              href="/profile?tab=settings" 
              className="p-2 text-gray-600 hover:text-primary-dark transition-colors"
            >
              <Settings size={24} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}