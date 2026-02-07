// components/CourseMaterials.js
import { FileText, FileDown, ExternalLink } from 'lucide-react';

export default function CourseMaterials({ 
  materials, 
  onDownloadMaterial,
  onViewAllMaterials 
}) {
  // Helper function to get file icon based on type
  const getFileIcon = (type) => {
    const typeLower = type.toLowerCase();
    if (typeLower.includes('pdf')) return '📄';
    if (typeLower.includes('image')) return '🖼️';
    if (typeLower.includes('csv') || typeLower.includes('excel')) return '📊';
    if (typeLower.includes('ppt') || typeLower.includes('presentation')) return '📽️';
    if (typeLower.includes('doc') || typeLower.includes('word')) return '📝';
    if (typeLower.includes('zip') || typeLower.includes('compressed')) return '📦';
    return '📎';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Course Materials</h3>
        {onViewAllMaterials && (
          <button
            onClick={onViewAllMaterials}
            className="px-4 py-2 text-primary-dark hover:text-primary-light text-sm font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <ExternalLink size={14} />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {materials.map((material) => (
          <div key={material.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary-dark transition-colors hover:shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                {getFileIcon(material.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 truncate">{material.title}</h4>
                <p className="text-sm text-gray-600">
                  {material.type} • {material.size}
                </p>
                {material.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{material.description}</p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => onDownloadMaterial(material)}
                  className="px-3 py-1.5 border border-primary-dark text-primary-dark hover:bg-primary-lighter rounded-lg flex items-center justify-center space-x-1"
                  title="Download"
                >
                  <FileDown size={14} />
                  <span className="text-xs">Download</span>
                </button>
                {/* {material.src && (
                  <a
                    href={material.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-center space-x-1 text-xs"
                    title="Open in new tab"
                  >
                    <ExternalLink size={14} />
                    <span>Open</span>
                  </a>
                )} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}