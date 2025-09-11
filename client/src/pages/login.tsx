import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginData } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/auth/login", data);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      // Store the token
      localStorage.setItem("token", result.token);
      
      // Update the query cache with the user data
      queryClient.setQueryData(["/api/auth/user"], result.user);
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      // Redirect based on user role
      if (result.user?.role === 'super_admin') {
        setLocation("/admin");
      } else {
        setLocation("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Login Form */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your Roofing Training Academy account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          data-testid="input-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  data-testid="button-login"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Hero Section */}
        <div className="hidden md:block text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Roofing Training Academy
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Master the art of roofing excellence with our comprehensive training platform
          </p>
          <div className="space-y-4 text-gray-600">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Residential Roofing Expertise</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span>Commercial Roofing Systems</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span>Restoration & Insurance Claims</span>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <div className="p-4 bg-white/50 rounded-lg backdrop-blur">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> If you're a new team member, please contact your admin to create your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}