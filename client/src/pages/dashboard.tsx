import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import ProgressCard from "@/components/training/progress-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardStats {
  residential: { completed: number; total: number };
  commercial: { completed: number; total: number };
  restoration: { completed: number; total: number };
  certifications: { earned: number; total: number };
  recentActivity: Array<{
    type: string;
    title: string;
    track: string;
    timeAgo: string;
  }>;
}

export default function Dashboard() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <i className="fas fa-home text-white text-2xl"></i>
          </div>
          <p className="text-gray-600">Loading your training dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8">
            {/* Enhanced Dashboard Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                    Welcome back, {user?.firstName || 'Trainee'}! 👋
                  </h1>
                  <p className="text-slate-600 text-lg max-w-2xl">
                    Continue your training journey and master all aspects of roofing excellence. Track your progress and achieve your goals.
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-3">
                  <Button 
                    onClick={() => window.location.href = '/phone-training'}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <i className="fas fa-phone mr-2"></i>
                    Phone Training
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = '/chat'}
                    className="border-2 border-blue-200 hover:bg-blue-50 transition-all duration-200"
                  >
                    <i className="fas fa-robot mr-2"></i>
                    AI Assistant
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <i className="fas fa-chart-line mr-2 text-blue-500"></i>
                Your Progress Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <ProgressCard
                  title="Residential"
                  completed={stats?.residential.completed || 0}
                  total={stats?.residential.total || 0}
                  color="blue"
                  icon="fas fa-home"
                />
                <ProgressCard
                  title="Commercial"
                  completed={stats?.commercial.completed || 0}
                  total={stats?.commercial.total || 0}
                  color="orange"
                  icon="fas fa-building"
                />
                <ProgressCard
                  title="Restoration"
                  completed={stats?.restoration.completed || 0}
                  total={stats?.restoration.total || 0}
                  color="purple"
                  icon="fas fa-cloud-rain"
                />
                <ProgressCard
                  title="Certifications"
                  completed={stats?.certifications.earned || 0}
                  total={stats?.certifications.total || 0}
                  color="green"
                  icon="fas fa-certificate"
                />
              </div>
            </div>

            {/* Enhanced Learning Tracks */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center">
                  <i className="fas fa-graduation-cap mr-2 text-blue-500"></i>
                  Training Tracks
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <i className="fas fa-eye mr-2"></i>
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Residential Track */}
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&w=400&h=200&fit=crop" 
                  alt="Modern residential home with shingle roof" 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-home text-blue-500"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Residential Roofing</h3>
                      <p className="text-sm text-gray-500">Master residential installations</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-blue-500">
                        {Math.round(((stats?.residential.completed || 0) / (stats?.residential.total || 1)) * 100)}% Complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 rounded-full h-2" 
                        style={{ width: `${((stats?.residential.completed || 0) / (stats?.residential.total || 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    onClick={() => setLocation("/tracks/19f30d96-6d6e-4126-b116-17a387991081")}
                  >
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>

              {/* Commercial Track */}
              <Card className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&w=400&h=200&fit=crop" 
                  alt="Modern commercial building with flat roof system" 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-building text-orange-500"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Commercial Roofing</h3>
                      <p className="text-sm text-gray-500">Flat roof systems & more</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-orange-500">
                        {Math.round(((stats?.commercial.completed || 0) / (stats?.commercial.total || 1)) * 100)}% Complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 rounded-full h-2" 
                        style={{ width: `${((stats?.commercial.completed || 0) / (stats?.commercial.total || 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={() => setLocation("/tracks/dd1389e4-df7c-4475-8bc2-872c2609bf7e")}
                  >
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>

              {/* Restoration Track */}
              <Card className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1561553873-e8491a564fd0?ixlib=rb-4.0.3&w=400&h=200&fit=crop" 
                  alt="Storm clouds over neighborhood showing hail damage potential" 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-cloud-rain text-purple-500"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Insurance Restoration</h3>
                      <p className="text-sm text-gray-500">Storm damage expertise</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-purple-500">
                        {Math.round(((stats?.restoration.completed || 0) / (stats?.restoration.total || 1)) * 100)}% Complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 rounded-full h-2" 
                        style={{ width: `${((stats?.restoration.completed || 0) / (stats?.restoration.total || 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-purple-500 hover:bg-purple-600"
                    onClick={() => setLocation("/tracks/9329d6b1-0f45-46b1-a42d-60b5068c985b")}
                  >
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
              </div>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <button className="text-sm text-blue-500 hover:underline">View All</button>
                </div>
                
                <div className="space-y-4">
                  {stats?.recentActivity?.length ? (
                    stats.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <i className="fas fa-check text-green-500"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-500">{activity.track} • {activity.timeAgo}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No recent activity. Start your first lesson!</p>
                  )}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center space-x-3 p-4 h-auto">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-play text-blue-500 text-sm"></i>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">Resume Training</p>
                      <p className="text-xs text-gray-500">Pick up where you left off</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="flex items-center space-x-3 p-4 h-auto">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-clipboard-check text-green-500 text-sm"></i>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">Take Quiz</p>
                      <p className="text-xs text-gray-500">Test your knowledge</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="flex items-center space-x-3 p-4 h-auto">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-search text-orange-500 text-sm"></i>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">Search Library</p>
                      <p className="text-xs text-gray-500">Find training documents</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="flex items-center space-x-3 p-4 h-auto">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-users text-purple-500 text-sm"></i>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">Ask Instructor</p>
                      <p className="text-xs text-gray-500">Get help from experts</p>
                    </div>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
