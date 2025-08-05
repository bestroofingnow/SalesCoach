import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Shield, LogOut, User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg border-b-4 border-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-home text-white text-lg"></i>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">BRN Training Academy</h1>
                  <p className="text-sm text-gray-500">Best Roofing Now</p>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
              <i className="fas fa-search text-gray-400"></i>
              <Input 
                type="text" 
                placeholder="Search training..." 
                className="bg-transparent text-sm border-none outline-none w-40 h-auto p-0"
              />
            </div>
            
            {user?.role === 'admin' && (
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
            )}
            
            <div className="flex items-center space-x-2">
              {user?.profileImageUrl ? (
                <img 
                  src={user.profileImageUrl} 
                  alt="User Avatar" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
              <span className="text-sm font-medium text-gray-700">
                {user?.firstName || 'User'}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logout()}
                className="text-gray-400 hover:text-gray-600"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
