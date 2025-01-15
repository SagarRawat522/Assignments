export interface Annotation {
  id: string;
  start: number;
  end: number;
  text: string;
  labels: string[];
  userId: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  audioUrl: string;
  annotations: Annotation[];
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}