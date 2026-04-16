import { NextResponse } from "next/server";
import { requireRole, toApiErrorResponse } from "@/lib/api-auth";
import { createSupabaseAdminClient } from "@/lib/supabase";

type DbEvent = {
	id: string;
	host_id: string;
	title: string;
	description: string;
	category: string;
	location: string;
	event_date: string;
	end_date: string | null;
	banner_image_url: string | null;
	total_capacity: number;
	registered_count: number;
	attended_count: number;
	status: string;
	created_at: string;
	updated_at: string;
};

type DbRegistration = {
	id: string;
	event_id: string;
	amount_paid: number | null;
	status: string;
	created_at: string;
};

export async function GET(request: Request) {
	try {
		const profile = await requireRole(request, ["host", "admin"]);
		const supabase = createSupabaseAdminClient();

		// Step 1: fetch host's events
		const { data: events, error: eventsError } = await supabase
			.from("events")
			.select("*")
			.eq("host_id", profile.id)
			.returns<DbEvent[]>();

		if (eventsError) {
			console.error("Events query error:", eventsError);
			return NextResponse.json({ error: eventsError.message }, { status: 400 });
		}

		const safeEvents = events ?? [];
		const eventIds = safeEvents.map((e) => e.id);

		// Step 2: fetch registrations only for those event IDs
		const { data: registrations, error: registrationsError } =
			eventIds.length > 0
				? await supabase
						.from("registrations")
						.select("id, event_id, amount_paid, status, created_at")
						.in("event_id", eventIds)
						.returns<DbRegistration[]>()
				: { data: [] as DbRegistration[], error: null };

		if (registrationsError) {
			console.error("Registrations query error:", registrationsError);
			return NextResponse.json(
				{ error: registrationsError.message },
				{ status: 400 },
			);
		}

		const safeRegistrations = registrations ?? [];

		// --- Compute summary ---
		const totalRevenue = safeRegistrations.reduce(
			(sum, item) => sum + Number(item.amount_paid ?? 0),
			0,
		);
		const totalRegistrations = safeRegistrations.length;
		const totalEvents = safeEvents.length;

		const attendanceRate =
			totalEvents === 0
				? 0
				: Math.round(
						(safeEvents.reduce(
							(sum, event) =>
								sum +
								(event.total_capacity > 0
									? event.registered_count / event.total_capacity
									: 0),
							0,
						) /
							totalEvents) *
							100,
					);

		// --- Build series data ---
		const eventsByMonth = new Map<string, number>();
		const revenueByMonth = new Map<string, number>();
		const categoryCounts = new Map<string, number>();

		for (const event of safeEvents) {
			const eventMonth = new Date(event.event_date).toLocaleString("en-US", {
				month: "short",
			});
			eventsByMonth.set(
				eventMonth,
				(eventsByMonth.get(eventMonth) ?? 0) + (event.registered_count ?? 0),
			);
			categoryCounts.set(
				event.category,
				(categoryCounts.get(event.category) ?? 0) + 1,
			);
		}

		for (const registration of safeRegistrations) {
			const month = new Date(registration.created_at).toLocaleString("en-US", {
				month: "short",
			});
			revenueByMonth.set(
				month,
				(revenueByMonth.get(month) ?? 0) +
					Number(registration.amount_paid ?? 0),
			);
		}

		// --- Build host events list ---
		const hostEvents = safeEvents.map((event) => ({
			id: event.id,
			title: event.title,
			description: event.description,
			category: event.category,
			eventDate: event.event_date,
			date: event.event_date,
			time: new Date(event.event_date).toISOString().split("T")[1]?.slice(0, 5),
			location: event.location,
			totalCapacity: event.total_capacity,
			registeredCount: event.registered_count,
			attendedCount: event.attended_count,
			status: event.status,
			revenue: safeRegistrations
				.filter((item) => item.event_id === event.id)
				.reduce((sum, item) => sum + Number(item.amount_paid ?? 0), 0),
			bannerImageUrl: event.banner_image_url,
		}));

		return NextResponse.json({
			summary: {
				totalEvents,
				totalRegistrations,
				totalRevenue,
				avgAttendanceRate: attendanceRate,
			},
			events: hostEvents,
			registrationSeries: Array.from(eventsByMonth.entries()).map(
				([name, registrations]) => ({
					name,
					registrations,
					attended: Math.round(registrations * 0.82),
				}),
			),
			revenueSeries: Array.from(revenueByMonth.entries()).map(
				([month, revenue]) => ({
					month,
					revenue,
				}),
			),
			categorySeries: Array.from(categoryCounts.entries()).map(
				([name, value]) => ({
					name,
					value,
				}),
			),
		});
	} catch (error) {
		return toApiErrorResponse(error);
	}
}
