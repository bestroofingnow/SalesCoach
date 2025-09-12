import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import { VapiPractice } from "@/components/vapi-practice";
import ScriptLibrary from "@/components/phone-training/script-library";
import PerformanceDashboard from "@/components/phone-training/performance-dashboard";
import PracticeScenarios from "@/components/phone-training/practice-scenarios";

interface PhoneTrainingStats {
  totalCalls: number;
  appointmentsSet: number;
  averageScore: number;
  contactRate: number;
  appointmentRate: number;
  improvementTrend: number;
}

export default function PhoneTraining() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: stats, isLoading: statsLoading } = useQuery<PhoneTrainingStats>({
    queryKey: ["/api/phone-training/stats"],
    retry: false,
  });

  useEffect(() => {
    // Add Vapi widget to the page on mount
    const addVapiWidget = () => {
      const vapiWidgetExists = document.querySelector('vapi-widget');
      if (!vapiWidgetExists) {
        fetch('/api/vapi/config', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`
          }
        })
          .then((res) => res.json())
          .then((config) => {
            const vapiWidget = document.createElement('div');
            vapiWidget.innerHTML = `
              <vapi-widget
                public-key="${config.publicKey}"
                assistant-id="${config.assistantId}"
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
                consent-content="By clicking &quot;Agree,&quot; and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as otherwise described in our Terms of Service."
                consent-storage-key="vapi_widget_consent"
              ></vapi-widget>
            `;
            document.body.appendChild(vapiWidget);
          })
          .catch((err) => console.error('Failed to load VAPI config', err));
      }
    };
    
    // Wait for VAPI library to load
    if ((window as any).vapiLoaded) {
      addVapiWidget();
    } else {
      const checkInterval = setInterval(() => {
        if ((window as any).vapiLoaded) {
          clearInterval(checkInterval);
          addVapiWidget();
        }
      }, 100);
      
      // Timeout after 5 seconds
      setTimeout(() => clearInterval(checkInterval), 5000);
    }
  }, []);

  if (isLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <i className="fas fa-phone text-white text-2xl"></i>
          </div>
          <p className="text-gray-600">Loading phone training dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
          <div className="p-4 sm:p-6 md:p-8">
            {/* Page Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4 mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-100 rounded-lg flex items-center justify-center mb-3 sm:mb-0">
                  <i className="fas fa-phone text-teal-500 text-xl sm:text-2xl"></i>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Phone Training</h1>
                  <p className="text-sm sm:text-base text-gray-600">Master cold calling and appointment setting skills</p>
                </div>
                {/* Vapi Widget Button - Always visible at top */}
                <div className="mt-4 sm:mt-0">
                  <Button 
                    size="lg"
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3"
                    onClick={() => {
                      // Wait for VAPI to be loaded and trigger the widget
                      const checkAndTrigger = () => {
                        const vapiWidget = document.querySelector('vapi-widget') as any;
                        if (vapiWidget) {
                          // Try multiple methods to trigger the widget
                          if (vapiWidget.shadowRoot) {
                            // Try to find and click internal buttons
                            const buttons = vapiWidget.shadowRoot.querySelectorAll('button');
                            for (const button of buttons) {
                              if (button.textContent?.includes('Start') || 
                                  button.textContent?.includes('TALK') ||
                                  button.className?.includes('cta')) {
                                button.click();
                                return;
                              }
                            }
                          }
                          // Try methods directly
                          if (typeof vapiWidget.open === 'function') {
                            vapiWidget.open();
                          } else if (typeof vapiWidget.start === 'function') {
                            vapiWidget.start();
                          } else if (typeof vapiWidget.startCall === 'function') {
                            vapiWidget.startCall();
                          } else {
                            // Try dispatching events
                            vapiWidget.dispatchEvent(new Event('click'));
                            vapiWidget.dispatchEvent(new CustomEvent('vapi:start'));
                          }
                        } else {
                          console.error('VAPI widget not found');
                        }
                      };
                      
                      // Check if widget is loaded
                      if ((window as any).vapiLoaded) {
                        checkAndTrigger();
                      } else {
                        // Wait for widget to load
                        setTimeout(checkAndTrigger, 1000);
                      }
                    }}
                    data-testid="button-start-ai-practice"
                  >
                    <i className="fas fa-headset mr-2"></i>
                    START AI PRACTICE CALL
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                <Card>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Total Calls</p>
                        <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats?.totalCalls || 0}</p>
                      </div>
                      <i className="fas fa-phone-volume text-teal-500 text-lg sm:text-xl"></i>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Appointments Set</p>
                        <p className="text-lg sm:text-2xl font-bold text-green-600">{stats?.appointmentsSet || 0}</p>
                      </div>
                      <i className="fas fa-calendar-check text-green-500 text-lg sm:text-xl"></i>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Contact Rate</p>
                        <p className="text-2xl font-bold text-blue-600">{stats?.contactRate || 0}%</p>
                      </div>
                      <i className="fas fa-user-check text-blue-500 text-xl"></i>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Appointment Rate</p>
                        <p className="text-2xl font-bold text-purple-600">{stats?.appointmentRate || 0}%</p>
                      </div>
                      <i className="fas fa-percentage text-purple-500 text-xl"></i>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Avg Score</p>
                        <p className="text-2xl font-bold text-orange-600">{stats?.averageScore || 0}/30</p>
                      </div>
                      <i className="fas fa-star text-orange-500 text-xl"></i>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
                <TabsTrigger value="overview" data-testid="tab-overview">
                  <i className="fas fa-chart-line mr-2"></i>
                  Overview
                </TabsTrigger>
                <TabsTrigger value="practice" data-testid="tab-practice">
                  <i className="fas fa-microphone mr-2"></i>
                  Practice Calls
                </TabsTrigger>
                <TabsTrigger value="scripts" data-testid="tab-scripts">
                  <i className="fas fa-file-text mr-2"></i>
                  Script Library
                </TabsTrigger>
                <TabsTrigger value="scenarios" data-testid="tab-scenarios">
                  <i className="fas fa-theater-masks mr-2"></i>
                  Scenarios
                </TabsTrigger>
                <TabsTrigger value="performance" data-testid="tab-performance">
                  <i className="fas fa-analytics mr-2"></i>
                  Performance
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <i className="fas fa-clock mr-2 text-blue-500"></i>
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <i className="fas fa-phone text-green-500 mr-3"></i>
                            <div>
                              <p className="font-medium">Practice Call Completed</p>
                              <p className="text-sm text-gray-600">Storm lead scenario - Score: 24/30</p>
                            </div>
                          </div>
                          <Badge variant="secondary">2 hours ago</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <i className="fas fa-book text-blue-500 mr-3"></i>
                            <div>
                              <p className="font-medium">Lesson Completed</p>
                              <p className="text-sm text-gray-600">Day 3: Objection Handling</p>
                            </div>
                          </div>
                          <Badge variant="secondary">Yesterday</Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <i className="fas fa-chart-line text-purple-500 mr-3"></i>
                            <div>
                              <p className="font-medium">Performance Milestone</p>
                              <p className="text-sm text-gray-600">Reached 20% appointment rate!</p>
                            </div>
                          </div>
                          <Badge variant="secondary">2 days ago</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <i className="fas fa-lightning-bolt mr-2 text-yellow-500"></i>
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button 
                          className="w-full justify-start"
                          onClick={() => setActiveTab("practice")}
                          data-testid="button-start-practice"
                        >
                          <i className="fas fa-microphone mr-2"></i>
                          Start Practice Call
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => setActiveTab("scripts")}
                          data-testid="button-browse-scripts"
                        >
                          <i className="fas fa-file-text mr-2"></i>
                          Browse Scripts
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => setActiveTab("scenarios")}
                          data-testid="button-practice-scenario"
                        >
                          <i className="fas fa-theater-masks mr-2"></i>
                          Practice Scenario
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => setActiveTab("performance")}
                          data-testid="button-view-analytics"
                        >
                          <i className="fas fa-analytics mr-2"></i>
                          View Analytics
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Training Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <i className="fas fa-graduation-cap mr-2 text-green-500"></i>
                      Training Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                      {[
                        { day: "Day 1", title: "Cold Calling Fundamentals", progress: 100, color: "bg-green-500" },
                        { day: "Day 2", title: "6-Step Framework", progress: 100, color: "bg-green-500" },
                        { day: "Day 3", title: "Scripts & Objections", progress: 75, color: "bg-blue-500" },
                        { day: "Day 4", title: "Advanced Techniques", progress: 25, color: "bg-yellow-500" },
                        { day: "Day 5", title: "Performance & Practice", progress: 0, color: "bg-gray-300" },
                      ].map((module, index) => (
                        <div key={index} className="text-center">
                          <div className="mb-2">
                            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                              <span className="text-sm font-bold text-gray-600">{module.day}</span>
                            </div>
                            <h4 className="font-medium text-sm">{module.title}</h4>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                          <p className="text-xs text-gray-600 mt-1">{module.progress}%</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Practice Calls Tab */}
              <TabsContent value="practice">
                <VapiPractice scenarioType="cold-call" />
              </TabsContent>

              {/* Script Library Tab */}
              <TabsContent value="scripts">
                <ScriptLibrary />
              </TabsContent>

              {/* Practice Scenarios Tab */}
              <TabsContent value="scenarios">
                <PracticeScenarios />
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance">
                <PerformanceDashboard />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}