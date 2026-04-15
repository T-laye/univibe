import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";

export async function GET() {
	try {
		const supabase = createSupabaseAdminClient();

		const { data, error } = await supabase
			.from("events")
			.select("*")
			.eq("status", "published")
			.order("event_date", { ascending: true });

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		const formatted = (data ?? []).map((event) => {
			const dateObj = new Date(event.event_date);

			return {
				id: event.id,
				title: event.title,
				description: event.description,
				category: event.category,
				location: event.location,

				// ✅ FIXED FOR UI
				date: dateObj.toLocaleDateString("en-US", {
					day: "numeric",
					month: "short",
					year: "numeric",
				}),
				time: dateObj.toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
				}),

				imageUrl: event.banner_image_url,
				registered: event.registered_count,
				capacity: event.total_capacity,

				// keep raw values if needed
				eventDate: event.event_date,
				endDate: event.end_date,
				status: event.status,
			};
		});

		return NextResponse.json(formatted);
	} catch {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
