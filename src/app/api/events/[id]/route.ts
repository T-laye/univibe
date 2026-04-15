import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const supabase = createSupabaseAdminClient();
		const { data, error } = await supabase
			.from("events")
			.select("*")
			.eq("id", id)
			.single();

		if (error || !data) {
			return NextResponse.json({ error: "Event not found" }, { status: 404 });
		}

		return NextResponse.json({
			id: data.id,
			title: data.title,
			description: data.description,
			category: data.category,
			eventDate: data.event_date,
			endDate: data.end_date,
			location: data.location,
			totalCapacity: data.total_capacity,
			registeredCount: data.registered_count,
			attendedCount: data.attended_count,
			status: data.status,
			revenue: 0,
			bannerImageUrl: data.banner_image_url,
		});
	} catch {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
