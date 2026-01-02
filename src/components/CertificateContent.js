'use client';

import { useState } from 'react';
import { Download, Eye, Share2, Printer, CheckCircle, Clock, Award, X, Copy, ExternalLink, Linkedin, FileText, Mail, Lock, Shield, Verified, QrCode, Link as LinkIcon } from 'lucide-react';

export default function CertificateContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [downloadFormat, setDownloadFormat] = useState('PDF');
  const [verificationCode, setVerificationCode] = useState('VERIFY-2025-WEB-001-1234');
  const [shareOptions, setShareOptions] = useState({
    includeVerification: true,
    includeExpiry: true,
    publicLink: true
  });

  const certificate = {
    id: 'CERT-2025-WEB-001',
    course: 'Web App Development',
    studentName: 'John Doe',
    issueDate: 'December 13, 2025',
    expiryDate: 'Never',
    grade: 'A-',
    credits: '3 Credit Hours',
    status: 'available',
    instructor: 'Dr. Sarah Johnson',
    institution: 'Tech University',
    description: 'Advanced web application development using modern frameworks'
  };

  const certificateHistory = [
    { 
      id: 1, 
      course: 'HTML & CSS Fundamentals', 
      date: 'Jun 2025', 
      status: 'completed', 
      grade: 'A',
      credits: '2 Credit Hours',
      certificateId: 'CERT-2025-HTML-001'
    },
    { 
      id: 2, 
      course: 'JavaScript Basics', 
      date: 'Aug 2025', 
      status: 'completed', 
      grade: 'B+',
      credits: '3 Credit Hours',
      certificateId: 'CERT-2025-JS-001'
    },
    { 
      id: 3, 
      course: 'React Development', 
      date: 'Oct 2025', 
      status: 'in-progress', 
      grade: 'In Progress',
      credits: '4 Credit Hours',
      certificateId: 'CERT-2025-REACT-001'
    },
    { 
      id: 4, 
      course: 'Node.js Backend', 
      date: 'Future', 
      status: 'upcoming', 
      grade: 'Not Started',
      credits: '4 Credit Hours',
      certificateId: null
    },
  ];

  const handleDownload = () => {
    // Create a dummy PDF file for download
    const certificateContent = `
      CERTIFICATE OF COMPLETION
      
      This certifies that
      ${certificate.studentName}
      
      has successfully completed
      ${certificate.course}
      
      Grade: ${certificate.grade}
      Credits: ${certificate.credits}
      Issued: ${certificate.issueDate}
      Certificate ID: ${certificate.id}
      Instructor: ${certificate.instructor}
      
      This certificate is verifiable online using the ID above.
    `;
    
    const blob = new Blob([certificateContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificate_${certificate.course.replace(/\s+/g, '_')}_${certificate.id}.pdf`;
    a.click();
    
    // Show success message
    setIsPreviewOpen(false);
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleShareCertificate = (method) => {
    switch (method) {
      case 'copy':
        navigator.clipboard.writeText(`${certificate.id}\n${certificate.course}\n${certificate.studentName}`);
        setIsShareModalOpen(false);
        // Show toast (in real app)
        console.log('Certificate details copied to clipboard');
        break;
      case 'email':
        window.location.href = `mailto:?subject=My Certificate: ${certificate.course}&body=Check out my certificate!%0A%0ACourse: ${certificate.course}%0AGrade: ${certificate.grade}%0ACertificate ID: ${certificate.id}`;
        break;
      case 'link':
        navigator.clipboard.writeText(`${window.location.origin}/verify/${certificate.id}`);
        setIsShareModalOpen(false);
        // Show toast (in real app)
        console.log('Verification link copied to clipboard');
        break;
    }
  };

  const handlePrint = () => {
    setIsPrintModalOpen(true);
  };

  const handleActualPrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${certificate.course} Certificate</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; }
              .certificate { border: 2px solid #000; padding: 60px; text-align: center; }
              h1 { color: #2d3748; }
              .student-name { font-size: 36px; font-weight: bold; margin: 30px 0; }
              .course { font-size: 24px; color: #4a5568; margin: 20px 0; }
              .details { margin-top: 40px; }
              .id { font-family: monospace; background: #f7fafc; padding: 10px; }
              @media print {
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="certificate">
              <h1>Certificate of Completion</h1>
              <p>This certifies that</p>
              <div class="student-name">${certificate.studentName}</div>
              <p>has successfully completed</p>
              <div class="course">${certificate.course}</div>
              <div class="details">
                <p>Grade: ${certificate.grade} | Credits: ${certificate.credits}</p>
                <p>Issued: ${certificate.issueDate}</p>
                <p>Certificate ID: <span class="id">${certificate.id}</span></p>
              </div>
            </div>
            <div class="no-print" style="margin-top: 20px; text-align: center;">
              <button onclick="window.print()">Print</button>
              <button onclick="window.close()">Close</button>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleLinkedInShare = () => {
    setIsLinkedInModalOpen(true);
  };

  const handleShareToLinkedIn = () => {
    // In a real app, this would use LinkedIn's API
    const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(certificate.course)}&organizationName=${encodeURIComponent(certificate.institution)}&issueYear=2025&issueMonth=12&certUrl=${encodeURIComponent(window.location.origin + '/verify/' + certificate.id)}`;
    window.open(linkedInUrl, '_blank');
    setIsLinkedInModalOpen(false);
  };

  const handleDownloadHistory = (cert) => {
    if (cert.status === 'completed') {
      const content = `
        CERTIFICATE OF COMPLETION
        
        Course: ${cert.course}
        Grade: ${cert.grade}
        Credits: ${cert.credits}
        Completed: ${cert.date}
        Certificate ID: ${cert.certificateId}
      `;
      
      const blob = new Blob([content], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Certificate_${cert.course.replace(/\s+/g, '_')}_${cert.certificateId}.pdf`;
      a.click();
    }
  };

  const handleCopyVerification = () => {
    navigator.clipboard.writeText(verificationCode);
    // Show toast (in real app)
    console.log('Verification code copied to clipboard');
  };

  const handleGenerateQrCode = () => {
    // In a real app, this would generate a QR code
    alert('QR code would be generated for verification');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center space-x-1">
          <CheckCircle size={14} />
          <span>Completed</span>
        </span>;
      case 'in-progress':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center space-x-1">
          <Clock size={14} />
          <span>In Progress</span>
        </span>;
      case 'upcoming':
        return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium flex items-center space-x-1">
          <Clock size={14} />
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
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Certificate Download</h1>
        <p className="text-primary-lighter">Download and share your course certificates</p>
      </div>

      {/* Current Certificate */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Current Certificate</h2>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center space-x-1">
              <Verified size={14} />
              <span>Verified</span>
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
                className="w-full border border-primary-dark text-primary-dark hover:bg-primary-lighter font-semibold py-3 rounded-lg flex items-center justify-center space-x-2"
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
              
              <button
                onClick={handlePrint}
                className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg flex items-center justify-center space-x-2"
              >
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
                    <p className="text-sm text-gray-500">Grade: {cert.grade} • {cert.credits}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {getStatusBadge(cert.status)}
                  
                  {cert.status === 'completed' ? (
                    <button 
                      onClick={() => handleDownloadHistory(cert)}
                      className="px-4 py-2 border border-primary-dark text-primary-dark hover:bg-primary-lighter rounded-lg text-sm flex items-center space-x-2"
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  ) : (
                    <button 
                      disabled 
                      className="px-4 py-2 border border-gray-300 text-gray-400 rounded-lg text-sm cursor-not-allowed flex items-center space-x-2"
                    >
                      {cert.status === 'in-progress' ? (
                        <>
                          <Clock size={14} />
                          <span>In Progress</span>
                        </>
                      ) : (
                        <>
                          <Clock size={14} />
                          <span>Upcoming</span>
                        </>
                      )}
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
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="text-green-600" size={24} />
              <h3 className="font-semibold text-gray-800">Verify Online</h3>
            </div>
            <p className="text-gray-600 mb-4">Employers can verify your certificate using the unique verification code</p>
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex-1 bg-white p-3 rounded border">
                <code className="text-gray-800 font-mono">{verificationCode}</code>
              </div>
              <button 
                onClick={handleCopyVerification}
                className="px-3 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                title="Copy verification code"
              >
                <Copy size={16} />
              </button>
            </div>
            <button 
              onClick={handleGenerateQrCode}
              className="w-full mt-2 px-4 py-2 border border-green-500 text-green-600 hover:bg-green-50 rounded-lg flex items-center justify-center space-x-2"
            >
              <QrCode size={16} />
              <span>Generate QR Code</span>
            </button>
          </div>
          
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Linkedin className="text-blue-600" size={24} />
              <h3 className="font-semibold text-gray-800">Add to LinkedIn</h3>
            </div>
            <p className="text-gray-600 mb-4">Showcase your achievement on your professional profile</p>
            <button 
              onClick={handleLinkedInShare}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2"
            >
              <ExternalLink size={20} />
              <span>Share to LinkedIn</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preview Certificate Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Certificate Preview</h3>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="border-2 border-gray-300 rounded-xl p-8 bg-gradient-to-br from-primary-lighter to-primary-lighter">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary-dark to-primary-light rounded-full flex items-center justify-center">
                  <Award className="text-white" size={40} />
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
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600">Instructor</p>
                    <p className="font-bold text-gray-800">{certificate.instructor}</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600">Institution</p>
                    <p className="font-bold text-gray-800">{certificate.institution}</p>
                  </div>
                </div>
                
                <div className="text-gray-600 text-sm">
                  <p>Issued on: {certificate.issueDate}</p>
                  <p>Certificate ID: {certificate.id}</p>
                  <p className="mt-2 text-green-600 font-medium">
                    <Verified size={14} className="inline mr-1" />
                    This certificate is digitally verified and tamper-proof
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-3 mt-6">
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white font-semibold rounded-lg flex items-center space-x-2"
              >
                <Download size={20} />
                <span>Download PDF</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg flex items-center space-x-2"
              >
                <Printer size={20} />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Certificate Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Share Certificate</h3>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-800">{certificate.course}</p>
                <p className="text-sm text-gray-600">Certificate ID: {certificate.id}</p>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={shareOptions.includeVerification}
                    onChange={(e) => setShareOptions(prev => ({ ...prev, includeVerification: e.target.checked }))}
                    className="rounded text-primary-dark"
                  />
                  <span className="ml-2 text-sm text-gray-700">Include verification link</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={shareOptions.includeExpiry}
                    onChange={(e) => setShareOptions(prev => ({ ...prev, includeExpiry: e.target.checked }))}
                    className="rounded text-primary-dark"
                  />
                  <span className="ml-2 text-sm text-gray-700">Include expiry information</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleShareCertificate('copy')}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-center space-x-2"
              >
                <Copy size={20} />
                <span>Copy Certificate Details</span>
              </button>
              
              <button
                onClick={() => handleShareCertificate('email')}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-center space-x-2"
              >
                <Mail size={20} />
                <span>Share via Email</span>
              </button>
              
              <button
                onClick={() => handleShareCertificate('link')}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-center space-x-2"
              >
                <LinkIcon size={20} />
                <span>Copy Verification Link</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Certificate Modal */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Print Certificate</h3>
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Print Settings</h4>
                <p className="text-sm text-gray-600">Configure your print preferences</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paper Size
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option>A4</option>
                    <option>Letter</option>
                    <option>Legal</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Orientation
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option>Portrait</option>
                    <option>Landscape</option>
                  </select>
                </div>
                
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-primary-dark" defaultChecked />
                  <span className="text-sm text-gray-700">Include border for framing</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleActualPrint}
                className="px-4 py-2 bg-primary-dark hover:bg-primary-light hover:text-primary-dark text-white rounded-lg flex items-center space-x-2"
              >
                <Printer size={16} />
                <span>Open Print Preview</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LinkedIn Share Modal */}
      {isLinkedInModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Add to LinkedIn</h3>
              <button
                onClick={() => setIsLinkedInModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-gray-800">Add to LinkedIn Profile</p>
                <p className="text-sm text-gray-600">This will open LinkedIn in a new window</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-700">Information to be added:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Course: {certificate.course}</li>
                  <li>Institution: {certificate.institution}</li>
                  <li>Issue Date: {certificate.issueDate}</li>
                  <li>Verification link included</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsLinkedInModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleShareToLinkedIn}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2"
              >
                <Linkedin size={16} />
                <span>Continue to LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}