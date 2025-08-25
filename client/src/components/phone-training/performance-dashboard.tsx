import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { PerformanceMetrics, CallRecording } from "@shared/schema";

interface PerformanceData {
  daily: PerformanceMetrics[];
  weekly: PerformanceMetrics[];
  monthly: PerformanceMetrics[];
  trends: {
    callVolume: number;
    contactRate: number;
    appointmentRate: number;
    averageScore: number;
  };
  goals: {
    dailyCalls: number;
    weeklyAppointments: number;
    targetContactRate: number;
    targetAppointmentRate: number;
  };
}

export default function PerformanceDashboard() {
  const [timeRange, setTimeRange] = useState("week");
  const [selectedMetric, setSelectedMetric] = useState("appointments");

  const { data: performanceData } = useQuery<PerformanceData>({
    queryKey: ["/api/phone-training/performance", timeRange],
  });

  const { data: recentCalls = [] } = useQuery<CallRecording[]>({
    queryKey: ["/api/phone-training/recordings/recent"],
  });

  const currentStats = performanceData?.weekly?.[0] || {
    totalDials: 0,
    totalContacts: 0,
    appointmentsSet: 0,
    contactRate: 0,
    appointmentRate: 0,
    averageCallScore: 0
  };

  const trends = performanceData?.trends || {
    callVolume: 0,
    contactRate: 0,
    appointmentRate: 0,
    averageScore: 0
  };

  const goals = performanceData?.goals || {
    dailyCalls: 100,
    weeklyAppointments: 15,
    targetContactRate: 25,
    targetAppointmentRate: 15
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return "fas fa-arrow-up text-green-500";
    if (trend < 0) return "fas fa-arrow-down text-red-500";
    return "fas fa-minus text-gray-500";
  };

  const getTrendText = (trend: number) => {
    if (trend > 0) return `+${trend}%`;
    if (trend < 0) return `${trend}%`;
    return "No change";
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Performance Analytics</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Calls</p>
                <p className="text-3xl font-bold text-gray-900">{currentStats.totalDials}</p>
                <div className="flex items-center mt-1">
                  <i className={getTrendIcon(trends.callVolume)}></i>
                  <span className="text-sm ml-1">{getTrendText(trends.callVolume)}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-phone text-blue-500 text-xl"></i>
              </div>
            </div>
            <Progress value={(currentStats.totalDials / goals.dailyCalls) * 100} className="mt-3" />
            <p className="text-xs text-gray-500 mt-1">Goal: {goals.dailyCalls} calls/day</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contact Rate</p>
                <p className="text-3xl font-bold text-green-600">{currentStats.contactRate}%</p>
                <div className="flex items-center mt-1">
                  <i className={getTrendIcon(trends.contactRate)}></i>
                  <span className="text-sm ml-1">{getTrendText(trends.contactRate)}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-user-check text-green-500 text-xl"></i>
              </div>
            </div>
            <Progress value={(currentStats.contactRate / goals.targetContactRate) * 100} className="mt-3" />
            <p className="text-xs text-gray-500 mt-1">Target: {goals.targetContactRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Appointment Rate</p>
                <p className="text-3xl font-bold text-purple-600">{currentStats.appointmentRate}%</p>
                <div className="flex items-center mt-1">
                  <i className={getTrendIcon(trends.appointmentRate)}></i>
                  <span className="text-sm ml-1">{getTrendText(trends.appointmentRate)}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-calendar-check text-purple-500 text-xl"></i>
              </div>
            </div>
            <Progress value={(currentStats.appointmentRate / goals.targetAppointmentRate) * 100} className="mt-3" />
            <p className="text-xs text-gray-500 mt-1">Target: {goals.targetAppointmentRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Call Score</p>
                <p className="text-3xl font-bold text-orange-600">{currentStats.averageCallScore}/30</p>
                <div className="flex items-center mt-1">
                  <i className={getTrendIcon(trends.averageScore)}></i>
                  <span className="text-sm ml-1">{getTrendText(trends.averageScore)}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-star text-orange-500 text-xl"></i>
              </div>
            </div>
            <Progress value={(currentStats.averageCallScore / 30) * 100} className="mt-3" />
            <p className="text-xs text-gray-500 mt-1">Target: 24/30 (80%)</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="breakdown">Call Breakdown</TabsTrigger>
          <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
          <TabsTrigger value="improvement">Improvement Areas</TabsTrigger>
        </TabsList>

        {/* Performance Trends */}
        <TabsContent value="trends">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <i className="fas fa-chart-line text-4xl mb-4 opacity-50"></i>
                    <p>Performance chart visualization</p>
                    <p className="text-sm">Coming soon - Interactive charts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Call Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCalls.slice(0, 5).map((call, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          call.outcome === 'appointment_set' ? 'bg-green-500' :
                          call.outcome === 'callback_scheduled' ? 'bg-yellow-500' :
                          'bg-gray-400'
                        }`}></div>
                        <div>
                          <p className="text-sm font-medium">
                            {call.outcome?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </p>
                          <p className="text-xs text-gray-600">
                            {Math.floor((call.duration || 0) / 60)}:{String((call.duration || 0) % 60).padStart(2, '0')}
                          </p>
                        </div>
                      </div>
                      {call.score && (
                        <Badge variant="secondary">{call.score}/30</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Call Breakdown */}
        <TabsContent value="breakdown">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Call Outcomes Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { outcome: "Appointment Set", count: currentStats.appointmentsSet, color: "bg-green-500" },
                    { outcome: "Callback Scheduled", count: Math.floor(currentStats.totalContacts * 0.1), color: "bg-yellow-500" },
                    { outcome: "Not Interested", count: Math.floor(currentStats.totalContacts * 0.6), color: "bg-red-500" },
                    { outcome: "No Answer", count: currentStats.totalDials - currentStats.totalContacts, color: "bg-gray-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                        <span className="text-sm">{item.outcome}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{item.count}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${item.color} h-2 rounded-full`}
                            style={{ width: `${(item.count / currentStats.totalDials) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { range: "25-30 (Excellent)", count: 8, color: "bg-green-500" },
                    { range: "20-24 (Good)", count: 15, color: "bg-blue-500" },
                    { range: "15-19 (Fair)", count: 12, color: "bg-yellow-500" },
                    { range: "10-14 (Needs Work)", count: 5, color: "bg-orange-500" },
                    { range: "0-9 (Poor)", count: 2, color: "bg-red-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                        <span className="text-sm">{item.range}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{item.count}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${item.color} h-2 rounded-full`}
                            style={{ width: `${(item.count / 42) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Goals & Targets */}
        <TabsContent value="goals">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { goal: "Total Calls", current: currentStats.totalDials, target: goals.dailyCalls, unit: "calls" },
                  { goal: "Contacts Made", current: currentStats.totalContacts, target: 25, unit: "contacts" },
                  { goal: "Appointments Set", current: currentStats.appointmentsSet, target: 3, unit: "appointments" },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.goal}</span>
                      <span className="text-sm text-gray-600">
                        {item.current} / {item.target} {item.unit}
                      </span>
                    </div>
                    <Progress value={(item.current / item.target) * 100} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { goal: "Weekly Appointments", current: currentStats.appointmentsSet * 5, target: goals.weeklyAppointments, unit: "appointments" },
                  { goal: "Contact Rate", current: currentStats.contactRate, target: goals.targetContactRate, unit: "%" },
                  { goal: "Appointment Rate", current: currentStats.appointmentRate, target: goals.targetAppointmentRate, unit: "%" },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.goal}</span>
                      <span className="text-sm text-gray-600">
                        {item.current} / {item.target} {item.unit}
                      </span>
                    </div>
                    <Progress value={(item.current / item.target) * 100} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Improvement Areas */}
        <TabsContent value="improvement">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-exclamation-triangle text-orange-500 mr-2"></i>
                      <h4 className="font-medium">Closing Technique</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      Average closing score: 3.2/5. Focus on assumptive closes and multiple close attempts.
                    </p>
                    <p className="text-xs text-orange-600">
                      Suggested: Practice "Alternative Choice Close" and "Urgency Close" techniques
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-info-circle text-yellow-500 mr-2"></i>
                      <h4 className="font-medium">Call Volume</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      Current daily average: 75 calls. Target: 100 calls for optimal results.
                    </p>
                    <p className="text-xs text-yellow-600">
                      Suggested: Increase calling hours or improve dialing efficiency
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-check-circle text-green-500 mr-2"></i>
                      <h4 className="font-medium">Opening & Rapport</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      Excellent opening energy and rapport building. Average score: 4.8/5.
                    </p>
                    <p className="text-xs text-green-600">
                      Keep up the great work! Your enthusiasm is engaging prospects.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-thumbs-up text-blue-500 mr-2"></i>
                      <h4 className="font-medium">Objection Handling</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      Strong objection responses. Successfully overcoming 78% of initial objections.
                    </p>
                    <p className="text-xs text-blue-600">
                      Great progress! Continue practicing advanced objection scenarios.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}