import { useState } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { apiRequest } from "@/lib/queryClient";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  passed: boolean;
  results: Array<{
    questionId: string;
    correct: boolean;
    selectedAnswer: number;
    correctAnswer: number;
  }>;
}

export default function Quiz() {
  const params = useParams();
  const { type, id } = params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: questions = [], isLoading } = useQuery<QuizQuestion[]>({
    queryKey: [`/api/quiz/${type}/${id}`],
    enabled: !!(type && id),
  });

  const submitQuizMutation = useMutation({
    mutationFn: async (responses: Array<{ questionId: string; selectedAnswer: number }>) => {
      const response = await apiRequest('POST', '/api/quiz/submit', {
        responses,
        quizType: type,
        quizId: id,
      });
      return response.json();
    },
    onSuccess: (result: QuizResult) => {
      setQuizResult(result);
      setQuizSubmitted(true);
      
      // Invalidate related queries to update progress
      queryClient.invalidateQueries({ queryKey: ['/api/users/progress'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
      
      toast({
        title: result.passed ? "Quiz Passed!" : "Quiz Complete",
        description: `You scored ${result.score} out of ${result.totalQuestions} questions correctly.`,
        variant: result.passed ? "default" : "destructive",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    },
  });

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const handleAnswerSelect = (answerIndex: number) => {
    if (currentQuestion) {
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: answerIndex
      }));
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    const responses = questions.map(question => ({
      questionId: question.id,
      selectedAnswer: selectedAnswers[question.id] ?? -1
    }));

    const unansweredCount = responses.filter(r => r.selectedAnswer === -1).length;
    
    if (unansweredCount > 0) {
      toast({
        title: "Incomplete Quiz",
        description: `Please answer all questions before submitting. ${unansweredCount} questions remaining.`,
        variant: "destructive",
      });
      return;
    }

    submitQuizMutation.mutate(responses);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
                <i className="fas fa-clipboard-check text-white text-2xl"></i>
              </div>
              <p className="text-gray-600">Loading quiz questions...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (quizSubmitted && quizResult) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <div className="p-8">
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    quizResult.passed ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <i className={`text-3xl ${
                      quizResult.passed ? 'fas fa-check text-green-500' : 'fas fa-times text-red-500'
                    }`}></i>
                  </div>
                  
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {quizResult.passed ? 'Congratulations!' : 'Quiz Complete'}
                  </h1>
                  
                  <p className="text-gray-600 mb-6">
                    You scored {quizResult.score} out of {quizResult.totalQuestions} questions correctly.
                  </p>
                  
                  <div className="mb-8">
                    <div className={`text-4xl font-bold mb-2 ${
                      quizResult.passed ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {Math.round((quizResult.score / quizResult.totalQuestions) * 100)}%
                    </div>
                    <div className="text-sm text-gray-500">
                      {quizResult.passed ? 'Passing Grade' : 'Minimum 80% required to pass'}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button
                      onClick={() => window.history.back()}
                      className="w-full bg-blue-500 hover:bg-blue-600"
                    >
                      Continue Training
                    </Button>
                    
                    {!quizResult.passed && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCurrentQuestionIndex(0);
                          setSelectedAnswers({});
                          setQuizSubmitted(false);
                          setQuizResult(null);
                        }}
                        className="w-full"
                      >
                        Retake Quiz
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-gray-600 text-2xl"></i>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No Quiz Available</h2>
              <p className="text-gray-600">There are no quiz questions available for this content.</p>
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
            {/* Quiz Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Knowledge Check</h1>
              <div className="flex items-center space-x-2">
                <Progress value={progress} className="flex-1 h-2" />
                <span className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
            </div>

            {/* Quiz Content */}
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  {currentQuestion.question}
                </h2>
                
                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAnswers[currentQuestion.id] === index
                          ? 'border-blue-300 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        checked={selectedAnswers[currentQuestion.id] === index}
                        onChange={() => handleAnswerSelect(index)}
                        className="mt-1"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={goToPreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  
                  {currentQuestionIndex === questions.length - 1 ? (
                    <Button
                      onClick={handleSubmitQuiz}
                      disabled={submitQuizMutation.isPending}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      {submitQuizMutation.isPending ? 'Submitting...' : 'Submit Quiz'}
                    </Button>
                  ) : (
                    <Button
                      onClick={goToNextQuestion}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Next Question
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
