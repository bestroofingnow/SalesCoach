import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VapiPractice } from "@/components/vapi-practice";

interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'cold-call' | 'follow-up' | 'objection-handling' | 'closing';
  objectives: string[];
  estimatedTime: string;
  icon: string;
  color: string;
}

const scenarios: Scenario[] = [
  {
    id: 'cold-call-new',
    title: 'First-Time Cold Call',
    description: 'Practice reaching out to a brand new lead who has never heard of Best Roofing Now',
    difficulty: 'beginner',
    type: 'cold-call',
    objectives: [
      'Build rapport in the first 10 seconds',
      'Identify customer needs',
      'Create urgency for roof inspection',
      'Schedule an appointment'
    ],
    estimatedTime: '5-7 minutes',
    icon: 'fa-phone',
    color: 'blue'
  },
  {
    id: 'storm-follow-up',
    title: 'Storm Damage Follow-Up',
    description: 'Call a homeowner after recent storm activity in their area',
    difficulty: 'intermediate',
    type: 'follow-up',
    objectives: [
      'Reference recent storm event',
      'Express concern for their property',
      'Offer free inspection',
      'Handle insurance questions'
    ],
    estimatedTime: '7-10 minutes',
    icon: 'fa-cloud-bolt',
    color: 'yellow'
  },
  {
    id: 'price-objection',
    title: 'Price Objection Handler',
    description: 'Master handling "It\'s too expensive" and budget concerns',
    difficulty: 'advanced',
    type: 'objection-handling',
    objectives: [
      'Acknowledge their concern',
      'Shift focus to value',
      'Present financing options',
      'Create urgency without pressure'
    ],
    estimatedTime: '8-12 minutes',
    icon: 'fa-dollar-sign',
    color: 'green'
  },
  {
    id: 'closing-ready',
    title: 'Ready-to-Close Customer',
    description: 'Practice closing techniques with a customer showing buying signals',
    difficulty: 'intermediate',
    type: 'closing',
    objectives: [
      'Recognize buying signals',
      'Use assumptive close',
      'Handle final objections',
      'Confirm appointment details'
    ],
    estimatedTime: '5-8 minutes',
    icon: 'fa-handshake',
    color: 'purple'
  },
  {
    id: 'insurance-claim',
    title: 'Insurance Claim Assistance',
    description: 'Help a confused homeowner navigate the insurance claim process',
    difficulty: 'advanced',
    type: 'follow-up',
    objectives: [
      'Explain claim process simply',
      'Build trust as their advocate',
      'Address deductible concerns',
      'Schedule inspection with adjuster'
    ],
    estimatedTime: '10-15 minutes',
    icon: 'fa-shield-alt',
    color: 'indigo'
  },
  {
    id: 'busy-homeowner',
    title: 'The Busy Homeowner',
    description: 'Handle a customer who says they don\'t have time right now',
    difficulty: 'beginner',
    type: 'objection-handling',
    objectives: [
      'Respect their time',
      'Create urgency briefly',
      'Offer flexible scheduling',
      'Get permission to follow up'
    ],
    estimatedTime: '3-5 minutes',
    icon: 'fa-clock',
    color: 'orange'
  }
];

export default function PracticeScenarios() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScenarioColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'from-blue-500 to-blue-600',
      yellow: 'from-yellow-500 to-yellow-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      indigo: 'from-indigo-500 to-indigo-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colorMap[color] || 'from-gray-500 to-gray-600';
  };

  const filteredScenarios = activeTab === 'all' 
    ? scenarios 
    : scenarios.filter(s => s.type === activeTab);

  if (selectedScenario) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => setSelectedScenario(null)}
          className="mb-4"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Scenarios
        </Button>

        {/* Scenario Header */}
        <Card className={`bg-gradient-to-r ${getScenarioColor(selectedScenario.color)} text-white`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className={`fas ${selectedScenario.icon} text-2xl`}></i>
                </div>
                <div>
                  <CardTitle className="text-2xl">{selectedScenario.title}</CardTitle>
                  <CardDescription className="text-white/90">
                    {selectedScenario.description}
                  </CardDescription>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-white/30">
                {selectedScenario.estimatedTime}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Practice Component */}
        <VapiPractice scenarioType={selectedScenario.type} />

        {/* Scenario Objectives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <i className="fas fa-bullseye text-red-500"></i>
              Scenario Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {selectedScenario.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2">
                  <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                  <span className="text-gray-700">{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Practice Scenarios</h2>
          <p className="text-gray-600">Choose a realistic scenario to practice your skills</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Scenarios</TabsTrigger>
          <TabsTrigger value="cold-call">Cold Calls</TabsTrigger>
          <TabsTrigger value="follow-up">Follow-Ups</TabsTrigger>
          <TabsTrigger value="objection-handling">Objections</TabsTrigger>
          <TabsTrigger value="closing">Closing</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScenarios.map((scenario) => (
          <Card 
            key={scenario.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedScenario(scenario)}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 bg-gradient-to-r ${getScenarioColor(scenario.color)} rounded-lg flex items-center justify-center`}>
                  <i className={`fas ${scenario.icon} text-white`}></i>
                </div>
                <Badge className={getDifficultyColor(scenario.difficulty)}>
                  {scenario.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-lg">{scenario.title}</CardTitle>
              <CardDescription>{scenario.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <i className="fas fa-clock text-gray-400"></i>
                  {scenario.estimatedTime}
                </span>
                <span className="flex items-center gap-1">
                  <i className="fas fa-bullseye text-gray-400"></i>
                  {scenario.objectives.length} objectives
                </span>
              </div>
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedScenario(scenario);
                }}
              >
                Start Practice
                <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <i className="fas fa-lightbulb text-yellow-500"></i>
            Pro Tips for Practice Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <i className="fas fa-microphone text-blue-500 mt-1"></i>
              <div>
                <h4 className="font-semibold mb-1">Speak Clearly</h4>
                <p className="text-sm text-gray-600">
                  Maintain a confident tone and speak at a moderate pace
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <i className="fas fa-ear text-green-500 mt-1"></i>
              <div>
                <h4 className="font-semibold mb-1">Active Listening</h4>
                <p className="text-sm text-gray-600">
                  Let the AI finish speaking before responding
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <i className="fas fa-redo text-purple-500 mt-1"></i>
              <div>
                <h4 className="font-semibold mb-1">Practice Makes Perfect</h4>
                <p className="text-sm text-gray-600">
                  Repeat scenarios multiple times with different approaches
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <i className="fas fa-chart-line text-orange-500 mt-1"></i>
              <div>
                <h4 className="font-semibold mb-1">Track Progress</h4>
                <p className="text-sm text-gray-600">
                  Review your performance after each session
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}