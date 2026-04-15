"use client";

// src/hooks/user/use-user-dashboard.ts

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";

export function useUserDashboard(enabled: boolean) {
  return useQuery({
    queryKey: ["user-dashboard"],
    queryFn: () => apiFetch("/api/user/dashboard"),
    enabled,
  });
}