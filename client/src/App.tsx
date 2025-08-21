import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import TrainingTrack from "@/pages/training-track";
import TrainingModule from "@/pages/training-module";
import Quiz from "@/pages/quiz";
import Admin from "@/pages/admin";
import Chat from "@/pages/chat";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/tracks/:trackId" component={() => <ProtectedRoute component={TrainingTrack} />} />
      <Route path="/module/:moduleId" component={() => <ProtectedRoute component={TrainingModule} />} />
      <Route path="/lesson/:lessonId" component={() => <ProtectedRoute component={TrainingModule} />} />
      <Route path="/quiz/:type/:id" component={() => <ProtectedRoute component={Quiz} />} />
      <Route path="/chat" component={() => <ProtectedRoute component={Chat} />} />
      <Route path="/admin" component={() => <ProtectedRoute component={Admin} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <Toaster />
          <Router />
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
