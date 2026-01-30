'use client';

import { useState, useEffect, useRef } from 'react';
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
  Camera,
  Save,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  X,
  Upload
} from 'lucide-react';
import { api } from '@/services/api';

export default function ProfileContent() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [profileData, setProfileData] = useState({
    _id: '',
    is_archived: false,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    account_status: '',
    type: '',
    role: '',
    createdAt: '',
    updatedAt: '',
    num: 0,
    __v: 0,
    status: true
  });

  const [editData, setEditData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    address: ''
  });

  const fileInputRef = useRef(null);

  // Fetch profile data from API
  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/me');
      
      if (response.status === 200) {
        const data = response.data || {};
        console.log('Profile data:', data);
        
        setProfileData({
          _id: data._id || '',
          is_archived: data.is_archived || false,
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          account_status: data.account_status || 'Active',
          type: data.type || '',
          role: data.role || '',
          createdAt: data.createdAt || '',
          updatedAt: data.updatedAt || '',
          num: data.num || 0,
          __v: data.__v || 0,
          status: data.status !== undefined ? data.status : true
        });

        // Set edit form with current values
        setEditData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone: data.phone || '',
          address: data.address || ''
        });
      } else {
        setError(response.message || 'Failed to load profile');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err.message || 'Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle profile update
  const handleSaveProfile = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Prepare payload - only include fields that can be updated
      const payload = {
        first_name: editData.first_name,
        last_name: editData.last_name,
        phone: editData.phone || '',
        address: editData.address || ''
      };

      console.log('Saving payload:', payload);

      const response = await api.patch('/me', payload);
      
      if (response.status === 200) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        fetchProfile(); // Refresh profile data
      } else {
        setError(response.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        setIsUploading(false);
        return;
      }

      // Check file type
      if (!file.type.match('image.*')) {
        setError('Please select an image file');
        setIsUploading(false);
        return;
      }

      // Simulate upload - In a real app, you would upload to your API
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setIsUploading(false);
          // Here you would typically update the profile photo via API
          // For now, we'll just show a success message
          setSuccess('Profile photo updated successfully!');
        };
        reader.readAsDataURL(file);
      }, 1500);
    }
  };

  const handleToggleSetting = (category, setting) => {
    // Toggle notification settings
    console.log(`Toggled ${category}.${setting}`);
    // In a real app, you would make an API call here
  };

  const getInitials = () => {
    const firstName = profileData.first_name || '';
    const lastName = profileData.last_name || '';
    return (firstName[0] || '') + (lastName[0] || '');
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-primary-dark mx-auto" size={48} />
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-dark to-primary-light rounded-2xl p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Profile Management</h1>
        <p className="text-primary-lighter">Manage your account, settings, and preferences</p>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-700">{error}</p>
          <button onClick={() => setError('')} className="ml-auto text-red-500 hover:text-red-700">
            <X size={18} />
          </button>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="text-green-500" size={20} />
          <p className="text-green-700">{success}</p>
          <button onClick={() => setSuccess('')} className="ml-auto text-green-500 hover:text-green-700">
            <X size={18} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Profile Overview */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="text-center">
              {/* Profile Image */}
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-dark to-primary-light flex items-center justify-center text-white text-4xl font-bold">
                  {getInitials()}
                </div>
                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  <Camera size={20} className="text-gray-600" />
                </label>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {profileData.first_name} {profileData.last_name}
              </h2>
              <p className="text-gray-600 mb-3">{profileData.type} • {profileData.role}</p>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className={`w-2 h-2 rounded-full ${
                  profileData.account_status === 'Active' || profileData.status ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={`text-sm font-medium ${
                  profileData.account_status === 'Active' || profileData.status ? 'text-green-600' : 'text-red-600'
                }`}>
                  {profileData.account_status || (profileData.status ? 'Active' : 'Inactive')}
                </span>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member ID</span>
                  <span className="font-medium">{profileData._id.substring(0, 8)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Joined</span>
                  <span className="font-medium">
                    {new Date(profileData.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">
                    {new Date(profileData.updatedAt).toLocaleDateString()}
                  </span>
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
                  onClick={() => {
                    if (isEditing) {
                      setIsEditing(false);
                      // Reset edit form to current profile data
                      setEditData({
                        first_name: profileData.first_name,
                        last_name: profileData.last_name,
                        phone: profileData.phone,
                        address: profileData.address
                      });
                    } else {
                      setIsEditing(true);
                    }
                  }}
                  className="px-4 py-2 bg-primary-dark hover:bg-primary-light text-white rounded-lg flex items-center space-x-2"
                >
                  {isEditing ? <X size={16} /> : <Edit size={16} />}
                  <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
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
                        <span>First Name *</span>
                      </div>
                    </label>
                    <input
                      type="text"
                      value={isEditing ? editData.first_name : profileData.first_name}
                      onChange={(e) => isEditing && setEditData({...editData, first_name: e.target.value})}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-700"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <User size={16} />
                        <span>Last Name *</span>
                      </div>
                    </label>
                    <input
                      type="text"
                      value={isEditing ? editData.last_name : profileData.last_name}
                      onChange={(e) => isEditing && setEditData({...editData, last_name: e.target.value})}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-700"
                      required
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
                      value={profileData.email}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
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
                      value={isEditing ? editData.phone : profileData.phone}
                      onChange={(e) => isEditing && setEditData({...editData, phone: e.target.value})}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-700"
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
                      value={isEditing ? editData.address : profileData.address}
                      onChange={(e) => isEditing && setEditData({...editData, address: e.target.value})}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Type
                    </label>
                    <input
                      type="text"
                      value={profileData.type}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                    />
                    <p className="text-xs text-gray-500 mt-1">Account type cannot be changed</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      value={profileData.role}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                    />
                    <p className="text-xs text-gray-500 mt-1">Role cannot be changed</p>
                  </div>
                </div>

                {/* Read-only fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Status
                    </label>
                    <input
                      type="text"
                      value={profileData.account_status}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member ID
                    </label>
                    <input
                      type="text"
                      value={profileData._id}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        // Reset edit form
                        setEditData({
                          first_name: profileData.first_name,
                          last_name: profileData.last_name,
                          phone: profileData.phone,
                          address: profileData.address
                        });
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving || !editData.first_name || !editData.last_name}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 flex items-center space-x-2"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          <span>Save Changes</span>
                        </>
                      )}
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
                        <span className="text-gray-600">Account Type</span>
                        <span className="font-medium">{profileData.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Role</span>
                        <span className="font-medium">{profileData.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Member Since</span>
                        <span className="font-medium">
                          {new Date(profileData.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Account Status</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span className={`font-medium ${
                          profileData.account_status === 'Active' || profileData.status 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {profileData.account_status || (profileData.status ? 'Active' : 'Inactive')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Archived</span>
                        <span className="font-medium">{profileData.is_archived ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated</span>
                        <span className="font-medium">
                          {new Date(profileData.updatedAt).toLocaleDateString()}
                        </span>
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
                      <button className="px-4 py-2 bg-primary-dark hover:bg-primary-light text-white rounded-lg">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Preferences Tab - Keep existing UI */}
            {activeTab === 'notifications' && (
              <div className="space-y-8">
                {/* Keep existing notification UI */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    {Object.entries({
                      classReminders: true,
                      assignmentDeadlines: true,
                      gradeUpdates: true,
                      courseUpdates: false,
                      newsletter: false,
                    }).map(([key, value]) => (
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

                {/* Keep other notification sections as they were */}
              </div>
            )}

            {/* Payment & Billing Tab - Keep existing UI */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                {/* Keep existing payment UI */}
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Current Plan</h3>
                      <p className="text-gray-600">Premium Plan</p>
                    </div>
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                      Active
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-white rounded-lg border">
                      <p className="text-sm text-gray-600">Next Billing</p>
                      <p className="font-bold text-lg">January 1, 2026</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border">
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-bold text-lg">Credit Card **** 4242</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border">
                      <p className="text-sm text-gray-600">Auto Renew</p>
                      <p className="font-bold text-lg">
                        Enabled
                      </p>
                    </div>
                  </div>
                </div>

                {/* Keep other payment sections as they were */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}