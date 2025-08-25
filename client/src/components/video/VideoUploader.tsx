import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, Video, CheckCircle, X } from "lucide-react";

interface VideoUploaderProps {
  onVideoUploaded: (videoUrl: string, videoId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  lessonId?: string;
}

export function VideoUploader({ onVideoUploaded, isOpen, onClose, lessonId }: VideoUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/ogg', 'video/avi'];
      if (!file.type.startsWith('video/') && !validTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please select a valid video file (MP4, WebM, MOV, AVI, etc.)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 500MB)
      if (file.size > 500 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Video must be smaller than 500MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Get upload URL
      const uploadResponse = await fetch('/api/videos/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadURL } = await uploadResponse.json();

      // Upload file directly to cloud storage
      const xhr = new XMLHttpRequest();
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      };

      await new Promise<void>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 201) {
            resolve();
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        };

        xhr.onerror = () => reject(new Error('Upload failed'));

        xhr.open('PUT', uploadURL);
        xhr.setRequestHeader('Content-Type', selectedFile.type);
        xhr.send(selectedFile);
      });

      // Extract video ID from upload URL
      const videoId = uploadURL.split('/').pop()?.split('?')[0] || '';
      const videoPath = `/videos/${videoId}`;

      // Notify parent component
      onVideoUploaded(videoPath, videoId);

      toast({
        title: "Upload Successful",
        description: "Your video has been uploaded successfully",
      });

      // Reset state
      setSelectedFile(null);
      setUploadProgress(0);
      onClose();

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your video",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Video className="mr-2 h-5 w-5" />
            Upload Training Video
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!selectedFile ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Video className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select Video File</h3>
              <p className="text-sm text-gray-500 mb-4">
                Choose a video file to upload (MP4, WebM, MOV, AVI, etc.)
              </p>
              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/*"
                onChange={handleFileSelect}
                className="hidden"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                <Upload className="mr-2 h-4 w-4" />
                Choose Video
              </label>
              <p className="text-xs text-gray-400 mt-2">Maximum file size: 500MB</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Video className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Uploading...</span>
                    <span className="text-sm text-gray-600">{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={onClose} disabled={uploading}>
                  Cancel
                </Button>
                <Button onClick={handleUpload} disabled={uploading}>
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Video
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}