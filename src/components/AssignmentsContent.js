'use client';

import { useState } from 'react';
import { Upload, FileText, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function AssignmentsContent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const assignments = [
    { 
      id: 1, 
      title: 'Assignment 1: HTML & CSS Portfolio', 
      dueDate: 'Nov 20, 2025', 
      status: 'submitted', 
      grade: '95/100',
      description: 'Create a responsive portfolio website using HTML5 and CSS3.'
    },
    { 
      id: 2, 
      title: 'Assignment 2: JavaScript Calculator', 
      dueDate: 'Nov 30, 2025', 
      status: 'pending', 
      grade: 'Not graded',
      description: 'Build a functional calculator with JavaScript operations.'
    },
    { 
      id: 3, 
      title: 'Assignment 3: React Todo App', 
      dueDate: 'Dec 15, 2025', 
      status: 'upcoming', 
      grade: 'Not available',
      description: 'Create a todo application using React with state management.'
    },
  ];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }
    
    // Simulate submission
    setSubmissionStatus('submitting');
    setTimeout(() => {
      setSubmissionStatus('success');
      setSelectedFile(null);
      // Reset after 3 seconds
      setTimeout(() => setSubmissionStatus(null), 3000);
    }, 1500);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'submitted':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Submitted</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Pending</span>;
      case 'upcoming':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Upcoming</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-dark to-primary-light rounded-2xl p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Assessment Submission</h1>
        <p className="text-primary-lighter">Submit your assignments and track submission status</p>
      </div>

      {/* Current Assignment */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Current Assignment</h2>
        
        <div className="border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Assignment 2: JavaScript Calculator</h3>
              <div className="flex items-center space-x-4 mt-2">
                <span className="flex items-center space-x-1 text-gray-600">
                  <Calendar size={16} />
                  <span>Due: Nov 30, 2025</span>
                </span>
                <span className="flex items-center space-x-1 text-gray-600">
                  <Clock size={16} />
                  <span>3 days remaining</span>
                </span>
              </div>
            </div>
            {getStatusBadge('pending')}
          </div>
          
          <p className="text-gray-600 mb-6">
            Build a functional calculator with JavaScript that supports basic arithmetic operations 
            (addition, subtraction, multiplication, division). The calculator should have a clean UI 
            and handle edge cases appropriately.
          </p>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Basic arithmetic operations</li>
              <li>Clear and delete functionality</li>
              <li>Responsive design</li>
              <li>Error handling for division by zero</li>
              <li>Code comments and documentation</li>
            </ul>
          </div>
        </div>

        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          {!selectedFile ? (
            <div>
              <Upload className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 mb-4">Drag & drop your assignment file here, or click to browse</p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileSelect}
              />
              <label
                htmlFor="file-upload"
                className="inline-block bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white font-semibold px-6 py-3 rounded-lg cursor-pointer"
              >
                Browse Files
              </label>
              <p className="text-sm text-gray-500 mt-4">Accepted formats: .zip, .pdf, .doc, .js, .html, .css</p>
            </div>
          ) : (
            <div className="text-center">
              <FileText className="mx-auto text-green-500 mb-4" size={48} />
              <p className="font-semibold text-gray-800 mb-2">{selectedFile.name}</p>
              <p className="text-gray-600 mb-4">{(selectedFile.size / 1024).toFixed(2)} KB</p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setSelectedFile(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Remove
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submissionStatus === 'submitting'}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg disabled:opacity-50"
                >
                  {submissionStatus === 'submitting' ? 'Uploading...' : 'Submit Assignment'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Submission Status */}
        {submissionStatus === 'success' && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-green-600" size={24} />
              <div>
                <p className="font-semibold text-green-800">Assignment submitted successfully!</p>
                <p className="text-green-700 text-sm">You will receive a confirmation email shortly.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* All Assignments */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">All Assignments</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Assignment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Due Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Grade</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-800">{assignment.title}</p>
                      <p className="text-sm text-gray-600 truncate max-w-xs">{assignment.description}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-700">{assignment.dueDate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">{getStatusBadge(assignment.status)}</td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${
                      assignment.grade === 'Not graded' || assignment.grade === 'Not available'
                        ? 'text-gray-600'
                        : 'text-green-600'
                    }`}>
                      {assignment.grade}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {assignment.status === 'submitted' ? (
                      <button className="px-4 py-2 border border-primary-dark text-primary-dark hover:bg-primary-lighter hover:bg-blue-50 rounded-lg text-sm">
                        View Feedback
                      </button>
                    ) : assignment.status === 'pending' ? (
                      <button className="px-4 py-2 bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white rounded-lg text-sm">
                        Submit Now
                      </button>
                    ) : (
                      <button className="px-4 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg text-sm">
                        View Details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submission Guidelines */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Submission Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg">
            <AlertCircle className="text-blue-600 mb-2" size={24} />
            <h3 className="font-semibold text-gray-800 mb-2">File Requirements</h3>
            <p className="text-sm text-gray-600">Max file size: 50MB. Accepted formats: ZIP, PDF, DOC, JS, HTML, CSS</p>
          </div>
          <div className="p-4 border border-green-100 bg-green-50 rounded-lg">
            <Clock className="text-green-600 mb-2" size={24} />
            <h3 className="font-semibold text-gray-800 mb-2">Deadlines</h3>
            <p className="text-sm text-gray-600">Assignments close automatically at 11:59 PM on the due date</p>
          </div>
          <div className="p-4 border border-purple-100 bg-purple-50 rounded-lg">
            <FileText className="text-purple-600 mb-2" size={24} />
            <h3 className="font-semibold text-gray-800 mb-2">Naming Convention</h3>
            <p className="text-sm text-gray-600">Name files as: StudentID_Assignment#_YourName.zip</p>
          </div>
        </div>
      </div>
    </div>
  );
}