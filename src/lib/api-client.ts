import { getSupabaseBrowserClient } from "@/lib/supabase";

export async function apiFetch(url: string, options: RequestInit = {}) {
	const supabase = getSupabaseBrowserClient();

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const token = session?.access_token;

	const res = await fetch(url, {
		...options,
		headers: {
			...(options.headers || {}),
			Authorization: token ? `Bearer ${token}` : "",
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		const error = await res.json().catch(() => ({}));
		throw new Error(error?.error || "Request failed");
	}

	return res.json();
}
