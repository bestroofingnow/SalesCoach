import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mic, Volume2, Loader2, CheckCircle, XCircle, PhoneCall, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Vapi from '@vapi-ai/web';

interface VapiPracticeProps {
  scenarioType?: 'cold-call' | 'follow-up' | 'objection-handling' | 'closing';
  moduleId?: string;
}

type CallState = 'idle' | 'starting' | 'active' | 'ending' | 'ended' | 'error';

interface CallData {
  call: any;
  assistantId: string;
  publicKey: string;
  message: string;
}

export function VapiPractice({ scenarioType = 'cold-call', moduleId }: VapiPracticeProps) {
  const [callState, setCallState] = useState<CallState>('idle');
  const [callData, setCallData] = useState<CallData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { toast } = useToast();
  
  const vapiRef = useRef<Vapi | null>(null);
  const currentCallIdRef = useRef<string | null>(null);

  // Check microphone permissions on component mount
  useEffect(() => {
    checkMicrophonePermission();
  }, []);
  
  const checkMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
    } catch (err) {
      console.log('Microphone permission denied or not available:', err);
      setHasPermission(false);
    }
  };
  
  const requestMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      toast({
        title: "Permission Granted",
        description: "Microphone access enabled for voice training.",
      });
    } catch (err) {
      setHasPermission(false);
      toast({
        title: "Permission Required",
        description: "Please enable microphone access to use voice training.",
        variant: "destructive"
      });
    }
  };

  const startWebCall = async () => {
    try {
      if (!hasPermission) {
        await requestMicrophonePermission();
        if (!hasPermission) return;
      }
      
      setCallState('starting');
      setError(null);
      
      toast({
        title: "Starting Voice Training",
        description: "Connecting you with Coach Betty...",
      });
      
      const response = await apiRequest('/api/vapi/start-web-call', 'POST');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to start web call');
      }
      
      const callResponse: CallData = await response.json();
      setCallData(callResponse);
      
      // Initialize VAPI with the assistant
      await connectVapiCall(callResponse);
      
    } catch (err: any) {
      console.error('Failed to start web call:', err);
      setError(err.message || 'Failed to start voice training session');
      setCallState('error');
      
      toast({
        title: "Call Failed",
        description: err.message || "Failed to start voice training. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const connectVapiCall = async (callData: CallData) => {
    try {
      // Initialize Vapi client with public key
      const vapi = new Vapi(callData.publicKey);
      vapiRef.current = vapi;
      
      // Store call ID for cleanup
      currentCallIdRef.current = callData.call?.id || null;
      
      // Set up event listeners
      vapi.on('call-start', () => {
        console.log('VAPI call started');
        setCallState('active');
        toast({
          title: "Connected!",
          description: "You're now talking with Coach Betty. Start by saying your difficulty level (Easy, Hard, or Pro)",
        });
      });
      
      vapi.on('call-end', () => {
        console.log('VAPI call ended');
        setCallState('ended');
        toast({
          title: "Training Complete",
          description: "Great job! Your voice training session has ended.",
        });
        cleanup();
      });
      
      vapi.on('error', (error) => {
        console.error('VAPI error:', error);
        setError(error.message || 'Voice training error occurred');
        setCallState('error');
        toast({
          title: "Call Error",
          description: error.message || "An error occurred during voice training.",
          variant: "destructive"
        });
      });
      
      vapi.on('speech-start', () => {
        console.log('User started speaking');
      });
      
      vapi.on('speech-end', () => {
        console.log('User stopped speaking');
      });
      
      vapi.on('volume-level', (volume) => {
        // Could use this for volume visualization
      });
      
      // Start the call with the assistant
      await vapi.start(callData.assistantId);
      
    } catch (err: any) {
      console.error('Error connecting to VAPI:', err);
      setError(err.message || 'Failed to connect to voice training');
      setCallState('error');
    }
  };

  const endCall = async () => {
    try {
      setCallState('ending');
      
      // End the VAPI call
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
      
      // Also inform the backend to cleanup
      if (currentCallIdRef.current) {
        try {
          await apiRequest(`/api/vapi/calls/${currentCallIdRef.current}`, 'DELETE');
        } catch (cleanupError) {
          console.warn('Failed to cleanup call on backend:', cleanupError);
        }
      }
      
      cleanup();
      
    } catch (err: any) {
      console.error('Error ending call:', err);
      cleanup();
    }
  };
  
  const cleanup = () => {
    vapiRef.current = null;
    currentCallIdRef.current = null;
    setCallData(null);
    setIsMuted(false);
    
    // Auto reset after 3 seconds
    setTimeout(() => setCallState('idle'), 3000);
  };
  
  const toggleMute = () => {
    if (vapiRef.current) {
      const newMutedState = !isMuted;
      vapiRef.current.setMuted(newMutedState);
      setIsMuted(newMutedState);
      
      toast({
        title: newMutedState ? "Microphone Muted" : "Microphone Unmuted",
        description: newMutedState ? "Coach Betty can't hear you" : "Coach Betty can hear you again",
      });
    }
  };

  const resetCall = () => {
    setCallState('idle');
    setCallData(null);
    setError(null);
  };

  const getScenarioInstructions = () => {
    switch (scenarioType) {
      case 'cold-call':
        return {
          title: 'Cold Call Practice',
          description: 'Practice your opening pitch and initial engagement',
          tips: [
            'Start with a strong, confident greeting',
            'Identify yourself and your company clearly',
            'Create urgency without being pushy',
            'Listen actively for buying signals'
          ]
        };
      case 'follow-up':
        return {
          title: 'Follow-Up Call Practice',
          description: 'Master the art of reconnecting with leads',
          tips: [
            'Reference your previous conversation',
            'Address any concerns they mentioned',
            'Provide new value or information',
            'Move toward scheduling an appointment'
          ]
        };
      case 'objection-handling':
        return {
          title: 'Objection Handling Practice',
          description: 'Build confidence handling common objections',
          tips: [
            'Never argue - acknowledge their concern',
            'Ask clarifying questions',
            'Provide evidence and social proof',
            'Redirect to value and benefits'
          ]
        };
      case 'closing':
        return {
          title: 'Closing Practice',
          description: 'Perfect your closing techniques',
          tips: [
            'Recognize buying signals',
            'Use assumptive close techniques',
            'Create urgency with limited-time offers',
            'Handle last-minute objections smoothly'
          ]
        };
      default:
        return {
          title: 'Sales Practice',
          description: 'Improve your overall sales skills',
          tips: [
            'Build rapport quickly',
            'Ask open-ended questions',
            'Listen more than you speak',
            'Always follow up'
          ]
        };
    }
  };

  const scenario = getScenarioInstructions();

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-blue-600" />
            {scenario.title}
          </CardTitle>
          <CardDescription>{scenario.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Tips */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
              <i className="fas fa-lightbulb text-yellow-600"></i>
              Quick Tips for This Session
            </h4>
            <ul className="space-y-1 text-sm text-yellow-800">
              {scenario.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Controls */}
          <div className="bg-white border-2 border-slate-200 rounded-xl p-6 text-center space-y-4">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mic className="h-4 w-4" />
                <span>Microphone {hasPermission ? 'Ready' : 'Required'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Volume2 className="h-4 w-4" />
                <span>Audio Enabled</span>
              </div>
            </div>

            {/* Voice Training Controls */}
            <div className="flex flex-col items-center space-y-4">
              {callState === 'idle' && (
                <div className="flex flex-col items-center space-y-3">
                  {hasPermission === false && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                      <p className="text-sm text-yellow-800 mb-2">Microphone access is required for voice training</p>
                      <Button
                        onClick={requestMicrophonePermission}
                        size="sm"
                        variant="outline"
                        className="text-yellow-700 border-yellow-300"
                        data-testid="button-request-permission"
                      >
                        <Mic className="h-4 w-4 mr-2" />
                        Enable Microphone
                      </Button>
                    </div>
                  )}
                  <Button
                    onClick={startWebCall}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl"
                    disabled={hasPermission === false}
                    data-testid="button-start-training"
                  >
                    <PhoneCall className="h-5 w-5 mr-2" />
                    Start Voice Training with Coach Betty
                  </Button>
                </div>
              )}
              
              {callState === 'starting' && (
                <Button disabled size="lg" className="px-8 py-4 rounded-xl" data-testid="button-connecting">
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Connecting to Coach Betty...
                </Button>
              )}
              
              {callState === 'active' && (
                <div className="flex flex-col items-center space-y-3">
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <CheckCircle className="h-5 w-5" />
                    <span>Connected - Training In Progress</span>
                  </div>
                  
                  {/* Call Controls */}
                  <div className="flex gap-3">
                    <Button
                      onClick={toggleMute}
                      size="lg"
                      variant={isMuted ? "destructive" : "outline"}
                      className="px-6 py-3 rounded-xl"
                      data-testid="button-toggle-mute"
                    >
                      {isMuted ? (
                        <>
                          <MicOff className="h-5 w-5 mr-2" />
                          Unmute
                        </>
                      ) : (
                        <>
                          <Mic className="h-5 w-5 mr-2" />
                          Mute
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={endCall}
                      size="lg"
                      variant="destructive"
                      className="px-8 py-3 rounded-xl"
                      data-testid="button-end-training"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      End Training
                    </Button>
                  </div>
                  
                  <div className="text-sm text-slate-500 text-center max-w-md">
                    {isMuted ? (
                      "🔇 Microphone is muted - Click unmute to speak"
                    ) : (
                      "🎙️ Speak naturally - Coach Betty will respond with door-to-door scenarios"
                    )}
                  </div>
                </div>
              )}
              
              {callState === 'ending' && (
                <Button disabled size="lg" className="px-8 py-4 rounded-xl">
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Ending Session...
                </Button>
              )}
              
              {callState === 'ended' && (
                <div className="flex flex-col items-center space-y-3">
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <CheckCircle className="h-5 w-5" />
                    <span>Training Session Complete!</span>
                  </div>
                  <div className="text-sm text-slate-500">Automatically resetting...</div>
                </div>
              )}
              
              {callState === 'error' && (
                <div className="flex flex-col items-center space-y-3">
                  <div className="flex items-center gap-2 text-red-600 font-semibold">
                    <XCircle className="h-5 w-5" />
                    <span>Connection Failed</span>
                  </div>
                  <div className="text-sm text-red-500 text-center max-w-md">
                    {error}
                  </div>
                  <Button
                    onClick={resetCall}
                    size="lg"
                    variant="outline"
                    className="px-8 py-4 rounded-xl"
                    data-testid="button-try-again"
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </div>

            <div className="text-sm text-slate-500 mt-4 text-center">
              {callState === 'idle' && hasPermission && 'Click the button above to start your practice session with Coach Betty'}
              {callState === 'idle' && hasPermission === false && 'Enable microphone access to begin voice training'}
              {callState === 'starting' && 'Connecting to Coach Betty...'}
              {callState === 'active' && !isMuted && 'Speak naturally - Coach Betty will present realistic door-to-door scenarios'}
              {callState === 'active' && isMuted && 'Microphone is muted - Click unmute to continue training'}
              {callState === 'ended' && 'Review your performance and try another training session when ready'}
              {callState === 'error' && 'Check your microphone and internet connection, then try again'}
            </div>
          </div>

          {/* Performance Tips */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <i className="fas fa-chart-line text-green-600"></i>
                After Your Practice Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-green-600 mt-0.5"></i>
                  <span>Review the conversation transcript</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-green-600 mt-0.5"></i>
                  <span>Identify areas where you hesitated</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-green-600 mt-0.5"></i>
                  <span>Practice objection responses that challenged you</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-green-600 mt-0.5"></i>
                  <span>Try different approaches in multiple sessions</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}