'use client';

import { useState, useEffect } from 'react';
import { 
  Play, 
  FileText, 
  Download, 
  MessageSquare, 
  Clock, 
  AlertCircle, 
  Calendar,
  Users,
  CreditCard,
  TrendingUp,
  Award,
  Target,
  BarChart3,
  Bell,
  ChevronRight,
  Edit,
  Save,
  X
} from 'lucide-react';
import Link from 'next/link';
import ProgressBar from './ProgressBar';
import ModuleCard from './ModuleCard';
import NotePad from './NotePad';
import DeadlineCard from './DeadlineCard';

export default function DashboardContent() {
  const [notes, setNotes] = useState({
    module1: 'Review closures and prototypes from the pre-work.',
    module2: '',
    module3: '',
  });
  
  const [quickNote, setQuickNote] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Student',
    email: 'john.student@example.com',
    studentId: 'STU20251213',
    course: 'Web App Development',
    enrollmentDate: 'Nov 1, 2025',
  });

  const modules = [
    { id: 1, title: 'Module 1: Introduction to Web', progress: 100, lessons: 8, duration: '12 hours' },
    { id: 2, title: 'Module 2: Deep Dive into CSS', progress: 100, lessons: 10, duration: '15 hours' },
    { id: 3, title: 'Module 3: Advanced JavaScript', progress: 80, lessons: 12, duration: '18 hours' },
  ];

  const deadlines = [
    { id: 1, title: 'Assignment 2 due', date: 'Nov 30', type: 'assignment', priority: 'high' },
    // { id: 2, title: 'Live Q&A Session', date: 'Dec 5, 7 PM WAT', type: 'session', priority: 'medium' },
    // { id: 3, title: 'Project Submission', date: 'Dec 20', type: 'project', priority: 'high' },
  ];

  const classReminders = [
    { id: 1, title: 'Next Live Class', description: 'Advanced JavaScript Concepts', time: 'Tomorrow, 10:00 AM', status: 'upcoming' },
    { id: 2, title: 'Recorded Session Available', description: 'CSS Grid Masterclass', time: 'Available Now', status: 'available' },
    // { id: 3, title: 'Office Hours', description: 'With Prof. Johnson', time: 'Friday, 3:00 PM', status: 'scheduled' },
  ];

  const paymentStatus = {
    status: 'paid',
    amount: '₦25000.00',
    dueDate: 'Paid on Nov 15, 2025',
    nextPayment: 'None - Full payment completed'
  };

  const certificateStatus = {
    status: 'available',
    completion: '75.2%',
    requirements: 'Complete Module 3 to unlock',
    estimatedDate: 'Dec 30, 2025'
  };

  const discussionGroups = [
    { id: 1, name: 'Web Dev Beginners', members: 45, active: true },
    // { id: 2, name: 'CSS Challenges', members: 32, active: true },
    // { id: 3, name: 'JavaScript Experts', members: 28, active: true },
  ];

  const stats = [
    { label: 'Course Progress', value: '75.2%', icon: TrendingUp, color: 'blue' },
    { label: 'Assignments Submitted', value: '4/6', icon: FileText, color: 'green' },
    { label: 'Avg. Grade', value: '91%', icon: Award, color: 'purple' },
    { label: 'Days Streak', value: '14', icon: Target, color: 'orange' },
  ];

  const updateNote = (moduleId, content) => {
    setNotes(prev => ({
      ...prev,
      [`module${moduleId}`]: content
    }));
  };

  const handleSaveQuickNote = () => {
    if (quickNote.trim()) {
      alert('Note saved!');
      setQuickNote('');
    }
  };

  const handleProfileUpdate = () => {
    setIsEditingProfile(false);
    alert('Profile updated successfully!');
  };

  const handleJoinDiscussion = (groupId) => {
    // Navigate to discussion page
    window.location.href = '/discussions';
  };

  const handlePayment = () => {
    alert('Redirecting to payment gateway...');
    // Redirect to payment page
    setTimeout(() => {
      // Simulate payment success and redirect
      window.location.href = '/classroom';
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-dark to-primary-light rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {profileData.name}!</h1>
            <p className="text-primary-lighter">Main hub for students to track progress, access tools, and manage profile</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-sm">
              <span>Student ID: {profileData.studentId}</span>
              <span className="bg-primary-dark px-2 py-1 rounded-full">Enrolled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`text-${stat.color}-600`} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Progress & Modules */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Progress & Modules */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Course Progress & Modules</h2>
              <Link 
                href="/classroom" 
                className="text-primary-dark hover:text-primary font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <ChevronRight size={16} />
              </Link>
            </div>
            
            {/* Overall Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-700 font-medium">Overall Progress</span>
                <span className="text-2xl font-bold text-primary-dark">75.2%</span>
              </div>
              <ProgressBar progress={75.2} />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Started Nov 1, 2025</span>
                <span>Estimated completion: Dec 30, 2025</span>
              </div>
            </div>

            {/* Module Cards */}
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map((module) => (
                <ModuleCard 
                  key={module.id}
                  module={module}
                  note={notes[`module${module.id}`]}
                  onNoteUpdate={(content) => updateNote(module.id, content)}
                />
              ))}
            </div>
          </div>

          {/* Profile Management & Payment Tracking */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Management */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Profile Management</h2>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="text-primary-dark hover:text-primary flex items-center space-x-1"
                >
                  {isEditingProfile ? <X size={16} /> : <Edit size={16} />}
                  <span>{isEditingProfile ? 'Cancel' : 'Edit'}</span>
                </button>
              </div>
              
              {isEditingProfile ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button
                    onClick={handleProfileUpdate}
                    className="w-full bg-primary-dark hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Save Changes</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-dark">JS</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{profileData.name}</h3>
                      <p className="text-gray-600">{profileData.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student ID</span>
                      <span className="font-medium">{profileData.studentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Course</span>
                      <span className="font-medium">{profileData.course}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Enrolled Since</span>
                      <span className="font-medium">{profileData.enrollmentDate}</span>
                    </div>
                  </div>
                  <Link 
                    href="/profile"
                    className="block text-center border border-primary-dark text-primary-dark hover:bg-primary-lighter py-2 rounded-lg font-medium"
                  >
                    View Full Profile
                  </Link>
                </div>
              )}
            </div>

            {/* Payment Tracking */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Payment Tracking</h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  paymentStatus.status === 'paid' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {paymentStatus.status === 'paid' ? 'Paid' : 'Pending'}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">Course Fee</span>
                    <span className="text-2xl font-bold text-green-600">{paymentStatus.amount}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{paymentStatus.dueDate}</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-green-700">Payment completed successfully</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Payment</span>
                    <span className="font-medium">{paymentStatus.nextPayment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium">Credit Card **** 4242</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invoice</span>
                    <button className="text-primary-dark hover:text-primary font-medium">
                      Download
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handlePayment}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2"
                >
                  <CreditCard size={20} />
                  <span>Make New Payment</span>
                </button>
              </div>
            </div>
          </div>

          {/* Discussion Groups */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Discussion Groups</h2>
              {/* <Link 
                href="/discussions" 
                className="text-primary-dark hover:text-primary font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <ChevronRight size={16} />
              </Link> */}
            </div>
            
            <div className="">
              {discussionGroups.map((group) => (
                <div key={group.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${group.active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <h3 className="font-semibold text-gray-800">{group.name}</h3>
                    </div>
                    <span className="text-sm text-gray-600">{group.members} members</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Discuss course topics and collaborate with peers</p>
                  <button
                    onClick={() => handleJoinDiscussion(group.id)}
                    className="w-full border border-primary-dark text-primary-dark hover:bg-primary-lighter py-2 rounded-lg font-medium"
                  >
                    Join Discussion
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Notes, Deadlines, Certificate, Reminders */}
        <div className="space-y-6">
          {/* Quick Notepad */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="border-t pt-4 rounded-2xl p-6 border border-gray-200 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Module Notes</h2>
              <NotePad 
                notes={notes}
                onUpdate={updateNote}
              />
            </div>

            <div className="rounded-2xl p-6 border border-gray-200">
                          <div className="flex items-center justify-between mb-4 ">
              <h2 className="text-xl font-bold text-gray-800">Quick Notepad</h2>
              <Link 
                href="/notes" 
                className="text-primary-dark hover:text-primary text-sm font-medium"
              >
                View All Notes
              </Link>
            </div>
            
            <div className="mb-4">
              <textarea
                value={quickNote}
                onChange={(e) => setQuickNote(e.target.value)}
                placeholder="Type your quick note here..."
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleSaveQuickNote}
                  className="px-4 py-2 bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white font-medium rounded-lg flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>Save Note</span>
                </button>
              </div>
            </div>
            </div>
            
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Upcoming Deadlines</h2>
              <Link 
                href="/notifications" 
                className="text-primary-dark hover:text-primary text-sm font-medium"
              >
                Set Reminders
              </Link>
            </div>
            
            <div className="space-y-4">
              {deadlines.map((deadline) => (
                <DeadlineCard key={deadline.id} deadline={deadline} />
              ))}
            </div>
            
            <button className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-primary-dark hover:border-blue-400 transition-colors flex items-center justify-center space-x-2">
              <Calendar size={16} />
              <span>Set Custom Alarm</span>
            </button>
          </div>

        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            href="/classroom"
            className="bg-gradient-to-r from-blue-500 to-primary-dark hover:from-primary-dark hover:to-blue-700 text-white p-6 rounded-xl flex flex-col items-center justify-center text-center transition-all hover:shadow-lg"
          >
            <Play size={32} className="mb-3" />
            <span className="font-semibold text-lg">Live Class</span>
            <span className="text-sm opacity-90 mt-1">Join now</span>
          </Link>
          
          <Link 
            href="/assignments"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-6 rounded-xl flex flex-col items-center justify-center text-center transition-all hover:shadow-lg"
          >
            <FileText size={32} className="mb-3" />
            <span className="font-semibold text-lg">Submit Work</span>
            <span className="text-sm opacity-90 mt-1">Assignments</span>
          </Link>
          
          <Link 
            href="/grades"
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-xl flex flex-col items-center justify-center text-center transition-all hover:shadow-lg"
          >
            <BarChart3 size={32} className="mb-3" />
            <span className="font-semibold text-lg">View Grades</span>
            <span className="text-sm opacity-90 mt-1">Performance</span>
          </Link>
          
          {/* <Link 
            href="/discussions"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-6 rounded-xl flex flex-col items-center justify-center text-center transition-all hover:shadow-lg"
          >
            <MessageSquare size={32} className="mb-3" />
            <span className="font-semibold text-lg">Discussion</span>
            <span className="text-sm opacity-90 mt-1">Join Groups</span>
          </Link> */}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Certificate Status */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Certificate Status</h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                certificateStatus.status === 'available' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {certificateStatus.status === 'available' ? 'Available Soon' : 'Locked'}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Completion Required</span>
                <span className="font-bold text-gray-800">{certificateStatus.completion}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: certificateStatus.completion }}
                ></div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Requirements:</span> {certificateStatus.requirements}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Estimated Unlock:</span> {certificateStatus.estimatedDate}
                </p>
              </div>
              
              <Link 
                href="/certificate"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2"
              >
                <Download size={20} />
                <span>Preview Certificate</span>
              </Link>
            </div>
          </div>

          {/* Class Reminders */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Class Reminders</h2>
              <Link 
                href="/notifications" 
                className="text-primary-dark hover:text-primary text-sm font-medium flex items-center space-x-1"
              >
                <Bell size={16} />
                <span>Manage</span>
              </Link>
            </div>
            
            <div className="space-y-4">
              {classReminders.map((reminder) => (
                <div key={reminder.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{reminder.title}</h3>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      reminder.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      reminder.status === 'available' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {reminder.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{reminder.description}</p>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>{reminder.time}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <Link 
              href="/classroom"
              className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2"
            >
              <Play size={20} />
              <span>Join Live Class Now</span>
            </Link>
          </div>
      </div>
    </div>
  );
}

// Helper component for CheckCircle icon
function CheckCircle(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}