import { create } from 'zustand';
import { Annotation, Project } from '../types';

interface Store {
  currentProject: Project | null;
  annotations: Annotation[];
  currentTime: number;
  isPlaying: boolean;
  setCurrentProject: (project: Project) => void;
  addAnnotation: (annotation: Annotation) => void;
  updateAnnotation: (id: string, annotation: Partial<Annotation>) => void;
  deleteAnnotation: (id: string) => void;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  currentProject: null,
  annotations: [],
  currentTime: 0,
  isPlaying: false,
  setCurrentProject: (project) => set({ currentProject: project }),
  addAnnotation: (annotation) =>
    set((state) => ({ annotations: [...state.annotations, annotation] })),
  updateAnnotation: (id, annotation) =>
    set((state) => ({
      annotations: state.annotations.map((a) =>
        a.id === id ? { ...a, ...annotation } : a
      ),
    })),
  deleteAnnotation: (id) =>
    set((state) => ({
      annotations: state.annotations.filter((a) => a.id !== id),
    })),
  setCurrentTime: (time) => set({ currentTime: time }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
}));