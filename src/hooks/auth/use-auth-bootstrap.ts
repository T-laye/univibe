// src/hooks/auth/use-auth-bootstrap.ts
// src/hooks/auth/use-auth-bootstrap.ts
import { useEffect } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth-store";

export function useAuthBootstrap() {
  const setSession = useAuthStore((s) => s.setSession);
  const clearSession = useAuthStore((s) => s.clearSession);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    // Re-hydrate immediately on mount from persisted localStorage session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        clearSession();
        return;
      }

      // Fetch profile using the stored token
      fetch("/api/auth/session", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.user) {
            setSession(session, data.user); // ✅ matches store signature
          } else {
            clearSession();
          }
        })
        .catch(() => clearSession());
    });

    // Keep in sync on login/logout/token refresh
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session) {
        clearSession();
        return;
      }

      // On token refresh, update session but keep existing user
      if (event === "TOKEN_REFRESHED") {
        setSession(session, useAuthStore.getState().user);
        return;
      }

      // On sign in, fetch fresh profile
      fetch("/api/auth/session", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.user) {
            setSession(session, data.user);
          } else {
            clearSession();
          }
        })
        .catch(() => clearSession());
    });

    return () => subscription.unsubscribe();
  }, [setSession, clearSession]);
}

// import { useEffect } from "react";
// import { getSupabaseBrowserClient, mapProfileToAuthUser } from "@/lib/supabase";
// import { useAuthStore } from "@/stores/auth-store";

// export function useAuthBootstrap() {
// 	const { setSession, setHydrating, clearSession } = useAuthStore();

// 	useEffect(() => {
// 		const supabase = getSupabaseBrowserClient();
// 		let mounted = true;

// 		// onAuthStateChange fires immediately with the current session on mount
// 		// including INITIAL_SESSION event — this is the correct way to bootstrap
// 		const {
// 			data: { subscription },
// 		} = supabase.auth.onAuthStateChange(async (event, session) => {
// 			if (!mounted) return;

// 			if (!session) {
// 				clearSession();
// 				return;
// 			}

// 			try {
// 				const { data: profile } = await supabase
// 					.from("users")
// 					.select("*")
// 					.eq("id", session.user.id)
// 					.single();

// 				if (!mounted) return;

// 				if (!profile) {
// 					clearSession();
// 					return;
// 				}

// 				setSession(session, mapProfileToAuthUser(profile));
// 			} catch {
// 				if (mounted) clearSession();
// 			}
// 		});

// 		return () => {
// 			mounted = false;
// 			subscription.unsubscribe();
// 		};
// 	}, [setSession, setHydrating, clearSession]);
// }

// import { useEffect } from "react";
// import { getSupabaseBrowserClient } from "@/lib/supabase";
// import { useAuthStore } from "@/stores/auth-store";
// import { mapProfileToAuthUser } from "@/lib/supabase";

// export function useAuthBootstrap() {
// 	const { setSession, setHydrating, clearSession } = useAuthStore();

// 	useEffect(() => {
// 		const supabase = getSupabaseBrowserClient();

// 		const init = async () => {
// 			setHydrating(true);

// 			// 1. Get session from storage
// 			const {
// 				data: { session },
// 			} = await supabase.auth.getSession();

// 			if (!session) {
// 				clearSession();
// 				setHydrating(false);
// 				return;
// 			}

// 			// 2. Get user
// 			const {
// 				data: { user },
// 			} = await supabase.auth.getUser();

// 			if (!user) {
// 				clearSession();
// 				setHydrating(false);
// 				return;
// 			}

// 			// 3. Fetch profile from DB
// 			const { data: profile } = await supabase
// 				.from("users")
// 				.select("*")
// 				.eq("id", user.id)
// 				.single();

// 			if (!profile) {
// 				clearSession();
// 				setHydrating(false);
// 				return;
// 			}

// 			setSession(session, mapProfileToAuthUser(profile));
// 			setHydrating(false);
// 		};

// 		init();

// 		// 4. Listen for auth changes (CRITICAL)
// 		const {
// 			data: { subscription },
// 		} = supabase.auth.onAuthStateChange(async (_event, session) => {
// 			if (!session) {
// 				clearSession();
// 				return;
// 			}

// 			const {
// 				data: { user },
// 			} = await supabase.auth.getUser();

// 			if (!user) return;

// 			const { data: profile } = await supabase
// 				.from("users")
// 				.select("*")
// 				.eq("id", user.id)
// 				.single();

// 			if (!profile) return;

// 			setSession(session, mapProfileToAuthUser(profile));
// 		});

// 		return () => {
// 			subscription.unsubscribe();
// 		};
// 	}, [setSession, setHydrating, clearSession]);
// }

// // 'use client'

// // import { useEffect } from 'react'
// // import { getSupabaseBrowserClient } from '@/lib/supabase'
// // import { authService } from '@/services/auth.service'
// // import { useAuthStore } from '@/stores/auth-store'

// // export function useAuthBootstrap() {
// //   const { setSession, clearSession, setHydrating } = useAuthStore()

// //   useEffect(() => {
// //     const supabase = getSupabaseBrowserClient()

// //     const hydrate = async () => {
// //       try {
// //         const data = await authService.getSession()
// //         setSession(data.session, data.user)
// //       } catch {
// //         clearSession()
// //       } finally {
// //         setHydrating(false)
// //       }
// //     }

// //     void hydrate()

// //     const {
// //       data: { subscription },
// //     } = supabase.auth.onAuthStateChange((_event, session) => {
// //       if (!session) {
// //         clearSession()
// //         return
// //       }

// //       void authService
// //         .getSession()
// //         .then((data) => setSession(data.session, data.user))
// //         .catch(() => clearSession())
// //     })

// //     return () => subscription.unsubscribe()
// //   }, [clearSession, setHydrating, setSession])
// // }
