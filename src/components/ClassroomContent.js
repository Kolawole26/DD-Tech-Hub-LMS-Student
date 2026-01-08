'use client';

import { useState } from 'react';
import { Play, Video, FileText, Download, Calendar, Clock, Users, Mic, Eye, Bell, ExternalLink, Maximize2, Headphones, MessageSquare, Share2, BookOpen, X, FileDown, Volume2, Save} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ClassroomContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('recordings');
  const [selectedRecording, setSelectedRecording] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [showMaterialsModal, setShowMaterialsModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [liveClassStatus, setLiveClassStatus] = useState({
    isJoined: false,
    isFullscreen: false,
    isMuted: false,
    participants: 45,
    audio: true,
    chat: true
  });
  const [quickNote, setQuickNote] = useState('');
  const liveSessions = [
    { id: 1, title: 'Advanced JavaScript Concepts', time: 'Today, 10:00 AM', duration: '2 hours', instructor: 'Dr. Sarah Johnson', description: 'Deep dive into advanced JavaScript patterns and best practices' },
    { id: 2, title: 'CSS Grid Masterclass', time: 'Tomorrow, 2:00 PM', duration: '1.5 hours', instructor: 'Prof. Michael Chen', description: 'Master CSS Grid layout techniques' },
  ];

  const recordings = [
    { id: 1, title: 'Introduction to Web Development', date: 'Dec 10, 2025', duration: '2h 15m', views: '245', description: 'Learn the basics of web development' },
    { id: 2, title: 'Deep Dive into CSS Flexbox', date: 'Dec 8, 2025', duration: '1h 45m', views: '189', description: 'Master CSS Flexbox layout techniques' },
    { id: 3, title: 'JavaScript Fundamentals', date: 'Dec 5, 2025', duration: '2h 30m', views: '312', description: 'Essential JavaScript concepts and syntax' },
  ];

  const materials = [
    { id: 1, title: 'Course Syllabus', type: 'PDF', size: '2.4 MB', description: 'Complete course outline and schedule' },
    { id: 2, title: 'Week 1 Slides', type: 'PPTX', size: '15.2 MB', description: 'Presentation slides for week 1' },
    { id: 3, title: 'Project Guidelines', type: 'DOC', size: '3.7 MB', description: 'Detailed project requirements' },
    { id: 4, title: 'Reference Materials', type: 'ZIP', size: '48.5 MB', description: 'Collection of reference documents' },
  ];

  const handleJoinClass = () => {
    setLiveClassStatus(prev => ({ ...prev, isJoined: true }));
    setShowJoinModal(true);
  };

  const handleLeaveClass = () => {
    setLiveClassStatus(prev => ({ ...prev, isJoined: false }));
    setShowJoinModal(false);
  };

  const handleToggleFullscreen = () => {
    setLiveClassStatus(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }));
  };

  const handleToggleMute = () => {
    setLiveClassStatus(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const handleToggleAudio = () => {
    setLiveClassStatus(prev => ({ ...prev, audio: !prev.audio }));
  };

  const handleToggleChat = () => {
    setLiveClassStatus(prev => ({ ...prev, chat: !prev.chat }));
  };

  const handleViewMaterials = () => {
    setShowMaterialsModal(true);
  };

  const handleWatchRecording = (recording) => {
    setSelectedRecording(recording);
    setShowRecordingModal(true);
  };

  const handlePreviewRecording = (recording) => {
    setSelectedRecording(recording);
    setShowPreviewModal(true);
  };

  const handleDownloadMaterial = (material) => {
    setSelectedMaterial(material);
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${material.title}.${material.type.toLowerCase()}`;
    link.click();
  };

  const handleSetReminder = (session) => {
    setSelectedRecording(session);
    setShowReminderModal(true);
  };

  const handleShareRecording = (recording) => {
    if (navigator.share) {
      navigator.share({
        title: recording.title,
        text: `Check out this class recording: ${recording.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification (would be implemented with a toast library)
      console.log('Link copied to clipboard');
    }
  };

    const handleSaveQuickNote = () => {
    if (quickNote.trim()) {
      alert('Note saved!');
      setQuickNote('');
    }
  };

  const navigateToLiveClass = () => {
    router.push('/classroom/live/advanced-javascript');
  };

  const navigateToRecording = (recordingId) => {
    router.push(`/classroom/recordings/${recordingId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-dark to-primary-light rounded-2xl p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Classroom / Lecture Access</h1>
        <p className="text-primary-lighter">Access live classes, recordings, and course materials</p>
      </div>

      {/* Live Class Now */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Live Class Now</h2>
          <div className="flex items-center space-x-2 text-red-600">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span className="font-semibold">LIVE NOW</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Player */}
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            <div className="aspect-video bg-black flex items-center justify-center relative">
              {!liveClassStatus.isJoined ? (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                    <Play className="text-white" size={32} />
                  </div>
                  <p className="text-white font-semibold">Live Class in Progress</p>
                  <p className="text-gray-400 text-sm mt-1">Advanced JavaScript Concepts</p>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col">
                  {/* Video controls */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button 
                      onClick={handleToggleFullscreen}
                      className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70"
                    >
                      {liveClassStatus.isFullscreen ? <Maximize2 size={20} /> : <Maximize2 size={20} />}
                    </button>
                    <button 
                      onClick={handleToggleMute}
                      className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70"
                    >
                      {liveClassStatus.isMuted ? <Volume2 size={20} /> : <Volume2 size={20} />}
                    </button>
                  </div>
                  
                  {/* Simulated video content */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
                        <Play className="text-white" size={32} />
                      </div>
                      <p className="text-white font-semibold">Connected to Live Class</p>
                      <p className="text-gray-400 text-sm mt-1">{liveClassStatus.participants} participants</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 bg-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Advanced JavaScript Concepts</h3>
                  <p className="text-gray-400 text-sm">Dr. Sarah Johnson</p>
                </div>
                <button 
                  onClick={handleJoinClass}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Play size={20} />
                  <span>{liveClassStatus.isJoined ? 'Leave Class' : 'Join Now'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Class Details */}
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Calendar className="text-blue-600" size={24} />
                <div>
                  <h3 className="font-semibold">Class Schedule</h3>
                  <p className="text-sm text-gray-600">Monday, December 13 • 10:00 AM WAT</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-green-600" size={24} />
                <div>
                  <h3 className="font-semibold">Duration</h3>
                  <p className="text-sm text-gray-600">2 hours</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="text-purple-600" size={24} />
                <div>
                  <h3 className="font-semibold">Participants</h3>
                  <p className="text-sm text-gray-600">{liveClassStatus.participants} students online</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mic className="text-orange-600" size={24} />
                <div>
                  <h3 className="font-semibold">Audio Setup</h3>
                  <p className="text-sm text-gray-600">Microphone & speakers ready</p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleViewMaterials}
              className="w-full bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2"
            >
              <BookOpen size={20} />
              <span>View Class Materials</span>
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
      {/* Tabs for Recordings & Materials */}
      <div className="bg-white rounded-2xl shadow-sm col-span-4">
        <div className="border-b">
          <div className="flex space-x-1 px-6 pt-4">
            <button
              onClick={() => setActiveTab('recordings')}
              className={`px-4 py-2 font-medium rounded-t-lg ${
                activeTab === 'recordings'
                  ? 'bg-primary-light text-primary-dark border-b-2 border-primary-dark'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Class Recordings
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`px-4 py-2 font-medium rounded-t-lg ${
                activeTab === 'materials'
                  ? 'bg-primary-light text-primary-dark border-b-2 border-primary-dark'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Course Materials
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 font-medium rounded-t-lg ${
                activeTab === 'upcoming'
                  ? 'bg-primary-light text-primary-dark border-b-2 border-primary-dark'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Upcoming Sessions
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'recordings' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Previous Class Recordings</h3>
              {recordings.map((recording) => (
                <div
                  key={recording.id}
                  className={`p-4 border rounded-lg transition-colors ${
                    selectedRecording?.id === recording.id
                      ? 'text-primary-dark bg-primary-lighter'
                      : 'border-gray-200 hover:border-primary-dark'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                        <Video className="text-primary-dark" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{recording.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{recording.date}</span>
                          <span>•</span>
                          <span>{recording.duration}</span>
                          <span>•</span>
                          <span>{recording.views} views</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handlePreviewRecording(recording)}
                        className="px-4 py-2 border border-primary-dark text-primary-dark hover:bg-primary-lighter rounded-lg flex items-center space-x-2"
                      >
                        <Eye size={16} />
                        <span>Preview</span>
                      </button>
                      <button 
                        onClick={() => handleWatchRecording(recording)}
                        className="px-4 py-2 bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white rounded-lg flex items-center space-x-2"
                      >
                        <Play size={16} />
                        <span>Watch Full</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'materials' && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Course Materials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {materials.map((material) => (
                  <div key={material.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary-dark transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText className="text-gray-600" size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{material.title}</h4>
                        <p className="text-sm text-gray-600">{material.type} • {material.size}</p>
                      </div>
                      <button 
                        onClick={() => handleDownloadMaterial(material)}
                        className="px-4 py-2 border border-primary-dark text-primary-dark hover:bg-primary-lighter rounded-lg flex items-center space-x-2"
                      >
                        <Download size={16} />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Live Sessions</h3>
              <div className="space-y-4">
                {liveSessions.map((session) => (
                  <div key={session.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{session.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center space-x-1">
                            <Calendar size={16} />
                            <span>{session.time}</span>
                          </span>
                          <span>•</span>
                          <span>{session.duration}</span>
                          <span>•</span>
                          <span>{session.instructor}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleSetReminder(session)}
                        className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 font-semibold rounded-lg flex items-center space-x-2"
                      >
                        <Bell size={16} />
                        <span>Set Reminder</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
                  <div className="rounded-2xl p-6 border border-gray-200 col-span-2">
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

      {/* Join Class Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Join Live Class</h3>
              <button
                onClick={handleLeaveClass}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="p-2 bg-white rounded-lg">
                  <Headphones className="text-blue-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Audio Check</h4>
                  <p className="text-sm text-gray-600">Make sure your microphone is working</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Enable Microphone</span>
                  <button 
                    onClick={handleToggleAudio}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      liveClassStatus.audio ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      liveClassStatus.audio ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Enable Chat</span>
                  <button 
                    onClick={handleToggleChat}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      liveClassStatus.chat ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      liveClassStatus.chat ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleLeaveClass}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={navigateToLiveClass}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center space-x-2"
              >
                <Play size={16} />
                <span>Join Class</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Recording Modal */}
      {showPreviewModal && selectedRecording && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Preview Recording</h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
                  <Play className="text-white" size={32} />
                </div>
                <p className="text-white font-semibold">{selectedRecording.title}</p>
                <p className="text-gray-400 text-sm mt-1">Preview (30 seconds)</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-gray-800">{selectedRecording.title}</h4>
                <p className="text-sm text-gray-600">{selectedRecording.description}</p>
              </div>
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  navigateToRecording(selectedRecording.id);
                }}
                className="px-4 py-2 bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white rounded-lg"
              >
                Watch Full Recording
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Watch Recording Modal */}
      {showRecordingModal && selectedRecording && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Watch Recording</h3>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleShareRecording(selectedRecording)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  title="Share"
                >
                  <Share2 size={20} />
                </button>
                <button
                  onClick={() => setShowRecordingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-primary-dark rounded-full flex items-center justify-center">
                  <Play className="text-white" size={40} />
                </div>
                <p className="text-white font-semibold text-lg">{selectedRecording.title}</p>
                <p className="text-gray-400 text-sm mt-1">Duration: {selectedRecording.duration}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800">{selectedRecording.title}</h4>
                <p className="text-gray-600">{selectedRecording.description}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>{selectedRecording.date}</span>
                  <span>•</span>
                  <span>{selectedRecording.views} views</span>
                </div>
                <button
                  onClick={() => navigateToRecording(selectedRecording.id)}
                  className="px-4 py-2 bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white rounded-lg"
                >
                  Open in Full Screen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Materials Modal */}
      {showMaterialsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Class Materials</h3>
              <button
                onClick={() => setShowMaterialsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              {materials.map((material) => (
                <div key={material.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary-dark transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText className="text-gray-600" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{material.title}</h4>
                        <p className="text-sm text-gray-600">{material.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{material.type} • {material.size}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDownloadMaterial(material)}
                      className="px-4 py-2 border border-primary-dark text-primary-dark hover:bg-primary-lighter rounded-lg flex items-center space-x-2"
                    >
                      <FileDown size={16} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reminder Modal */}
      {showReminderModal && selectedRecording && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Set Reminder</h3>
              <button
                onClick={() => setShowReminderModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-bold text-gray-800">{selectedRecording.title}</h4>
                <p className="text-sm text-gray-600">{selectedRecording.time} • {selectedRecording.duration}</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder Time
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option>15 minutes before</option>
                    <option>30 minutes before</option>
                    <option>1 hour before</option>
                    <option>1 day before</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Method
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary-dark" defaultChecked />
                      <span className="ml-2 text-gray-700">Email</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary-dark" defaultChecked />
                      <span className="ml-2 text-gray-700">Browser Notification</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary-dark" />
                      <span className="ml-2 text-gray-700">Mobile Notification</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowReminderModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowReminderModal(false);
                  // In a real app, this would save reminder settings
                  console.log('Reminder set for:', selectedRecording);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Set Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}