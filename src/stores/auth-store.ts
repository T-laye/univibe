import { create } from "zustand";
import type { AuthUser } from "@/types/auth";

interface AuthState {
	session: any; // Supabase session object
	user: AuthUser | null;
	isHydrating: boolean;
}

interface AuthActions {
	setSession: (session: any, user: AuthUser | null) => void;
	clearSession: () => void;
	setHydrating: (hydrating: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
	session: null,
	user: null,
	isHydrating: true,

	setSession: (session, user) => set({ session, user }),

	clearSession: () =>
		set({
			session: null,
			user: null,
			isHydrating: false,
		}),

	setHydrating: (isHydrating) => set({ isHydrating }),
}));
