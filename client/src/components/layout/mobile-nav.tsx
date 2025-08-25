import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  Menu, 
  X, 
  Home, 
  Bot, 
  Phone, 
  BookOpen, 
  User,
  LogOut,
  ChevronRight,
  Building,
  CloudRain,
  Star,
  Award,
  FileText
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

interface TrackProgress {
  id: string;
  name: string;
  icon: string;
  color: string;
  completed: number;
  total: number;
}

interface ProgressData {
  overall: {
    completed: number;
    total: number;
  };
  tracks: TrackProgress[];
}

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();
  
  const { data: progress } = useQuery<ProgressData>({
    queryKey: ["/api/users/progress"],
    retry: false,
  });

  const navItems = [
    { href: "/", icon: Home, label: "Dashboard", color: "text-blue-600" },
    { href: "/chat", icon: Bot, label: "AI Assistant", color: "text-green-600" },
    { href: "/phone-training", icon: Phone, label: "Phone Training", color: "text-purple-600" },
  ];

  const trackItems = progress?.tracks?.map((track: TrackProgress) => ({
    href: `/tracks/${track.id}`,
    icon: track.icon.includes("home") ? Home : track.icon.includes("building") ? Building : CloudRain,
    label: track.name,
    progress: `${track.completed}/${track.total}`,
    color: track.color === "blue" ? "text-blue-600" : track.color === "orange" ? "text-orange-600" : "text-purple-600"
  })) || [];

  const quickLinks = [
    { href: "/module/gen-company-culture", icon: Star, label: "Company Culture", color: "text-yellow-600" },
    { href: "/module/gen-certifications", icon: Award, label: "Certifications", color: "text-emerald-600" },
    { href: "/module/gen-doc-library", icon: FileText, label: "Documents", color: "text-indigo-600" },
  ];

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  const isActive = (path: string) => location === path;

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between p-4">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Home className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-lg">BRN Academy</span>
          </div>
        </Link>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              {progress?.overall && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  {Math.round((progress.overall.completed / progress.overall.total) * 100)}%
                </span>
              )}
            </Button>
          </SheetTrigger>
          
          <SheetContent side="right" className="w-[85vw] sm:w-[400px] p-0 overflow-y-auto">
            <SheetHeader className="p-6 pb-4 border-b">
              <SheetTitle className="text-left">
                <div className="flex items-center justify-between">
                  <span>Menu</span>
                  <div className="text-sm font-normal text-gray-500">
                    {user?.firstName || 'Trainee'}
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>

            {/* User Progress Summary */}
            {progress?.overall && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-lg font-bold text-blue-600">
                    {Math.round((progress.overall.completed / progress.overall.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(progress.overall.completed / progress.overall.total) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {progress.overall.completed} of {progress.overall.total} modules completed
                </p>
              </div>
            )}

            <div className="p-4">
              {/* Main Navigation */}
              <div className="space-y-1 mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                  Main Menu
                </h3>
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive(item.href) ? "secondary" : "ghost"}
                      className="w-full justify-start h-12 px-3"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
                      <span className="font-medium">{item.label}</span>
                      <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
                    </Button>
                  </Link>
                ))}
              </div>

              {/* Training Tracks */}
              {trackItems.length > 0 && (
                <div className="space-y-1 mb-6">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                    Training Tracks
                  </h3>
                  {trackItems.map((item: any) => (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={isActive(item.href) ? "secondary" : "ghost"}
                        className="w-full justify-start h-12 px-3"
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
                        <span className="font-medium flex-1 text-left">{item.label}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {item.progress}
                        </span>
                      </Button>
                    </Link>
                  ))}
                </div>
              )}

              {/* Quick Links */}
              <div className="space-y-1 mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                  Quick Access
                </h3>
                {quickLinks.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive(item.href) ? "secondary" : "ghost"}
                      className="w-full justify-start h-12 px-3"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
                      <span className="font-medium">{item.label}</span>
                    </Button>
                  </Link>
                ))}
              </div>

              {/* User Section */}
              <div className="border-t pt-4 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-12 px-3"
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = "/profile";
                  }}
                >
                  <User className="h-5 w-5 mr-3 text-gray-600" />
                  <span className="font-medium">Profile</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-12 px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span className="font-medium">Sign Out</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}