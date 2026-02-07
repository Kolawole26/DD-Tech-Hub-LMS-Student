// components/ClassRecordings.js
import { Video, Play, Eye, Share2 } from 'lucide-react';

export default function ClassRecordings({ 
  recordings, 
  onPreviewRecording, 
  onWatchRecording,
  onShareRecording 
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Previous Class Recordings</h3>
      {recordings.map((recording) => (
        <div
          key={recording.id}
          className="p-4 border border-gray-200 rounded-lg hover:border-primary-dark transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                <Video className="text-primary-dark" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{recording.title}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{recording.date}</span>
                  <span>•</span>
                  <span>{recording.duration}</span>
                  <span>•</span>
                  <span>{recording.views} views</span>
                </div>
                {recording.description && (
                  <p className="text-sm text-gray-500 mt-1">{recording.description}</p>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => onPreviewRecording(recording)}
                className="px-4 py-2 border border-primary-dark text-primary-dark hover:bg-primary-lighter rounded-lg flex items-center space-x-2"
              >
                <Eye size={16} />
                <span>Preview</span>
              </button>
              <button 
                onClick={() => onWatchRecording(recording)}
                className="px-4 py-2 bg-primary-dark hover:bg-primary-light text-white rounded-lg flex items-center space-x-2"
              >
                <Play size={16} />
                <span>Watch Full</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}