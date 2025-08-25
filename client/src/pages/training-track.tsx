import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import MobileNav from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TrainingModule {
  id: string;
  trackId: string;
  title: string;
  description: string;
  icon: string;
  orderIndex: number;
  totalLessons: number;
}

export default function TrainingTrack() {
  const { trackId } = useParams();
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const { data: modules, isLoading: modulesLoading } = useQuery<TrainingModule[]>({
    queryKey: [`/api/tracks/${trackId}/modules`],
    enabled: !!trackId,
  });

  const { data: track } = useQuery({
    queryKey: [`/api/tracks`],
    select: (tracks: any[]) => tracks.find(t => t.id === trackId),
  });

  if (authLoading || modulesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <i className="fas fa-book text-white text-2xl"></i>
          </div>
          <p className="text-gray-600">Loading training modules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileNav />
      <div className="hidden lg:block">
        <Navbar />
      </div>
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
          <div className="p-4 sm:p-6 md:p-8">
            {/* Track Header */}
            <div className="mb-6 sm:mb-8">
              <Button 
                variant="ghost" 
                className="mb-3 sm:mb-4 text-sm sm:text-base"
                onClick={() => setLocation("/")}
              >
                <i className="fas fa-arrow-left mr-2"></i>
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Button>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-3 sm:mb-0 ${
                  track?.color === 'blue' ? 'bg-blue-100' :
                  track?.color === 'orange' ? 'bg-orange-100' :
                  'bg-purple-100'
                }`}>
                  <i className={`${track?.icon || 'fas fa-book'} text-xl sm:text-2xl ${
                    track?.color === 'blue' ? 'text-blue-500' :
                    track?.color === 'orange' ? 'text-orange-500' :
                    'text-purple-500'
                  }`}></i>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{track?.name}</h1>
                  <p className="text-sm sm:text-base text-gray-600">{track?.description}</p>
                </div>
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {modules?.map((module, index) => (
                <Card 
                  key={module.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setLocation(`/module/${module.id}`)}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        track?.color === 'blue' ? 'bg-blue-100' :
                        track?.color === 'orange' ? 'bg-orange-100' :
                        'bg-purple-100'
                      }`}>
                        <i className={`${module.icon || 'fas fa-book-open'} ${
                          track?.color === 'blue' ? 'text-blue-500' :
                          track?.color === 'orange' ? 'text-orange-500' :
                          'text-purple-500'
                        }`}></i>
                      </div>
                      <span className="text-sm text-gray-500">Module {index + 1}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{module.totalLessons} Lessons</span>
                        <span className={`font-medium ${
                          track?.color === 'blue' ? 'text-blue-500' :
                          track?.color === 'orange' ? 'text-orange-500' :
                          'text-purple-500'
                        }`}>0% Complete</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                    
                    <Button className={`w-full mt-4 ${
                      track?.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                      track?.color === 'orange' ? 'bg-orange-500 hover:bg-orange-600' :
                      'bg-purple-500 hover:bg-purple-600'
                    }`}>
                      Start Module
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}