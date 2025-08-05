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
    <aside className="w-64 bg-white shadow-lg h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        {/* Overall Progress */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 mb-6 text-white">
          <h3 className="font-semibold mb-2">Overall Progress</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">{Math.round(overallProgress)}% Complete</span>
            <span className="text-sm opacity-90">
              {progress?.overall.completed || 0}/{progress?.overall.total || 0} Modules
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300" 
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start bg-blue-500 text-white hover:bg-blue-600"
          >
            <i className="fas fa-tachometer-alt w-5 mr-3"></i>
            <span className="font-medium">Dashboard</span>
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
