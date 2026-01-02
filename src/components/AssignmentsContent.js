'use client';

import { useState } from 'react';
import { Upload, FileText, Calendar, Clock, CheckCircle, AlertCircle, Download, Eye, MessageSquare, X, Paperclip, User, BookOpen, Edit, Trash2, Send, ChevronRight, FileDown, CheckSquare } from 'lucide-react';

export default function AssignmentsContent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [submissionForm, setSubmissionForm] = useState({
    title: '',
    comments: '',
    file: null,
    agreeTerms: false
  });
  const [activeAssignment, setActiveAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([
    { 
      id: 1, 
      title: 'Assignment 1: HTML & CSS Portfolio', 
      dueDate: 'Nov 20, 2025', 
      status: 'submitted', 
      grade: '95/100',
      feedback: 'Excellent work! Your portfolio design is responsive and well-structured.',
      description: 'Create a responsive portfolio website using HTML5 and CSS3.',
      submittedDate: 'Nov 18, 2025',
      fileName: 'portfolio_project.zip',
      fileSize: '4.2 MB'
    },
    { 
      id: 2, 
      title: 'Assignment 2: JavaScript Calculator', 
      dueDate: 'Nov 30, 2025', 
      status: 'pending', 
      grade: 'Not graded',
      feedback: '',
      description: 'Build a functional calculator with JavaScript operations.',
      submittedDate: null,
      fileName: null,
      fileSize: null
    },
    { 
      id: 3, 
      title: 'Assignment 3: React Todo App', 
      dueDate: 'Dec 15, 2025', 
      status: 'upcoming', 
      grade: 'Not available',
      feedback: '',
      description: 'Create a todo application using React with state management.',
      submittedDate: null,
      fileName: null,
      fileSize: null
    },
  ]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitNow = (assignment) => {
    setActiveAssignment(assignment);
    setSubmissionForm({
      title: assignment.title,
      comments: '',
      file: null,
      agreeTerms: false
    });
    setShowSubmissionForm(true);
  };

  const handleViewFeedback = (assignment) => {
    setActiveAssignment(assignment);
    setShowFeedbackModal(true);
  };

  const handleViewDetails = (assignment) => {
    setActiveAssignment(assignment);
    setShowDetailsModal(true);
  };

  const handleSubmitAssignment = () => {
    if (!submissionForm.agreeTerms) {
      // Show error (would use toast in real app)
      console.log('Please agree to terms');
      return;
    }

    if (!submissionForm.file) {
      // Show error
      console.log('Please select a file');
      return;
    }

    setSubmissionStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setSubmissionStatus('success');
      
      // Update the assignment status
      setSubmissions(prev => 
        prev.map(item => 
          item.id === activeAssignment.id 
            ? {
                ...item,
                status: 'submitted',
                submittedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                fileName: submissionForm.file.name,
                fileSize: `${(submissionForm.file.size / (1024 * 1024)).toFixed(1)} MB`
              }
            : item
        )
      );
      
      // Reset form
      setSubmissionForm({
        title: '',
        comments: '',
        file: null,
        agreeTerms: false
      });
      
      // Close modal after delay
      setTimeout(() => {
        setShowSubmissionForm(false);
        setActiveAssignment(null);
        setSubmissionStatus(null);
      }, 2000);
    }, 1500);
  };

  const handleDownloadSubmission = (fileName) => {
    // Create a dummy file for download
    const content = `Assignment Submission: ${fileName}\nSubmitted: ${new Date().toLocaleDateString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  };

  const handleQuickSubmit = () => {
    if (!selectedFile) {
      // Show error (would use toast in real app)
      console.log('Please select a file');
      return;
    }
    
    setSubmissionStatus('submitting');
    setTimeout(() => {
      setSubmissionStatus('success');
      
      // Update assignment 2 status
      setSubmissions(prev => 
        prev.map(item => 
          item.id === 2 
            ? {
                ...item,
                status: 'submitted',
                submittedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                fileName: selectedFile.name,
                fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
              }
            : item
        )
      );
      
      setSelectedFile(null);
      setTimeout(() => setSubmissionStatus(null), 3000);
    }, 1500);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'submitted':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
          <CheckCircle size={14} />
          <span>Submitted</span>
        </span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
          <AlertCircle size={14} />
          <span>Pending</span>
        </span>;
      case 'upcoming':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
          <Calendar size={14} />
          <span>Upcoming</span>
        </span>;
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
          
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Requirements:</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1 pl-4">
              <li>Basic arithmetic operations</li>
              <li>Clear and delete functionality</li>
              <li>Responsive design</li>
              <li>Error handling for division by zero</li>
              <li>Code comments and documentation</li>
            </ul>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleViewDetails(submissions[1])}
              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center space-x-2"
            >
              <Eye size={16} />
              <span>View Details</span>
            </button>
            <button 
              onClick={() => handleSubmitNow(submissions[1])}
              className="px-4 py-2 bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white rounded-lg flex items-center space-x-2"
            >
              <Upload size={16} />
              <span>Submit Assignment</span>
            </button>
          </div>
        </div>

        {/* Quick File Upload */}
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
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center space-x-2"
                >
                  <Trash2 size={16} />
                  <span>Remove</span>
                </button>
                <button
                  onClick={handleQuickSubmit}
                  disabled={submissionStatus === 'submitting'}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg disabled:opacity-50 flex items-center space-x-2"
                >
                  <Send size={16} />
                  <span>{submissionStatus === 'submitting' ? 'Uploading...' : 'Submit Now'}</span>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((assignment) => (
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
                    <div className="flex items-center space-x-2">
                      {assignment.status === 'submitted' && (
                        <>
                          <button 
                            onClick={() => handleViewFeedback(assignment)}
                            className="px-3 py-1 border border-green-500 text-green-600 hover:bg-green-50 rounded text-sm flex items-center space-x-1"
                          >
                            <MessageSquare size={14} />
                            <span>Feedback</span>
                          </button>
                          <button 
                            onClick={() => assignment.fileName && handleDownloadSubmission(assignment.fileName)}
                            className="px-3 py-1 border border-blue-500 text-blue-600 hover:bg-blue-50 rounded text-sm flex items-center space-x-1"
                          >
                            <Download size={14} />
                            <span>Download</span>
                          </button>
                        </>
                      )}
                      {assignment.status === 'pending' && (
                        <button 
                          onClick={() => handleSubmitNow(assignment)}
                          className="px-4 py-2 bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white rounded-lg text-sm flex items-center space-x-2"
                        >
                          <Upload size={14} />
                          <span>Submit Now</span>
                        </button>
                      )}
                      {assignment.status === 'upcoming' && (
                        <button 
                          onClick={() => handleViewDetails(assignment)}
                          className="px-4 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg text-sm flex items-center space-x-2"
                        >
                          <Eye size={14} />
                          <span>View Details</span>
                        </button>
                      )}
                    </div>
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

      {/* Submission Form Modal */}
      {showSubmissionForm && activeAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Submit Assignment</h3>
              <button
                onClick={() => {
                  setShowSubmissionForm(false);
                  setActiveAssignment(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="p-2 bg-white rounded-lg">
                  <BookOpen className="text-blue-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{activeAssignment.title}</h4>
                  <p className="text-sm text-gray-600">Due: {activeAssignment.dueDate}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assignment Title
                  </label>
                  <input
                    type="text"
                    value={submissionForm.title}
                    onChange={(e) => setSubmissionForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Enter your submission title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Comments (Optional)
                  </label>
                  <textarea
                    value={submissionForm.comments}
                    onChange={(e) => setSubmissionForm(prev => ({ ...prev, comments: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows="3"
                    placeholder="Add any comments or notes for the instructor..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {!submissionForm.file ? (
                      <div className="text-center">
                        <Upload className="mx-auto text-gray-400 mb-3" size={32} />
                        <p className="text-gray-600 mb-3">Drag & drop or click to browse</p>
                        <input
                          type="file"
                          id="modal-file-upload"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setSubmissionForm(prev => ({ ...prev, file }));
                            }
                          }}
                        />
                        <label
                          htmlFor="modal-file-upload"
                          className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg cursor-pointer"
                        >
                          Choose File
                        </label>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="text-green-500" size={20} />
                          <div>
                            <p className="font-medium text-gray-800">{submissionForm.file.name}</p>
                            <p className="text-sm text-gray-600">
                              {(submissionForm.file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSubmissionForm(prev => ({ ...prev, file: null }))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="agree-terms"
                    checked={submissionForm.agreeTerms}
                    onChange={(e) => setSubmissionForm(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                    className="rounded text-primary-dark"
                  />
                  <label htmlFor="agree-terms" className="text-sm text-gray-700">
                    I confirm that this submission is my own work and complies with academic integrity policies.
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowSubmissionForm(false);
                  setActiveAssignment(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitAssignment}
                disabled={submissionStatus === 'submitting' || !submissionForm.agreeTerms}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg disabled:opacity-50 flex items-center space-x-2"
              >
                {submissionStatus === 'submitting' ? (
                  <>
                    <Clock size={16} />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Submit Assignment</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && activeAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Assignment Feedback</h3>
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  setActiveAssignment(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-2">{activeAssignment.title}</h4>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Submitted: {activeAssignment.submittedDate}</span>
                  <span className="font-semibold text-green-600">{activeAssignment.grade}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  Instructor Feedback
                </h4>
                <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                  <p className="text-gray-700">{activeAssignment.feedback}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Submitted File</h4>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="text-blue-500" size={20} />
                    <div>
                      <p className="font-medium text-gray-800">{activeAssignment.fileName}</p>
                      <p className="text-sm text-gray-600">{activeAssignment.fileSize}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDownloadSubmission(activeAssignment.fileName)}
                    className="px-3 py-1 border border-blue-500 text-blue-600 hover:bg-blue-50 rounded text-sm flex items-center space-x-1"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  setActiveAssignment(null);
                }}
                className="px-4 py-2 bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && activeAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Assignment Details</h3>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setActiveAssignment(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-gray-800 text-lg mb-2">{activeAssignment.title}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    Due: {activeAssignment.dueDate}
                  </span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    3 days remaining
                  </span>
                  <span>
                    {getStatusBadge(activeAssignment.status)}
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Description</h4>
                <p className="text-gray-700">{activeAssignment.description}</p>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Requirements</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                  <li>Follow all coding standards and best practices</li>
                  <li>Include proper documentation and comments</li>
                  <li>Test thoroughly before submission</li>
                  <li>Submit all required files in a single archive</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Submission Guidelines</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <p className="text-sm font-medium text-gray-800">File Format</p>
                    <p className="text-sm text-gray-600">ZIP, PDF, or source files</p>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <p className="text-sm font-medium text-gray-800">Max Size</p>
                    <p className="text-sm text-gray-600">50 MB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setActiveAssignment(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Close
              </button>
              {activeAssignment.status === 'pending' && (
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleSubmitNow(activeAssignment);
                  }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center space-x-2"
                >
                  <Upload size={16} />
                  <span>Submit Assignment</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}