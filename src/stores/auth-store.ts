import { create } from "zustand";
import type { AuthUser } from "@/types/auth";
import type { Session } from "@supabase/supabase-js";

interface AuthState {
	session: Session | null;
	user: AuthUser | null;
	isHydrating: boolean;
}

interface AuthActions {
	setSession: (session: Session | null, user: AuthUser | null) => void;
	clearSession: () => void;
	setHydrating: (hydrating: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
	session: null,
	user: null,
	isHydrating: true, // stays true until onAuthStateChange fires

	setSession: (session, user) => set({ session, user, isHydrating: false }),

	clearSession: () => set({ session: null, user: null, isHydrating: false }),

	setHydrating: (isHydrating) => set({ isHydrating }),
}));

// import { create } from "zustand";
// import type { AuthUser } from "@/types/auth";

// interface AuthState {
// 	session: any; // Supabase session object
// 	user: AuthUser | null;
// 	isHydrating: boolean;
// }

// interface AuthActions {
// 	setSession: (session: any, user: AuthUser | null) => void;
// 	clearSession: () => void;
// 	setHydrating: (hydrating: boolean) => void;
// }

// type AuthStore = AuthState & AuthActions;

// export const useAuthStore = create<AuthStore>((set) => ({
// 	session: null,
// 	user: null,
// 	isHydrating: true,

// 	setSession: (session, user) => set({ session, user }),

// 	clearSession: () =>
// 		set({
// 			session: null,
// 			user: null,
// 			isHydrating: false,
// 		}),

// 	setHydrating: (isHydrating) => set({ isHydrating }),
// }));
