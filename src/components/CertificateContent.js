'use client';

import { useState } from 'react';
import { Download, Eye, Share2, Printer, CheckCircle, Clock, Award } from 'lucide-react';

export default function CertificateContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const certificate = {
    id: 'CERT-2025-WEB-001',
    course: 'Web App Development',
    studentName: 'John Doe',
    issueDate: 'December 13, 2025',
    expiryDate: 'Never',
    grade: 'A-',
    credits: '3 Credit Hours',
    status: 'available',
  };

  const certificateHistory = [
    { id: 1, course: 'HTML & CSS Fundamentals', date: 'Jun 2025', status: 'completed', downloadUrl: '#' },
    { id: 2, course: 'JavaScript Basics', date: 'Aug 2025', status: 'completed', downloadUrl: '#' },
    { id: 3, course: 'React Development', date: 'Oct 2025', status: 'in-progress', downloadUrl: null },
    { id: 4, course: 'Node.js Backend', date: 'Future', status: 'upcoming', downloadUrl: null },
  ];

  const handleDownload = () => {
    // Simulate download
    alert('Certificate download started!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Web App Development Certificate',
        text: `Check out my certificate for ${certificate.course}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-dark to-primary-light rounded-2xl p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Certificate Download</h1>
        <p className="text-primary-lighter">Download and share your course certificates</p>
      </div>

      {/* Current Certificate */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Current Certificate</h2>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Available
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Certificate Preview */}
          <div className="lg:col-span-2">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gradient-to-br from-primary-lighter to-primary-lighter">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary-dark to-primary-light rounded-full flex items-center justify-center">
                  <Award className="text-white" size={48} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Certificate of Completion</h3>
                <p className="text-gray-600 mb-6">This certifies that</p>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{certificate.studentName}</h2>
                
                <p className="text-gray-600 mb-4">has successfully completed the course</p>
                <h3 className="text-xl font-bold text-primary mb-6">{certificate.course}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600">Grade</p>
                    <p className="font-bold text-gray-800">{certificate.grade}</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600">Credits</p>
                    <p className="font-bold text-gray-800">{certificate.credits}</p>
                  </div>
                </div>
                
                <div className="text-gray-600 text-sm">
                  <p>Issued on: {certificate.issueDate}</p>
                  <p>Certificate ID: {certificate.id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Actions */}
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Certificate Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-green-600">Available for Download</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format</span>
                  <span className="font-medium">PDF Digital</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Validity</span>
                  <span className="font-medium">Lifetime</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Verification</span>
                  <span className="font-medium text-blue-600">Verifiable Online</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDownload}
                className="w-full bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2"
              >
                <Download size={20} />
                <span>Download Certificate (PDF)</span>
              </button>
              
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="w-full border border-primary-dark text-primary-dark hover:bg-primary-lighter hover:bg-blue-50 font-semibold py-3 rounded-lg flex items-center justify-center space-x-2"
              >
                <Eye size={20} />
                <span>Preview Certificate</span>
              </button>
              
              <button
                onClick={handleShare}
                className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg flex items-center justify-center space-x-2"
              >
                <Share2 size={20} />
                <span>Share Certificate</span>
              </button>
              
              <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg flex items-center justify-center space-x-2">
                <Printer size={20} />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate History */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Certificate History</h2>
        
        <div className="space-y-4">
          {certificateHistory.map((cert) => (
            <div key={cert.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    cert.status === 'completed' ? 'bg-green-100' :
                    cert.status === 'in-progress' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {cert.status === 'completed' ? (
                      <CheckCircle className="text-green-600" size={24} />
                    ) : cert.status === 'in-progress' ? (
                      <Clock className="text-blue-600" size={24} />
                    ) : (
                      <Award className="text-gray-600" size={24} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{cert.course}</h3>
                    <p className="text-sm text-gray-600">Completed: {cert.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    cert.status === 'completed' ? 'bg-green-100 text-green-800' :
                    cert.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {cert.status === 'completed' ? 'Completed' :
                     cert.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                  </span>
                  
                  {cert.downloadUrl ? (
                    <button className="px-4 py-2 border border-primary-dark text-primary-dark hover:bg-primary-lighter hover:bg-blue-50 rounded-lg text-sm">
                      Download
                    </button>
                  ) : (
                    <button disabled className="px-4 py-2 border border-gray-300 text-gray-400 rounded-lg text-sm cursor-not-allowed">
                      Unavailable
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Certificate Verification</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Verify Online</h3>
            <p className="text-gray-600 mb-4">Employers can verify your certificate using the unique ID</p>
            <div className="bg-white p-3 rounded border">
              <code className="text-gray-800 font-mono">{certificate.id}</code>
            </div>
          </div>
          
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Add to LinkedIn</h3>
            <p className="text-gray-600 mb-4">Showcase your achievement on your professional profile</p>
            <button className="w-full bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white font-semibold py-2 rounded-lg">
              Share to LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}