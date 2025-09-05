import { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mic, Volume2 } from "lucide-react";

interface VapiPracticeProps {
  scenarioType?: 'cold-call' | 'follow-up' | 'objection-handling' | 'closing';
  moduleId?: string;
}

export function VapiPractice({ scenarioType = 'cold-call', moduleId }: VapiPracticeProps) {
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Insert the Vapi widget when component mounts with all custom styling
    if (widgetContainerRef.current) {
      widgetContainerRef.current.innerHTML = `
        <vapi-widget
          public-key="c4cdfc01-71c2-49e7-b13c-c8ba6e109ce2"
          assistant-id="9fb2d481-9e44-427e-aab3-c88a89ab2b1a"
          mode="voice"
          theme="dark"
          base-bg-color="#000000"
          accent-color="#14B8A6"
          cta-button-color="#000000"
          cta-button-text-color="#ffffff"
          border-radius="large"
          size="full"
          position="bottom-right"
          title="TALK WITH AI"
          start-button-text="Start"
          end-button-text="End Call"
          cta-title="PRACTICE CALLS"
          chat-first-message="Hey, How can I help you today?"
          chat-placeholder="Type your message..."
          voice-show-transcript="true"
          consent-required="true"
          consent-title="Terms and conditions"
          consent-content="By clicking "Agree," and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as otherwise described in our Terms of Service."
          consent-storage-key="vapi_widget_consent"
        ></vapi-widget>
      `;
    }
  }, []);

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
                <span>Microphone Ready</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Volume2 className="h-4 w-4" />
                <span>Audio Enabled</span>
              </div>
            </div>

            {/* Vapi Widget Container */}
            <div className="flex justify-center">
              <div ref={widgetContainerRef} className="vapi-widget-container"></div>
            </div>

            <div className="text-sm text-slate-500 mt-4">
              Click the phone button above to start your practice session with Coach Mike
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