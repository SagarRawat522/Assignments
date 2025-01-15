import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus } from 'lucide-react';

export const AnnotationForm: React.FC = () => {
  const { currentTime, addAnnotation } = useStore();
  const [text, setText] = useState('');
  const [labels, setLabels] = useState<string[]>([]);
  const [newLabel, setNewLabel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;

    addAnnotation({
      id: crypto.randomUUID(),
      start: currentTime,
      end: currentTime + 5,
      text,
      labels,
      userId: 'current-user', // Replace with actual user ID
      createdAt: new Date().toISOString(),
    });

    setText('');
    setLabels([]);
  };

  const addLabel = () => {
    if (newLabel && !labels.includes(newLabel)) {
      setLabels([...labels, newLabel]);
      setNewLabel('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Annotation Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Labels</label>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Add a label"
          />
          <button
            type="button"
            onClick={addLabel}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {labels.map((label) => (
            <span
              key={label}
              className="px-2 py-1 text-sm rounded-full bg-indigo-100 text-indigo-800"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Annotation
      </button>
    </form>
  );
};