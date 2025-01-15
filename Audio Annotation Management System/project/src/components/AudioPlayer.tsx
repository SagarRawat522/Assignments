import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useStore } from '../store/useStore';

export const AudioPlayer: React.FC = () => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const { currentProject, isPlaying, setIsPlaying, setCurrentTime } = useStore();

  useEffect(() => {
    if (waveformRef.current && currentProject) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4F46E5',
        progressColor: '#818CF8',
        cursorColor: '#C7D2FE',
        barWidth: 2,
        barRadius: 3,
        responsive: true,
        height: 100,
      });

      wavesurfer.current.load(currentProject.audioUrl);
      
      wavesurfer.current.on('audioprocess', (time) => {
        setCurrentTime(time);
      });

      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, [currentProject]);

  const handlePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const skipForward = () => {
    if (wavesurfer.current) {
      const currentTime = wavesurfer.current.getCurrentTime();
      wavesurfer.current.seekTo((currentTime + 5) / wavesurfer.current.getDuration());
    }
  };

  const skipBackward = () => {
    if (wavesurfer.current) {
      const currentTime = wavesurfer.current.getCurrentTime();
      wavesurfer.current.seekTo((currentTime - 5) / wavesurfer.current.getDuration());
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div ref={waveformRef} className="mb-4" />
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={skipBackward}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <SkipBack className="w-6 h-6" />
        </button>
        <button
          onClick={handlePlayPause}
          className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={skipForward}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <SkipForward className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};