'use client';

import { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  Image, 
  Video, 
  FileCode,
  Trash2,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function FileUploadModal({ isOpen, onClose, onUpload }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'pending',
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    const progress = {};
    files.forEach(f => {
      progress[f.id] = 0;
    });
    setUploadProgress(progress);

    // Simulate upload progress
    const interval = setInterval(() => {
      setFiles(prev => prev.map(f => {
        if (f.status === 'pending') {
          const newProgress = Math.min((uploadProgress[f.id] || 0) + 10, 100);
          progress[f.id] = newProgress;
          
          if (newProgress === 100) {
            return { ...f, progress: 100, status: 'completed' };
          }
          return { ...f, progress: newProgress };
        }
        return f;
      }));
      setUploadProgress(progress);

      // Check if all files are uploaded
      const allCompleted = files.every(f => progress[f.id] === 100);
      if (allCompleted) {
        clearInterval(interval);
        setTimeout(() => {
          onUpload(files);
          setFiles([]);
          setUploading(false);
          onClose();
        }, 500);
      }
    }, 200);
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) {
      return <Image className="text-green-500" size={20} />;
    } else if (type.startsWith('video/')) {
      return <Video className="text-purple-500" size={20} />;
    } else if (type.includes('code') || type.includes('text')) {
      return <FileCode className="text-blue-500" size={20} />;
    } else {
      return <FileText className="text-gray-500" size={20} />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Upload Files</h2>
              <p className="text-gray-600">Share files with your group</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Upload Area */}
          {files.length === 0 && !uploading && (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <Upload className="text-blue-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Drop files here or click to upload</h3>
              <p className="text-gray-600 mb-4">Supports images, documents, code files, and more</p>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
                Select Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          )}

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">
                  {files.length} file(s) selected
                </h3>
                <button
                  onClick={() => setFiles([])}
                  className="text-red-600 hover:text-red-800 text-sm flex items-center space-x-1"
                >
                  <Trash2 size={14} />
                  <span>Clear all</span>
                </button>
              </div>

              <div className="space-y-3">
                {files.map((file) => (
                  <div key={file.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(file.type)}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate">{file.name}</p>
                          <div className="flex items-center space-x-3 text-sm text-gray-500">
                            <span>{formatFileSize(file.size)}</span>
                            <span>•</span>
                            <span>{file.type}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {file.status === 'completed' ? (
                          <CheckCircle className="text-green-500" size={20} />
                        ) : file.status === 'uploading' ? (
                          <Loader2 className="text-blue-500 animate-spin" size={20} />
                        ) : (
                          <button
                            onClick={() => removeFile(file.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {file.status !== 'completed' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Uploading...</span>
                          <span className="font-medium">{file.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add More Files */}
              <div className="pt-4 border-t">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 flex items-center justify-center space-x-2"
                >
                  <Upload size={16} />
                  <span>Add more files</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* Uploading State */}
          {uploading && (
            <div className="text-center py-8">
              <Loader2 className="mx-auto text-blue-600 animate-spin mb-4" size={32} />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Uploading files...</h3>
              <p className="text-gray-600">Please wait while we upload your files</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <AlertCircle size={14} />
                <span>Max file size: 50MB per file</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold rounded-lg"
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={files.length === 0 || uploading}
                className={`px-6 py-2 font-semibold rounded-lg ${
                  files.length === 0 || uploading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {uploading ? 'Uploading...' : `Upload ${files.length} file(s)`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}