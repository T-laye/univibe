// src/stores/user-store.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/types/auth";
import type { Session } from "@supabase/supabase-js";

interface UserState {
	user: AuthUser | null;
	session: Session | null;
	isHydrating: boolean;
	activeTab: "registered" | "favorites" | "settings";

	setUser: (user: AuthUser | null) => void;
	setSession: (session: Session | null) => void;
	setHydrating: (value: boolean) => void;
	setActiveTab: (tab: "registered" | "favorites" | "settings") => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: null,
			session: null,
			isHydrating: true,
			activeTab: "registered",

			setUser: (user) => set({ user }),
			setSession: (session) => set({ session }),
			setHydrating: (value) => set({ isHydrating: value }),
			setActiveTab: (activeTab) => set({ activeTab }),
		}),
		{
			name: "auth-storage", // localStorage key
		},
	),
);
