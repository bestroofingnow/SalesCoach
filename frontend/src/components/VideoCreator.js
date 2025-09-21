import React, { useState } from 'react';
import { Play, Clock, Palette, MessageSquare, Loader2 } from 'lucide-react';
import axios from 'axios';

const VideoCreator = ({ onProjectCreated }) => {
  const [formData, setFormData] = useState({
    topic: '',
    duration: 30,
    style: 'cinematic',
    tone: 'professional'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/create-video', formData);
      onProjectCreated(response.data);
      
      // Reset form
      setFormData({
        topic: '',
        duration: 30,
        style: 'cinematic',
        tone: 'professional'
      });
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create video project');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="flex items-center space-x-2 mb-6">
        <Play className="h-6 w-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">Create New Video</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Topic Input */}
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
            Video Topic
          </label>
          <textarea
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            placeholder="Describe what you want your video to be about..."
            className="input-field h-24 resize-none"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Be as detailed as possible. This will help AI create a better script.
          </p>
        </div>

        {/* Duration Selector */}
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="inline h-4 w-4 mr-1" />
            Video Duration
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              id="duration"
              name="duration"
              min="15"
              max="300"
              step="15"
              value={formData.duration}
              onChange={handleInputChange}
              className="flex-1"
            />
            <span className="text-sm font-medium text-gray-700 min-w-0">
              {formData.duration} seconds
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>15s</span>
            <span>5 minutes</span>
          </div>
        </div>

        {/* Style Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Palette className="inline h-4 w-4 mr-1" />
            Visual Style
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['cinematic', 'documentary', 'animated', 'corporate'].map((style) => (
              <label key={style} className="cursor-pointer">
                <input
                  type="radio"
                  name="style"
                  value={style}
                  checked={formData.style === style}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`p-3 text-center rounded-lg border-2 transition-all ${
                  formData.style === style
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <span className="text-sm font-medium capitalize">{style}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Tone Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="inline h-4 w-4 mr-1" />
            Tone
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['professional', 'casual', 'educational', 'entertaining'].map((tone) => (
              <label key={tone} className="cursor-pointer">
                <input
                  type="radio"
                  name="tone"
                  value={tone}
                  checked={formData.tone === tone}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`p-3 text-center rounded-lg border-2 transition-all ${
                  formData.tone === tone
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <span className="text-sm font-medium capitalize">{tone}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !formData.topic.trim()}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Creating Video Project...</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              <span>Create Video</span>
            </>
          )}
        </button>
      </form>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">How it works:</h3>
        <ol className="text-xs text-blue-800 space-y-1">
          <li>1. OpenAI creates a detailed script based on your topic</li>
          <li>2. Script is broken into 7-second segments with visual prompts</li>
          <li>3. Google Veo 3 generates video for each segment</li>
          <li>4. Segments are stitched together into your final video</li>
        </ol>
      </div>
    </div>
  );
};

export default VideoCreator;