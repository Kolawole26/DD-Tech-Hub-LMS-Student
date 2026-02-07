'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Video, FileText, Download, Calendar, Clock, Users, Mic, Eye, Bell, ExternalLink, Maximize2, Headphones, MessageSquare, Share2, BookOpen, X, FileDown, Volume2, Save, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { joinLiveSession, leaveSession, generateStudentID } from '@/utils/zegocloud-student';
import ClassRecordings from '@/components/classroom/ClassRecordings';
import CourseMaterials from '@/components/classroom/CourseMaterials';
import UpcomingSessions from '@/components/classroom/UpcomingSessions';
import { api } from '@/services/api'; // Assuming you have an api service

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
    participants: 0,
    audio: true,
    chat: true
  });
  const [quickNote, setQuickNote] = useState('');
  
  // API data states
  const [liveSessions, setLiveSessions] = useState([]);
  const [lectureMaterials, setLectureMaterials] = useState([]);
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState({
    liveSessions: true,
    materials: true,
    recordings: false // Start as false since recordings are derived from liveSessions
  });
  const [error, setError] = useState('');
  const [currentLiveSession, setCurrentLiveSession] = useState(null);
  
  // ZEGOCLOUD state for students
  const [zegoInstance, setZegoInstance] = useState(null);
  const [currentRoomID, setCurrentRoomID] = useState('');
  const [currentUserID, setCurrentUserID] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [studentName, setStudentName] = useState('');
  const meetingContainerRef = useRef(null);

  // Fetch live sessions
  useEffect(() => {
    const fetchLiveSessions = async () => {
      try {
        setLoading(prev => ({ ...prev, liveSessions: true }));
        const response = await api.get('/live-sessions');
        
        if (response.status === 200 && response.data?.data) {
          const sessions = response.data.data.map(session => {
            const sessionDate = new Date(session.schedule_time);
            const today = new Date();
            const sessionDay = sessionDate.toDateString();
            const todayString = today.toDateString();
            
            // Determine session status
            let status = 'scheduled';
            let timeDisplay = '';
            
            if (session.status === 'Completed') {
              status = 'completed';
            } else if (sessionDay === todayString) {
              status = 'today';
              timeDisplay = 'Today, ' + sessionDate.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              });
            } else {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              if (sessionDay === tomorrow.toDateString()) {
                status = 'tomorrow';
                timeDisplay = 'Tomorrow, ' + sessionDate.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                });
              } else {
                timeDisplay = sessionDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });
              }
            }

            return {
              id: session._id,
              title: session.title,
              time: timeDisplay || sessionDate.toLocaleString(),
              duration: session.duration,
              instructor: 'Instructor',
              description: session.instructions,
              schedule_time: session.schedule_time,
              status: status,
              room_id: session.room_id,
              joinLink: session.link,
              password: session.session_password,
              isLiveNow: false // We'll check this separately
            };
          });
          
          // Find current live session (status might be "live" from backend)
          const liveNow = sessions.find(s => s.status === 'live' || 
            (new Date(s.schedule_time) <= new Date() && 
             new Date(new Date(s.schedule_time).getTime() + getDurationInMs(s.duration)) > new Date()));
          
          if (liveNow) {
            setCurrentLiveSession(liveNow);
            liveNow.isLiveNow = true;
          }
          
          setLiveSessions(sessions);
          
          // Extract recordings from completed sessions
          const completedSessions = sessions.filter(s => s.status === 'completed');
          const recordingList = completedSessions.map(session => ({
            id: session.id,
            title: session.title,
            date: new Date(session.schedule_time).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            duration: session.duration,
            views: '0', // You might want to get this from backend
            description: session.description,
            room_id: session.room_id
          }));
          setRecordings(recordingList);
        }
      } catch (err) {
        console.error('Error fetching live sessions:', err);
        setError('Failed to load live sessions. Please try again.');
      } finally {
        setLoading(prev => ({ 
          ...prev, 
          liveSessions: false,
          recordings: false // Also set recordings loading to false
        }));
      }
    };

    // Fetch lecture materials
    const fetchLectureMaterials = async () => {
      try {
        setLoading(prev => ({ ...prev, materials: true }));
        const response = await api.get('/lecture-materials');
        
        if (response.status === 200 && response.data[0]?.data) {
          const materials = response.data[0].data.map(material => {
            // Extract file extension and type
            const fileName = material.title;
            const fileExtension = fileName.split('.').pop().toUpperCase();
            const fileType = material.type.includes('pdf') ? 'PDF' : 
                            material.type.includes('image') ? 'Image' :
                            material.type.includes('csv') ? 'CSV' :
                            fileExtension;
            
            return {
              id: material._id,
              title: material.title,
              type: fileType,
              size: material.file_size,
              description: `Uploaded on ${new Date(material.upload_date).toLocaleDateString()}`,
              src: material.src,
              upload_date: material.upload_date
            };
          });
          setLectureMaterials(materials);
        }
      } catch (err) {
        console.error('Error fetching lecture materials:', err);
        setError('Failed to load lecture materials. Please try again.');
      } finally {
        setLoading(prev => ({ ...prev, materials: false }));
      }
    };

    // Fetch both data in parallel
    Promise.all([fetchLiveSessions(), fetchLectureMaterials()])
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('Failed to load classroom data. Please try again.');
      });

    // Check for live session every minute
    const interval = setInterval(() => {
      const now = new Date();
      const liveSession = liveSessions.find(s => {
        const startTime = new Date(s.schedule_time);
        const endTime = new Date(startTime.getTime() + getDurationInMs(s.duration));
        return startTime <= now && endTime > now;
      });
      
      if (liveSession && !currentLiveSession) {
        setCurrentLiveSession(liveSession);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Helper function to convert duration string to milliseconds
  const getDurationInMs = (durationString) => {
    const match = durationString.match(/(\d+)\s*(hour|hours|minute|minutes|h|m)/i);
    if (!match) return 3600000; // Default 1 hour
    
    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();
    
    if (unit.includes('hour') || unit === 'h') {
      return value * 3600000;
    } else if (unit.includes('minute') || unit === 'm') {
      return value * 60000;
    }
    return 3600000;
  };

  // Mark attendance when joining a live session
  const markAttendance = async (liveSessionId) => {
    try {
      const response = await api.post('/attendance', {
        live_session_id: liveSessionId
      });
      
      if (response.status === 200) {
        console.log('Attendance marked successfully');
      }
    } catch (err) {
      console.error('Error marking attendance:', err);
      // Don't block the user from joining if attendance fails
    }
  };

  const handleJoinClass = async (session) => {
    if (!session) {
      // If no session provided, check for current live session
      if (!currentLiveSession) {
        alert('No live session available to join.');
        return;
      }
      session = currentLiveSession;
    }

    try {
      // Generate unique student ID
      const userID = generateStudentID();
      
      // Get student name (in real app, this should come from user profile)
      const name = localStorage.getItem('studentName') || prompt('Enter your name:', 'Student');
      if (!name) return;
      
      // Save name for future use
      localStorage.setItem('studentName', name);
      
      setStudentName(name);
      setCurrentRoomID(session.room_id);
      setCurrentUserID(userID);
      setShowVideoCall(true);
      setLiveClassStatus(prev => ({ ...prev, isJoined: true }));
      
      // Close the join modal if open
      setShowJoinModal(false);
      
      // Mark attendance
      await markAttendance(session.id);
      
      // Wait for the container to be rendered
      setTimeout(async () => {
        if (meetingContainerRef.current) {
          try {
            const zc = await joinLiveSession(
              meetingContainerRef.current,
              session.room_id,
              userID,
              name,
              {
                microphone: liveClassStatus.audio,
                camera: false, // Camera off by default for students
                chat: liveClassStatus.chat,
                onJoinRoom: () => {
                  console.log('Successfully joined the live class');
                },
                onLeaveRoom: () => {
                  handleLeaveClass();
                },
                onUserJoin: (users) => {
                  console.log('New participants joined:', users);
                  // Update participant count
                  setLiveClassStatus(prev => ({ 
                    ...prev, 
                    participants: users.length 
                  }));
                },
                onUserLeave: (users) => {
                  console.log('Participants left:', users);
                  // Update participant count
                  setLiveClassStatus(prev => ({ 
                    ...prev, 
                    participants: Math.max(0, prev.participants - users.length)
                  }));
                },
                onRoomStateChanged: (state) => {
                  console.log('Room state:', state);
                },
              }
            );
            
            setZegoInstance(zc);
          } catch (error) {
            console.error('Failed to join video call:', error);
            alert('Failed to join live class. Please check your internet connection and try again.');
            setShowVideoCall(false);
            setLiveClassStatus(prev => ({ ...prev, isJoined: false }));
          }
        }
      }, 100);
      
    } catch (error) {
      console.error('Error joining live session:', error);
      alert('Failed to join live session: ' + error.message);
    }
  };

  useEffect(() => {
    return () => {
      if (zegoInstance) {
        leaveSession(zegoInstance);
      }
    };
  }, [zegoInstance]);

  const handleLeaveClass = () => {
    if (zegoInstance) {
      leaveSession(zegoInstance);
      setZegoInstance(null);
    }
    
    setLiveClassStatus(prev => ({ ...prev, isJoined: false }));
    setShowVideoCall(false);
    setShowJoinModal(false);
    setCurrentRoomID('');
    setCurrentUserID('');
    
    alert('You have left the live class');
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

  const handleDownloadMaterial = async (material) => {
    try {
      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = material.src;
      link.download = material.title;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading material:', error);
      alert('Failed to download material. Please try again.');
    }
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
      alert('Link copied to clipboard!');
    }
  };

  const handleSaveQuickNote = () => {
    if (quickNote.trim()) {
      // Save note to localStorage or API
      const savedNotes = JSON.parse(localStorage.getItem('quickNotes') || '[]');
      savedNotes.push({
        content: quickNote,
        date: new Date().toISOString()
      });
      localStorage.setItem('quickNotes', JSON.stringify(savedNotes));
      alert('Note saved!');
      setQuickNote('');
    }
  };

  const navigateToRecording = (recordingId) => {
    router.push(`/classroom/recordings/${recordingId}`);
  };

  // Filter upcoming sessions (excluding completed ones)
  const upcomingSessions = liveSessions.filter(s => 
    s.status !== 'completed' && s.status !== 'live'
  );

  // Determine if recordings are loading
  const isRecordingsLoading = loading.liveSessions; // Recordings depend on liveSessions

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-dark to-primary-light rounded-2xl p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Classroom / Lecture Access</h1>
        <p className="text-primary-lighter">Access live classes, recordings, and course materials</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="text-red-500" size={20} />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Live Class Now Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Live Class Now</h2>
          <div className="flex items-center space-x-4">
            {currentLiveSession ? (
              <>
                <div className="flex items-center space-x-2 text-red-600">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="font-semibold">LIVE NOW</span>
                </div>
                {showVideoCall && (
                  <button 
                    onClick={handleLeaveClass}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Leave Class
                  </button>
                )}
              </>
            ) : (
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="font-semibold">NO LIVE CLASS</span>
              </div>
            )}
          </div>
        </div>
        
        {showVideoCall ? (
          <>
            {/* ZEGOCLOUD Video Container */}
            <div 
              ref={meetingContainerRef} 
              className="w-full rounded-xl overflow-hidden bg-gray-900 mb-6"
              style={{ height: '600px' }}
            />
            
            {/* Session Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="text-purple-600" size={24} />
                  <div>
                    <h3 className="font-semibold">You are connected</h3>
                    <p className="text-sm text-gray-600">as {studentName}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="text-green-600" size={24} />
                  <div>
                    <h3 className="font-semibold">Class In Progress</h3>
                    <p className="text-sm text-gray-600">{currentLiveSession?.title}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Video className="text-blue-600" size={24} />
                  <div>
                    <h3 className="font-semibold">Room ID</h3>
                    <p className="text-sm text-gray-600 font-mono">{currentRoomID.slice(-8)}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : currentLiveSession ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Video Player Preview */}
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <div className="aspect-video bg-black flex items-center justify-center relative">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                    <Play className="text-white" size={32} />
                  </div>
                  <p className="text-white font-semibold">Live Class in Progress</p>
                  <p className="text-gray-400 text-sm mt-1">{currentLiveSession.title}</p>
                </div>
              </div>
              <div className="p-4 bg-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold">{currentLiveSession.title}</h3>
                    <p className="text-gray-400 text-sm">{currentLiveSession.instructor}</p>
                  </div>
                  <button 
                    onClick={() => handleJoinClass(currentLiveSession)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <Play size={20} />
                    <span>Join Now</span>
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
                    <p className="text-sm text-gray-600">
                      {new Date(currentLiveSession.schedule_time).toLocaleString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="text-green-600" size={24} />
                  <div>
                    <h3 className="font-semibold">Duration</h3>
                    <p className="text-sm text-gray-600">{currentLiveSession.duration}</p>
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
                    <h3 className="font-semibold">Instructions</h3>
                    <p className="text-sm text-gray-600">{currentLiveSession.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : loading.liveSessions ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto mb-4"></div>
            <p className="text-gray-600">Checking for live sessions...</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <Video className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Live Classes Right Now</h3>
            <p className="text-gray-600 mb-4">Check the upcoming sessions tab for future classes.</p>
          </div>
        )}
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
              isRecordingsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading recordings...</p>
                </div>
              ) : recordings.length === 0 ? (
                <div className="text-center py-8">
                  <Video className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Recordings Available</h3>
                  <p className="text-gray-600">Recordings will appear here after live sessions are completed.</p>
                </div>
              ) : (
                <ClassRecordings 
                  recordings={recordings}
                  onPreviewRecording={handlePreviewRecording}
                  onWatchRecording={handleWatchRecording}
                  onShareRecording={handleShareRecording}
                />
              )
            )}

            {activeTab === 'materials' && (
              loading.materials ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading materials...</p>
                </div>
              ) : lectureMaterials.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Course Materials</h3>
                  <p className="text-gray-600">Course materials will appear here when uploaded by your instructor.</p>
                </div>
              ) : (
                <CourseMaterials 
                  materials={lectureMaterials}
                  onDownloadMaterial={handleDownloadMaterial}
                  onViewAllMaterials={() => setShowMaterialsModal(true)}
                />
              )
            )}

            {activeTab === 'upcoming' && (
              loading.liveSessions ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading upcoming sessions...</p>
                </div>
              ) : upcomingSessions.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Upcoming Sessions</h3>
                  <p className="text-gray-600">Check back later for scheduled live sessions.</p>
                </div>
              ) : (
                <UpcomingSessions 
                  sessions={upcomingSessions}
                  onSetReminder={handleSetReminder}
                  onJoinSession={(session) => {
                    if (session.status === 'today') {
                      handleJoinClass(session);
                    } else {
                      alert(`This session is scheduled for ${session.time}. Please join at the scheduled time.`);
                    }
                  }}
                />
              )
            )}
          </div>
        </div>

        {/* Quick Notepad */}
        <div className="rounded-2xl p-6 border border-gray-200 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Quick Notepad</h2>
            <Link 
              href="/notes" 
              className="text-primary-dark hover:text-primary-light text-sm font-medium"
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
                className="px-4 py-2 bg-primary-dark hover:bg-primary-light text-white font-medium rounded-lg flex items-center space-x-2"
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
                onClick={() => handleJoinClass(currentLiveSession)}
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
                className="px-4 py-2 bg-primary-dark hover:bg-primary-light text-white rounded-lg"
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
                  className="px-4 py-2 bg-primary-dark hover:bg-primary-light text-white rounded-lg"
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
              {lectureMaterials.map((material) => (
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
                  alert('Reminder set successfully!');
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