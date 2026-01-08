'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import {
  Home,
  Video,
  FileText,
  BarChart3,
  Download,
  MessageSquare,
  Menu,
  X,
  GraduationCap,
  User,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  LogOut,
} from 'lucide-react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({
    mainCourse: false,
    progress: false,
  });
  const pathname = usePathname();
  const router = useRouter();

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    // Here you can add your actual logout logic (clear tokens, etc.)
    router.push('https://ddtech-landing.vercel.app/');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const mainCourseItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/' },
    { id: 'classroom', label: 'Live Class', icon: Video, href: '/classroom' },
    { id: 'assignments', label: 'Assignments', icon: FileText, href: '/assignments' },
  ];

  const progressItems = [
    { id: 'grades', label: 'Grades', icon: BarChart3, href: '/grades' },
    { id: 'certificate', label: 'Download Certificate', icon: Download, href: '/certificate' },
    { id: 'discussions', label: 'Group Discussions', icon: MessageSquare, href: '/discussions' },
  ];

  const directLinks = [
    { id: 'profile', label: 'Profile Management', icon: User, href: '/profile' },
    // { id: 'support', label: 'Support & Feedback', icon: HelpCircle, href: '/support' },
  ];

  return (
    <>
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <LogOut className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Confirm Logout
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to log out? You will need to sign in again to access your account.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelLogout}
                className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 py-2.5 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

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
              <span className='ml-7'>Student ID: N/A</span>
              <span className="bg-status-green text-white px-2 py-1 rounded-full">
                75.2%
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation - Scrollable section */}
        <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
          {/* Main Course Dropdown */}
          <div className="mb-4">
            <button
              onClick={() => toggleDropdown('mainCourse')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors border border-primary-lighter text-white hover:text-primary-dark hover:bg-primary-lighter"
            >
              <div className="flex items-center space-x-3">
                <Home size={20} />
                <span className="font-medium">Main Course</span>
              </div>
              {openDropdowns.mainCourse ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
            
            {openDropdowns.mainCourse && (
              <div className="ml-8 mt-2 space-y-1">
                {mainCourseItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`
                        flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors text-sm
                        ${isActive 
                          ? 'bg-primary-lighter border border-primary-light text-primary-dark' 
                          : 'text-primary-light hover:text-white hover:bg-primary-lighter/50'
                        }
                      `}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                      {item.id === 'classroom' && (
                        <span className="ml-auto bg-status-red text-xs px-2 py-0.5 rounded-full">
                          LIVE
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Progress & Assessment Dropdown */}
          <div className="mb-4">
            <button
              onClick={() => toggleDropdown('progress')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors border border-primary-lighter text-white hover:text-primary-dark hover:bg-primary-lighter"
            >
              <div className="flex items-center space-x-3">
                <BarChart3 size={20} />
                <span className="font-medium">Progress & Assessment</span>
              </div>
              {openDropdowns.progress ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
            
            {openDropdowns.progress && (
              <div className="ml-8 mt-2 space-y-1">
                {progressItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`
                        flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors text-sm
                        ${isActive 
                          ? 'bg-primary-lighter border border-primary-light text-primary-dark' 
                          : 'text-primary-light hover:text-white hover:bg-primary-lighter/50'
                        }
                      `}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Direct Links - Added gap between buttons */}
          <div className="mt-6 pt-4 border-t border-primary-light/30 space-y-3">
            {directLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors border border-primary-lighter block
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

            {/* Logout Button with Confirmation */}
            <button
              onClick={handleLogoutClick}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors border border-primary-lighter text-white hover:text-primary-dark hover:bg-primary-lighter
              `}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}