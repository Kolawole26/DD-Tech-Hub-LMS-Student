'use client';

export default function ProgressBar({ progress, showLabel = true, size = 'medium' }) {
  const height = size === 'small' ? 'h-2' : size === 'large' ? 'h-4' : 'h-3';
  
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${height}`}>
        <div 
          className={`${height} rounded-full transition-all duration-500 ease-out ${
            progress >= 90 ? 'bg-green-500' :
            progress >= 70 ? 'bg-primary-dark' :
            progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {showLabel && progress < 100 && (
        <div className="text-xs text-gray-500 mt-1 text-right">
          {100 - progress}% remaining
        </div>
      )}
    </div>
  );
}