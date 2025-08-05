import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export default function QuizModal({ open, onOpenChange, questions, onComplete }: QuizModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

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
    } else {
      calculateScore();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const closeModal = () => {
    resetQuiz();
    onOpenChange(false);
    onComplete(score);
  };

  if (!currentQuestion && !showResults) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {showResults ? (
          <div className="text-center py-8">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              score >= questions.length * 0.8 ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <i className={`text-3xl ${
                score >= questions.length * 0.8 ? 'fas fa-check text-green-500' : 'fas fa-times text-red-500'
              }`}></i>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {score >= questions.length * 0.8 ? 'Congratulations!' : 'Quiz Complete'}
            </h2>
            
            <p className="text-gray-600 mb-6">
              You scored {score} out of {questions.length} questions correctly.
            </p>
            
            <div className="space-y-4">
              <Button onClick={closeModal} className="w-full">
                Continue
              </Button>
              
              {score < questions.length * 0.8 && (
                <Button variant="outline" onClick={resetQuiz} className="w-full">
                  Retake Quiz
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Knowledge Check</DialogTitle>
              <div className="flex items-center space-x-2">
                <Progress value={progress} className="flex-1 h-2" />
                <span className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
            </DialogHeader>
            
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {currentQuestion.question}
              </h3>
              
              <div className="space-y-3 mb-6">
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
                
                <Button
                  onClick={goToNextQuestion}
                  disabled={selectedAnswers[currentQuestion.id] === undefined}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
