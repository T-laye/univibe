/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { requireRole, toApiErrorResponse } from "@/lib/api-auth";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { createEventSchema } from "@/lib/validations/host";

function calculateRevenue(
	eventId: string,
	registrations: Array<{ event_id: string; amount_paid: number | null }>,
) {
	return registrations
		.filter((registration) => registration.event_id === eventId)
		.reduce(
			(total, registration) => total + Number(registration.amount_paid ?? 0),
			0,
		);
}

export async function GET(request: Request) {
	try {
		const profile = await requireRole(request, ["host", "admin"]);
		const supabase = createSupabaseAdminClient();

		const [
			{ data: events, error: eventsError },
			{ data: registrations, error: registrationsError },
		] = await Promise.all([
			supabase
				.from("events")
				.select("*")
				.eq("host_id", profile.id)
				.order("event_date", { ascending: true }),
			supabase.from("registrations").select("event_id, amount_paid"),
		]);

		if (eventsError || registrationsError) {
			return NextResponse.json(
				{
					error:
						eventsError?.message ??
						registrationsError?.message ??
						"Unable to fetch events",
				},
				{ status: 400 },
			);
		}

		const hostEvents = (events ?? []).map((event: any) => ({
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
			revenue: calculateRevenue(event.id, registrations ?? []),
			bannerImageUrl: event.banner_image_url,
		}));

		return NextResponse.json(hostEvents);
	} catch (error) {
		return toApiErrorResponse(error);
	}
}

export async function POST(request: Request) {
	try {
		const profile = await requireRole(request, ["host", "admin"]);
		const body = await request.json();

		console.log("Incoming event payload:", JSON.stringify(body, null, 2));

		const payload = createEventSchema.parse(body);

		const supabase = createSupabaseAdminClient();

		// ✅ Correctly construct event_date from date + startTime
		// payload.date = "2025-08-01", payload.startTime = "14:30"
		const eventDateISO = `${payload.date}T${payload.startTime}:00`;

		// ✅ Construct end_date if endDate + endTime provided
		let endDateISO: string | null = null;
		if (payload.endDate) {
			const endTime = payload.endTime ?? payload.startTime;
			endDateISO = `${payload.endDate}T${endTime}:00`;
		}

		// ✅ Resolve location string depending on type
		// const locationString =
		// 	payload.locationType === "onsite"
		// 		? (payload.location ?? "")
		// 		: payload.virtualPlatform
		// 			? `${payload.virtualPlatform}: ${payload.virtualLink ?? ""}`
		// 			: (payload.virtualLink ?? "Online");

		const now = new Date().toISOString();

		const durationInMinutes = payload.endDate
			? (new Date(endDateISO!).getTime() - new Date(eventDateISO).getTime()) /
			  (1000 * 60)
			: 60; // default to 1 hour if no end date provided

		// console.log("Calculated eventDateISO:", eventDateISO);
		// console.log("Calculated endDateISO:", endDateISO);
		// console.log("Calculated locationString:", locationString);
		// console.log("Calculated durationInMinutes:", durationInMinutes);

		const { data, error } = await (supabase as any)
			.from("events")
			.insert({
				host_id: profile.id,
				title: payload.title,
				description: payload.description,
				category: payload.category,
				event_date: eventDateISO,
				end_date: endDateISO,
				start_time: payload.startTime,
				end_time: payload.endTime,
				location: payload.location,
				duration_minutes: durationInMinutes,
				location_type: payload.locationType,
				total_capacity:
					payload.capacityType === "unlimited" ? 0 : payload.capacity,
				registered_count: 0,
				attended_count: 0,
				virtual_link:payload?.virtualLink || null,
				virtual_platform: payload?.virtualPlatform || null,
				map_link: payload.mapLink ?? null,
				banner_image_url: payload.bannerImageUrl ?? null,
				// Store tickets as JSONB in ticket_tiers column
				ticket_tiers: payload.tickets?.length ? payload.tickets : null,
				status: payload.status ?? "draft",
				created_at: now,
				updated_at: now,
			})
			.select("*")
			.single();

		if (error || !data) {
			console.error("Supabase insert error:", error);
			return NextResponse.json(
				{ error: error?.message ?? "Unable to create event" },
				{ status: 400 },
			);
		}

		return NextResponse.json({
			id: data.id,
			title: data.title,
			description: data.description,
			category: data.category,
			eventDate: data.event_date,
			date: data.event_date,
			time: new Date(data.event_date).toISOString().split("T")[1]?.slice(0, 5),
			endDate: data.end_date,
			location: data.location,
			totalCapacity: data.total_capacity,
			registeredCount: data.registered_count,
			attendedCount: data.attended_count,
			status: data.status,
			revenue: 0,
			bannerImageUrl: data.banner_image_url,
		});
	} catch (error) {
		console.error("POST /api/host/events error:", error);
		return toApiErrorResponse(error);
	}
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextResponse } from "next/server";
// import { requireRole, toApiErrorResponse } from "@/lib/api-auth";
// import { createSupabaseAdminClient } from "@/lib/supabase";
// import { createEventSchema } from "@/lib/validations/host";

// function calculateRevenue(
// 	eventId: string,
// 	registrations: Array<{ event_id: string; amount_paid: number | null }>,
// ) {
// 	return registrations
// 		.filter((registration) => registration.event_id === eventId)
// 		.reduce(
// 			(total, registration) => total + Number(registration.amount_paid ?? 0),
// 			0,
// 		);
// }

// export async function GET(request: Request) {
// 	try {
// 		const profile = await requireRole(request, ["host", "admin"]);
// 		const supabase = createSupabaseAdminClient();

// 		const [
// 			{ data: events, error: eventsError },
// 			{ data: registrations, error: registrationsError },
// 		] = await Promise.all([
// 			supabase
// 				.from("events")
// 				.select("*")
// 				.eq("host_id", profile.id)
// 				.order("event_date", { ascending: true }),
// 			supabase.from("registrations").select("event_id, amount_paid"),
// 		]);

// 		if (eventsError || registrationsError) {
// 			return NextResponse.json(
// 				{
// 					error:
// 						eventsError?.message ??
// 						registrationsError?.message ??
// 						"Unable to fetch events",
// 				},
// 				{ status: 400 },
// 			);
// 		}

// 		const hostEvents = (events ?? []).map((event: any) => ({
// 			id: event.id,
// 			title: event.title,
// 			description: event.description,
// 			category: event.category,
// 			eventDate: event.event_date,
// 			date: event.event_date,
// 			time: new Date(event.event_date).toISOString().split("T")[1]?.slice(0, 5),
// 			location: event.location,
// 			totalCapacity: event.total_capacity,
// 			registeredCount: event.registered_count,
// 			attendedCount: event.attended_count,
// 			status: event.status,
// 			revenue: calculateRevenue(event.id, registrations ?? []),
// 			bannerImageUrl: event.banner_image_url,
// 		}));

// 		return NextResponse.json(hostEvents);
// 	} catch (error) {
// 		return toApiErrorResponse(error);
// 	}
// }

// export async function POST(request: Request) {
// 	try {
// 		const profile = await requireRole(request, ["host", "admin"]);
// 		const payload = createEventSchema.parse(await request.json());
// 		const supabase = createSupabaseAdminClient();

// 		const now = new Date().toISOString();
// 		const { data, error } = await (supabase as any)
// 			.from("events")
// 			.insert({
// 				host_id: profile.id,
// 				title: payload.title,
// 				description: payload.description,
// 				category: payload.category,
// 				event_date: `${payload.date}T${payload.date}:00`,
// 				end_date: null,
// 				location: payload.location,
// 				total_capacity: payload.capacity,
// 				registered_count: 0,
// 				attended_count: 0,
// 				banner_image_url: payload.bannerImageUrl ?? null,
// 				status: payload.status ?? "draft",
// 				created_at: now,
// 				updated_at: now,
// 			})
// 			.select("*")
// 			.single();

// 		if (error || !data) {
// 			return NextResponse.json(
// 				{ error: error?.message ?? "Unable to create event" },
// 				{ status: 400 },
// 			);
// 		}

// 		return NextResponse.json({
// 			id: data.id,
// 			title: data.title,
// 			description: data.description,
// 			category: data.category,
// 			eventDate: data.event_date,
// 			endDate: data.end_date,
// 			location: data.location,
// 			totalCapacity: data.total_capacity,
// 			registeredCount: data.registered_count,
// 			attendedCount: data.attended_count,
// 			status: data.status,
// 			revenue: 0,
// 			bannerImageUrl: data.banner_image_url,
// 		});
// 	} catch (error) {
// 		return toApiErrorResponse(error);
// 	}
// }
