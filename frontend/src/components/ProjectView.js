import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Film, 
  Download, 
  Play, 
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import axios from 'axios';

const ProjectView = ({ projects, onProjectUpdate }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  useEffect(() => {
    const currentProject = projects.find(p => p.project_id === projectId);
    setProject(currentProject);
  }, [projects, projectId]);

  const handleGenerateVideos = async () => {
    if (!project) return;

    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Start video generation
      await axios.post(`http://localhost:8000/generate-segments/${projectId}`);
      
      // Update project status
      const updatedProject = { ...project, status: 'generating' };
      setProject(updatedProject);
      onProjectUpdate(projectId, { status: 'generating' });

      // Simulate progress updates (in real app, this would be WebSocket or polling)
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsGenerating(false);
            const completedProject = { 
              ...updatedProject, 
              status: 'completed',
              final_video_url: `http://localhost:8000/videos/${projectId}_final.mp4`
            };
            setProject(completedProject);
            onProjectUpdate(projectId, { 
              status: 'completed',
              final_video_url: `http://localhost:8000/videos/${projectId}_final.mp4`
            });
            return 100;
          }
          return prev + 2;
        });
      }, 1000);

    } catch (error) {
      console.error('Error generating videos:', error);
      setIsGenerating(false);
    }
  };

  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getSegmentStatus = (segmentId) => {
    if (project?.status === 'completed') return 'completed';
    if (project?.status === 'generating') {
      const progressPerSegment = 100 / (project.segments?.length || 1);
      const segmentProgress = (segmentId - 1) * progressPerSegment;
      if (generationProgress > segmentProgress + progressPerSegment) return 'completed';
      if (generationProgress > segmentProgress) return 'generating';
    }
    return 'pending';
  };

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-4">The project you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{project.topic}</h1>
          <p className="text-gray-600">
            {formatDuration(project.total_duration)} • {project.segments?.length || 0} segments
          </p>
        </div>
        {project.status === 'completed' && project.final_video_url && (
          <button
            onClick={() => window.open(project.final_video_url, '_blank')}
            className="btn-primary flex items-center space-x-2"
          >
            <Play className="h-4 w-4" />
            <span>Watch Video</span>
          </button>
        )}
      </div>

      {/* Status Card */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {project.status === 'completed' && <CheckCircle className="h-6 w-6 text-green-500" />}
            {project.status === 'generating' && <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />}
            {project.status === 'script_ready' && <AlertCircle className="h-6 w-6 text-yellow-500" />}
            <div>
              <h3 className="font-semibold text-gray-900">
                {project.status === 'completed' && 'Video Complete'}
                {project.status === 'generating' && 'Generating Video'}
                {project.status === 'script_ready' && 'Ready to Generate'}
              </h3>
              {isGenerating && (
                <p className="text-sm text-gray-600">
                  Progress: {generationProgress.toFixed(0)}%
                </p>
              )}
            </div>
          </div>
          {project.status === 'script_ready' && (
            <button
              onClick={handleGenerateVideos}
              disabled={isGenerating}
              className="btn-primary flex items-center space-x-2"
            >
              <Film className="h-4 w-4" />
              <span>Generate Videos</span>
            </button>
          )}
        </div>
        {isGenerating && (
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Script Section */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="h-5 w-5 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Script</h2>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
            {project.script}
          </pre>
        </div>
      </div>

      {/* Segments Section */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <Film className="h-5 w-5 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Video Segments</h2>
        </div>
        <div className="space-y-4">
          {project.segments?.map((segment) => {
            const status = getSegmentStatus(segment.segment_id);
            return (
              <div key={segment.segment_id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      Segment {segment.segment_id}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({formatDuration(segment.duration)})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {status === 'generating' && <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />}
                    {status === 'pending' && <Clock className="h-4 w-4 text-gray-400" />}
                    <span className="text-xs text-gray-500 capitalize">{status}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{segment.prompt}</p>
                {segment.video_url && (
                  <div className="mt-2">
                    <button className="text-xs text-primary-600 hover:text-primary-700">
                      Preview Video
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectView;