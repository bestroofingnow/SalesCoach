import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Landing() {
  const [, navigate] = useLocation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-6 text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-home text-white text-2xl"></i>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Roofing Training Academy
          </h1>
          <p className="text-gray-600 mb-2">Professional Door-to-Door Sales Training</p>
          <p className="text-sm text-gray-500 mb-8">
            Master residential, commercial, and restoration roofing with our comprehensive training platform.
          </p>
          
          <Button
            onClick={() => navigate('/login')}
            className="w-full bg-blue-500 hover:bg-blue-600"
            data-testid="button-signin"
          >
            Sign In to Continue
          </Button>
          
          <div className="mt-6 grid grid-cols-3 gap-4 text-xs text-gray-500">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                <i className="fas fa-home text-blue-500"></i>
              </div>
              <p>Residential</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                <i className="fas fa-building text-orange-500"></i>
              </div>
              <p>Commercial</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                <i className="fas fa-cloud-rain text-purple-500"></i>
              </div>
              <p>Restoration</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
