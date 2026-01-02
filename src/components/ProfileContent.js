'use client';

import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Lock, 
  Bell, 
  CreditCard, 
  Shield,
  Globe,
  Camera,
  Save,
  Upload,
  Edit,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function ProfileContent() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [profileImage, setProfileImage] = useState('/api/placeholder/150/150');

  const [profileData, setProfileData] = useState({
    personalInfo: {
      fullName: 'John Student',
      email: 'john.student@example.com',
      phone: '+234 901 123 4567',
      address: '123 University Ave, Campus City',
      dateOfBirth: '1998-05-15',
      studentId: 'STU20251213',
      nationality: 'Nigerian',
    },
    accountInfo: {
      username: 'john_student',
      enrollmentDate: 'November 1, 2025',
      course: 'Web App Development',
      specialization: 'Frontend Development',
      currentSemester: 'Semester 2',
      academicYear: '2025-2026',
    },
    paymentInfo: {
      plan: 'Premium Plan',
      status: 'Active',
      nextBilling: 'January 1, 2026',
      paymentMethod: 'Credit Card **** 4242',
      autoRenew: true,
    },
  });

  const notificationSettings = {
    emailNotifications: {
      classReminders: true,
      assignmentDeadlines: true,
      gradeUpdates: true,
      courseUpdates: false,
      newsletter: false,
    },
    pushNotifications: {
      liveClasses: true,
      messages: true,
      announcements: true,
      deadlineAlerts: true,
    },
    privacySettings: {
      profileVisibility: 'classmates',
      showProgress: true,
      showGrades: false,
      allowMessages: true,
    },
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1500);
    }
  };

  const handleToggleSetting = (category, setting) => {
    // Toggle notification settings
    alert(`Toggled ${category}.${setting}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-dark to-primary-light rounded-2xl p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Profile Management</h1>
        <p className="text-primary-lighter">Manage your account, settings, and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Profile Overview */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="text-center">
              {/* Profile Image */}
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-dark to-primary-light flex items-center justify-center text-white text-4xl font-bold">
                  {profileData.personalInfo.fullName.charAt(0)}
                </div>
                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  <Camera size={20} className="text-gray-600" />
                </label>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {profileData.personalInfo.fullName}
              </h2>
              <p className="text-gray-600 mb-3">{profileData.accountInfo.course}</p>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Active</span>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Student ID</span>
                  <span className="font-medium">{profileData.personalInfo.studentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Joined</span>
                  <span className="font-medium">{profileData.accountInfo.enrollmentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-primary-dark">75.2%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('personal')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'personal'
                    ? 'bg-primary-lighter text-primary-dark'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <User size={20} />
                <span>Personal Info</span>
              </button>
              
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'account'
                    ? 'bg-primary-lighter text-primary-dark'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Shield size={20} />
                <span>Account Settings</span>
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'notifications'
                    ? 'bg-primary-lighter text-primary-dark'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Bell size={20} />
                <span>Notifications</span>
              </button>
              
              <button
                onClick={() => setActiveTab('payment')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'payment'
                    ? 'bg-primary-lighter text-primary-dark'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <CreditCard size={20} />
                <span>Payment & Billing</span>
              </button>
              
              {/* <button
                onClick={() => setActiveTab('privacy')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'privacy'
                    ? 'bg-primary-lighter text-primary-dark'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Lock size={20} />
                <span>Privacy & Security</span>
              </button> */}
            </nav>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {activeTab === 'personal' && 'Personal Information'}
                {activeTab === 'account' && 'Account Settings'}
                {activeTab === 'notifications' && 'Notification Preferences'}
                {activeTab === 'payment' && 'Payment & Billing'}
                {activeTab === 'privacy' && 'Privacy & Security'}
              </h2>
              
              {activeTab === 'personal' && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white rounded-lg flex items-center space-x-2"
                >
                  {isEditing ? <Save size={16} /> : <Edit size={16} />}
                  <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                </button>
              )}
            </div>

            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <User size={16} />
                        <span>Full Name</span>
                      </div>
                    </label>
                    <input
                      type="text"
                      value={profileData.personalInfo.fullName}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        personalInfo: {...profileData.personalInfo, fullName: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <Mail size={16} />
                        <span>Email Address</span>
                      </div>
                    </label>
                    <input
                      type="email"
                      value={profileData.personalInfo.email}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        personalInfo: {...profileData.personalInfo, email: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <Phone size={16} />
                        <span>Phone Number</span>
                      </div>
                    </label>
                    <input
                      type="tel"
                      value={profileData.personalInfo.phone}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        personalInfo: {...profileData.personalInfo, phone: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>Date of Birth</span>
                      </div>
                    </label>
                    <input
                      type="date"
                      value={profileData.personalInfo.dateOfBirth}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        personalInfo: {...profileData.personalInfo, dateOfBirth: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>Address</span>
                      </div>
                    </label>
                    <input
                      type="text"
                      value={profileData.personalInfo.address}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        personalInfo: {...profileData.personalInfo, address: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student ID
                    </label>
                    <input
                      type="text"
                      value={profileData.personalInfo.studentId}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nationality
                    </label>
                    <input
                      type="text"
                      value={profileData.personalInfo.nationality}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        personalInfo: {...profileData.personalInfo, nationality: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {/* Bio Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio/About Me
                  </label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    rows="4"
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Account Settings Tab */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Account Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Username</span>
                        <span className="font-medium">{profileData.accountInfo.username}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Enrollment Date</span>
                        <span className="font-medium">{profileData.accountInfo.enrollmentDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Course</span>
                        <span className="font-medium">{profileData.accountInfo.course}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Academic Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Specialization</span>
                        <span className="font-medium">{profileData.accountInfo.specialization}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Semester</span>
                        <span className="font-medium">{profileData.accountInfo.currentSemester}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Academic Year</span>
                        <span className="font-medium">{profileData.accountInfo.academicYear}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white rounded-lg">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Preferences Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    {Object.entries(notificationSettings.emailNotifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="text-sm text-gray-600">Receive email notifications for {key}</p>
                        </div>
                        <button
                          onClick={() => handleToggleSetting('emailNotifications', key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            value ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Push Notifications</h3>
                  <div className="space-y-3">
                    {Object.entries(notificationSettings.pushNotifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="text-sm text-gray-600">Receive push notifications for {key}</p>
                        </div>
                        <button
                          onClick={() => handleToggleSetting('pushNotifications', key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            value ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Notification Schedule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Daily Reminder Time
                      </label>
                      <input
                        type="time"
                        defaultValue="09:00"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weekly Digest Day
                      </label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Monday</option>
                        <option>Friday</option>
                        <option>Sunday</option>
                      </select>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quiet Hours
                      </label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>10 PM - 7 AM</option>
                        <option>11 PM - 8 AM</option>
                        <option>No quiet hours</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment & Billing Tab */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Current Plan</h3>
                      <p className="text-gray-600">{profileData.paymentInfo.plan}</p>
                    </div>
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                      {profileData.paymentInfo.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-white rounded-lg border">
                      <p className="text-sm text-gray-600">Next Billing</p>
                      <p className="font-bold text-lg">{profileData.paymentInfo.nextBilling}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border">
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-bold text-lg">{profileData.paymentInfo.paymentMethod}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border">
                      <p className="text-sm text-gray-600">Auto Renew</p>
                      <p className="font-bold text-lg">
                        {profileData.paymentInfo.autoRenew ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Payment History</h3>
                    <div className="space-y-3">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Payment #{item}</span>
                            <span className="text-green-600 font-semibold">₦299.99</span>
                          </div>
                          <p className="text-sm text-gray-600">Nov 15, 2025 • Credit Card</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Billing Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full p-4 border border-blue-500 text-blue-600 hover:bg-blue-50 rounded-lg text-left">
                        <div className="flex items-center space-x-3">
                          <CreditCard size={20} />
                          <div>
                            <p className="font-medium">Update Payment Method</p>
                            <p className="text-sm text-gray-600">Change your card details</p>
                          </div>
                        </div>
                      </button>
                      
                      <button className="w-full p-4 border border-purple-500 text-purple-600 hover:bg-purple-50 rounded-lg text-left">
                        <div className="flex items-center space-x-3">
                          <Upload size={20} />
                          <div>
                            <p className="font-medium">Download Invoice</p>
                            <p className="text-sm text-gray-600">Get your payment receipts</p>
                          </div>
                        </div>
                      </button>
                      
                      <button className="w-full p-4 border border-red-500 text-red-600 hover:bg-red-50 rounded-lg text-left">
                        <div className="flex items-center space-x-3">
                          <XCircle size={20} />
                          <div>
                            <p className="font-medium">Cancel Subscription</p>
                            <p className="text-sm text-gray-600">End your current plan</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy & Security Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Privacy Settings</h3>
                  <div className="space-y-3">
                    {Object.entries(notificationSettings.privacySettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="text-sm text-gray-600">Control who can see your {key}</p>
                        </div>
                        {typeof value === 'boolean' ? (
                          <button
                            onClick={() => handleToggleSetting('privacySettings', key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              value ? 'bg-purple-500' : 'bg-gray-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        ) : (
                          <select className="p-2 border border-gray-300 rounded-lg">
                            <option>Classmates</option>
                            <option>Instructors Only</option>
                            <option>Private</option>
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-3">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                      <button className="px-4 py-2 bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white rounded-lg">
                        Enable
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Login History</p>
                        <p className="text-sm text-gray-600">View recent account activity</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-primary-lighter">
                        View History
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-800">Delete Account</p>
                        <p className="text-sm text-red-600">Permanently delete your account</p>
                      </div>
                      <button className="px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-primary-lighter">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}