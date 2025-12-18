'use client';

import { useState } from 'react';
import { Play, Video, FileText, Download, Calendar, Clock, Users, Mic } from 'lucide-react';

export default function ClassroomContent() {
  const [activeTab, setActiveTab] = useState('live');
  const [selectedRecording, setSelectedRecording] = useState(null);

  const liveSessions = [
    { id: 1, title: 'Advanced JavaScript Concepts', time: 'Today, 10:00 AM', duration: '2 hours', instructor: 'Dr. Sarah Johnson' },
    { id: 2, title: 'CSS Grid Masterclass', time: 'Tomorrow, 2:00 PM', duration: '1.5 hours', instructor: 'Prof. Michael Chen' },
  ];

  const recordings = [
    { id: 1, title: 'Introduction to Web Development', date: 'Dec 10, 2025', duration: '2h 15m', views: '245' },
    { id: 2, title: 'Deep Dive into CSS Flexbox', date: 'Dec 8, 2025', duration: '1h 45m', views: '189' },
    { id: 3, title: 'JavaScript Fundamentals', date: 'Dec 5, 2025', duration: '2h 30m', views: '312' },
  ];

  const materials = [
    { id: 1, title: 'Course Syllabus', type: 'PDF', size: '2.4 MB' },
    { id: 2, title: 'Week 1 Slides', type: 'PPTX', size: '15.2 MB' },
    { id: 3, title: 'Project Guidelines', type: 'DOC', size: '3.7 MB' },
    { id: 4, title: 'Reference Materials', type: 'ZIP', size: '48.5 MB' },
  ];

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
            <div className="aspect-video bg-black flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                  <Play className="text-white" size={32} />
                </div>
                <p className="text-white font-semibold">Live Class in Progress</p>
                <p className="text-gray-400 text-sm mt-1">Advanced JavaScript Concepts</p>
              </div>
            </div>
            <div className="p-4 bg-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Advanced JavaScript Concepts</h3>
                  <p className="text-gray-400 text-sm">Dr. Sarah Johnson</p>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg flex items-center space-x-2">
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
                  <p className="text-sm text-gray-600">45 students online</p>
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

            <button className="w-full bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white font-semibold py-3 rounded-lg">
              View Class Materials
            </button>
          </div>
        </div>
      </div>

      {/* Tabs for Recordings & Materials */}
      <div className="bg-white rounded-2xl shadow-sm">
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
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedRecording === recording.id
                      ? 'text-primary-dark bg-primary-lighter'
                      : 'border-gray-200 hover:border-primary-dark'
                  }`}
                  onClick={() => setSelectedRecording(recording.id)}
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
                      <button className="px-4 py-2 border border-primary-dark text-primary-dark hover:bg-primary-lighter hover:bg-blue-50 rounded-lg">
                        Preview
                      </button>
                      <button className="px-4 py-2 bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white rounded-lg">
                        Watch Full
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
                      <button className="px-4 py-2 border border-primary-dark text-primary-dark hover:bg-primary-lighter hover:bg-blue-50 rounded-lg">
                        Download
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
                      <button className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 font-semibold rounded-lg">
                        Set Reminder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}