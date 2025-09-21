import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import VideoCreator from './components/VideoCreator';
import ProjectDashboard from './components/ProjectDashboard';
import ProjectView from './components/ProjectView';
import './index.css';

function App() {
  const [projects, setProjects] = useState([]);

  const addProject = (project) => {
    setProjects(prev => [...prev, project]);
  };

  const updateProject = (projectId, updates) => {
    setProjects(prev => 
      prev.map(project => 
        project.project_id === projectId 
          ? { ...project, ...updates }
          : project
      )
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="space-y-8">
                  <VideoCreator onProjectCreated={addProject} />
                  <ProjectDashboard 
                    projects={projects} 
                    onProjectUpdate={updateProject}
                  />
                </div>
              } 
            />
            <Route 
              path="/project/:projectId" 
              element={
                <ProjectView 
                  projects={projects}
                  onProjectUpdate={updateProject}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;