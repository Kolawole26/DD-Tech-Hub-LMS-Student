'use client';

import { PlayCircle, CheckCircle, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import ProgressBar from './ProgressBar';

export default function ModuleCard({ module, note, onNoteUpdate }) {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3">
          {module.progress === 100 ? (
            <CheckCircle className="text-green-500 mt-1" size={24} />
          ) : (
            <PlayCircle className="text-blue-500 mt-1" size={24} />
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">{module.title}</h3>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-400 hover:text-gray-600"
              >
                <ChevronRight className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} size={20} />
              </button>
            </div>
            
            <div className="mt-2">
              <ProgressBar progress={module.progress} size="small" />
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
              <span className="flex items-center space-x-1">
                <BookOpen size={14} />
                <span>{module.lessons} lessons</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{module.duration}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-700">Module Details</h4>
            <button 
              onClick={() => setIsNoteOpen(!isNoteOpen)}
              className="text-primary-dark hover:text-primary text-sm font-medium"
            >
              {isNoteOpen ? 'Hide Note' : 'Add Note'}
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-semibold">
                {module.progress === 100 ? 'Completed' : 'In Progress'}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Completion</p>
              <p className="font-semibold">{module.progress}%</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="font-medium">View Lecture Materials</span>
                <ChevronRight size={16} />
              </div>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="font-medium">Take Module Quiz</span>
                <ChevronRight size={16} />
              </div>
            </button>
          </div>
        </div>
      )}
      
      {/* Note section */}
      {isNoteOpen && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <textarea
            value={note || ''}
            onChange={(e) => onNoteUpdate(e.target.value)}
            placeholder="Add notes for this module..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => setIsNoteOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onNoteUpdate(note || '');
                setIsNoteOpen(false);
              }}
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
}