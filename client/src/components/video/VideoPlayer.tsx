import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  onProgress?: (currentTime: number, duration: number) => void;
  onComplete?: () => void;
}

export function VideoPlayer({ videoUrl, title, onProgress, onComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      
      if (onProgress) {
        onProgress(current, total);
      }

      // Mark as complete when 90% watched
      if (current / total >= 0.9 && onComplete) {
        onComplete();
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleError = () => {
    setError("Failed to load video. Please check the video file.");
    setIsLoading(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      videoRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (error) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <div className="text-red-500 mb-2">⚠️</div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div 
      className="relative bg-black rounded-lg overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
      
      <video
        ref={videoRef}
        className="w-full h-auto max-h-[500px]"
        src={videoUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        poster="/api/placeholder-video-thumbnail"
      >
        Your browser does not support the video tag.
      </video>

      {/* Video Controls */}
      <div className={`absolute inset-0 transition-opacity duration-200 ${showControls || isLoading ? 'opacity-100' : 'opacity-0'}`}>
        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="lg"
            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full w-16 h-16"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
          </Button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          {/* Progress Bar */}
          <div 
            className="w-full h-2 bg-white bg-opacity-30 rounded-full mb-4 cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white hover:bg-opacity-20"
                onClick={() => skip(-10)}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white hover:bg-opacity-20"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white hover:bg-opacity-20"
                onClick={() => skip(10)}
              >
                <SkipForward className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white hover:bg-opacity-20"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white hover:bg-opacity-20"
              onClick={toggleFullscreen}
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}