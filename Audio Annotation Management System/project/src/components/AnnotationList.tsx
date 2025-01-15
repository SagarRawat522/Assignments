import React from 'react';
import { useStore } from '../store/useStore';
import { Edit, Trash2 } from 'lucide-react';

export const AnnotationList: React.FC = () => {
  const { annotations, deleteAnnotation } = useStore();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Annotations</h2>
      <div className="space-y-2">
        {annotations.map((annotation) => (
          <div
            key={annotation.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-500">
                  {formatTime(annotation.start)} - {formatTime(annotation.end)}
                </div>
                <p className="mt-1">{annotation.text}</p>
                <div className="flex gap-2 mt-2">
                  {annotation.labels.map((label) => (
                    <span
                      key={label}
                      className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1 hover:text-indigo-600">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteAnnotation(annotation.id)}
                  className="p-1 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};