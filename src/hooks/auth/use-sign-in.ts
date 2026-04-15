import { useMutation } from "@tanstack/react-query";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { apiFetch } from "@/lib/api-client";

type SignInPayload = {
	email: string;
	password: string;
};

export function useSignIn() {
	return useMutation({
		mutationFn: async (payload: SignInPayload) => {
			const supabase = getSupabaseBrowserClient();

			// 1. Login with Supabase
			const { data, error } = await supabase.auth.signInWithPassword({
				email: payload.email,
				password: payload.password,
			});

			if (error || !data.session) {
				throw new Error(error?.message || "Login failed");
			}

			// 2. 🔥 CRITICAL: Force session persistence (THIS IS WHAT YOU ASKED ABOUT)
			await supabase.auth.setSession({
				access_token: data.session.access_token,
				refresh_token: data.session.refresh_token,
			});

			// 3. Optional: fetch backend user profile
			const profile = await apiFetch("/api/auth/session");

			return profile;
		},
	});
}

// 'use client'

// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { authService } from '@/services/auth.service'
// import { queryKeys } from '@/services/query-keys'
// import { useAuthStore } from '@/stores/auth-store'

// export function useSignIn() {
//   const queryClient = useQueryClient()
//   const { setSession } = useAuthStore()

//   return useMutation({
//     mutationFn: authService.signIn,
//     onSuccess: (data) => {
//       setSession(data.session, data.user)
//       queryClient.setQueryData(queryKeys.auth.session, data)
//     },
//   })
// }
