import React from 'react';
import { Folder, Clock, Film, CheckCircle, AlertCircle, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectDashboard = ({ projects, onProjectUpdate }) => {
  const navigate = useNavigate();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'generating':
        return <Film className="h-5 w-5 text-blue-500 animate-pulse" />;
      case 'script_ready':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Video Ready';
      case 'generating':
        return 'Generating Video';
      case 'script_ready':
        return 'Script Ready';
      default:
        return 'Processing';
    }
  };

  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  if (projects.length === 0) {
    return (
      <div className="card max-w-2xl mx-auto text-center">
        <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Yet</h3>
        <p className="text-gray-600">
          Create your first video project above to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-2 mb-6">
        <Folder className="h-6 w-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
          {projects.length}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.project_id}
            onClick={() => handleProjectClick(project.project_id)}
            className="card hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                {getStatusIcon(project.status)}
                <span className="text-sm font-medium text-gray-600">
                  {getStatusText(project.status)}
                </span>
              </div>
              <Play className="h-4 w-4 text-gray-400" />
            </div>

            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              {project.topic}
            </h3>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Duration:</span>
                <span className="font-medium">
                  {formatDuration(project.total_duration)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Segments:</span>
                <span className="font-medium">
                  {project.segments?.length || 0}
                </span>
              </div>
            </div>

            {project.status === 'script_ready' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle generate videos action
                }}
                className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white text-sm py-2 px-3 rounded-md transition-colors"
              >
                Generate Videos
              </button>
            )}

            {project.status === 'completed' && project.final_video_url && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.final_video_url, '_blank');
                }}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-3 rounded-md transition-colors"
              >
                Watch Video
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDashboard;