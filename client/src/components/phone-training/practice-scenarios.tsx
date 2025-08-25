import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { PracticeScenario } from "@shared/schema";

interface ScenarioAttempt {
  scenarioId: string;
  completed: boolean;
  score?: number;
  attemptedAt: string;
}

export default function PracticeScenarios() {
  const { toast } = useToast();
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedLeadType, setSelectedLeadType] = useState("all");
  const [activeScenario, setActiveScenario] = useState<PracticeScenario | null>(null);
  const [frameworkChecklist, setFrameworkChecklist] = useState({
    rapport: false,
    reason: false,
    qualifying: false,
    value: false,
    appointment: false,
    confirmation: false
  });

  const { data: scenarios = [] } = useQuery<PracticeScenario[]>({
    queryKey: ["/api/phone-training/scenarios"],
  });

  const { data: attempts = [] } = useQuery<ScenarioAttempt[]>({
    queryKey: ["/api/phone-training/scenario-attempts"],
  });

  // Complete scenario mutation
  const completeScenarioMutation = useMutation({
    mutationFn: async (data: { scenarioId: string; checklist: typeof frameworkChecklist }) => {
      return apiRequest('POST', '/api/phone-training/scenario-attempts', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/phone-training/scenario-attempts"] });
      toast({
        title: "Scenario Completed",
        description: "Great job! You've completed this practice scenario.",
      });
      setActiveScenario(null);
      resetChecklist();
    },
  });

  const resetChecklist = () => {
    setFrameworkChecklist({
      rapport: false,
      reason: false,
      qualifying: false,
      value: false,
      appointment: false,
      confirmation: false
    });
  };

  const filteredScenarios = scenarios.filter(scenario => {
    const matchesDifficulty = selectedDifficulty === "all" || scenario.difficulty === selectedDifficulty;
    const matchesLeadType = selectedLeadType === "all" || scenario.leadType === selectedLeadType;
    return matchesDifficulty && matchesLeadType;
  });

  const defaultScenarios = [
    {
      id: "storm-interested",
      title: "Interested Storm Lead",
      description: "Homeowner in Dilworth area, recent hail storm, 12-year-old roof, hasn't filed insurance claim yet",
      leadType: "storm_lead",
      difficulty: "beginner",
      prospectProfile: {
        name: "Sarah Johnson",
        location: "Dilworth, Charlotte",
        situation: "Recent hail storm damage",
        roofAge: "12 years",
        concerns: ["Insurance process", "Cost", "Time"],
        personality: "Cautious but interested"
      },
      expectedObjections: [
        "How do I know if I really have damage?",
        "Will this cost me anything?",
        "How long does insurance take?"
      ],
      coachingTips: "Focus on free inspection and insurance expertise. This prospect is genuinely interested but needs reassurance about the process."
    },
    {
      id: "skeptical-aged",
      title: "Skeptical Aged Roof",
      description: "Homeowner in South Charlotte, 18-year-old roof, no recent storms, been getting lots of roofing calls",
      leadType: "aged_roof",
      difficulty: "intermediate",
      prospectProfile: {
        name: "Mike Thompson",
        location: "South Charlotte",
        situation: "Aging roof, no immediate problems",
        roofAge: "18 years",
        concerns: ["Contractor scams", "Unnecessary expense", "Disruption"],
        personality: "Skeptical, cautious, price-conscious"
      },
      expectedObjections: [
        "I've had 5 roofers call this week",
        "I can't afford a new roof",
        "I don't trust contractors"
      ],
      coachingTips: "Build credibility first. Emphasize free inspection and preventive maintenance approach. Don't oversell - focus on peace of mind."
    },
    {
      id: "busy-professional",
      title: "Busy Professional",
      description: "Executive in Myers Park, recent wind damage, very busy schedule, travels frequently",
      leadType: "storm_lead",
      difficulty: "advanced",
      prospectProfile: {
        name: "Lisa Chen",
        location: "Myers Park, Charlotte",
        situation: "Wind damage, busy executive",
        roofAge: "8 years",
        concerns: ["Time constraints", "Quality", "Efficiency"],
        personality: "Direct, results-oriented, values time"
      },
      expectedObjections: [
        "I don't have time for this",
        "Can you just email me information?",
        "I'll call you back"
      ],
      coachingTips: "Be direct and efficient. Focus on convenience and professional service. Respect their time constraints but create urgency around storm damage."
    },
    {
      id: "multiple-decision-makers",
      title: "Young Couple - First Home",
      description: "Young couple in Ballantyne, first-time homeowners, 15-year-old roof, budget-conscious",
      leadType: "aged_roof",
      difficulty: "intermediate",
      prospectProfile: {
        name: "David & Amanda Miller",
        location: "Ballantyne, Charlotte",
        situation: "First-time homeowners, budget concerns",
        roofAge: "15 years",
        concerns: ["Cost", "Making right decision", "Future planning"],
        personality: "Thoughtful, want to make smart decisions together"
      },
      expectedObjections: [
        "We need to discuss this together",
        "We're saving for other things",
        "How much will this cost?"
      ],
      coachingTips: "Include both decision makers. Focus on protecting their investment and peace of mind. Emphasize the free inspection lets them make informed decisions."
    }
  ];

  const handleScenarioComplete = () => {
    if (!activeScenario) return;
    
    const completedSteps = Object.values(frameworkChecklist).filter(Boolean).length;
    if (completedSteps < 4) {
      toast({
        title: "Incomplete Practice",
        description: "Please complete at least 4 steps of the framework before finishing.",
        variant: "destructive",
      });
      return;
    }

    completeScenarioMutation.mutate({
      scenarioId: activeScenario.id,
      checklist: frameworkChecklist
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <i className="fas fa-theater-masks mr-2 text-purple-500"></i>
            Practice Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex gap-2">
              <span className="text-sm font-medium self-center">Difficulty:</span>
              {["all", "beginner", "intermediate", "advanced"].map(difficulty => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty(difficulty)}
                  data-testid={`filter-difficulty-${difficulty}`}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <span className="text-sm font-medium self-center">Lead Type:</span>
              {["all", "storm_lead", "aged_roof", "referral"].map(leadType => (
                <Button
                  key={leadType}
                  variant={selectedLeadType === leadType ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLeadType(leadType)}
                  data-testid={`filter-lead-type-${leadType}`}
                >
                  {leadType === "all" ? "All" : leadType.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {defaultScenarios.map((scenario) => {
          const attempt = attempts.find(a => a.scenarioId === scenario.id);
          const isCompleted = attempt?.completed || false;

          return (
            <Card key={scenario.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      {scenario.title}
                      {isCompleted && (
                        <i className="fas fa-check-circle text-green-500 ml-2"></i>
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline">{scenario.leadType.replace("_", " ")}</Badge>
                  <Badge variant={
                    scenario.difficulty === "beginner" ? "secondary" :
                    scenario.difficulty === "intermediate" ? "default" : "destructive"
                  }>
                    {scenario.difficulty}
                  </Badge>
                  {isCompleted && <Badge variant="secondary">✓ Completed</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Prospect Profile Preview */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Prospect Profile:</h4>
                    <p className="text-sm text-gray-700">
                      <strong>{scenario.prospectProfile.name}</strong> - {scenario.prospectProfile.situation}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {scenario.prospectProfile.location} • {scenario.prospectProfile.roofAge} roof
                    </p>
                  </div>

                  {/* Expected Objections Preview */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Expected Objections:</h4>
                    <div className="space-y-1">
                      {scenario.expectedObjections.slice(0, 2).map((objection, index) => (
                        <p key={index} className="text-xs text-gray-600">• {objection}</p>
                      ))}
                      {scenario.expectedObjections.length > 2 && (
                        <p className="text-xs text-gray-500">+ {scenario.expectedObjections.length - 2} more</p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          data-testid={`view-scenario-${scenario.id}`}
                        >
                          <i className="fas fa-eye mr-1"></i>
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{scenario.title}</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="max-h-96">
                          <Tabs defaultValue="profile" className="space-y-4">
                            <TabsList>
                              <TabsTrigger value="profile">Prospect Profile</TabsTrigger>
                              <TabsTrigger value="objections">Expected Objections</TabsTrigger>
                              <TabsTrigger value="tips">Coaching Tips</TabsTrigger>
                            </TabsList>

                            <TabsContent value="profile">
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Contact Information</h4>
                                    <p><strong>Name:</strong> {scenario.prospectProfile.name}</p>
                                    <p><strong>Location:</strong> {scenario.prospectProfile.location}</p>
                                    <p><strong>Roof Age:</strong> {scenario.prospectProfile.roofAge}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Situation</h4>
                                    <p>{scenario.prospectProfile.situation}</p>
                                    <p className="mt-2"><strong>Personality:</strong> {scenario.prospectProfile.personality}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Main Concerns</h4>
                                  <ul className="list-disc list-inside space-y-1">
                                    {scenario.prospectProfile.concerns.map((concern, index) => (
                                      <li key={index} className="text-sm">{concern}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="objections">
                              <div className="space-y-3">
                                {scenario.expectedObjections.map((objection, index) => (
                                  <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="font-medium text-red-800">"{objection}"</p>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>

                            <TabsContent value="tips">
                              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h4 className="font-medium text-blue-800 mb-2">Coaching Tips</h4>
                                <p className="text-blue-700">{scenario.coachingTips}</p>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>

                    <Button 
                      size="sm" 
                      onClick={() => setActiveScenario(scenario)}
                      disabled={activeScenario !== null}
                      data-testid={`practice-scenario-${scenario.id}`}
                    >
                      <i className="fas fa-play mr-1"></i>
                      Practice Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Active Practice Session */}
      {activeScenario && (
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-purple-800">
                🎭 Practicing: {activeScenario.title}
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setActiveScenario(null);
                  resetChecklist();
                }}
              >
                <i className="fas fa-times mr-1"></i>
                End Practice
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quick Reference */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium mb-3">Quick Reference</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Prospect:</strong> {activeScenario.prospectProfile?.name}</p>
                  <p><strong>Situation:</strong> {activeScenario.prospectProfile?.situation}</p>
                  <p><strong>Personality:</strong> {activeScenario.prospectProfile?.personality}</p>
                </div>
                <div>
                  <p><strong>Key Concerns:</strong></p>
                  <ul className="list-disc list-inside mt-1">
                    {activeScenario.prospectProfile?.concerns.map((concern, index) => (
                      <li key={index}>{concern}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 6-Step Framework Checklist */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium mb-3">6-Step Framework Checklist</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { key: 'rapport', label: 'Step 1: Build Rapport', icon: 'fas fa-handshake' },
                  { key: 'reason', label: 'Step 2: Reason for Calling', icon: 'fas fa-bullhorn' },
                  { key: 'qualifying', label: 'Step 3: Qualifying Questions', icon: 'fas fa-question-circle' },
                  { key: 'value', label: 'Step 4: Value Presentation', icon: 'fas fa-star' },
                  { key: 'appointment', label: 'Step 5: Appointment Request', icon: 'fas fa-calendar-plus' },
                  { key: 'confirmation', label: 'Step 6: Confirmation', icon: 'fas fa-check-double' },
                ].map((step) => (
                  <div key={step.key} className="flex items-center space-x-3">
                    <Checkbox
                      checked={frameworkChecklist[step.key as keyof typeof frameworkChecklist]}
                      onCheckedChange={(checked) =>
                        setFrameworkChecklist(prev => ({ ...prev, [step.key]: checked as boolean }))
                      }
                      data-testid={`checkbox-${step.key}`}
                    />
                    <i className={`${step.icon} text-gray-500 w-4`}></i>
                    <label className="text-sm cursor-pointer">{step.label}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Practice Button */}
            <div className="text-center">
              <Button 
                onClick={handleScenarioComplete}
                disabled={Object.values(frameworkChecklist).filter(Boolean).length < 4}
                size="lg"
                data-testid="button-complete-practice"
              >
                <i className="fas fa-flag-checkered mr-2"></i>
                Complete Practice Session
              </Button>
              <p className="text-xs text-gray-600 mt-2">
                Complete at least 4 framework steps to finish this practice session
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}