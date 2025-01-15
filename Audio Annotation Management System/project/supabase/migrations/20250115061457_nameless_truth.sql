/*
  # Initial Schema Setup for Audio Annotation System

  1. New Tables
    - projects
      - id (uuid, primary key)
      - name (text)
      - audio_url (text)
      - progress (integer)
      - created_at (timestamp)
      - updated_at (timestamp)
      - user_id (uuid, foreign key)
    
    - annotations
      - id (uuid, primary key)
      - project_id (uuid, foreign key)
      - start_time (float)
      - end_time (float)
      - text (text)
      - labels (text[])
      - user_id (uuid, foreign key)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create projects table
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  audio_url text NOT NULL,
  progress integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL
);

-- Create annotations table
CREATE TABLE annotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  start_time float NOT NULL,
  end_time float NOT NULL,
  text text NOT NULL,
  labels text[] DEFAULT '{}',
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE annotations ENABLE ROW LEVEL SECURITY;

-- Create policies for projects
CREATE POLICY "Users can view their own projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for annotations
CREATE POLICY "Users can view annotations for their projects"
  ON annotations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = annotations.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create annotations for their projects"
  ON annotations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own annotations"
  ON annotations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own annotations"
  ON annotations
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);