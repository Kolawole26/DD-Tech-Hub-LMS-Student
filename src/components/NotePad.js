'use client';

import { useState } from 'react';
import { Save, Notebook, Trash2, Plus } from 'lucide-react';

export default function NotePad({ notes, onUpdate }) {
  const [activeModule, setActiveModule] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');

  const modules = [
    { id: 1, label: 'Module 1', title: 'Introduction to Web' },
    { id: 2, label: 'Module 2', title: 'Deep Dive into CSS' },
    { id: 3, label: 'Module 3', title: 'Advanced JavaScript' },
  ];

  const handleSave = () => {
    if (!newNoteContent.trim()) return;
    
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      onUpdate(activeModule, newNoteContent);
      setIsSaving(false);
      setNewNoteContent('');
      // Show success message
      const event = new CustomEvent('showToast', {
        detail: { message: 'Note saved successfully!', type: 'success' }
      });
      window.dispatchEvent(event);
    }, 500);
  };

  const handleClear = () => {
    setNewNoteContent('');
  };

  const currentNote = notes[`module${activeModule}`] || '';

  return (
    <div>
      {/* Module Tabs */}
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => setActiveModule(module.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeModule === module.id
                ? 'bg-primary-light text-primary-dark'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {module.label}
          </button>
        ))}
      </div>

      {/* Current Module Info */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Notebook size={16} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            {modules.find(m => m.id === activeModule)?.title}
          </span>
        </div>
      </div>

      {/* Existing Note Preview */}
      {currentNote && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-yellow-800">Existing Note</span>
            <button
              onClick={() => setNewNoteContent(currentNote)}
              className="text-xs text-yellow-700 hover:text-yellow-900"
            >
              Edit
            </button>
          </div>
          <p className="text-sm text-yellow-700 line-clamp-3">{currentNote}</p>
        </div>
      )}

      {/* Textarea */}
      <div className="relative mb-4">
        <textarea
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          placeholder="Start typing your notes here... (You can add bullet points, code snippets, or key takeaways)"
          className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-500">
          {newNoteContent.length}/1000 characters
        </div>
      </div>

      {/* Formatting Tips */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>Tip:</strong> 
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={handleSave}
          disabled={isSaving || !newNoteContent.trim()}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
            isSaving || !newNoteContent.trim()
              ? 'bg-primary-dark hover:bg-primary-light cursor-not-allowed'
              : 'bg-primary hover:bg-primary-light'
          } text-white`}
        >
          <Save size={20} />
          <span>{isSaving ? 'Saving...' : 'Save Note'}</span>
        </button>
        
        <button
          onClick={handleClear}
          disabled={!newNoteContent.trim()}
          className={`px-4 py-3 rounded-lg font-medium transition-colors ${
            !newNoteContent.trim()
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Trash2 size={20} />
        </button>
        
        <button
          onClick={() => setNewNoteContent(newNoteContent + '\n• ')}
          className="px-4 py-3 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* All Notes Link */}
      <div className="mt-4 pt-4 border-t">
        <button className="w-full text-center text-primary-dark hover:text-primary font-medium text-sm">
          View All Module Notes →
        </button>
      </div>
    </div>
  );
}