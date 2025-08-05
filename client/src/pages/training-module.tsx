import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import LessonContent from "@/components/training/lesson-content";
import AIHints from "@/components/ai-hints";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  orderIndex: number;
  estimatedMinutes?: number;
}

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  totalLessons: number;
}

export default function TrainingModule() {
  const params = useParams();
  const moduleId = params.moduleId;
  const lessonId = params.lessonId;
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const { data: module } = useQuery<TrainingModule>({
    queryKey: [`/api/modules/${moduleId}`],
    enabled: !!moduleId,
  });

  const { data: lessons = [] } = useQuery<Lesson[]>({
    queryKey: [`/api/modules/${moduleId}/lessons`],
    enabled: !!moduleId,
  });

  const { data: currentLesson } = useQuery<Lesson>({
    queryKey: [`/api/lessons/${lessonId}`],
    enabled: !!lessonId,
  });

  // Use either specific lesson or lesson from module
  const activeLesson = currentLesson || lessons[currentLessonIndex];
  const totalLessons = lessons.length;
  const progress = totalLessons > 0 ? ((currentLessonIndex + 1) / totalLessons) * 100 : 0;

  const goToNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  if (!activeLesson) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
                <i className="fas fa-book text-white text-2xl"></i>
              </div>
              <p className="text-gray-600">Loading lesson content...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Module Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                <span>{module?.title}</span>
                <i className="fas fa-chevron-right text-xs"></i>
                <span>Lesson {currentLessonIndex + 1} of {totalLessons}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {activeLesson.title}
              </h1>
              {activeLesson.estimatedMinutes && (
                <p className="text-gray-600">
                  <i className="fas fa-clock mr-2"></i>
                  Estimated time: {activeLesson.estimatedMinutes} minutes
                </p>
              )}
            </div>

            {/* Progress Bar */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">Module Progress</span>
                  <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>

            {/* Lesson Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <LessonContent lesson={activeLesson} />
                
                {/* AI Hints Component */}
                <AIHints 
                  moduleTitle={module?.title || ''}
                  lessonTitle={activeLesson.title}
                  lessonContent={activeLesson.content}
                />
                
                {/* Navigation */}
                <div className="flex items-center justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={goToPreviousLesson}
                    disabled={currentLessonIndex === 0}
                    className="flex items-center space-x-2"
                  >
                    <i className="fas fa-chevron-left"></i>
                    <span>Previous</span>
                  </Button>
                  
                  <Button
                    onClick={goToNextLesson}
                    disabled={currentLessonIndex >= lessons.length - 1}
                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600"
                  >
                    <span>Next Lesson</span>
                    <i className="fas fa-chevron-right"></i>
                  </Button>
                </div>
              </div>

              {/* Lesson List Sidebar */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Lessons</h3>
                    <div className="space-y-2">
                      {lessons.map((lesson, index) => (
                        <button
                          key={lesson.id}
                          onClick={() => setCurrentLessonIndex(index)}
                          className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                            index === currentLessonIndex
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              index === currentLessonIndex
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {index + 1}
                            </div>
                            <span className="font-medium">{lesson.title}</span>
                          </div>
                          {lesson.estimatedMinutes && (
                            <p className="text-xs text-gray-500 mt-1 ml-9">
                              {lesson.estimatedMinutes} min
                            </p>
                          )}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
