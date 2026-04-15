import { NextResponse } from "next/server";
import { requireRole, toApiErrorResponse } from "@/lib/api-auth";
import { createSupabaseAdminClient } from "@/lib/supabase";

/**
 * 🔹 TEMP TYPES (Replace with generated Supabase types later)
 */
type Event = {
	id: string;
	title: string;
	host_id: string;
	status: "draft" | "cancelled" | "published";
	date: string;
	category: string;
	created_at: string;
};

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

export async function GET(request: Request) {
	try {
		await requireRole(request, ["admin"]);

		const supabase = createSupabaseAdminClient();

		/**
		 * 🔹 Fetch data
		 */
		const [
			{ data: usersData, error: usersError },
			{ data: eventsData, error: eventsError },
		] = await Promise.all([
			supabase
				.from("users")
				.select("*")
				.order("created_at", { ascending: false }),

			supabase
				.from("events")
				.select("*")
				.order("created_at", { ascending: false }),
		]);

		if (usersError || eventsError) {
			return NextResponse.json(
				{
					error:
						usersError?.message ??
						eventsError?.message ??
						"Unable to fetch admin overview",
				},
				{ status: 400 },
			);
		}

		/**
		 * 🔹 Ensure safe typed arrays
		 */
		const users: User[] = (usersData ?? []) as User[];
		const events: Event[] = (eventsData ?? []) as Event[];

		/**
		 * 🔹 Moderation Queue
		 */
		const moderationQueue = events
			.filter(
				(event) => event.status === "draft" || event.status === "cancelled",
			)
			.slice(0, 12)
			.map((event) => ({
				id: event.id,
				title: event.title,
				host: event.host_id,
				status: event.status === "cancelled" ? "flagged" : "pending",
				date: event.date,
				reason:
					event.status === "cancelled"
						? "Event has been cancelled and needs review"
						: "Pending publication review",
			}));

		/**
		 * 🔹 Aggregations
		 */
		const usersByMonth = new Map<string, number>();
		const eventsByMonth = new Map<string, number>();
		const categoryCounts = new Map<string, number>();
		const kycCounts = new Map<string, number>();

		// Users aggregation
		for (const user of users) {
			const month = new Date(user.created_at).toLocaleString("en-US", {
				month: "short",
			});

			usersByMonth.set(month, (usersByMonth.get(month) ?? 0) + 1);
			kycCounts.set(user.kyc_status, (kycCounts.get(user.kyc_status) ?? 0) + 1);
		}

		// Events aggregation
		for (const event of events) {
			const month = new Date(event.created_at).toLocaleString("en-US", {
				month: "short",
			});

			eventsByMonth.set(month, (eventsByMonth.get(month) ?? 0) + 1);

			categoryCounts.set(
				event.category,
				(categoryCounts.get(event.category) ?? 0) + 1,
			);
		}

		/**
		 * 🔹 Response
		 */
		return NextResponse.json({
			summary: {
				totalEvents: events.length,
				totalUsers: users.length,
				activeEvents: events.filter((event) => event.status === "published")
					.length,
				pendingApprovals: moderationQueue.length,
			},

			userGrowthData: Array.from(
				new Set([...usersByMonth.keys(), ...eventsByMonth.keys()]),
			).map((month) => ({
				month,
				users: usersByMonth.get(month) ?? 0,
				events: eventsByMonth.get(month) ?? 0,
			})),

			kycStatusData: Array.from(kycCounts.entries()).map(([name, value]) => ({
				name,
				value,
			})),

			categoryData: Array.from(categoryCounts.entries()).map(
				([name, value]) => ({
					name,
					value,
				}),
			),

			moderationQueue,

			users: users.map((user) => ({
				id: user.id,
				name: user.full_name,
				email: user.email,
				university: user.university,
				role: user.role,
				kycStatus: user.kyc_status,
				joinDate: user.created_at,
				events: events.filter((event) => event.host_id === user.id).length,
				kycDocument: user.kyc_document_url,
			})),
		});
	} catch (error) {
		return toApiErrorResponse(error);
	}
}
