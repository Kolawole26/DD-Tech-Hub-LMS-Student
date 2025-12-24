'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Video,
  FileText,
  BarChart3,
  Bell,
  Download,
  MessageSquare,
  CreditCard,
  Menu,
  X,
  GraduationCap,
  User,
} from 'lucide-react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/' },
    { id: 'classroom', label: 'Live Class Now', icon: Video, href: '/classroom' },
    { id: 'assignments', label: 'Assignments', icon: FileText, href: '/assignments' },
    { id: 'grades', label: 'Grade Monitoring', icon: BarChart3, href: '/grades' },
    { id: 'certificate', label: 'Certificate Download', icon: Download, href: '/certificate' },
    // { id: 'discussions', label: 'Group Discussions', icon: MessageSquare, href: '/discussions' },
    // { id: 'notifications', label: 'Class Reminders', icon: Bell, href: '/notifications' },
    { id: 'profile', label: 'Profile Management', icon: User, href: '/profile' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <aside className={`
        ${isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
        fixed md:relative z-50
        w-64 md:w-64
        h-screen
        bg-gradient-to-b from-primary to-primary
        text-white
        transition-transform duration-300 ease-in-out
        flex flex-col
      `}>
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-primary-lighter border border-primary-light text-primary-dark p-2 rounded-full md:hidden"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>

        {/* Logo & Title - Fixed height section */}
        <div className="p-4 border-b border-primary-light flex-shrink-0">
          <div className="flex items-center space-x-2 mb-2">
            <GraduationCap className="text-white" size={24} />
              <h1 className="text-xl font-bold">Web App Development</h1>
          </div>
          <div className="mt-2">
            <div className="flex justify-between items-center text-sm">
              <span className=' ml-7'>Student ID: N/A</span>
              <span className="bg-status-green text-white px-2 py-1 rounded-full">
                75.2%
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation - Scrollable section */}
        <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
          <h2 className="text-sm font-semibold text-primary-light uppercase tracking-wider px-4 py-2">
            MAIN COURSE ACCESS
          </h2>
          
          {menuItems.slice(0, 3).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors border border-primary-lighter shadow-sm
                  ${isActive 
                    ? 'bg-primary-lighter border border-primary-light text-primary-dark' 
                    : 'text-white hover:text-primary-dark hover:bg-primary-lighter'
                  }
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {item.id === 'classroom' && (
                  <span className="ml-auto bg-status-red text-xs px-2 py-1 rounded-full">
                    LIVE
                  </span>
                )}
              </Link>
            );
          })}

          <h2 className="text-sm font-semibold text-primary-light uppercase tracking-wider px-4 py-2 mt-6">
            PROGRESS & ASSESSMENT
          </h2>
          
          {menuItems.slice(3, 6).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors border border-primary-lighter
                  ${isActive 
                    ? 'bg-primary-lighter border border-primary-light text-primary-dark' 
                    : 'text-white hover:text-primary-dark hover:bg-primary-lighter'
                  }
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* <h2 className="text-sm font-semibold text-primary-light uppercase tracking-wider px-4 py-2 mt-6">
            COMMUNITY & SUPPORT
          </h2>
          
          {menuItems.slice(6, 8).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-primary-lighter border border-primary-light text-primary-dark' 
                    : 'text-white hover:text-primary-dark hover:bg-primary-lighter'
                  }
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })} */}
        </nav>

        {/* Profile & Payment Section - Fixed bottom section */}
        {/* <div className="flex-shrink-0 w-full p-4 border-t border-primary-light">
          <Link 
            href="/payments"
            className="w-full mb-3 bg-status-green hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 block"
          >
            <CreditCard size={20} />
            <span>Pay Now</span>
          </Link>
          <Link 
            href="/profile"
            className="flex items-center space-x-3 p-3 bg-primary-lighter rounded-lg hover:bg-primary-light transition-colors"
          >
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="font-bold text-white">S</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-primary-dark">Student Profile</p>
              <p className="text-sm text-primary-dark">Manage Account</p>
            </div>
          </Link>
        </div> */}
      </aside>
    </>
  );
}