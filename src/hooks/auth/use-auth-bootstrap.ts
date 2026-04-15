import { useEffect } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth-store";
import { mapProfileToAuthUser } from "@/lib/supabase";

export function useAuthBootstrap() {
	const { setSession, setHydrating, clearSession } = useAuthStore();

	useEffect(() => {
		const supabase = getSupabaseBrowserClient();

		const init = async () => {
			setHydrating(true);

			// 1. Get session from storage
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!session) {
				clearSession();
				setHydrating(false);
				return;
			}

			// 2. Get user
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				clearSession();
				setHydrating(false);
				return;
			}

			// 3. Fetch profile from DB
			const { data: profile } = await supabase
				.from("users")
				.select("*")
				.eq("id", user.id)
				.single();

			if (!profile) {
				clearSession();
				setHydrating(false);
				return;
			}

			setSession(session, mapProfileToAuthUser(profile));
			setHydrating(false);
		};

		init();

		// 4. Listen for auth changes (CRITICAL)
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (_event, session) => {
			if (!session) {
				clearSession();
				return;
			}

			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) return;

			const { data: profile } = await supabase
				.from("users")
				.select("*")
				.eq("id", user.id)
				.single();

			if (!profile) return;

			setSession(session, mapProfileToAuthUser(profile));
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [setSession, setHydrating, clearSession]);
}

// 'use client'

// import { useEffect } from 'react'
// import { getSupabaseBrowserClient } from '@/lib/supabase'
// import { authService } from '@/services/auth.service'
// import { useAuthStore } from '@/stores/auth-store'

// export function useAuthBootstrap() {
//   const { setSession, clearSession, setHydrating } = useAuthStore()

//   useEffect(() => {
//     const supabase = getSupabaseBrowserClient()

//     const hydrate = async () => {
//       try {
//         const data = await authService.getSession()
//         setSession(data.session, data.user)
//       } catch {
//         clearSession()
//       } finally {
//         setHydrating(false)
//       }
//     }

//     void hydrate()

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       if (!session) {
//         clearSession()
//         return
//       }

//       void authService
//         .getSession()
//         .then((data) => setSession(data.session, data.user))
//         .catch(() => clearSession())
//     })

//     return () => subscription.unsubscribe()
//   }, [clearSession, setHydrating, setSession])
// }
