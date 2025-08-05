import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { User } from "@shared/schema";
import { getQueryFn, queryClient } from "@/lib/queryClient";

export function useAuth() {
  const [, setLocation] = useLocation();
  
  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("token");
      queryClient.setQueryData(["/api/auth/user"], null);
    },
    onSuccess: () => {
      setLocation("/login");
    },
  });

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    logout: logoutMutation.mutate,
  };
}
