import React from 'react';
import { AudioPlayer } from './components/AudioPlayer';
import { AnnotationList } from './components/AnnotationList';
import { AnnotationForm } from './components/AnnotationForm';
import { Headphones } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Headphones className="w-8 h-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              Audio Annotation System
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <AudioPlayer />
            <AnnotationList />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Add Annotation</h2>
              <AnnotationForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;