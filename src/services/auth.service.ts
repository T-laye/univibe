import { getSupabaseBrowserClient } from "@/lib/supabase";
import type {
	AuthSession,
	SignInPayload,
	SignUpPayload,
	UpdateProfilePayload,
} from "@/types/auth";
import { apiClient } from "./api-client";

export const authService = {
	async signIn(payload: SignInPayload) {
		return apiClient<AuthSession>("/api/auth/login", {
			method: "POST",
			body: payload,
		});
	},

	async signUp(payload: SignUpPayload) {
		console.log("authService.signUp called with:", payload);
		const result = await apiClient<{ userId: string; message: string }>(
			"/api/auth/signup",
			{
				method: "POST",
				body: payload,
			},
		);
		console.log("authService.signUp result:", result);
		return result;
	},

	async signOut() {
		const supabase = getSupabaseBrowserClient();
		const { error } = await supabase.auth.signOut();

		if (error) {
			throw error;
		}

		return { success: true };
	},

	async getSession() {
		const supabase = getSupabaseBrowserClient();
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			return {
				session: null,
				user: null,
			} satisfies AuthSession;
		}

		return apiClient<AuthSession>("/api/auth/session", {
			method: "GET",
			auth: true,
		});
	},

	async updateProfile(payload: UpdateProfilePayload) {
		return apiClient<AuthSession>("/api/user/profile", {
			method: "PATCH",
			body: payload,
			auth: true,
		});
	},
};
