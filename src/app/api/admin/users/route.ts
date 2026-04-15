import { NextResponse } from "next/server";
import { requireRole, toApiErrorResponse } from "@/lib/api-auth";
import { createSupabaseAdminClient } from "@/lib/supabase";

/**
 * 🔹 Define types (temporary — replace with Supabase generated types later)
 */
type User = {
	id: string;
	full_name: string;
	email: string;
	university: string;
	role: string;
	kyc_status: string;
	created_at: string;
	kyc_document_url?: string;
};

type Event = {
	id: string;
	host_id: string;
};

export async function GET(request: Request) {
	try {
		await requireRole(request, ["admin"]);
		const supabase = createSupabaseAdminClient();

		const [
			{ data: usersData, error: usersError },
			{ data: eventsData, error: eventsError },
		] = await Promise.all([
			supabase
				.from("users")
				.select("*")
				.order("created_at", { ascending: false }),

			supabase.from("events").select("id, host_id"),
		]);

		if (usersError || eventsError) {
			return NextResponse.json(
				{
					error:
						usersError?.message ??
						eventsError?.message ??
						"Unable to fetch users",
				},
				{ status: 400 },
			);
		}

		/**
		 * 🔹 Fix: enforce proper typing
		 */
		const users: User[] = (usersData ?? []) as User[];
		const events: Event[] = (eventsData ?? []) as Event[];

		/**
		 * 🔹 Optimize event counting (IMPORTANT)
		 * Instead of filtering inside map (O(n²)), precompute counts
		 */
		const eventCountMap = new Map<string, number>();

		for (const event of events) {
			eventCountMap.set(
				event.host_id,
				(eventCountMap.get(event.host_id) ?? 0) + 1,
			);
		}

		/**
		 * 🔹 Response
		 */
		return NextResponse.json(
			users.map((user) => ({
				id: user.id,
				name: user.full_name,
				email: user.email,
				university: user.university,
				role: user.role,
				kycStatus: user.kyc_status,
				joinDate: user.created_at,
				events: eventCountMap.get(user.id) ?? 0,
				kycDocument: user.kyc_document_url,
			})),
		);
	} catch (error) {
		return toApiErrorResponse(error);
	}
}
