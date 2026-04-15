import { getSupabaseBrowserClient } from "@/lib/supabase";

export async function apiFetch(url: string, options: RequestInit = {}) {
	const supabase = getSupabaseBrowserClient();

	// 🔥 GET SESSION
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const accessToken = session?.access_token;

    // console.log("API Fetch - Access Token:", accessToken); // Debug log to verify token presence

	const res = await fetch(url, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
			...(options.headers || {}),
		},
	});

	if (!res.ok) {
		const error = await res.json().catch(() => null);
		throw new Error(error?.error || "Request failed");
	}

	return res.json();
}
