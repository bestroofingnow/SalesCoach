import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface SidebarProgress {
  overall: { completed: number; total: number };
  tracks: Array<{
    id: string;
    name: string;
    icon: string;
    color: string;
    completed: number;
    total: number;
    modules: Array<{
      id: string;
      title: string;
      completed: boolean;
    }>;
  }>;
}

export default function Sidebar() {
  const { data: progress } = useQuery<SidebarProgress>({
    queryKey: ["/api/users/progress"],
    retry: false,
  });

  const overallProgress = progress?.overall ? 
    (progress.overall.completed / progress.overall.total) * 100 : 0;

  return (
    <aside className="w-64 bg-white shadow-xl h-screen sticky top-0 overflow-y-auto border-r border-slate-200">
      <div className="p-6">
        {/* Enhanced Overall Progress */}
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-5 mb-6 text-white shadow-lg">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              <i className="fas fa-chart-line text-sm"></i>
            </div>
            <h3 className="font-semibold text-lg">Your Progress</h3>
          </div>
          <div className="mb-4">
            <div className="text-3xl font-bold mb-1">{Math.round(overallProgress)}%</div>
            <div className="text-sm opacity-90">
              {progress?.overall.completed || 0} of {progress?.overall.total || 0} modules completed
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-500 shadow-sm" 
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Enhanced Navigation Menu */}
        <nav className="space-y-3 mb-6">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-3 mb-2">Main Menu</div>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-md"
            onClick={() => window.location.href = '/'}
          >
            <i className="fas fa-tachometer-alt w-5 mr-3 text-lg"></i>
            <span className="font-medium">Dashboard</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200 group"
            onClick={() => window.location.href = '/chat'}
          >
            <div className="w-9 h-9 mr-3 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <i className="fas fa-robot text-green-600 text-sm"></i>
            </div>
            <span className="font-medium">AI Assistant</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-slate-600 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-all duration-200 group"
            onClick={() => window.location.href = '/phone-training'}
          >
            <div className="w-9 h-9 mr-3 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <i className="fas fa-phone text-purple-600 text-sm"></i>
            </div>
            <span className="font-medium">Phone Training</span>
          </Button>
          
          {/* Training Tracks */}
          {progress?.tracks?.map((track) => {
            const trackProgress = track.total > 0 ? (track.completed / track.total) * 100 : 0;
            const colorMap: Record<string, string> = {
              'blue': 'text-blue-500 bg-blue-100',
              'orange': 'text-orange-500 bg-orange-100',
              'purple': 'text-purple-500 bg-purple-100',
            };
            
            return (
              <div key={track.id} className="py-2">
                <div 
                  className="flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => window.location.href = `/tracks/${track.id}`}
                >
                  <div className="flex items-center space-x-3">
                    <i className={`${track.icon} w-5 ${track.color === 'blue' ? 'text-blue-500' : 
                      track.color === 'orange' ? 'text-orange-500' : 'text-purple-500'}`}></i>
                    <span className="font-medium">{track.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      track.color === 'blue' ? 'bg-blue-100 text-blue-500' :
                      track.color === 'orange' ? 'bg-orange-100 text-orange-500' :
                      'bg-purple-100 text-purple-500'
                    }`}>
                      {track.completed}/{track.total}
                    </span>
                    <i className="fas fa-chevron-down text-xs"></i>
                  </div>
                </div>
                
                {/* Track Modules */}
                <div className="ml-8 space-y-1">
                  {track.modules?.map((module) => (
                    <Button
                      key={module.id}
                      variant="ghost"
                      className="w-full justify-start text-sm text-gray-600 hover:bg-gray-50 rounded-lg py-2 px-4"
                      onClick={() => window.location.href = `/module/${module.id}`}
                    >
                      <i className={`fas fa-circle text-xs mr-2 ${
                        module.completed ? 'text-green-500' : 'text-gray-300'
                      }`}></i>
                      <span>{module.title}</span>
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-600 hover:bg-gray-50"
            onClick={() => window.location.href = `/module/gen-company-culture`}
          >
            <i className="fas fa-star w-5 mr-3"></i>
            <span className="font-medium">Company Culture</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-600 hover:bg-gray-50"
            onClick={() => window.location.href = `/module/gen-certifications`}
          >
            <i className="fas fa-certificate w-5 mr-3"></i>
            <span className="font-medium">Certifications</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-600 hover:bg-gray-50"
            onClick={() => window.location.href = `/module/gen-doc-library`}
          >
            <i className="fas fa-folder w-5 mr-3"></i>
            <span className="font-medium">Document Library</span>
          </Button>
        </nav>
      </div>
    </aside>
  );
}
