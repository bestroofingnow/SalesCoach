import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface AIHintsProps {
  moduleTitle: string;
  lessonTitle: string;
  lessonContent: string;
}

export default function AIHints({ moduleTitle, lessonTitle, lessonContent }: AIHintsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [hints, setHints] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const { toast } = useToast();

  const getHint = async (userQuestion?: string) => {
    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/ai/hint', {
        moduleTitle,
        lessonTitle,
        lessonContent: lessonContent.substring(0, 1000), // Send excerpt to save tokens
        userQuestion,
        previousHints: hints
      });
      
      const data = await response.json();
      setHints([...hints, data.hint]);
      if (userQuestion) {
        setQuestion("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get hint. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const explainConcept = async (concept: string) => {
    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/ai/explain', {
        concept,
        moduleContext: `${moduleTitle} - ${lessonTitle}`
      });
      
      const data = await response.json();
      setHints([...hints, `Explanation of "${concept}": ${data.explanation}`]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to explain concept. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle text selection for concept explanation
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString().trim());
    }
  };

  return (
    <>
      {/* Floating AI Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 shadow-lg bg-blue-500 hover:bg-blue-600 text-white"
          title="AI Learning Assistant"
        >
          <i className="fas fa-robot text-xl"></i>
        </Button>
      </div>

      {/* AI Assistant Panel */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 max-h-[600px] shadow-xl z-50">
          <CardHeader className="bg-blue-500 text-white">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <i className="fas fa-robot"></i>
                AI Learning Assistant
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-600"
              >
                <i className="fas fa-times"></i>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {/* Quick Actions */}
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600 mb-2">Need help? Try these:</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => getHint()}
                  disabled={isLoading}
                >
                  <i className="fas fa-lightbulb mr-1"></i>
                  Get a Hint
                </Button>
                {selectedText && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      explainConcept(selectedText);
                      setSelectedText("");
                    }}
                    disabled={isLoading}
                  >
                    <i className="fas fa-info-circle mr-1"></i>
                    Explain "{selectedText.substring(0, 20)}..."
                  </Button>
                )}
              </div>
            </div>

            {/* Ask a Question */}
            <div className="mb-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (question.trim()) {
                    getHint(question);
                  }
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="Ask a question about this lesson..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" size="sm" disabled={isLoading || !question.trim()}>
                  <i className="fas fa-paper-plane"></i>
                </Button>
              </form>
            </div>

            {/* Hints History */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {hints.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  Select text to explain concepts, ask questions, or click "Get a Hint" to start learning!
                </p>
              ) : (
                hints.map((hint, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 text-sm animate-in slide-in-from-bottom"
                  >
                    <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                    {hint}
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-gray-500">
                <i className="fas fa-info-circle mr-1"></i>
                Tip: Select any text in the lesson to get an explanation!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add event listener for text selection */}
      <div onMouseUp={handleTextSelection} />
    </>
  );
}