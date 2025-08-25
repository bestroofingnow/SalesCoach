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
    <aside className="hidden lg:block w-64 bg-white shadow-xl h-screen sticky top-0 overflow-y-auto border-r border-slate-200">
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
          
          {/* Training Tracks - Collapsed by Default */}
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-3 mb-2 mt-6">Training Tracks</div>
          {progress?.tracks?.map((track) => {
            const trackProgress = track.total > 0 ? (track.completed / track.total) * 100 : 0;
            
            return (
              <div key={track.id} className="group relative">
                <Button
                  variant="ghost" 
                  className="w-full justify-start text-slate-600 hover:bg-slate-50 hover:text-slate-700 rounded-xl transition-all duration-200 mb-1"
                  onClick={() => window.location.href = `/tracks/${track.id}`}
                >
                  <div className={`w-9 h-9 mr-3 rounded-lg flex items-center justify-center transition-colors ${
                    track.color === 'blue' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-200' :
                    track.color === 'orange' ? 'bg-orange-100 text-orange-600 group-hover:bg-orange-200' :
                    'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                  }`}>
                    <i className={`${track.icon} text-sm`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{track.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        track.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        track.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {track.completed}/{track.total}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1 mt-1">
                      <div 
                        className={`rounded-full h-1 transition-all duration-300 ${
                          track.color === 'blue' ? 'bg-blue-500' :
                          track.color === 'orange' ? 'bg-orange-500' :
                          'bg-purple-500'
                        }`}
                        style={{ width: `${trackProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </Button>
                
                {/* Track Modules - Hidden by Default, Show on Hover */}
                <div className="absolute right-0 top-0 mr-2 w-64 bg-white shadow-xl rounded-xl border border-slate-200 p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform translate-x-full">
                  <div className="mb-2">
                    <h4 className="font-semibold text-slate-800 text-sm">{track.name} Modules</h4>
                    <p className="text-xs text-slate-500">{track.completed} of {track.total} completed</p>
                  </div>
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {track.modules?.map((module) => (
                      <button
                        key={module.id}
                        className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center"
                        onClick={() => window.location.href = `/module/${module.id}`}
                      >
                        <i className={`fas fa-circle text-xs mr-2 ${
                          module.completed ? 'text-green-500' : 'text-slate-300'
                        }`}></i>
                        <span className="truncate">{module.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          
        </nav>
        
        {/* Quick Links Section */}
        <div className="border-t border-slate-200 pt-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-3 mb-3">Quick Access</div>
          <nav className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-slate-600 hover:bg-yellow-50 hover:text-yellow-700 rounded-xl transition-all duration-200 group"
              onClick={() => window.location.href = `/module/gen-company-culture`}
            >
              <div className="w-9 h-9 mr-3 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                <i className="fas fa-star text-yellow-600 text-sm"></i>
              </div>
              <span className="font-medium">Company Culture</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-all duration-200 group"
              onClick={() => window.location.href = `/module/gen-certifications`}
            >
              <div className="w-9 h-9 mr-3 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <i className="fas fa-certificate text-emerald-600 text-sm"></i>
              </div>
              <span className="font-medium">Certifications</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition-all duration-200 group"
              onClick={() => window.location.href = `/module/gen-doc-library`}
            >
              <div className="w-9 h-9 mr-3 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <i className="fas fa-book text-indigo-600 text-sm"></i>
              </div>
              <span className="font-medium">Document Library</span>
            </Button>
          </nav>
        </div>
      </div>
    </aside>
  );
}
