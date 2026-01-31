// utils/zegocloud-student.js
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// Get credentials from environment variables
export const APP_ID = parseInt(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID) || 0;
export const SERVER_SECRET = process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET || '';

// Generate unique user ID for student
export const generateStudentID = () => {
  return 'student_' + Date.now().toString() + Math.floor(Math.random() * 10000).toString();
};

// Generate Kit Token for student authentication
export const generateStudentKitToken = (roomID, userID, userName) => {
  if (!APP_ID || !SERVER_SECRET) {
    console.error('ZEGOCLOUD credentials not configured. Please check your .env.local file.');
    return '';
  }

  return ZegoUIKitPrebuilt.generateKitTokenForTest(
    APP_ID,
    SERVER_SECRET,
    roomID,
    userID,
    userName || 'Student_' + userID
  );
};

// Initialize ZEGOCLOUD for student joining session
export const joinLiveSession = async (containerElement, roomID, userID, userName, options = {}) => {
  try {
    const kitToken = generateStudentKitToken(roomID, userID, userName);
    
    if (!kitToken) {
      throw new Error('Failed to generate Kit Token. Check your ZEGOCLOUD credentials.');
    }

    const zc = ZegoUIKitPrebuilt.create(kitToken);

    // Configure the meeting for students (limited controls)
    await zc.joinRoom({
      container: containerElement,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      
      // Student controls - more restrictive than instructor
      turnOnMicrophoneWhenJoining: options.microphone !== false,
      turnOnCameraWhenJoining: options.camera || false, // Camera off by default for students
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: false, // Students cannot share screen
      showTextChat: options.chat !== false,
      showUserList: true,
      maxUsers: 50,
      layout: 'Auto',
      showLayoutButton: false, // Students cannot change layout
      showNonVideoUser: true,
      showOnlyAudioUser: true,
      
      // Recording - students cannot control recording
      showRecordingButton: false,
      
      // Additional student-specific settings
      showLeaveRoomConfirmDialog: true,
      showRoomTimer: true,
      
      // Branding
      branding: {
        logoURL: options.logoURL || '',
      },
      
      // Callbacks
      onJoinRoom: () => {
        console.log('Student joined room successfully');
        if (options.onJoinRoom) options.onJoinRoom();
      },
      onLeaveRoom: () => {
        console.log('Student left room');
        if (options.onLeaveRoom) options.onLeaveRoom();
      },
      onUserJoin: (users) => {
        console.log('Users joined:', users);
        if (options.onUserJoin) options.onUserJoin(users);
      },
      onUserLeave: (users) => {
        console.log('Users left:', users);
        if (options.onUserLeave) options.onUserLeave(users);
      },
      onRoomStateChanged: (state) => {
        console.log('Room state changed:', state);
        if (options.onRoomStateChanged) options.onRoomStateChanged(state);
      },
    });

    return zc;
  } catch (error) {
    console.error('Error joining live session:', error);
    throw error;
  }
};

// Leave and cleanup
export const leaveSession = (zegoInstance) => {
  if (zegoInstance) {
    zegoInstance.destroy();
  }
};

// Check if room exists before joining (optional validation)
export const validateRoomID = (roomID) => {
  // Basic validation
  if (!roomID || roomID.trim() === '') {
    return { valid: false, error: 'Room ID is required' };
  }
  
  if (roomID.length < 3) {
    return { valid: false, error: 'Invalid Room ID format' };
  }
  
  return { valid: true };
};