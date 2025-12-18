'use client';

import { useState } from 'react';
import { TrendingUp, BarChart3, Award, Target, CheckCircle } from 'lucide-react';

export default function GradesContent() {
  const [selectedModule, setSelectedModule] = useState('all');

  const modules = [
    { id: 'all', name: 'All Modules' },
    { id: 'module1', name: 'Module 1: Introduction to Web' },
    { id: 'module2', name: 'Module 2: Deep Dive into CSS' },
    { id: 'module3', name: 'Module 3: Advanced JavaScript' },
  ];

  const assessments = [
    { id: 1, name: 'Quiz 1: HTML Basics', module: 'Module 1', score: 95, maxScore: 100, weight: 10, date: 'Nov 10, 2025' },
    { id: 2, name: 'Assignment 1: Portfolio Website', module: 'Module 1', score: 92, maxScore: 100, weight: 20, date: 'Nov 15, 2025' },
    { id: 3, name: 'Quiz 2: CSS Fundamentals', module: 'Module 2', score: 88, maxScore: 100, weight: 10, date: 'Nov 20, 2025' },
    { id: 4, name: 'Assignment 2: Responsive Layout', module: 'Module 2', score: 96, maxScore: 100, weight: 20, date: 'Nov 25, 2025' },
    { id: 5, name: 'Quiz 3: JavaScript Basics', module: 'Module 3', score: 90, maxScore: 100, weight: 10, date: 'Dec 1, 2025' },
    { id: 6, name: 'Midterm Project', module: 'Module 3', score: 89, maxScore: 100, weight: 30, date: 'Dec 10, 2025' },
  ];

  const filteredAssessments = selectedModule === 'all' 
    ? assessments 
    : assessments.filter(a => a.module === selectedModule.replace('module', 'Module '));

  const overallGrade = 91.2;
  const rank = 'Top 15%';

  const calculateModuleGrade = (moduleId) => {
    const moduleAssessments = assessments.filter(a => a.module === moduleId.replace('module', 'Module '));
    if (moduleAssessments.length === 0) return 0;
    
    const weightedSum = moduleAssessments.reduce((sum, a) => sum + (a.score * a.weight), 0);
    const totalWeight = moduleAssessments.reduce((sum, a) => sum + a.weight, 0);
    return weightedSum / totalWeight;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-dark to-primary-light rounded-2xl p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Grade Monitoring</h1>
        <p className="text-primary-lighter">Track your academic performance and progress</p>
      </div>

      {/* Overall Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{overallGrade.toFixed(1)}%</span>
          </div>
          <h3 className="text-gray-600">Overall Grade</h3>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${overallGrade}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart3 className="text-green-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{rank}</span>
          </div>
          <h3 className="text-gray-600">Class Rank</h3>
          <p className="text-sm text-gray-500 mt-1">Out of 150 students</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="text-purple-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">A-</span>
          </div>
          <h3 className="text-gray-600">Letter Grade</h3>
          <p className="text-sm text-gray-500 mt-1">Excellent Performance</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Target className="text-yellow-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">75.2%</span>
          </div>
          <h3 className="text-gray-600">Course Progress</h3>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: '75.2%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Module Selector */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Filter by Module</h2>
        <div className="flex flex-wrap gap-3">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => setSelectedModule(module.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedModule === module.id
                  ? 'bg-primary-dark text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {module.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Assessment Grades</h2>
          <button className="px-4 py-2 border border-primary-dark text-primary-dark hover:bg-primary-lighter hover:bg-blue-50 rounded-lg font-medium">
            Download Report
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Assessment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Module</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Score</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Weight</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Grade</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssessments.map((assessment) => (
                <tr key={assessment.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        assessment.score >= 90 ? 'bg-green-100' :
                        assessment.score >= 80 ? 'bg-blue-100' :
                        assessment.score >= 70 ? 'bg-yellow-100' : 'bg-red-100'
                      }`}>
                        <CheckCircle className={
                          assessment.score >= 90 ? 'text-green-600' :
                          assessment.score >= 80 ? 'text-blue-600' :
                          assessment.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                        } size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{assessment.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {assessment.module}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{assessment.date}</td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-gray-800">
                      {assessment.score}/{assessment.maxScore}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-700">{assessment.weight}%</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-bold ${
                      assessment.score >= 90 ? 'text-green-600' :
                      assessment.score >= 80 ? 'text-blue-600' :
                      assessment.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {assessment.score}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      assessment.score >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {assessment.score >= 70 ? 'Passed' : 'Failed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Module Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.slice(1).map((module) => {
          const grade = calculateModuleGrade(module.id);
          return (
            <div key={module.id} className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">{module.name}</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Module Grade</span>
                  <span className="text-2xl font-bold text-gray-800">{grade.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      grade >= 90 ? 'bg-green-500' :
                      grade >= 80 ? 'bg-blue-500' :
                      grade >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${grade}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Assessments Completed</span>
                  <span className="font-medium">2/3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Score</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Module Progress</span>
                  <span className="font-medium">
                    {module.id === 'module1' ? '100%' :
                     module.id === 'module2' ? '100%' : '80%'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}