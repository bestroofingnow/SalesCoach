import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Upload, Video } from "lucide-react";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { VideoUploader } from "@/components/video/VideoUploader";
import { LessonNotes } from "@/components/notes/lesson-notes";

interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  orderIndex: number;
  estimatedMinutes?: number;
}

interface LessonContentProps {
  lesson: Lesson;
  isAdmin?: boolean;
  moduleId?: string;
}

export default function LessonContent({ lesson, isAdmin = false, moduleId }: LessonContentProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showVideoUploader, setShowVideoUploader] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get current user to check admin status
  const { data: user } = useQuery({
    queryKey: ['/api/auth/user'],
    retry: false
  });

  const isUserAdmin = (user as any)?.role === 'admin';

  const updateVideoMutation = useMutation({
    mutationFn: async ({ videoUrl }: { videoUrl: string }) => {
      await apiRequest('PUT', `/api/lessons/${lesson.id}/video`, {
        videoUrl
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${lesson.id}`] });
      queryClient.invalidateQueries({ queryKey: ['/api/modules'] });
      toast({
        title: "Video Updated!",
        description: "The lesson video has been updated successfully.",
      });
      setShowVideoUploader(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update lesson video. Please try again.",
        variant: "destructive",
      });
    },
  });

  const markCompleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('POST', '/api/progress/lesson', {
        lessonId: lesson.id,
      });
    },
    onSuccess: () => {
      setIsCompleted(true);
      queryClient.invalidateQueries({ queryKey: ['/api/users/progress'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
      toast({
        title: "Lesson Completed!",
        description: "Your progress has been saved.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to mark lesson as complete. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-6">
      {/* Video Section */}
      {lesson.videoUrl ? (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Video className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">Training Video</h3>
              </div>
              {isUserAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowVideoUploader(true)}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Replace Video
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <VideoPlayer
              videoUrl={lesson.videoUrl.startsWith('/videos/') 
                ? `/api${lesson.videoUrl}` 
                : lesson.videoUrl}
              title={lesson.title}
              onComplete={() => {
                if (!isCompleted) {
                  markCompleteMutation.mutate();
                }
              }}
            />
          </CardContent>
        </Card>
      ) : isUserAdmin ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-8 text-center">
            <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Video Added</h3>
            <p className="text-sm text-gray-500 mb-4">
              Upload a training video for this lesson to enhance the learning experience.
            </p>
            <Button onClick={() => setShowVideoUploader(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Add Video
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {/* Content Section */}
      <Card>
        <CardContent className="p-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg [&_.bg-blue-50]:bg-blue-50 [&_.bg-blue-50]:p-6 [&_.bg-blue-50]:rounded-lg [&_.bg-blue-50]:mb-6 [&_.bg-green-50]:bg-green-50 [&_.bg-green-50]:p-6 [&_.bg-green-50]:rounded-lg [&_.bg-green-50]:mb-6 [&_.bg-orange-50]:bg-orange-50 [&_.bg-orange-50]:p-6 [&_.bg-orange-50]:rounded-lg [&_.bg-orange-50]:mb-6 [&_.bg-purple-50]:bg-purple-50 [&_.bg-purple-50]:p-6 [&_.bg-purple-50]:rounded-lg [&_.bg-purple-50]:mb-6 [&_.bg-yellow-50]:bg-yellow-50 [&_.bg-yellow-50]:p-6 [&_.bg-yellow-50]:rounded-lg [&_.bg-yellow-50]:mb-6 [&_.bg-red-50]:bg-red-50 [&_.bg-red-50]:p-6 [&_.bg-red-50]:rounded-lg [&_.bg-red-50]:mb-6 [&_.bg-gray-50]:bg-gray-50 [&_.bg-gray-50]:p-6 [&_.bg-gray-50]:rounded-lg [&_.bg-gray-50]:mb-6 [&_.bg-white]:bg-white [&_.bg-white]:p-4 [&_.bg-white]:rounded [&_.bg-white]:shadow-sm [&_.grid]:grid [&_.grid]:gap-6 [&_.grid]:mb-6"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        </CardContent>
      </Card>

      {/* Completion Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Mark as Complete</h3>
              <p className="text-sm text-gray-600">
                Click here when you've finished reviewing this lesson content.
              </p>
            </div>
            <Button
              onClick={() => markCompleteMutation.mutate()}
              disabled={markCompleteMutation.isPending || isCompleted}
              className={`${
                isCompleted 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {markCompleteMutation.isPending 
                ? 'Saving...' 
                : isCompleted 
                  ? 'Completed ✓' 
                  : 'Mark Complete'
              }
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notes Section */}
      <LessonNotes lessonId={lesson.id} moduleId={moduleId} />

      {/* Video Uploader Modal */}
      <VideoUploader
        isOpen={showVideoUploader}
        onClose={() => setShowVideoUploader(false)}
        onVideoUploaded={(videoUrl) => {
          updateVideoMutation.mutate({ videoUrl });
        }}
        lessonId={lesson.id}
      />
    </div>
  );
}
