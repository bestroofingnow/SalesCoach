import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { PracticeScenario, CallRecording } from "@shared/schema";

interface CallScoringRubric {
  openingRapport: number;
  reasonForCalling: number;
  qualifyingQuestions: number;
  objectionHandling: number;
  closing: number;
  professionalism: number;
  totalScore: number;
  feedback: string;
}

export default function PracticeCallRecorder() {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState<string>("");
  const [callOutcome, setCallOutcome] = useState<string>("");
  const [callNotes, setCallNotes] = useState("");
  const [showScoring, setShowScoring] = useState(false);
  const [rubricScores, setRubricScores] = useState<CallScoringRubric>({
    openingRapport: 0,
    reasonForCalling: 0,
    qualifyingQuestions: 0,
    objectionHandling: 0,
    closing: 0,
    professionalism: 0,
    totalScore: 0,
    feedback: ""
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch practice scenarios
  const { data: scenarios = [] } = useQuery<PracticeScenario[]>({
    queryKey: ["/api/phone-training/scenarios"],
  });

  // Fetch recent recordings
  const { data: recentRecordings = [] } = useQuery<CallRecording[]>({
    queryKey: ["/api/phone-training/recordings"],
  });

  // Save recording mutation
  const saveRecordingMutation = useMutation({
    mutationFn: async (data: { 
      scenarioId?: string; 
      duration: number; 
      outcome: string; 
      notes: string;
      audioBlob: Blob;
    }) => {
      const formData = new FormData();
      formData.append('scenarioId', data.scenarioId || '');
      formData.append('duration', data.duration.toString());
      formData.append('outcome', data.outcome);
      formData.append('notes', data.notes);
      formData.append('audio', data.audioBlob, 'practice-call.wav');
      
      const response = await fetch('/api/phone-training/recordings', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Failed to save recording');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/phone-training/recordings"] });
      toast({
        title: "Recording Saved",
        description: "Your practice call has been saved successfully.",
      });
      resetRecordingState();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save recording. Please try again.",
        variant: "destructive",
      });
    }
  });

  const resetRecordingState = () => {
    setSelectedScenario("");
    setCallOutcome("");
    setCallNotes("");
    setRecordingDuration(0);
    setShowScoring(false);
    setRubricScores({
      openingRapport: 0,
      reasonForCalling: 0,
      qualifyingQuestions: 0,
      objectionHandling: 0,
      closing: 0,
      professionalism: 0,
      totalScore: 0,
      feedback: ""
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleSaveRecording = () => {
    if (audioChunksRef.current.length === 0) {
      toast({
        title: "Error",
        description: "No recording found. Please record a call first.",
        variant: "destructive",
      });
      return;
    }

    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
    
    saveRecordingMutation.mutate({
      scenarioId: selectedScenario,
      duration: recordingDuration,
      outcome: callOutcome,
      notes: callNotes,
      audioBlob
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateTotalScore = () => {
    const total = rubricScores.openingRapport + 
                 rubricScores.reasonForCalling + 
                 rubricScores.qualifyingQuestions + 
                 rubricScores.objectionHandling + 
                 rubricScores.closing + 
                 rubricScores.professionalism;
    
    setRubricScores(prev => ({ ...prev, totalScore: total }));
  };

  useEffect(() => {
    calculateTotalScore();
  }, [rubricScores.openingRapport, rubricScores.reasonForCalling, rubricScores.qualifyingQuestions, rubricScores.objectionHandling, rubricScores.closing, rubricScores.professionalism]);

  return (
    <div className="space-y-6">
      {/* Recording Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <i className="fas fa-microphone mr-2 text-red-500"></i>
            Practice Call Recorder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scenario Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Practice Scenario</label>
            <Select value={selectedScenario} onValueChange={setSelectedScenario}>
              <SelectTrigger data-testid="select-scenario">
                <SelectValue placeholder="Choose a practice scenario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free-practice">Free Practice (No Scenario)</SelectItem>
                {scenarios.map((scenario) => (
                  <SelectItem key={scenario.id} value={scenario.id}>
                    {scenario.title} - {scenario.difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Scenario Details */}
          {selectedScenario && selectedScenario !== "free-practice" && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                {scenarios.find(s => s.id === selectedScenario) && (
                  <div>
                    <h4 className="font-medium mb-2">
                      {scenarios.find(s => s.id === selectedScenario)?.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {scenarios.find(s => s.id === selectedScenario)?.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary">
                        {scenarios.find(s => s.id === selectedScenario)?.leadType}
                      </Badge>
                      <Badge variant="secondary">
                        {scenarios.find(s => s.id === selectedScenario)?.difficulty}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Recording Controls */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-4">
              {!isRecording ? (
                <Button 
                  onClick={startRecording} 
                  size="lg"
                  className="bg-red-500 hover:bg-red-600"
                  data-testid="button-start-recording"
                >
                  <i className="fas fa-microphone mr-2"></i>
                  Start Recording
                </Button>
              ) : (
                <Button 
                  onClick={stopRecording} 
                  size="lg"
                  variant="destructive"
                  data-testid="button-stop-recording"
                >
                  <i className="fas fa-stop mr-2"></i>
                  Stop Recording
                </Button>
              )}
            </div>

            {isRecording && (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-lg font-mono">{formatDuration(recordingDuration)}</span>
              </div>
            )}

            {recordingDuration > 0 && !isRecording && (
              <div className="text-center">
                <p className="text-lg font-medium">Recording Duration: {formatDuration(recordingDuration)}</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Call Outcome</label>
                    <Select value={callOutcome} onValueChange={setCallOutcome}>
                      <SelectTrigger data-testid="select-outcome">
                        <SelectValue placeholder="Select call outcome" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="appointment_set">Appointment Set</SelectItem>
                        <SelectItem value="callback_scheduled">Callback Scheduled</SelectItem>
                        <SelectItem value="not_interested">Not Interested</SelectItem>
                        <SelectItem value="no_answer">No Answer</SelectItem>
                        <SelectItem value="hung_up">Hung Up</SelectItem>
                        <SelectItem value="left_voicemail">Left Voicemail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Call Notes</label>
                    <Textarea 
                      value={callNotes}
                      onChange={(e) => setCallNotes(e.target.value)}
                      placeholder="Notes about the call, objections encountered, areas for improvement..."
                      data-testid="textarea-notes"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      onClick={handleSaveRecording}
                      disabled={!callOutcome || saveRecordingMutation.isPending}
                      data-testid="button-save-recording"
                    >
                      <i className="fas fa-save mr-2"></i>
                      Save Recording
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => setShowScoring(!showScoring)}
                      data-testid="button-score-call"
                    >
                      <i className="fas fa-star mr-2"></i>
                      Score This Call
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Call Scoring Rubric */}
          {showScoring && (
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-600">Call Scoring Rubric</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'openingRapport', label: 'Opening & Rapport (1-5)', icon: 'fas fa-handshake' },
                  { key: 'reasonForCalling', label: 'Reason for Calling (1-5)', icon: 'fas fa-bullhorn' },
                  { key: 'qualifyingQuestions', label: 'Qualifying Questions (1-5)', icon: 'fas fa-question-circle' },
                  { key: 'objectionHandling', label: 'Objection Handling (1-5)', icon: 'fas fa-shield-alt' },
                  { key: 'closing', label: 'Closing (1-5)', icon: 'fas fa-handshake' },
                  { key: 'professionalism', label: 'Professionalism (1-5)', icon: 'fas fa-user-tie' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center space-x-4">
                    <i className={`${item.icon} text-gray-500 w-5`}></i>
                    <label className="text-sm font-medium flex-1">{item.label}</label>
                    <Select 
                      value={rubricScores[item.key as keyof CallScoringRubric]?.toString() || "0"}
                      onValueChange={(value) => setRubricScores(prev => ({ 
                        ...prev, 
                        [item.key]: parseInt(value) 
                      }))}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <SelectItem key={score} value={score.toString()}>
                            {score}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">Total Score:</span>
                    <span className="text-2xl font-bold text-orange-600">
                      {rubricScores.totalScore}/30
                    </span>
                  </div>
                  <Progress value={(rubricScores.totalScore / 30) * 100} className="mb-4" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Feedback & Improvement Notes</label>
                  <Textarea 
                    value={rubricScores.feedback}
                    onChange={(e) => setRubricScores(prev => ({ ...prev, feedback: e.target.value }))}
                    placeholder="Areas for improvement, what went well, specific feedback..."
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Recent Recordings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <i className="fas fa-history mr-2 text-blue-500"></i>
            Recent Practice Calls
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentRecordings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <i className="fas fa-microphone text-4xl mb-4 opacity-50"></i>
              <p>No practice calls recorded yet.</p>
              <p className="text-sm">Start practicing to see your recordings here!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentRecordings.slice(0, 5).map((recording) => (
                <div key={recording.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-play-circle text-blue-500 text-xl"></i>
                    <div>
                      <p className="font-medium">Practice Call</p>
                      <p className="text-sm text-gray-600">
                        {formatDuration(recording.duration || 0)} • {recording.outcome}
                        {recording.score && ` • Score: ${recording.score}/30`}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {new Date(recording.createdAt).toLocaleDateString()}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}